const canvas = document.getElementById("builderCanvas");
const ctx = canvas.getContext("2d");

const shapeSelect = document.getElementById("shapeSelect");
const sizeSelect = document.getElementById("sizeSelect");
const woodSelect = document.getElementById("woodSelect");
const colorPicker = document.getElementById("colorPicker");
const opacitySlider = document.getElementById("opacitySlider");
const riverWidthSlider = document.getElementById("riverWidthSlider");
const randomizeBtn = document.getElementById("randomizeBtn");

const woodTextures = {
  oak: "images/wood/oak.jpg",
  cherry: "images/wood/cherry.jpg",
  walnut: "images/wood/walnut.jpg",
  maple: "images/wood/maple.jpg",
  mahogany: "images/wood/mahogany.jpg"
};

let textures = {};
let riverSeed = Math.random();

function smoothNoise(x) {
  return Math.sin((x * 0.015) + riverSeed * 30) * 25
       + Math.sin((x * 0.05) + riverSeed * 60) * 10;
}

function taperFactor(x, max) {
  const dist = Math.abs(x);
  const t = 1 - (dist / max) ** 2;
  return Math.max(0.35, t);
}

function drawTable() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const shape = shapeSelect.value;
  const size = parseInt(sizeSelect.value);
  const wood = woodSelect.value;
  const epoxyColor = colorPicker.value;
  const opacity = parseFloat(opacitySlider.value);
  const width = parseInt(riverWidthSlider.value);

  const img = textures[wood];
  if (!img) return;

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const half = size * 5;

  const pattern = ctx.createPattern(img, "repeat");
  ctx.save();
  ctx.fillStyle = pattern;

  if (shape === "circle") {
    ctx.beginPath();
    ctx.arc(cx, cy, half, 0, Math.PI*2);
    ctx.fill();
    ctx.clip();
    drawRiverRect(cx, cy, half*2, half*2, epoxyColor, opacity, width);
  } else {
    const w = half * (shape === "square" ? 1 : 2);
    const h = half;
    ctx.fillRect(cx - w/2, cy - h/2, w, h);
    drawRiverRect(cx, cy, w, h, epoxyColor, opacity, width);
  }

  ctx.restore();
}

function drawRiverRect(cx, cy, w, h, color, opacity, width) {
  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.fillStyle = color;

  ctx.beginPath();
  ctx.moveTo(cx - w/2, cy + smoothNoise(-w/2));
  const step = 12;

  for (let x = -w/2; x <= w/2; x += step) {
    const yOffset = smoothNoise(x);
    const t = taperFactor(x, w/2);
    ctx.lineTo(cx + x, cy + yOffset - (width/2) * t);
  }
  for (let x = w/2; x >= -w/2; x -= step) {
    const yOffset = smoothNoise(x);
    const t = taperFactor(x, w/2);
    ctx.lineTo(cx + x, cy + yOffset + (width/2) * t);
  }

  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function randomize() {
  riverSeed = Math.random();
  drawTable();
}

[shapeSelect, sizeSelect, woodSelect, colorPicker, opacitySlider, riverWidthSlider].forEach(el => el.addEventListener("input", drawTable));
randomizeBtn.addEventListener("click", randomize);

function preloadTextues(callback) {
  const keys = Object.keys(woodTextures);
  let loaded = 0;
  keys.forEach(k => {
    const img = new Image();
    img.src = woodTextures[k];
    img.onload = () => {
      textures[k] = img;
      if (++loaded === keys.length) callback();
    };
  });
}

preloadTextues(drawTable);