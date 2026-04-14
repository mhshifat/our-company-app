import "server-only";

import {
  buildIndexedRows,
  getList,
  getPage,
  getString,
  type CmsPage,
} from "./cms";

export type Cta = { label: string; href: string };
export type CardItem = { title: string; desc: string };
export type ProjectItem = {
  title: string;
  blurb: string;
  stat: string;
  tags: string[];
  /** Optional live site / embed target — when present, card becomes a link and shows an iframe preview. */
  url: string;
  /** Accent key used by ProjectsShowcase for color tokens. */
  accent: "violet" | "cyan" | "emerald" | "amber" | "fuchsia";
};
export type TestimonialItem = {
  id: string;
  quote: string;
  name: string;
  role: string;
  org: string;
};

export type HomeContent = {
  site: {
    name: string;
    tagline: string;
    description: string;
    contactEmail: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    subhead: string;
    primaryCta: Cta;
    secondaryCta: Cta;
    chips: string[];
    visualCaption: string;
    visualLoading: string;
    floatingSkills: string[];
  };
  commerce: {
    eyebrow: string;
    headline: string;
    subhead: string;
    cards: CardItem[];
  };
  platforms: {
    eyebrow: string;
    headline: string;
    cards: CardItem[];
  };
  stack: {
    eyebrow: string;
    headline: string;
    subhead: string;
    techList: string[];
  };
  ai: {
    eyebrow: string;
    headline: string;
    subhead: string;
    bullets: string[];
    card: {
      title: string;
      meta: string;
      desc: string;
      tags: string[];
    };
  };
  testimonials: {
    eyebrow: string;
    headline: string;
    subhead: string;
    items: TestimonialItem[];
  };
  blogTeaser: {
    eyebrow: string;
    headline: string;
    subhead: string;
    cta: Cta;
  };
  projects: {
    eyebrow: string;
    headline: string;
    subhead: string;
    items: ProjectItem[];
  };
  contactCta: {
    headline: string;
    subhead: string;
    primary: Cta;
    emailLabel: string;
    emailHref: string;
    backLabel: string;
    backHref: string;
  };
  footer: {
    copyright: string;
    privacyLabel: string;
    privacyHref: string;
    termsLabel: string;
    termsHref: string;
  };
};

const PROJECT_ACCENTS: ProjectItem["accent"][] = [
  "violet",
  "cyan",
  "emerald",
  "amber",
  "fuchsia",
];

function buildContent(page: CmsPage): HomeContent {
  const f = page.fields ?? {};
  const s = (k: string, fb = "") => getString(f, k, fb);
  const l = (k: string, fb: string[] = []) => getList(f, k, fb);

  const cards = (prefix: string): CardItem[] =>
    buildIndexedRows<CardItem>(
      f,
      `${prefix}_card`,
      {
        title: { suffix: "title", type: "string" },
        desc: { suffix: "desc", type: "string" },
      },
      10
    );

  const testimonials: TestimonialItem[] = buildIndexedRows<{
    quote: string;
    name: string;
    role: string;
    org: string;
  }>(
    f,
    "testimonial",
    {
      quote: { suffix: "quote", type: "string" },
      name: { suffix: "name", type: "string" },
      role: { suffix: "role", type: "string" },
      org: { suffix: "org", type: "string" },
    },
    20
  ).map((row, i) => ({ id: `t${i + 1}`, ...row }));

  const projects: ProjectItem[] = buildIndexedRows<{
    title: string;
    blurb: string;
    stat: string;
    tags: string[];
    url: string;
  }>(
    f,
    "project",
    {
      title: { suffix: "title", type: "string" },
      blurb: { suffix: "blurb", type: "string" },
      stat: { suffix: "stat", type: "string" },
      tags: { suffix: "tags", type: "list" },
      url: { suffix: "url", type: "string" },
    },
    20
  ).map((row, i) => ({
    ...row,
    accent: PROJECT_ACCENTS[i % PROJECT_ACCENTS.length],
  }));

  return {
    site: {
      name: s("site_name", "bytloop"),
      tagline: s("site_tagline"),
      description: s("site_description"),
      contactEmail: s("contact_email", "hello@bytloop.com"),
    },
    hero: {
      eyebrow: s("hero_eyebrow"),
      headline: s("hero_headline"),
      subhead: s("hero_subhead"),
      primaryCta: {
        label: s("hero_cta_primary_label"),
        href: s("hero_cta_primary_href", "/contact"),
      },
      secondaryCta: {
        label: s("hero_cta_secondary_label"),
        href: s("hero_cta_secondary_href", "/#projects"),
      },
      chips: l("hero_chips"),
      visualCaption: s("hero_visual_caption"),
      visualLoading: s("hero_visual_loading", "Loading universe…"),
      floatingSkills: l("hero_floating_skills"),
    },
    commerce: {
      eyebrow: s("commerce_eyebrow"),
      headline: s("commerce_headline"),
      subhead: s("commerce_subhead"),
      cards: cards("commerce"),
    },
    platforms: {
      eyebrow: s("platforms_eyebrow"),
      headline: s("platforms_headline"),
      cards: cards("platforms"),
    },
    stack: {
      eyebrow: s("stack_eyebrow"),
      headline: s("stack_headline"),
      subhead: s("stack_subhead"),
      techList: l("stack_tech_list"),
    },
    ai: {
      eyebrow: s("ai_eyebrow"),
      headline: s("ai_headline"),
      subhead: s("ai_subhead"),
      bullets: l("ai_bullets"),
      card: {
        title: s("ai_card_title"),
        meta: s("ai_card_meta"),
        desc: s("ai_card_desc"),
        tags: l("ai_card_tags"),
      },
    },
    testimonials: {
      eyebrow: s("testimonials_eyebrow", "Testimonials"),
      headline: s("testimonials_headline"),
      subhead: s("testimonials_subhead"),
      items: testimonials,
    },
    blogTeaser: {
      eyebrow: s("blog_teaser_eyebrow"),
      headline: s("blog_teaser_headline"),
      subhead: s("blog_teaser_subhead"),
      cta: {
        label: s("blog_teaser_cta_label", "Browse all posts"),
        href: s("blog_teaser_cta_href", "/blog"),
      },
    },
    projects: {
      eyebrow: s("projects_eyebrow"),
      headline: s("projects_headline"),
      subhead: s("projects_subhead"),
      items: projects,
    },
    contactCta: {
      headline: s("contact_cta_headline"),
      subhead: s("contact_cta_subhead"),
      primary: {
        label: s("contact_cta_primary_label", "Contact form"),
        href: s("contact_cta_primary_href", "/contact"),
      },
      emailLabel: s("contact_cta_email_label", "hello@bytloop.com"),
      emailHref: s("contact_cta_email_href", "mailto:hello@bytloop.com"),
      backLabel: s("contact_cta_back_label", "Back to top"),
      backHref: s("contact_cta_back_href", "#hero"),
    },
    footer: {
      copyright: s("footer_copyright"),
      privacyLabel: s("footer_privacy_label", "Privacy"),
      privacyHref: s("footer_privacy_href", "/privacy"),
      termsLabel: s("footer_terms_label", "Terms"),
      termsHref: s("footer_terms_href", "/terms"),
    },
  };
}

export async function getHomeContent(): Promise<{
  page: CmsPage | null;
  content: HomeContent;
}> {
  const page = await getPage("home");
  if (!page) {
    return { page: null, content: emptyContent() };
  }
  return { page, content: buildContent(page) };
}

function emptyContent(): HomeContent {
  return buildContent({
    slug: "home",
    locale: "default",
    fields: {},
  });
}
