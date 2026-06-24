// Run with: node generate-icons.js
// Generates SVG-based PNG icons for the PWA
const fs = require('fs');
const { createCanvas } = require('canvas');

function drawIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  const r = size / 2;

  // Background
  ctx.fillStyle = '#1a1a2e';
  ctx.beginPath();
  ctx.arc(r, r, r, 0, Math.PI * 2);
  ctx.fill();

  // Cup body
  const scale = size / 192;
  ctx.fillStyle = '#e94560';
  const cx = r, cy = r + 10 * scale;
  const cw = 80 * scale, ch = 60 * scale;
  ctx.beginPath();
  ctx.moveTo(cx - cw / 2, cy - ch / 2);
  ctx.lineTo(cx - cw / 2 + 8 * scale, cy + ch / 2);
  ctx.lineTo(cx + cw / 2 - 8 * scale, cy + ch / 2);
  ctx.lineTo(cx + cw / 2, cy - ch / 2);
  ctx.closePath();
  ctx.fill();

  // Steam lines
  ctx.strokeStyle = '#f5a623';
  ctx.lineWidth = 4 * scale;
  ctx.lineCap = 'round';
  for (let i = -1; i <= 1; i++) {
    const x = cx + i * 18 * scale;
    ctx.beginPath();
    ctx.moveTo(x, cy - ch / 2 - 8 * scale);
    ctx.bezierCurveTo(x + 6 * scale, cy - ch / 2 - 18 * scale, x - 6 * scale, cy - ch / 2 - 28 * scale, x, cy - ch / 2 - 38 * scale);
    ctx.stroke();
  }

  // Handle
  ctx.strokeStyle = '#e94560';
  ctx.lineWidth = 6 * scale;
  ctx.beginPath();
  ctx.arc(cx + cw / 2 + 12 * scale, cy, 18 * scale, -Math.PI / 2, Math.PI / 2);
  ctx.stroke();

  return canvas.toBuffer('image/png');
}

fs.mkdirSync('icons', { recursive: true });
fs.writeFileSync('icons/icon-192.png', drawIcon(192));
fs.writeFileSync('icons/icon-512.png', drawIcon(512));
console.log('Icons generated.');
