export const SITE = {
  name: "Nexus Foundry",
  tagline: "Build anything. Ship everywhere.",
  description:
    "WordPress, Shopify, and custom e-commerce—plus web, mobile, and desktop apps. AI solutions and expert consulting for teams that move fast.",
} as const;

export const NAV = [
  { href: "#commerce", label: "Commerce" },
  { href: "#platforms", label: "Platforms" },
  { href: "#stack", label: "Stack" },
  { href: "#ai", label: "AI & advisory" },
  { href: "#products", label: "Products" },
  { href: "#contact", label: "Contact" },
] as const;

/** Hero column: concise skills shown next to the globe */
export const HERO_SKILLS = [
  {
    label: "WordPress & headless CMS",
    key: "wordpress",
  },
  {
    label: "Shopify, checkout & custom commerce",
    key: "shopify",
  },
  {
    label: "Next.js, React & TypeScript",
    key: "web",
  },
  {
    label: "Mobile: React Native, Flutter, native",
    key: "mobile",
  },
  {
    label: "Desktop: Electron, Tauri, .NET",
    key: "desktop",
  },
  {
    label: "AI: RAG, copilots & integrations",
    key: "ai",
  },
] as const;

export const PRODUCTS = [
  {
    title: "Merchant OS",
    blurb: "Unified ops dashboard for multi-store Shopify brands.",
    tags: ["Shopify", "Next.js", "Analytics"],
    accent: "violet",
    stat: "Ops in one surface",
  },
  {
    title: "Content Hub",
    blurb: "Headless WordPress with editorial workflows your team will love.",
    tags: ["WordPress", "GraphQL", "CDN"],
    accent: "cyan",
    stat: "Editorial velocity",
  },
  {
    title: "Field Sync",
    blurb: "Offline-first mobile for distributed teams and inventory.",
    tags: ["React Native", "SQLite", "Sync"],
    accent: "emerald",
    stat: "Works offline",
  },
  {
    title: "Desk Console",
    blurb: "Cross-platform desktop tooling for support and internal apps.",
    tags: ["Electron", "Tauri", "Secure IPC"],
    accent: "amber",
    stat: "Secure by design",
  },
  {
    title: "Insight Copilot",
    blurb: "RAG over your docs and tickets—answers with citations.",
    tags: ["LLM", "Vector DB", "API"],
    accent: "fuchsia",
    stat: "Answers you can trust",
  },
] as const;
