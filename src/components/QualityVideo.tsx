"use client";

import { useEffect, useRef } from "react";

/* ─── Mobile: canvas-based DNA helix (fast, no DOM overhead) ─── */
function MobileDNA() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width  = canvas.offsetWidth  * dpr;
      canvas.height = canvas.offsetHeight * dpr;
    };
    resize();
    window.addEventListener("resize", resize);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const ROT_DUR = 7; // seconds per full rotation
    const start   = performance.now();
    let raf: number;

    function tick() {
      const W = canvas!.width;
      const H = canvas!.height;
      const cx    = W / 2;
      const amp   = W * 0.28;
      const nPer  = 5;
      const total = H * 1.1;
      const y0    = H * -0.05;
      const t     = (performance.now() - start) / 1000;
      const rot   = (t / ROT_DUR) * Math.PI * 2;

      ctx!.clearRect(0, 0, W, H);

      const pts = 180; // curve resolution

      // Build strand point arrays
      const sA: [number, number][] = [];
      const sB: [number, number][] = [];
      for (let i = 0; i <= pts; i++) {
        const frac  = i / pts;
        const angle = frac * nPer * Math.PI * 2 + rot;
        const y     = y0 + frac * total;
        sA.push([cx + amp * Math.sin(angle), y]);
        sB.push([cx - amp * Math.sin(angle), y]);
      }

      // Draw rungs first (behind strands)
      const rungCount = nPer * 10;
      for (let i = 0; i <= rungCount; i++) {
        const frac  = i / rungCount;
        const angle = frac * nPer * Math.PI * 2 + rot;
        const sinA  = Math.sin(angle);
        const y     = y0 + frac * total;
        const xA    = cx + amp * sinA;
        const xB    = cx - amp * sinA;
        const alpha = Math.abs(sinA) * 0.35 + 0.05;
        ctx!.beginPath();
        ctx!.moveTo(xA, y);
        ctx!.lineTo(xB, y);
        ctx!.strokeStyle = `rgba(56,189,248,${alpha.toFixed(2)})`;
        ctx!.lineWidth   = 1 * dpr;
        ctx!.stroke();
      }

      // Draw glow strand A
      ctx!.beginPath();
      sA.forEach(([x, y], i) => i === 0 ? ctx!.moveTo(x, y) : ctx!.lineTo(x, y));
      ctx!.strokeStyle = "rgba(56,189,248,0.18)";
      ctx!.lineWidth   = 8 * dpr;
      ctx!.lineCap     = "round";
      ctx!.filter      = "blur(6px)";
      ctx!.stroke();
      ctx!.filter      = "none";

      // Draw glow strand B
      ctx!.beginPath();
      sB.forEach(([x, y], i) => i === 0 ? ctx!.moveTo(x, y) : ctx!.lineTo(x, y));
      ctx!.strokeStyle = "rgba(56,189,248,0.18)";
      ctx!.lineWidth   = 8 * dpr;
      ctx!.filter      = "blur(6px)";
      ctx!.stroke();
      ctx!.filter      = "none";

      // Draw crisp strand A
      ctx!.beginPath();
      sA.forEach(([x, y], i) => i === 0 ? ctx!.moveTo(x, y) : ctx!.lineTo(x, y));
      ctx!.strokeStyle = "rgba(125,211,252,0.8)";
      ctx!.lineWidth   = 1.5 * dpr;
      ctx!.stroke();

      // Draw crisp strand B
      ctx!.beginPath();
      sB.forEach(([x, y], i) => i === 0 ? ctx!.moveTo(x, y) : ctx!.lineTo(x, y));
      ctx!.strokeStyle = "rgba(125,211,252,0.8)";
      ctx!.lineWidth   = 1.5 * dpr;
      ctx!.stroke();

      // Draw nodes
      const nodeCount = nPer * 10;
      for (let i = 0; i < nodeCount; i++) {
        const frac  = (i + 0.5) / nodeCount;
        const angle = frac * nPer * Math.PI * 2 + rot;
        const depth = Math.cos(angle);
        const y     = y0 + frac * total;
        const xA    = cx + amp * Math.sin(angle);
        const xB    = cx - amp * Math.sin(angle);
        const r     = (2.5 + 5 * (depth + 1) / 2) * dpr;
        const alpha = 0.2 + 0.65 * (depth + 1) / 2;
        const f     = (depth + 1) / 2;
        const color = `rgba(${Math.round(30+95*f)},${Math.round(58+153*f)},${Math.round(138+114*f)},${alpha.toFixed(2)})`;

        // Node A
        ctx!.beginPath();
        ctx!.arc(xA, y, r, 0, Math.PI * 2);
        ctx!.fillStyle   = color;
        ctx!.fill();
        ctx!.strokeStyle = `rgba(56,189,248,${(alpha * 0.6).toFixed(2)})`;
        ctx!.lineWidth   = 0.5 * dpr;
        ctx!.stroke();

        // Node B
        ctx!.beginPath();
        ctx!.arc(xB, y, r, 0, Math.PI * 2);
        ctx!.fillStyle   = color;
        ctx!.fill();
        ctx!.strokeStyle = `rgba(56,189,248,${(alpha * 0.6).toFixed(2)})`;
        ctx!.stroke();
      }

      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none lg:hidden"
      style={{ opacity: 0.3 }}
      aria-hidden="true"
    />
  );
}

/* ─── Desktop: video (no iOS restrictions on desktop) ─── */
function DesktopVideo() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const v = document.createElement("video");
    v.setAttribute("autoplay", "");
    v.setAttribute("muted", "");
    v.setAttribute("loop", "");
    v.setAttribute("playsinline", "");
    v.setAttribute("preload", "auto");
    v.muted = true;
    v.style.cssText =
      "position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.12;pointer-events:none;";

    const src = document.createElement("source");
    src.src  = "/dna-bg.mp4";
    src.type = "video/mp4";
    v.appendChild(src);
    container.appendChild(v);

    const play = () => { v.muted = true; v.play().catch(() => {}); };
    v.load();
    play();
    v.addEventListener("canplay",    play);
    v.addEventListener("loadeddata", play);
    v.addEventListener("pause",      play);
    v.addEventListener("ended",      play);
    const onVis = () => { if (document.visibilityState === "visible") play(); };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      v.removeEventListener("canplay",    play);
      v.removeEventListener("loadeddata", play);
      v.removeEventListener("pause",      play);
      v.removeEventListener("ended",      play);
      document.removeEventListener("visibilitychange", onVis);
      if (container.contains(v)) container.removeChild(v);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none hidden lg:block"
      aria-hidden="true"
    />
  );
}

export default function QualityVideo() {
  return (
    <>
      <MobileDNA />
      <DesktopVideo />
    </>
  );
}
