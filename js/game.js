// 🐾 Конфігурація
const petsConfig = {
    "cat": {
        name: "Cat",

        animations: {
            idle: generateFrames("cat/idle", "cat_idle", 11),
            sit: generateFrames("cat/sit", "cat_sit", 7),
            sleep: generateFrames("cat/sleep", "cat_sleep", 4),
            eat: generateFrames("cat/eat", "cat_eat", 8),
            meow: generateFrames("cat/meow", "cat_meow", 7),
            jump: generateFrames("cat/jump", "cat_jump", 15),
            run: generateFrames("cat/run", "cat_run", 6),
            crouch: generateFrames("cat/crouch", "cat_crouch", 4),
            hurt: generateFrames("cat/hurt", "cat_hurt", 3),
            death: generateFrames("cat/death", "cat_death", 8)
        }
    }
};
let soundEnabled = true;

const sounds = {
    purr: new Audio("sounds/purr.mp3"),
    meow: new Audio("sounds/meow.mp3")
};

// налаштування
sounds.purr.loop = true;
sounds.purr.volume = 0.3;

sounds.meow.volume = 0.7;
function generateFrames(folder, name, count) {
    const frames = [];

    for (let i = 1; i <= count; i++) {
        const num = String(i).padStart(3, "0");
        frames.push(`img/game/${folder}/${name}_${num}.png`);
    }

    return frames;
}

const currentPetType = "cat"; // Значення
// за замовчуванням
let pet = {
    happiness: 80,
    hunger: 50,
    clean: 70,
    energy: 60,

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

}
function normalizePet() {
    pet.happiness = Math.max(0, Math.min(100, pet.happiness));
    pet.hunger = Math.max(0, Math.min(100, pet.hunger));
    pet.clean = Math.max(0, Math.min(100, pet.clean));
    pet.energy = Math.max(0, Math.min(100, pet.energy));
}

// ⏱ Життєвий цикл (кожні 4 секунди)
setInterval(() => {
    pet.hunger -= 2;
    pet.energy -= 1;
    pet.clean -= 1;
    pet.happiness -= 1;

    if (pet.hunger < 20) pet.happiness -= 2;
    if (pet.clean < 30) pet.happiness -= 2;
    if (pet.energy < 20) pet.happiness -= 2;
    if (pet.hunger < 20) {
        showBubble("🍖 Хочу їсти!");
    }

    if (pet.energy < 15) {
        showBubble("😴 Я втомився...");
    }

    if (pet.clean < 20) {
        showBubble("🧼 Я брудний...");
    }
    normalizePet();
    checkPetState();
    updateUI();
}, 4000);

// 🔲 Модальне вікно ігор
let activeInterval; // Для очищення таймерів ігор

function openGame(type) {
    if (currentAction || petState === "dead") return; // ⛔ блок

    const modal = document.getElementById("gameModal");
    const content = document.getElementById("modalContent");

    modal.classList.remove("hidden");
    clearInterval(activeInterval); // Чистимо старі таймери



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

}

function closeModal() {
    document.getElementById("gameModal").classList.add("hidden");
    clearInterval(activeInterval);
    if (isSleeping) finishSleep(); // Зупиняємо сон, якщо закрили вікно
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

        if (collected.length === 0) {
            closeModal();
            return;
        }

        collected.forEach(item => {
            inventory[item]++;
        });

        updateInventoryUI(); // 🔥 ДО закриття
        closeModal();
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
    if (currentAction || petState === "dead") return;
    if (inventory[item] <= 0) return;

    inventory[item]--;

    if (item === "fish") pet.hunger += 20;
    if (item === "meat") pet.hunger += 25;
    if (item === "water") pet.hunger += 10;

    pet.happiness += 5;
    pet.clean -= 2; // 👈 логічно (забруднився)

    normalizePet();

    updateUI();
    updateInventoryUI();

    playAnimation("eat", false, 120);
}

