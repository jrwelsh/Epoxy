const canvas = document.getElementById("builderCanvas");
const ctx = canvas.getContext("2d");

const woodSelect = document.getElementById("woodSelect");
const epoxyColorInput = document.getElementById("epoxyColor");
const opacityInput = document.getElementById("opacity");
const shapeSelect = document.getElementById("shapeSelect");
const widthInput = document.getElementById("width");
const randomizeBtn = document.getElementById("randomize");

// Wood texture images
const woodTextures = {
  oak: "textures/oak.jpg",
  cherry: "textures/cherry.jpg",
  walnut: "textures/walnut.jpg",
};

const woodImages = {};
let loaded = false;

// Preload textures
let loadCount = 0;
for (let key in woodTextures) {
  const img = new Image();
  img.src = woodTextures[key];
  img.onload = () => {
    woodImages[key] = img;
    loadCount++;
    if (loadCount === Object.keys(woodTextures).length) {
      loaded = true;
      drawTable();
    }
  };
}

// Main draw function
function drawTable() {
  if (!loaded) return;

  const wood = woodSelect.value;
  const epoxyColor = epoxyColorInput.value;
  const epoxyOpacity = parseFloat(opacityInput.value);
  const shape = shapeSelect.value;
  const epoxyWidth = parseInt(widthInput.value);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw wood background
  ctx.drawImage(woodImages[wood], 0, 0, canvas.width, canvas.height);

  ctx.fillStyle = hexToRGBA(epoxyColor, epoxyOpacity);

  if (shape === "river") {
    drawRiver(epoxyWidth);
  } else if (shape === "square") {
    const x = canvas.width / 2 - epoxyWidth / 2;
    ctx.fillRect(x, 0, epoxyWidth, canvas.height);
  } else if (shape === "circle") {
    const radius = Math.min(epoxyWidth, canvas.height / 2) * 0.8;
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Draw river epoxy
function drawRiver(width) {
  ctx.beginPath();
  const mid = canvas.width / 2;
  const taperStart = 0.6; // taper factor

  for (let y = 0; y <= canvas.height; y++) {
    const taper = 1 - (y / canvas.height) * taperStart;
    const offset = Math.sin(y * 0.02) * 20; // smoother wave
    const halfWidth = (width / 2) * taper;

    const x = mid + offset;
    if (y === 0) ctx.moveTo(x - halfWidth, y);
    else ctx.lineTo(x - halfWidth, y);
  }
  for (let y = canvas.height; y >= 0; y--) {
    const taper = 1 - (y / canvas.height) * taperStart;
    const offset = Math.sin(y * 0.02) * 20;
    const halfWidth = (width / 2) * taper;

    const x = mid + offset;
    ctx.lineTo(x + halfWidth, y);
  }
  ctx.closePath();
  ctx.fill();
}

// Randomize button
randomizeBtn.addEventListener("click", () => {
  woodSelect.value = randomChoice(Object.keys(woodTextures));
  epoxyColorInput.value = randomColor();
  opacityInput.value = Math.random().toFixed(2);
  shapeSelect.value = randomChoice(["river", "square", "circle"]);
  widthInput.value = Math.floor(Math.random() * 180) + 20;
  drawTable();
});

// Event listeners
[woodSelect, epoxyColorInput, opacityInput, shapeSelect, widthInput].forEach(el => {
  el.addEventListener("input", drawTable);
});

// Helpers
function hexToRGBA(hex, alpha) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r},${g},${b},${alpha})`;
}

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}