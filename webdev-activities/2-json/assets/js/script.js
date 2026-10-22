addCards("volumes");

let volumesSection = document.getElementById("volumes");

function addCards(section, filePath = "data.json") {
  // Chore: make if else statement whether it is used for volumes or characters
  fetch(filePath)
    .then((response) => response.json())
    .then((data) => {
      data[section].forEach((key) => {
        volumesSection.innerHTML += `
        <div class="col-4">
          <div class="card p-3">
            <img
              src="${key.imagePath}"
              class="card-img-top"
              alt="Volume ${key.volume} Cover Art"
            />
            <div class="card-body">
              <p>Volume ${key.volume}</p>
            </div>
            <button
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#volume${key.volume}"
            >
              Launch demo modal
            </button>
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
              <div class="modal-body">
                ${key.summary}
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
        `;
      });
    });
}
