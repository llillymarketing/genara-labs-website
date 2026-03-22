"use client";

import { useEffect, useRef } from "react";

export default function MobileDNAVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    v.muted = true;
    v.play().catch(() => {});

    const resume = () => v.play().catch(() => {});
    v.addEventListener("pause", resume);
    v.addEventListener("ended", resume);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") resume();
    });

    return () => {
      v.removeEventListener("pause", resume);
      v.removeEventListener("ended", resume);
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
