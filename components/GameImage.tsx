"use client";

import { useEffect, useMemo, useState } from "react";

const fallbackBySlug: Record<string, string> = {
  "blox-fruits": "/images/games/blox-fruits.svg",
  "blue-lock-rivals": "/images/games/blue-lock-rivals.svg",
  "anime-vanguards": "/images/games/anime-vanguards.svg",
  "pet-simulator": "/images/games/pet-simulator.svg",
  "blade-ball": "/images/games/blade-ball.svg",
  fisch: "/images/games/fisch.svg",
  "grow-a-garden": "/images/games/grow-a-garden.svg",
  brookhaven: "/images/games/brookhaven.svg",
  "king-legacy": "/images/games/king-legacy.svg"
};

function isPublicGameImage(value: string) {
  return /^\/images\/games\/[a-z0-9-]+\.(svg|png|jpg|jpeg|webp)$/i.test(value);
}

export function GameImage({
  src,
  slug,
  alt,
  className = ""
}: {
  src: string;
  slug: string;
  alt: string;
  className?: string;
}) {
  const fallback = fallbackBySlug[slug] ?? "/images/games/blox-fruits.svg";
  const safeSrc = useMemo(() => isPublicGameImage(src) ? src : fallback, [fallback, src]);
  const [currentSrc, setCurrentSrc] = useState(safeSrc);

  useEffect(() => {
    setCurrentSrc(safeSrc);
  }, [safeSrc]);

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
      loading="lazy"
      decoding="async"
      onError={() => setCurrentSrc(fallback)}
    />
  );
}
