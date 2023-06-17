let canvasContainerWidth = 640;

const canvasContainer = document.querySelector(".canvas_container");
const colorPicker = document.querySelector("#color_picker");
const randomColorBtn = document.querySelector("#random_color_btn");
const shaderBtn = document.querySelector("#shade_color_btn");
const lightenBtn = document.querySelector("#lighten_color_btn");
const eraseBtn = document.querySelector("#erase_btn");

// Shader
shaderBtn.addEventListener("click", (e) => {
  shaderBtn.classList.toggle("active");
  lightenBtn.classList.remove("active");
  let pixels = document.querySelectorAll(".pixel");
  Array.from(pixels).forEach((px) => {
    px.classList.toggle("shading");
    px.classList.remove("lighten");
    px.addEventListener("mouseenter", shadePixels);
  });
});

// Lighten
lightenBtn.addEventListener("click", (e) => {
  lightenBtn.classList.toggle("active");
  shaderBtn.classList.remove("active");
  let pixels = document.querySelectorAll(".pixel");
  Array.from(pixels).forEach((px) => {
    px.classList.toggle("lighten");
    px.classList.remove("shading");
    px.addEventListener("mouseenter", lightenPixels);
  });
});

// random colors
randomColorBtn.addEventListener("click", (e) => {
  randomColorBtn.classList.toggle("active");
});

// erase pixel
eraseBtn.addEventListener("click", (e) => {
  e.target.classList.toggle("active");
  Array.from(pixels).forEach((px) => {
    px.addEventListener("click", erasePx);
  });
});

// Should I just remove style for background or should background be a white or some other color?
let bgColor = "rgb(255,255,255)";

// Range input
const range = document.querySelector("#grid_size_selector");

// span value dinamic update
const gridSizeValueSpan = document.querySelectorAll(".grid_size");
range.addEventListener("input", (e) => {
  gridSizeValueSpan.forEach((span) => (span.innerText = range.value));
});

createGrid(range.value);
gridSizeValueSpan.forEach((span) => (span.innerText = range.value));

// This changes grid size
range.addEventListener("change", (e) => {
  canvasContainer.innerHTML = "";
  createGrid(range.value);

  // check if active class on button is set and removing it by toggling
  if (randomColorBtn.classList.contains("active")) {
    randomColorBtn.classList.toggle("active");
  }
  if (shaderBtn.classList.contains("active")) {
    shaderBtn.classList.toggle("active");
  }
  if (lightenBtn.classList.contains("active")) {
    lightenBtn.classList.toggle("active");
  }
  if (eraseBtn.classList.contains("active")) {
    eraseBtn.classList.toggle("active");
  }

  // reset colors on canvas
  resetGrid.addEventListener("click", clearGridColors);
});

const pixels = document.querySelectorAll(".pixel");

// Reset grid button functionality
const resetGrid = document.querySelector("#reset_btn");
resetGrid.addEventListener("click", clearGridColors);

/////////////////////
// Program functions
////////////////////

function createGrid(gridSize) {
  // determine pixel size for diferent grid sizes
  let size;
  // To fix the bug where firefox breaks the layout on odd number of pixels due to rounding to higher number
  // It still has bad layout on some grid sizes in FF but at least it doesnt break the layout alltogether
  if (navigator.userAgent.includes("Firefox")) {
    size = Math.floor(canvasContainerWidth / gridSize);
  } else {
    size = canvasContainerWidth / gridSize;
  }

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
      pixel.addEventListener("click", erasePx);

      // Random color paint
      randomColorBtn.addEventListener("click", (e) => {
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

// reset colors on the grid
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

// erase pixel
function erasePx(e) {
  if (eraseBtn.classList.contains("active")) {
    e.target.style.backgroundColor = "";
  }
  return;
}

// Shader
function shadePixels(e) {
  if (e.target.classList.contains("shading")) {
    if (e.target.style.backgroundColor) {
      let pxColor = e.target.style.backgroundColor;
      const rgbValues = pxColor.match(/\d+/g);
      let r = parseInt(rgbValues[0]);
      let g = parseInt(rgbValues[1]);
      let b = parseInt(rgbValues[2]);

      r -= 15;
      g -= 15;
      b -= 15;

      e.target.style.backgroundColor = `rgb(${r},${g},${b})`;
    }
  }
}
function lightenPixels(e) {
  if (e.target.classList.contains("lighten")) {
    if (e.target.style.backgroundColor) {
      let pxColor = e.target.style.backgroundColor;
      const rgbValues = pxColor.match(/\d+/g);
      let r = parseInt(rgbValues[0]);
      let g = parseInt(rgbValues[1]);
      let b = parseInt(rgbValues[2]);

      r += 10;
      g += 10;
      b += 10;

      e.target.style.backgroundColor = `rgb(${r},${g},${b})`;
    }
  }
}

// random number 0-255 for rgb color value
function randomNumber() {
  return Math.floor(Math.random() * 256);
}
