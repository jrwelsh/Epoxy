const canvas = document.getElementById("tableCanvas");
const ctx = canvas.getContext("2d");

const shapeSelect = document.getElementById("shape");
const sizeSelect = document.getElementById("size");
const woodSelect = document.getElementById("wood");
const colorPicker = document.getElementById("epoxyColor");
const opacitySlider = document.getElementById("opacity");
const riverWidthSlider = document.getElementById("riverWidth");
const randomizeBtn = document.getElementById("randomize");

let riverSeed = Math.random();

// --- Smooth pseudo-Perlin noise ---
function smoothNoise(x) {
  // Blend a couple low-frequency sines for organic look
  return (
    Math.sin((x * 0.015) + riverSeed * 30) * 25 +
    Math.sin((x * 0.05) + riverSeed * 60) * 10
  );
}

// --- River taper (never fully 0) ---
function taperFactor(x, maxSpan) {
  const edgeDist = Math.min(Math.abs(x), maxSpan);
  const taper = 1 - (edgeDist / maxSpan) ** 2; // quadratic falloff
  const minWidth = 0.35; // keeps 35% width at edges
  return Math.max(minWidth, taper);
}

function drawTable() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const shape = shapeSelect.value;
  const size = parseInt(sizeSelect.value);
  const wood = woodSelect.value;
  const epoxyColor = colorPicker.value;
  const epoxyOpacity = parseFloat(opacitySlider.value);
  const riverWidth = parseInt(riverWidthSlider.value);

  const woodColors = {
    oak: "#C3B091",
    cherry: "#B94E48",
    walnut: "#5D3A1A",
    maple: "#E6D5B8",
    mahogany: "#4A2C2A"
  };
  const woodColor = woodColors[wood] || "#8B5A2B";

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const half = size * 5;

  ctx.save();

  if (shape === "circle") {
    ctx.beginPath();
    ctx.arc(cx, cy, half, 0, Math.PI * 2);
    ctx.fillStyle = woodColor;
    ctx.fill();

    // Clip everything to circle before drawing river
    ctx.clip();
    drawRiverRect(cx, cy, half * 2, half * 2, epoxyColor, epoxyOpacity, riverWidth);
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

  const step = 12;

  ctx.beginPath();
  ctx.moveTo(cx - w / 2, cy + smoothNoise(-w / 2));

  // Top edge band
  for (let x = -w / 2; x <= w / 2; x += step) {
    let yOffset = smoothNoise(x);
    let taper = taperFactor(x, w / 2);
    let y = cy + yOffset - (width / 2) * taper;
    ctx.lineTo(cx + x, y);
  }

  // Bottom edge band
  for (let x = w / 2; x >= -w / 2; x -= step) {
    let yOffset = smoothNoise(x);
    let taper = taperFactor(x, w / 2);
    let y = cy + yOffset + (width / 2) * taper;
    ctx.lineTo(cx + x, y);
  }

  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function randomizeRiver() {
  riverSeed = Math.random();
  drawTable();
}

[randomizeBtn, shapeSelect, sizeSelect, woodSelect, colorPicker, opacitySlider, riverWidthSlider].forEach(el =>
  el.addEventListener("input", drawTable)
);

randomizeBtn.addEventListener("click", randomizeRiver);

drawTable();