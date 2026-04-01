import { cn } from "@/lib/utils";
import { SITE } from "@/lib/site";

type LogoProps = {
  className?: string;
  /** Full wordmark next to mark (default) or icon only */
  variant?: "full" | "mark";
};

/**
 * Brand mark: hub node + orbit ring + satellites — connections + global shipping.
 * Palette matches the landing (cyan → violet).
 */
export function Logo({ className, variant = "full" }: LogoProps) {
  const gradId = "logo-grad-nexus";
  const glowId = "logo-glow-nexus";

  const mark = (
    <svg
      viewBox="0 0 40 40"
      className={cn("shrink-0", variant === "full" ? "size-9 md:size-10" : "size-8")}
      aria-hidden
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="55%" stopColor="#67e8f9" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
        <filter id={glowId} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="0.8" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect
        x="1.5"
        y="1.5"
        width="37"
        height="37"
        rx="11"
        fill="oklch(0.12 0.02 280)"
        stroke={`url(#${gradId})`}
        strokeWidth="1.75"
      />
      {/* Orbit */}
      <ellipse
        cx="20"
        cy="20"
        rx="12.5"
        ry="6.5"
        fill="none"
        stroke={`url(#${gradId})`}
        strokeWidth="1.25"
        opacity={0.45}
        transform="rotate(-18 20 20)"
      />
      {/* Satellite nodes */}
      <circle cx="11" cy="16" r="2.2" fill={`url(#${gradId})`} opacity={0.9} />
      <circle cx="29" cy="17" r="2.2" fill={`url(#${gradId})`} opacity={0.9} />
      <circle cx="20" cy="29" r="2.2" fill={`url(#${gradId})`} opacity={0.75} />
      {/* Central nexus */}
      <circle
        cx="20"
        cy="18"
        r="4.25"
        fill={`url(#${gradId})`}
        filter={`url(#${glowId})`}
      />
      <circle cx="20" cy="18" r="2" fill="oklch(0.98 0 0)" opacity={0.95} />
    </svg>
  );

  if (variant === "mark") {
    return (
      <span className={cn("inline-flex", className)} aria-hidden>
        {mark}
      </span>
    );
  }

  return (
    <span
      className={cn("inline-flex items-center gap-2.5 md:gap-3", className)}
    >
      {mark}
      <span className="font-heading text-lg font-semibold tracking-tight text-foreground md:text-xl">
        {SITE.name}
      </span>
    </span>
  );
}
