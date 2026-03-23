"use client";

import { useEffect, useRef } from "react";

/* ─── Mobile: canvas DNA — matches DNAHero visual exactly ─── */
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
    const ROT_DUR  = 9;   // seconds — matches DNAHero exactly
    const N_PERIODS = 4.4;
    const start    = performance.now();
    let raf: number;

    function tick() {
      const W  = canvas!.width;
      const H  = canvas!.height;
      const CX = W / 2;
      // Scale amplitude to canvas width so it fills nicely on any phone
      const AMP    = W * 0.30;
      const PERIOD = H / (N_PERIODS * 1.05);
      const TH     = PERIOD * N_PERIODS;
      const Y0     = H / 2 - TH / 2;
      const N_NODES = Math.round(N_PERIODS * 12);
      const PTS     = Math.round(N_PERIODS * 52); // curve resolution

      const rot = ((performance.now() - start) / 1000 / ROT_DUR) * Math.PI * 2;

      ctx.clearRect(0, 0, W, H);

      // ── Ambient halo ─────────────────────────────────────────────────
      const haloT  = ((performance.now() - start) / 5800) % 1;
      const haloSc = 1 + 0.06 * Math.sin(haloT * Math.PI * 2);
      const haloR  = AMP * 1.5 * haloSc;
      const grad   = ctx.createRadialGradient(CX, H / 2, 0, CX, H / 2, haloR);
      grad.addColorStop(0, "rgba(37,99,235,0.22)");
      grad.addColorStop(1, "rgba(37,99,235,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // ── Build strand points ───────────────────────────────────────────
      const sA: [number,number][] = [];
      const sB: [number,number][] = [];
      for (let i = 0; i <= PTS; i++) {
        const frac  = i / PTS;
        const angle = frac * N_PERIODS * Math.PI * 2 + rot;
        const y     = Y0 + frac * TH;
        sA.push([CX + AMP * Math.sin(angle), y]);
        sB.push([CX - AMP * Math.sin(angle), y]);
      }

      // ── Rungs (rung opacity matches DNAHero: abs(sin)*0.55+0.08) ─────
      for (let i = 0; i < N_NODES; i++) {
        const frac  = (i + 0.5) / N_NODES;
        const angle = frac * N_PERIODS * Math.PI * 2 + rot;
        const sinA  = Math.sin(angle);
        const y     = Y0 + frac * TH;
        const alpha = Math.abs(sinA) * 0.55 + 0.08;
        ctx.beginPath();
        ctx.moveTo(CX + AMP * sinA, y);
        ctx.lineTo(CX - AMP * sinA, y);
        ctx.strokeStyle = `rgba(56,189,248,${alpha.toFixed(2)})`;
        ctx.lineWidth   = 1.1 * dpr;
        ctx.stroke();
      }

      // ── Strand glow pass (shadowBlur matches feGaussianBlur≈5) ───────
      const drawStrand = (pts: [number,number][], glow: boolean) => {
        ctx.beginPath();
        pts.forEach(([x, y], i) => i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y));
        if (glow) {
          ctx.strokeStyle  = "rgba(56,189,248,0.28)";
          ctx.lineWidth    = 6.5 * dpr;
          ctx.shadowColor  = "rgba(56,189,248,0.5)";
          ctx.shadowBlur   = 10 * dpr;
        } else {
          ctx.strokeStyle  = "rgba(125,211,252,0.9)"; // #7DD3FC
          ctx.lineWidth    = 1.9 * dpr;
          ctx.shadowColor  = "transparent";
          ctx.shadowBlur   = 0;
        }
        ctx.lineCap = "round";
        ctx.stroke();
      };

      drawStrand(sA, true);
      drawStrand(sB, true);
      ctx.shadowBlur = 0;
      drawStrand(sA, false);
      drawStrand(sB, false);

      // ── Nodes (size & opacity match DNAHero exactly) ──────────────────
      for (let i = 0; i < N_NODES; i++) {
        const frac  = (i + 0.5) / N_NODES;
        const angle = frac * N_PERIODS * Math.PI * 2 + rot;
        const depth = Math.cos(angle);
        const f     = (depth + 1) / 2;
        const y     = Y0 + frac * TH;
        const r     = (4.5 + 9.5 * f) * dpr;
        const alpha = 0.28 + 0.72 * f;
        const fill  = `rgba(${Math.round(30+95*f)},${Math.round(58+153*f)},${Math.round(138+114*f)},${alpha.toFixed(2)})`;
        const ring  = `rgba(56,189,248,${(alpha * 0.5).toFixed(2)})`;

        for (const x of [CX + AMP * Math.sin(angle), CX - AMP * Math.sin(angle)]) {
          // Node glow (matches feGaussianBlur stdDeviation≈3.2)
          ctx.beginPath();
          ctx.arc(x, y, r * 1.6, 0, Math.PI * 2);
          ctx.fillStyle  = `rgba(56,189,248,${(alpha * 0.15).toFixed(2)})`;
          ctx.shadowColor = "rgba(56,189,248,0.4)";
          ctx.shadowBlur  = 6 * dpr;
          ctx.fill();
          ctx.shadowBlur  = 0;

          // Node body
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fillStyle   = fill;
          ctx.fill();
          ctx.strokeStyle = ring;
          ctx.lineWidth   = 0.7 * dpr;
          ctx.stroke();
        }
      }

      // ── Particles (same distribution as DNAHero) ──────────────────────
      for (let i = 0; i < 28; i++) {
        const px = (14 + (i * 77.3)  % (W - 80));
        const py = (10 + (i * 131.9) % (H - 20));
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
    v.load(); play();
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
