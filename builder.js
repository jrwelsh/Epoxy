const canvas = document.getElementById("tableCanvas");
const ctx = canvas.getContext("2d");

const shapeSelect = document.getElementById("shape");
const sizeSelect = document.getElementById("size");
const woodSelect = document.getElementById("wood");
const colorPicker = document.getElementById("epoxyColor");
const opacitySlider = document.getElementById("opacity");
const riverWidthSlider = document.getElementById("riverWidth");
const randomizeBtn = document.getElementById("randomize");

function drawTable() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const shape = shapeSelect.value;
  const size = parseInt(sizeSelect.value);
  const wood = woodSelect.value;
  const epoxyColor = colorPicker.value;
  const epoxyOpacity = parseFloat(opacitySlider.value);
  const riverWidth = parseInt(riverWidthSlider.value);

  // Wood colors
  let woodColor = "#8B5A2B"; // fallback
  if (wood === "light") woodColor = "#D2B48C";
  if (wood === "medium") woodColor = "#A0522D";
  if (wood === "dark") woodColor = "#4B2E2E";

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

  // River path from LEFT to RIGHT
  ctx.beginPath();
  ctx.moveTo(cx - w / 2, cy); // start at left middle

  for (let x = -w / 2; x <= w / 2; x += 20) {
    let yOffset = Math.sin((x + Math.random() * 20) * 0.05) * 30;
    ctx.lineTo(cx + x, cy + yOffset);
  }

  // Mirror the path downward to create river width
  for (let x = w / 2; x >= -w / 2; x -= 20) {
    let yOffset = Math.sin((x + Math.random() * 20) * 0.05) * 30;
    ctx.lineTo(cx + x, cy + yOffset + width);
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
  drawTable();
}

[randomizeBtn, shapeSelect, sizeSelect, woodSelect, colorPicker, opacitySlider, riverWidthSlider].forEach(el =>
  el.addEventListener("input", drawTable)
);

randomizeBtn.addEventListener("click", randomizeRiver);

drawTable();