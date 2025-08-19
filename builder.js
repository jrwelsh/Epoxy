const canvas = document.getElementById("tableCanvas");
const ctx = canvas.getContext("2d");

const shapeSelect = document.getElementById("shape");
const sizeSelect = document.getElementById("size");
const woodSelect = document.getElementById("wood");
const colorPicker = document.getElementById("epoxyColor");
const opacitySlider = document.getElementById("opacity");
const riverWidthSlider = document.getElementById("riverWidth");
const randomizeBtn = document.getElementById("randomize");

// store current random seed & offset
let riverSeed = Math.random();
let riverYOffset = 0;

function drawTable() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const shape = shapeSelect.value;
  const size = parseInt(sizeSelect.value);
  const wood = woodSelect.value;
  const epoxyColor = colorPicker.value;
  const epoxyOpacity = parseFloat(opacitySlider.value);
  const riverWidth = parseInt(riverWidthSlider.value);

  // Wood colors
  const woodColors = {
    oak: "#C3B091",
    cherry: "#B94E48",
    walnut: "#5D3A1A",
    maple: "#E6D5B8",
    mahogany: "#4A2C2A"
  };
  const woodColor = woodColors[wood] || "#8B5A2B";

  // Center + scale
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const half = size * 5; // scaling factor

  ctx.save();

  if (shape === "circle") {
    ctx.beginPath();
    ctx.arc(cx, cy, half, 0, Math.PI * 2);
    ctx.fillStyle = woodColor;
    ctx.fill();
    drawRiverCircle(cx, cy, half, epoxyColor, epoxyOpacity, riverWidth);
  } else {
    let w = half * (shape === "square" ? 1 : 2);
    let h = half;

    ctx.fillStyle = woodColor;
    ctx.fillRect(cx - w / 2, cy - h / 2, w, h);
    drawRiverRect(cx, cy, w, h, epoxyColor, epoxyOpacity, riverWidth);
  }

  ctx.restore();
}

function drawRiverRect(cx, cy, w, h, color, opacity, width) {
  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.fillStyle = color;

  const step = 20;
  const amplitude = 30;
  const freq = 0.05;

  ctx.beginPath();
  ctx.moveTo(cx - w / 2, cy + riverYOffset);

  // generate top edge of river
  for (let x = -w / 2; x <= w / 2; x += step) {
    let yOffset = Math.sin((x + riverSeed * 100) * freq) * amplitude;
    ctx.lineTo(cx + x, cy + yOffset + riverYOffset);
  }

  // generate bottom edge of river
  for (let x = w / 2; x >= -w / 2; x -= step) {
    let yOffset = Math.sin((x + riverSeed * 100) * freq) * amplitude;
    ctx.lineTo(cx + x, cy + yOffset + riverYOffset + width);
  }

  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawRiverCircle(cx, cy, r, color, opacity, width) {
  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.arc(cx, cy, r - 40, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function randomizeRiver() {
  riverSeed = Math.random(); 
  // random vertical shift (between -50px and +50px)
  riverYOffset = Math.floor(Math.random() * 100 - 50);
  drawTable();
}

[randomizeBtn, shapeSelect, sizeSelect, woodSelect, colorPicker, opacitySlider, riverWidthSlider].forEach(el =>
  el.addEventListener("input", drawTable)
);

randomizeBtn.addEventListener("click", randomizeRiver);

drawTable();