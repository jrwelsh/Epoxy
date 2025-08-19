// builder.js

window.onload = function () {
  const canvas = document.getElementById("builderCanvas");
  const ctx = canvas.getContext("2d");

  // UI Elements
  const epoxyColorInput = document.getElementById("epoxyColor");
  const opacityInput = document.getElementById("opacity");
  const woodTypeInput = document.getElementById("woodType");
  const shapeSelect = document.getElementById("shapeSelect");
  const widthInput = document.getElementById("width");
  const randomizeBtn = document.getElementById("randomize");

  // Settings
  let epoxyColor = epoxyColorInput.value;
  let epoxyOpacity = parseFloat(opacityInput.value);
  let woodType = woodTypeInput.value;
  let shapeType = shapeSelect.value;
  let riverWidth = parseInt(widthInput.value);

  // Load textures for wood
  const woodTextures = {
    oak: new Image(),
    cherry: new Image(),
    walnut: new Image(),
    maple: new Image(),
  };
  woodTextures.oak.src = "/images/wood/oak.jpg";
  woodTextures.cherry.src = "/images/wood/cherry.jpg";
  woodTextures.walnut.src = "/images/wood/walnut.jpg";
  woodTextures.maple.src = "/images/wood/maple.jpg";

  // Redraw function
  function drawTable() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw wood background with texture
    const texture = woodTextures[woodType];
    if (texture.complete) {
      const pattern = ctx.createPattern(texture, "repeat");
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
      ctx.fillStyle = "#deb887"; // fallback brown color
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Draw epoxy
    ctx.globalAlpha = epoxyOpacity;
    ctx.fillStyle = epoxyColor;

    if (shapeType === "river") {
      drawRiver();
    } else if (shapeType === "rectangle") {
      ctx.fillRect(
        canvas.width / 2 - riverWidth / 2,
        0,
        riverWidth,
        canvas.height
      );
    } else if (shapeType === "circle") {
      ctx.beginPath();
      ctx.ellipse(
        canvas.width / 2,
        canvas.height / 2,
        riverWidth / 2,
        canvas.height / 3,
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
    ctx.globalAlpha = 1.0;
  }

  // Natural flowing river with taper
  function drawRiver() {
    ctx.beginPath();
    const midX = canvas.width / 2;

    ctx.moveTo(midX, 0);

    for (let y = 0; y <= canvas.height; y += 10) {
      const taper =
        0.3 + 0.7 * (1 - Math.abs(y - canvas.height / 2) / (canvas.height / 2)); // never goes fully to 0
      const offset =
        (Math.sin(y / 50) + Math.cos(y / 80)) * (riverWidth / 4) * taper;
      ctx.lineTo(midX + offset, y);
    }

    for (let y = canvas.height; y >= 0; y -= 10) {
      const taper =
        0.3 + 0.7 * (1 - Math.abs(y - canvas.height / 2) / (canvas.height / 2));
      const offset =
        (Math.sin(y / 50 + 2) + Math.cos(y / 80 + 2)) *
        (riverWidth / 4) *
        taper;
      ctx.lineTo(midX - offset, y);
    }

    ctx.closePath();
    ctx.fill();
  }

  // Event listeners
  epoxyColorInput.addEventListener("input", () => {
    epoxyColor = epoxyColorInput.value;
    drawTable();
  });

  opacityInput.addEventListener("input", () => {
    epoxyOpacity = parseFloat(opacityInput.value);
    drawTable();
  });

  woodTypeInput.addEventListener("change", () => {
    woodType = woodTypeInput.value;
    drawTable();
  });

  shapeSelect.addEventListener("change", () => {
    shapeType = shapeSelect.value;
    drawTable();
  });

  widthInput.addEventListener("input", () => {
    riverWidth = parseInt(widthInput.value);
    drawTable();
  });

  randomizeBtn.addEventListener("click", () => {
    const colors = ["#2196f3", "#4caf50", "#9c27b0", "#ff5722", "#00bcd4"];
    epoxyColor = colors[Math.floor(Math.random() * colors.length)];
    epoxyColorInput.value = epoxyColor;

    epoxyOpacity = Math.random();
    opacityInput.value = epoxyOpacity;

    riverWidth = Math.floor(Math.random() * 150) + 30;
    widthInput.value = riverWidth;

    const woods = ["oak", "cherry", "walnut", "maple"];
    woodType = woods[Math.floor(Math.random() * woods.length)];
    woodTypeInput.value = woodType;

    const shapes = ["river", "rectangle", "circle"];
    shapeType = shapes[Math.floor(Math.random() * shapes.length)];
    shapeSelect.value = shapeType;

    drawTable();
  });

  // Ensure textures load before drawing
  Object.values(woodTextures).forEach((img) => {
    img.onload = drawTable;
  });

  drawTable();
};
