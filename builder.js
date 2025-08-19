const canvas = document.getElementById("builderCanvas");
const ctx = canvas.getContext("2d");

// Load wood textures
const woodTextures = {
  oak: "https://i.imgur.com/E3T4z6h.jpg",
  walnut: "https://i.imgur.com/2cOaZsJ.jpg",
  cherry: "https://i.imgur.com/6kphbP3.jpg",
  maple: "https://i.imgur.com/f7Y0iCw.jpg"
};

const woodImages = {};
for (let type in woodTextures) {
  const img = new Image();
  img.src = woodTextures[type];
  woodImages[type] = img;
}

let currentWood = "oak";
let epoxy = "#1e90ff";
let epoxyOpacity = 1.0;
let width = 100;
let currentShape = "river";

function drawTable() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // === Draw wood background ===
  const woodImg = woodImages[currentWood];
  if (woodImg.complete) {
    const pattern = ctx.createPattern(woodImg, "repeat");
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else {
    woodImg.onload = () => drawTable();
  }

  // === Draw epoxy river ===
  ctx.save();
  if (currentShape === "circle") {
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 180, 0, Math.PI * 2);
    ctx.clip();
  }

  ctx.fillStyle = epoxy;

  // Apply opacity
  ctx.globalAlpha = epoxyOpacity;

  let midX = canvas.width / 2;
  let riverPath = new Path2D();

  if (currentShape === "river") {
    riverPath.moveTo(midX - width / 2, 0);
    for (let y = 0; y <= canvas.height; y += 20) {
      let offset = Math.sin(y / 50) * 25;
      let taper = 0.3 + 0.7 * (1 - Math.abs((y - canvas.height / 2) / (canvas.height / 2)));
      riverPath.lineTo(midX - (width / 2) * taper + offset, y);
    }
    for (let y = canvas.height; y >= 0; y -= 20) {
      let offset = Math.sin(y / 50) * 25;
      let taper = 0.3 + 0.7 * (1 - Math.abs((y - canvas.height / 2) / (canvas.height / 2)));
      riverPath.lineTo(midX + (width / 2) * taper + offset, y);
    }
    riverPath.closePath();
    ctx.fill(riverPath);
  } else if (currentShape === "square") {
    ctx.fillRect(midX - width / 2, 50, width, canvas.height - 100);
  } else if (currentShape === "circle") {
    ctx.beginPath();
    ctx.arc(midX, canvas.height / 2, width / 2, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
  ctx.globalAlpha = 1.0;
}

// === Event Listeners ===
document.getElementById("woodType").addEventListener("change", e => {
  currentWood = e.target.value;
  drawTable();
});

document.getElementById("epoxyColor").addEventListener("input", e => {
  epoxy = e.target.value;
  drawTable();
});

document.getElementById("epoxyOpacity").addEventListener("input", e => {
  epoxyOpacity = parseFloat(e.target.value) / 100;
  drawTable();
});

document.getElementById("riverWidth").addEventListener("input", e => {
  width = parseInt(e.target.value);
  drawTable();
});

document.getElementById("shape").addEventListener("change", e => {
  currentShape = e.target.value;
  drawTable();
});

document.getElementById("randomizeBtn").addEventListener("click", () => {
  const woods = Object.keys(woodTextures);
  currentWood = woods[Math.floor(Math.random() * woods.length)];
  epoxy = "#" + Math.floor(Math.random() * 16777215).toString(16);
  epoxyOpacity = Math.random();
  width = 50 + Math.floor(Math.random() * 150);
  drawTable();
});

// === Initial draw ===
drawTable();