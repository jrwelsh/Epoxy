const canvas = document.getElementById("builderCanvas");
const ctx = canvas.getContext("2d");

const woodTextures = {
  oak: "#C19A6B",
  walnut: "#5C4033",
  cherry: "#A45A52"
};

let settings = {
  wood: "oak",
  epoxyColor: "#1E90FF",
  opacity: 0.7,
  shape: "river",
  width: 0.5
};

function drawTable() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw wood background
  ctx.fillStyle = woodTextures[settings.wood];
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.globalAlpha = settings.opacity;
  ctx.fillStyle = settings.epoxyColor;

  if (settings.shape === "river") {
    drawRiver();
  } else if (settings.shape === "square") {
    let epoxyWidth = canvas.width * settings.width;
    ctx.fillRect((canvas.width - epoxyWidth) / 2, 0, epoxyWidth, canvas.height);
  } else if (settings.shape === "circle") {
    let radius = (canvas.width / 2) * settings.width;
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalAlpha = 1.0;
}

// Draw epoxy river with slight taper + smoother curve
function drawRiver() {
  ctx.beginPath();
  const mid = canvas.width / 2;
  const baseWidth = 60 * settings.width;

  ctx.moveTo(mid - baseWidth, 0);

  for (let y = 0; y <= canvas.height; y += 20) {
    const variation = Math.sin(y * 0.02) * 30;
    const taper = baseWidth * (0.5 + 0.5 * (1 - y / canvas.height));
    ctx.lineTo(mid + variation + taper, y);
  }

  for (let y = canvas.height; y >= 0; y -= 20) {
    const variation = Math.sin(y * 0.02) * 30;
    const taper = baseWidth * (0.5 + 0.5 * (1 - y / canvas.height));
    ctx.lineTo(mid + variation - taper, y);
  }

  ctx.closePath();
  ctx.fill();
}

// Hook up controls
document.getElementById("woodType").addEventListener("change", e => {
  settings.wood = e.target.value;
  drawTable();
});

document.getElementById("epoxyColor").addEventListener("input", e => {
  settings.epoxyColor = e.target.value;
  drawTable();
});

document.getElementById("opacity").addEventListener("input", e => {
  settings.opacity = e.target.value;
  drawTable();
});

document.getElementById("shape").addEventListener("change", e => {
  settings.shape = e.target.value;
  drawTable();
});

document.getElementById("width").addEventListener("input", e => {
  settings.width = e.target.value;
  drawTable();
});

document.getElementById("randomize").addEventListener("click", () => {
  const woods = Object.keys(woodTextures);
  settings.wood = woods[Math.floor(Math.random() * woods.length)];
  settings.epoxyColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  settings.opacity = Math.random() * 0.5 + 0.5;
  settings.shape = ["river", "square", "circle"][Math.floor(Math.random() * 3)];
  settings.width = Math.random();

  document.getElementById("woodType").value = settings.wood;
  document.getElementById("epoxyColor").value = settings.epoxyColor;
  document.getElementById("opacity").value = settings.opacity;
  document.getElementById("shape").value = settings.shape;
  document.getElementById("width").value = settings.width;

  drawTable();
});

// Initial draw
drawTable();
