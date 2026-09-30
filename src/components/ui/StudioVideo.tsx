"use client";

import { useEffect, useRef } from "react";

type Props = {
  /** Path without extension; expects .webm (VP9) and .mp4 (H.264) versions. */
  src: string;
  poster: string;
  label: string;
  className?: string;
};

/**
 * Short, muted studio loop. Nothing downloads until it scrolls near the
 * viewport (preload="none" + poster), it pauses off-screen, and it never
 * autoplays for users who prefer reduced motion — they keep the still.
 */
export function StudioVideo({ src, poster, label, className = "" }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      preload="none"
      muted
      loop
      playsInline
      disablePictureInPicture
      aria-label={label}
    >
      <source src={`${src}.webm`} type="video/webm" />
      <source src={`${src}.mp4`} type="video/mp4" />
    </video>
  );
}
