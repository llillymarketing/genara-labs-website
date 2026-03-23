"use client";

import { useEffect, useRef } from "react";

/* ─── Geometry (scaled for mobile full-screen background) ─── */
const W         = 400;
const H         = 900;
const CX        = W / 2;
const AMP       = 120;
const PERIOD    = 160;
const N_PERIODS = 5.5;
const TH        = PERIOD * N_PERIODS;
const Y0        = H / 2 - TH / 2;
const NODES_PP  = 12;
const N_NODES   = Math.round(N_PERIODS * NODES_PP);
const CURVE_PTS = Math.round(N_PERIODS * 52);
const ROT_DUR   = 5;

function nodeColor(depth: number): string {
  const f = (depth + 1) / 2;
  return `rgb(${Math.round(30 + 95 * f)},${Math.round(58 + 153 * f)},${Math.round(138 + 114 * f)})`;
}

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

function initNodes(phase: number) {
  return Array.from({ length: N_NODES }, (_, i) => {
    const frac  = (i + 0.5) / N_NODES;
    const angle = frac * N_PERIODS * 2 * Math.PI + phase;
    const depth = Math.cos(angle);
    const y     = Y0 + frac * TH;
    const x     = CX + AMP * Math.sin(angle);
    return { x, y, r: 3.5 + 7.5 * (depth + 1) / 2, op: 0.22 + 0.6 * (depth + 1) / 2, depth };
  });
}

function initRungs() {
  return Array.from({ length: N_NODES }, (_, i) => {
    const frac  = (i + 0.5) / N_NODES;
    const angle = frac * N_PERIODS * 2 * Math.PI;
    const y     = Y0 + frac * TH;
    const sinA  = Math.sin(angle);
    return { xA: CX + AMP * sinA, xB: CX - AMP * sinA, y, op: (Math.abs(sinA) * 0.45 + 0.06).toFixed(2) };
  });
}

const INIT_A    = initNodes(0);
const INIT_B    = initNodes(Math.PI);
const INIT_RUNG = initRungs();
const INIT_PA   = strandPath(0, 0);
const INIT_PB   = strandPath(0, Math.PI);

