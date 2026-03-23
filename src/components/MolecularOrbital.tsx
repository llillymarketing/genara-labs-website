"use client";

import { motion } from "framer-motion";
import { Shield, FlaskConical, FileCheck } from "lucide-react";

const ACCENT = "#1565C0";

/* ── Node positions (relative to 200×200 viewBox center at 100,100) ── */
const nodes = [
  { cx: 100, cy: 38,  r: 5 },   // top
  { cx: 155, cy: 62,  r: 4 },   // top-right
  { cx: 162, cy: 120, r: 6 },   // right
  { cx: 130, cy: 165, r: 3.5 }, // bottom-right
  { cx: 70,  cy: 165, r: 4.5 }, // bottom-left
  { cx: 38,  cy: 120, r: 5 },   // left
  { cx: 45,  cy: 62,  r: 3 },   // top-left
];

/* ── Connections: pentagonal shell + inner cross-links ── */
const connections = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 0], // outer ring
  [0, 3], [1, 4], [2, 5], [3, 6], [0, 5],                  // inner cross
];

/* ── Data cards ── */
const dataCards = [
  { icon: Shield,      label: "98%+ Pure",      sub: "HPLC Verified",        top: "8%",  right: "-4%",  delay: 0 },
  { icon: FlaskConical,label: "Third-Party",      sub: "Independent Testing",  top: "55%", right: "-10%", delay: 2 },
  { icon: FileCheck,   label: "Full CoA",         sub: "Every Batch",          top: "82%", right: "10%",  delay: 4 },
];

export default function MolecularOrbital() {
  return (
    <motion.div
      className="relative w-full max-w-[480px] aspect-square hidden lg:block"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.4, ease: "easeOut", delay: 0.6 }}
    >
      {/* Continuous slow rotation wrapper */}
      <motion.div
        className="w-full h-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      >
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Center glow */}
            <radialGradient id="centerGlow" cx="50%" cy="50%" r="25%">
              <stop offset="0%" stopColor={ACCENT} stopOpacity="0.35">
                <animate attributeName="stop-opacity" values="0.2;0.5;0.2" dur="4s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* ── Orbital rings ── */}
          <ellipse cx="100" cy="100" rx="72" ry="32" fill="none" stroke={ACCENT} strokeWidth="0.6" opacity="0.08" transform="rotate(-30 100 100)" />
          <ellipse cx="100" cy="100" rx="72" ry="32" fill="none" stroke={ACCENT} strokeWidth="0.6" opacity="0.1" transform="rotate(30 100 100)" />
          <ellipse cx="100" cy="100" rx="72" ry="32" fill="none" stroke={ACCENT} strokeWidth="0.6" opacity="0.12" transform="rotate(0 100 100)" />

          {/* ── Connection lines ── */}
          {connections.map(([a, b], i) => (
            <line
              key={`conn-${i}`}
              x1={nodes[a].cx} y1={nodes[a].cy}
              x2={nodes[b].cx} y2={nodes[b].cy}
              stroke={ACCENT}
              strokeWidth="0.5"
              opacity="0.15"
            />
          ))}

          {/* ── Center glow ── */}
          <circle cx="100" cy="100" r="28" fill="url(#centerGlow)" />

          {/* ── Molecular nodes ── */}
          {nodes.map((node, i) => {
            const pulseDur = `${3 + i * 0.5}s`;
            const rippleDur = `${4 + i * 0.2}s`;
            return (
              <g key={`node-${i}`}>
                {/* Ripple ring */}
                <circle cx={node.cx} cy={node.cy} r={node.r} fill="none" stroke={ACCENT} strokeWidth="0.4">
                  <animate attributeName="r" values={`${node.r};${node.r + 8};${node.r}`} dur={rippleDur} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.4;0;0.4" dur={rippleDur} repeatCount="indefinite" />
                </circle>
                {/* Node */}
                <circle cx={node.cx} cy={node.cy} r={node.r} fill={ACCENT} opacity="0.6">
                  <animate attributeName="opacity" values="0.3;0.8;0.3" dur={pulseDur} repeatCount="indefinite" />
                </circle>
              </g>
            );
          })}
        </svg>
      </motion.div>

      {/* ── Floating data cards (counter-rotate so text stays readable) ── */}
      {dataCards.map((card, i) => (
        <motion.div
          key={card.label}
          className="absolute flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/60 backdrop-blur-md border border-royal/8 shadow-sm"
          style={{ top: card.top, right: card.right }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: [0, -8, 0] }}
          transition={{
            opacity: { delay: 1.8 + card.delay * 0.3, duration: 0.8 },
            y: { delay: 1.8 + card.delay * 0.3, duration: 6 + i, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <div className="w-7 h-7 rounded-lg bg-royal/8 flex items-center justify-center shrink-0">
            <card.icon className="w-3.5 h-3.5 text-royal" />
          </div>
          <div>
            <p className="text-xs font-semibold text-navy leading-tight">{card.label}</p>
            <p className="text-[10px] text-steel leading-tight">{card.sub}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
