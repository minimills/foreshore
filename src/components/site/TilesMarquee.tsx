"use client";
import { useEffect, useRef, useState } from "react";
import {
  FoundingTile,
  ServicePageTile,
  ProductShowcaseTile,
  MascotTile,
  StylePalettesTile,
  ScrollStoryTile,
  BuilderTile,
} from "../tiles/Tiles";

/* Measured from the source: ~28 px/s leftward, pauses while hovered. */
const SPEED = 28;
const STEP_MS = 450;

function tileSet(keyPrefix: string) {
  return [
    <FoundingTile key={`${keyPrefix}-founding`} />,
    <ServicePageTile key={`${keyPrefix}-service`} />,
    <ProductShowcaseTile key={`${keyPrefix}-product`} />,
    <MascotTile key={`${keyPrefix}-mascot`} />,
    <StylePalettesTile key={`${keyPrefix}-palettes`} />,
    <ScrollStoryTile key={`${keyPrefix}-scroll`} />,
    <BuilderTile key={`${keyPrefix}-builder`} />,
  ];
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export default function TilesMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const xRef = useRef(0);
  const hoverRef = useRef(false);
  const tweenRef = useRef<{ start: number; from: number; delta: number } | null>(null);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let prev = 0;

    const loopWidth = () => {
      // One full set plus its trailing gap, so the duplicate lines up seamlessly.
      const gap = parseFloat(getComputedStyle(track).gap || "0") || 0;
      const first = track.children[0] as HTMLElement | undefined;
      const tileW = first ? first.getBoundingClientRect().width : 0;
      const perSet = track.children.length / 2;
      return (tileW + gap) * perSet;
    };

    const frame = (now: number) => {
      if (!prev) prev = now;
      const dt = Math.min((now - prev) / 1000, 0.05);
      prev = now;
      const L = loopWidth();

      const tw = tweenRef.current;
      if (tw) {
        const p = Math.min(1, (now - tw.start) / STEP_MS);
        xRef.current = tw.from + tw.delta * easeOut(p);
        if (p >= 1) tweenRef.current = null;
      } else if (!hoverRef.current && !pausedRef.current) {
        xRef.current -= SPEED * dt;
      }

      if (L > 0) {
        while (xRef.current <= -L) xRef.current += L;
        while (xRef.current > 0) xRef.current -= L;
      }
      track.style.transform = `translateX(${xRef.current}px)`;
      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  const step = (dir: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const gap = parseFloat(getComputedStyle(track).gap || "0") || 0;
    const first = track.children[0] as HTMLElement | undefined;
    const tileW = first ? first.getBoundingClientRect().width : 360;
    tweenRef.current = {
      start: performance.now(),
      from: xRef.current,
      delta: -dir * (tileW + gap),
    };
  };

  return (
    <div
      className="tiles-marquee"
      data-reveal=""
      onMouseEnter={() => (hoverRef.current = true)}
      onMouseLeave={() => (hoverRef.current = false)}
    >
      <div className="tiles-window">
        <div className="tiles" ref={trackRef}>
          {tileSet("a")}
          {tileSet("b")}
        </div>
      </div>

      <button
        type="button"
        className="tiles-arrow tiles-prev"
        aria-label="Previous projects"
        onClick={() => step(-1)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M15 5l-7 7 7 7" />
        </svg>
      </button>

      <button
        type="button"
        className="tiles-arrow tiles-next"
        aria-label="Next projects"
        onClick={() => step(1)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <button
        type="button"
        className="tiles-arrow tiles-pause"
        aria-label={paused ? "Resume project carousel" : "Pause project carousel"}
        aria-pressed={paused}
        onClick={() => setPaused((p) => !p)}
      >
        {paused ? (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8 5l11 7-11 7z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 6v12M15 6v12" />
          </svg>
        )}
      </button>
    </div>
  );
}
