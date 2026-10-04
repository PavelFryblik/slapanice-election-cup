const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz8M9exFzOS1h2FOEfpcWNlGQZ4Z0Jq4vCGkpKoTmI0pDt52zKneQnD_-00EbvT76k8LA/exec";

const PARTIES = [
  {
    name: "Nezávislí92",
    candidates: [
      "Velan Michal",
      "Prosecká Alena",
      "Vostal Petr",
      "Častulík Jakub",
      "Holásek Štěpán",
      "Kříž Jakub",
      "Zouharová Jolana",
      "Bednářová Daniela",
      "Martínek Zdeněk",
      "Velecký Jakub",
      "Macháčková Pavlína",
      "Palásek Milan",
      "Vaňatka Tomáš",
      "Klepáč Vladimír",
      "Vaňatková Kateřina",
      "Schäffer Jiří",
      "Polášková Eva"
    ]
  },
  {
    name: "VIZE pro Šlapanice",
    candidates: [
      "Bajerová Eva Marie",
      "Řezníčková Alena",
      "Kadlc Zdeněk",
      "Tesař Jakub",
      "Čegan Slavoj",
      "Sova Michael",
      "Sovová Kateřina",
      "Štěpánek Zdeněk",
      "Růža Tomáš",
      "Kareš Petr",
      "Hašek Radoslav",
      "Kadlcová Eva",
      "Slavík Vojtěch",
      "Bajerová Kristina",
      "Mrkvica Miroslav",
      "Musil Jan",
      "Fiala Antonín"
    ]
  },
  {
    name: "Společně za Šlapanice",
    candidates: [
      "Krček Pavel",
      "Horák Pavel",
      "Staňková Anežka",
      "Švehlová Markéta",
      "Králová Marie",
      "Charvát Libor",
      "Vavro Ivan",
      "Merclová Eva",
      "Otruba Tomáš",
      "Koudelka Jakub",
      "Bednář Radek",
      "Buchtová Eliška",
      "Sedláček Filip",
      "Vilímek Marek",
      "Melicharová Iveta",
      "Vlkojan Zdeněk",
      "Zycháček Jan"
    ]
  },
  {
    name: "Čisté Šlapanice",
    candidates: [
      "Trněná Michaela",
      "Růžička Radek",
      "Kopeček Jiří",
      "Kinclová Anežka",
      "Josková Lucie",
      "Staněk Miroslav",
      "Něnička Jakub",
      "Mikuška Pavel",
      "Linhart Pavel",
      "Dočkal Jaroslav",
      "Tůma Ivan",
      "Novotný Jan",
      "Feik David",
      "Hloušková Šárka",
      "Bednářová Tereza",
      "Pojzl Zdeněk",
      "Reiter Miloslav"
    ]
  },
  {
    name: "SNK pro Šlapanice",
    candidates: [
      "Hermann Vojtěch",
      "Klaška Michal",
      "Křápková Hana",
      "Zeman Jan",
      "Jiráčková Eva",
      "Sedláček David",
      "Pacutová Anna",
      "Horák Libor",
      "Holásková Ivana",
      "Novák Marek",
      "Procházková Klára",
      "Létal Milan",
      "Hůrka Jiří",
      "Míčová Eva",
      "Křikavová Petra",
      "Ragasová Ivana",
      "Podborský Jan"
    ]
  },
  {
    name: "Piráti Šlapanice & friends",
    candidates: [
      "Migdau Kateřina",
      "Fryblíková Barbora",
      "Mann Tomáš",
      "Migdau Šefl Tomáš",
      "Bazovská Lenka",
      "Pavelka Štěpán",
      "Příkrá Kateřina",
      "Nikulenkov Fedor",
      "Müller Jaromír",
      "Leflerová Denisa",
      "Hloušek Samuel",
      "Urbánková Terezie",
      "Matušková Petra",
      "Sobotková Markéta",
      "Nikulenkov Grochová Diana",
      "Fryblík Pavel",
      "Mannová Sára"
    ]
  }
];

function createPartyInputs() {
  const container = document.getElementById("partyPredictions");

  if (!container) return;

  container.innerHTML = "";

  PARTIES.forEach((party, i) => {
    container.innerHTML += `
      <label>
        ${i + 1}. ${party.name}
        <input
          id="party_${i + 1}_pct"
          type="number"
          min="0"
          max="100"
          step="1"
          inputmode="numeric"
          placeholder="%"
        >
      </label>
    `;
  });
}

function createSeatInputs() {
  const container = document.getElementById("seatPredictions");

  if (!container) return;

  container.innerHTML = "";

  PARTIES.forEach((party, i) => {
    container.innerHTML += `
      <label>
        ${i + 1}. ${party.name}
        <input
          id="party_${i + 1}_mandates"
          type="number"
          min="0"
          max="17"
          step="1"
          inputmode="numeric"
          placeholder="mandáty"
        >
      </label>
    `;
  });
}

