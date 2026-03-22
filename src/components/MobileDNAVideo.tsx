"use client";

import { useEffect, useRef } from "react";

export default function MobileDNAVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    v.muted = true;

    const play = () => v.play().catch(() => {});

    // Fire immediately and on every readiness event so playback
    // starts as early as possible — before full hydration if possible
    play();
    v.addEventListener("canplay", play);
    v.addEventListener("loadedmetadata", play);
    v.addEventListener("loadeddata", play);
    v.addEventListener("pause", play);
    v.addEventListener("ended", play);

    const onVisibility = () => {
      if (document.visibilityState === "visible") play();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      v.removeEventListener("canplay", play);
      v.removeEventListener("loadedmetadata", play);
      v.removeEventListener("loadeddata", play);
      v.removeEventListener("pause", play);
      v.removeEventListener("ended", play);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <video
      ref={ref}
      autoPlay
      muted
      loop
      playsInline
      disablePictureInPicture
      preload="auto"
      className="absolute inset-0 w-full h-full object-cover pointer-events-none lg:hidden"
      style={{ opacity: 0.13 }}
    >
      <source src="/dna-bg.mp4" type="video/mp4" />
    </video>
  );
}
