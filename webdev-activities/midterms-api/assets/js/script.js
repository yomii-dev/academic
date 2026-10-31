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

// Pagination
let page = 1;
const perPage = 5;

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
  // also change color based on house?
  elParent.innerHTML += `
    <div class="col-12">
      <a
        href="#"
        class="card h-item flex-row justify-content-between text-white text-decoration-none"
        style="background-color: ${houseColors[data.hogwartsHouse]};"
      >
        <div class="p-4">
          <h3>${data.fullName}</h3>
          <h4>"${data.nickname}"</h4>
          <h5>House ${data.hogwartsHouse}</h4>
        </div>
        <img src="${data.image}" alt="" class="img-fluid">
      </a>
    </div>
  `;
}

function _renderBook(data) {
  elParent.innerHTML += `
    <div class="col-12">
      <a href="#" class="card h-item text-decoration-none">${data.title}</a>
    </div>
  `;
}

function _renderHouse(data) {
  elParent.innerHTML += `
    <div class="col-12">
      <a
        href="#"
        class="card h-item text-decoration-none text-white"
        style="background-color: ${houseColors[data.house]};"
      >
        ${data.house}
      </a>
    </div>
  `;
}

function _renderSpell(data) {
  elParent.innerHTML += `
    <a
      href="#"
      class="col-12">
      <div class="card h-item text-decoration-none">${data.spell}</div>
    </a>
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

  const hasPrev = page > 1;
  const hasNext = page * perPage < stuff.length;
  elPrev.classList.toggle("disabled", !hasPrev);
  elNext.classList.toggle("disabled", !hasNext);
  // make page indicator a number thing???


  const start = page * perPage - perPage;
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
