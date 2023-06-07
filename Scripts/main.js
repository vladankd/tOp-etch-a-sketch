let containerWidth = 720;

const container = document.querySelector(".container");
const colorPicker = document.querySelector("#color_picker");

createGrid(8);

const pixels = document.querySelectorAll(".pixel");

const resetGrid = document.querySelector("#reset_btn");
resetGrid.addEventListener("click", clearGridColors);

pixels.forEach((px) => {
  px.addEventListener("mousedown", paint);
  px.addEventListener("mouseover", paintDrag);
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

function paintDrag(e) {
  let color = colorPicker.value;
  if (e.buttons) {
    e.target.style.backgroundColor = color;
  }
}
function paint(e) {
  let color = colorPicker.value;
  e.target.style.backgroundColor = color;
}
