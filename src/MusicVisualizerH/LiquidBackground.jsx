import React, { useRef, useEffect, useMemo } from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import seedrandom from 'seedrandom';

function randomBetween(rng, min, max) {
  return rng() * (max - min) + min;
}

function getBouncedPosition(start, deltaPerSecond, radius, limit, seconds) {
  const min = radius;
  const max = limit - radius;
  const travel = start + deltaPerSecond * seconds;
  const range = max - min;
  let pos = travel;
  let dir = deltaPerSecond;
  if (deltaPerSecond === 0) return { pos: start, dir };
  let times = Math.floor((pos - min) / range);
  if (pos < min) times = Math.floor((min - pos) / range);
  if (times % 2 !== 0) dir = -dir;
  let mod = ((pos - min) % (2 * range));
  if (mod < 0) mod += 2 * range;
  if (mod > range) {
    pos = max - (mod - range);
  } else {
    pos = min + mod;
  }
  return { pos, dir };
}

export const LiquidBackground = ({
  bgColor = "#fff",
  bpm = 120,
  colors = ["#0099ff", "#00ff99", "#ff0099"],
  seed = 42,
  blur = 60,
}) => {
  const canvasRef = useRef(null);
  const { width, height, fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const extWidth = width * 1.5;
  const extHeight = height * 1.5;

  const speed = (bpm / 120) * 100;

  const circles = useMemo(() => {
    let circleCount = Math.max(5, Math.floor(width / 100));
    let arr = [];
    const loopRng = seedrandom(String(seed) + 'circles' + width + height + colors.join(','));
    for (let i = 0; i < circleCount; i++) {
      let radius = width / 4;
      let x = randomBetween(loopRng, radius, extWidth - radius);
      let y = randomBetween(loopRng, radius, extHeight - radius);
      let dx = randomBetween(loopRng, -speed, speed);
      let dy = randomBetween(loopRng, -speed, speed);
      let color = colors[Math.floor(loopRng() * colors.length)];
      arr.push({ x, y, dx, dy, radius, color });
    }
    return arr;
  }, [width, height, extWidth, extHeight, colors, speed, seed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // 1. Dibuja los círculos normalmente
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const seconds = frame / fps;
    circles.forEach((circle) => {
      const bx = getBouncedPosition(circle.x, circle.dx, circle.radius, canvas.width, seconds);
      const by = getBouncedPosition(circle.y, circle.dy, circle.radius, canvas.height, seconds);
      ctx.beginPath();
      ctx.arc(bx.pos, by.pos, circle.radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = circle.color;
      ctx.fill();
      ctx.closePath();
    });

    // 2. Copia el canvas a sí mismo con blur
    // Crea un buffer temporal en memoria
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.drawImage(canvas, 0, 0);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.filter = `blur(${blur}px)`;
    ctx.drawImage(tempCanvas, 0, 0);
    ctx.filter = 'none';

  }, [frame, extWidth, extHeight, bgColor, circles, fps, blur]);

  return (
    <canvas
      ref={canvasRef}
      width={extWidth}
      height={extHeight}
      style={{
        position: 'absolute',
        left: -(extWidth - width) / 2,
        top: -(extHeight - height) / 2,
        width: extWidth,
        height: extHeight,
        zIndex: 0,
      }}
    />
  );
};