"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Code2,
  LayoutTemplate,
  Monitor,
  ShoppingBag,
  Smartphone,
} from "lucide-react";
import { HERO_SKILLS } from "@/lib/site";
import { cn } from "@/lib/utils";

const skillIcons = {
  wordpress: LayoutTemplate,
  shopify: ShoppingBag,
  web: Code2,
  mobile: Smartphone,
  desktop: Monitor,
  ai: Brain,
} as const;

/** One full pass per skill row (seconds). */
const CYCLE = 40;

const n = HERO_SKILLS.length;

export function SkillsHorizon() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[2] overflow-hidden rounded-[inherit]"
      aria-hidden
      role="presentation"
    >
      <div
        className="absolute inset-x-0 top-[6%] bottom-[22%] [perspective:1000px] [perspective-origin:50%_100%]"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Bottom → top only: fixed X per lane (no horizontal drift). Two waves in time. */}
        {[0, 1].map((phase) =>
          HERO_SKILLS.map((skill, i) => {
            const Icon = skillIcons[skill.key];
            const stagger =
              (i / n) * (CYCLE / 2) + phase * (CYCLE / 2);

            const center = (n - 1) / 2;
            const spreadPx = 52;
            const columnShift = phase === 0 ? -44 : 44;
            /** Static horizontal offset only — does not animate (avoids “flying in from the side”). */
            const xNudge = (i - center) * spreadPx + columnShift;

            /** Tiny lane stagger so parallel rows don’t share one pixel line. */
            const yLane = i * 8 + phase * 6;

            return (
              <div
                key={`${skill.key}-${phase}`}
                className="absolute left-1/2 top-[90%] -translate-x-1/2"
              >
                <motion.div
                  className="w-[min(88vw,400px)]"
                  initial={false}
                  animate={{
                    /** Positive y = lower on screen (below horizon); negative = rise toward top & vanish */
                    y: [
                      120 + yLane,
                      40 + yLane * 0.4,
                      -150 + yLane * 0.2,
                      -400 + yLane * 0.1,
                    ],
                    x: [xNudge, xNudge, xNudge, xNudge],
                    scale: [1.02, 0.78, 0.35, 0.1],
                    opacity: [0, 1, 0.82, 0],
                  }}
                  transition={{
                    duration: CYCLE,
                    repeat: Infinity,
                    delay: stagger,
                    ease: "linear",
                    times: [0, 0.14, 0.76, 1],
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div
                    className={cn(
                      "flex items-center gap-3 rounded-2xl border border-cyan-400/25",
                      "bg-zinc-950/55 px-4 py-3.5 shadow-lg shadow-black/40 backdrop-blur-md"
                    )}
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-cyan-400/35 bg-cyan-500/10 text-cyan-300">
                      <Icon className="size-4" />
                    </span>
                    <span className="text-left text-sm font-medium tracking-tight text-zinc-100">
                      {skill.label}
                    </span>
                  </div>
                </motion.div>
              </div>
            );
          })
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/55" />
      <div className="absolute inset-x-0 top-0 h-[32%] bg-gradient-to-b from-black/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[22%] bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
    </div>
  );
}
