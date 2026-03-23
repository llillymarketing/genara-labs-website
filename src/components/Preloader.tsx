"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// ─── Timing ────────────────────────────────────────────────────────────────
// 0.00s  screen appears (dark navy)
// 0.10s  ambient glow + logo fade in
// 0.35s  trace highlight begins travelling (1.85s duration)
// 2.20s  trace completes — logo fully visible, clean
// 2.55s  trace glow fades out (0.35s)
// 2.80s  dismiss fires → screen fades (0.60s)
// 3.40s  fully transparent → site revealed
// ───────────────────────────────────────────────────────────────────────────
const DISMISS_MS = 2800;

// Logo display size (3:2 original ratio → 252×168 on screen)
const LOGO_W = 252;
const LOGO_H = 168;

// Trace rect: slightly larger than logo with padding
const PAD  = 22;
const SVG_W = LOGO_W + PAD * 2;  // 296
const SVG_H = LOGO_H + PAD * 2;  // 212
const R    = 14;                  // corner radius

export default function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const seen = sessionStorage.getItem("genara-intro");
    if (seen) { setVisible(false); return; }
    sessionStorage.setItem("genara-intro", "1");
    const t = setTimeout(() => setVisible(false), DISMISS_MS);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center select-none"
          style={{
            background:
              "linear-gradient(160deg, #060D1A 0%, #0A1F44 52%, #060D1A 100%)",
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* ── Ambient glow orb ── */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              width: "420px",
              height: "260px",
              background:
                "radial-gradient(ellipse, rgba(37,99,235,0.20) 0%, transparent 68%)",
              filter: "blur(56px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.1 }}
          />

          {/* ── Logo + trace container ── */}
          <motion.div
            className="relative flex items-center justify-center"
            style={{ width: LOGO_W, height: LOGO_H }}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.10, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Logo image */}
            <Image
              src="/genara-logo-transparent.png"
              alt="Genara Labs"
              width={LOGO_W}
              height={LOGO_H}
              priority
              style={{ objectFit: "contain", width: "100%", height: "100%" }}
            />

            {/* SVG trace — positioned to surround the logo */}
            <svg
              viewBox={`0 0 ${SVG_W} ${SVG_H}`}
              fill="none"
              className="absolute pointer-events-none"
              style={{
                left:   -PAD,
                top:    -PAD,
                width:  SVG_W,
                height: SVG_H,
                overflow: "visible",
              }}
            >
              <defs>
                {/* Soft glow for the bright trace pass */}
                <filter id="pl-trace-glow"
                  x="-40%" y="-80%" width="180%" height="260%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="3.2" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                {/* Extra-soft outer glow layer */}
                <filter id="pl-outer-glow"
                  x="-60%" y="-100%" width="220%" height="300%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="7" />
                </filter>
              </defs>

              {/* Static dim border — always visible as reference */}
              <rect
                x={1} y={1}
                width={SVG_W - 2} height={SVG_H - 2}
                rx={R}
                stroke="rgba(37,99,235,0.14)"
                strokeWidth="1"
              />

              {/* Outer diffuse glow — wide, very soft, traces first */}
              <motion.rect
                x={2} y={2}
                width={SVG_W - 4} height={SVG_H - 4}
                rx={R}
                stroke="rgba(56,189,248,0.22)"
                strokeWidth="6"
                fill="none"
                filter="url(#pl-outer-glow)"
                initial={{ pathLength: 0, opacity: 1 }}
                animate={{ pathLength: 1, opacity: 0 }}
                transition={{
                  pathLength: { duration: 1.85, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
                  opacity:    { duration: 0.35, delay: 2.55 },
                }}
              />

              {/* Mid glow pass */}
              <motion.rect
                x={1.5} y={1.5}
                width={SVG_W - 3} height={SVG_H - 3}
                rx={R}
                stroke="rgba(96,165,250,0.50)"
                strokeWidth="2.8"
                fill="none"
                filter="url(#pl-trace-glow)"
                initial={{ pathLength: 0, opacity: 1 }}
                animate={{ pathLength: 1, opacity: 0 }}
                transition={{
                  pathLength: { duration: 1.85, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
                  opacity:    { duration: 0.35, delay: 2.58 },
                }}
              />

              {/* Crisp bright leading edge */}
              <motion.rect
                x={1} y={1}
                width={SVG_W - 2} height={SVG_H - 2}
                rx={R}
                stroke="rgba(186,230,253,0.92)"
                strokeWidth="1.1"
                fill="none"
                initial={{ pathLength: 0, opacity: 1 }}
                animate={{ pathLength: 1, opacity: 0 }}
                transition={{
                  pathLength: { duration: 1.85, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
                  opacity:    { duration: 0.35, delay: 2.60 },
                }}
              />
            </svg>
          </motion.div>

          {/* ── Tagline ── */}
          <motion.p
            className="mt-9 font-display text-[9px] tracking-[0.30em] uppercase"
            style={{ color: "rgba(255,255,255,0.26)" }}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.55 }}
          >
            Research-Grade Compounds
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
