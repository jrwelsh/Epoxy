const canvas = document.getElementById("builderCanvas");
const ctx = canvas.getContext("2d");

const woodType = document.getElementById("woodType");
const epoxyColor = document.getElementById("epoxyColor");
const shape = document.getElementById("shape");
const riverWidth = document.getElementById("riverWidth");
const randomizeBtn = document.getElementById("randomize");

// Wood texture images
const woodImages = {
  oak: "images/wood/oak.jpg",
  walnut: "images/wood/walnut.jpg",
  cherry: "images/wood/cherry.jpg",
  maple: "images/wood/maple.jpg",
};

let woodPatterns = {};
let imagesLoaded = 0;
const totalImages = Object.keys(woodImages).length;

// Preload wood images and convert to patterns
for (let key in woodImages) {
  const img = new Image();
  img.src = woodImages[key];
  img.onload = () => {
    woodPatterns[key] = ctx.createPattern(img, "repeat");
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
      drawTable(); // draw once all textures are loaded
    }
  };
}

function drawTable() {
  if (imagesLoaded < totalImages) return; // Wait until all wood textures are ready

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const selectedWood = woodType.value;
  const epoxy = epoxyColor.value;
  const currentShape = shape.value;
  const width = parseInt(riverWidth.value);

  // === Draw background wood shape ===
  ctx.fillStyle = woodPatterns[selectedWood];

  if (currentShape === "rectangle") {
    ctx.fillRect(0, 0, canvas.width, canvas.height);

  } else if (currentShape === "square") {
    let size = Math.min(canvas.width, canvas.height) - 40;
    let x = (canvas.width - size) / 2;
    let y = (canvas.height - size) / 2;
    ctx.fillRect(x, y, size, size);

  } else if (currentShape === "circle") {
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 180, 0, Math.PI * 2);
    ctx.fill();
  }

  // === Draw epoxy river ===
  ctx.save();
  if (currentShape === "circle") {
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 180, 0, Math.PI * 2);
    ctx.clip();
  }

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
  ctx.restore();
}

function randomize() {
  const woods = Object.keys(woodImages);
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