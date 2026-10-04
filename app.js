const LISTS = [{"id": 1, "name": "Nezávislí92", "candidates": [{"rank": 1, "name": "Velan Michal"}, {"rank": 2, "name": "Prosecká Alena"}, {"rank": 3, "name": "Vostal Petr"}, {"rank": 4, "name": "Častulík Jakub"}, {"rank": 5, "name": "Holásek Štěpán"}, {"rank": 6, "name": "Kříž Jakub"}, {"rank": 7, "name": "Zouharová Jolana"}, {"rank": 8, "name": "Bednářová Daniela"}, {"rank": 9, "name": "Martínek Zdeněk"}, {"rank": 10, "name": "Velecký Jakub"}, {"rank": 11, "name": "Macháčková Pavlína"}, {"rank": 12, "name": "Palásek Milan"}, {"rank": 13, "name": "Vaňatka Tomáš"}, {"rank": 14, "name": "Klepáč Vladimír"}, {"rank": 15, "name": "Vaňatková Kateřina"}, {"rank": 16, "name": "Schäffer Jiří"}, {"rank": 17, "name": "Polášková Eva"}]}, {"id": 2, "name": "VIZE pro Šlapanice", "candidates": [{"rank": 1, "name": "Bajerová Eva Marie"}, {"rank": 2, "name": "Řezníčková Alena"}, {"rank": 3, "name": "Kadlc Zdeněk"}, {"rank": 4, "name": "Tesař Jakub"}, {"rank": 5, "name": "Čegan Slavoj"}, {"rank": 6, "name": "Sova Michael"}, {"rank": 7, "name": "Sovová Kateřina"}, {"rank": 8, "name": "Štěpánek Zdeněk"}, {"rank": 9, "name": "Růža Tomáš"}, {"rank": 10, "name": "Kareš Petr"}, {"rank": 11, "name": "Hašek Radoslav"}, {"rank": 12, "name": "Kadlcová Eva"}, {"rank": 13, "name": "Slavík Vojtěch"}, {"rank": 14, "name": "Bajerová Kristina"}, {"rank": 15, "name": "Mrkvica Miroslav"}, {"rank": 16, "name": "Musil Jan"}, {"rank": 17, "name": "Fiala Antonín"}]}, {"id": 3, "name": "Společně za Šlapanice", "candidates": [{"rank": 1, "name": "Krček Pavel"}, {"rank": 2, "name": "Horák Pavel"}, {"rank": 3, "name": "Staňková Anežka"}, {"rank": 4, "name": "Švehlová Markéta"}, {"rank": 5, "name": "Králová Marie"}, {"rank": 6, "name": "Charvát Libor"}, {"rank": 7, "name": "Vavro Ivan"}, {"rank": 8, "name": "Merclová Eva"}, {"rank": 9, "name": "Otruba Tomáš"}, {"rank": 10, "name": "Koudelka Jakub"}, {"rank": 11, "name": "Bednář Radek"}, {"rank": 12, "name": "Buchtová Eliška"}, {"rank": 13, "name": "Sedláček Filip"}, {"rank": 14, "name": "Vilímek Marek"}, {"rank": 15, "name": "Melicharová Iveta"}, {"rank": 16, "name": "Vlkojan Zdeněk"}, {"rank": 17, "name": "Zycháček Jan"}]}, {"id": 4, "name": "Čisté Šlapanice", "candidates": [{"rank": 1, "name": "Trněná Michaela"}, {"rank": 2, "name": "Růžička Radek"}, {"rank": 3, "name": "Kopeček Jiří"}, {"rank": 4, "name": "Kinclová Anežka"}, {"rank": 5, "name": "Josková Lucie"}, {"rank": 6, "name": "Staněk Miroslav"}, {"rank": 7, "name": "Něnička Jakub"}, {"rank": 8, "name": "Mikuška Pavel"}, {"rank": 9, "name": "Linhart Pavel"}, {"rank": 10, "name": "Dočkal Jaroslav"}, {"rank": 11, "name": "Tůma Ivan"}, {"rank": 12, "name": "Novotný Jan"}, {"rank": 13, "name": "Feik David"}, {"rank": 14, "name": "Hloušková Šárka"}, {"rank": 15, "name": "Bednářová Tereza"}, {"rank": 16, "name": "Pojzl Zdeněk"}, {"rank": 17, "name": "Reiter Miloslav"}]}, {"id": 5, "name": "SNK pro Šlapanice", "candidates": [{"rank": 1, "name": "Hermann Vojtěch"}, {"rank": 2, "name": "Klaška Michal"}, {"rank": 3, "name": "Křápková Hana"}, {"rank": 4, "name": "Zeman Jan"}, {"rank": 5, "name": "Jiráčková Eva"}, {"rank": 6, "name": "Sedláček David"}, {"rank": 7, "name": "Pacutová Anna"}, {"rank": 8, "name": "Horák Libor"}, {"rank": 9, "name": "Holásková Ivana"}, {"rank": 10, "name": "Novák Marek"}, {"rank": 11, "name": "Procházková Klára"}, {"rank": 12, "name": "Létal Milan"}, {"rank": 13, "name": "Hůrka Jiří"}, {"rank": 14, "name": "Míčová Eva"}, {"rank": 15, "name": "Křikavová Petra"}, {"rank": 16, "name": "Ragasová Ivana"}, {"rank": 17, "name": "Podborský Jan"}]}, {"id": 6, "name": "Piráti Šlapanice & friends", "candidates": [{"rank": 1, "name": "Migdau Kateřina"}, {"rank": 2, "name": "Fryblíková Barbora"}, {"rank": 3, "name": "Mann Tomáš"}, {"rank": 4, "name": "Migdau Šefl Tomáš"}, {"rank": 5, "name": "Bazovská Lenka"}, {"rank": 6, "name": "Pavelka Štěpán"}, {"rank": 7, "name": "Příkrá Kateřina"}, {"rank": 8, "name": "Nikulenkov Fedor"}, {"rank": 9, "name": "Müller Jaromír"}, {"rank": 10, "name": "Leflerová Denisa"}, {"rank": 11, "name": "Hloušek Samuel"}, {"rank": 12, "name": "Urbánková Terezie"}, {"rank": 13, "name": "Matušková Petra"}, {"rank": 14, "name": "Sobotková Markéta"}, {"rank": 15, "name": "Nikulenkov Grochová Diana"}, {"rank": 16, "name": "Fryblík Pavel"}, {"rank": 17, "name": "Mannová Sára"}]}];
const partyBox = document.querySelector('#partyPredictions');
const seatBox = document.querySelector('#seatPredictions');
const jumper = document.querySelector('#jumper');
const mostVotes = document.querySelector('#mostVotes');
const biggestGap = document.querySelector('#biggestGap');

