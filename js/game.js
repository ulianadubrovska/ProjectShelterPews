let pet = {
    happiness: 80,
    hunger: 50,
    clean: 70,
    energy: 60
};

// 🔄 UI
function updateUI() {
    document.getElementById("happiness-bar").style.width = pet.happiness + "%";
    document.getElementById("hunger-bar").style.width = pet.hunger + "%";
    document.getElementById("clean-bar").style.width = pet.clean + "%";
    document.getElementById("energy-bar").style.width = pet.energy + "%";
}

// ⏱ життя
setInterval(() => {
    pet.hunger += 2;
    pet.energy -= 2;
    pet.clean -= 1;
    pet.happiness -= 1;

    clamp();
    updateUI();
}, 3000);

// 🔒 обмеження
function clamp() {
    pet.hunger = Math.min(100, pet.hunger);
    pet.energy = Math.max(0, pet.energy);
    pet.clean = Math.max(0, pet.clean);
    pet.happiness = Math.max(0, pet.happiness);
}

// 🔲 модалка
function openGame(type) {
    const modal = document.getElementById("gameModal");
    const content = document.getElementById("modalContent");

    modal.classList.remove("hidden");

    if (type === "sleep") {
        content.innerHTML = `
        <div class="sleep-game">
            <h2>Sleep 🌙</h2>
            <div class="room day" id="room">
                <img src="img/cats/cat1.jpg" id="sleep-pet">
                <div class="lamp" onclick="toggleSleep()">💡</div>
                <div class="stars hidden" id="stars">✨✨✨</div>
            </div>
            <p id="sleep-status">Turn off the light to sleep</p>
        </div>
        `;
    }

    if (type === "feed") {
        content.innerHTML = `
        <div class="feed-game">
            <h2>Catch Food 🍖</h2>
            <div id="feed-area"></div>
            <p>Food: <span id="food-count">0</span></p>
            <button onclick="finishFeed()">Finish</button>
        </div>
        `;
        startFeedGame();
    }

    if (type === "play") {
        content.innerHTML = `
        <div class="memory-game">
            <h2>Memory Game 🎾</h2>
            <div id="memory-grid"></div>
            <p>Moves: <span id="moves">0</span></p>
        </div>
        `;
        startMemoryGame();
    }

    if (type === "wash") {
        content.innerHTML = `
        <div class="wash-game">
            <h2>Wash 🧼</h2>
            <div class="wash-area" id="washArea">
                <img src="img/cats/cat1.jpg" id="wash-pet">
            </div>
            <p>Cleaned: <span id="clean-count">0</span>/5</p>
        </div>
        `;
        startWashGame();
    }
}

// ❌ закриття
function closeModal() {
    document.getElementById("gameModal").classList.add("hidden");
}

// =========================
// 🌙 SLEEP
// =========================
let sleeping = false;
let sleepInterval;

function toggleSleep() {
    const room = document.getElementById("room");
    const stars = document.getElementById("stars");

    if (!sleeping) {
        room.classList.replace("day", "night");
        stars.classList.remove("hidden");

        sleeping = true;

        sleepInterval = setInterval(() => {
            pet.energy += 5;

            if (pet.energy >= 100) {
                pet.energy = 100;
                finishSleep();
            }

            updateUI();
        }, 500);

    } else {
        finishSleep();
    }
}

function finishSleep() {
    clearInterval(sleepInterval);

    const room = document.getElementById("room");
    const stars = document.getElementById("stars");

    room.classList.replace("night", "day");
    stars.classList.add("hidden");

    sleeping = false;

    pet.happiness += 10;
    updateUI();

    setTimeout(closeModal, 800);
}

// =========================
// 🍖 FEED
// =========================
let foodCollected = 0;
let feedInterval;

function startFeedGame() {
    foodCollected = 0;
    document.getElementById("food-count").textContent = 0;

    const area = document.getElementById("feed-area");

    feedInterval = setInterval(() => {
        const food = document.createElement("div");
        food.className = "food";

        const foods = ["🍖", "🐟", "🍗"];
        food.textContent = foods[Math.floor(Math.random() * foods.length)];

        food.style.left = Math.random() * 90 + "%";
        food.style.animationDuration = (2 + Math.random() * 2) + "s";

        food.onclick = () => {
            food.remove();
            foodCollected++;
            document.getElementById("food-count").textContent = foodCollected;
        };

        area.appendChild(food);

        setTimeout(() => food.remove(), 3000);
    }, 800);
}

function finishFeed() {
    clearInterval(feedInterval);

    pet.hunger -= foodCollected * 5;
    if (pet.hunger < 0) pet.hunger = 0;

    pet.happiness += foodCollected * 2;

    updateUI();
    closeModal();
}

// =========================
// 🎾 MEMORY GAME
// =========================
let firstCard = null;
let secondCard = null;
let lock = false;
let moves = 0;
let matches = 0;

function startMemoryGame() {
    const grid = document.getElementById("memory-grid");
    grid.innerHTML = "";

    const items = ["🐶","🐱","🐰","🐹","🐦","🐾"];
    const cards = [...items, ...items].sort(() => Math.random() - 0.5);

    cards.forEach(symbol => {
        const card = document.createElement("div");
        card.className = "memory-card";
        card.dataset.value = symbol;
        card.onclick = () => flipCard(card);
        grid.appendChild(card);
    });

    firstCard = null;
    secondCard = null;
    lock = false;
    moves = 0;
    matches = 0;

    document.getElementById("moves").textContent = moves;
}

function flipCard(card) {
    if (lock || card.classList.contains("open")) return;

    card.classList.add("open");
    card.textContent = card.dataset.value;

    if (!firstCard) {
        firstCard = card;
        return;
    }

    secondCard = card;
    lock = true;
    moves++;

    document.getElementById("moves").textContent = moves;

    if (firstCard.dataset.value === secondCard.dataset.value) {
        matches++;
        resetTurn();

        if (matches === 6) {
            winMemoryGame();
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove("open");
            secondCard.classList.remove("open");

            firstCard.textContent = "";
            secondCard.textContent = "";

            resetTurn();
        }, 700);
    }
}

function resetTurn() {
    firstCard = null;
    secondCard = null;
    lock = false;
}

function winMemoryGame() {
    pet.happiness += 20;
    pet.energy -= 10;

    updateUI();

    setTimeout(closeModal, 800);
}

// =========================
// 🧼 WASH
// =========================
let cleaned = 0;

function startWashGame() {
    cleaned = 0;
    document.getElementById("clean-count").textContent = 0;

    const area = document.getElementById("washArea");

    for (let i = 0; i < 5; i++) {
        const dirt = document.createElement("div");
        dirt.className = "dirt";
        dirt.textContent = "💩";

        dirt.style.top = Math.random() * 200 + "px";
        dirt.style.left = Math.random() * 200 + "px";

        dirt.onclick = () => {
            dirt.remove();
            cleaned++;

            document.getElementById("clean-count").textContent = cleaned;

            if (cleaned === 5) finishWash();
        };

        area.appendChild(dirt);
    }
}

function finishWash() {
    pet.clean = 100;
    pet.happiness += 10;

    updateUI();
    setTimeout(closeModal, 800);
}

// старт
updateUI();