
const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbz8M9exFzOS1h2FOEfpcWNlGQZ4Z0Jq4vCGkpKoTmI0pDt52zKneQnD_-00EbvT76k8LA/exec";

const REFRESH_INTERVAL = 60_000;

const PARTIES = [
  "Nezávislí92",
  "VIZE pro Šlapanice",
  "Společně za Šlapanice",
  "Čisté Šlapanice",
  "SNK pro Šlapanice",
  "Piráti Šlapanice & friends"
];

let isLoading = false;
let refreshTimer = null;

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function formatDate(value) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return new Intl.DateTimeFormat("cs-CZ", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Prague"
  }).format(date);
}

function formatPoints(value) {
  const points = Number(value);
  return Number.isFinite(points)
    ? points.toLocaleString("cs-CZ")
    : "0";
}

function setStatus(message, type = "") {
  const status = document.getElementById("apiStatus");

  if (!status) return;

  status.textContent = message;
  status.className = "leaderboard-status";

  if (type) {
    status.classList.add(type);
  }
}

function renderSummary(data) {
  const summary = document.getElementById("summary");

  if (!summary) return;

  const tips = data.tips || [];
  const totalPlayers = tips.length;
  const leadingScore = tips.length
    ? Number(tips[0].score?.total) || 0
    : 0;

  summary.innerHTML = `
    <div class="summary-item">
      <strong>${totalPlayers}</strong>
      <span>tipujících</span>
    </div>
    <div class="summary-item">
      <strong>${formatPoints(leadingScore)}</strong>
      <span>bodů průběžného lídra</span>
    </div>
    <div class="summary-item">
      <strong>${formatPoints(435)}</strong>
      <span>teoretické maximum</span>
    </div>
  `;
}

function renderTipDetails(tip) {
  const percentages = tip.tip?.partyPercentages || [];
  const mandates = tip.tip?.mandates || [];
  const score = tip.score || {};

  const partyRows = PARTIES.map((name, index) => `
    <tr>
      <td>${escapeHTML(name)}</td>
      <td>${escapeHTML(percentages[index] ?? "—")} %</td>
      <td>${escapeHTML(mandates[index] ?? "—")}</td>
    </tr>
  `).join("");

  return `
    <div class="tip-detail">
      <h4>Tipy na kandidátky</h4>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Kandidátka</th>
              <th>Tip %</th>
              <th>Mandáty</th>
            </tr>
          </thead>
          <tbody>${partyRows}</tbody>
        </table>
      </div>

      <div class="detail-grid">
        <div><span>Volební účast</span><strong>${escapeHTML(tip.tip?.turnout ?? "—")} %</strong></div>
        <div><span>Skokan</span><strong>${escapeHTML(tip.tip?.jumper || "—")}</strong></div>
        <div><span>Nejvíce hlasů</span><strong>${escapeHTML(tip.tip?.mostVotes || "—")}</strong></div>
        <div><span>Tipovaný počet hlasů</span><strong>${formatPoints(tip.tip?.topVotes)}</strong></div>
      </div>

      <h4>Získané body</h4>
      <div class="score-breakdown">
        <div><span>Kandidátky</span><strong>${formatPoints(score.partyPercentages)}</strong></div>
        <div><span>Mandáty</span><strong>${formatPoints(score.mandates)}</strong></div>
        <div><span>Účast</span><strong>${formatPoints(score.turnout)}</strong></div>
        <div><span>Skokan</span><strong>${formatPoints(score.jumper)}</strong></div>
        <div><span>Nejvíce hlasů</span><strong>${formatPoints(score.mostVotes)}</strong></div>
        <div><span>Přesný počet hlasů</span><strong>${formatPoints(score.topVotes)}</strong></div>
        <div><span>Celkem</span><strong>${formatPoints(score.total)} b.</strong></div>
      </div>
    </div>
  `;
}

function renderLeaderboard(data) {
  const tbody = document.getElementById("leaderboard");

  if (!tbody) return;

  if (!data.success) {
    throw new Error(data.error || "API vrátilo chybu.");
  }

  const tips = data.tips || [];

  if (tips.length === 0) {
    tbody.innerHTML = `
      <tr><td colspan="4">Zatím nejsou k dispozici žádné tipy.</td></tr>
    `;
    renderSummary(data);
    return;
  }

  // API už vrací pořadí podle skóre.
  tbody.innerHTML = tips.map((tip, index) => {
    const rank = Number(tip.rank) || index + 1;
    const nickname = escapeHTML(tip.nickname);
    const total = formatPoints(tip.score?.total);
    const medal = rank === 1 ? "🥇"
      : rank === 2 ? "🥈"
      : rank === 3 ? "🥉"
      : rank;

    return `
      <tr class="rank-row rank-${rank <= 3 ? rank : "other"}">
        <td class="rank-number">${medal}</td>
        <td class="player-name">${nickname}</td>
        <td class="total-points">${total}</td>
        <td>
          <details class="player-details">
            <summary>Zobrazit</summary>
            ${renderTipDetails(tip)}
          </details>
        </td>
      </tr>
    `;
  }).join("");

  renderSummary(data);

  const updatedAt = document.getElementById("updatedAt");

  if (updatedAt) {
    updatedAt.textContent =
      `Data API: ${formatDate(data.updatedAt)}`;
  }

  setStatus(
    `✅ Načteno ${tips.length} tipujících. Aktualizace každých 60 sekund.`,
    "success"
  );
}

/**
 * Načte API přes JSONP.
 * Tím se vyhneme běžným problémům s CORS mezi
 * Google Apps Script a GitHub Pages.
 */
function loadLeaderboard() {
  if (isLoading) return;

  isLoading = true;
  setStatus("Načítám výsledky z Google Sheets…");

  const callbackName =
    "electionCupCallback_" + Date.now();

  const script = document.createElement("script");
  let finished = false;

  const cleanup = () => {
    if (finished) return;

    finished = true;
    isLoading = false;

    if (script.parentNode) {
      script.parentNode.removeChild(script);
    }

    delete window[callbackName];
    clearTimeout(timeout);
  };

  const timeout = setTimeout(() => {
    cleanup();
    setStatus(
      "⚠️ API neodpovídá. Zkus ruční aktualizaci.",
      "error"
    );
  }, 15000);

  window[callbackName] = data => {
    try {
      renderLeaderboard(data);
    } catch (error) {
      console.error("Chyba při vykreslení leaderboardu:", error);
      setStatus(
        "⚠️ Nepodařilo se zpracovat data API: " + error.message,
        "error"
      );
    } finally {
      cleanup();
    }
  };

  script.onerror = () => {
    cleanup();
    setStatus(
      "⚠️ Nepodařilo se načíst API. Zkontroluj nasazení Apps Scriptu.",
      "error"
    );
  };

  script.src =
    APPS_SCRIPT_URL +
    "?action=leaderboard&callback=" +
    encodeURIComponent(callbackName) +
    "&_=" + Date.now();

  document.body.appendChild(script);
}

function initLeaderboard() {
  const refreshButton = document.getElementById("refreshButton");

  if (refreshButton) {
    refreshButton.addEventListener("click", loadLeaderboard);
  }

  loadLeaderboard();

  if (refreshTimer) {
    clearInterval(refreshTimer);
  }

  refreshTimer = setInterval(
    loadLeaderboard,
    REFRESH_INTERVAL
  );
}

document.addEventListener("DOMContentLoaded", initLeaderboard);
