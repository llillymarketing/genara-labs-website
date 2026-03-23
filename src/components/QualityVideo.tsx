"use client";

import { useEffect, useRef } from "react";

/* ─── Mobile: canvas DNA — depth-sorted, matches DNAHero exactly ─── */
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
    window.addEventListener("resize", resize, { passive: true });

    const ctx = canvas.getContext("2d")!;
    const ROT_DUR   = 9;
    const N_PERIODS = 4.4;
    const start     = performance.now();
    let raf: number;

    function tick() {
      const W  = canvas!.width;
      const H  = canvas!.height;
      const CX = W / 2;
      const AMP    = W * 0.30;
      const TH     = H * 1.05;
      const Y0     = H / 2 - TH / 2;
      const N_NODES = Math.round(N_PERIODS * 12);
      const PTS     = Math.round(N_PERIODS * 52);

      const rot = ((performance.now() - start) / 1000 / ROT_DUR) * Math.PI * 2;

      ctx.clearRect(0, 0, W, H);

      // ── Ambient halo ──────────────────────────────────────────────────
      const haloT  = ((performance.now() - start) / 5800) % 1;
      const haloR  = AMP * 1.6 * (1 + 0.06 * Math.sin(haloT * Math.PI * 2));
      const grad   = ctx.createRadialGradient(CX, H / 2, 0, CX, H / 2, haloR);
      grad.addColorStop(0, "rgba(37,99,235,0.22)");
      grad.addColorStop(1, "rgba(37,99,235,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // ── Build all drawables with depth for sorting ────────────────────
      type Drawable =
        | { kind: "rung"; x1: number; y: number; x2: number; depth: number }
        | { kind: "node"; x: number; y: number; depth: number };

      const drawables: Drawable[] = [];

      for (let i = 0; i < N_NODES; i++) {
        const frac  = (i + 0.5) / N_NODES;
        const angle = frac * N_PERIODS * Math.PI * 2 + rot;
        const sinA  = Math.sin(angle);
        const depth = Math.cos(angle); // depth of strand A side
        const y     = Y0 + frac * TH;

        drawables.push({
          kind: "rung", x1: CX + AMP * sinA, y, x2: CX - AMP * sinA, depth: 0,
        });
        drawables.push({ kind: "node", x: CX + AMP * sinA,  y, depth });
        drawables.push({ kind: "node", x: CX - AMP * sinA, y, depth: -depth });
      }

      // Sort back-to-front so front elements render on top
      drawables.sort((a, b) => a.depth - b.depth);

      // ── Draw strands (glow pass then crisp pass) ──────────────────────
      const buildPath = (phase: number) => {
        ctx.beginPath();
        for (let i = 0; i <= PTS; i++) {
          const frac  = i / PTS;
          const angle = frac * N_PERIODS * Math.PI * 2 + rot + phase;
          const x     = CX + AMP * Math.sin(angle);
          const y     = Y0 + frac * TH;
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
      };

      // Glow passes
      ctx.shadowColor = "rgba(56,189,248,0.45)";
      ctx.shadowBlur  = 10 * dpr;
      for (const phase of [0, Math.PI]) {
        buildPath(phase);
        ctx.strokeStyle = "rgba(56,189,248,0.28)";
        ctx.lineWidth   = 6.5 * dpr;
        ctx.lineCap     = "round";
        ctx.stroke();
      }
      ctx.shadowBlur = 0;

      // Crisp passes
      for (const phase of [0, Math.PI]) {
        buildPath(phase);
        ctx.strokeStyle = "rgba(125,211,252,0.92)"; // #7DD3FC
        ctx.lineWidth   = 1.9 * dpr;
        ctx.stroke();
      }

      // ── Draw depth-sorted rungs + nodes ───────────────────────────────
      for (const d of drawables) {
        if (d.kind === "rung") {
          const sinA  = (d.x1 - CX) / AMP;
          const alpha = Math.abs(sinA) * 0.55 + 0.08;
          ctx.beginPath();
          ctx.moveTo(d.x1, d.y);
          ctx.lineTo(d.x2, d.y);
          ctx.strokeStyle = `rgba(56,189,248,${alpha.toFixed(2)})`;
          ctx.lineWidth   = 1.1 * dpr;
          ctx.stroke();
        } else {
          const f     = (d.depth + 1) / 2;
          const r     = (4.5 + 9.5 * f) * dpr;
          const alpha = 0.28 + 0.72 * f;
          const fill  = `rgba(${Math.round(30+95*f)},${Math.round(58+153*f)},${Math.round(138+114*f)},${alpha.toFixed(2)})`;

          // Node glow
          ctx.beginPath();
          ctx.arc(d.x, d.y, r * 1.8, 0, Math.PI * 2);
          ctx.fillStyle   = `rgba(56,189,248,${(alpha * 0.12).toFixed(2)})`;
          ctx.shadowColor = "rgba(56,189,248,0.35)";
          ctx.shadowBlur  = 6 * dpr;
          ctx.fill();
          ctx.shadowBlur  = 0;

          // Node body
          ctx.beginPath();
          ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
          ctx.fillStyle   = fill;
          ctx.fill();
          ctx.strokeStyle = `rgba(56,189,248,${(alpha * 0.5).toFixed(2)})`;
          ctx.lineWidth   = 0.7 * dpr;
          ctx.stroke();
        }
      }

      // ── Particles ─────────────────────────────────────────────────────
      for (let i = 0; i < 28; i++) {
        const px = 14 + (i * 77.3)  % (W - 80);
        const py = 10 + (i * 131.9) % (H - 20);
        const pr = (0.7 + (i % 5) * 0.45) * dpr;
        const op = 0.13 + (i % 4) * 0.06;
        ctx.beginPath();
        ctx.arc(px, py, pr, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147,197,253,${op})`;
        ctx.fill();
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
      style={{ opacity: 0.9 }}
      aria-hidden="true"
    />
  );
}

/* ─── Desktop: video ─── */
function DesktopVideo() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const v = document.createElement("video");
    v.setAttribute("autoplay", ""); v.setAttribute("muted", "");
    v.setAttribute("loop", "");     v.setAttribute("playsinline", "");
    v.setAttribute("preload", "auto");
    v.muted = true;
    v.style.cssText =
      "position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.12;pointer-events:none;";
    const src = document.createElement("source");
    src.src = "/dna-bg.mp4"; src.type = "video/mp4";
    v.appendChild(src); container.appendChild(v);

    const play = () => { v.muted = true; v.play().catch(() => {}); };
    v.load(); play();
    v.addEventListener("canplay",    play); v.addEventListener("loadeddata", play);
    v.addEventListener("pause",      play); v.addEventListener("ended",      play);
    const onVis = () => { if (document.visibilityState === "visible") play(); };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      v.removeEventListener("canplay",    play); v.removeEventListener("loadeddata", play);
      v.removeEventListener("pause",      play); v.removeEventListener("ended",      play);
      document.removeEventListener("visibilitychange", onVis);
      if (container.contains(v)) container.removeChild(v);
    };
  }, []);

  return (
    <div ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}

export default function QualityVideo() {
  return <DesktopVideo />;
}
