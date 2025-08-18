const canvas = document.getElementById("tableCanvas");
const ctx = canvas.getContext("2d");

const shapeSelect = document.getElementById("shape");
const sizeSelect = document.getElementById("size");
const woodSelect = document.getElementById("wood");
const colorInput = document.getElementById("epoxyColor");
const opacityInput = document.getElementById("opacity");
const widthInput = document.getElementById("riverWidth");

// Draw table based on options
function drawTable() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const shape = shapeSelect.value;
  const size = parseInt(sizeSelect.value);
  const wood = woodSelect.value;
  const color = colorInput.value;
  const opacity = parseFloat(opacityInput.value);
  const riverWidth = parseInt(widthInput.value);

  // Background = wood
  let woodColor = "#deb887"; // default light brown
  if (wood === "medium") woodColor = "#a0522d";
  if (wood === "dark") woodColor = "#5c3317";

  ctx.fillStyle = woodColor;

  if (shape === "rectangle") {
    ctx.fillRect(50, 50, size * 5, size * 3);
    drawRiver(50, 50, size * 5, size * 3, riverWidth, color, opacity);
  } else if (shape === "square") {
    ctx.fillRect(100, 50, size * 4, size * 4);
    drawRiver(100, 50, size * 4, size * 4, riverWidth, color, opacity);
  } else if (shape === "circle") {
    ctx.beginPath();
    ctx.arc(250, 150, size * 2, 0, Math.PI * 2);
    ctx.fill();
    drawRiverCircle(250, 150, size * 2, riverWidth, color, opacity);
  }
}

// Draw epoxy river (rectangle/square)
function drawRiver(x, y, w, h, riverWidth, color, opacity) {
  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.fillStyle = color;

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(
    x + w / 3, y + h / 4,
    x + w / 3, y + (3 * h) / 4,
    x + w, y + h
  );
  ctx.lineTo(x + w, y + h - riverWidth);
  ctx.bezierCurveTo(
    x + w / 3, y + (3 * h) / 4 - riverWidth,
    x + w / 3, y + h / 4 - riverWidth,
    x, y - riverWidth
  );
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

// Draw epoxy river (circle)
function drawRiverCircle(cx, cy, r, riverWidth, color, opacity) {
  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.fillStyle = color;

  ctx.beginPath();
  ctx.arc(cx, cy, r - riverWidth, Math.PI / 3, (2 * Math.PI) / 3);
  ctx.arc(cx, cy, r, (2 * Math.PI) / 3, Math.PI / 3, true);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

// Event listeners
[shapeSelect, sizeSelect, woodSelect, colorInput, opacityInput, widthInput].forEach(
  el => el.addEventListener("input", drawTable)
);

// Initial draw
drawTable();