const canvas = document.getElementById("builderCanvas");
const ctx = canvas.getContext("2d");

// Default state
let woodType = "oak";
let epoxyColor = "#1E90FF";
let epoxyOpacity = 0.7;
let epoxyShape = "river";
let epoxyWidth = 150;

// Fallback wood colors
const woodColors = {
  oak: "#C19A6B",
  cherry: "#A45A52",
  walnut: "#5C4033",
};

// Draw table
function drawTable() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Wood background
  ctx.fillStyle = woodColors[woodType] || "#8B5A2B";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Epoxy
  ctx.globalAlpha = epoxyOpacity;
  ctx.fillStyle = epoxyColor;

  if (epoxyShape === "river") {
    drawRiver();
  } else if (epoxyShape === "square") {
    drawSquare();
  } else if (epoxyShape === "circle") {
    drawCircle();
  }

  ctx.globalAlpha = 1.0; // reset
}

function drawRiver() {
  const midX = canvas.width / 2;
  const riverWidth = epoxyWidth;

  ctx.beginPath();
  ctx.moveTo(midX - riverWidth / 2, 0);
  for (let y = 0; y <= canvas.height; y += 20) {
    const offset = Math.sin(y * 0.05) * 20;
    ctx.lineTo(midX - riverWidth / 2 + offset, y);
  }
  for (let y = canvas.height; y >= 0; y -= 20) {
    const offset = Math.sin(y * 0.05) * 20;
    ctx.lineTo(midX + riverWidth / 2 + offset, y);
  }
  ctx.closePath();
  ctx.fill();
}

function drawSquare() {
  const x = (canvas.width - epoxyWidth) / 2;
  const y = canvas.height / 4;
  ctx.fillRect(x, y, epoxyWidth, canvas.height / 2);
}

function drawCircle() {
  const radius = epoxyWidth / 2;
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2);
  ctx.fill();
}

// Event listeners
document.getElementById("wood").addEventListener("change", e => {
  woodType = e.target.value;
  drawTable();
});
document.getElementById("color").addEventListener("input", e => {
  epoxyColor = e.target.value;
  drawTable();
});
document.getElementById("opacity").addEventListener("input", e => {
  epoxyOpacity = parseFloat(e.target.value);
  drawTable();
});
document.getElementById("shape").addEventListener("change", e => {
  epoxyShape = e.target.value;
  drawTable();
});
document.getElementById("width").addEventListener("input", e => {
  epoxyWidth = parseInt(e.target.value, 10);
  drawTable();
});
document.getElementById("randomize").addEventListener("click", () => {
  const woods = ["oak", "cherry", "walnut"];
  woodType = woods[Math.floor(Math.random() * woods.length)];
  epoxyColor = `hsl(${Math.random() * 360}, 70%, 50%)`;
  epoxyOpacity = Math.random().toFixed(2);
  epoxyShape = ["river", "square", "circle"][Math.floor(Math.random() * 3)];
  epoxyWidth = 50 + Math.floor(Math.random() * 250);

  // Update controls
  document.getElementById("wood").value = woodType;
  document.getElementById("color").value = epoxyColor;
  document.getElementById("opacity").value = epoxyOpacity;
  document.getElementById("shape").value = epoxyShape;
  document.getElementById("width").value = epoxyWidth;

  drawTable();
});

// Initial draw
drawTable();
