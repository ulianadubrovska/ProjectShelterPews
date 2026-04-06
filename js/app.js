const animals = [

    // 🐶 DOGS (12)
    {name:"Luna", age:"2 years", category:"dogs", image:"img/dogs/dog1.jpg", description:"Friendly and playful"},
    {name:"Max", age:"3 years", category:"dogs", image:"img/dogs/dog2.jpg", description:"Loves people"},
    {name:"Rocky", age:"4 years", category:"dogs", image:"img/dogs/dog3.jpg", description:"Very loyal"},
    {name:"Charlie", age:"2 years", category:"dogs", image:"img/dogs/dog4.jpg", description:"Energetic boy"},
    {name:"Buddy", age:"1 year", category:"dogs", image:"img/dogs/dog5.jpg", description:"Playful puppy"},
    {name:"Milo", age:"3 years", category:"dogs", image:"img/dogs/dog6.jpg", description:"Smart and calm"},
    {name:"Jack", age:"2 years", category:"dogs", image:"img/dogs/dog7.jpg", description:"Good with kids"},
    {name:"Toby", age:"5 years", category:"dogs", image:"img/dogs/dog8.jpg", description:"Quiet and kind"},
    {name:"Oscar", age:"4 years", category:"dogs", image:"img/dogs/dog9.jpg", description:"Loves walking"},
    {name:"Bruno", age:"3 years", category:"dogs", image:"img/dogs/dog10.jpg", description:"Strong and brave"},
    {name:"Leo", age:"2 years", category:"dogs", image:"img/dogs/dog11.jpg", description:"Very friendly"},
    {name:"Zeus", age:"4 years", category:"dogs", image:"img/dogs/dog12.jpg", description:"Protective dog"},

    // 🐱 CATS (12)
    {name:"Bella", age:"1 year", category:"cats", image:"img/cats/cat1.jpg", description:"Cute and calm"},
    {name:"Lucy", age:"2 years", category:"cats", image:"img/cats/cat2.jpg", description:"Very gentle"},
    {name:"Kitty", age:"3 years", category:"cats", image:"img/cats/cat3.jpg", description:"Playful kitty"},
    {name:"Lily", age:"2 years", category:"cats", image:"img/cats/cat4.jpg", description:"Loves cuddles"},
    {name:"Mimi", age:"1 year", category:"cats", image:"img/cats/cat5.jpg", description:"Tiny and sweet"},
    {name:"Nala", age:"3 years", category:"cats", image:"img/cats/cat6.jpg", description:"Independent"},
    {name:"Simba", age:"2 years", category:"cats", image:"img/cats/cat7.jpg", description:"Curious boy"},
    {name:"Leo", age:"4 years", category:"cats", image:"img/cats/cat8.jpg", description:"Lazy king"},
    {name:"Chloe", age:"2 years", category:"cats", image:"img/cats/cat9.jpg", description:"Soft and calm"},
    {name:"Loki", age:"3 years", category:"cats", image:"img/cats/cat10.jpg", description:"Mischievous"},
    {name:"Snow", age:"1 year", category:"cats", image:"img/cats/cat11.jpg", description:"White beauty"},
    {name:"Tiger", age:"2 years", category:"cats", image:"img/cats/cat12.jpg", description:"Little hunter"},

    // 🐕 PUPPIES (12)
    {name:"Coco", age:"6 months", category:"puppies", image:"img/puppies/puppy1.jpg", description:"Super playful"},
    {name:"Daisy", age:"5 months", category:"puppies", image:"img/puppies/puppy2.jpg", description:"Loves toys"},
    {name:"Bobby", age:"7 months", category:"puppies", image:"img/puppies/puppy3.jpg", description:"Very active"},
    {name:"Lucky", age:"6 months", category:"puppies", image:"img/puppies/puppy4.jpg", description:"Happy puppy"},
    {name:"Rex", age:"8 months", category:"puppies", image:"img/puppies/puppy5.jpg", description:"Future guard"},
    {name:"Tiny", age:"4 months", category:"puppies", image:"img/puppies/puppy6.jpg", description:"Small and cute"},
    {name:"Bolt", age:"6 months", category:"puppies", image:"img/puppies/puppy7.jpg", description:"Fast runner"},
    {name:"Rocky Jr", age:"7 months", category:"puppies", image:"img/puppies/puppy8.jpg", description:"Strong pup"},
    {name:"Sunny", age:"5 months", category:"puppies", image:"img/puppies/puppy9.jpg", description:"Always happy"},
    {name:"Oreo", age:"6 months", category:"puppies", image:"img/puppies/puppy10.jpg", description:"Black & white cutie"},
    {name:"Mango", age:"5 months", category:"puppies", image:"img/puppies/puppy11.jpg", description:"Sweet puppy"},
    {name:"Bingo", age:"7 months", category:"puppies", image:"img/puppies/puppy12.jpg", description:"Very playful"},

    // 🐱 KITTENS (12)
    {name:"Snow", age:"4 months", category:"kittens", image:"img/kittens/kitten1.jpg", description:"Soft and white"},
    {name:"Shadow", age:"5 months", category:"kittens", image:"img/kittens/kitten2.jpg", description:"Loves hiding"},
    {name:"Tiger", age:"6 months", category:"kittens", image:"img/kittens/kitten3.jpg", description:"Little hunter"},
    {name:"Fluffy", age:"3 months", category:"kittens", image:"img/kittens/kitten4.jpg", description:"Very soft"},
    {name:"Murka", age:"5 months", category:"kittens", image:"img/kittens/kitten5.jpg", description:"Purring machine"},
    {name:"Kit", age:"4 months", category:"kittens", image:"img/kittens/kitten6.jpg", description:"Tiny kitten"},
    {name:"Whiskers", age:"5 months", category:"kittens", image:"img/kittens/kitten7.jpg", description:"Cute face"},
    {name:"Misty", age:"4 months", category:"kittens", image:"img/kittens/kitten8.jpg", description:"Calm baby"},
    {name:"Storm", age:"6 months", category:"kittens", image:"img/kittens/kitten9.jpg", description:"Energetic"},
    {name:"Nyan", age:"3 months", category:"kittens", image:"img/kittens/kitten10.jpg", description:"Funny kitty"},
    {name:"Pink", age:"5 months", category:"kittens", image:"img/kittens/kitten11.jpg", description:"Sweet girl"},
    {name:"Tom", age:"6 months", category:"kittens", image:"img/kittens/kitten12.jpg", description:"Playful boy"},

    // 🐰 SMALL ANIMALS (12)
    {name:"Bunny", age:"1 year", category:"smallanimals", image:"img/small/rabbit1.jpg", description:"Cute rabbit"},
    {name:"Hammy", age:"6 months", category:"smallanimals", image:"img/small/hamster2.jpg", description:"Tiny hamster"},
    {name:"Rio", age:"2 years", category:"smallanimals", image:"img/small/parrot3.jpg", description:"Talking bird"},
    {name:"Snowball", age:"1 year", category:"smallanimals", image:"img/small/rabbit4.jpg", description:"Very fluffy"},
    {name:"Chips", age:"8 months", category:"smallanimals", image:"img/small/hamster5.jpg", description:"Fast runner"},
    {name:"Kiwi", age:"2 years", category:"smallanimals", image:"img/small/parrot6.jpg", description:"Colorful bird"},
    {name:"Fluff", age:"1 year", category:"smallanimals", image:"img/small/rabbit7.jpg", description:"Soft bunny"},
    {name:"Speedy", age:"7 months", category:"smallanimals", image:"img/small/hamster8.jpg", description:"Very fast"},
    {name:"Sky", age:"2 years", category:"smallanimals", image:"img/small/parrot9.jpg", description:"Loud bird"},
    {name:"Cotton", age:"1 year", category:"smallanimals", image:"img/small/rabbit10.jpg", description:"White rabbit"},
    {name:"Peanut", age:"6 months", category:"smallanimals", image:"img/small/hamster11.jpg", description:"Small hamster"},
    {name:"Sunny", age:"2 years", category:"smallanimals", image:"img/small/parrot12.jpg", description:"Happy bird"},

    // ⭐ SPECIAL (12)
    {name:"Hope", age:"3 years", category:"special", image:"img/special/dog_special1.jpg", description:"Needs special care"},
    {name:"Angel", age:"2 years", category:"special", image:"img/special/cat_special2.jpg", description:"Very gentle soul"},
    {name:"Brave", age:"4 years", category:"special", image:"img/special/dog_special3.jpg", description:"Strong survivor"},
    {name:"Lucky", age:"5 years", category:"special", image:"img/special/dog_special4.jpg", description:"Needs love"},
    {name:"Miracle", age:"3 years", category:"special", image:"img/special/cat_special5.jpg", description:"Recovered hero"},
    {name:"Faith", age:"2 years", category:"special", image:"img/special/cat_special6.jpg", description:"Calm and kind"},
    {name:"Joy", age:"4 years", category:"special", image:"img/special/dog_special7.jpg", description:"Sweet heart"},
    {name:"Hero", age:"3 years", category:"special", image:"img/special/cat_special8.jpg", description:"Very brave"},
    {name:"Light", age:"5 years", category:"special", image:"img/special/dog_special9.jpg", description:"Needs patience"},
    {name:"Grace", age:"2 years", category:"special", image:"img/special/dog_special10.jpg", description:"Loves people"},
    {name:"Sunny", age:"3 years", category:"special", image:"img/special/cat_special11.jpg", description:"Gentle pet"},
    {name:"Star", age:"4 years", category:"special", image:"img/special/dog_special12.jpg", description:"Special love"}
];

