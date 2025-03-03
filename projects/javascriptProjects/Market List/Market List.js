//locations on html
const mainScreen = document.getElementById("mainScreen");

const buildMyListNavBtn = document.getElementById("buildMyListNavBtn");
const myListNavBtn = document.getElementById("myListNavBtn");
const infoNavBtn = document.getElementById("infoNavBtn");

const buildMyListScreen = document.getElementById("buildMyListScreen");
const addItemBtn = document.getElementById("addItemBtn");
const buildListContainer = document.getElementById("buildListContainer");

const myListScreen = document.getElementById("myListScreen");
const buyListContainer = document.getElementById("buyListContainer");
const doneBuyBtn = document.getElementById("doneBuyBtn");

const addItemSection = document.getElementById("addItemSection");
const addItemAndSaveBtn = document.getElementById("addItemAndSaveBtn");
const itemNameInput = document.getElementById("itemNameInput");
const categoryInput = document.getElementById("categoryInput");
const itemAmountInput = document.getElementById("itemAmountInput");

const infoScreen = document.getElementById("infoScreen");
//variables
let myList = loadList();
let categoryStrings = {
  fruits_vegetables: "פירות וירקות",
  dairy: "מוצרי חלב",
  meat_fish_eggs: "בשר ודגים",
  bakery: "מאפים",
  drinks: "משקאות",
  frozen_food: "מוצרים קפואים",
  cleaning_products: "מוצרי ניקוי",
  snacks_sweets: "חטיפים וממתקים",
  dry_goods: "מוצרים יבשים",
  spices_sauces: "תבלינים ורוטבים",
  toiletries: "מוצרי רחצה",
  pet_supplies: "מוצרי חיות",
  alcohol: "אלכוהול",
  baby_products: "מוצרי תינוקות",
  other: "כללי",
};
let correctScreen = "buildMyListScreen";
//item class
class Item {
  constructor(name, category, amount, categoryString) {
    this.name = name;
    this.category = category;
    this.amount = amount;
    this.categoryString = categoryString;
    this.icon = this.getCategoryIcon(category);
    this.id = Date.now() + Math.floor(Math.random());
    this.bought = false;

    if (this.category === "") {
      this.category = "other";
    }

    if (this.name === "") {
      this.name = "no name";
      console.error("Item has no name");
    }

    if (this.amount <= 0) {
      this.amount = 1;
    }
  }

  getCategoryIcon(category) {
    switch (category) {
      case "fruits_vegetables":
        return "🍏";
      case "dairy":
        return "🥛";
      case "meat_fish_eggs":
        return "🍗";
      case "bakery":
        return "🥖";
      case "drinks":
        return "🥤";
      case "frozen_food":
        return "❄️";
      case "cleaning_products":
        return "🧽";
      case "snacks_sweets":
        return "🍫";
      case "dry_goods":
        return "🥜";
      case "spices_sauces":
        return "🌶️";
      case "toiletries":
        return "🛀";
      case "pet_supplies":
        return "🐶";
      case "alcohol":
        return "🍷";
      case "baby_products":
        return "👶";
      default:
        console.error(`Unknown category: ${category}`);
        return "❓";
    }
  }
}
let itemIdCounter = 0;

//functions

//nav
function changeScreen(screen, button) {
  buildMyListScreen.style.display = "none";
  myListScreen.style.display = "none";
  infoScreen.style.display = "none";

  const screenElement = document.getElementById(screen);
  if (buildMyListNavBtn) buildMyListNavBtn.classList.remove("active");
  if (myListNavBtn) myListNavBtn.classList.remove("active");
  if (infoNavBtn) infoNavBtn.classList.remove("active");
  button.classList.add("active");
  if (screenElement) {
    screenElement.style.display = "flex";
    addItemSection.style.display = "none";
    correctScreen = screen;
    console.log("Screen changed to: " + screen);
  } else {
    console.error(`Unknown screen: ${screen}`);
  }
}

//build screen
function buildItemElementList(item) {
  const itemDiv = document.createElement("div");
  itemDiv.classList.add(
    "itemContainer",
    "row",
    "border",
    "m-2",
    "p-2",
    "d-flex",
    "align-items-center"
  );

  itemDiv.innerHTML = `
    <p class="fs-1 col-1 text-center">${item.icon}</p>
    <div class="col-7">
        <h2>${item.name}</h2>
        <p>${item.categoryString}</p>
    </div>
<input type="number" name="amount" class="form-control col mx-2"
  style="width:80px;" value="${item.amount}"
  onchange="updateItemAmount(event, ${item.id})" />
    <button type="button-2 " class="col-2 btn btn-danger m-2" onClick="removeItem(${item.id})" >הסר</button>
    </div>
  `;
  return itemDiv;
}

