"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type MegaMenuArtProps = {
  variant: "products" | "services" | "technologies" | "about";
  artLabel: string;
  className?: string;
};

const SATELLITES = [0, 72, 144, 216, 288] as const;

export function MegaMenuArt({ variant, artLabel, className }: MegaMenuArtProps) {
  const isProducts = variant === "products";
  const isTech = variant === "technologies";
  const isAbout = variant === "about";

  return (
    <div
      className={cn(
        "relative isolate flex min-h-[200px] flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-950/90 p-5 md:min-h-[240px] md:p-6",
        className
      )}
      aria-hidden
    >
      <div
        className={cn(
          "pointer-events-none absolute -right-1/4 -top-1/3 size-[120%] rounded-full opacity-70 blur-3xl landing-mesh-blob",
          isAbout
            ? "bg-[radial-gradient(circle_at_35%_30%,oklch(0.72_0.14_55/0.38),transparent_55%)]"
            : isTech
              ? "bg-[radial-gradient(circle_at_40%_35%,oklch(0.62_0.17_160/0.42),transparent_55%)]"
              : isProducts
                ? "bg-[radial-gradient(circle_at_30%_30%,oklch(0.55_0.22_290/0.45),transparent_55%)]"
                : "bg-[radial-gradient(circle_at_70%_40%,oklch(0.72_0.14_195/0.4),transparent_55%)]"
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute -bottom-1/4 -left-1/4 size-[90%] rounded-full opacity-50 blur-3xl landing-mesh-blob-delayed",
          isAbout
            ? "bg-[radial-gradient(circle_at_65%_70%,oklch(0.55_0.18_280/0.28),transparent_60%)]"
            : isTech
              ? "bg-[radial-gradient(circle_at_60%_65%,oklch(0.58_0.2_300/0.32),transparent_60%)]"
              : isProducts
                ? "bg-[radial-gradient(circle_at_70%_70%,oklch(0.65_0.18_250/0.35),transparent_60%)]"
                : "bg-[radial-gradient(circle_at_20%_60%,oklch(0.6_0.12_200/0.35),transparent_60%)]"
        )}
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12] landing-grid-bg"
        style={{ animationDuration: "32s" }}
      />

      <div className="relative flex flex-1 items-center justify-center py-4">
        <div className="relative size-[11rem] md:size-[13rem]">
          <motion.div
            className={cn(
              "absolute inset-0 rounded-full border",
              isAbout
                ? "border-amber-400/25"
                : isTech
                  ? "border-emerald-400/25"
                  : "border-cyan-400/20"
            )}
            animate={{ rotate: 360 }}
            transition={{
              duration: 48,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
          <motion.div
            className={cn(
              "absolute inset-3 rounded-full border",
              isAbout
                ? "border-rose-400/20"
                : isTech
                  ? "border-fuchsia-400/25"
                  : "border-violet-400/25"
            )}
            animate={{ rotate: -360 }}
            transition={{
              duration: 36,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute inset-8 rounded-full border border-white/10"
            animate={{ rotate: 360 }}
            transition={{
              duration: 28,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              className={cn(
                "size-3 rounded-full shadow-[0_0_24px_oklch(0.75_0.15_200/0.5)]",
                isAbout
                  ? "bg-gradient-to-br from-amber-300 to-rose-400"
                  : isTech
                    ? "bg-gradient-to-br from-emerald-300 to-fuchsia-400"
                    : "bg-gradient-to-br from-cyan-300 to-violet-400"
              )}
              animate={{ scale: [1, 1.12, 1], opacity: [0.85, 1, 0.85] }}
              transition={{
                duration: 3.2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </div>

          <motion.div
            className="absolute inset-0"
            animate={{
              rotate: isProducts ? 360 : isTech ? -360 : isAbout ? 360 : -360,
            }}
            transition={{
              duration: isProducts ? 22 : isTech ? 20 : isAbout ? 24 : 26,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            {SATELLITES.map((deg, i) => (
              <span
                key={deg}
                className={cn(
                  "absolute left-1/2 top-1/2 block size-2 rounded-full",
                  isAbout
                    ? i % 2 === 0
                      ? "bg-amber-400/90 shadow-[0_0_12px_oklch(0.75_0.15_75/0.45)]"
                      : "bg-rose-400/85 shadow-[0_0_12px_oklch(0.62_0.2_15/0.45)]"
                    : isTech
                      ? i % 2 === 0
                        ? "bg-emerald-400/90 shadow-[0_0_12px_oklch(0.65_0.18_160/0.55)]"
                        : "bg-fuchsia-400/85 shadow-[0_0_12px_oklch(0.62_0.22_300/0.5)]"
                      : isProducts && i % 2 === 0
                        ? "bg-violet-400/90 shadow-[0_0_12px_oklch(0.65_0.2_290/0.6)]"
                        : "bg-cyan-400/90 shadow-[0_0_12px_oklch(0.72_0.14_195/0.55)]"
                )}
                style={{
                  transform: `translate(-50%, -50%) rotate(${deg}deg) translateY(-3.25rem)`,
                }}
              />
            ))}
          </motion.div>

          <motion.div
            className="absolute inset-0"
            animate={{
              rotate: isProducts ? -360 : isTech ? 360 : isAbout ? -360 : 360,
            }}
            transition={{
              duration: isProducts ? 18 : isTech ? 17 : isAbout ? 19 : 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            {[36, 108, 180, 252, 324].map((deg, i) => (
              <span
                key={deg}
                className={cn(
                  "absolute left-1/2 top-1/2 block size-1.5 rounded-full",
                  isAbout
                    ? i % 2 === 0
                      ? "bg-amber-200/40"
                      : "bg-rose-200/35"
                    : isTech
                      ? i % 2 === 0
                        ? "bg-emerald-200/45"
                        : "bg-fuchsia-200/40"
                      : i % 2 === 0
                        ? "bg-white/40"
                        : "bg-cyan-200/50"
                )}
                style={{
                  transform: `translate(-50%, -50%) rotate(${deg}deg) translateY(-2.35rem)`,
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>

      <p className="relative text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">
        {artLabel}
      </p>
    </div>
  );
}
