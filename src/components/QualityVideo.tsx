"use client";

// dangerouslySetInnerHTML is used so the `muted` attribute is present in the
// actual HTML that the browser parses — iOS Safari checks the HTML attribute
// (not the JS property) to decide whether to allow autoplay on first load.

import { useEffect, useRef } from "react";

export default function QualityVideo() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const v = ref.current?.querySelector("video") as HTMLVideoElement | null;
    if (!v) return;

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
    <div
      ref={ref}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
      dangerouslySetInnerHTML={{
        __html: `<video autoplay muted loop playsinline webkit-playsinline disablepictureinpicture preload="auto" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.12;pointer-events:none;"><source src="/dna-bg.mp4" type="video/mp4"></video>`,
      }}
    />
  );
}