function buildMyList() {
  if (myList.length !== 0) {
    buildListContainer.innerHTML = "";
    const sortedList = myList.sort((a, b) =>
      a.category.localeCompare(b.category)
    );
    sortedList.forEach((item) => {
      const itemElement = buildItemElementList(item);
      buildListContainer.appendChild(itemElement);
    });
  } else {
    buildListContainer.innerHTML = `<h2>אין פריטים ברשימה</h2>`;
  }
}

function removeItem(itemId) {
  myList = myList.filter((item) => item.id !== itemId);
  console.log("Item removed from list");

  saveList();
  buildMyList();
  buildBuyList();
}

function updateItemAmount(event, itemId) {
  const item = myList.find((item) => item.id === Number(itemId));
  if (item) {
    const newAmount = event.target.value;
    if (newAmount <= 0) {
      removeItem(itemId);
    } else {
      item.amount = newAmount;
      console.log("Item amount updated");
      saveList();
    }
  }
}

function addItemToList() {
  const name = itemNameInput.value;
  const category = categoryInput.value;
  const amount = itemAmountInput.value;
  const categoryString = categoryStrings[category];

  let isItemExist = false;

  myList.forEach((element) => {
    if (element.name == name) {
      alert("הפריט כבר נמצע ברשימה...");
      isItemExist = true;
    }
  });
  if (isItemExist) {
    console.log("Item already exist, not adding to list");
    return;
  } else {
    const newItem = new Item(name, category, amount, categoryString);
    console.log(newItem);
    myList.push(newItem);

    itemAmountInput.value = "";
    itemNameInput.value = "";
    categoryInput.value = "";
    saveList();
    buildMyList();
    buildBuyList();
    console.log("Item added to list" + newItem);
  }
}

//events
addItemBtn.addEventListener("click", () => {
  if (addItemSection.style.display === "none") {
    addItemSection.style.display = "flex";
  } else {
    addItemSection.style.display = "none";
  }
});

addItemAndSaveBtn.addEventListener("click", addItemToList);

doneBuyBtn.addEventListener("click", doneBuy);

//my list screen
function buildBuyList() {
  if (myList.length !== 0) {
    buyListContainer.innerHTML = "";
    myList.forEach((item) => {
      buyListContainer.appendChild(buildItemBuyList(item));
    });
  } else {
    buyListContainer.innerHTML = `<h2>אין פריטים ברשימה</h2>`;
  }
}

function buildItemBuyList(item) {
  const itemDiv = document.createElement("div");
  itemDiv.classList.add(
    "itemContainer",
    "row",
    "border",
    "m-2",
    "p-2",
    "d-flex",
    "align-items-center"
  );

  const checkedAttribute = item.bought ? "checked" : "";
  const textDecoration = item.bought
    ? "text-decoration: line-through; opacity: 0.5;"
    : "";

  itemDiv.innerHTML = `
        <p class="fs-1 col-1 text-center">${item.icon}</p>
        <div class="col-8" style="${textDecoration}">
        <h2>${item.name}</h2>
        <p>${item.categoryString}</p>
      </div>
      <div class="col-1 d-flex justify-content-center text-center mx-2 border">
        ${item.amount}
      </div>
      <div
        class="form-check col-1 d-flex justify-content-center align-items-center"
      >
        <input
        class="form-check-input m-2"
        type="checkbox"
        ${checkedAttribute}
        onchange="markItemAsBought(${item.id}, this)"
      />
        <label class="form-check-label" for="flexCheckDefault"> קניתי </label>

    `;

  return itemDiv;
}

function markItemAsBought(itemId, checkboxElement) {
  const item = myList.find((item) => item.id === Number(itemId));
  if (item) {
    item.bought = checkboxElement.checked;

    saveList();

    buildBuyList();
  }
}

function doneBuy() {
  myList = myList.filter((item) => !item.bought);
  console.log("Bought items removed from list");
  saveList();
  buildMyList();
  buildBuyList();
}

//local storage
function saveList() {
  localStorage.setItem("mySavedList", JSON.stringify(myList));
}

function loadList() {
  const myListString = localStorage.getItem("mySavedList");
  let myList = [];
  if (myListString) {
    myList = JSON.parse(myListString);
    console.log("List loaded from local storage");
  } else {
    console.log("No list found!");
  }

  return myList;
}

buildBuyList();
buildMyList();
