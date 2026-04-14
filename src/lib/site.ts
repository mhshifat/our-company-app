export const SITE = {
  name: "bytloop",
  tagline: "Build anything. Ship everywhere.",
  description:
    "WordPress, Shopify, and custom e-commerce—plus web, mobile, and desktop apps. AI solutions and expert consulting for teams that move fast.",
} as const;

/** Public inbox for contact form + mailto links. Set via NEXT_PUBLIC_CONTACT_EMAIL. */
export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@bytloop.com";

export const NAV = [
  { href: "/#projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
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

export const TESTIMONIALS = [
  {
    id: "t1",
    quote:
      "They shipped our Shopify Plus rebuild without drama—clear comms, fast iterations, and production-grade code.",
    name: "Jordan Lee",
    role: "VP Engineering",
    org: "Northline Retail",
  },
  {
    id: "t2",
    quote:
      "Headless WordPress + Next.js finally feels maintainable. Editorial is happy and our Core Web Vitals jumped.",
    name: "Sam Rivera",
    role: "Head of Digital",
    org: "Atlas Media",
  },
  {
    id: "t3",
    quote:
      "The offline-first field app was the hard part. Bytloop nailed sync, conflict handling, and UX for crews on spotty LTE.",
    name: "Priya Nandakumar",
    role: "COO",
    org: "FieldGrid Logistics",
  },
  {
    id: "t4",
    quote:
      "Our RAG copilot went from slide deck to internal pilot in weeks—with citations and guardrails we could actually audit.",
    name: "Marcus Chen",
    role: "CTO",
    org: "LedgerSpring",
  },
  {
    id: "t5",
    quote:
      "Pragmatic architecture reviews, no buzzwords. They helped us hire and onboard two senior engineers with a shared playbook.",
    name: "Elena Vogt",
    role: "Director of Product",
    org: "Cobalt SaaS",
  },
] as const;

export const PROJECTS = [
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
