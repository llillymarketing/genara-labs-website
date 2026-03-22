// Mobile DNA helix — 3D ribbon tube effect via stacked strokes.
// Each strand is 3 overlapping paths: wide dark body + mid + bright highlight edge.
// All geometry pre-computed at module level. Zero JS at runtime.

const W        = 220;
const SINGLE_H = 940;
const FULL_H   = SINGLE_H * 2;   // doubled for seamless scroll loop
const CX       = 110;             // helix center x
const AMP      = 70;              // wider amplitude → more visual impact
const PERIOD   = 200;             // longer period → elegant, not chaotic
const QUARTER  = PERIOD / 4;
const K        = AMP * (Math.PI / 6); // bezier handle scale (from sine derivative)

// ─── Mathematically smooth bezier sine path ────────────────────────
// Each quarter-period is one cubic bezier. Control points are derived
// from the derivative of sin at each anchor — gives a perfect smooth curve.
function buildPath(phase: number): string {
  const start = -QUARTER;
  const end   = FULL_H + QUARTER;
  const n     = Math.ceil((end - start) / QUARTER);
  const parts: string[] = [];

  for (let q = 0; q <= n; q++) {
    const y0 = start + q * QUARTER;
    const y1 = y0 + QUARTER;
    const t0 = (2 * Math.PI * y0) / PERIOD + phase;
    const t1 = t0 + Math.PI / 2;
    const x0 = CX + AMP * Math.sin(t0);
    const x1 = CX + AMP * Math.sin(t1);
    const cp1x = x0 + K * Math.cos(t0);
    const cp2x = x1 - K * Math.cos(t1);
    if (q === 0) parts.push(`M${x0.toFixed(2)},${y0.toFixed(2)}`);
    parts.push(
      `C${cp1x.toFixed(2)},${(y0 + PERIOD / 12).toFixed(2)} ` +
      `${cp2x.toFixed(2)},${(y1 - PERIOD / 12).toFixed(2)} ` +
      `${x1.toFixed(2)},${y1.toFixed(2)}`
    );
  }
  return parts.join(" ");
}

function sineX(y: number, phase: number): number {
  return CX + AMP * Math.sin((2 * Math.PI * y) / PERIOD + phase);
}

// ─── Rungs with perspective depth ─────────────────────────────────
// Rung length naturally varies: 0 at strand crossings, 2×AMP at peaks.
// We use the length fraction to scale opacity → automatic 3D depth cue.
interface Rung {
  x1: number; x2: number; y: number;
  opacity: number; nodeR1: number; nodeR2: number; show: boolean;
}

function buildRungs(): Rung[] {
  const PER_PERIOD = 9; // dense rungs like the reference
  const total = Math.ceil((FULL_H / PERIOD) * PER_PERIOD) + 3;
  const rungs: Rung[] = [];

  for (let i = 0; i < total; i++) {
    const y  = (i * PERIOD) / PER_PERIOD;
    const x1 = sineX(y, 0);
    const x2 = sineX(y, Math.PI);
    const span = Math.abs(x1 - x2);
    const frac = span / (2 * AMP); // 0 → crossing, 1 → peak
    rungs.push({
      x1, x2, y,
      opacity: 0.08 + 0.42 * frac,
      nodeR1: 1.2 + 2.0 * frac,  // front node grows at peaks
      nodeR2: 0.9 + 1.4 * frac,  // back node
      show: frac > 0.15,
    });
  }
  return rungs;
}

// ─── Tiny background particles ─────────────────────────────────────
const PARTICLES = Array.from({ length: 9 }, (_, i) => ({
  cx: (i * 59.3 + 24) % W,
  cy: (i * 107.1 + 61) % FULL_H,
  r:  0.5 + (i % 3) * 0.2,
  op: 0.10 + (i % 4) * 0.04,
}));

// ─── Pre-compute everything once at module level ───────────────────
const STRAND1 = buildPath(0);        // front strand
const STRAND2 = buildPath(Math.PI);  // back strand
const RUNGS   = buildRungs();

