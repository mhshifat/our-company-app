"use client";

export function MeshBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div className="landing-grid-bg absolute inset-0 opacity-40" />
      <svg
        className="absolute -right-24 top-24 h-[420px] w-[420px] text-primary/15"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 8 L180 52 L180 148 L100 192 L20 148 L20 52 Z"
          stroke="currentColor"
          strokeWidth="0.6"
        />
        <path
          d="M100 32 L156 64 L156 136 L100 168 L44 136 L44 64 Z"
          stroke="currentColor"
          strokeWidth="0.5"
          opacity="0.7"
        />
        <circle cx="100" cy="100" r="6" fill="currentColor" opacity="0.35" />
      </svg>
      <svg
        className="absolute bottom-32 -left-16 h-80 w-80 text-muted-foreground/20"
        viewBox="0 0 240 240"
        fill="none"
      >
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.5" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect
          x="20"
          y="20"
          width="200"
          height="200"
          rx="32"
          stroke="url(#g1)"
          strokeWidth="1"
        />
        <path
          d="M60 180 Q120 40 180 120"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeLinecap="round"
          opacity="0.4"
        />
      </svg>
      <div className="landing-mesh-blob absolute -left-32 top-1/4 h-[520px] w-[520px] rounded-full bg-[oklch(0.55_0.22_280_/_0.35)] blur-[100px]" />
      <div className="landing-mesh-blob-delayed absolute -right-20 bottom-1/4 h-[480px] w-[480px] rounded-full bg-[oklch(0.55_0.18_200_/_0.28)] blur-[110px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background" />
    </div>
  );
}
