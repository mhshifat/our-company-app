"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "orbit" | "pulse" | "grid" | "wave" | "stack" | "nodes";
type Accent = "violet" | "cyan" | "emerald" | "amber" | "fuchsia" | "sky";

const ACCENT_STOPS: Record<Accent, { from: string; to: string; glow: string }> =
  {
    violet: { from: "#a78bfa", to: "#7c3aed", glow: "rgba(139,92,246,0.35)" },
    cyan: { from: "#67e8f9", to: "#0891b2", glow: "rgba(34,211,238,0.35)" },
    emerald: { from: "#6ee7b7", to: "#059669", glow: "rgba(16,185,129,0.35)" },
    amber: { from: "#fcd34d", to: "#d97706", glow: "rgba(245,158,11,0.35)" },
    fuchsia: { from: "#f0abfc", to: "#c026d3", glow: "rgba(217,70,239,0.35)" },
    sky: { from: "#7dd3fc", to: "#0369a1", glow: "rgba(56,189,248,0.35)" },
  };

export function BlogCoverArt({
  variant,
  accent,
  className,
}: {
  variant: Variant;
  accent: Accent;
  className?: string;
}) {
  const { from, to, glow } = ACCENT_STOPS[accent];
  const gradId = `g-${variant}-${accent}`;

  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden rounded-2xl border border-border/50 bg-zinc-950/60",
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 30% 20%, ${glow}, transparent 60%)`,
        }}
      />
      <svg
        viewBox="0 0 400 225"
        className="relative h-full w-full"
        role="img"
        aria-hidden
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={from} stopOpacity="0.95" />
            <stop offset="100%" stopColor={to} stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id={`${gradId}-soft`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={from} stopOpacity="0.25" />
            <stop offset="100%" stopColor={to} stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {variant === "orbit" && <OrbitArt grad={gradId} />}
        {variant === "pulse" && <PulseArt grad={gradId} />}
        {variant === "grid" && <GridArt grad={gradId} />}
        {variant === "wave" && <WaveArt grad={gradId} />}
        {variant === "stack" && <StackArt grad={gradId} />}
        {variant === "nodes" && <NodesArt grad={gradId} />}
      </svg>
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-zinc-950/50 via-transparent to-transparent" />
    </div>
  );
}

function OrbitArt({ grad }: { grad: string }) {
  return (
    <g>
      <motion.g
        style={{ transformOrigin: "200px 112px" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        <ellipse
          cx="200"
          cy="112"
          rx="150"
          ry="54"
          fill="none"
          stroke={`url(#${grad})`}
          strokeOpacity="0.55"
          strokeWidth="1.2"
        />
        <circle cx="350" cy="112" r="4" fill={`url(#${grad})`} />
      </motion.g>
      <motion.g
        style={{ transformOrigin: "200px 112px" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <ellipse
          cx="200"
          cy="112"
          rx="110"
          ry="78"
          fill="none"
          stroke={`url(#${grad})`}
          strokeOpacity="0.4"
          strokeWidth="1"
        />
        <circle cx="90" cy="112" r="3" fill={`url(#${grad})`} />
      </motion.g>
      <motion.circle
        cx="200"
        cy="112"
        r="18"
        fill={`url(#${grad})`}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "200px 112px" }}
      />
      <circle cx="200" cy="112" r="28" fill={`url(#${grad})`} opacity="0.15" />
    </g>
  );
}

function PulseArt({ grad }: { grad: string }) {
  return (
    <g>
      {[0, 1, 2, 3].map((i) => (
        <motion.circle
          key={i}
          cx="200"
          cy="112"
          r="20"
          fill="none"
          stroke={`url(#${grad})`}
          strokeWidth="1.3"
          initial={{ opacity: 0.9, scale: 0.6 }}
          animate={{ opacity: 0, scale: 4.2 }}
          transition={{
            duration: 3.6,
            repeat: Infinity,
            ease: "easeOut",
            delay: i * 0.9,
          }}
          style={{ transformOrigin: "200px 112px" }}
        />
      ))}
      <circle cx="200" cy="112" r="14" fill={`url(#${grad})`} />
      <circle cx="200" cy="112" r="22" fill={`url(#${grad})`} opacity="0.2" />
    </g>
  );
}

function GridArt({ grad }: { grad: string }) {
  const cols = 14;
  const rows = 8;
  const gap = 26;
  const offsetX = (400 - (cols - 1) * gap) / 2;
  const offsetY = (225 - (rows - 1) * gap) / 2;
  return (
    <g>
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((__, c) => {
          const i = r * cols + c;
          const cx = offsetX + c * gap;
          const cy = offsetY + r * gap;
          return (
            <motion.circle
              key={i}
              cx={cx}
              cy={cy}
              r="1.6"
              fill={`url(#${grad})`}
              animate={{ opacity: [0.15, 0.9, 0.15] }}
              transition={{
                duration: 3.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: (c + r) * 0.08,
              }}
            />
          );
        })
      )}
    </g>
  );
}

function WaveArt({ grad }: { grad: string }) {
  return (
    <g>
      {[0, 1, 2].map((i) => (
        <motion.path
          key={i}
          d="M 0 130 Q 80 90 160 130 T 320 130 T 480 130"
          fill="none"
          stroke={`url(#${grad})`}
          strokeOpacity={0.7 - i * 0.2}
          strokeWidth={1.5 - i * 0.3}
          animate={{ x: [-80, 0] }}
          transition={{
            duration: 6 + i * 1.4,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ transform: `translateY(${i * 18}px)` }}
        />
      ))}
      <motion.circle
        cx="200"
        cy="112"
        r="6"
        fill={`url(#${grad})`}
        animate={{ cy: [104, 120, 104] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />
    </g>
  );
}

function StackArt({ grad }: { grad: string }) {
  return (
    <g>
      {[0, 1, 2, 3].map((i) => (
        <motion.rect
          key={i}
          x={110 + i * 10}
          y={60 + i * 14}
          width="180"
          height="22"
          rx="6"
          fill={`url(#${grad})`}
          opacity={0.85 - i * 0.18}
          animate={{ x: [110 + i * 10, 120 + i * 10, 110 + i * 10] }}
          transition={{
            duration: 4.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.25,
          }}
        />
      ))}
    </g>
  );
}

function NodesArt({ grad }: { grad: string }) {
  const nodes = [
    { x: 80, y: 60 },
    { x: 320, y: 70 },
    { x: 200, y: 112 },
    { x: 110, y: 170 },
    { x: 300, y: 165 },
    { x: 60, y: 120 },
    { x: 340, y: 130 },
  ];
  const edges: [number, number][] = [
    [2, 0],
    [2, 1],
    [2, 3],
    [2, 4],
    [2, 5],
    [2, 6],
    [0, 5],
    [1, 6],
    [3, 4],
  ];
  return (
    <g>
      {edges.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke={`url(#${grad})`}
          strokeOpacity="0.45"
          strokeWidth="1"
          animate={{ strokeOpacity: [0.2, 0.75, 0.2] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        />
      ))}
      {nodes.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={i === 2 ? 8 : 4}
          fill={`url(#${grad})`}
          animate={{ scale: [1, 1.25, 1] }}
          transition={{
            duration: 2.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.18,
          }}
          style={{ transformOrigin: `${n.x}px ${n.y}px` }}
        />
      ))}
    </g>
  );
}
