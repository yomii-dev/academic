addCards("volumes");

let volumesSection = document.getElementById("volumes");

function addCards(section, filePath = "data.json") {
  // Chore: make if else statement whether it is used for volumes or characters
  fetch(filePath)
    .then((response) => response.json())
    .then((data) => {
      data[section].forEach((key) => {
        volumesSection.innerHTML += `
         <div class="col-3">
          ${key.volume}: ${key.summary}
        </div>
        `;
      });
    });
}
