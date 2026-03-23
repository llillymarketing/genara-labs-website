"use client";

import { useEffect, useRef } from "react";

/* ─── Geometry ─── */
const W         = 580;
const H         = 660;
const CX        = 215;
const AMP       = 140;
const PERIOD    = 152;
const N_PERIODS = 4.4;
const TH        = PERIOD * N_PERIODS;
const Y0        = H / 2 - TH / 2;
const NODES_PP  = 12;
const N_NODES   = Math.round(N_PERIODS * NODES_PP);
const CURVE_PTS = Math.round(N_PERIODS * 52);
const ROT_DUR   = 9;

/* ─── Connector / card geometry ─── */
const HELIX_RIGHT = CX + AMP;       // 355 — right edge of helix
const CONN_END    = HELIX_RIGHT + 44; // 399
const CARD_X      = CONN_END + 4;   // 403
const CARD_W      = 168;
const CARD_H      = 52;
const CONN_LEN    = CONN_END - HELIX_RIGHT; // 44

/* ─── Callouts — evenly distributed top-to-bottom ─── */
const CALLOUTS = [
  { id: "purity",   title: "98%+ Purity",        sub: "HPLC Verified",    anchorY: 115, drawDelay: 1.5, floatOff: "0s",   floatDur: "4.0s" },
  { id: "tested",   title: "Third-Party Tested",  sub: "Independent Labs", anchorY: 268, drawDelay: 2.0, floatOff: "1.5s", floatDur: "4.4s" },
  { id: "coa",      title: "Full COA Included",   sub: "Every Batch",      anchorY: 421, drawDelay: 2.5, floatOff: "0.9s", floatDur: "3.8s" },
  { id: "shipping", title: "Same-Day Shipping",   sub: "Fast Fulfillment", anchorY: 562, drawDelay: 3.0, floatOff: "2.3s", floatDur: "4.7s" },
];

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
const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  x:  14 + (i * 77.3)  % (W - 230),
  y:  10 + (i * 131.9) % (H - 20),
  r:  0.7 + (i % 5) * 0.45,
  op: 0.13 + (i % 4) * 0.06,
}));

