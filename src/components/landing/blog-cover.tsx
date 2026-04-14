import Image from "next/image";
import { cn } from "@/lib/utils";
import { BlogCoverArt } from "./blog-cover-art";

type Variant = "orbit" | "pulse" | "grid" | "wave" | "stack" | "nodes";
type Accent = "violet" | "cyan" | "emerald" | "amber" | "fuchsia" | "sky";

export function BlogCover({
  coverImage,
  variant,
  accent,
  alt,
  priority,
  className,
}: {
  coverImage?: string | null;
  variant: Variant;
  accent: Accent;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  if (coverImage) {
    return (
      <div
        className={cn(
          "relative aspect-video w-full overflow-hidden rounded-2xl border border-border/50 bg-zinc-950/60",
          className
        )}
      >
        <Image
          src={coverImage}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-zinc-950/50 via-transparent to-transparent" />
      </div>
    );
  }
  return (
    <BlogCoverArt variant={variant} accent={accent} className={className} />
  );
}
