addCards("volumes");
addCards("characters");

const volumesSection = document.getElementById("volumes");
const characterSection = document.getElementById("characters");

function addCards(section, filePath = "data.json") {
  fetch(filePath)
    .then((response) => response.json())
    .then((data) => {
      data[section].forEach((key) => {
        section == "volumes" ? _addVolume(key) : _addCharacter(key);
      });
    });
}

function _addVolume(volume) {
  volumesSection.innerHTML += `
  <div class="col-6 col-lg-4 col-xl-3">
    <div class="card h-100">
      <img
        src="${volume.imagePath}"
        class="card-img-top"
        alt="Volume ${volume.volumeNum} Cover Art"
      />
      <div class="card-body p-3 gap-3 d-flex justify-content-between align-content-center">
        <p class="my-auto">Volume ${volume.volumeNum}</p>
         <button
          type="button"
          class="btn btn-ctp-mauve"
          data-bs-toggle="modal"
          data-bs-target="#volume${volume.volumeNum}"
        >
          More Info
        </button>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal fade" id="volume${volume.volumeNum}" tabindex="-1" aria-labelledby="vol${volume.volumeNum}Label" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="vol${volume.volumeNum}Label">Volume ${volume.volumeNum}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body text-start">
           <img src="${volume.imagePath}" class="img-fluid" alt="Volume ${volume.volumeNum} Modal Pic">

           <h4 class="pt-4">Summary</h4>
           <p>${volume.summary || "Nothing lmaoaoaoa"}</p>

           <h4>Details</h4>
           <div class="d-flex">
             <div class="w-50">
               <h6 class="fw-bold">Release Date:</h6>
               <p>JP: ${volume.releaseDate.jp || "N/A"}</p>
               <p>EN: ${volume.releaseDate.en || "N/A"}</p>
             </div>

             <div class="w-50">
               <h6 class="fw-bold">Pages:</h6>
               <p>JP: ${volume.pages.jp || "N/A"}</p>
               <p>EN: ${volume.pages.en || "N/A"}</p>
             </div>
           </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
  `;
}

function _addCharacter(character) {
  characterSection.innerHTML += `

  <div class="col-6 col-lg-4 col-xl-3">
    <div class="card h-100">
     <img
      src="${character.imagePath}"
      class="card-img-top"
      alt="${character.name} Character Art"
    />
      <div class="card-body p-3 gap-3 d-flex justify-content-between align-content-center">
        <p class="my-auto">${character.name}</p>
         <button
          type="button"
          class="btn btn-ctp-mauve"
          data-bs-toggle="modal"
          data-bs-target="#${character.name}"
        >
          More Info
        </button>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal fade" id="${character.name}" tabindex="-1" aria-labelledby="${character.name}" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="${character.name}">
            ${character.name} ${character.title}
            </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body text-start">
           <img src="${character.imagePath}" class="img-fluid" alt="${character.name} Modal Pic">

           <h4 class="pt-4">About</h4>
           <p>${character.description || "Nothing lmaoaoaoa"}</p>

           <h4>Details</h4>
           <div class="d-flex mt-3 gap-3">
             <div class="w-50">
               <h6 class="fw-bold">Witch Title:</h6>
               <p>${character.title || "N/A"}</p>
               <h6 class="fw-bold">Role:</h6>
               <p>${character.role || "N/A"}</p>
             </div>

             <div class="w-50">
              <h6 class="fw-bold">JP Name:</h6>
              <p>${character.japaneseName || "N/A"}</p>
              <h6 class="fw-bold">Voice Actors:</h6>
              <p>JP: ${character.voiceActors.jp || "N/A"}</p>
              <p>EN: ${character.voiceActors.en || "N/A"}</p>
             </div>
           </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
  `;
}
