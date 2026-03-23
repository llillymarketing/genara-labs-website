"use client";

// iOS Safari requires the `muted` HTML attribute (not just the JS property)
// for autoplay to work. This component sets it imperatively via setAttribute.

import { useEffect, useRef } from "react";

export default function QualityVideo() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const v = document.createElement("video");

    v.setAttribute("autoplay", "");
    v.setAttribute("muted", "");
    v.setAttribute("loop", "");
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "");
    v.setAttribute("disablepictureinpicture", "");
    v.setAttribute("preload", "auto");
    v.muted = true;

    v.style.cssText =
      "position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.12;pointer-events:none;";

    const src = document.createElement("source");
    src.src = "/dna-bg.mp4";
    src.type = "video/mp4";
    v.appendChild(src);
    container.appendChild(v);

    const play = () => { v.muted = true; v.play().catch(() => {}); };

    v.load();
    play();

    v.addEventListener("canplay",   play);
    v.addEventListener("loadeddata", play);
    v.addEventListener("pause",     play);
    v.addEventListener("ended",     play);

    const onVis = () => { if (document.visibilityState === "visible") play(); };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      v.removeEventListener("canplay",    play);
      v.removeEventListener("loadeddata", play);
      v.removeEventListener("pause",      play);
      v.removeEventListener("ended",      play);
      document.removeEventListener("visibilitychange", onVis);
      if (container.contains(v)) container.removeChild(v);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
