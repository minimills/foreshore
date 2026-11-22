"use client";
import { useEffect, useRef } from "react";

/** thumb-idle clip from /concepts/bam/manifest.json: 40 frames, 8 fps, looping. */
const FRAMES = 40;
const FPS = 8;

export default function MascotCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const img = new Image();
      img.src = "/concepts/bam/thumb-idle/000.webp";
      img.onload = () => {
        sizeCanvas();
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
      return;
    }

    let raf = 0;
    let stopped = false;
    const images: HTMLImageElement[] = [];

    function sizeCanvas() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const side = Math.max(1, Math.round(rect.width * dpr));
      if (canvas.width !== side) {
        canvas.width = side;
        canvas.height = side;
      }
    }

    for (let i = 0; i < FRAMES; i++) {
      const img = new Image();
      img.src = `/concepts/bam/thumb-idle/${String(i).padStart(3, "0")}.webp`;
      images.push(img);
    }

    let start = 0;
    const tick = (now: number) => {
      if (stopped) return;
      if (!start) start = now;
      sizeCanvas();
      const frame = Math.floor(((now - start) / 1000) * FPS) % FRAMES;
      const img = images[frame];
      if (img?.complete && img.naturalWidth) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas className="bt-canvas" ref={ref} />;
}
