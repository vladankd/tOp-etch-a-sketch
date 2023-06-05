let containerWidth = 720;

const container = document.querySelector(".container");

createGrid(32);

const pixels = document.querySelectorAll(".pixel");

const resetGrid = document.querySelector("#reset_btn");
resetGrid.addEventListener("click", clearGridColors);

pixels.forEach((px) => {
  px.addEventListener("mouseover", (e) => {
    let color = "rgb(123,123,123)";
    if (e.buttons) {
      e.target.style.backgroundColor = color;
    }
  });
});

// progaram functions

function createGrid(gridSize) {
  let size = containerWidth / gridSize;
  for (let i = 0; i < gridSize; i++) {
    const row = document.createElement("div");

    row.classList.add("row");
    container.appendChild(row);
    for (let j = 0; j < gridSize; j++) {
      const pixel = document.createElement("div");
      pixel.classList.add("pixel");
      pixel.style.height = `${size}px`;
      pixel.style.width = `${size}px`;
      row.appendChild(pixel);
    }
  }
}

function clearGridColors() {
  pixels.forEach((px) => {
    px.style.backgroundColor = "white";
  });
}