/* ─── Pre-compute initial state ─── */
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

    const pA  = svg.querySelector("#dh-pA")  as SVGPathElement;
    const pAg = svg.querySelector("#dh-pAg") as SVGPathElement;
    const pB  = svg.querySelector("#dh-pB")  as SVGPathElement;
    const pBg = svg.querySelector("#dh-pBg") as SVGPathElement;
    const nA  = Array.from({ length: N_NODES }, (_, i) => svg.querySelector(`#dh-nA${i}`) as SVGCircleElement);
    const nB  = Array.from({ length: N_NODES }, (_, i) => svg.querySelector(`#dh-nB${i}`) as SVGCircleElement);
    const rg  = Array.from({ length: N_NODES }, (_, i) => svg.querySelector(`#dh-rg${i}`)  as SVGLineElement);

    const start = performance.now();
    let raf: number;

    function tick() {
      const rot = ((performance.now() - start) / 1000 / ROT_DUR) * 2 * Math.PI;

      const dA = strandPath(rot, 0);
      const dB = strandPath(rot, Math.PI);
      pA?.setAttribute("d", dA);  pAg?.setAttribute("d", dA);
      pB?.setAttribute("d", dB);  pBg?.setAttribute("d", dB);

      for (let i = 0; i < N_NODES; i++) {
        const frac = (i + 0.5) / N_NODES;
        const y    = (Y0 + frac * TH).toFixed(1);

        const aA  = frac * N_PERIODS * 2 * Math.PI + rot;
        const dA_ = Math.cos(aA);
        if (nA[i]) {
          nA[i].setAttribute("cx", (CX + AMP * Math.sin(aA)).toFixed(1));
          nA[i].setAttribute("cy", y);
          nA[i].setAttribute("r",  (4.5 + 9.5 * (dA_ + 1) / 2).toFixed(1));
          nA[i].setAttribute("opacity", (0.28 + 0.72 * (dA_ + 1) / 2).toFixed(2));
          nA[i].setAttribute("fill", nodeColor(dA_));
        }

        const aB  = aA + Math.PI;
        const dB_ = Math.cos(aB);
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
        {/* Strand glow */}
        <filter id="dh-gs" x="-40%" y="-5%" width="180%" height="110%">
          <feGaussianBlur stdDeviation="5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>

        {/* Node glow */}
        <filter id="dh-gn" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3.2" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>

        {/* Ambient halo blur */}
        <filter id="dh-halo" x="-50%" y="-20%" width="200%" height="140%">
          <feGaussianBlur stdDeviation="28" />
        </filter>

        {/* Connector line glow */}
        <filter id="dh-cg" x="-15%" y="-250%" width="130%" height="600%">
          <feGaussianBlur stdDeviation="1.8" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>

        {/* Card drop shadow */}
        <filter id="dh-shadow" x="-15%" y="-25%" width="145%" height="165%">
          <feDropShadow dx="2" dy="6" stdDeviation="10" floodColor="#03091f" floodOpacity="0.6" />
        </filter>

        {/* Connector gradient — brighter toward the card */}
        <linearGradient id="dh-connGrad" x1={HELIX_RIGHT} y1="0" x2={CONN_END} y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#38BDF8" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0.95" />
        </linearGradient>

        {/* Card background gradient */}
        <linearGradient id="dh-cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#152D62" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#09183a" stopOpacity="0.95" />
        </linearGradient>

        {/* Card border glow */}
        <filter id="dh-cborder" x="-5%" y="-10%" width="115%" height="125%">
          <feGaussianBlur stdDeviation="2" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* ── Ambient halo — pulses gently ── */}
      <ellipse
        cx={CX} cy={H / 2}
        rx={AMP + 38} ry={TH * 0.50}
        fill="rgb(37,99,235)" fillOpacity="0.18"
        filter="url(#dh-halo)"
      >
        <animate attributeName="rx"
          values={`${AMP + 32};${AMP + 52};${AMP + 32}`}
          dur="5.8s" repeatCount="indefinite"
          calcMode="spline" keySplines="0.42 0 0.58 1; 0.42 0 0.58 1" />
        <animate attributeName="fillOpacity"
          values="0.14;0.24;0.14"
          dur="5.8s" repeatCount="indefinite"
          calcMode="spline" keySplines="0.42 0 0.58 1; 0.42 0 0.58 1" />
      </ellipse>

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

      {/* Strand glow passes */}
      <path id="dh-pAg" d={INIT_PA} stroke="#38BDF8" strokeWidth="6.5" strokeLinecap="round" opacity="0.28" filter="url(#dh-gs)" />
      <path id="dh-pBg" d={INIT_PB} stroke="#38BDF8" strokeWidth="6.5" strokeLinecap="round" opacity="0.28" filter="url(#dh-gs)" />

      {/* Strand lines */}
      <path id="dh-pA" d={INIT_PA} stroke="#7DD3FC" strokeWidth="1.9" strokeLinecap="round" />
      <path id="dh-pB" d={INIT_PB} stroke="#7DD3FC" strokeWidth="1.9" strokeLinecap="round" />

      {/* Nodes A */}
      {INIT_A.map((n, i) => (
        <circle key={i} id={`dh-nA${i}`}
          cx={n.x.toFixed(1)} cy={n.y.toFixed(1)} r={n.r.toFixed(1)}
          fill={nodeColor(n.depth)} stroke="#38BDF8" strokeWidth="0.7"
          opacity={n.op.toFixed(2)} filter="url(#dh-gn)" />
      ))}

      {/* Nodes B */}
      {INIT_B.map((n, i) => (
        <circle key={i} id={`dh-nB${i}`}
          cx={n.x.toFixed(1)} cy={n.y.toFixed(1)} r={n.r.toFixed(1)}
          fill={nodeColor(n.depth)} stroke="#38BDF8" strokeWidth="0.7"
          opacity={n.op.toFixed(2)} filter="url(#dh-gn)" />
      ))}

      {/* ─── Data callouts ─── */}
      {CALLOUTS.map((c) => {
        const cy      = c.anchorY;
        const cardTop = cy - CARD_H / 2;
        const connStr = String(CONN_LEN);

        return (
          <g key={c.id}>
            {/* Individual float wrapper */}
            <g>
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0 0; 0 -6; 0 0"
                dur={c.floatDur}
                begin={c.floatOff}
                repeatCount="indefinite"
                calcMode="spline"
                keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
              />

              {/* Outer glow ring at anchor — fades in */}
              <circle cx={HELIX_RIGHT} cy={cy} r="9" fill="#38BDF8" opacity="0">
                <animate attributeName="opacity" from="0" to="0.12"
                  dur="0.5s" begin={`${c.drawDelay}s`} fill="freeze" />
              </circle>

              {/* Inner anchor dot */}
              <circle cx={HELIX_RIGHT} cy={cy} r="3.8" fill="#BAE6FD" opacity="0" filter="url(#dh-cg)">
                <animate attributeName="opacity" from="0" to="1"
                  dur="0.35s" begin={`${c.drawDelay}s`} fill="freeze" />
              </circle>

              {/* Connector — draws in left→right with gradient + glow */}
              <line
                x1={HELIX_RIGHT} y1={cy}
                x2={CONN_END}    y2={cy}
                stroke="url(#dh-connGrad)" strokeWidth="1.2"
                strokeDasharray={connStr} strokeDashoffset={connStr}
                filter="url(#dh-cg)"
              >
                <animate attributeName="stroke-dashoffset"
                  from={connStr} to="0"
                  dur="0.5s" begin={`${c.drawDelay + 0.05}s`} fill="freeze" />
              </line>

              {/* Vertical end-tick */}
              <line
                x1={CONN_END} y1={cy - 5}
                x2={CONN_END} y2={cy + 5}
                stroke="#BAE6FD" strokeWidth="1.2" opacity="0"
              >
                <animate attributeName="opacity" from="0" to="0.55"
                  dur="0.3s" begin={`${c.drawDelay + 0.5}s`} fill="freeze" />
              </line>

              {/* Card group — slides in from right + fades */}
              <g opacity="0" transform={`translate(8, 0)`}>
                <animate attributeName="opacity" from="0" to="1"
                  dur="0.45s" begin={`${c.drawDelay + 0.3}s`} fill="freeze" />
                <animateTransform attributeName="transform"
                  type="translate"
                  from="12 0" to="0 0"
                  dur="0.5s" begin={`${c.drawDelay + 0.3}s`} fill="freeze"
                  additive="sum" />

                {/* Drop shadow layer */}
                <rect
                  x={CARD_X} y={cardTop}
                  width={CARD_W} height={CARD_H} rx="10"
                  fill="url(#dh-cardGrad)"
                  filter="url(#dh-shadow)"
                />

                {/* Card body with gradient fill */}
                <rect
                  x={CARD_X} y={cardTop}
                  width={CARD_W} height={CARD_H} rx="10"
                  fill="url(#dh-cardGrad)"
                />

                {/* Card border — subtle glow */}
                <rect
                  x={CARD_X} y={cardTop}
                  width={CARD_W} height={CARD_H} rx="10"
                  fill="none"
                  stroke="rgba(147,197,253,0.32)" strokeWidth="0.9"
                />

                {/* Left accent bar */}
                <rect
                  x={CARD_X + 11} y={cardTop + 11}
                  width="2.5" height={CARD_H - 22} rx="1.25"
                  fill="#2563EB" opacity="0.9"
                />

                {/* Title */}
                <text
                  x={CARD_X + 21} y={cardTop + 17}
                  fill="white" fillOpacity="0.96"
                  fontSize="11" fontWeight="700"
                  fontFamily="Inter, system-ui, sans-serif"
                  dominantBaseline="hanging"
                  letterSpacing="0.01em"
                >
                  {c.title}
                </text>

                {/* Subtitle */}
                <text
                  x={CARD_X + 21} y={cardTop + 32}
                  fill="#93C5FD" fillOpacity="0.75"
                  fontSize="9.5"
                  fontFamily="Inter, system-ui, sans-serif"
                  dominantBaseline="hanging"
                  letterSpacing="0.02em"
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
