// 🐾 Конфігурація
const petsConfig = {
    "cat": { name: "Котик", img: "img/cats/cat1.webp" },
    "dog": { name: "Песик", img: "img/dogs/dog1.webp" }
};

let currentPetType = "cat"; // Значення
// за замовчуванням
let pet = {
    happiness: 80,
    hunger: 50,
    clean: 70,
    energy: 60,
    level: 1,
    xp: 0
};
let inventory = {
    fish: 0,
    meat: 0,
    water: 0
};
// 🔄 UI Оновлення
function updateUI() {
    // Оновлення балок (ProgressBar)
    const setWidth = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.style.width = val + "%";
    };
    document.getElementById("happiness-text").textContent = pet.happiness + "%";
    document.getElementById("hunger-text").textContent = pet.hunger + "%";
    document.getElementById("clean-text").textContent = pet.clean + "%";
    document.getElementById("energy-text").textContent = pet.energy + "%";
    setWidth("happiness-bar", pet.happiness);
    setWidth("hunger-bar", pet.hunger);
    setWidth("clean-bar", pet.clean);
    setWidth("energy-bar", pet.energy);

    // Оновлення тексту рівня
    const lvlEl = document.getElementById("level-info");
    if (lvlEl) lvlEl.textContent = `Level: ${pet.level} | XP: ${pet.xp}/100`;
}

// ✨ Досвід та Рівні
function addXP(amount) {
    pet.xp += amount;
    if (pet.xp >= 100) {
        pet.level++;
        pet.xp = 0;
        alert(`🎉 Вітаємо! Новий рівень: ${pet.level}`);
        if (pet.level === 3) {
            const btn = document.getElementById("add-pet-btn");
            if (btn) btn.style.display = "block";
        }
    }
    updateUI();
}

// ⏱ Життєвий цикл (кожні 4 секунди)
setInterval(() => {
    pet.hunger = Math.min(100, pet.hunger + 2);
    pet.energy = Math.max(0, pet.energy - 1);
    pet.clean = Math.max(0, pet.clean - 1);
    pet.happiness = Math.max(0, pet.happiness - 1);
    updateUI();
}, 4000);

// 🔲 Модальне вікно ігор
let activeInterval; // Для очищення таймерів ігор

function openGame(type) {
    const modal = document.getElementById("gameModal");
    const content = document.getElementById("modalContent");
    const petImg = petsConfig[currentPetType].img; // Беремо картинку обраної тварини

    modal.classList.remove("hidden");
    clearInterval(activeInterval); // Чистимо старі таймери

    if (type === "sleep") {
        content.innerHTML = `
        <div class="sleep-game">
            <h2>Sleep 🌙</h2>
            <div class="room day" id="room">
                <img src="${petImg}" id="sleep-pet" class="game-pet-img">
                <div class="lamp" onclick="toggleSleep()">💡</div>
                <div class="stars hidden" id="stars">✨✨✨</div>
            </div>
            <p id="sleep-status">Turn off the light to sleep</p>
        </div>`;
    }

    if (type === "feed") {
        content.innerHTML = `
        <div class="feed-game">
            <h2>Catch Food 🍖</h2>
            <div id="feed-area" style="position:relative; height:250px; overflow:hidden; background:#eee;"></div>
            <p>Food collected: <span id="food-count">0</span></p>
            <button class="btn" onclick="finishFeed()">Finish</button>
        </div>`;
        startFeedGame();
    }

    if (type === "play") {
        content.innerHTML = `
        <div class="memory-game">
            <h2>Memory Game 🎾</h2>
            <div id="memory-grid" class="memory-grid"></div>
            <p>Moves: <span id="moves">0</span></p>
        </div>`;
        startMemoryGame();
    }

    if (type === "wash") {
        content.innerHTML = `
        <div class="wash-game">
            <h2>Wash 🧼</h2>
            <div class="wash-area" id="washArea" style="position:relative;">
                <img src="${petImg}" id="wash-pet" class="game-pet-img">
            </div>
            <p>Cleaned: <span id="clean-count">0</span>/5</p>
        </div>`;
        startWashGame();
    }
}

function closeModal() {
    document.getElementById("gameModal").classList.add("hidden");
    clearInterval(activeInterval);
    if (sleeping) finishSleep(); // Зупиняємо сон, якщо закрили вікно
}

// =========================
// 🌙 SLEEP LOGIC
// =========================
let sleeping = false;

function toggleSleep() {
    const room = document.getElementById("room");
    const stars = document.getElementById("stars");

    if (!sleeping) {
        room.classList.replace("day", "night");
        stars.classList.remove("hidden");
        sleeping = true;
        activeInterval = setInterval(() => {
            pet.energy = Math.min(100, pet.energy + 5);
            updateUI();
            if (pet.energy >= 100) finishSleep();
        }, 1000);
    } else {
        finishSleep();
    }
}

