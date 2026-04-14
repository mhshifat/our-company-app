"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type ProjectItem = {
  title: string;
  blurb: string;
  stat: string;
  tags: string[];
  url: string;
  accent: "violet" | "cyan" | "emerald" | "amber" | "fuchsia";
};

const ACCENT = {
  violet: {
    wash: "from-violet-600/45 via-violet-950/30 to-zinc-950",
    edge: "border-violet-500/35",
    glow: "shadow-[0_0_80px_-12px_rgba(139,92,246,0.35)]",
    tag: "border-violet-400/25 bg-violet-500/10 text-violet-200",
  },
  cyan: {
    wash: "from-cyan-500/40 via-cyan-950/25 to-zinc-950",
    edge: "border-cyan-500/35",
    glow: "shadow-[0_0_80px_-12px_rgba(34,211,238,0.3)]",
    tag: "border-cyan-400/25 bg-cyan-500/10 text-cyan-200",
  },
  emerald: {
    wash: "from-emerald-500/40 via-emerald-950/25 to-zinc-950",
    edge: "border-emerald-500/35",
    glow: "shadow-[0_0_80px_-12px_rgba(52,211,153,0.28)]",
    tag: "border-emerald-400/25 bg-emerald-500/10 text-emerald-200",
  },
  amber: {
    wash: "from-amber-500/40 via-amber-950/20 to-zinc-950",
    edge: "border-amber-500/35",
    glow: "shadow-[0_0_80px_-12px_rgba(251,191,36,0.25)]",
    tag: "border-amber-400/25 bg-amber-500/10 text-amber-200",
  },
  fuchsia: {
    wash: "from-fuchsia-600/45 via-fuchsia-950/30 to-zinc-950",
    edge: "border-fuchsia-500/35",
    glow: "shadow-[0_0_80px_-12px_rgba(217,70,239,0.3)]",
    tag: "border-fuchsia-400/25 bg-fuchsia-500/10 text-fuchsia-200",
  },
} as const;

type AccentKey = keyof typeof ACCENT;
type AccentTokens = (typeof ACCENT)[AccentKey];

function ProjectPreview({
  url,
  title,
  index,
  accent,
  flip,
}: {
  url: string;
  title: string;
  index: number;
  accent: AccentTokens;
  flip: boolean;
}) {
  const frameClass = cn(
    "relative aspect-[16/10] overflow-hidden rounded-2xl border md:aspect-auto md:min-h-[320px] md:rounded-none md:rounded-l-[1.65rem] md:border-0 md:border-r",
    accent.edge,
    flip &&
      "md:rounded-l-none md:rounded-r-[1.65rem] md:border-r-0 md:border-l"
  );

  const decoration = (
    <>
      <div className={cn("absolute inset-0 bg-linear-to-br", accent.wash)} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,transparent_20%,rgba(0,0,0,0.75)_100%)]" />
      <div
        className="absolute inset-0 opacity-[0.2]"
        style={{
          backgroundImage: `
            linear-gradient(to right, oklch(1 0 0 / 0.06) 1px, transparent 1px),
            linear-gradient(to bottom, oklch(1 0 0 / 0.06) 1px, transparent 1px)
          `,
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/20" />
    </>
  );

  const badges = (
    <>
      <span className="pointer-events-none absolute left-5 top-5 z-10 font-mono text-[11px] font-medium tracking-widest text-white/50">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="pointer-events-none absolute right-5 top-5 z-10 flex size-10 items-center justify-center rounded-xl border border-white/10 bg-black/30 text-white/60 backdrop-blur-md transition-colors group-hover:border-white/20 group-hover:text-white/90">
        <ArrowUpRight className="size-4" aria-hidden />
      </div>
    </>
  );

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${title} — open live preview`}
        className={cn(frameClass, "block")}
      >
        {decoration}
        <iframe
          src={url}
          title={`${title} preview`}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin"
          tabIndex={-1}
          aria-hidden
          className="pointer-events-none absolute inset-0 size-full border-0 opacity-90 transition-opacity group-hover:opacity-100"
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
        {badges}
      </a>
    );
  }

  return (
    <div className={frameClass}>
      {decoration}
      {badges}
      <p className="absolute bottom-5 left-5 right-5 text-xs text-zinc-500 md:left-6 md:right-6">
        <span className="rounded-md bg-black/40 px-2 py-1 text-[10px] uppercase tracking-wider text-zinc-400 backdrop-blur-sm">
          Preview · add UI capture or embed
        </span>
      </p>
    </div>
  );
}

export function ProjectsShowcase({
  eyebrow,
  headline,
  subhead,
  items,
}: {
  eyebrow: string;
  headline: string;
  subhead: string;
  items: ProjectItem[];
}) {
  if (items.length === 0) return null;

  return (
    <div className="w-full">
      <div className="max-w-2xl">
        <p className="text-sm font-medium tracking-wide text-cyan-300/90 uppercase">
          {eyebrow}
        </p>
        <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-balance md:text-4xl">
          {headline}
        </h2>
        <p className="mt-4 max-w-xl text-muted-foreground leading-relaxed">
          {subhead}
        </p>
      </div>

      <div className="mt-14 flex flex-col gap-12 md:mt-20 md:gap-16">
        {items.map((project, i) => {
          const accent = ACCENT[project.accent as AccentKey];
          const flip = i % 2 === 1;

          return (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "group relative grid gap-8 overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-zinc-950/50 p-6 shadow-2xl shadow-black/40 backdrop-blur-sm md:grid-cols-12 md:gap-0 md:p-0 md:shadow-black/50",
                accent.glow
              )}
            >
              <div
                className={cn(
                  "relative md:col-span-7",
                  flip ? "md:order-2" : "md:order-1"
                )}
              >
                <ProjectPreview
                  url={project.url}
                  title={project.title}
                  index={i}
                  accent={accent}
                  flip={flip}
                />
              </div>

              <div
                className={cn(
                  "flex flex-col justify-center md:col-span-5 md:px-10 md:py-12 lg:px-12",
                  flip ? "md:order-1" : "md:order-2"
                )}
              >
                <p
                  className={cn(
                    "inline-flex w-fit rounded-full border px-3 py-1 text-[11px] font-semibold tracking-wider uppercase",
                    accent.tag
                  )}
                >
                  {project.stat}
                </p>
                <h3 className="mt-5 font-heading text-2xl font-semibold tracking-tight md:text-3xl">
                  {project.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {project.blurb}
                </p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="rounded-lg border-white/15 bg-white/[0.04] px-2.5 py-0.5 text-xs font-normal text-zinc-300"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
