import "server-only";

import { getPage, getString, type CmsPage } from "./cms";

export type BlogPageContent = {
  header: { eyebrow: string; headline: string; subhead: string };
  featured: { badge: string; readLabel: string };
  empty: { eyebrow: string; headline: string; body: string };
};

function buildContent(page: CmsPage): BlogPageContent {
  const f = page.fields ?? {};
  const s = (k: string, fb = "") => getString(f, k, fb);

  return {
    header: {
      eyebrow: s("header_eyebrow", "Field notes"),
      headline: s("header_headline", "Essays from the work."),
      subhead: s("header_subhead"),
    },
    featured: {
      badge: s("featured_badge", "Featured"),
      readLabel: s("featured_read_label", "Read"),
    },
    empty: {
      eyebrow: s("empty_eyebrow", "Field notes"),
      headline: s("empty_headline", "Fresh posts landing soon."),
      body: s(
        "empty_body",
        "We're drafting essays from the work. Check back shortly."
      ),
    },
  };
}

export async function getBlogPageContent(): Promise<{
  page: CmsPage | null;
  content: BlogPageContent;
}> {
  const page = await getPage("blog");
  if (!page) {
    return {
      page: null,
      content: buildContent({ slug: "blog", locale: "default", fields: {} }),
    };
  }
  return { page, content: buildContent(page) };
}