function finishSleep() {
    clearInterval(activeInterval);
    sleeping = false;
    addXP(15);
    closeModal();
}

// =========================
// 🍖 FEED LOGIC
// =========================
function startFeedGame() {
    let collected = [];

    const area = document.getElementById("feed-area");

    activeInterval = setInterval(() => {

        const types = ["fish", "meat", "water"];
        const emojis = {
            fish: "🐟",
            meat: "🍖",
            water: "💧"
        };

        const type = types[Math.floor(Math.random() * types.length)];

        const food = document.createElement("div");
        food.className = "food-item";
        food.textContent = emojis[type];

        food.style.left = Math.random() * 90 + "%";
        food.style.position = "absolute";
        food.style.fontSize = "30px";
        food.style.cursor = "pointer";

        food.onclick = () => {
            collected.push(type);
            food.remove();

            document.getElementById("food-count").textContent = collected.length;
        };

        area.appendChild(food);

        let pos = 0;
        let fall = setInterval(() => {
            pos += 2;
            food.style.top = pos + "px";

            if (pos > 250) {
                clearInterval(fall);
                food.remove();
            }
        }, 30);

    }, 800);

    window.finishFeed = () => {

        collected.forEach(item => {
            inventory[item]++;
        });

        addXP(collected.length * 2);

        closeModal();
        updateInventoryUI();
    };
}
function updateInventoryUI() {
    const container = document.getElementById("inventory-items");

    const emojis = {
        fish: "🐟",
        meat: "🍖",
        water: "💧"
    };

    container.innerHTML = "";

    Object.keys(inventory).forEach(item => {

        if (inventory[item] > 0) {

            const el = document.createElement("div");
            el.className = "inv-item";

            el.innerHTML = `${emojis[item]} x${inventory[item]}`;

            el.onclick = () => feedFromInventory(item);

            container.appendChild(el);
        }
    });
}
function feedFromInventory(item) {

    if (inventory[item] <= 0) return;

    inventory[item]--;

    // різна їжа = різний ефект
    if (item === "fish") pet.hunger -= 15;
    if (item === "meat") pet.hunger -= 20;
    if (item === "water") pet.hunger -= 5;

    if (pet.hunger < 0) pet.hunger = 0;

    pet.happiness += 5;

    updateUI();
    updateInventoryUI();

    // реакція
    if (pet.hunger === 0) {
        document.getElementById("status-text").textContent =
            "😺 Я ситий, дякую!";
    }
}

// =========================
// 🎾 MEMORY LOGIC (Виправлено)
// =========================
function winMemoryGame() {
    pet.happiness = Math.min(100, pet.happiness + 25);
    addXP(40);
    setTimeout(closeModal, 800);
}

// 🚿 WASH LOGIC
function startWashGame() {
    let count = 0;
    const area = document.getElementById("washArea");
    for(let i=0; i<5; i++) {
        const dirt = document.createElement("span");
        dirt.innerHTML = "💩";
        dirt.style.position = "absolute";
        dirt.style.left = Math.random() * 80 + "%";
        dirt.style.top = Math.random() * 80 + "%";
        dirt.style.cursor = "pointer";
        dirt.onclick = () => {
            dirt.remove();
            count++;
            document.getElementById("clean-count").textContent = count;
            if(count === 5) {
                pet.clean = 100;
                addXP(20);
                setTimeout(closeModal, 800);
            }
        };
        area.appendChild(dirt);
    }
}

// Початковий запуск
updateUI();
function choosePet(type) {
    currentPetType = type;

    const config = petsConfig[type];

    // показуємо UI
    document.getElementById("selection-screen").style.display = "none";
    document.getElementById("pet-ui").style.display = "block";

    // ставимо ім’я
    document.getElementById("pet-name-display").textContent = config.name;

    // ставимо картинку
    document.getElementById("pet-image").src = config.img;

    updateUI();
    updateInventoryUI();
}
let firstCard = null;
let secondCard = null;
let lock = false;
let matches = 0;
let moves = 0;

function startMemoryGame() {
    const grid = document.getElementById("memory-grid");
    grid.innerHTML = "";

    const items = ["🐶","🐱","🐰","🐹","🐦","🐾"];
    const cards = [...items, ...items];

    cards.sort(() => Math.random() - 0.5);

    firstCard = null;
    secondCard = null;
    lock = false;
    matches = 0;
    moves = 0;

    document.getElementById("moves").textContent = 0;

    cards.forEach(symbol => {
        const card = document.createElement("div");
        card.className = "memory-card";
        card.dataset.value = symbol;

        card.onclick = () => flipCard(card);

        grid.appendChild(card);
    });
}

function flipCard(card) {
    if (lock) return;
    if (card.classList.contains("open")) return;

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