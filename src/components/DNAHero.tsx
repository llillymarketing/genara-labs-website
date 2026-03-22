"use client";

import { useEffect, useRef } from "react";

/* ─── Geometry ─── */
const W          = 580;   // wider to accommodate callouts
const H          = 660;
const CX         = 215;   // helix shifted left, leaving room for callouts
const AMP        = 140;
const PERIOD     = 152;
const N_PERIODS  = 4.4;
const TH         = PERIOD * N_PERIODS;   // ≈ 669 px
const Y0         = H / 2 - TH / 2;      // ≈ -4.5 (helix starts just above top)
const NODES_PP   = 12;
const N_NODES    = Math.round(N_PERIODS * NODES_PP);  // 53
const CURVE_PTS  = Math.round(N_PERIODS * 52);        // 229
const ROT_DUR    = 9;    // seconds per revolution

/* ─── Callout data ─── */
const CALLOUTS = [
  { id: "purity",   title: "99%+ Purity",         sub: "HPLC Verified",     anchorY: 150, drawDelay: 1.6, floatOff: "0s",   floatDur: "3.9s" },
  { id: "tested",   title: "Third-Party Tested",   sub: "Independent Labs",  anchorY: 295, drawDelay: 2.1, floatOff: "1.4s", floatDur: "4.3s" },
  { id: "coa",      title: "Full COA Included",    sub: "Every Batch",       anchorY: 440, drawDelay: 2.6, floatOff: "0.8s", floatDur: "3.7s" },
  { id: "shipping", title: "Same-Day Shipping",    sub: "Fast Fulfillment",  anchorY: 578, drawDelay: 3.1, floatOff: "2.2s", floatDur: "4.6s" },
];

/* Right edge of helix = CX + AMP = 355 */
const HELIX_RIGHT = CX + AMP;          // 355
const CONN_END    = HELIX_RIGHT + 30;  // 385 — where connector meets card
const CARD_X      = CONN_END + 2;      // 387
const CARD_W      = 168;
const CARD_H      = 46;
const CONN_LEN    = CONN_END - HELIX_RIGHT; // 30

/* ─── Color interpolation: back (#1E3A8A) → front (#7DD3FC) ─── */
function nodeColor(depth: number): string {
  const f = (depth + 1) / 2;
  return `rgb(${Math.round(30 + 95 * f)},${Math.round(58 + 153 * f)},${Math.round(138 + 114 * f)})`;
}

