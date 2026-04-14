"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const HeroUniverse = dynamic(
  () => import("./hero-universe").then((m) => m.HeroUniverse),
  { ssr: false, loading: () => null }
);

export function HeroVisual({
  caption,
  loadingText,
  skills,
}: {
  caption: string;
  loadingText: string;
  skills: string[];
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative w-full">
      <ul className="sr-only" aria-label="Core skills">
        {skills.map((label) => (
          <li key={label}>{label}</li>
        ))}
      </ul>
      {!mounted ? (
        <div className="flex h-[min(74vh,680px)] min-h-115 w-full items-center justify-center rounded-2xl border border-border/50 bg-[#020208] md:min-h-130 md:rounded-[1.35rem]">
          <div className="flex flex-col items-center gap-2">
            <div
              className="size-16 animate-pulse rounded-full border-2 border-dashed border-cyan-500/25"
              aria-hidden
            />
            <p className="text-xs text-muted-foreground">{loadingText}</p>
          </div>
        </div>
      ) : (
        <HeroUniverse caption={caption} skills={skills} />
      )}
    </div>
  );
}
