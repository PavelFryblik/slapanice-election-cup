const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz8M9exFzOS1h2FOEfpcWNlGQZ4Z0Jq4vCGkpKoTmI0pDt52zKneQnD_-00EbvT76k8LA/exec";

const PARTIES = [
  {
    name: "Nezávislí92",
    candidates: [
      "Velan Michal","Prosecká Alena","Vostal Petr","Častulík Jakub",
      "Holásek Štěpán","Kříž Jakub","Zouharová Jolana","Bednářová Daniela",
      "Martínek Zdeněk","Velecký Jakub","Macháčková Pavlína","Palásek Milan",
      "Vaňatka Tomáš","Klepáč Vladimír","Vaňatková Kateřina","Schäffer Jiří",
      "Polášková Eva"
    ]
  },
  {
    name: "VIZE pro Šlapanice",
    candidates: [
      "Bajerová Eva Marie","Řezníčková Alena","Kadlc Zdeněk","Tesař Jakub",
      "Čegan Slavoj","Sova Michael","Sovová Kateřina","Štěpánek Zdeněk",
      "Růža Tomáš","Kareš Petr","Hašek Radoslav","Kadlcová Eva",
      "Slavík Vojtěch","Bajerová Kristina","Mrkvica Miroslav","Musil Jan",
      "Fiala Antonín"
    ]
  },
  {
    name: "Společně za Šlapanice",
    candidates: [
      "Krček Pavel","Horák Pavel","Staňková Anežka","Švehlová Markéta",
      "Králová Marie","Charvát Libor","Vavro Ivan","Merclová Eva",
      "Otruba Tomáš","Koudelka Jakub","Bednář Radek","Buchtová Eliška",
      "Sedláček Filip","Vilímek Marek","Melicharová Iveta","Vlkojan Zdeněk",
      "Zycháček Jan"
    ]
  },
  {
    name: "Čisté Šlapanice",
    candidates: [
      "Trněná Michaela","Růžička Radek","Kopeček Jiří","Kinclová Anežka",
      "Josková Lucie","Staněk Miroslav","Něnička Jakub","Mikuška Pavel",
      "Linhart Pavel","Dočkal Jaroslav","Tůma Ivan","Novotný Jan",
      "Feik David","Hloušková Šárka","Bednářová Tereza","Pojzl Zdeněk",
      "Reiter Miloslav"
    ]
  },
  {
    name: "SNK pro Šlapanice",
    candidates: [
      "Hermann Vojtěch","Klaška Michal","Křápková Hana","Zeman Jan",
      "Jiráčková Eva","Sedláček David","Pacutová Anna","Horák Libor",
      "Holásková Ivana","Novák Marek","Procházková Klára","Létal Milan",
      "Hůrka Jiří","Míčová Eva","Křikavová Petra","Ragasová Ivana",
      "Podborský Jan"
    ]
  },
  {
    name: "Piráti Šlapanice & friends",
    candidates: [
      "Migdau Kateřina","Fryblíková Barbora","Mann Tomáš","Migdau Šefl Tomáš",
      "Bazovská Lenka","Pavelka Štěpán","Příkrá Kateřina","Nikulenkov Fedor",
      "Müller Jaromír","Leflerová Denisa","Hloušek Samuel","Urbánková Terezie",
      "Matušková Petra","Sobotková Markéta","Nikulenkov Grochová Diana",
      "Fryblík Pavel","Mannová Sára"
    ]
  }
];

function fillCandidateSelect(id) {
  const select = document.getElementById(id);

  select.innerHTML = '<option value="">— Vyber kandidáta —</option>';

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

function init() {
  fillCandidateSelect("jumper");
  fillCandidateSelect("mostVotes");

  // zbytek inicializace...
}

document.addEventListener("DOMContentLoaded", init);
