import "server-only";

import { getPage, getString, type CmsPage } from "./cms";

export type NotFoundContent = {
  eyebrow: string;
  headline: string;
  body: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
};

function buildContent(page: CmsPage): NotFoundContent {
  const f = page.fields ?? {};
  const s = (k: string, fb = "") => getString(f, k, fb);

  return {
    eyebrow: s("main_eyebrow", "Lost in the loop"),
    headline: s("main_headline", "This page took a wrong turn."),
    body: s(
      "main_body",
      "The URL you followed doesn't match anything we've shipped."
    ),
    primary: {
      label: s("main_cta_primary_label", "Back home"),
      href: s("main_cta_primary_href", "/"),
    },
    secondary: {
      label: s("main_cta_secondary_label", "Read the blog"),
      href: s("main_cta_secondary_href", "/blog"),
    },
  };
}

export async function getNotFoundContent(): Promise<NotFoundContent> {
  const page = await getPage("not-found");
  if (!page) {
    return buildContent({
      slug: "not-found",
      locale: "default",
      fields: {},
    });
  }
  return buildContent(page);
}
