import "server-only";

import { getPage, getString, type CmsPage } from "./cms";

export type BlogPostChrome = {
  chrome: {
    backLabel: string;
    backHref: string;
    readSuffix: string;
  };
  related: {
    eyebrow: string;
    headline: string;
    allLabel: string;
    allHref: string;
  };
  notFoundTitle: string;
};

function buildContent(page: CmsPage): BlogPostChrome {
  const f = page.fields ?? {};
  const s = (k: string, fb = "") => getString(f, k, fb);

  return {
    chrome: {
      backLabel: s("chrome_back_label", "All posts"),
      backHref: s("chrome_back_href", "/blog"),
      readSuffix: s("chrome_read_suffix", "min read"),
    },
    related: {
      eyebrow: s("related_eyebrow", "Keep reading"),
      headline: s("related_headline", "More from the field notes"),
      allLabel: s("related_all_label", "All posts"),
      allHref: s("related_all_href", "/blog"),
    },
    notFoundTitle: s("not_found_title", "Post not found"),
  };
}

export async function getBlogPostChrome(): Promise<{
  page: CmsPage | null;
  content: BlogPostChrome;
}> {
  const page = await getPage("blog-post");
  if (!page) {
    return {
      page: null,
      content: buildContent({
        slug: "blog-post",
        locale: "default",
        fields: {},
      }),
    };
  }
  return { page, content: buildContent(page) };
}
