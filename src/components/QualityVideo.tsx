"use client";

// iOS Safari blocks video autoplay on first page load without a prior user
// gesture — this is an Apple policy that cannot be bypassed. On mobile we
// use a CSS/rAF SVG animation (same engine as DNAHero) which always runs.
// On desktop the real video plays fine.

import { useEffect, useRef } from "react";

/* ─── SVG helix constants (mobile only) ─── */
const W = 400, H = 900, CX = W / 2, AMP = 120;
const PERIOD = 160, N_PERIODS = 5.5, TH = PERIOD * N_PERIODS;
const Y0 = H / 2 - TH / 2;
const N_NODES = Math.round(N_PERIODS * 12);
const CURVE_PTS = Math.round(N_PERIODS * 52);
const ROT_DUR = 6;

function nodeColor(d: number) {
  const f = (d + 1) / 2;
  return `rgb(${Math.round(30+95*f)},${Math.round(58+153*f)},${Math.round(138+114*f)})`;
}
function strandPath(rot: number, phase: number) {
  let d = "";
  for (let i = 0; i <= CURVE_PTS; i++) {
    const frac = i / CURVE_PTS;
    const a = frac * N_PERIODS * 2 * Math.PI + rot + phase;
    d += (i === 0 ? "M" : "L") + ` ${(CX + AMP * Math.sin(a)).toFixed(1)} ${(Y0 + frac * TH).toFixed(1)}`;
  }
  return d;
}
function initNodes(phase: number) {
  return Array.from({ length: N_NODES }, (_, i) => {
    const frac = (i + 0.5) / N_NODES;
    const a = frac * N_PERIODS * 2 * Math.PI + phase;
    const depth = Math.cos(a);
    return { x: CX + AMP * Math.sin(a), y: Y0 + frac * TH, r: 3.5 + 7.5*(depth+1)/2, op: 0.22+0.6*(depth+1)/2, depth };
  });
}
function initRungs() {
  return Array.from({ length: N_NODES }, (_, i) => {
    const frac = (i + 0.5) / N_NODES;
    const a = frac * N_PERIODS * 2 * Math.PI;
    const sinA = Math.sin(a);
    return { xA: CX+AMP*sinA, xB: CX-AMP*sinA, y: Y0+frac*TH, op: (Math.abs(sinA)*0.45+0.06).toFixed(2) };
  });
}
const IA = initNodes(0), IB = initNodes(Math.PI), IR = initRungs();
const IPA = strandPath(0,0), IPB = strandPath(0,Math.PI);

