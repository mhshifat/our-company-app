import Image from "next/image";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/site";

type LogoProps = {
  className?: string;
  /** Full wordmark next to mark (default) or icon only */
  variant?: "full" | "mark";
};

export function Logo({ className, variant = "full" }: LogoProps) {
  const mark = (
    <Image
      src="/logo.svg"
      alt={`${SITE.name} logo`}
      width={40}
      height={40}
      priority
      className={cn("shrink-0", variant === "full" ? "size-9 md:size-10" : "size-8")}
    />
  );

  if (variant === "mark") {
    return (
      <span className={cn("inline-flex", className)} aria-hidden>
        {mark}
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-2.5 md:gap-3", className)}>
      {mark}
      <span className="font-heading text-lg font-semibold tracking-tight text-foreground md:text-xl">
        {SITE.name}
      </span>
    </span>
  );
}
