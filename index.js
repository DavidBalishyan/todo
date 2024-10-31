let items = [];

const itemsDiv = document.getElementById("items");
const input = document.getElementById("itemInput");
const storageKey = "items";
const addbtn = document.getElementById("addbtn");
const clearbtn = document.getElementById("clearbtn");

function renderItems() {
  itemsDiv.innerHTML = null;

  for (const [idx, item] of Object.entries(items)) {
    const container = document.createElement("div");
    container.style.marginBottom = "10px";
    const text = document.createElement("p");
    text.style.display = "inline";
    text.style.marginRight = "10px";
    text.textContent = item;

    const button = document.createElement("button");
    button.id = "delbtn"
    button.textContent = "Delete";
    button.onclick = () => removeItem(idx);
    button.addEventListener("mouseenter", () => {
      button.style.backgroundColor = "#DC3545FF";
      button.style.color = "#ffffff";
    })
    button.addEventListener("mouseleave", () => {
      button.style.backgroundColor = "";
      button.style.color = "";
    })
    container.appendChild(text);
    container.appendChild(button);
    itemsDiv.appendChild(container);
  }
}

function loadItems() {
  const oldItems = localStorage.getItem(storageKey);
  if (oldItems) items = JSON.parse(oldItems);
  renderItems();
}

function saveItems() {
  const stringItems = JSON.stringify(items);
  localStorage.setItem(storageKey, stringItems);
}

function addItem() {
  const value = input.value;
  
  if (!value) {
    alert("You cannot add an empty item");
    return;
  }else if(input.value === "Clear()"){
    localStorage.clear();
    items = [];
    renderItems();
  }
  items.push(value);
  renderItems();
  input.value = "";
  saveItems();
}

clearbtn.addEventListener("click", () => {
    localStorage.clear();
    items = [];
    renderItems();
})  

input.addEventListener("keydown", (evt) => {
  if (evt.key === "Enter") {
    addItem();
  }
})

addbtn.addEventListener("click", addItem);

function removeItem(idx) {
  items.splice(idx, 1);
  renderItems();
  saveItems();
}

document.addEventListener("DOMContentLoaded", loadItems);

document.querySelector("body").addEventListener("mousemove", (evt) => {
  document.getElementById("coord").innerHTML = "Mouse coordinats" + ": " +   "X:" + evt.clientX + " " + "Y:" + evt.clientY;
  console.log("X:" + evt.clientX + " " + "Y:" + evt.clientY);
});