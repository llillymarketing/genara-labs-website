"use client";

// The video has no audio track, so iOS Safari should allow unconditional
// autoplay. The key is that the <video> element must be in the server-rendered
// HTML (not created via JS after hydration). Next.js SSR outputs `muted` as
// an HTML attribute when declared in JSX, which iOS reads at parse time.

import { useEffect, useRef } from "react";

export default function QualityVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // Safety-net: force play after hydration in case autoplay was delayed
    const play = () => { v.muted = true; v.play().catch(() => {}); };
    play();

    v.addEventListener("pause",      play);
    v.addEventListener("ended",      play);
    v.addEventListener("canplay",    play);
    v.addEventListener("loadeddata", play);

    const onVis = () => { if (document.visibilityState === "visible") play(); };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      v.removeEventListener("pause",      play);
      v.removeEventListener("ended",      play);
      v.removeEventListener("canplay",    play);
      v.removeEventListener("loadeddata", play);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <video
      ref={videoRef}
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
