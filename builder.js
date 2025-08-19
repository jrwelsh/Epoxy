// Builder.js (must match lowercase name in HTML)

const canvas = document.getElementById("builderCanvas");
const ctx = canvas.getContext("2d");

const woodType = document.getElementById("woodType");
const epoxyColor = document.getElementById("epoxyColor");
const shape = document.getElementById("shape");
const riverWidth = document.getElementById("riverWidth");
const randomizeBtn = document.getElementById("randomize");

// Placeholder wood textures (replace with actual images later)
const woodTextures = {
  oak: "#c8ad7f",
  walnut: "#5c4033",
  cherry: "#d2691e",
  maple: "#ffe4b5",
};

function drawTable() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const selectedWood = woodType.value;
  const epoxy = epoxyColor.value;
  const currentShape = shape.value;
  const width = parseInt(riverWidth.value);

  // Draw background wood
  ctx.fillStyle = woodTextures[selectedWood];
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = epoxy;
  ctx.beginPath();

  if (currentShape === "rectangle" || currentShape === "square") {
    // Natural river
    let riverPath = new Path2D();
    let midX = canvas.width / 2;
    riverPath.moveTo(midX - width / 2, 0);

    for (let y = 0; y <= canvas.height; y += 20) {
      let offset = Math.sin(y / 40) * 30; // smoother wave
      riverPath.lineTo(midX - width / 2 + offset, y);
    }

    for (let y = canvas.height; y >= 0; y -= 20) {
      let offset = Math.sin(y / 40) * 30;
      riverPath.lineTo(midX + width / 2 + offset, y);
    }

    riverPath.closePath();
    ctx.fill(riverPath);

  } else if (currentShape === "circle") {
    // Circle with epoxy river through middle
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 180, 0, Math.PI * 2);
    ctx.clip();

    ctx.fillStyle = epoxy;
    let midX = canvas.width / 2;
    let riverPath = new Path2D();
    riverPath.moveTo(midX - width / 2, 0);

    for (let y = 0; y <= canvas.height; y += 20) {
      let offset = Math.sin(y / 50) * 25;
      riverPath.lineTo(midX - width / 2 + offset, y);
    }
    for (let y = canvas.height; y >= 0; y -= 20) {
      let offset = Math.sin(y / 50) * 25;
      riverPath.lineTo(midX + width / 2 + offset, y);
    }

    riverPath.closePath();
    ctx.fill(riverPath);
  }
}

function randomize() {
  const woods = Object.keys(woodTextures);
  woodType.value = woods[Math.floor(Math.random() * woods.length)];
  shape.value = ["rectangle", "square", "circle"][Math.floor(Math.random() * 3)];
  riverWidth.value = Math.floor(Math.random() * 150) + 20;
  epoxyColor.value = "#" + Math.floor(Math.random() * 16777215).toString(16);
  drawTable();
}

woodType.addEventListener("change", drawTable);
epoxyColor.addEventListener("input", drawTable);
shape.addEventListener("change", drawTable);
riverWidth.addEventListener("input", drawTable);
randomizeBtn.addEventListener("click", randomize);

drawTable();