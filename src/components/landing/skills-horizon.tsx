"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Code2,
  LayoutTemplate,
  Monitor,
  ShoppingBag,
  Smartphone,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/** One full pass per skill row (seconds). */
const CYCLE = 40;

/** Best-effort icon picked from the chip label so CMS-driven labels still get a glyph. */
function iconForLabel(label: string): LucideIcon {
  const l = label.toLowerCase();
  if (l.includes("wordpress") || l.includes("cms")) return LayoutTemplate;
  if (l.includes("shopify") || l.includes("commerce") || l.includes("checkout"))
    return ShoppingBag;
  if (l.includes("mobile") || l.includes("flutter") || l.includes("native"))
    return Smartphone;
  if (l.includes("desktop") || l.includes("electron") || l.includes("tauri"))
    return Monitor;
  if (
    l.includes("ai") ||
    l.includes("rag") ||
    l.includes("llm") ||
    l.includes("copilot")
  )
    return Brain;
  if (l.includes("next") || l.includes("react") || l.includes("typescript"))
    return Code2;
  return Sparkles;
}

export function SkillsHorizon({ skills }: { skills: string[] }) {
  const n = skills.length;
  if (n === 0) return null;

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
        {[0, 1].map((phase) =>
          skills.map((label, i) => {
            const Icon = iconForLabel(label);
            const stagger = (i / n) * (CYCLE / 2) + phase * (CYCLE / 2);

            const center = (n - 1) / 2;
            const spreadPx = 52;
            const columnShift = phase === 0 ? -44 : 44;
            const xNudge = (i - center) * spreadPx + columnShift;

            const yLane = i * 8 + phase * 6;

            return (
              <div
                key={`${label}-${phase}`}
                className="absolute left-1/2 top-[90%] -translate-x-1/2"
              >
                <motion.div
                  className="w-[min(88vw,400px)]"
                  initial={false}
                  animate={{
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
                      {label}
                    </span>
                  </div>
                </motion.div>
              </div>
            );
          })
        )}
      </div>

      <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black/55" />
      <div className="absolute inset-x-0 top-0 h-[32%] bg-linear-to-b from-black/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[22%] bg-linear-to-t from-black/90 via-black/25 to-transparent" />
    </div>
  );
}
