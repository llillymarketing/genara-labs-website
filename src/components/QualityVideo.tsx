"use client";

import { useEffect, useRef } from "react";

export default function QualityVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    // Imperatively set the muted attribute (not just the property) so iOS
    // Safari honours it, then attempt to play immediately.
    v.setAttribute("muted", "");
    v.muted = true;
    const play = () => { v.muted = true; v.play().catch(() => {}); };
    play();
    v.addEventListener("canplay",    play);
    v.addEventListener("loadeddata", play);
    v.addEventListener("pause",      play);
    v.addEventListener("ended",      play);
    const onVis = () => { if (document.visibilityState === "visible") play(); };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      v.removeEventListener("canplay",    play);
      v.removeEventListener("loadeddata", play);
      v.removeEventListener("pause",      play);
      v.removeEventListener("ended",      play);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <video
      ref={ref}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      style={{ opacity: 0.12 }}
    >
      <source src="/dna-bg.mp4" type="video/mp4" />
    </video>
  );
}
