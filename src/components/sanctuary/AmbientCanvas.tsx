"use client";

import React, { useEffect, useRef } from "react";

type ButterflySpecies = "monarch" | "emerald" | "celestial" | "sunset";

interface Butterfly {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  species: ButterflySpecies;
  flapSpeed: number;
  flutterOffset: number;
  tiltSpeed: number;
  time: number;
}

export function AmbientCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const resize = () => {
      // Set to physical display resolution for sharp GPU rendering
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    const speciesList: ButterflySpecies[] = ["monarch", "emerald", "celestial", "sunset"];
    const butterflies: Butterfly[] = [];
    // 15 graceful, silky-smooth butterflies for high performance during fast scrolling
    const count = 15;

    for (let i = 0; i < count; i++) {
      butterflies.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 10 + 18, // 18px - 28px wingspan
        speedX: (Math.random() - 0.5) * 0.45,
        speedY: -Math.random() * 0.4 - 0.25,
        opacity: Math.random() * 0.3 + 0.55,
        species: speciesList[i % speciesList.length],
        flapSpeed: Math.random() * 0.08 + 0.09,
        flutterOffset: Math.random() * Math.PI * 2,
        tiltSpeed: Math.random() * 0.02 + 0.015,
        time: Math.random() * 100,
      });
    }

    // Static color definitions (Zero gradient allocations in the 60fps render loop)
    const SPECIES_PALETTE = {
      monarch: {
        wing: "#E29338",
        margin: "rgba(45, 25, 10, 0.7)",
        vein: "rgba(60, 35, 15, 0.35)",
        spot: "rgba(255, 255, 255, 0.8)",
      },
      emerald: {
        wing: "#7BA887",
        margin: "rgba(25, 48, 32, 0.65)",
        vein: "rgba(255, 255, 255, 0.4)",
        spot: "rgba(255, 255, 255, 0)",
      },
      celestial: {
        wing: "#F7F2E4",
        margin: "rgba(201, 164, 76, 0.55)",
        vein: "rgba(212, 175, 55, 0.35)",
        spot: "rgba(255, 255, 255, 0)",
      },
      sunset: {
        wing: "#D98068",
        margin: "rgba(55, 25, 20, 0.65)",
        vein: "rgba(255, 255, 255, 0.35)",
        spot: "rgba(255, 255, 255, 0.8)",
      },
    };

    const drawWingHalf = (
      ctx: CanvasRenderingContext2D,
      size: number,
      scaleX: number,
      isLeft: boolean,
      species: ButterflySpecies
    ) => {
      ctx.save();
      const dir = isLeft ? -1 : 1;
      ctx.scale(dir * scaleX, 1);

      const palette = SPECIES_PALETTE[species];

      // 1. Forewing (Combined single path for maximum GPU fill speed)
      ctx.beginPath();
      ctx.moveTo(1, -size * 0.1);
      ctx.bezierCurveTo(size * 0.25, -size * 0.65, size * 0.75, -size * 0.95, size * 0.92, -size * 0.7);
      ctx.bezierCurveTo(size * 0.98, -size * 0.4, size * 0.75, -size * 0.1, size * 0.45, 0.05);
      ctx.bezierCurveTo(size * 0.25, 0.05, size * 0.1, -0.05, 1, -size * 0.1);
      ctx.closePath();

      // Hindwing
      ctx.moveTo(1, 0);
      ctx.bezierCurveTo(size * 0.45, 0.05, size * 0.75, size * 0.25, size * 0.65, size * 0.6);
      ctx.bezierCurveTo(size * 0.5, size * 0.82, size * 0.2, size * 0.75, size * 0.08, size * 0.45);
      ctx.bezierCurveTo(size * 0.02, size * 0.3, 1, size * 0.15, 1, 0);
      ctx.closePath();

      ctx.fillStyle = palette.wing;
      ctx.fill();

      // Wing outline margin
      ctx.strokeStyle = palette.margin;
      ctx.lineWidth = size * 0.05;
      ctx.stroke();

      // Wing veins
      ctx.strokeStyle = palette.vein;
      ctx.lineWidth = 0.7;
      ctx.beginPath();
      ctx.moveTo(2, -size * 0.1);
      ctx.quadraticCurveTo(size * 0.35, -size * 0.3, size * 0.78, -size * 0.65);
      ctx.moveTo(2, -size * 0.1);
      ctx.quadraticCurveTo(size * 0.38, -size * 0.15, size * 0.68, -size * 0.3);
      ctx.moveTo(1, 0.05);
      ctx.quadraticCurveTo(size * 0.28, size * 0.3, size * 0.5, size * 0.55);
      ctx.stroke();

      // Edge decorative dots for Monarch & Sunset
      if (palette.spot !== "rgba(255, 255, 255, 0)") {
        ctx.fillStyle = palette.spot;
        ctx.beginPath();
        ctx.arc(size * 0.84, -size * 0.6, 1.2, 0, Math.PI * 2);
        ctx.arc(size * 0.56, size * 0.58, 1, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    const render = (now: number) => {
      // Calculate delta-time: guarantees constant speed even during heavy scroll lag
      const dt = Math.min((now - lastTime) / 16.67, 2.0);
      lastTime = now;

      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < butterflies.length; i++) {
        const b = butterflies[i];

        b.time += 0.035 * dt;

        // Natural smooth trajectory scaled by delta time
        const flutter = Math.sin(b.time * 2.5 + b.flutterOffset);
        b.x += (b.speedX + flutter * 0.65) * dt;
        b.y += (b.speedY + Math.cos(b.time * 1.8) * 0.35) * dt;

        // Viewport bounds wrap
        if (b.y < -40) {
          b.y = h + 40;
          b.x = Math.random() * w;
        }
        if (b.x < -40) b.x = w + 40;
        if (b.x > w + 40) b.x = -40;

        // Realistic 3D Wing Flapping with delta-time
        const rawFlap = Math.sin(b.time * b.flapSpeed * 28);
        const wingScaleX = 0.2 + 0.8 * Math.abs(rawFlap);
        const bankTilt = Math.sin(b.time * b.tiltSpeed * 15) * 0.2 + (b.speedX > 0 ? 0.07 : -0.07);

        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(bankTilt);
        ctx.globalAlpha = b.opacity;

        // Render Left & Right Wings
        drawWingHalf(ctx, b.size, wingScaleX, true, b.species);
        drawWingHalf(ctx, b.size, wingScaleX, false, b.species);

        // Slender butterfly body
        ctx.fillStyle = "rgba(45, 30, 20, 0.75)";
        ctx.beginPath();
        ctx.ellipse(0, 0, 1.3, b.size * 0.38, 0, 0, Math.PI * 2);
        ctx.arc(0, -b.size * 0.36, 1.4, 0, Math.PI * 2);
        ctx.fill();

        // Antennae
        ctx.strokeStyle = "rgba(45, 30, 20, 0.55)";
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        ctx.moveTo(0, -b.size * 0.36);
        ctx.quadraticCurveTo(-b.size * 0.12, -b.size * 0.52, -b.size * 0.22, -b.size * 0.58);
        ctx.moveTo(0, -b.size * 0.36);
        ctx.quadraticCurveTo(b.size * 0.12, -b.size * 0.52, b.size * 0.22, -b.size * 0.58);
        ctx.stroke();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 opacity-80"
      style={{
        willChange: "transform",
        transform: "translate3d(0, 0, 0)",
        backfaceVisibility: "hidden",
      }}
    />
  );
}