/* ─── Mobile SVG animation ─── */
function MobileDNA() {
  const svgRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const svg = svgRef.current; if (!svg) return;
    const pA  = svg.querySelector("#qv-pA")  as SVGPathElement;
    const pAg = svg.querySelector("#qv-pAg") as SVGPathElement;
    const pB  = svg.querySelector("#qv-pB")  as SVGPathElement;
    const pBg = svg.querySelector("#qv-pBg") as SVGPathElement;
    const nA  = Array.from({length:N_NODES},(_,i)=>svg.querySelector(`#qv-nA${i}`) as SVGCircleElement);
    const nB  = Array.from({length:N_NODES},(_,i)=>svg.querySelector(`#qv-nB${i}`) as SVGCircleElement);
    const rg  = Array.from({length:N_NODES},(_,i)=>svg.querySelector(`#qv-rg${i}`)  as SVGLineElement);
    const start = performance.now(); let raf: number;
    function tick() {
      const rot = ((performance.now()-start)/1000/ROT_DUR)*2*Math.PI;
      const dA = strandPath(rot,0), dB = strandPath(rot,Math.PI);
      pA?.setAttribute("d",dA); pAg?.setAttribute("d",dA);
      pB?.setAttribute("d",dB); pBg?.setAttribute("d",dB);
      for (let i=0;i<N_NODES;i++) {
        const frac=(i+0.5)/N_NODES, y=(Y0+frac*TH).toFixed(1);
        const aA=frac*N_PERIODS*2*Math.PI+rot, dA_=Math.cos(aA);
        if(nA[i]){nA[i].setAttribute("cx",(CX+AMP*Math.sin(aA)).toFixed(1));nA[i].setAttribute("cy",y);nA[i].setAttribute("r",(3.5+7.5*(dA_+1)/2).toFixed(1));nA[i].setAttribute("opacity",(0.22+0.6*(dA_+1)/2).toFixed(2));nA[i].setAttribute("fill",nodeColor(dA_));}
        const aB=aA+Math.PI, dB_=Math.cos(aB);
        if(nB[i]){nB[i].setAttribute("cx",(CX+AMP*Math.sin(aB)).toFixed(1));nB[i].setAttribute("cy",y);nB[i].setAttribute("r",(3.5+7.5*(dB_+1)/2).toFixed(1));nB[i].setAttribute("opacity",(0.22+0.6*(dB_+1)/2).toFixed(2));nB[i].setAttribute("fill",nodeColor(dB_));}
        const sinA=Math.sin(aA);
        if(rg[i]){rg[i].setAttribute("x1",(CX+AMP*sinA).toFixed(1));rg[i].setAttribute("y1",y);rg[i].setAttribute("x2",(CX-AMP*sinA).toFixed(1));rg[i].setAttribute("y2",y);rg[i].setAttribute("opacity",(Math.abs(sinA)*0.45+0.06).toFixed(2));}
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none lg:hidden overflow-hidden" aria-hidden="true">
      <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="none" style={{opacity:0.28}}>
        <defs>
          <filter id="qv-gs" x="-40%" y="-5%" width="180%" height="110%"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          <filter id="qv-gn" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          <filter id="qv-halo" x="-50%" y="-20%" width="200%" height="140%"><feGaussianBlur stdDeviation="32"/></filter>
        </defs>
        <ellipse cx={CX} cy={H/2} rx={AMP+40} ry={TH*0.48} fill="rgb(37,99,235)" fillOpacity="0.22" filter="url(#qv-halo)">
          <animate attributeName="rx" values={`${AMP+34};${AMP+56};${AMP+34}`} dur="5.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
          <animate attributeName="fillOpacity" values="0.18;0.28;0.18" dur="5.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1"/>
        </ellipse>
        {IR.map((r,i)=><line key={i} id={`qv-rg${i}`} x1={r.xA.toFixed(1)} y1={r.y.toFixed(1)} x2={r.xB.toFixed(1)} y2={r.y.toFixed(1)} stroke="#38BDF8" strokeWidth="1" opacity={r.op}/>)}
        <path id="qv-pAg" d={IPA} stroke="#38BDF8" strokeWidth="6" strokeLinecap="round" opacity="0.25" filter="url(#qv-gs)"/>
        <path id="qv-pBg" d={IPB} stroke="#38BDF8" strokeWidth="6" strokeLinecap="round" opacity="0.25" filter="url(#qv-gs)"/>
        <path id="qv-pA"  d={IPA} stroke="#7DD3FC" strokeWidth="1.7" strokeLinecap="round"/>
        <path id="qv-pB"  d={IPB} stroke="#7DD3FC" strokeWidth="1.7" strokeLinecap="round"/>
        {IA.map((n,i)=><circle key={i} id={`qv-nA${i}`} cx={n.x.toFixed(1)} cy={n.y.toFixed(1)} r={n.r.toFixed(1)} fill={nodeColor(n.depth)} stroke="#38BDF8" strokeWidth="0.6" opacity={n.op.toFixed(2)} filter="url(#qv-gn)"/>)}
        {IB.map((n,i)=><circle key={i} id={`qv-nB${i}`} cx={n.x.toFixed(1)} cy={n.y.toFixed(1)} r={n.r.toFixed(1)} fill={nodeColor(n.depth)} stroke="#38BDF8" strokeWidth="0.6" opacity={n.op.toFixed(2)} filter="url(#qv-gn)"/>)}
      </svg>
    </div>
  );
}

/* ─── Desktop video ─── */
function DesktopVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = containerRef.current; if (!container) return;
    const v = document.createElement("video");
    v.setAttribute("autoplay",""); v.setAttribute("muted",""); v.setAttribute("loop","");
    v.setAttribute("playsinline",""); v.setAttribute("preload","auto");
    v.muted = true;
    v.style.cssText = "position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.12;pointer-events:none;";
    const src = document.createElement("source"); src.src="/dna-bg.mp4"; src.type="video/mp4";
    v.appendChild(src); container.appendChild(v);
    const play = () => { v.muted=true; v.play().catch(()=>{}); };
    v.load(); play();
    v.addEventListener("canplay",play); v.addEventListener("loadeddata",play);
    v.addEventListener("pause",play); v.addEventListener("ended",play);
    const onVis=()=>{ if(document.visibilityState==="visible") play(); };
    document.addEventListener("visibilitychange",onVis);
    return ()=>{ v.removeEventListener("canplay",play); v.removeEventListener("loadeddata",play); v.removeEventListener("pause",play); v.removeEventListener("ended",play); document.removeEventListener("visibilitychange",onVis); if(container.contains(v)) container.removeChild(v); };
  },[]);
  return <div ref={containerRef} className="absolute inset-0 pointer-events-none hidden lg:block" aria-hidden="true"/>;
}

export default function QualityVideo() {
  return (
    <>
      <MobileDNA />
      <DesktopVideo />
    </>
  );
}
