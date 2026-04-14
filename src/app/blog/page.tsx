import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { LandingNav } from "@/components/landing/nav";
import { MeshBackground } from "@/components/landing/mesh-background";
import { BlogCover } from "@/components/landing/blog-cover";
import { Badge } from "@/components/ui/badge";
import { formatPostDate, listPosts } from "@/lib/blog";
import { getBlogPageContent } from "@/lib/blog-page-content";
import { getNavigationContent } from "@/lib/navigation-content";

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await getBlogPageContent();
  return {
    title: page?.metaTitle ?? page?.title ?? "Blog",
    description: page?.metaDesc,
  };
}

export default async function BlogIndexPage() {
  const [{ items }, { content }, nav] = await Promise.all([
    listPosts({ page: 1, pageSize: 20 }),
    getBlogPageContent(),
    getNavigationContent(),
  ]);
  const { header, featured: featuredCopy, empty } = content;

  if (items.length === 0) {
    return (
      <div className="relative min-h-screen text-foreground">
        <MeshBackground />
        <LandingNav nav={nav} />
        <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center md:px-10">
          <p className="text-sm font-medium tracking-wide text-cyan-300/90 uppercase">
            {empty.eyebrow}
          </p>
          <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight md:text-5xl">
            {empty.headline}
          </h1>
          <p className="mt-6 text-muted-foreground">{empty.body}</p>
        </main>
      </div>
    );
  }

  const [featured, ...rest] = items;

  return (
    <div className="relative min-h-screen text-foreground">
      <MeshBackground />
      <LandingNav nav={nav} />
      <main>
        <header className="mx-auto max-w-7xl px-6 pt-28 pb-14 md:px-10 md:pt-32 md:pb-20">
          <p className="text-sm font-medium tracking-wide text-cyan-300/90 uppercase">
            {header.eyebrow}
          </p>
          <h1 className="mt-3 max-w-3xl font-heading text-4xl font-semibold tracking-tight text-balance md:text-5xl">
            {header.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            {header.subhead}
          </p>
        </header>

        <section className="mx-auto max-w-7xl px-6 md:px-10">
          <Link
            href={`/blog/${featured.slug}`}
            className="group relative grid gap-8 overflow-hidden rounded-3xl border border-border/50 bg-card/40 p-4 backdrop-blur-sm transition-shadow hover:shadow-lg hover:shadow-violet-500/5 md:grid-cols-2 md:p-6"
          >
            <BlogCover
              coverImage={featured.coverImage}
              variant={featured.cover}
              accent={featured.accent}
              alt={featured.title}
              priority
              className="md:aspect-auto md:h-full md:min-h-85"
            />
            <div className="flex flex-col justify-center gap-5 p-2 md:p-6">
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <Badge
                  variant="secondary"
                  className="rounded-full border border-violet-400/30 bg-violet-500/10 px-3 text-[11px] text-violet-200"
                >
                  {featuredCopy.badge}
                </Badge>
                <span>{formatPostDate(featured.date)}</span>
                <span aria-hidden>·</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="size-3" aria-hidden />
                  {featured.readMinutes} min read
                </span>
              </div>
              <h2 className="font-heading text-2xl font-semibold leading-tight tracking-tight md:text-3xl">
                {featured.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {featured.excerpt}
              </p>
              <div className="flex items-center justify-between pt-2">
                <div className="flex flex-wrap gap-1.5">
                  {featured.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="rounded-md text-[11px]"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                  {featuredCopy.readLabel}
                  <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </div>
          </Link>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <article
                key={post.slug}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-card/40 backdrop-blur-sm transition-shadow hover:shadow-lg hover:shadow-cyan-500/5"
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
                      <span>{formatPostDate(post.date)}</span>
                      <span aria-hidden>·</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="size-3" aria-hidden />
                        {post.readMinutes} min read
                      </span>
                    </div>
                    <h3 className="font-heading text-xl font-semibold leading-snug tracking-tight">
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
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
