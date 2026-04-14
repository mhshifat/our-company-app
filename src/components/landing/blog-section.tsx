"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { BlogListItem } from "@/lib/blog";
import { BlogCover } from "./blog-cover";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function BlogSection({
  posts,
  eyebrow,
  headline,
  subhead,
  ctaLabel,
  ctaHref,
}: {
  posts: BlogListItem[];
  eyebrow: string;
  headline: string;
  subhead: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  if (posts.length === 0) return null;
  const visible = posts.slice(0, 3);

  return (
    <section
      id="blog"
      className="mx-auto flex max-w-7xl flex-col justify-center px-6 py-28 md:px-10 md:py-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-12% 0px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
      >
        <div>
          <p className="text-sm font-medium tracking-wide text-cyan-300/90 uppercase">
            {eyebrow}
          </p>
          <h2 className="mt-3 max-w-2xl font-heading text-3xl font-semibold tracking-tight md:text-4xl">
            {headline}
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">{subhead}</p>
        </div>
        <Link
          href={ctaHref}
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "h-11 shrink-0 rounded-full border-border/80 bg-background/40 px-6 text-sm backdrop-blur-sm"
          )}
        >
          <Sparkles className="mr-1 size-4" aria-hidden />
          {ctaLabel}
        </Link>
      </motion.div>

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((post, i) => (
          <motion.article
            key={post.slug}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ delay: i * 0.1, duration: 0.65 }}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-card/40 backdrop-blur-sm transition-shadow hover:shadow-lg hover:shadow-violet-500/5"
          >
            <Link
              href={`/blog/${post.slug}`}
              className="flex h-full flex-col outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div className="p-3">
                <BlogCover
                  coverImage={post.coverImage}
                  variant={post.cover}
                  accent={post.accent}
                  alt={post.title}
                />
              </div>
              <div className="flex flex-1 flex-col gap-4 p-6 pt-2">
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span>{formatDate(post.date)}</span>
                  <span aria-hidden>·</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="size-3" aria-hidden />
                    {post.readMinutes} min read
                  </span>
                </div>
                <h3 className="font-heading text-xl font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-violet-200">
                  {post.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 2).map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="rounded-md text-[11px]"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
