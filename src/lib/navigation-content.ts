import "server-only";

import { getList, getPage, getString, type CmsPage } from "./cms";

export type NavLink = { label: string; href: string };

export type NavCategoryItem = {
  label: string;
  href: string;
  description?: string;
};

export type NavCategory = {
  id: string;
  label: string;
  href?: string;
  items: NavCategoryItem[];
};

export type NavMegaMenu = {
  title: string;
  subtitle: string;
  artLabel: string;
  categories: NavCategory[];
};

export type NavContent = {
  primary: {
    products: string;
    services: string;
    technologies: string;
    about: string;
    projects: NavLink;
    blog: NavLink;
    contact: NavLink;
    cta: NavLink;
  };
  megaMenus: {
    products: NavMegaMenu;
    services: NavMegaMenu;
    technologies: NavMegaMenu;
    about: NavMegaMenu;
  };
};

type MegaSpec = {
  prefix: string;
  titleKey: string;
  subtitleKey: string;
  artKey: string;
  /** Categories use a per-item walk (label/href/desc). */
  itemsHaveDescriptions: boolean;
};

function walkMegaMenu(
  f: Record<string, unknown>,
  spec: MegaSpec
): NavMegaMenu {
  const s = (k: string, fb = "") => getString(f, k, fb);
  const l = (k: string) => getList(f, k);

  const categories: NavCategory[] = [];
  for (let c = 1; c <= 20; c++) {
    const catLabel = s(`${spec.prefix}_cat_${c}_label`);
    if (!catLabel) break;
    const catHref = s(`${spec.prefix}_cat_${c}_href`);

    const items: NavCategoryItem[] = [];
    if (spec.itemsHaveDescriptions) {
      for (let i = 1; i <= 20; i++) {
        const label = s(`${spec.prefix}_cat_${c}_item_${i}_label`);
        if (!label) break;
        items.push({
          label,
          href: s(`${spec.prefix}_cat_${c}_item_${i}_href`),
          description: s(`${spec.prefix}_cat_${c}_item_${i}_desc`) || undefined,
        });
      }
    } else {
      // Technologies: items are stored as a `${prefix}_cat_${c}_items` list,
      // each entry is a bare label with no href/description.
      const list = l(`${spec.prefix}_cat_${c}_items`);
      for (const label of list) {
        items.push({ label, href: catHref });
      }
    }

    categories.push({
      id: `${spec.prefix}-${c}`,
      label: catLabel,
      href: catHref || undefined,
      items,
    });
  }

  return {
    title: s(spec.titleKey),
    subtitle: s(spec.subtitleKey),
    artLabel: s(spec.artKey),
    categories,
  };
}

function buildContent(page: CmsPage): NavContent {
  const f = page.fields ?? {};
  const s = (k: string, fb = "") => getString(f, k, fb);

  return {
    primary: {
      products: s("primary_products_label", "Products"),
      services: s("primary_services_label", "Services"),
      technologies: s("primary_technologies_label", "Technologies"),
      about: s("primary_about_label", "About us"),
      projects: {
        label: s("primary_projects_label", "Projects"),
        href: s("primary_projects_href", "/#projects"),
      },
      blog: {
        label: s("primary_blog_label", "Blog"),
        href: s("primary_blog_href", "/blog"),
      },
      contact: {
        label: s("primary_contact_label", "Contact"),
        href: s("primary_contact_href", "/contact"),
      },
      cta: {
        label: s("primary_cta_label", "Let's talk"),
        href: s("primary_cta_href", "/contact"),
      },
    },
    megaMenus: {
      products: walkMegaMenu(f, {
        prefix: "products",
        titleKey: "products_menu_title",
        subtitleKey: "products_menu_subtitle",
        artKey: "products_menu_art_label",
        itemsHaveDescriptions: true,
      }),
      services: walkMegaMenu(f, {
        prefix: "services",
        titleKey: "services_menu_title",
        subtitleKey: "services_menu_subtitle",
        artKey: "services_menu_art_label",
        itemsHaveDescriptions: true,
      }),
      technologies: walkMegaMenu(f, {
        prefix: "tech",
        titleKey: "technologies_menu_title",
        subtitleKey: "technologies_menu_subtitle",
        artKey: "technologies_menu_art_label",
        itemsHaveDescriptions: false,
      }),
      about: walkMegaMenu(f, {
        prefix: "about",
        titleKey: "about_menu_title",
        subtitleKey: "about_menu_subtitle",
        artKey: "about_menu_art_label",
        itemsHaveDescriptions: true,
      }),
    },
  };
}

export async function getNavigationContent(): Promise<NavContent> {
  const page = await getPage("navigation");
  if (!page) {
    return buildContent({
      slug: "navigation",
      locale: "default",
      fields: {},
    });
  }
  return buildContent(page);
}
