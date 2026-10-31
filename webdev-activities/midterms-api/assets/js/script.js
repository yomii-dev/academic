const elInput = document.getElementById("searchInput");
const elType = document.getElementById("type");

const elParent = document.getElementById("parent");

const uh = {
  fullName: "Galfoy",
  nickname: "Galfoy",
  hogwartsHouse: "Slytherin",
  interpretedBy: "redteneri",
  children: [],
  image: "assets/img/galfoy.jpg",
  birthDate: "Jul 31, 1980",
};

const uhWords = ["galfoy", "malfoid"];

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
  elParent.innerHTML += `
    <div class="col-3">
      <div class="card">
        <img src="${data.image}" alt="" class="img-fluid">
        <h5> ${data.fullName} </h5>
      </div>
    </div>
  `;
}

function _renderBook(data) {
  elParent.innerHTML += `
    <div class="col-3">
      <div class="card">${data.title}</div>
    </div>
  `;
}

function _renderHouse(data) {
  elParent.innerHTML += `
    <div class="col-3">
      <div class="card">${data.house}</div>
    </div>
  `;
}

function _renderSpell(data) {
  elParent.innerHTML += `
    <div class="col-3">
      <div class="card">${data.spell}</div>
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

const fetchStuff = async () => {
  // clear parent innerHTML
  elParent.innerHTML = "";

  const response = await fetch(
    `https://potterapi-fedeperin.vercel.app/en/${elType.value}?search=${elInput.value}`,
  );
  const stuff = await response.json();

  if (isMalfoy()) {
    stuff.push(uh);
  }

  // also make function so its usable for every type - in progress
  for (let i = 0; i < stuff.length; i++) {
    addCard(elType.value, stuff[i]);
  }

  // add something like nothing found if nothing found(wow)
  elParent.innerHTML = elParent.innerHTML || "Nothing lmaoaoaoa";
};
