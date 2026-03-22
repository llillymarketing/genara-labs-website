"use client";

import { motion } from "framer-motion";

const CX = 80;
const AMP = 55;
const PERIOD = 130;
const REPS = 10;
const H = PERIOD * REPS; // 1300px
const STEPS = REPS * 44;

function makePath(phase: number): string {
  let d = "";
  for (let i = 0; i <= STEPS; i++) {
    const t = (i / STEPS) * REPS * 2 * Math.PI + phase;
    const y = (i / STEPS) * H;
    const x = CX + AMP * Math.sin(t);
    d += (i === 0 ? "M" : "L") + ` ${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d;
}

function makeRungs() {
  const count = REPS * 9;
  return Array.from({ length: count }, (_, i) => {
    const t = (i / count) * REPS * 2 * Math.PI;
    const y = (i / count) * H;
    const s = Math.sin(t);
    return {
      x1: (CX + AMP * s).toFixed(1),
      x2: (CX - AMP * s).toFixed(1),
      y: y.toFixed(1),
      op: (Math.abs(s) * 0.55 + 0.12).toFixed(2),
    };
  });
}

const pathA = makePath(0);
const pathB = makePath(Math.PI);
const rungs = makeRungs();

function HelixSVG() {
  return (
    <svg
      viewBox={`0 0 160 ${H}`}
      width="160"
      height={H}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path d={pathA} stroke="#93C5FD" strokeWidth="1.6" strokeLinecap="round" />
      <path d={pathB} stroke="#93C5FD" strokeWidth="1.6" strokeLinecap="round" />
      {rungs.map((r, i) => (
        <line
          key={i}
          x1={r.x1} y1={r.y}
          x2={r.x2} y2={r.y}
          stroke="#93C5FD"
          strokeWidth="0.9"
          opacity={r.op}
        />
      ))}
    </svg>
  );
}

export default function DNAHelixBg() {
  return (
    <div
      className="absolute top-0 bottom-0 right-[8%] w-[160px] pointer-events-none overflow-hidden"
      style={{ opacity: 0.09 }}
    >
      <motion.div
        style={{ height: H * 2 }}
        animate={{ y: -H }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
      >
        <HelixSVG />
        <HelixSVG />
      </motion.div>
    </div>
  );
}