/* ─── Strand path ─── */
function strandPath(rot: number, phase: number): string {
  let d = "";
  for (let i = 0; i <= CURVE_PTS; i++) {
    const frac  = i / CURVE_PTS;
    const angle = frac * N_PERIODS * 2 * Math.PI + rot + phase;
    const y     = Y0 + frac * TH;
    const x     = CX + AMP * Math.sin(angle);
    d += (i === 0 ? "M" : "L") + ` ${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d;
}

/* ─── Deterministic particles ─── */
const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x:  12 + (i * 77.3)  % (W - 200),   // keep particles in helix area
  y:  8  + (i * 129.7) % (H - 16),
  r:  0.8 + (i % 5) * 0.5,
  op: 0.14 + (i % 4) * 0.07,
}));

/* ─── Pre-compute initial state (rot = 0) ─── */
function initNodes(phase: number) {
  return Array.from({ length: N_NODES }, (_, i) => {
    const frac  = (i + 0.5) / N_NODES;
    const angle = frac * N_PERIODS * 2 * Math.PI + phase;
    const depth = Math.cos(angle);
    const y     = Y0 + frac * TH;
    const x     = CX + AMP * Math.sin(angle);
    return { x, y, r: 4.5 + 9.5 * (depth + 1) / 2, op: 0.28 + 0.72 * (depth + 1) / 2, depth };
  });
}
function initRungs() {
  return Array.from({ length: N_NODES }, (_, i) => {
    const frac  = (i + 0.5) / N_NODES;
    const angle = frac * N_PERIODS * 2 * Math.PI;
    const y     = Y0 + frac * TH;
    const sinA  = Math.sin(angle);
    return { xA: CX + AMP * sinA, xB: CX - AMP * sinA, y, op: (Math.abs(sinA) * 0.55 + 0.08).toFixed(2) };
  });
}

const INIT_A    = initNodes(0);
const INIT_B    = initNodes(Math.PI);
const INIT_RUNG = initRungs();
const INIT_PA   = strandPath(0, 0);
const INIT_PB   = strandPath(0, Math.PI);

export default function DNAHero() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const pA   = svg.querySelector("#dh-pA")  as SVGPathElement;
    const pAg  = svg.querySelector("#dh-pAg") as SVGPathElement;
    const pB   = svg.querySelector("#dh-pB")  as SVGPathElement;
    const pBg  = svg.querySelector("#dh-pBg") as SVGPathElement;
    const nA   = Array.from({ length: N_NODES }, (_, i) => svg.querySelector(`#dh-nA${i}`) as SVGCircleElement);
    const nB   = Array.from({ length: N_NODES }, (_, i) => svg.querySelector(`#dh-nB${i}`) as SVGCircleElement);
    const rg   = Array.from({ length: N_NODES }, (_, i) => svg.querySelector(`#dh-rg${i}`) as SVGLineElement);

    const start = performance.now();
    let raf: number;

    function tick() {
      const rot = ((performance.now() - start) / 1000 / ROT_DUR) * 2 * Math.PI;

      const dA = strandPath(rot, 0);
      const dB = strandPath(rot, Math.PI);
      pA?.setAttribute("d", dA); pAg?.setAttribute("d", dA);
      pB?.setAttribute("d", dB); pBg?.setAttribute("d", dB);

      for (let i = 0; i < N_NODES; i++) {
        const frac = (i + 0.5) / N_NODES;
        const y    = (Y0 + frac * TH).toFixed(1);

        const aA   = frac * N_PERIODS * 2 * Math.PI + rot;
        const dA_  = Math.cos(aA);
        if (nA[i]) {
          nA[i].setAttribute("cx", (CX + AMP * Math.sin(aA)).toFixed(1));
          nA[i].setAttribute("cy", y);
          nA[i].setAttribute("r",  (4.5 + 9.5 * (dA_ + 1) / 2).toFixed(1));
          nA[i].setAttribute("opacity", (0.28 + 0.72 * (dA_ + 1) / 2).toFixed(2));
          nA[i].setAttribute("fill", nodeColor(dA_));
        }

        const aB   = aA + Math.PI;
        const dB_  = Math.cos(aB);
        if (nB[i]) {
          nB[i].setAttribute("cx", (CX + AMP * Math.sin(aB)).toFixed(1));
          nB[i].setAttribute("cy", y);
          nB[i].setAttribute("r",  (4.5 + 9.5 * (dB_ + 1) / 2).toFixed(1));
          nB[i].setAttribute("opacity", (0.28 + 0.72 * (dB_ + 1) / 2).toFixed(2));
          nB[i].setAttribute("fill", nodeColor(dB_));
        }

        const sinA = Math.sin(aA);
        if (rg[i]) {
          rg[i].setAttribute("x1", (CX + AMP * sinA).toFixed(1));
          rg[i].setAttribute("y1", y);
          rg[i].setAttribute("x2", (CX - AMP * sinA).toFixed(1));
          rg[i].setAttribute("y2", y);
          rg[i].setAttribute("opacity", (Math.abs(sinA) * 0.55 + 0.08).toFixed(2));
        }
      }

      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      aria-hidden="true"
      overflow="visible"
    >
      <defs>
        <filter id="dh-gs" x="-40%" y="-5%" width="180%" height="110%">
          <feGaussianBlur stdDeviation="5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="dh-gn" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="dh-halo" x="-50%" y="-20%" width="200%" height="140%">
          <feGaussianBlur stdDeviation="26" />
        </filter>
        {/* Card backdrop blur (approximate) */}
        <filter id="dh-card" x="-5%" y="-15%" width="110%" height="130%">
          <feGaussianBlur stdDeviation="8" result="b" />
          <feComposite in="SourceGraphic" in2="b" operator="over" />
        </filter>
      </defs>

      {/* Ambient halo */}
      <ellipse cx={CX} cy={H / 2} rx={AMP + 40} ry={TH * 0.52}
        fill="rgba(37,99,235,0.16)" filter="url(#dh-halo)" />

      {/* Particles */}
      {PARTICLES.map((p) => (
        <circle key={p.id} cx={p.x} cy={p.y} r={p.r} fill="#93C5FD" opacity={p.op} />
      ))}

      {/* Rungs */}
      {INIT_RUNG.map((r, i) => (
        <line key={i} id={`dh-rg${i}`}
          x1={r.xA.toFixed(1)} y1={r.y.toFixed(1)}
          x2={r.xB.toFixed(1)} y2={r.y.toFixed(1)}
          stroke="#38BDF8" strokeWidth="1.1" opacity={r.op} />
      ))}

      {/* Strand glow */}
      <path id="dh-pAg" d={INIT_PA} stroke="#38BDF8" strokeWidth="6" strokeLinecap="round" opacity="0.26" filter="url(#dh-gs)" />
      <path id="dh-pBg" d={INIT_PB} stroke="#38BDF8" strokeWidth="6" strokeLinecap="round" opacity="0.26" filter="url(#dh-gs)" />

      {/* Strands */}
      <path id="dh-pA" d={INIT_PA} stroke="#7DD3FC" strokeWidth="1.8" strokeLinecap="round" />
      <path id="dh-pB" d={INIT_PB} stroke="#7DD3FC" strokeWidth="1.8" strokeLinecap="round" />

      {/* Nodes A */}
      {INIT_A.map((n, i) => (
        <circle key={i} id={`dh-nA${i}`}
          cx={n.x.toFixed(1)} cy={n.y.toFixed(1)} r={n.r.toFixed(1)}
          fill={nodeColor(n.depth)} stroke="#38BDF8" strokeWidth="0.6"
          opacity={n.op.toFixed(2)} filter="url(#dh-gn)" />
      ))}

      {/* Nodes B */}
      {INIT_B.map((n, i) => (
        <circle key={i} id={`dh-nB${i}`}
          cx={n.x.toFixed(1)} cy={n.y.toFixed(1)} r={n.r.toFixed(1)}
          fill={nodeColor(n.depth)} stroke="#38BDF8" strokeWidth="0.6"
          opacity={n.op.toFixed(2)} filter="url(#dh-gn)" />
      ))}

      {/* ─── Data callouts ─── */}
      {CALLOUTS.map((c) => {
        const cy       = c.anchorY;
        const cardTop  = cy - CARD_H / 2;
        const connLen  = String(CONN_LEN);

        return (
          <g key={c.id}>
            {/* Floating wrapper — SMIL animateTransform */}
            <g>
              <animateTransform
                attributeName="transform"
                type="translate"
                values={`0 0; 0 -5; 0 0`}
                dur={c.floatDur}
                begin={c.floatOff}
                repeatCount="indefinite"
                calcMode="spline"
                keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
              />

              {/* Anchor dot on the helix */}
              <circle cx={HELIX_RIGHT} cy={cy} r="2.8" fill="#38BDF8" opacity="0">
                <animate attributeName="opacity" from="0" to="0.85" dur="0.4s" begin={`${c.drawDelay}s`} fill="freeze" />
              </circle>

              {/* Connector line */}
              <line
                x1={HELIX_RIGHT} y1={cy}
                x2={CONN_END}    y2={cy}
                stroke="#93C5FD" strokeWidth="0.75" opacity="0.55"
                strokeDasharray={connLen} strokeDashoffset={connLen}
              >
                <animate attributeName="stroke-dashoffset" from={connLen} to="0"
                  dur="0.45s" begin={`${c.drawDelay}s`} fill="freeze" />
              </line>

              {/* Tiny vertical end-tick on connector */}
              <line
                x1={CONN_END} y1={cy - 4}
                x2={CONN_END} y2={cy + 4}
                stroke="#93C5FD" strokeWidth="0.75" opacity="0"
              >
                <animate attributeName="opacity" from="0" to="0.4"
                  dur="0.3s" begin={`${c.drawDelay + 0.4}s`} fill="freeze" />
              </line>

              {/* Card group — fades in */}
              <g opacity="0">
                <animate attributeName="opacity" from="0" to="1"
                  dur="0.5s" begin={`${c.drawDelay + 0.3}s`} fill="freeze" />

                {/* Card background */}
                <rect
                  x={CARD_X} y={cardTop}
                  width={CARD_W} height={CARD_H} rx="8"
                  fill="rgba(10,28,68,0.62)"
                  stroke="rgba(147,197,253,0.22)"
                  strokeWidth="0.8"
                />

                {/* Left accent line inside card */}
                <rect x={CARD_X + 10} y={cardTop + 10} width="2" height={CARD_H - 20} rx="1"
                  fill="#2563EB" opacity="0.85" />

                {/* Title */}
                <text
                  x={CARD_X + 18} y={cardTop + 18}
                  fill="white" fontSize="10.5" fontWeight="700"
                  fontFamily="Inter, system-ui, sans-serif"
                  dominantBaseline="hanging"
                  letterSpacing="0.01"
                >
                  {c.title}
                </text>

                {/* Subtitle */}
                <text
                  x={CARD_X + 18} y={cardTop + 31}
                  fill="#93C5FD" fillOpacity="0.6" fontSize="9"
                  fontFamily="Inter, system-ui, sans-serif"
                  dominantBaseline="hanging"
                  letterSpacing="0.02"
                >
                  {c.sub}
                </text>
              </g>
            </g>
          </g>
        );
      })}
    </svg>
  );
}
