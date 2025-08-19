const canvas = document.getElementById("builderCanvas");
const ctx = canvas.getContext("2d");

// Test draw function
function drawTest() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw "wood" background
  ctx.fillStyle = "#C19A6B"; // oak color
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw epoxy rectangle
  ctx.globalAlpha = 0.7;
  ctx.fillStyle = "#1E90FF"; // blue epoxy
  ctx.fillRect(200, 100, 200, 200);
  ctx.globalAlpha = 1.0;
}

// Call once
drawTest();
