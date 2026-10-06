"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function HeroVideo({
  video,
  alt,
}: {
  video: { url: string; poster: string; posterWidth: number; posterHeight: number };
  alt: string;
}) {
  // Matches the prefers-reduced-motion check already used in ProjectCard's
  // tilt handler — under reduced motion, skip the <video> entirely (no
  // request for the clip at all) and show the poster as a plain image.
  // Lazy-initialized from matchMedia (safe here since this only runs
  // client-side, after "use client" hydration); the effect only subscribes
  // to later changes, it doesn't set the initial value.
  const [reducedMotion, setReducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  if (reducedMotion) {
    return (
      <div className="overflow-hidden rounded-[8px]">
        <Image
          src={video.poster}
          alt={alt}
          width={video.posterWidth}
          height={video.posterHeight}
          quality={90}
          className="h-auto w-full"
          sizes="(max-width: 768px) 100vw, 1164px"
        />
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[8px]">
      <video
        src={video.url}
        poster={video.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        aria-label={alt}
        className="h-auto w-full"
      />
    </div>
  );
}
