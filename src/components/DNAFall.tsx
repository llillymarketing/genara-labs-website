"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const strandA =
  "M8 0 C8 2.8,13 2.2,13 5.5 C13 8.8,8 8.2,8 11 C8 13.8,3 13.2,3 16.5 C3 19.8,8 19.2,8 22 C8 24.8,13 24.2,13 27.5 C13 30.8,8 30.2,8 33 C8 35.8,3 35.2,3 38.5 C3 41.8,8 41.2,8 44";
const strandB =
  "M8 0 C8 2.8,3 2.2,3 5.5 C3 8.8,8 8.2,8 11 C8 13.8,13 13.2,13 16.5 C13 19.8,8 19.2,8 22 C8 24.8,3 24.2,3 27.5 C3 30.8,8 30.2,8 33 C8 35.8,13 35.2,13 38.5 C13 41.8,8 41.2,8 44";

function MiniDNA() {
  return (
    <svg width="16" height="44" viewBox="0 0 16 44" xmlns="http://www.w3.org/2000/svg" fill="none">
      <path d={strandA} stroke="#93C5FD" strokeWidth="1.1" strokeLinecap="round" />
      <path d={strandB} stroke="#2563EB" strokeWidth="1.1" strokeLinecap="round" opacity="0.7" />
      <line x1="3" y1="5.5"  x2="13" y2="5.5"  stroke="#93C5FD" strokeWidth="0.5" opacity="0.75" />
      <line x1="3" y1="16.5" x2="13" y2="16.5" stroke="#93C5FD" strokeWidth="0.5" opacity="0.75" />
      <line x1="3" y1="27.5" x2="13" y2="27.5" stroke="#93C5FD" strokeWidth="0.5" opacity="0.75" />
      <line x1="3" y1="38.5" x2="13" y2="38.5" stroke="#93C5FD" strokeWidth="0.5" opacity="0.75" />
    </svg>
  );
}

interface Molecule {
  id: number;
  x: number;
  duration: number;
  delay: number;
  opacity: number;
  rotate: number;
}

// Deterministic spread — no Math.random() to avoid hydration mismatch
function buildMolecules(): Molecule[] {
  return Array.from({ length: 28 }, (_, i) => ({
    id: i,
    x: (i * 73.3) % 100,
    duration: 11 + (i % 9) * 1.5,
    delay: (i * 2.3) % 20,
    opacity: 0.055 + (i % 6) * 0.018,
    rotate: (i % 7) * 18 - 54,
  }));
}

const MOLECULES = buildMolecules();

export default function DNAFall() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {MOLECULES.map((m) => (
        <motion.div
          key={m.id}
          className="absolute"
          style={{ left: `${m.x}%`, opacity: m.opacity, rotate: m.rotate }}
          initial={{ y: -55 }}
          animate={{ y: 1400 }}
          transition={{
            duration: m.duration,
            delay: m.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <MiniDNA />
        </motion.div>
      ))}
    </div>
  );
}
