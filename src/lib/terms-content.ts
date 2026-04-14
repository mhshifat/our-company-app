import "server-only";

import { getList, getPage, getString, type CmsPage } from "./cms";

export type TermsSectionContent =
  | { kind: "paragraphs"; id?: string; title: string; paragraphs: string[] }
  | {
      kind: "list";
      id?: string;
      title: string;
      intro?: string;
      items: string[];
    };

export type TermsContent = {
  header: { eyebrow: string; title: string; lastUpdated: string };
  sections: TermsSectionContent[];
};

function buildContent(page: CmsPage): TermsContent {
  const f = page.fields ?? {};
  const s = (k: string, fb = "") => getString(f, k, fb);
  const l = (k: string) => getList(f, k);

  const nonEmpty = (arr: string[]) => arr.filter(Boolean);

  const sections: TermsSectionContent[] = [
    {
      kind: "paragraphs",
      id: "agreement",
      title: s("agreement_title", "Agreement"),
      paragraphs: nonEmpty([s("agreement_body")]),
    },
    {
      kind: "paragraphs",
      id: "site",
      title: s("site_title", "The site"),
      paragraphs: nonEmpty([s("site_body")]),
    },
    {
      kind: "list",
      id: "acceptable-use",
      title: s("acceptable_use_title", "Acceptable use"),
      intro: s("acceptable_use_intro") || undefined,
      items: l("acceptable_use_list"),
    },
    {
      kind: "paragraphs",
      id: "ip",
      title: s("ip_title", "Intellectual property"),
      paragraphs: nonEmpty([s("ip_body")]),
    },
    {
      kind: "paragraphs",
      id: "third-party",
      title: s("third_party_title", "Third-party links"),
      paragraphs: nonEmpty([s("third_party_body")]),
    },
    {
      kind: "paragraphs",
      id: "disclaimer",
      title: s("disclaimer_title", "Disclaimer"),
      paragraphs: nonEmpty([s("disclaimer_body")]),
    },
    {
      kind: "paragraphs",
      id: "liability",
      title: s("liability_title", "Limitation of liability"),
      paragraphs: nonEmpty([s("liability_body")]),
    },
    {
      kind: "paragraphs",
      id: "indemnity",
      title: s("indemnity_title", "Indemnity"),
      paragraphs: nonEmpty([s("indemnity_body")]),
    },
    {
      kind: "paragraphs",
      id: "governing-law",
      title: s("governing_law_title", "Governing law"),
      paragraphs: nonEmpty([s("governing_law_body")]),
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
      title: s("header_title", "Terms of use"),
      lastUpdated: s("header_last_updated"),
    },
    sections: populated,
  };
}

export async function getTermsContent(): Promise<{
  page: CmsPage | null;
  content: TermsContent;
}> {
  const page = await getPage("terms");
  if (!page) {
    return {
      page: null,
      content: buildContent({ slug: "terms", locale: "default", fields: {} }),
    };
  }
  return { page, content: buildContent(page) };
}
