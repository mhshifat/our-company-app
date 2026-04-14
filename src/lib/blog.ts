import "server-only";

const COVER_VARIANTS = [
  "orbit",
  "pulse",
  "grid",
  "wave",
  "stack",
  "nodes",
] as const;
const COVER_ACCENTS = [
  "violet",
  "cyan",
  "emerald",
  "amber",
  "fuchsia",
  "sky",
] as const;

export type CoverVariant = (typeof COVER_VARIANTS)[number];
export type CoverAccent = (typeof COVER_ACCENTS)[number];

export type BlogListItem = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readMinutes: number;
  author: { name: string; role?: string };
  tags: string[];
  coverImage?: string | null;
  cover: CoverVariant;
  accent: CoverAccent;
};

export type BlogPost = BlogListItem & {
  /** Rendered HTML from the CMS — render via dangerouslySetInnerHTML. */
  contentHtml: string;
};

export type BlogList = {
  items: BlogListItem[];
  total: number;
};

function env(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

function hash(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h * 31 + input.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

/** Deterministic cover art selection so the same post always looks the same. */
function pickCover(slug: string): { cover: CoverVariant; accent: CoverAccent } {
  const h = hash(slug);
  return {
    cover: COVER_VARIANTS[h % COVER_VARIANTS.length],
    accent: COVER_ACCENTS[(h >> 3) % COVER_ACCENTS.length],
  };
}

/** Strip HTML and clamp to N chars for a best-effort excerpt fallback. */
function stripHtml(html: string, max = 200): string {
  const text = html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= max) return text;
  return text.slice(0, max).replace(/\s+\S*$/, "") + "…";
}

function estimateReadMinutes(html: string): number {
  const words = stripHtml(html, 1_000_000).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

/**
 * Normalize an unknown CMS item into our BlogListItem shape.
 * The Merchant Suite payload may evolve; we try a few common fields and
 * fall back gracefully so missing ones don't break rendering.
 */
function normalizeListItem(raw: Record<string, unknown>): BlogListItem {
  const slug = String(raw.slug ?? raw.id ?? "");
  const title = String(raw.title ?? "Untitled");
  const excerptRaw =
    (raw.excerpt as string | undefined) ??
    (raw.summary as string | undefined) ??
    (typeof raw.content === "string" ? stripHtml(raw.content) : "");
  const dateRaw =
    (raw.publishedAt as string | undefined) ??
    (raw.createdAt as string | undefined) ??
    (raw.date as string | undefined) ??
    new Date().toISOString();
  const authorRaw = raw.author as
    | { name?: string; role?: string; title?: string }
    | string
    | undefined;
  const author =
    typeof authorRaw === "string"
      ? { name: authorRaw }
      : {
          name: authorRaw?.name ?? "bytloop",
          role: authorRaw?.role ?? authorRaw?.title,
        };
  const tags = Array.isArray(raw.tags)
    ? (raw.tags as unknown[]).map((t) =>
        typeof t === "string" ? t : String((t as { name?: string })?.name ?? "")
      ).filter(Boolean)
    : [];
  const readMinutes =
    typeof raw.readMinutes === "number"
      ? raw.readMinutes
      : typeof raw.readingTime === "number"
        ? raw.readingTime
        : typeof raw.content === "string"
          ? estimateReadMinutes(raw.content)
          : 5;

  const { cover, accent } = pickCover(slug);

  return {
    id: String(raw.id ?? slug),
    slug,
    title,
    excerpt: excerptRaw,
    date: dateRaw,
    readMinutes,
    author,
    tags,
    coverImage:
      (raw.coverImage as string | undefined) ??
      (raw.cover as string | undefined) ??
      (raw.image as string | undefined) ??
      null,
    cover,
    accent,
  };
}

type TrpcResponse<T> = { result: { data: { json: T } } };

async function trpcGet<T>(
  procedure: string,
  input: Record<string, unknown>,
  revalidate = 300
): Promise<T> {
  const base = env("MERCHANT_SUITE_URL");
  const apiKey = env("MERCHANT_SUITE_API_KEY");
  const payload = encodeURIComponent(
    JSON.stringify({ json: { apiKey, ...input } })
  );
  const url = `${base}/api/trpc/${procedure}?input=${payload}`;

  const res = await fetch(url, {
    // Cache on the edge; posts refresh every 5 minutes by default.
    next: { revalidate, tags: ["blog"] },
  });

  if (!res.ok) {
    throw new Error(
      `Merchant Suite ${procedure} failed: ${res.status} ${res.statusText}`
    );
  }

  const body = (await res.json()) as TrpcResponse<T>;
  return body.result.data.json;
}

export async function listPosts({
  page = 1,
  pageSize = 20,
}: { page?: number; pageSize?: number } = {}): Promise<BlogList> {
  try {
    const data = await trpcGet<{ items: unknown[]; total: number }>(
      "blog.publicList",
      { page, pageSize }
    );
    return {
      items: (data.items ?? []).map((item) =>
        normalizeListItem(item as Record<string, unknown>)
      ),
      total: data.total ?? 0,
    };
  } catch (err) {
    console.error("[blog] listPosts failed", err);
    return { items: [], total: 0 };
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const raw = await trpcGet<Record<string, unknown>>("blog.publicGetBySlug", {
      slug,
    });
    if (!raw) return null;
    const base = normalizeListItem(raw);
    const contentHtml =
      typeof raw.content === "string"
        ? raw.content
        : typeof raw.contentHtml === "string"
          ? (raw.contentHtml as string)
          : "";
    return { ...base, contentHtml };
  } catch (err) {
    console.error("[blog] getPostBySlug failed", err);
    return null;
  }
}

export function formatPostDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
