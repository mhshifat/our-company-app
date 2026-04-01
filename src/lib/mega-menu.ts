/** Nested mega-menu: category → links (anchors on the landing page). */

export type MegaMenuLink = {
  label: string;
  href: string;
  description?: string;
};

export type MegaMenuCategory = {
  id: string;
  label: string;
  href?: string;
  items: readonly MegaMenuLink[];
};

export const MEGA_MENU_PRODUCTS: readonly MegaMenuCategory[] = [
  {
    id: "commerce",
    label: "Commerce & Shopify",
    href: "/#commerce",
    items: [
      {
        label: "Merchant OS",
        href: "/#projects",
        description: "Ops for multi-store brands",
      },
      {
        label: "Checkout & extensions",
        href: "/#commerce",
        description: "Custom checkout surfaces",
      },
      {
        label: "Storefront engineering",
        href: "/#platforms",
        description: "Headless & Hydrogen-ready",
      },
    ],
  },
  {
    id: "content",
    label: "Content & CMS",
    href: "/#platforms",
    items: [
      {
        label: "Content Hub",
        href: "/#projects",
        description: "Headless WordPress workflows",
      },
      {
        label: "Editorial & DAM patterns",
        href: "/#stack",
        description: "Structured content APIs",
      },
      {
        label: "Performance & CDN",
        href: "/#stack",
        description: "Edge delivery and caching",
      },
    ],
  },
  {
    id: "mobile",
    label: "Mobile & field",
    href: "/#stack",
    items: [
      {
        label: "Field Sync",
        href: "/#projects",
        description: "Offline-first crews & inventory",
      },
      {
        label: "React Native & Flutter",
        href: "/#stack",
        description: "Cross-platform product builds",
      },
      {
        label: "Native modules",
        href: "/#stack",
        description: "When you need platform depth",
      },
    ],
  },
  {
    id: "desktop",
    label: "Desktop & internal",
    href: "/#stack",
    items: [
      {
        label: "Desk Console",
        href: "/#projects",
        description: "Support & ops tooling",
      },
      {
        label: "Electron & Tauri",
        href: "/#stack",
        description: "Secure cross-platform shells",
      },
    ],
  },
  {
    id: "ai",
    label: "AI products",
    href: "/#ai",
    items: [
      {
        label: "Insight Copilot",
        href: "/#projects",
        description: "RAG with citations",
      },
      {
        label: "Copilots & automations",
        href: "/#ai",
        description: "Workflows on your stack",
      },
    ],
  },
] as const;

export const MEGA_MENU_SERVICES: readonly MegaMenuCategory[] = [
  {
    id: "engineering",
    label: "Product engineering",
    href: "/#stack",
    items: [
      {
        label: "Web applications",
        href: "/#stack",
        description: "Next.js, React, TypeScript",
      },
      {
        label: "Design systems",
        href: "/#stack",
        description: "Tokens, a11y, velocity",
      },
      {
        label: "APIs & integrations",
        href: "/#stack",
        description: "GraphQL, REST, webhooks",
      },
    ],
  },
  {
    id: "commerce-services",
    label: "Commerce services",
    href: "/#commerce",
    items: [
      {
        label: "Shopify Plus & apps",
        href: "/#commerce",
        description: "Admin, storefront, checkout",
      },
      {
        label: "WordPress & Woo",
        href: "/#commerce",
        description: "Custom themes & headless",
      },
      {
        label: "E-commerce strategy",
        href: "/#commerce",
        description: "Launch and migration paths",
      },
    ],
  },
  {
    id: "mobile-services",
    label: "Mobile engineering",
    href: "/#stack",
    items: [
      {
        label: "iOS & Android",
        href: "/#stack",
        description: "Ship to both stores",
      },
      {
        label: "Offline sync",
        href: "/#stack",
        description: "SQLite, conflict resolution",
      },
    ],
  },
  {
    id: "ai-services",
    label: "AI & data",
    href: "/#ai",
    items: [
      {
        label: "RAG & knowledge bases",
        href: "/#ai",
        description: "Docs, tickets, wikis",
      },
      {
        label: "MLOps light",
        href: "/#ai",
        description: "Evals, guardrails, monitoring",
      },
      {
        label: "Advisory",
        href: "/#ai",
        description: "Architecture and roadmaps",
      },
    ],
  },
  {
    id: "platform",
    label: "Platform & delivery",
    href: "/#platforms",
    items: [
      {
        label: "Cloud & CI/CD",
        href: "/#platforms",
        description: "Vercel, AWS, observability",
      },
      {
        label: "Quality & performance",
        href: "/#stack",
        description: "Testing, Core Web Vitals",
      },
      {
        label: "Team augmentation",
        href: "/contact",
        description: "Embed with your squad",
      },
    ],
  },
] as const;

