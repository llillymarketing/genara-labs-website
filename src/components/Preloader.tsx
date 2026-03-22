"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// ─── Timing ──────────────────────────────────────────────────────
//  0.00s – 0.52s  logo fades in (lift + scale)
//  0.30s – 1.25s  ambient glow builds
//  0.38s – 1.28s  border traces around logo (0.90s)
//  0.80s – 1.50s  shimmer sweeps across (0.70s)
//  1.45s – 1.85s  border fades out (0.40s)
//  1.85s – 2.50s  clean logo hold
//  2.50s          dismiss → exit fade begins
//  2.50s – 3.00s  exit fade (0.50s)  ≈ 3.0s total
// ─────────────────────────────────────────────────────────────────
const DISMISS_MS = 2500;

// Rounded-rect path matching the logo's 400×100 intrinsic aspect ratio.
// This is what gets "traced" by the glowing border animation.
const TRACE_PATH =
  "M 11,1.5 H 389 A 9.5,9.5 0 0 1 398.5,11 V 89 A 9.5,9.5 0 0 1 389,98.5 H 11 A 9.5,9.5 0 0 1 1.5,89 V 11 A 9.5,9.5 0 0 1 11,1.5 Z";

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
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
          style={{
            background: "linear-gradient(160deg, #060D1A 0%, #0A1F44 55%, #060D1A 100%)",
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.50, ease: "easeInOut" }}
        >

          {/* ── 1. Ambient glow orb behind logo ── */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              width: "560px",
              height: "220px",
              background: "radial-gradient(ellipse, rgba(37,99,235,0.34) 0%, transparent 68%)",
              filter: "blur(44px)",
            }}
            initial={{ opacity: 0, scale: 0.55 }}
            animate={{ opacity: [0, 0.72, 0.46], scale: [0.55, 1.14, 1.0] }}
            transition={{
              duration: 1.4,
              delay: 0.25,
              times: [0, 0.42, 1],
              ease: "easeOut",
            }}
          />

          {/* ── 2. Logo + border trace + shimmer ── */}
          <motion.div
            className="relative inline-block"
            initial={{ opacity: 0, y: 12, scale: 0.91 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Logo */}
            <Image
              src="/genara-logo-transparent.png"
              alt="Genara Labs"
              width={400}
              height={100}
              className="brightness-0 invert w-[220px] sm:w-[290px] md:w-[350px] block select-none relative z-10"
              priority
              draggable={false}
            />

            {/* ── Border trace SVG overlay ── */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 400 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ overflow: "visible" }}
            >
              <defs>
                <filter id="pl-glow" x="-20%" y="-80%" width="140%" height="260%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Glow layer — wider, softer */}
              <motion.path
                d={TRACE_PATH}
                stroke="rgba(147,197,253,0.55)"
                strokeWidth="5"
                fill="none"
                filter="url(#pl-glow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1, opacity: 0 }}
                transition={{
                  pathLength: { duration: 0.90, delay: 0.38, ease: [0.4, 0, 0.2, 1] },
                  opacity: { duration: 0.40, delay: 1.45, ease: "easeOut" },
                }}
              />

              {/* Sharp trace line */}
              <motion.path
                d={TRACE_PATH}
                stroke="rgba(147,197,253,0.92)"
                strokeWidth="1.2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1, opacity: 0 }}
                transition={{
                  pathLength: { duration: 0.90, delay: 0.38, ease: [0.4, 0, 0.2, 1] },
                  opacity: { duration: 0.40, delay: 1.45, ease: "easeOut" },
                }}
              />
            </svg>

            {/* ── Shimmer sweep ── */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-20" style={{ borderRadius: "10px" }}>
              <motion.div
                className="absolute inset-y-0"
                style={{
                  width: "55%",
                  skewX: "-13deg",
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 35%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0.12) 65%, transparent 100%)",
                }}
                initial={{ x: "-120%" }}
                animate={{ x: "260%" }}
                transition={{
                  duration: 0.70,
                  delay: 0.80,
                  ease: [0.4, 0, 0.2, 1],
                }}
              />
            </div>
          </motion.div>

          {/* ── 3. Thin horizontal accent at bottom ── */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(147,197,253,0.30) 50%, transparent 100%)",
            }}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.75, delay: 0.70, ease: "easeOut" }}
          />

        </motion.div>
      )}
    </AnimatePresence>
  );
}
