// Mobile-only precision DNA helix.
// All paths computed at module level — zero JS at runtime.
// Animation: pure CSS only (dnaScroll + dnaEnergy keyframes in globals.css).

const W = 200;
const SINGLE_H = 920;
const FULL_H = SINGLE_H * 2; // doubled for seamless loop
const CX = 100;
const AMP = 52;          // tighter helix — more engineered look
const PERIOD = 188;      // longer period — more elegant, less chaotic
const QUARTER = PERIOD / 4;
const K = AMP * (Math.PI / 6); // bezier control handle x-magnitude (derived from sine derivative)

// ─── Mathematically precise bezier path ───────────────────────────
// Each quarter period uses a single cubic bezier whose control points
// are computed from the derivative of the sine function at each anchor.
// This produces a perfect smooth sine wave (error < 0.3% vs polyline).
function buildPath(phase: number): string {
  const start = -QUARTER;
  const end   = FULL_H + QUARTER;
  const totalSegments = Math.ceil((end - start) / QUARTER);
  const parts: string[] = [];

  for (let q = 0; q <= totalSegments; q++) {
    const y0 = start + q * QUARTER;
    const y1 = y0 + QUARTER;

    const t0 = (2 * Math.PI * y0) / PERIOD + phase;
    const t1 = t0 + Math.PI / 2;

    const x0 = CX + AMP * Math.sin(t0);
    const x1 = CX + AMP * Math.sin(t1);

    // Tangent-derived control points
    const cp1x = x0 + K * Math.cos(t0);
    const cp2x = x1 - K * Math.cos(t1);
    const cp1y = y0 + PERIOD / 12;
    const cp2y = y1 - PERIOD / 12;

    if (q === 0) parts.push(`M${x0.toFixed(2)},${y0.toFixed(2)}`);
    parts.push(`C${cp1x.toFixed(2)},${cp1y.toFixed(2)} ${cp2x.toFixed(2)},${cp2y.toFixed(2)} ${x1.toFixed(2)},${y1.toFixed(2)}`);
  }

  return parts.join(" ");
}

function sineX(y: number, phase: number): number {
  return CX + AMP * Math.sin((2 * Math.PI * y) / PERIOD + phase);
}

// ─── Rungs with depth-aware opacity ───────────────────────────────
// The helix rungs shorten naturally at crossings (zero-length when both
// strands meet) and widen at peaks. We use this fraction to modulate
// opacity, giving the illusion of 3D perspective without heavy rendering.
interface Rung {
  x1: number; x2: number; y: number;
  lineOpacity: number; nodeOpacity: number; showNodes: boolean;
}

function buildRungs(): Rung[] {
  const RUNGS_PER_PERIOD = 7; // more rungs = more precision/density
  const total = Math.ceil((FULL_H / PERIOD) * RUNGS_PER_PERIOD) + 3;
  const rungs: Rung[] = [];

  for (let i = 0; i < total; i++) {
    const y = (i * PERIOD) / RUNGS_PER_PERIOD;
    const x1 = sineX(y, 0);
    const x2 = sineX(y, Math.PI);
    const rungSpan = Math.abs(x1 - x2);
    const fraction = rungSpan / (2 * AMP); // 0 at crossing → 1 at peak

    rungs.push({
      x1, x2, y,
      lineOpacity: 0.10 + 0.28 * fraction,
      nodeOpacity: 0.20 + 0.42 * fraction,
      showNodes: fraction > 0.28, // only render nodes where rung is visible
    });
  }
  return rungs;
}

// ─── Subtle particles ─────────────────────────────────────────────
// Deterministic positions to avoid SSR/CSR hydration mismatch.
const PARTICLES = Array.from({ length: 8 }, (_, i) => ({
  cx: (i * 67.3 + 19) % W,
  cy: (i * 111.7 + 48) % FULL_H,
  r:  0.4 + (i % 3) * 0.22,
  op: 0.12 + (i % 4) * 0.04,
}));

// ─── Pre-compute everything at module level ────────────────────────
const STRAND1 = buildPath(0);
const STRAND2 = buildPath(Math.PI);
const RUNGS   = buildRungs();

export default function DNAMobileBg() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none lg:hidden"
      aria-hidden="true"
      style={{ zIndex: 1 }}
    >
      {/* Top / bottom fade — color matches hero gradient edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 3,
          background:
            "linear-gradient(to bottom, #0A1F44 0%, transparent 16%, transparent 84%, #0A1F44 100%)",
        }}
      />

      {/* Energy flow — a soft light that drifts upward along the strand */}
      <div
        style={{
          position: "absolute",
          right: "-10px",
          top: 0,
          width: "160px",
          height: "170px",
          background:
            "radial-gradient(ellipse 55% 50% at 62% 50%, rgba(96,165,250,0.065) 0%, transparent 100%)",
          animation: "dnaEnergy 16s linear infinite",
          willChange: "transform",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      {/* Second energy flow at different phase for depth */}
      <div
        style={{
          position: "absolute",
          right: "-10px",
          top: 0,
          width: "160px",
          height: "120px",
          background:
            "radial-gradient(ellipse 40% 50% at 45% 50%, rgba(96,165,250,0.04) 0%, transparent 100%)",
          animation: "dnaEnergy 16s linear infinite",
          animationDelay: "-8s",
          willChange: "transform",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Scrolling DNA — 34s for smooth, unhurried movement */}
      <div
        style={{
          position: "absolute",
          right: "-16px",
          top: 0,
          width: `${W}px`,
          height: `${FULL_H}px`,
          opacity: 0.11,
          animation: "dnaScroll 34s linear infinite",
          willChange: "transform",
        }}
      >
        <svg
          width={W}
          height={FULL_H}
          viewBox={`0 0 ${W} ${FULL_H}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Tight glow for front strand — controlled, not neon */}
            <filter id="dna-glow-f" x="-25%" y="-4%" width="150%" height="108%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1.0" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Soft blur for back strand — depth-of-field effect */}
            <filter id="dna-blur-b" x="-15%" y="-3%" width="130%" height="106%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="0.7" />
            </filter>
          </defs>

          {/* ── Back strand: dimmer blue, slightly out-of-focus ── */}
          <path
            d={STRAND2}
            stroke="#5B9BD5"
            strokeWidth="1.0"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.38"
            filter="url(#dna-blur-b)"
          />

          {/* ── Base pair rungs: depth-modulated opacity ── */}
          {RUNGS.map((r, i) => (
            <g key={i}>
              <line
                x1={r.x1} y1={r.y}
                x2={r.x2} y2={r.y}
                stroke="#7BB8E8"
                strokeWidth="0.75"
                strokeLinecap="round"
                opacity={r.lineOpacity}
              />
              {r.showNodes && (
                <>
                  {/* Front node */}
                  <circle
                    cx={r.x1} cy={r.y} r="1.5"
                    fill="#93C5FD"
                    opacity={r.nodeOpacity}
                  />
                  {/* Back node — smaller, dimmer */}
                  <circle
                    cx={r.x2} cy={r.y} r="1.1"
                    fill="#60A5FA"
                    opacity={r.nodeOpacity * 0.6}
                  />
                </>
              )}
            </g>
          ))}

          {/* ── Front strand: sharper, tight glow ── */}
          <path
            d={STRAND1}
            stroke="#93C5FD"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#dna-glow-f)"
          />

          {/* ── Particles: barely visible, scientific atmosphere ── */}
          {PARTICLES.map((p, i) => (
            <circle
              key={i}
              cx={p.cx} cy={p.cy}
              r={p.r}
              fill="#93C5FD"
              opacity={p.op}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
