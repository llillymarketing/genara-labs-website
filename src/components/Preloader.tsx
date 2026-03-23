"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Timing ───────────────────────────────────────────────────────
// 0.00s  screen appears (dark navy gradient)
// 0.10s  ambient glow builds behind DNA
// 0.20s  front strand trace begins (1.55s)
// 0.35s  back strand trace begins (1.40s)
// 0.65s  "Genara Labs" label fades in
// 1.75s  both traces complete — full DNA lit
// 2.05s  trace glows fade out (0.45s)
// 2.60s  dismiss fires → exit fade (0.55s)
// 3.15s  fully transparent
// ─────────────────────────────────────────────────────────────────
const DISMISS_MS = 2600;

// ── DNA geometry (pre-computed at module level — zero JS at runtime) ──
const PW = 90, PH = 220, PCX = 45, PAMP = 28, PPER = 110;
const PQTR = PPER / 4;
const PK   = PAMP * (Math.PI / 6);

function buildStrand(phase: number): string {
  const start = -PQTR, end = PH + PQTR;
  const n = Math.ceil((end - start) / PQTR);
  const pts: string[] = [];
  for (let q = 0; q <= n; q++) {
    const y0 = start + q * PQTR, y1 = y0 + PQTR;
    const t0 = (2 * Math.PI * y0) / PPER + phase;
    const t1 = t0 + Math.PI / 2;
    const x0 = PCX + PAMP * Math.sin(t0);
    const x1 = PCX + PAMP * Math.sin(t1);
    const cp1x = x0 + PK * Math.cos(t0);
    const cp2x = x1 - PK * Math.cos(t1);
    if (q === 0) pts.push(`M${x0.toFixed(2)},${y0.toFixed(2)}`);
    pts.push(
      `C${cp1x.toFixed(2)},${(y0 + PPER / 12).toFixed(2)} ` +
      `${cp2x.toFixed(2)},${(y1 - PPER / 12).toFixed(2)} ` +
      `${x1.toFixed(2)},${y1.toFixed(2)}`
    );
  }
  return pts.join(" ");
}

function nodeX(y: number, phase: number): number {
  return PCX + PAMP * Math.sin((2 * Math.PI * y) / PPER + phase);
}

interface PRung { x1: number; x2: number; y: number; op: number; show: boolean; }

function buildRungs(): PRung[] {
  const PER_P = 7;
  const total = Math.ceil((PH / PPER) * PER_P) + 2;
  const out: PRung[] = [];
  for (let i = 0; i < total; i++) {
    const y  = (i * PPER) / PER_P;
    const x1 = nodeX(y, 0), x2 = nodeX(y, Math.PI);
    const frac = Math.abs(x1 - x2) / (2 * PAMP);
    out.push({ x1, x2, y, op: 0.12 + 0.26 * frac, show: frac > 0.2 });
  }
  return out;
}

const S1    = buildStrand(0);
const S2    = buildStrand(Math.PI);
const RUNGS = buildRungs();

export default function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const seen = sessionStorage.getItem("genara-preloader");
    if (seen) { setVisible(false); return; }
    sessionStorage.setItem("genara-preloader", "1");
    const t = setTimeout(() => setVisible(false), DISMISS_MS);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
          style={{
            background: "linear-gradient(160deg, #060D1A 0%, #0A1F44 52%, #060D1A 100%)",
            gap: "28px",
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
        >
          {/* ── Ambient glow orb behind DNA ── */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              width: "280px", height: "360px",
              background:
                "radial-gradient(ellipse, rgba(37,99,235,0.22) 0%, transparent 68%)",
              filter: "blur(52px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.1 }}
          />

          {/* ── DNA helix SVG ── */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.86 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <svg
              className="w-[100px] sm:w-[126px] h-auto"
              viewBox={`0 0 ${PW} ${PH}`}
              fill="none"
              style={{ overflow: "visible" }}
            >
              <defs>
                <filter id="pl-hi" x="-60%" y="-8%" width="220%" height="116%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="2.8" result="b" />
                  <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="pl-lo" x="-50%" y="-6%" width="200%" height="112%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="1.8" result="b" />
                  <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              {/* ── Static base DNA (dim, always visible) ── */}
              <path d={S2} stroke="#071B40" strokeWidth="7"   strokeLinecap="round" opacity="0.90" />
              <path d={S2} stroke="#163D78" strokeWidth="4"   strokeLinecap="round" opacity="0.48" />
              <path d={S1} stroke="#071B40" strokeWidth="8"   strokeLinecap="round" opacity="0.90" />
              <path d={S1} stroke="#1A4E96" strokeWidth="4.5" strokeLinecap="round" opacity="0.52" />

              {/* Rungs */}
              {RUNGS.map((r, i) => r.show && (
                <line key={i}
                  x1={r.x1} y1={r.y} x2={r.x2} y2={r.y}
                  stroke="#2563EB" strokeWidth="0.75" strokeLinecap="round"
                  opacity={r.op}
                />
              ))}

              {/* ── Energy trace: back strand ── */}
              <motion.path
                d={S2}
                stroke="rgba(96,165,250,0.68)"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
                filter="url(#pl-lo)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1, opacity: 0 }}
                transition={{
                  pathLength: { duration: 1.40, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
                  opacity:    { duration: 0.45, delay: 2.05, ease: "easeOut" },
                }}
              />

              {/* ── Energy trace: front strand ── */}
              <motion.path
                d={S1}
                stroke="rgba(147,197,253,0.90)"
                strokeWidth="2.2"
                strokeLinecap="round"
                fill="none"
                filter="url(#pl-hi)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1, opacity: 0 }}
                transition={{
                  pathLength: { duration: 1.55, delay: 0.20, ease: [0.25, 0.46, 0.45, 0.94] },
                  opacity:    { duration: 0.45, delay: 2.15, ease: "easeOut" },
                }}
              />
            </svg>
          </motion.div>

          {/* ── Brand label ── */}
          <motion.p
            className="font-display text-[10px] tracking-[0.24em] uppercase select-none"
            style={{ color: "rgba(255,255,255,0.38)" }}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
          >
            Genara Labs
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
