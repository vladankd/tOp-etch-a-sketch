let canvasContainerWidth = 720;

const canvasContainer = document.querySelector(".canvas_container");
const colorPicker = document.querySelector("#color_picker");
const randomColorBtn = document.querySelector("#random_color_btn");

randomColorBtn.addEventListener("click", (e) => {
  randomColorBtn.classList.toggle("active");
});

let paintColor = colorPicker.value;
let bgColor = "white";

// Range input
const range = document.querySelector("#grid_size_selector");
// span value
const gridSizeValueSpan = document.querySelectorAll(".grid_size");

createGrid(range.value);
gridSizeValueSpan.forEach((span) => (span.innerText = range.value));

// This changes grid size
range.addEventListener("change", (e) => {
  canvasContainer.innerHTML = "";
  createGrid(range.value);
  // Since on grid size change colors are reset checking if active class on button is set and removing it by toggling
  if (randomColorBtn.classList.contains("active")) {
    randomColorBtn.classList.toggle("active");
  }

  gridSizeValueSpan.forEach((span) => (span.innerText = range.value));
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
      pixel.addEventListener("mousedown", (e) => paint(e));
      pixel.addEventListener("mouseover", (e) => paintDrag(e));

      // Random color paint
      randomColorBtn.addEventListener("click", (e) => {
        // document.querySelector("#random_color_btn").classList.toggle("active");
        pixel.classList.toggle("rainbow");
      });
    }
  }

  // reset the grid after changeing its size
  const pixels = document.querySelectorAll(".pixel");
  // Reset grid button
  const resetGrid = document.querySelector("#reset_btn");
  resetGrid.addEventListener("click", (e) => clearGridColors(pixels));
}

/////////////////////
// Program functions
////////////////////
function clearGridColors(pixels) {
  Array.from(pixels).forEach((px) => {
    px.style.backgroundColor = bgColor;
  });
}

// Paint on click and drag
function paintDrag(e, color = colorPicker.value) {
  if (e.target.classList.contains("rainbow")) {
    color = `rgb(${randomNumber()},${randomNumber()},${randomNumber()})`;
  }
  if (e.buttons) {
    e.target.style.backgroundColor = color;
  }
}
// Paint on click
function paint(e, color = colorPicker.value) {
  if (e.target.classList.contains("rainbow")) {
    color = `rgb(${randomNumber()},${randomNumber()},${randomNumber()})`;
  }
  e.target.style.backgroundColor = color;
}

// random number 0-255 for rgb color value
function randomNumber() {
  return Math.floor(Math.random() * 256);
}

// Just for rainbow color

// px.style.backgroundColor = `rgb(${randomNumber()},${randomNumber()},${randomNumber()})`;
// nice color
// main.js:49 rgb(94,215,246)