const container = document.getElementById("animals-container");
const buttons = document.querySelectorAll(".categories button");
const searchInput = document.querySelector(".search");

let currentCategory = "all";

// 🔹 РЕНДЕР
function renderAnimals(list) {
    container.innerHTML = "";

    list.forEach(animal => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
  <div class="card-img">
    <img src="${animal.image}">
    <div class="card-overlay">
        <p>${animal.description || "Friendly pet"}</p>
    </div>
  </div>
  <h3>${animal.name}</h3>
  <p>${animal.age}</p>
  <button class="btn">Adopt</button>
`;

        container.appendChild(card);
    });
}

// 🔹 ФІЛЬТР
function filterAnimals() {
    let filtered = animals;

    if (currentCategory !== "all") {
        filtered = filtered.filter(a => a.category === currentCategory);
    }

    const value = searchInput.value.toLowerCase();

    filtered = filtered.filter(a =>
        a.name.toLowerCase().includes(value)
    );

    renderAnimals(filtered);
}

// 🔹 КАТЕГОРІЇ
buttons.forEach(btn => {
    btn.addEventListener("click", () => {

        // 🔥 прибрати активний
        buttons.forEach(b => b.classList.remove("active"));

        // 🔥 додати новий
        btn.classList.add("active");

        currentCategory = btn.textContent.toLowerCase().replace(" ", "");
        filterAnimals();
    });
});

// 🔍 ПОШУК
searchInput.addEventListener("input", filterAnimals);

// старт
renderAnimals(animals);
const btn = document.getElementById("topBtn");

window.onscroll = () => {
    btn.style.display = window.scrollY > 300 ? "block" : "none";
};

btn.onclick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
};

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        topBtn.classList.add("show");
    } else {
        topBtn.classList.remove("show");
    }
});

// скрол наверх
topBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});