"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// ─── Timing ───────────────────────────────────────────────────
//  0.00s – 0.50s  logo fades in (lift + scale)
//  0.50s – 1.35s  hold — logo fully visible, glow + shimmer settle
//  0.65s – 1.40s  shimmer sweeps across
//  1.85s          setVisible(false) → exit begins
//  1.85s – 2.30s  exit fade (0.45s)  ≈ 2.3s total
// ──────────────────────────────────────────────────────────────
const DISMISS_MS = 1850;

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
            background: "linear-gradient(160deg, #0A1F44 0%, #0D2B5A 55%, #0A1F44 100%)",
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
        >

          {/* ── 1. Ambient glow orb behind logo ── */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              width: "520px",
              height: "260px",
              background: "radial-gradient(ellipse, rgba(37,99,235,0.38) 0%, transparent 68%)",
              filter: "blur(36px)",
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: [0, 0.65, 0.48], scale: [0.6, 1.12, 1.0] }}
            transition={{
              duration: 1.3,
              delay: 0.15,
              times: [0, 0.45, 1],
              ease: "easeOut",
            }}
          />

          {/* ── 2. Single expanding ring (glow pulse) ── */}
          <motion.div
            className="absolute pointer-events-none rounded-full"
            style={{
              width: "340px",
              height: "120px",
              border: "1px solid rgba(147,197,253,0.25)",
            }}
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: [0, 0.4, 0], scale: [0.75, 1.35, 1.6] }}
            transition={{
              duration: 1.4,
              delay: 0.5,
              times: [0, 0.35, 1],
              ease: "easeOut",
            }}
          />

          {/* ── 3. Logo + shimmer wrapper ── */}
          <motion.div
            className="relative overflow-hidden"
            initial={{ opacity: 0, y: 10, scale: 0.93 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.52,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* Logo */}
            <Image
              src="/genara-logo-transparent.png"
              alt="Genara Labs"
              width={400}
              height={100}
              className="brightness-0 invert w-[220px] sm:w-[290px] md:w-[350px] select-none"
              priority
              draggable={false}
            />

            {/* Shimmer sweep — fires once the logo is fully in */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ skewX: "-16deg" }}
              initial={{ x: "-130%" }}
              animate={{ x: "260%" }}
              transition={{
                duration: 0.72,
                delay: 0.65,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <div
                className="w-1/2 h-full"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.16) 50%, transparent 100%)",
                }}
              />
            </motion.div>
          </motion.div>

          {/* ── 4. Thin horizontal accent at bottom — very subtle ── */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(147,197,253,0.28) 50%, transparent 100%)",
            }}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.9, ease: "easeOut" }}
          />

        </motion.div>
      )}
    </AnimatePresence>
  );
}
