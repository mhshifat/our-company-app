import "server-only";

import { getList, getPage, getString, type CmsPage } from "./cms";

export type LegalSectionContent =
  | { kind: "paragraphs"; id?: string; title: string; paragraphs: string[] }
  | { kind: "list"; id?: string; title: string; items: string[] };

export type PrivacyContent = {
  header: { eyebrow: string; title: string; lastUpdated: string };
  sections: LegalSectionContent[];
  /** Used to render the closing "Questions: email" link — derived from CMS field. */
  contactEmailHref: string;
};

function buildContent(page: CmsPage): PrivacyContent {
  const f = page.fields ?? {};
  const s = (k: string, fb = "") => getString(f, k, fb);
  const l = (k: string) => getList(f, k);

  const nonEmpty = (arr: string[]) => arr.filter(Boolean);

  const sections: LegalSectionContent[] = [
      {
        kind: "paragraphs",
        id: "overview",
        title: s("overview_title", "Overview"),
        paragraphs: nonEmpty([s("overview_body")]),
      },
      {
        kind: "paragraphs",
        id: "collect",
        title: s("collect_title", "Information we collect"),
        paragraphs: nonEmpty([s("collect_provided"), s("collect_auto")]),
      },
      {
        kind: "list",
        id: "use",
        title: s("use_title", "How we use information"),
        items: l("use_list"),
      },
      {
        kind: "paragraphs",
        id: "cookies",
        title: s("cookies_title", "Cookies and similar technologies"),
        paragraphs: nonEmpty([s("cookies_body")]),
      },
      {
        kind: "paragraphs",
        id: "sharing",
        title: s("sharing_title", "Sharing"),
        paragraphs: nonEmpty([s("sharing_body")]),
      },
      {
        kind: "paragraphs",
        id: "retention",
        title: s("retention_title", "Retention"),
        paragraphs: nonEmpty([s("retention_body")]),
      },
      {
        kind: "paragraphs",
        id: "choices",
        title: s("choices_title", "Your choices"),
        paragraphs: nonEmpty([s("choices_body")]),
      },
      {
        kind: "paragraphs",
        id: "international",
        title: s("international_title", "International visitors"),
        paragraphs: nonEmpty([s("international_body")]),
      },
      {
        kind: "paragraphs",
        id: "children",
        title: s("children_title", "Children"),
        paragraphs: nonEmpty([s("children_body")]),
      },
      {
        kind: "paragraphs",
        id: "changes",
        title: s("changes_title", "Changes"),
        paragraphs: nonEmpty([s("changes_body")]),
      },
      {
        kind: "paragraphs",
        id: "contact",
        title: s("contact_title", "Contact"),
        paragraphs: nonEmpty([s("contact_body")]),
      },
    ];

  const populated = sections.filter((section) =>
    section.kind === "paragraphs"
      ? section.paragraphs.length > 0
      : section.items.length > 0
  );

  return {
    header: {
      eyebrow: s("header_eyebrow", "Legal"),
      title: s("header_title", "Privacy policy"),
      lastUpdated: s("header_last_updated"),
    },
    sections: populated,
    contactEmailHref: s("contact_email_href", "mailto:hello@bytloop.com"),
  };
}

export async function getPrivacyContent(): Promise<{
  page: CmsPage | null;
  content: PrivacyContent;
}> {
  const page = await getPage("privacy");
  if (!page) {
    return {
      page: null,
      content: buildContent({ slug: "privacy", locale: "default", fields: {} }),
    };
  }
  return { page, content: buildContent(page) };
}