export default function MobileDNAVideo() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const pA  = svg.querySelector("#mb-pA")  as SVGPathElement;
    const pAg = svg.querySelector("#mb-pAg") as SVGPathElement;
    const pB  = svg.querySelector("#mb-pB")  as SVGPathElement;
    const pBg = svg.querySelector("#mb-pBg") as SVGPathElement;
    const nA  = Array.from({ length: N_NODES }, (_, i) => svg.querySelector(`#mb-nA${i}`) as SVGCircleElement);
    const nB  = Array.from({ length: N_NODES }, (_, i) => svg.querySelector(`#mb-nB${i}`) as SVGCircleElement);
    const rg  = Array.from({ length: N_NODES }, (_, i) => svg.querySelector(`#mb-rg${i}`)  as SVGLineElement);

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
          nA[i].setAttribute("r",  (3.5 + 7.5 * (dA_ + 1) / 2).toFixed(1));
          nA[i].setAttribute("opacity", (0.22 + 0.6 * (dA_ + 1) / 2).toFixed(2));
          nA[i].setAttribute("fill", nodeColor(dA_));
        }

        const aB  = aA + Math.PI;
        const dB_ = Math.cos(aB);
        if (nB[i]) {
          nB[i].setAttribute("cx", (CX + AMP * Math.sin(aB)).toFixed(1));
          nB[i].setAttribute("cy", y);
          nB[i].setAttribute("r",  (3.5 + 7.5 * (dB_ + 1) / 2).toFixed(1));
          nB[i].setAttribute("opacity", (0.22 + 0.6 * (dB_ + 1) / 2).toFixed(2));
          nB[i].setAttribute("fill", nodeColor(dB_));
        }

        const sinA = Math.sin(aA);
        if (rg[i]) {
          rg[i].setAttribute("x1", (CX + AMP * sinA).toFixed(1));
          rg[i].setAttribute("y1", y);
          rg[i].setAttribute("x2", (CX - AMP * sinA).toFixed(1));
          rg[i].setAttribute("y2", y);
          rg[i].setAttribute("opacity", (Math.abs(sinA) * 0.45 + 0.06).toFixed(2));
        }
      }

      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none lg:hidden overflow-hidden" aria-hidden="true">
      <style>{`
        @keyframes dna-pan {
          0%   { transform: translateY(0); }
          50%  { transform: translateY(-18%); }
          100% { transform: translateY(0); }
        }
      `}</style>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        style={{ opacity: 0.32, animation: "dna-pan 12s ease-in-out infinite" }}
      >
        <defs>
          <filter id="mb-gs" x="-40%" y="-5%" width="180%" height="110%">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="mb-gn" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="mb-halo" x="-50%" y="-20%" width="200%" height="140%">
            <feGaussianBlur stdDeviation="32" />
          </filter>
        </defs>

        {/* Ambient halo */}
        <ellipse
          cx={CX} cy={H / 2}
          rx={AMP + 40} ry={TH * 0.48}
          fill="rgb(37,99,235)" fillOpacity="0.22"
          filter="url(#mb-halo)"
        >
          <animate attributeName="rx"
            values={`${AMP + 34};${AMP + 56};${AMP + 34}`}
            dur="5.8s" repeatCount="indefinite"
            calcMode="spline" keySplines="0.42 0 0.58 1; 0.42 0 0.58 1" />
          <animate attributeName="fillOpacity"
            values="0.18;0.28;0.18"
            dur="5.8s" repeatCount="indefinite"
            calcMode="spline" keySplines="0.42 0 0.58 1; 0.42 0 0.58 1" />
        </ellipse>

        {/* Rungs */}
        {INIT_RUNG.map((r, i) => (
          <line key={i} id={`mb-rg${i}`}
            x1={r.xA.toFixed(1)} y1={r.y.toFixed(1)}
            x2={r.xB.toFixed(1)} y2={r.y.toFixed(1)}
            stroke="#38BDF8" strokeWidth="1" opacity={r.op} />
        ))}

        {/* Strand glow */}
        <path id="mb-pAg" d={INIT_PA} stroke="#38BDF8" strokeWidth="6" strokeLinecap="round" opacity="0.25" filter="url(#mb-gs)" />
        <path id="mb-pBg" d={INIT_PB} stroke="#38BDF8" strokeWidth="6" strokeLinecap="round" opacity="0.25" filter="url(#mb-gs)" />

        {/* Strands */}
        <path id="mb-pA" d={INIT_PA} stroke="#7DD3FC" strokeWidth="1.7" strokeLinecap="round" />
        <path id="mb-pB" d={INIT_PB} stroke="#7DD3FC" strokeWidth="1.7" strokeLinecap="round" />

        {/* Nodes A */}
        {INIT_A.map((n, i) => (
          <circle key={i} id={`mb-nA${i}`}
            cx={n.x.toFixed(1)} cy={n.y.toFixed(1)} r={n.r.toFixed(1)}
            fill={nodeColor(n.depth)} stroke="#38BDF8" strokeWidth="0.6"
            opacity={n.op.toFixed(2)} filter="url(#mb-gn)" />
        ))}

        {/* Nodes B */}
        {INIT_B.map((n, i) => (
          <circle key={i} id={`mb-nB${i}`}
            cx={n.x.toFixed(1)} cy={n.y.toFixed(1)} r={n.r.toFixed(1)}
            fill={nodeColor(n.depth)} stroke="#38BDF8" strokeWidth="0.6"
            opacity={n.op.toFixed(2)} filter="url(#mb-gn)" />
        ))}
      </svg>
    </div>
  );
}
