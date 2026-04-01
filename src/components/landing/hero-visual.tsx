"use client";

import dynamic from "next/dynamic";
import { HERO_SKILLS } from "@/lib/site";

const HeroUniverse = dynamic(
  () => import("./hero-universe").then((m) => m.HeroUniverse),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[min(74vh,680px)] min-h-[460px] w-full items-center justify-center rounded-2xl border border-border/50 bg-[#020208] md:min-h-[520px] md:rounded-[1.35rem]">
        <div className="flex flex-col items-center gap-2">
          <div
            className="size-16 animate-pulse rounded-full border-2 border-dashed border-cyan-500/25"
            aria-hidden
          />
          <p className="text-xs text-muted-foreground">Loading universe…</p>
        </div>
      </div>
    ),
  }
);

export function HeroVisual() {
  return (
    <div className="relative w-full">
      <ul className="sr-only" aria-label="Core skills">
        {HERO_SKILLS.map((s) => (
          <li key={s.key}>{s.label}</li>
        ))}
      </ul>
      <HeroUniverse />
    </div>
  );
}
