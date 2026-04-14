import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Clock } from "lucide-react";
import { LandingNav } from "@/components/landing/nav";
import { MeshBackground } from "@/components/landing/mesh-background";
import { BlogCover } from "@/components/landing/blog-cover";
import { Badge } from "@/components/ui/badge";
import { formatPostDate, getPostBySlug, listPosts } from "@/lib/blog";
import { getBlogPostChrome } from "@/lib/blog-post-content";
import { getNavigationContent } from "@/lib/navigation-content";

type Params = { slug: string };

export const dynamicParams = true;
export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const [post, { content: chromeContent }] = await Promise.all([
    getPostBySlug(slug),
    getBlogPostChrome(),
  ]);
  if (!post) return { title: chromeContent.notFoundTitle };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const [post, { items }, { content: chromeContent }, nav] = await Promise.all([
    getPostBySlug(slug),
    listPosts({ page: 1, pageSize: 6 }),
    getBlogPostChrome(),
    getNavigationContent(),
  ]);
  if (!post) notFound();

  const related = items.filter((p) => p.slug !== post.slug).slice(0, 3);
  const { chrome, related: relatedCopy } = chromeContent;

  return (
    <div className="relative min-h-screen text-foreground">
      <MeshBackground />
      <LandingNav nav={nav} />
      <main>
        <article>
          <header className="mx-auto max-w-3xl px-6 pt-28 pb-10 md:px-10 md:pt-32">
            <Link
              href={chrome.backHref}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4" aria-hidden />
              {chrome.backLabel}
            </Link>
            <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span>{formatPostDate(post.date)}</span>
              <span aria-hidden>·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="size-3" aria-hidden />
                {post.readMinutes} {chrome.readSuffix}
              </span>
              <span aria-hidden>·</span>
              <span>
                {post.author.name}
                {post.author.role ? ` — ${post.author.role}` : ""}
              </span>
            </div>
            <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-balance md:text-5xl">
              {post.title}
            </h1>
            {post.excerpt ? (
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>
            ) : null}
            {post.tags.length > 0 ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="rounded-md text-[11px]"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            ) : null}
          </header>

          <div className="mx-auto max-w-4xl px-6 md:px-10">
            <BlogCover
              coverImage={post.coverImage}
              variant={post.cover}
              accent={post.accent}
              alt={post.title}
              priority
            />
          </div>

          <div className="mx-auto mt-14 max-w-3xl px-6 pb-24 md:px-10">
            <div
              className="prose-cms"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          </div>
        </article>

        {related.length > 0 ? (
          <section className="mx-auto max-w-7xl border-t border-border/40 px-6 py-20 md:px-10 md:py-24">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-medium tracking-wide text-cyan-300/90 uppercase">
                  {relatedCopy.eyebrow}
                </p>
                <h2 className="mt-2 font-heading text-2xl font-semibold tracking-tight md:text-3xl">
                  {relatedCopy.headline}
                </h2>
              </div>
              <Link
                href={relatedCopy.allHref}
                className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground md:inline-flex md:items-center md:gap-1"
              >
                {relatedCopy.allLabel}
                <ArrowUpRight className="size-4" aria-hidden />
              </Link>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-card/40 backdrop-blur-sm transition-shadow hover:shadow-lg hover:shadow-violet-500/5"
                >
                  <div className="p-3">
                    <BlogCover
                      coverImage={p.coverImage}
                      variant={p.cover}
                      accent={p.accent}
                      alt={p.title}
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-6 pt-2">
                    <div className="text-xs text-muted-foreground">
                      {formatPostDate(p.date)} · {p.readMinutes} {chrome.readSuffix}
                    </div>
                    <h3 className="font-heading text-lg font-semibold leading-snug tracking-tight transition-colors group-hover:text-violet-200">
                      {p.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {p.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  );
}
