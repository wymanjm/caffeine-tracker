// Run with: node generate-icons.js
// Generates PNG app icons: a smiling tooth with a fairy wand + sparkles
const fs = require('fs');
const { createCanvas } = require('canvas');

function drawIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  const r = size / 2;
  const s = size / 192;

  // Background circle - purple gradient
  const grad = ctx.createRadialGradient(r, r * 0.8, size * 0.05, r, r, size * 0.72);
  grad.addColorStop(0, '#6c4fd6');
  grad.addColorStop(1, '#3a2069');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(r, r, r, 0, Math.PI * 2);
  ctx.fill();

  // Sparkles
  function star(cx, cy, size2, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(cx, cy - size2);
    ctx.lineTo(cx + size2 * 0.25, cy - size2 * 0.25);
    ctx.lineTo(cx + size2, cy);
    ctx.lineTo(cx + size2 * 0.25, cy + size2 * 0.25);
    ctx.lineTo(cx, cy + size2);
    ctx.lineTo(cx - size2 * 0.25, cy + size2 * 0.25);
    ctx.lineTo(cx - size2, cy);
    ctx.lineTo(cx - size2 * 0.25, cy - size2 * 0.25);
    ctx.closePath();
    ctx.fill();
  }
  star(size * 0.24, size * 0.28, 10 * s, '#ffd166');
  star(size * 0.80, size * 0.22, 7 * s, '#ffffff');
  star(size * 0.78, size * 0.72, 9 * s, '#ffd166');

  // Tooth shape
  const cx = r, cy = r + 6 * s;
  const w = 78 * s, h = 84 * s;
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(cx, cy - h * 0.5);
  ctx.bezierCurveTo(cx - w * 0.62, cy - h * 0.56, cx - w * 0.55, cy - h * 0.05, cx - w * 0.42, cy + h * 0.18);
  ctx.bezierCurveTo(cx - w * 0.34, cy + h * 0.36, cx - w * 0.28, cy + h * 0.5, cx - w * 0.16, cy + h * 0.5);
  ctx.bezierCurveTo(cx - w * 0.08, cy + h * 0.5, cx - w * 0.08, cy + h * 0.22, cx, cy + h * 0.22);
  ctx.bezierCurveTo(cx + w * 0.08, cy + h * 0.22, cx + w * 0.08, cy + h * 0.5, cx + w * 0.16, cy + h * 0.5);
  ctx.bezierCurveTo(cx + w * 0.28, cy + h * 0.5, cx + w * 0.34, cy + h * 0.36, cx + w * 0.42, cy + h * 0.18);
  ctx.bezierCurveTo(cx + w * 0.55, cy - h * 0.05, cx + w * 0.62, cy - h * 0.56, cx, cy - h * 0.5);
  ctx.closePath();
  ctx.fill();

  // Tooth face - eyes
  ctx.fillStyle = '#3a2069';
  ctx.beginPath();
  ctx.arc(cx - w * 0.14, cy - h * 0.08, 4.2 * s, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(cx + w * 0.14, cy - h * 0.08, 4.2 * s, 0, Math.PI * 2);
  ctx.fill();

  // Tooth face - smile
  ctx.strokeStyle = '#3a2069';
  ctx.lineWidth = 3 * s;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.arc(cx, cy + h * 0.02, 12 * s, 0.15 * Math.PI, 0.85 * Math.PI);
  ctx.stroke();

  // Rosy cheeks
  ctx.fillStyle = 'rgba(255,140,170,0.55)';
  ctx.beginPath();
  ctx.ellipse(cx - w * 0.32, cy + h * 0.02, 6 * s, 4 * s, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(cx + w * 0.32, cy + h * 0.02, 6 * s, 4 * s, 0, 0, Math.PI * 2);
  ctx.fill();

  return canvas.toBuffer('image/png');
}

fs.mkdirSync('icons', { recursive: true });
fs.writeFileSync('icons/icon-192.png', drawIcon(192));
fs.writeFileSync('icons/icon-512.png', drawIcon(512));
console.log('Icons generated.');
