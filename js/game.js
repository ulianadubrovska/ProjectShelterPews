let happiness = 80;
let hunger = 50;
let clean = 70;
let energy = 60;

// оновлення UI
function updateStats() {
    document.getElementById("happiness").textContent = happiness;
    document.getElementById("hunger").textContent = hunger;
    document.getElementById("clean").textContent = clean;
    document.getElementById("energy").textContent = energy;

    checkStatus();
}

// статус
function checkStatus() {
    const status = document.getElementById("status");

    if (happiness > 90 && hunger < 30 && clean > 80 && energy > 80) {
        status.textContent = "🎉 Pet is ready for adoption!";
    } else {
        status.textContent = "";
    }
}

// 🎯 ДІЇ

function feedPet() {
    hunger -= 10;
    if (hunger < 0) hunger = 0;
    updateStats();
}

function playPet() {
    happiness += 10;
    energy -= 10;
    updateStats();
}

function washPet() {
    clean += 10;
    updateStats();
}

function sleepPet() {
    energy += 15;
    updateStats();
}

// ⏱ ЧАС
setInterval(() => {
    hunger += 2;
    energy -= 2;

    if (hunger > 100) hunger = 100;
    if (energy < 0) energy = 0;

    updateStats();
}, 3000);

// старт
updateStats();