function fillCandidateSelect(id) {
  const select = document.getElementById(id);

  if (!select) return;

  select.innerHTML = `
    <option value="">— Vyber kandidáta —</option>
  `;

  PARTIES.forEach(party => {
    const group = document.createElement("optgroup");

    group.label = party.name;

    party.candidates.forEach((candidate, index) => {
      const option = document.createElement("option");

      option.value = candidate;
      option.textContent = `${index + 1}. ${candidate}`;

      group.appendChild(option);
    });

    select.appendChild(group);
  });
}

function getInteger(id, min, max) {
  const element = document.getElementById(id);

  if (!element) return null;

  const value = element.value.trim();

  if (value === "") {
    return null;
  }

  const number = Number(value);

  if (
    !Number.isInteger(number) ||
    number < min ||
    number > max
  ) {
    return null;
  }

  return number;
}

function collectTip() {
  const playerElement = document.getElementById("player");

  if (!playerElement) {
    throw new Error("Chybí pole pro přezdívku.");
  }

  const nickname = playerElement.value.trim();

  if (!nickname) {
    throw new Error("Vyplň přezdívku.");
  }

  const tip = {
    nickname: nickname,

    party_1_pct: getInteger("party_1_pct", 0, 100),
    party_2_pct: getInteger("party_2_pct", 0, 100),
    party_3_pct: getInteger("party_3_pct", 0, 100),
    party_4_pct: getInteger("party_4_pct", 0, 100),
    party_5_pct: getInteger("party_5_pct", 0, 100),
    party_6_pct: getInteger("party_6_pct", 0, 100),

    turnout: getInteger("turnout", 0, 100),

    party_1_mandates: getInteger("party_1_mandates", 0, 17),
    party_2_mandates: getInteger("party_2_mandates", 0, 17),
    party_3_mandates: getInteger("party_3_mandates", 0, 17),
    party_4_mandates: getInteger("party_4_mandates", 0, 17),
    party_5_mandates: getInteger("party_5_mandates", 0, 17),
    party_6_mandates: getInteger("party_6_mandates", 0, 17),

    jumper: document.getElementById("jumper")?.value || "",

    most_votes: document.getElementById("mostVotes")?.value || "",

    top_votes: getInteger("topVotes", 0, 100000)
  };

  const percentageFields = [
    "party_1_pct",
    "party_2_pct",
    "party_3_pct",
    "party_4_pct",
    "party_5_pct",
    "party_6_pct"
  ];

  for (const field of percentageFields) {
    if (tip[field] === null) {
      throw new Error(
        "Vyplň procenta všech 6 kandidátek."
      );
    }
  }

  if (tip.turnout === null) {
    throw new Error(
      "Vyplň volební účast."
    );
  }

  const mandateFields = [
    "party_1_mandates",
    "party_2_mandates",
    "party_3_mandates",
    "party_4_mandates",
    "party_5_mandates",
    "party_6_mandates"
  ];

  for (const field of mandateFields) {
    if (tip[field] === null) {
      throw new Error(
        "Vyplň počet mandátů u všech kandidátek."
      );
    }
  }

  const mandateSum = mandateFields.reduce(
    (sum, field) => sum + tip[field],
    0
  );

  if (mandateSum !== 17) {
    throw new Error(
      `Mandáty musí dát dohromady přesně 17. Nyní máš ${mandateSum}.`
    );
  }

  if (!tip.jumper) {
    throw new Error(
      "Vyber Skokana voleb."
    );
  }

  if (!tip.most_votes) {
    throw new Error(
      "Vyber kandidáta s nejvíce preferenčními hlasy."
    );
  }

  if (tip.top_votes === null) {
    throw new Error(
      "Vyplň přesný počet hlasů nejúspěšnějšího kandidáta."
    );
  }

  return tip;
}

async function submitTip() {
  const button = document.getElementById("submit");
  const message = document.getElementById("message");

  try {
    const tip = collectTip();

    button.disabled = true;
    button.textContent = "⏳ Odesílám...";

    if (message) {
      message.textContent = "";
      message.className = "";
    }

    await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(tip)
    });

    if (message) {
      message.textContent = "✅ Tip byl odeslán a uzamčen.";
      message.className = "success";
    }
    
    button.textContent = "🔒 Tip uzamčen";
    button.disabled = true;
    
    document
      .querySelectorAll("input, select")
      .forEach(element => {
        element.disabled = true;
      });

  } catch (error) {
    console.error(error);

    if (message) {
      message.textContent =
        `❌ ${error.message}`;

      message.className = "error";
    }

    button.disabled = false;
    button.textContent = "🔒 Uzamknout tip";
  }
}

function init() {
  createPartyInputs();
  createSeatInputs();

  fillCandidateSelect("jumper");
  fillCandidateSelect("mostVotes");

  const submit = document.getElementById("submit");

  if (submit) {
    submit.addEventListener(
      "click",
      submitTip
    );
  }
}

document.addEventListener(
  "DOMContentLoaded",
  init
);
