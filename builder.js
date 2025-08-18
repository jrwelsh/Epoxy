// Epoxy Builder JavaScript

// Get references to DOM elements
const shapeSelect = document.getElementById("shape");
const sizeSelect = document.getElementById("size");
const woodSelect = document.getElementById("wood");
const epoxyColorInput = document.getElementById("epoxyColor");
const opacityInput = document.getElementById("opacity");
const randomizeButton = document.getElementById("randomizeRiver");
const canvas = document.getElementById("tableCanvas");
const ctx = canvas.getContext("2d");

// Draw table
function drawTable() {
  const shape = shapeSelect.value;
  const size = sizeSelect.value;
  const wood = woodSelect.value;
  const epoxyColor = epoxyColorInput.value;
  const opacity = opacityInput.value;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background (wood)
  ctx.fillStyle = wood === "Walnut" ? "#8B4513" : "#DEB887"; // Dark or light
  ctx.beginPath();

  if (shape === "Circle") {
    ctx.arc(200, 200, 150, 0, 2 * Math.PI);
  } else {
    ctx.rect(50, 50, 300, 300);
  }
  ctx.fill();

  // Epoxy river (simple randomized shape)
  ctx.globalAlpha = opacity;
  ctx.fillStyle = epoxyColor;

  ctx.beginPath();
  let startY = 50 + Math.random() * 100;
  ctx.moveTo(50, startY);

  for (let x = 50; x <= 350; x += 50) {
    let y = 100 + Math.random() * 200;
    ctx.lineTo(x, y);
  }

  ctx.lineTo(350, 350);
  ctx.lineTo(50, 350);
  ctx.closePath();
  ctx.fill();

  ctx.globalAlpha = 1.0; // reset opacity
}

// Event listeners
shapeSelect.addEventListener("change", drawTable);
sizeSelect.addEventListener("change", drawTable);
woodSelect.addEventListener("change", drawTable);
epoxyColorInput.addEventListener("input", drawTable);
opacityInput.addEventListener("input", drawTable);
randomizeButton.addEventListener("click", drawTable);

// Initial draw
drawTable();