// =========================
// 🎾 MEMORY LOGIC (Виправлено)
// =========================
function winMemoryGame() {
    pet.happiness = Math.min(100, pet.happiness + 25);
    updateUI();
    setTimeout(closeModal, 800)
    playAnimation("run", false, 80);

    setTimeout(() => {
        playAnimation("meow", false, 120);
    }, 1000);
}

// Початковий запуск
updateUI();
function initPet() {
    const config = petsConfig["cat"];

    document.getElementById("pet-name-display").textContent = config.name;

    const petEl = document.getElementById("pet-sprite");
    petEl.style.backgroundImage = `url(${config.animations.idle[0]})`;

    updateUI();
    updateInventoryUI();
    playAnimation("idle");
    if (soundEnabled) {
        sounds.purr.play();
    }

    petEl.onclick = () => {
        if (currentAction || petState === "dead") return;

        playAnimation("meow", false, 120);

        if (soundEnabled) {
            sounds.meow.currentTime = 0;
            sounds.meow.play();
        }
    };
}
window.onload = () => {
    initPet();

    document.body.addEventListener("click", startSoundOnce, { once: true });
};

function startSoundOnce() {
    if (soundEnabled) {
        sounds.purr.play();
    }
}

function setActionsDisabled(state) {
    const buttons = document.querySelectorAll(".actions .btn");

    buttons.forEach(btn => {
        btn.disabled = state;
        btn.style.opacity = state ? "0.5" : "1";
        btn.style.pointerEvents = state ? "none" : "auto";
    });
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


let animationInterval;

function playAnimation(name, loop = true, speed = 150) {
    const petEl = document.getElementById("pet-sprite");
    const frames = petsConfig[currentPetType].animations[name];

    if (!frames) return;

    let frame = 0;

    clearInterval(animationInterval);

    animationInterval = setInterval(() => {
        petEl.style.backgroundImage = `url(${frames[frame]})`;

        frame++;

        if (frame >= frames.length) {
            if (loop) {
                frame = 0;
            } else {
                clearInterval(animationInterval);

                // ❗ НЕ виходимо з death
                if (name !== "death") {
                    playAnimation("idle");
                }
            }
        }

    }, speed);
}
let sleepInterval;
let isSleeping = false;
function startSleep() {

    if (currentAction || petState === "dead") return;

    currentAction = "sleep";
    isSleeping = true;
    const gameBox = document.querySelector(".game-box.big");
    gameBox.classList.add("sleep-mode");
    const game = document.getElementById("game-area");

    game.classList.add("night");

    playAnimation("sleep", true, 300);

    sleepInterval = setInterval(() => {
        pet.energy += 5;
        pet.hunger -= 1;

        normalizePet();
        updateUI();

        if (pet.energy >= 100) {
            wakeUp();
        }
    }, 1000);
    setActionsDisabled(true);
}
function wakeUp() {
    isSleeping = false;

    clearInterval(sleepInterval);
    const gameBox = document.querySelector(".game-box.big");
    gameBox.classList.remove("sleep-mode");
    const game = document.getElementById("game-area"); // ✔️ додати
    game.classList.remove("night");

    playAnimation("sit", false);

    setTimeout(() => {
        playAnimation("idle");
    }, 1000);
    currentAction = null;
    setActionsDisabled(false);
}

let sponge;
let isWashing = false;
let dirtSpots = [];
let cleaned = 0;
function startWash() {

    if (currentAction || petState === "dead") return;

    currentAction = "wash";
    isWashing = true;
    document.querySelector(".game-box.big").classList.add("washing");
    const gameBox = document.querySelector(".game-box.big");
    gameBox.classList.add("wash-mode");

    const btn = document.querySelector(".actions .btn:nth-child(3)");
    btn.classList.add("active-wash");

    playAnimation("crouch", true, 200);

    setActionsDisabled(true);
    createSponge();
    spawnDirtOnPet();
}

function createSponge() {
    sponge = document.createElement("div");
    sponge.className = "sponge";

    document.querySelector(".pet-stage").appendChild(sponge);

    document.addEventListener("mousemove", moveSponge);
}

let lastX = 0;

function moveSponge(e) {
    if (!isWashing) return;

    const stage = document.querySelector(".pet-stage");
    const rect = stage.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    sponge.style.left = x + "px";
    sponge.style.top = y + "px";

    // 🔥 rotation (реально виглядає круто)
    const dx = x - lastX;
    const angle = dx * 2;
    sponge.style.transform = `rotate(${angle}deg)`;

    lastX = x;

    checkCleaning(e.clientX, e.clientY);
}
function createFoam(x, y) {
    const foam = document.createElement("div");
    foam.className = "foam";

    foam.style.left = x;
    foam.style.top = y;

    document.querySelector(".pet-stage").appendChild(foam);

    setTimeout(() => foam.remove(), 500);
}
function spawnDirtOnPet() {
    const pet = document.getElementById("pet-sprite");
    const stage = document.querySelector(".pet-stage");

    dirtSpots = [];
    cleaned = 0;

    for (let i = 0; i < 6; i++) {
        const dirt = document.createElement("div");
        dirt.className = "dirt";

        const x = pet.offsetLeft + (Math.random() * pet.offsetWidth * 2.5);

        // 🔥 ОПУСКАЄМО БРУД НИЖЧЕ
        const y = pet.offsetTop + (pet.offsetHeight * 0.9) + (Math.random() * pet.offsetHeight * 0.5);

        dirt.style.left = x + "px";
        dirt.style.top = y + "px";

        stage.appendChild(dirt);
        dirtSpots.push(dirt);
    }
}
function checkCleaning(mouseX, mouseY) {
    dirtSpots.forEach((dirt, index) => {
        if (!dirt) return;

        const dRect = dirt.getBoundingClientRect();

        const dx = mouseX - (dRect.left + dRect.width / 2);
        const dy = mouseY - (dRect.top + dRect.height / 2);

        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 40) {
            createFoam(dirt.style.left, dirt.style.top);

            dirt.remove();
            dirtSpots[index] = null;

            cleaned++;
            updateWashProgress();
        }
    });

    if (cleaned >= 6) finishWash();
}
function updateWashProgress() {
    // поки пусто або лог
    console.log("washing...");
}
function finishWash() {
    isWashing = false;
    document.querySelector(".game-box.big").classList.remove("washing");
    document.removeEventListener("mousemove", moveSponge);
    sponge.remove();

    const gameBox = document.querySelector(".game-box.big");
    gameBox.classList.remove("wash-mode");

    const btn = document.querySelector(".actions .btn:nth-child(3)");
    btn.classList.remove("active-wash");

    if (petState !== "dead") {
        pet.clean = 100;
        pet.happiness += 5;
    }
    setActionsDisabled(false);
    normalizePet();
    updateUI();
    currentAction = null;
    playAnimation("jump", false);

    setTimeout(() => {
        playAnimation("idle");
    }, 800);
}

