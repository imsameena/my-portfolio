// Load items from localStorage
// LOAD ITEMS
let items = JSON.parse(localStorage.getItem("items")) || [];

// ADD ITEM
function addItem() {
  let name = document.getElementById("name").value;
  let location = document.getElementById("location").value;
  let desc = document.getElementById("desc").value;
  let type = document.getElementById("type").value;
  let imageInput = document.getElementById("image").files[0];

  if (!name || !location) {
    alert("Please fill all fields");
    return;
  }

  let reader = new FileReader();

  reader.onload = function () {
    let item = {
      name,
      location,
      desc,
      type,
      time: new Date().toLocaleTimeString(),
      image: reader.result
    };

    items.push(item);
    localStorage.setItem("items", JSON.stringify(items));

    displayItems();
  };

  if (imageInput) {
    reader.readAsDataURL(imageInput);
  } else {
    reader.onload();
  }
}

// DISPLAY ITEMS
function displayItems() {
  let container = document.getElementById("itemsContainer");
  container.innerHTML = "<h2>Recent Items</h2>";

  items.forEach((item, index) => {
    let card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <span class="tag ${item.type.toLowerCase()}">${item.type}</span>
      ${item.image ? `<img src="${item.image}" class="item-img">` : ""}
      <h3>${item.name}</h3>
      <p>📍 ${item.location}</p>
      <p>${item.desc}</p>
      <p>${item.time}</p>

      <button onclick="deleteItem(${index})" class="delete-btn">
        Mark Found
      </button>
    `;

    container.appendChild(card);
  });
}

// SEARCH FUNCTION
function searchItems() {
  let query = document.querySelector(".hero input").value.toLowerCase();

  let filtered = items.filter(item =>
    item.name.toLowerCase().includes(query)
  );

  let container = document.getElementById("itemsContainer");
  container.innerHTML = "<h2>Search Results</h2>";

  filtered.forEach((item, index) => {
    let card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <span class="tag ${item.type.toLowerCase()}">${item.type}</span>
      ${item.image ? `<img src="${item.image}" class="item-img">` : ""}
      <h3>${item.name}</h3>
      <p>📍 ${item.location}</p>
      <p>${item.desc}</p>
      <p>${item.time}</p>

      <button onclick="deleteItem(${index})" class="delete-btn">
        Mark Found
      </button>
    `;

    container.appendChild(card);
  });
}

// FILTER FUNCTION
function filterItems(type) {
  let filtered = type === "All"
    ? items
    : items.filter(item => item.type === type);

  let container = document.getElementById("itemsContainer");
  container.innerHTML = "<h2>Filtered Items</h2>";

  filtered.forEach((item, index) => {
    let card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <span class="tag ${item.type.toLowerCase()}">${item.type}</span>
      ${item.image ? `<img src="${item.image}" class="item-img">` : ""}
      <h3>${item.name}</h3>
      <p>📍 ${item.location}</p>
      <p>${item.desc}</p>
      <p>${item.time}</p>

      <button onclick="deleteItem(${index})" class="delete-btn">
        Mark Found
      </button>
    `;

    container.appendChild(card);
  });
}

// DELETE ITEM (MARK FOUND)
function deleteItem(index) {
  if (confirm("Mark this item as found?")) {
    items.splice(index, 1);
    localStorage.setItem("items", JSON.stringify(items));
    displayItems();
  }
}

// SET TYPE (FROM BUTTONS)
function setType(value) {
  document.getElementById("type").value = value;

  document.querySelector(".form").scrollIntoView({
    behavior: "smooth"
  });
}

// LOAD ITEMS ON START
displayItems();