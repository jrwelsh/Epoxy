const canvas = document.getElementById("builderCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

const table = {
  wood: "walnut",
  epoxyColor: "rgba(0, 0, 255, 0.6)",
  epoxyWidth: 50,
  shape: "rectangle",
  riverPoints: []
};

// --- Preload wood textures ---
const woodTextures = {
  oak: new Image(),
  walnut: new Image(),
  cherry: new Image(),
  maple: new Image()
};

woodTextures.oak.src = "textures/oak.jpg";
woodTextures.walnut.src = "textures/walnut.jpg";
woodTextures.cherry.src = "textures/cherry.jpg";
woodTextures.maple.src = "textures/maple.jpg";

// Track when images are loaded
let texturesLoaded = 0;
const totalTextures = Object.keys(woodTextures).length;

for (let key in woodTextures) {
  woodTextures[key].onload = () => {
    texturesLoaded++;
    if (texturesLoaded === totalTextures) {
      // Once all textures are ready, render table
      generateRiver();
      drawTable();
    }
  };
}

// --- Generate river path ---
function generateRiver() {
  table.riverPoints = [];
  const points = 8;
  const amplitude = canvas.height / 4;
  const taper = 0.5;

  for (let i = 0; i <= points; i++) {
    const x = (i / points) * canvas.width;
    const y =
      canvas.height / 2 +
      Math.sin(i * 0.8 + Math.random() * 0.5) * (amplitude * taper);
    table.riverPoints.push({ x, y });
  }
}

// --- Draw the table ---
function drawTable() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Use texture if loaded, otherwise fallback
  let fillStyle;
  const texture = woodTextures[table.wood];
  if (texture.complete && texture.naturalWidth > 0) {
    fillStyle = ctx.createPattern(texture, "repeat");
  } else {
    fillStyle = "#8B5A2B"; // fallback brown
  }
  ctx.fillStyle = fillStyle;

  // Draw wood base
  ctx.beginPath();
  if (table.shape === "rectangle") {
    ctx.rect(0, 0, canvas.width, canvas.height);
  } else if (table.shape === "square") {
    const size = Math.min(canvas.width, canvas.height);
    ctx.rect(
      (canvas.width - size) / 2,
      (canvas.height - size) / 2,
      size,
      size
    );
  } else if (table.shape === "circle") {
    ctx.arc(
      canvas.width / 2,
      canvas.height / 2,
      Math.min(canvas.width, canvas.height) / 2 - 10,
      0,
      Math.PI * 2
    );
  }
  ctx.closePath();
  ctx.fill();

  // Clip epoxy inside wood
  ctx.save();
  ctx.beginPath();
  if (table.shape === "rectangle") {
    ctx.rect(0, 0, canvas.width, canvas.height);
  } else if (table.shape === "square") {
    const size = Math.min(canvas.width, canvas.height);
    ctx.rect(
      (canvas.width - size) / 2,
      (canvas.height - size) / 2,
      size,
      size
    );
  } else if (table.shape === "circle") {
    ctx.arc(
      canvas.width / 2,
      canvas.height / 2,
      Math.min(canvas.width, canvas.height) / 2 - 10,
      0,
      Math.PI * 2
    );
  }
  ctx.clip();

  // Epoxy fill
  ctx.fillStyle = table.epoxyColor;
  ctx.beginPath();
  ctx.moveTo(
    table.riverPoints[0].x,
    table.riverPoints[0].y - table.epoxyWidth / 2
  );
  for (let i = 1; i < table.riverPoints.length; i++) {
    const p = table.riverPoints[i];
    ctx.lineTo(p.x, p.y - table.epoxyWidth / 2);
  }
  for (let i = table.riverPoints.length - 1; i >= 0; i--) {
    const p = table.riverPoints[i];
    ctx.lineTo(p.x, p.y + table.epoxyWidth / 2);
  }
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

// --- Randomizer ---
document.getElementById("randomize").addEventListener("click", () => {
  const woods = ["oak", "walnut", "cherry", "maple"];
  table.wood = woods[Math.floor(Math.random() * woods.length)];
  table.epoxyColor = `rgba(${Math.floor(Math.random() * 255)}, 
                           ${Math.floor(Math.random() * 255)}, 
                           ${Math.floor(Math.random() * 255)}, 0.6)`;
  table.epoxyWidth = Math.random() * 80 + 20;
  table.shape = ["rectangle", "square", "circle"][
    Math.floor(Math.random() * 3)
  ];
  generateRiver();
  drawTable();
});

// --- Controls ---
document.getElementById("woodSelect").addEventListener("change", (e) => {
  table.wood = e.target.value;
  drawTable();
});

document.getElementById("epoxyColor").addEventListener("input", (e) => {
  table.epoxyColor = e.target.value;
  drawTable();
});

document.getElementById("epoxyWidth").addEventListener("input", (e) => {
  table.epoxyWidth = parseInt(e.target.value);
  drawTable();
});

document.getElementById("shapeSelect").addEventListener("change", (e) => {
  table.shape = e.target.value;
  drawTable();
});

// --- Initialize (fallback so it shows instantly with brown) ---
generateRiver();
drawTable();