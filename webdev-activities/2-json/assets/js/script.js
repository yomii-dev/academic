addCards("volumes");

let volumesSection = document.getElementById("volumes");

function addCards(section, filePath = "data.json") {
  // Chore: make if else statement whether it is used for volumes or characters
  fetch(filePath)
    .then((response) => response.json())
    .then((data) => {
      data[section].forEach((key) => {
        volumesSection.innerHTML += `
        <div class="col-6 col-lg-4 col-xl-3">
          <div class="card h-100">
            <img
              src="${key.imagePath}"
              class="card-img-top"
              alt="Volume ${key.volume} Cover Art"
            />
            <div class="card-body p-3 gap-3 d-flex justify-content-between align-content-center">
              <p class="my-auto">Volume ${key.volume}</p>
               <button
                type="button"
                class="btn btn-ctp-mauve"
                data-bs-toggle="modal"
                data-bs-target="#volume${key.volume}"
              >
                More Info
              </button>
            </div>
          </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="volume${key.volume}" tabindex="-1" aria-labelledby="vol${key.volume}Label" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="vol${key.volume}Label">Volume ${key.volume}</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body text-start">
                 <img src="${key.imagePath}" class="img-fluid" alt="Volume ${key.volume} Modal Pic">

                 <h4 class="pt-4">Summary</h4>
                 <p>${key.summary || "Nothing lmaoaoaoa"}</p>

                 <h4>Details</h4>
                 <div class="d-flex">
                   <div class="w-50">
                     <h6 class="fw-bold">Release Date:</h6>
                     <p>JP: ${key.releaseDate.jp || "N/A"}</p>
                     <p>EN: ${key.releaseDate.en || "N/A"}</p>
                   </div>

                   <div class="w-50">
                     <h6 class="fw-bold">Pages:</h6>
                     <p>JP: ${key.pages.jp || "N/A"}</p>
                     <p>EN: ${key.pages.en || "N/A"}</p>
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
      });
    });
}