export default function DNAMobileBg() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none lg:hidden"
      aria-hidden="true"
      style={{ zIndex: 1 }}
    >
      {/* Top / bottom gradient fade — hides seamless scroll join */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 3,
          background:
            "linear-gradient(to bottom, #0A1F44 0%, transparent 14%, transparent 86%, #0A1F44 100%)",
        }}
      />

      {/* Energy flow — soft glow that drifts upward (CSS only, no JS) */}
      <div style={{
        position: "absolute", right: "-8px", top: 0,
        width: "180px", height: "200px",
        background: "radial-gradient(ellipse 55% 50% at 60% 50%, rgba(37,99,235,0.07) 0%, transparent 100%)",
        animation: "dnaEnergy 18s linear infinite",
        willChange: "transform", zIndex: 2, pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", right: "-8px", top: 0,
        width: "180px", height: "140px",
        background: "radial-gradient(ellipse 42% 50% at 45% 50%, rgba(37,99,235,0.045) 0%, transparent 100%)",
        animation: "dnaEnergy 18s linear infinite",
        animationDelay: "-9s",
        willChange: "transform", zIndex: 2, pointerEvents: "none",
      }} />

      {/* Main scrolling helix */}
      <div style={{
        position: "absolute",
        right: "-28px",       // partially off-screen right — keeps DNA on right edge
        top: 0,
        width: `${W}px`,
        height: `${FULL_H}px`,
        opacity: 0.16,        // enough to see clearly without overpowering text
        animation: "dnaScroll 36s linear infinite",
        willChange: "transform",
      }}>
        <svg
          width={W} height={FULL_H}
          viewBox={`0 0 ${W} ${FULL_H}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Tight highlight glow for front strand */}
            <filter id="dna-hl" x="-30%" y="-4%" width="160%" height="108%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            {/* Soft depth blur for back strand */}
            <filter id="dna-bg" x="-20%" y="-3%" width="140%" height="106%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" />
            </filter>
            {/* Node glow */}
            <filter id="dna-nd" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* ══ BACK STRAND — 3-layer ribbon tube ══ */}
          {/* Layer 1: wide shadow body */}
          <path d={STRAND2} stroke="#071B40" strokeWidth="11"
            strokeLinecap="round" strokeLinejoin="round" opacity="0.70" />
          {/* Layer 2: mid-tone fill */}
          <path d={STRAND2} stroke="#163D78" strokeWidth="7"
            strokeLinecap="round" strokeLinejoin="round" opacity="0.55" />
          {/* Layer 3: dim highlight edge */}
          <path d={STRAND2} stroke="#3B72B8" strokeWidth="1.8"
            strokeLinecap="round" strokeLinejoin="round"
            opacity="0.55" filter="url(#dna-bg)" />

          {/* ══ RUNGS + NODES ══ */}
          {RUNGS.map((r, i) => r.show && (
            <g key={i}>
              {/* Rung line */}
              <line
                x1={r.x1} y1={r.y} x2={r.x2} y2={r.y}
                stroke="#4A86C8" strokeWidth="1.0" strokeLinecap="round"
                opacity={r.opacity}
              />
              {/* Back node (smaller, dimmer) */}
              <circle cx={r.x2} cy={r.y} r={r.nodeR2}
                fill="#2E6BAE" opacity={r.opacity * 0.7} />
              {/* Front node (larger, brighter, slight glow) */}
              <circle cx={r.x1} cy={r.y} r={r.nodeR1}
                fill="#60A5FA" opacity={r.opacity * 0.85}
                filter={r.nodeR1 > 2.2 ? "url(#dna-nd)" : undefined} />
            </g>
          ))}

          {/* ══ FRONT STRAND — 3-layer ribbon tube, brighter ══ */}
          {/* Layer 1: wide shadow body */}
          <path d={STRAND1} stroke="#071B40" strokeWidth="12"
            strokeLinecap="round" strokeLinejoin="round" opacity="0.75" />
          {/* Layer 2: mid-tone fill */}
          <path d={STRAND1} stroke="#1A4E96" strokeWidth="7.5"
            strokeLinecap="round" strokeLinejoin="round" opacity="0.60" />
          {/* Layer 3: bright highlight edge with glow */}
          <path d={STRAND1} stroke="#60A5FA" strokeWidth="2.0"
            strokeLinecap="round" strokeLinejoin="round"
            filter="url(#dna-hl)" />

          {/* ══ PARTICLES ══ */}
          {PARTICLES.map((p, i) => (
            <circle key={i} cx={p.cx} cy={p.cy} r={p.r}
              fill="#93C5FD" opacity={p.op} />
          ))}
        </svg>
      </div>
    </div>
  );
}
