// --- GLOBALE VARIABLEN ---
let destinyPoints = 0; // Geplant für spätere Villain-Mechaniken
let qi = 0; // aktuelles QI
let maxQi = 100;  // maximales Qi
let realmLevel = 1;  // aktueller Realm
let qiPills = 0; // Anzahl der gesammelten Qi-Pillen
const realms = ["Mortal", "Qi Condensation", "Foundation Establishment", "Core Formation", "Golden Core","Nascent Soul", "Spirit Severing", "Void Refinement", "Ascension", "Immortal"];

function updateUI() {
    document.getElementById('qi').innerText = Math.floor(qi);
    document.getElementById('max-qi').innerText = maxQi;
    document.getElementById('realm').innerText = `${realms[realmLevel-1]} (Stufe ${realmLevel})`;
    document.getElementById('qi-pills').innerText = qiPills;
    
    // Zeige Durchbruch-Button, wenn Qi voll ist
    if (qi >= maxQi) {
        document.getElementById('break-btn').style.display = "inline-block";
    } else {
        document.getElementById('break-btn').style.display = "none";
    }
}

// --- FUNKTIONEN ---
function lootSystem() {
    if (Math.random() < 0.05) {
        qiPills++;
        log("Du hast eine Qi-Pille gefunden!");
    }
}

function cultivate() {
  // Logik für Qi-Gewinn
    let gain = 5 + (realmLevel * 2); 
    if (qi < maxQi) {
        qi += gain;
        log("Du absorbierst das Qi der Welt.");
    }
    lootSystem();
    updateUI();
}

function breakthrough() {
    let chance = 0.7; // 70% Erfolgschance
    if (Math.random() < chance) {
        realmLevel++;
        qi = 0;
        maxQi *= 2.5; // Nächstes Level ist schwerer
        log(`ERFOLG! Du bist nun im Reich: ${realms[realmLevel-1]}!`);
    } else {
        qi -= (maxQi * 0.2); // Strafe bei Scheitern
        log("DEVIATION! Dein Qi spielt verrückt. Du verlierst Fortschritt.");
    }
    updateUI();
}

function log(msg) {
    const logBox = document.getElementById('log');
    logBox.innerHTML = `<p>${msg}</p>` + logBox.innerHTML;
}
