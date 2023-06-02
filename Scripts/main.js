let containerWidth = 720;

const container = document.querySelector(".container");

function createGrid(grid) {
  console.log(grid);
  let size = containerWidth / grid;
  for (let i = 0; i < grid; i++) {
    const row = document.createElement("div");

    row.classList.add("row");
    container.appendChild(row);
    for (let j = 0; j < grid; j++) {
      const pixel = document.createElement("div");
      pixel.classList.add("pixel");
      pixel.style.height = `${size}px`;
      pixel.style.width = `${size}px`;
      row.appendChild(pixel);
    }
  }
}

createGrid(64);
