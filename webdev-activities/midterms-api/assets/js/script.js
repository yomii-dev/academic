 const elInput = document.getElementById("searchInput");
const elType = document.getElementById("type");

const elParent = document.getElementById("parent");

const fetchStuff = async () => {
  const response = await fetch(
    `https://potterapi-fedeperin.vercel.app/en/${elType.value}?search=${elInput.value}`,
  );

  const stuff = await response.json();

  // for loop ts
  // also make function so its usable for every type
  elParent.innerHTML += `
    <div class="col-3">
      <div class="card">hi</div>
    </div>
  `;
};