const ball = document.getElementById("ball");

let isBallMoving = false;
let currentAction = null;
ball.onclick = () => {

    if (currentAction || petState === "dead") return;

    currentAction = "play";
    isBallMoving = true;
    pet.happiness += 10;
    pet.energy -= 5;
    pet.clean -= 3;
    normalizePet();
    updateUI();

    let x = 0;
    let y = 0;

    let velocityY = -14;
    let gravity = 1;

    let speedX = 3;

    let phase = 1; // 1 = вліво, 2 = назад вправо

    let interval = setInterval(() => {

        // 🔼 вертикаль
        y += velocityY;
        velocityY += gravity;

        // ⬅️ ФАЗА 1 — ВЛІВО ДО КОТА
        if (phase === 1) {
            x -= speedX;
        }

        // ➡️ ФАЗА 2 — НАЗАД ВПРАВО
        if (phase === 2) {
            x += speedX;

            // 🔥 гальмування ТІЛЬКИ біля старту
            if (x > -30) {
                speedX *= 0.92;
            }
        }
        ball.style.transform = `translate(${x}px, ${y}px)`;

        // 🐱 удар об землю
        if (y >= 0) {
            y = 0;
            velocityY = -10;

            playAnimation("jump", false, 80);
        }

        // 🐱 ДОЙШОВ ДО КОТА → назад
        if (phase === 1 && x < -250) {
            phase = 2;
        }

        // 🛑 зупинка
        if (phase === 2 && x >= -5 && y === 0) {
            clearInterval(interval);

            ball.style.transform = "translate(0,0)";
            isBallMoving = false;
            currentAction = null;
            playAnimation("idle");
        }

    }, 30);
};

