// Initialization
const elInput = document.getElementById("searchInput");
const elType = document.getElementById("type");
const elParent = document.getElementById("parent");
const elPage = document.getElementById("currentPage");
const elPrev = document.getElementById("prevPage");
const elNext = document.getElementById("nextPage");

const uh = {
  fullName: "Galfoy",
  nickname: "Galfoy | Malfoid",
  hogwartsHouse: "Slytherin",
  interpretedBy: "redteneri",
  children: [],
  image: "assets/img/galfoy.jpg",
  birthDate: "Jul 31, 1980",
};

const uhWords = ["galfoy", "malfoid"];

const houseColors = {
  Gryffindor: "#740001",
  Slytherin: "#1A472A",
  Ravenclaw: "#0E1A40",
  Hufflepuff: "#ECB939",
};

const types = ["characters", "books", "houses", "spells"];

// Pagination
let page = 1;
const perPage = 4;

function movePage(direction) {
  switch (direction) {
    case "previous":
      page = page - 1 > 0 ? page - 1 : 1;
      break;
    case "next":
      page++;
      break;
    default:
      break;
  }

  fetchStuff();
}

function togglePaginationButtons(data) {
  const hasPrev = page > 1;
  const hasNext = page * perPage < data.length;
  elPrev.classList.toggle("disabled", !hasPrev);
  elNext.classList.toggle("disabled", !hasNext);
  // make page indicator a number thing???
}

// URL thingie
// get the url variables as string i think
const queryString = window.location.search;
// make it easier to work with url variables
const urlParams = new URLSearchParams(queryString);
const urlSearch = urlParams.get("search");
const urlPage = parseInt(urlParams.get("page")) || null;
const urlType =
  urlParams.get("type") && types.includes(urlParams.get("type"))
    ? urlParams.get("type")
    : null;

// update stuff on start if url variables exists
elInput.value = urlSearch ?? null;
page = urlPage > 0 ? urlPage : page;
elType.value =
  urlParams.has("type") && types.includes(urlType)
    ? urlParams.get("type")
    : elType.value;

// Card thingie
function addCard(type, data) {
  switch (type) {
    case "characters":
      _renderCharacter(data);
      break;
    case "books":
      _renderBook(data);
      break;
    case "houses":
      _renderHouse(data);
      break;
    case "spells":
      _renderSpell(data);
      break;
    default:
      break;
  }
}

// maybe i could refactor these later idk
function _renderCharacter(data) {
  // use the id from potter api for getting data on the dedicated page idk
  elParent.innerHTML += `
    <div class="col-12">
      <a
        href="view.html?index=${data.index ?? "galfoy"}&${urlParams.toString()}"
        class="card h-item flex-row justify-content-between text-white text-decoration-none overflow-hidden"
        style="background-color: ${houseColors[data.hogwartsHouse]};"
      >
        <div class="p-4">
          <h3>${data.fullName}</h3>
          <p class="mb-0">"${data.nickname}"</p>
          <p>House ${data.hogwartsHouse}</p>
        </div>
        <img src="${data.image}" alt="" class="img-fluid">
      </a>
    </div>
  `;
}

function _renderBook(data) {
  elParent.innerHTML += `
    <div class="col-12">
      <a
        href="view.html?index=${data.index}&${urlParams.toString()}"
        class="card h-item flex-row justify-content-between text-decoration-none bg-body-tertiary overflow-hidden"
      >
        <div class="p-4">
          <h3>${data.title}</h3>
          <p class="mb-0">${data.releaseDate}</p>
          <p>${data.pages} pages</p>
        </div>
        <img src="${data.cover}" alt="${data.title} Book Cover" class="img-fluid">
      </a>
    </div>
  `;
}

function _renderHouse(data) {
  elParent.innerHTML += `
    <div class="col-12">
      <a
        href="view.html?index=${data.index}&${urlParams.toString()}"
        class="card h-item flex-row justify-content-between text-white text-decoration-none overflow-hidden"
        style="background-color: ${houseColors[data.house]};"
      >
        <div class="p-4">
          <h3>${data.house}</h3>
          <p class="mb-0">${data.animal}</p>
          <p>Founder: ${data.founder}</p>
        </div>
      <img src="assets/img/${data.house}.webp" alt="" class="img-fluid m-3">
      </a>
    </div>
  `;
}

function _renderSpell(data) {
  elParent.innerHTML += `
    <div class="col-12">
      <div
        href="view.html?index=${data.index}&${urlParams.toString()}"
        class="card h-item text-decoration-none bg-body-tertiary text-center justify-content-center"
      >
        <h3>
          ${data.spell}
        </h3>
      </div>
    </div>
  `;
}

function isMalfoy() {
  let isMalfoy = false;

  for (let i = 0; i < uhWords.length; i++) {
    if (uhWords[i].toLocaleLowerCase().includes(elInput.value)) {
      isMalfoy = true;
      break;
    }
  }

  return isMalfoy;
}

function search() {
  // basically a wrapper for fetchStuff but resets page to 1
  page = 1;
  elPage.innerHTML = page;
  fetchStuff();
}

function updateURL() {
  urlParams.set("page", page);
  urlParams.set("type", elType.value);
  elInput.value == ""
    ? urlParams.delete("search")
    : urlParams.set("search", elInput.value);

  const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
  history.replaceState(null, "", newUrl);
}

function pageCeilCheck(data) {
  // if page is too high from url var then set it to the last page
  if (page * perPage > data.length + (perPage - 1)) {
    page = Math.ceil(data.length / perPage);
  }
}

const fetchStuff = async () => {
  // clear parent innerHTML
  elParent.innerHTML = "";

  const response = await fetch(
    `https://potterapi-fedeperin.vercel.app/en/${elType.value}?search=${elInput.value}`,
  );
  const stuff = await response.json();

  if (elType.value == "characters" && isMalfoy()) {
    stuff.push(uh);
  }

  pageCeilCheck(stuff);
  updateURL();
  togglePaginationButtons(stuff);

  const start = Math.max(page * perPage - perPage, 0);
  const end = Math.min(start + perPage, stuff.length);
  elPage.innerHTML = page;

  // also make function so its usable for every type - in progress
  for (let i = start; i < end; i++) {
    addCard(elType.value, stuff[i]);
  }

  // add something like nothing found if nothing found(wow)
  elParent.innerHTML = elParent.innerHTML || "Nothing lmaoaoaoa";
};

// load characters on first load
fetchStuff();
