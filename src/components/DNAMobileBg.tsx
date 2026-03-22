// Mobile-only DNA helix background strip.
// Pure SVG + CSS animation — no JS at runtime, safe for mobile perf.

const W = 200;
const SINGLE_H = 800;
const FULL_H = SINGLE_H * 2; // doubled so scroll loop is seamless
const CX = 100;
const AMP = 66;
const PERIOD = 170;
const RUNGS_PER_PERIOD = 5;

function sineX(y: number, phase: number): number {
  return CX + AMP * Math.sin((2 * Math.PI * y) / PERIOD + phase);
}

// Build polyline path through dense sample points — smooth enough at this scale
function buildPath(phase: number): string {
  const N = 120;
  const parts: string[] = [];
  for (let i = 0; i <= N; i++) {
    const y = (FULL_H * i) / N;
    const x = sineX(y, phase);
    parts.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return parts.join(" ");
}

function buildRungs(): { x1: number; x2: number; y: number; front: boolean }[] {
  const rungs: { x1: number; x2: number; y: number; front: boolean }[] = [];
  const total = Math.ceil((FULL_H / PERIOD) * RUNGS_PER_PERIOD) + 2;
  for (let i = 0; i < total; i++) {
    const y = (i * PERIOD) / RUNGS_PER_PERIOD;
    const x1 = sineX(y, 0);
    const x2 = sineX(y, Math.PI);
    // Determine which strand is "in front" based on derivative sign
    const dx = Math.cos((2 * Math.PI * y) / PERIOD);
    rungs.push({ x1, x2, y, front: dx >= 0 });
  }
  return rungs;
}

// Pre-compute at module level — runs once, not on every render
const STRAND1 = buildPath(0);
const STRAND2 = buildPath(Math.PI);
const RUNGS = buildRungs();

export default function DNAMobileBg() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none lg:hidden"
      aria-hidden="true"
      style={{ zIndex: 1 }}
    >
      {/* Mask: fade top + bottom so scroll seam is invisible */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background:
            "linear-gradient(to bottom, #0A1F44 0%, transparent 12%, transparent 88%, #0A1F44 100%)",
        }}
      />

      {/* Scrolling helix — positioned right-of-center, slightly cut off */}
      <div
        style={{
          position: "absolute",
          right: "-24px",
          top: 0,
          width: `${W}px`,
          height: `${FULL_H}px`,
          opacity: 0.1,
          animation: "dnaScroll 26s linear infinite",
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
            <filter id="dna-mb-glow" x="-40%" y="-2%" width="180%" height="104%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Back strand (dimmer) */}
          <path
            d={STRAND2}
            stroke="#93C5FD"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.55"
          />

          {/* Base pair rungs — drawn between strands */}
          {RUNGS.map((r, i) => (
            <line
              key={i}
              x1={r.x1}
              y1={r.y}
              x2={r.x2}
              y2={r.y}
              stroke="#93C5FD"
              strokeWidth="1.8"
              strokeLinecap="round"
              opacity="0.45"
            />
          ))}

          {/* Front strand (brighter, with glow) */}
          <path
            d={STRAND1}
            stroke="#93C5FD"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#dna-mb-glow)"
          />
        </svg>
      </div>
    </div>
  );
}