/** Technologies mega menu — links jump to the stack section on the homepage. */
export const MEGA_MENU_TECHNOLOGIES: readonly MegaMenuCategory[] = [
  {
    id: "frontend",
    label: "Frontend & UI",
    href: "/#stack",
    items: [
      { label: "TypeScript", href: "/#stack" },
      { label: "JavaScript", href: "/#stack" },
      { label: "React", href: "/#stack" },
      { label: "Next.js", href: "/#stack" },
      { label: "Vue", href: "/#stack" },
      { label: "Svelte", href: "/#stack" },
      { label: "Tailwind CSS", href: "/#stack" },
    ],
  },
  {
    id: "backend",
    label: "Backend & APIs",
    href: "/#stack",
    items: [
      { label: "Node", href: "/#stack" },
      { label: "NestJS", href: "/#stack" },
      { label: "Python", href: "/#stack" },
      { label: "Django", href: "/#stack" },
      { label: "FastAPI", href: "/#stack" },
      { label: "Go", href: "/#stack" },
      { label: "Rust", href: "/#stack" },
      { label: "Ruby", href: "/#stack" },
      { label: "Rails", href: "/#stack" },
      { label: "PHP", href: "/#stack" },
      { label: "Laravel", href: "/#stack" },
      { label: "GraphQL", href: "/#stack" },
      { label: "REST", href: "/#stack" },
      { label: "tRPC", href: "/#stack" },
    ],
  },
  {
    id: "data",
    label: "Data & search",
    href: "/#stack",
    items: [
      { label: "PostgreSQL", href: "/#stack" },
      { label: "MySQL", href: "/#stack" },
      { label: "MongoDB", href: "/#stack" },
      { label: "Redis", href: "/#stack" },
      { label: "Prisma", href: "/#stack" },
      { label: "Elasticsearch", href: "/#stack" },
    ],
  },
  {
    id: "commerce",
    label: "Commerce & CMS",
    href: "/#stack",
    items: [
      { label: "WordPress", href: "/#stack" },
      { label: "Shopify", href: "/#stack" },
      { label: "WooCommerce", href: "/#stack" },
      { label: "Stripe", href: "/#stack" },
    ],
  },
  {
    id: "cloud",
    label: "Cloud & infrastructure",
    href: "/#stack",
    items: [
      { label: "Docker", href: "/#stack" },
      { label: "Kubernetes", href: "/#stack" },
      { label: "Terraform", href: "/#stack" },
      { label: "AWS", href: "/#stack" },
      { label: "GCP", href: "/#stack" },
      { label: "Azure", href: "/#stack" },
      { label: "Cloudflare", href: "/#stack" },
      { label: "Linux", href: "/#stack" },
      { label: "Nginx", href: "/#stack" },
    ],
  },
  {
    id: "mobile",
    label: "Mobile & desktop",
    href: "/#stack",
    items: [
      { label: "Flutter", href: "/#stack" },
      { label: "React Native", href: "/#stack" },
      { label: "Swift", href: "/#stack" },
      { label: "Kotlin", href: "/#stack" },
      { label: ".NET", href: "/#stack" },
      { label: "Electron", href: "/#stack" },
      { label: "Tauri", href: "/#stack" },
    ],
  },
  {
    id: "messaging",
    label: "Messaging & events",
    href: "/#stack",
    items: [
      { label: "Kafka", href: "/#stack" },
      { label: "RabbitMQ", href: "/#stack" },
    ],
  },
  {
    id: "ai",
    label: "AI & integrations",
    href: "/#stack",
    items: [
      { label: "OpenAI API", href: "/#stack" },
      { label: "LangChain", href: "/#stack" },
    ],
  },
] as const;

export const MEGA_MENU_ABOUT: readonly MegaMenuCategory[] = [
  {
    id: "company",
    label: "Our company",
    href: "/about",
    items: [
      {
        label: "Who we are",
        href: "/about#who-we-are",
        description: "Story, focus, and the teams we serve",
      },
      {
        label: "Mission",
        href: "/about#mission",
        description: "What we optimize for every engagement",
      },
      {
        label: "Values",
        href: "/about#values",
        description: "Principles that guide delivery and partnership",
      },
    ],
  },
  {
    id: "approach",
    label: "How we work",
    href: "/about#approach",
    items: [
      {
        label: "Engagement model",
        href: "/about#approach",
        description: "Embedded squads, fixed phases, clear handoffs",
      },
      {
        label: "Industries",
        href: "/about#industries",
        description: "Commerce, content platforms, ops tools, AI",
      },
      {
        label: "Quality bar",
        href: "/about#approach",
        description: "Code review, observability, and ownership",
      },
    ],
  },
  {
    id: "people",
    label: "People & culture",
    href: "/about#culture",
    items: [
      {
        label: "Culture",
        href: "/about#culture",
        description: "Remote-friendly, documentation-first, low ego",
      },
      {
        label: "Careers",
        href: "/about#careers",
        description: "Open roles and how we hire",
      },
    ],
  },
  {
    id: "connect",
    label: "Connect",
    href: "/about#contact",
    items: [
      {
        label: "Start a project",
        href: "/contact",
        description: "Timelines, stack, and goals",
      },
      {
        label: "About overview",
        href: "/about",
        description: "Read the full page top to bottom",
      },
    ],
  },
] as const;
