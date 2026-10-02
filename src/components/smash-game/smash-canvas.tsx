"use client";

import { useCallback, useEffect, useRef } from "react";
import { useSmashGame } from "./smash-game-provider";
import { categoriseHit } from "./smash-scoring";
import {
  HIT_RADIUS_DESKTOP,
  HIT_RADIUS_INTERACTIVE_MULT,
  HIT_RADIUS_MOBILE,
} from "./smash-types";

function isTouchDevice() {
  return typeof window !== "undefined" && "ontouchstart" in window;
}

function drawCrack(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
) {
  ctx.save();
  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fill();

  const arms = 4 + Math.floor(Math.random() * 4);
  ctx.lineWidth = 3;
  ctx.strokeStyle = "black";
  for (let i = 0; i < arms; i++) {
    const angle = (Math.PI * 2 * i) / arms + (Math.random() - 0.5) * 0.5;
    const len = radius * (1.2 + Math.random() * 0.8);
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    const steps = 3 + Math.floor(Math.random() * 3);
    let x = cx;
    let y = cy;
    for (let s = 1; s <= steps; s++) {
      const t = s / steps;
      x = cx + Math.cos(angle + (Math.random() - 0.5) * 0.4) * len * t;
      y = cy + Math.sin(angle + (Math.random() - 0.5) * 0.4) * len * t;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  ctx.restore();
}

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
};

export function SmashCanvas({
  fakeRef,
}: {
  fakeRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { phase, hit, setProgress } = useSmashGame();
  const maskRef = useRef<HTMLCanvasElement | null>(null);
  const effectsRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const rafId = useRef(0);
  const totalPixels = useRef(0);

  const resize = useCallback(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    if (maskRef.current) {
      maskRef.current.width = w;
      maskRef.current.height = h;
      const ctx = maskRef.current.getContext("2d")!;
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, w, h);
      totalPixels.current = w * h;
    }
    if (effectsRef.current) {
      effectsRef.current.width = w;
      effectsRef.current.height = h;
    }
  }, []);

  useEffect(() => {
    if (phase !== "playing" && phase !== "active") return;
    const offscreen = document.createElement("canvas");
    maskRef.current = offscreen;
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [phase, resize]);

  const applyMask = useCallback(() => {
    if (!maskRef.current || !fakeRef.current) return;
    const url = maskRef.current.toDataURL("image/png");
    fakeRef.current.style.maskImage = `url(${url})`;
    fakeRef.current.style.webkitMaskImage = `url(${url})`;
    fakeRef.current.style.maskSize = "100% 100%";
    fakeRef.current.style.webkitMaskSize = "100% 100%";
  }, [fakeRef]);

  const measureProgress = useCallback(() => {
    if (!maskRef.current || !totalPixels.current) return;
    const ctx = maskRef.current.getContext("2d")!;
    const data = ctx.getImageData(
      0,
      0,
      maskRef.current.width,
      maskRef.current.height,
    ).data;
    let visible = 0;
    for (let i = 3; i < data.length; i += 16) {
      if (data[i] > 128) visible++;
    }
    const sampled = data.length / 16;
    const pct = ((sampled - visible) / sampled) * 100;
    setProgress(pct);
  }, [setProgress]);

  const spawnParticles = useCallback((cx: number, cy: number) => {
    const count = 8 + Math.floor(Math.random() * 6);
    const colors = ["#667eea", "#a855f7", "#ec4899", "#e2e8f0"];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 4;
      particles.current.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        maxLife: 30 + Math.random() * 20,
        size: 2 + Math.random() * 4,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
  }, []);

  useEffect(() => {
    if (phase !== "playing") return;
    const canvas = effectsRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    function tick() {
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);
      particles.current = particles.current.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15;
        p.life++;
        const alpha = Math.max(0, 1 - p.life / p.maxLife);
        if (alpha <= 0) return false;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
        return true;
      });
      ctx.globalAlpha = 1;
      rafId.current = requestAnimationFrame(tick);
    }
    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, [phase]);

  const handleHit = useCallback(
    (clientX: number, clientY: number) => {
      if (phase !== "playing") return;
      const maskCtx = maskRef.current?.getContext("2d");
      if (!maskCtx) return;

      let category = categoriseHit(null);
      if (fakeRef.current) {
        fakeRef.current.style.pointerEvents = "auto";
        const el = document.elementFromPoint(clientX, clientY);
        fakeRef.current.style.pointerEvents = "none";
        category = categoriseHit(el);
      }

      const baseRadius = isTouchDevice()
        ? HIT_RADIUS_MOBILE
        : HIT_RADIUS_DESKTOP;
      const radius =
        category === "interactive"
          ? baseRadius * HIT_RADIUS_INTERACTIVE_MULT
          : baseRadius;

      drawCrack(maskCtx, clientX, clientY, radius);
      applyMask();
      hit(category);
      spawnParticles(clientX, clientY);
      measureProgress();
    },
    [phase, fakeRef, hit, applyMask, spawnParticles, measureProgress],
  );

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      handleHit(e.clientX, e.clientY);
    },
    [handleHit],
  );

  if (phase !== "playing" && phase !== "active") return null;

  return (
    <>
      <canvas
        ref={effectsRef}
        className="smash-effects-canvas"
        aria-hidden="true"
      />
      {phase === "playing" && (
        <div className="smash-hit-layer" onPointerDown={onPointerDown} />
      )}
    </>
  );
}
