import "server-only";

import { getList, getPage, getString, type CmsPage } from "./cms";

export type Cta = { label: string; href: string };

export type AboutContent = {
  header: { eyebrow: string; headline: string; subhead: string };
  sections: Array<
    | {
        kind: "paragraphs";
        id: string;
        eyebrow: string;
        title: string;
        paragraphs: string[];
      }
    | {
        kind: "list";
        id: string;
        eyebrow: string;
        title: string;
        items: string[];
      }
    | {
        kind: "careers";
        id: string;
        eyebrow: string;
        title: string;
        body: string;
        emailLabel: string;
        emailHref: string;
      }
  >;
  contactCta: {
    eyebrow: string;
    headline: string;
    subhead: string;
    primary: Cta;
    secondary: Cta;
  };
  footer: {
    homeLabel: string;
    homeHref: string;
    copyright: string;
  };
};

function buildContent(page: CmsPage): AboutContent {
  const f = page.fields ?? {};
  const s = (k: string, fb = "") => getString(f, k, fb);
  const l = (k: string, fb: string[] = []) => getList(f, k, fb);

  return {
    header: {
      eyebrow: s("header_eyebrow"),
      headline: s("header_headline"),
      subhead: s("header_subhead"),
    },
    sections: [
      {
        kind: "paragraphs",
        id: "who-we-are",
        eyebrow: s("who_eyebrow"),
        title: s("who_title"),
        paragraphs: [s("who_p1"), s("who_p2")].filter(Boolean),
      },
      {
        kind: "paragraphs",
        id: "mission",
        eyebrow: s("mission_eyebrow"),
        title: s("mission_title"),
        paragraphs: [s("mission_body")].filter(Boolean),
      },
      {
        kind: "list",
        id: "values",
        eyebrow: s("values_eyebrow"),
        title: s("values_title"),
        items: l("values_list"),
      },
      {
        kind: "paragraphs",
        id: "approach",
        eyebrow: s("approach_eyebrow"),
        title: s("approach_title"),
        paragraphs: [s("approach_p1"), s("approach_p2")].filter(Boolean),
      },
      {
        kind: "paragraphs",
        id: "industries",
        eyebrow: s("industries_eyebrow"),
        title: s("industries_title"),
        paragraphs: [s("industries_body")].filter(Boolean),
      },
      {
        kind: "paragraphs",
        id: "culture",
        eyebrow: s("culture_eyebrow"),
        title: s("culture_title"),
        paragraphs: [s("culture_body")].filter(Boolean),
      },
      {
        kind: "careers",
        id: "careers",
        eyebrow: s("careers_eyebrow"),
        title: s("careers_title"),
        body: s("careers_body"),
        emailLabel: s("careers_email_label", "hello@bytloop.com"),
        emailHref: s("careers_email_href", "mailto:hello@bytloop.com"),
      },
    ],
    contactCta: {
      eyebrow: s("contact_cta_eyebrow"),
      headline: s("contact_cta_headline"),
      subhead: s("contact_cta_subhead"),
      primary: {
        label: s("contact_cta_primary_label", "Contact us"),
        href: s("contact_cta_primary_href", "/contact"),
      },
      secondary: {
        label: s("contact_cta_secondary_label", "Back to home"),
        href: s("contact_cta_secondary_href", "/"),
      },
    },
    footer: {
      homeLabel: s("footer_home_label", "Home"),
      homeHref: s("footer_home_href", "/"),
      copyright: s("footer_copyright"),
    },
  };
}

export async function getAboutContent(): Promise<{
  page: CmsPage | null;
  content: AboutContent;
}> {
  const page = await getPage("about");
  if (!page) {
    return {
      page: null,
      content: buildContent({ slug: "about", locale: "default", fields: {} }),
    };
  }
  return { page, content: buildContent(page) };
}
