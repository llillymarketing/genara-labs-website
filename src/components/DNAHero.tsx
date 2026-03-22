"use client";

import { useEffect, useRef } from "react";

/* ─── Geometry constants ─── */
const W = 440;
const H = 660;
const CX = W / 2;
const AMP = 145;       // horizontal amplitude (helix width)
const PERIOD = 152;    // px per full revolution
const N_PERIODS = 4.4; // how many full turns visible
const TH = PERIOD * N_PERIODS; // total helix height  ≈ 669px
const NODES_PP = 12;   // sphere nodes per period
const N_NODES = Math.round(N_PERIODS * NODES_PP); // ≈ 53 per strand
const CURVE_PTS = Math.round(N_PERIODS * 52);     // smooth path resolution
const ROT_DURATION = 9; // seconds per full rotation

/* ─── Interpolate front/back node color (#1E3A8A ↔ #7DD3FC) ─── */
function nodeColor(depth: number): string {
  const f = (depth + 1) / 2; // 0 (back) → 1 (front)
  const r = Math.round(30  + (125 - 30)  * f);
  const g = Math.round(58  + (211 - 58)  * f);
  const b = Math.round(138 + (252 - 138) * f);
  return `rgb(${r},${g},${b})`;
}

/* ─── Build strand SVG path ─── */
function strandPath(rotPhase: number, phaseOffset: number): string {
  let d = "";
  for (let i = 0; i <= CURVE_PTS; i++) {
    const frac = i / CURVE_PTS;
    const angle = frac * N_PERIODS * 2 * Math.PI + rotPhase + phaseOffset;
    const y = H / 2 - TH / 2 + frac * TH;
    const x = CX + AMP * Math.sin(angle);
    d += (i === 0 ? "M" : "L") + ` ${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d;
}

/* ─── Deterministic particles ─── */
const PARTICLES = Array.from({ length: 32 }, (_, i) => ({
  id: i,
  x: 12 + (i * 79.1) % (W - 24),
  y: 8  + (i * 131.7) % (H - 16),
  r:  0.9 + (i % 5) * 0.55,
  op: 0.15 + (i % 4) * 0.08,
}));

/* ─── Initial render (rotPhase = 0) ─── */
function initNodes(phaseOffset: number) {
  return Array.from({ length: N_NODES }, (_, i) => {
    const frac = (i + 0.5) / N_NODES;
    const angle = frac * N_PERIODS * 2 * Math.PI + phaseOffset;
    const depth = Math.cos(angle);
    const y = H / 2 - TH / 2 + frac * TH;
    const x = CX + AMP * Math.sin(angle);
    const r = 4.5 + 9.5 * (depth + 1) / 2;
    const op = 0.28 + 0.72 * (depth + 1) / 2;
    return { x, y, r, op, depth };
  });
}

function initRungs() {
  return Array.from({ length: N_NODES }, (_, i) => {
    const frac = (i + 0.5) / N_NODES;
    const angle = frac * N_PERIODS * 2 * Math.PI;
    const y = H / 2 - TH / 2 + frac * TH;
    const xA = CX + AMP * Math.sin(angle);
    const xB = CX - AMP * Math.sin(angle);
    const op = (Math.abs(Math.sin(angle)) * 0.55 + 0.08).toFixed(2);
    return { xA, xB, y, op };
  });
}

const INIT_NODES_A = initNodes(0);
const INIT_NODES_B = initNodes(Math.PI);
const INIT_RUNGS   = initRungs();
const INIT_PATH_A  = strandPath(0, 0);
const INIT_PATH_B  = strandPath(0, Math.PI);

export default function DNAHero() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const pathA      = svg.querySelector("#dh-pA")  as SVGPathElement;
    const pathAGlow  = svg.querySelector("#dh-pAg") as SVGPathElement;
    const pathB      = svg.querySelector("#dh-pB")  as SVGPathElement;
    const pathBGlow  = svg.querySelector("#dh-pBg") as SVGPathElement;

    const nodesA = Array.from({ length: N_NODES }, (_, i) =>
      svg.querySelector(`#dh-nA${i}`) as SVGCircleElement
    );
    const nodesB = Array.from({ length: N_NODES }, (_, i) =>
      svg.querySelector(`#dh-nB${i}`) as SVGCircleElement
    );
    const rungs = Array.from({ length: N_NODES }, (_, i) =>
      svg.querySelector(`#dh-rg${i}`) as SVGLineElement
    );

    const start = performance.now();
    let raf: number;

    function tick() {
      const elapsed = (performance.now() - start) / 1000;
      const rot = (elapsed / ROT_DURATION) * 2 * Math.PI;

      /* strand paths */
      const dA = strandPath(rot, 0);
      const dB = strandPath(rot, Math.PI);
      pathA?.setAttribute("d", dA);
      pathAGlow?.setAttribute("d", dA);
      pathB?.setAttribute("d", dB);
      pathBGlow?.setAttribute("d", dB);

      /* nodes */
      for (let i = 0; i < N_NODES; i++) {
        const frac = (i + 0.5) / N_NODES;
        const y = (H / 2 - TH / 2 + frac * TH).toFixed(1);

        const aA = frac * N_PERIODS * 2 * Math.PI + rot;
        const dA_ = Math.cos(aA);
        const rA = (4.5 + 9.5 * (dA_ + 1) / 2).toFixed(1);
        const oA = (0.28 + 0.72 * (dA_ + 1) / 2).toFixed(2);
        const xA = (CX + AMP * Math.sin(aA)).toFixed(1);
        const colA = nodeColor(dA_);
        if (nodesA[i]) {
          nodesA[i].setAttribute("cx", xA);
          nodesA[i].setAttribute("cy", y);
          nodesA[i].setAttribute("r", rA);
          nodesA[i].setAttribute("opacity", oA);
          nodesA[i].setAttribute("fill", colA);
        }

        const aB = aA + Math.PI;
        const dB_ = Math.cos(aB);
        const rB = (4.5 + 9.5 * (dB_ + 1) / 2).toFixed(1);
        const oB = (0.28 + 0.72 * (dB_ + 1) / 2).toFixed(2);
        const xB = (CX + AMP * Math.sin(aB)).toFixed(1);
        const colB = nodeColor(dB_);
        if (nodesB[i]) {
          nodesB[i].setAttribute("cx", xB);
          nodesB[i].setAttribute("cy", y);
          nodesB[i].setAttribute("r", rB);
          nodesB[i].setAttribute("opacity", oB);
          nodesB[i].setAttribute("fill", colB);
        }

        /* rungs */
        const sinA = Math.sin(aA);
        const rungXA = (CX + AMP * sinA).toFixed(1);
        const rungXB = (CX - AMP * sinA).toFixed(1);
        const rungOp = (Math.abs(sinA) * 0.55 + 0.08).toFixed(2);
        if (rungs[i]) {
          rungs[i].setAttribute("x1", rungXA);
          rungs[i].setAttribute("y1", y);
          rungs[i].setAttribute("x2", rungXB);
          rungs[i].setAttribute("y2", y);
          rungs[i].setAttribute("opacity", rungOp);
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
    >
      <defs>
        {/* Strand glow */}
        <filter id="dh-gs" x="-40%" y="-5%" width="180%" height="110%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Node glow */}
        <filter id="dh-gn" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Ambient halo behind the whole helix */}
        <filter id="dh-halo" x="-50%" y="-20%" width="200%" height="140%">
          <feGaussianBlur stdDeviation="28" />
        </filter>
      </defs>

      {/* Ambient halo */}
      <ellipse
        cx={CX} cy={H / 2}
        rx={AMP + 40} ry={TH * 0.52}
        fill="rgba(37,99,235,0.18)"
        filter="url(#dh-halo)"
      />

      {/* Floating particles */}
      {PARTICLES.map((p) => (
        <circle key={p.id} cx={p.x} cy={p.y} r={p.r} fill="#93C5FD" opacity={p.op} />
      ))}

      {/* Rung lines (base pairs) */}
      {INIT_RUNGS.map((r, i) => (
        <line
          key={i}
          id={`dh-rg${i}`}
          x1={r.xA.toFixed(1)} y1={r.y.toFixed(1)}
          x2={r.xB.toFixed(1)} y2={r.y.toFixed(1)}
          stroke="#38BDF8"
          strokeWidth="1.1"
          opacity={r.op}
        />
      ))}

      {/* Strand glow passes */}
      <path id="dh-pAg" d={INIT_PATH_A} stroke="#38BDF8" strokeWidth="6" strokeLinecap="round" opacity="0.28" filter="url(#dh-gs)" />
      <path id="dh-pBg" d={INIT_PATH_B} stroke="#38BDF8" strokeWidth="6" strokeLinecap="round" opacity="0.28" filter="url(#dh-gs)" />

      {/* Strand lines */}
      <path id="dh-pA" d={INIT_PATH_A} stroke="#7DD3FC" strokeWidth="1.8" strokeLinecap="round" />
      <path id="dh-pB" d={INIT_PATH_B} stroke="#7DD3FC" strokeWidth="1.8" strokeLinecap="round" />

      {/* Nodes — strand A */}
      {INIT_NODES_A.map((n, i) => (
        <circle
          key={i}
          id={`dh-nA${i}`}
          cx={n.x.toFixed(1)}
          cy={n.y.toFixed(1)}
          r={n.r.toFixed(1)}
          fill={nodeColor(n.depth)}
          stroke="#38BDF8"
          strokeWidth="0.6"
          opacity={n.op.toFixed(2)}
          filter="url(#dh-gn)"
        />
      ))}

      {/* Nodes — strand B */}
      {INIT_NODES_B.map((n, i) => (
        <circle
          key={i}
          id={`dh-nB${i}`}
          cx={n.x.toFixed(1)}
          cy={n.y.toFixed(1)}
          r={n.r.toFixed(1)}
          fill={nodeColor(n.depth)}
          stroke="#38BDF8"
          strokeWidth="0.6"
          opacity={n.op.toFixed(2)}
          filter="url(#dh-gn)"
        />
      ))}
    </svg>
  );
}
