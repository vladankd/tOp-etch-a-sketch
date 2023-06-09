let canvasContainerWidth = 720;

const canvasContainer = document.querySelector(".canvas_container");
const colorPicker = document.querySelector("#color_picker");

// Range input
const range = document.querySelector("#grid_size_selector");
const gridSizeValue = document.querySelectorAll(".grid_size");

createGrid(range.value);
gridSizeValue.forEach((span) => (span.innerText = range.value));

// This changes grid size  - reset button does not work now
range.addEventListener("change", (e) => {
  canvasContainer.innerHTML = "";
  createGrid(range.value);

  gridSizeValue.forEach((span) => (span.innerText = range.value));
  resetGrid.addEventListener("click", clearGridColors);
});

const pixels = document.querySelectorAll(".pixel");

// Reset grid button functionality
const resetGrid = document.querySelector("#reset_btn");
resetGrid.addEventListener("click", clearGridColors);

// program functions

function createGrid(gridSize) {
  let size = canvasContainerWidth / gridSize;

  for (let i = 0; i < gridSize; i++) {
    const row = document.createElement("div");

    row.classList.add("row");
    canvasContainer.appendChild(row);
    for (let j = 0; j < gridSize; j++) {
      const pixel = document.createElement("div");
      pixel.classList.add("pixel");
      pixel.style.height = `${size}px`;
      pixel.style.width = `${size}px`;
      row.appendChild(pixel);

      // Paint on pixel fucnctionality
      pixel.addEventListener("mousedown", paint);
      pixel.addEventListener("mouseover", paintDrag);
    }
  }

  // How to reset the grid after changeing its size?
  const pixels = document.querySelectorAll(".pixel");
  // Reset grid button functionality
  const resetGrid = document.querySelector("#reset_btn");
  resetGrid.addEventListener("click", (e) =>
    pixels.forEach((px) => (px.style.backgroundColor = "white"))
  );
}

function clearGridColors() {
  pixels.forEach((px) => {
    px.style.backgroundColor = "white";
  });
}

// Paint on click and drag
function paintDrag(e) {
  let color = colorPicker.value;
  if (e.buttons) {
    e.target.style.backgroundColor = color;
  }
}
// Paint on click
function paint(e) {
  let color = colorPicker.value;
  e.target.style.backgroundColor = color;
}