LISTS.forEach(p=>{
  partyBox.insertAdjacentHTML('beforeend', `<div class="party-row"><div class="party-name">${p.name}<small>${p.candidates.length} kandidátů</small></div><input class="party-pct" data-id="${p.id}" type="number" min="0" max="100" step="1" placeholder="%"></div>`);
  seatBox.insertAdjacentHTML('beforeend', `<div class="seat-row"><div class="party-name">${p.name}</div><input class="party-seat" data-id="${p.id}" type="number" min="0" max="17" step="1" placeholder="mandáty"></div>`);
  p.candidates.forEach(c=>{
    const opt = `<option value="${p.id}:${c.rank}">${p.name} — ${c.rank}. ${c.name}</option>`;
    jumper.insertAdjacentHTML('beforeend', opt);
    mostVotes.insertAdjacentHTML('beforeend', opt);
    biggestGap.insertAdjacentHTML('beforeend', opt);
  });
});

document.querySelector('#submit').addEventListener('click', ()=>{
  const player = document.querySelector('#player').value.trim();
  const turnout = Number(document.querySelector('#turnout').value);
  const pcts = [...document.querySelectorAll('.party-pct')].map(x=>Number(x.value));
  const seats = [...document.querySelectorAll('.party-seat')].map(x=>Number(x.value));
  if(!player) return show('Napiš přezdívku.');
  if(pcts.some(x=>!Number.isInteger(x)||x<0||x>100)) return show('Vyplň procenta všech 6 kandidátek jako celá čísla.');
  if(seats.some(x=>!Number.isInteger(x)||x<0||x>17)) return show('Vyplň mandáty všech 6 kandidátek.');
  if(seats.reduce((a,b)=>a+b,0)!==17) return show('Mandáty musí dohromady dávat přesně 17.');
  if(!Number.isInteger(turnout)||turnout<0||turnout>100) return show('Volební účast musí být celé číslo 0–100.');
  const tip = {player,turnout,pcts,seats,jumper:jumper.value,mostVotes:mostVotes.value,biggestGap:biggestGap.value,topVotes:Number(document.querySelector('#topVotes').value),createdAt:new Date().toISOString()};
  localStorage.setItem('rumcup_tip', JSON.stringify(tip));
  show('🔒 Tip uložen a uzamčen. Teď už žádné změny. Hodně štěstí!');
  document.querySelectorAll('input,select,button').forEach(x=>x.disabled=true);
});
function show(t){document.querySelector('#message').textContent=t;}
