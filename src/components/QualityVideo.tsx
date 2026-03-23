"use client";

// Mobile: animated WebP served as <img> — bypasses iOS autoplay policy entirely.
// Animated images play immediately on every device without any user gesture.
// Desktop: original mp4 video (no iOS restrictions on desktop).

import { useEffect, useRef } from "react";

export default function QualityVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
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
    <>
      {/* Mobile — animated WebP, plays instantly with no autoplay restrictions */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/dna-bg-mobile.webp"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none lg:hidden"
        style={{ opacity: 0.12 }}
      />

      {/* Desktop — mp4 video */}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none hidden lg:block"
        style={{ opacity: 0.12 }}
      >
        <source src="/dna-bg.mp4" type="video/mp4" />
      </video>
    </>
  );
}