let petState = "normal"; // normal | hurt | dead
function checkPetState() {

    // ☠️ смерть
    if (
        pet.happiness === 0 &&
        pet.clean === 0 &&
        pet.energy === 0 &&
        pet.hunger === 0
    ) {
        if (petState !== "dead") {
            petState = "dead";

            playAnimation("death", true, 200);
            applyDeathState(); // 🔥 ВАЖЛИВО
        }
        return;
    }

    // 😢 поганий стан
    if (
        pet.happiness < 50 &&
        pet.hunger < 50 &&
        pet.clean < 50 &&
        pet.energy < 50
    ) {
        if (petState !== "hurt") {
            petState = "hurt";
            playAnimation("hurt", true, 200);
        }
        return;
    }

    // 🙂 норм
    if (petState !== "normal") {
        petState = "normal";
        playAnimation("idle");
    }

}
function applyDeathState() {
    const game = document.querySelector(".game-box.big");
    game.classList.add("dead");

    setActionsDisabled(true);

    let btn = document.getElementById("revive-btn");

    if (!btn) {
        btn = document.createElement("button");
        btn.id = "revive-btn";
        btn.className = "btn revive-btn";
        btn.textContent = "💔 Revive";

        btn.onclick = revivePet;

        game.appendChild(btn);
    }
}
function revivePet() {

    pet.happiness = 50;
    pet.hunger = 50;
    pet.clean = 50;
    pet.energy = 50;

    petState = "normal";

    document.querySelector(".game-box.big").classList.remove("dead");

    setActionsDisabled(false);

    const btn = document.getElementById("revive-btn");
    if (btn) btn.remove();

    updateUI();
    playAnimation("idle");
}
let currentBubble = null;

function showBubble(text) {
    if (currentBubble) return; // ❌ вже є → не створюємо нову

    const bubble = document.createElement("div");
    bubble.className = "speech-bubble";
    bubble.textContent = text;

    const pet = document.getElementById("pet-sprite");

    const rect = pet.getBoundingClientRect();
    const stage = document.querySelector(".pet-stage").getBoundingClientRect();

    bubble.style.left = (rect.left - stage.left + rect.width / 2 - 40) + "px";
    bubble.style.top = (rect.top - stage.top - 40) + "px";

    document.querySelector(".pet-stage").appendChild(bubble);

    currentBubble = bubble;

    setTimeout(() => {
        bubble.remove();
        currentBubble = null;
    }, 2000);
}

const soundBtn = document.getElementById("sound-toggle");

soundBtn.onclick = () => {
    soundEnabled = !soundEnabled;

    if (soundEnabled) {
        soundBtn.textContent = "🔊";
        soundBtn.classList.remove("off");

        sounds.purr.play();
    } else {
        soundBtn.textContent = "🔇";
        soundBtn.classList.add("off");

        sounds.purr.pause();
        sounds.purr.currentTime = 0;
    }
};
const gameSection = document.getElementById("game-area");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

        if (entry.isIntersecting) {
            // 👀 видно гру
            if (soundEnabled) {
                sounds.purr.play().catch(() => {});
            }

        } else {
            // 🚫 не видно
            sounds.purr.pause();
            sounds.purr.currentTime = 0;
        }

    });
}, {
    threshold: 0.4 // скільки % блоку має бути видно
});

observer.observe(gameSection);