import { useEffect } from "react";

export default function PortfolioVFX() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = document.createElement("canvas");
    canvas.className = "portfolio-vfx-canvas";
    canvas.setAttribute("aria-hidden", "true");
    Object.assign(canvas.style, {
      position: "fixed", inset: "0", width: "100%", height: "100%",
      pointerEvents: "none", zIndex: "50"
    });
    document.documentElement.appendChild(canvas);
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) { canvas.remove(); return; }

    let width = 0, height = 0, raf = 0, last = 0;
    const touchMode = window.matchMedia("(pointer: coarse)").matches;
    const particleCount = touchMode ? 22 : 42;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.7 + 0.5,
      vx: (Math.random() - 0.5) * 0.22,
      vy: -(Math.random() * 0.32 + 0.08),
      a: Math.random() * 0.45 + 0.12,
      phase: Math.random() * Math.PI * 2
    }));
    const bursts = [];
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const draw = (now) => {
      raf = 0;
      ctx.clearRect(0, 0, width, height);
      const dt = Math.min(32, now - (last || now));
      last = now;
      for (const p of particles) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        if (p.y < -8) { p.y = height + 8; p.x = Math.random() * width; }
        if (p.x < -8) p.x = width + 8;
        if (p.x > width + 8) p.x = -8;
        const flicker = 0.65 + 0.35 * Math.sin(now * 0.002 + p.phase);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,42,62," + (p.a * flicker) + ")";
        ctx.fill();
      }
      for (let i = bursts.length - 1; i >= 0; i--) {
        const burst = bursts[i];
        const age = now - burst.t;
        const alpha = Math.max(0, 1 - age / 430);
        if (alpha <= 0) { bursts.splice(i, 1); continue; }
        for (const p of burst.parts) {
          ctx.beginPath();
          ctx.arc(burst.x + p.vx * age * 0.075, burst.y + p.vy * age * 0.075, p.r * alpha, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255,55,72," + alpha + ")";
          ctx.shadowColor = "#ff2638";
          ctx.shadowBlur = 8 * alpha;
          ctx.fill();
        }
      }
      ctx.shadowBlur = 0;
      if (!document.hidden) raf = requestAnimationFrame(draw);
    };
    const burst = (x, y) => {
      const count = touchMode ? 8 : 12;
      bursts.push({
        x, y, t: performance.now(),
        parts: Array.from({ length: count }, (_, i) => {
          const angle = i * Math.PI * 2 / count;
          const speed = 1.2 + Math.random() * 2.3;
          return { vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, r: 1 + Math.random() * 1.5 };
        })
      });
      if (bursts.length > 5) bursts.shift();
      if (!raf) raf = requestAnimationFrame(draw);
    };
    const onDown = (event) => {
      if (event.pointerType === "mouse" || event.pointerType === "touch" || event.pointerType === "pen") {
        burst(event.clientX, event.clientY);
      }
    };
    const onVisibilityChange = () => {
      if (document.hidden) {
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
      } else if (!raf) {
        raf = requestAnimationFrame(draw);
      }
    };
    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointerdown", onDown);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (raf) cancelAnimationFrame(raf);
      canvas.remove();
    };
  }, []);
  return null;
}
