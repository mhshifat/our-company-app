"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Brain,
  Globe,
  Layers,
  Monitor,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Store,
  LayoutTemplate,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CONTACT_EMAIL, SITE } from "@/lib/site";
import { HeroVisual } from "./hero-visual";
import { ProjectsShowcase } from "./projects-showcase";
import { TestimonialsMarquee } from "./testimonials-marquee";
import { LandingNav } from "./nav";
import { MeshBackground } from "./mesh-background";
import { BlogSection } from "./blog-section";
import type { BlogListItem } from "@/lib/blog";

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

function SectionShell({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-28 md:px-10 md:py-32",
        className
      )}
    >
      {children}
    </motion.section>
  );
}

const TECH = [
  "TypeScript",
  "JavaScript",
  "React",
  "Next.js",
  "Vue",
  "Svelte",
  "Node",
  "NestJS",
  "Python",
  "Django",
  "FastAPI",
  "Go",
  "Rust",
  "Ruby",
  "Rails",
  "PHP",
  "Laravel",
  "WordPress",
  "Shopify",
  "WooCommerce",
  "GraphQL",
  "REST",
  "tRPC",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Redis",
  "Prisma",
  "Elasticsearch",
  "Docker",
  "Kubernetes",
  "Terraform",
  "AWS",
  "GCP",
  "Azure",
  "Cloudflare",
  "Linux",
  "Nginx",
  "Kafka",
  "RabbitMQ",
  "Flutter",
  "React Native",
  "Swift",
  "Kotlin",
  ".NET",
  "Electron",
  "Tauri",
  "Tailwind CSS",
  "Stripe",
  "OpenAI API",
  "LangChain",
];

export function LandingPage({ blogPosts }: { blogPosts: BlogListItem[] }) {
  return (
    <div className="relative text-foreground">
      <MeshBackground />
      <LandingNav />

      <section
        id="hero"
        className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-12 px-6 pt-28 pb-20 md:grid-cols-2 md:gap-16 md:px-10 md:pt-24"
      >
        <div>
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.05 },
              },
            }}
            className="flex flex-col gap-6"
          >
            <motion.div variants={fadeUp} custom={0}>
              <Badge
                variant="secondary"
                className="rounded-full border border-border/80 bg-muted/40 px-3 py-1 text-xs font-medium backdrop-blur-sm"
              >
                <Sparkles className="mr-1 size-3" aria-hidden />
                Full-stack product studio
              </Badge>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]"
            >
              {SITE.tagline}
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty"
            >
              {SITE.description}
            </motion.p>
            <motion.div
              variants={fadeUp}
              custom={3}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <a
                href="/contact"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-11 rounded-full px-7 text-sm"
                )}
              >
                Start a project
              </a>
              <a
                href="/#projects"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-11 rounded-full border-border/80 bg-background/40 px-7 text-sm backdrop-blur-sm"
                )}
              >
                View projects
              </a>
            </motion.div>
            <motion.div
              variants={fadeUp}
              custom={4}
              className="flex flex-wrap gap-2 pt-4"
            >
              {["WordPress", "Shopify", "Mobile", "AI"].map((label) => (
                <span
                  key={label}
                  className="rounded-full border border-border/60 bg-card/50 px-3 py-1 text-xs text-muted-foreground backdrop-blur-sm"
                >
                  {label}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="relative"
        >
          <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-violet-500/15 via-transparent to-cyan-500/10 blur-2xl" />
          <div className="overflow-hidden rounded-3xl border border-border/50 bg-zinc-950/60 p-1 shadow-2xl shadow-black/30 ring-1 ring-white/5 backdrop-blur-md md:p-1.5">
            <HeroVisual />
          </div>
        </motion.div>
      </section>

      <SectionShell id="commerce">
        <p className="text-sm font-medium tracking-wide text-violet-300/90 uppercase">
          Commerce & CMS
        </p>
        <h2 className="mt-3 max-w-2xl font-heading text-3xl font-semibold tracking-tight md:text-4xl">
          Platforms your customers already trust—implemented the right way.
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          From WooCommerce to headless WordPress, Shopify Plus to custom carts—we
          design for performance, SEO, and conversion.
        </p>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: LayoutTemplate,
              title: "WordPress",
              desc: "Custom themes, blocks, multisite, and headless architectures with editorial velocity.",
            },
            {
              icon: ShoppingBag,
              title: "Shopify",
              desc: "Storefronts, apps, checkout extensions, and ops automation for growing brands.",
            },
            {
              icon: Store,
              title: "E-commerce",
              desc: "Bespoke carts, subscriptions, marketplaces, and integrations with your stack.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <Card className="h-full border-border/60 bg-card/40 backdrop-blur-sm transition-shadow hover:shadow-lg hover:shadow-violet-500/5">
                <CardHeader>
                  <div className="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <item.icon className="size-5" aria-hidden />
                  </div>
                  <CardTitle className="pt-2 text-lg">{item.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {item.desc}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </SectionShell>

      <SectionShell id="platforms" className="border-y border-border/40 bg-muted/10">
        <p className="text-sm font-medium tracking-wide text-cyan-300/90 uppercase">
          Surfaces
        </p>
        <h2 className="mt-3 max-w-2xl font-heading text-3xl font-semibold tracking-tight md:text-4xl">
          Web, mobile, and desktop—one team, consistent quality.
        </h2>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {[
            {
              icon: Globe,
              title: "Web applications",
              desc: "SPAs, SSR, edge-ready APIs, and design systems that scale with your org.",
            },
            {
              icon: Smartphone,
              title: "Mobile apps",
              desc: "iOS, Android, and cross-platform builds with polish and reliable releases.",
            },
            {
              icon: Monitor,
              title: "Desktop software",
              desc: "Electron, Tauri, and native-adjacent tools for power users and internal teams.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.65 }}
              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-b from-card/80 to-card/30 p-8 backdrop-blur-sm"
            >
              <div className="absolute -right-8 -top-8 size-32 rounded-full bg-cyan-500/10 blur-2xl transition-opacity group-hover:opacity-80" />
              <item.icon className="relative size-8 text-cyan-300/90" aria-hidden />
              <h3 className="relative mt-6 font-heading text-xl font-semibold">
                {item.title}
              </h3>
              <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </SectionShell>

      <SectionShell id="stack">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
              Engineering depth
            </p>
            <h2 className="mt-2 max-w-xl font-heading text-3xl font-semibold tracking-tight md:text-4xl">
              Senior developers across the languages that matter.
            </h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            We match the stack to the problem—not the other way around.
          </p>
        </div>
        <motion.div
          className="mt-12 flex flex-wrap gap-2"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.04 },
            },
          }}
        >
          {TECH.map((t, i) => (
            <motion.span
              key={t}
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                show: { opacity: 1, scale: 1 },
              }}
              className="rounded-lg border border-border/60 bg-background/50 px-3 py-1.5 text-sm text-muted-foreground backdrop-blur-sm"
            >
              {t}
            </motion.span>
          ))}
        </motion.div>
      </SectionShell>

      <SectionShell id="ai" className="border-y border-border/40 bg-muted/10">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-medium tracking-wide text-violet-300/90 uppercase">
              AI & consulting
            </p>
            <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight md:text-4xl">
              Practical AI and hands-on guidance.
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Retrieval-augmented assistants, workflow automation, model
              evaluation, and roadmap workshops—grounded in your data and
              compliance needs.
            </p>
            <ul className="mt-8 space-y-4 text-sm">
              {[
                "Copilots over your docs, CRM, and support history",
                "Fine-tuning vs. RAG: clear tradeoffs, not hype",
                "Security reviews and vendor-neutral architecture",
              ].map((line) => (
                <li key={line} className="flex gap-3">
                  <Brain className="mt-0.5 size-4 shrink-0 text-violet-300/90" />
                  <span className="text-muted-foreground">{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl border border-border/50 bg-card/40 p-8 backdrop-blur-md"
          >
            <div className="flex items-center gap-3 border-b border-border/50 pb-6">
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary/15">
                <Layers className="size-6 text-primary" />
              </div>
              <div>
                <p className="font-medium">Advisory sprint</p>
                <p className="text-sm text-muted-foreground">
                  2 weeks · fixed scope
                </p>
              </div>
            </div>
            <div className="space-y-4 pt-6 text-sm text-muted-foreground">
              <p>Discovery, technical audit, prioritized backlog, and a delivery plan your team can execute—or we ship it with you.</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="rounded-md">
                  Architecture
                </Badge>
                <Badge variant="secondary" className="rounded-md">
                  AI readiness
                </Badge>
                <Badge variant="secondary" className="rounded-md">
                  Hiring support
                </Badge>
              </div>
            </div>
          </motion.div>
        </div>
      </SectionShell>

      <TestimonialsMarquee />

      <BlogSection posts={blogPosts} />

      <SectionShell
        id="projects"
        className="min-h-0 justify-start py-24 md:py-32"
      >
        <ProjectsShowcase />
      </SectionShell>

      <section
        id="contact"
        className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-36"
      >
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-violet-600/20 via-card/80 to-cyan-600/15 p-10 text-center md:p-16"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_oklch(0.55_0.2_280_/_0.25),_transparent_55%)]" />
          <h2 className="relative font-heading text-3xl font-semibold tracking-tight md:text-4xl">
            Ready when you are.
          </h2>
          <p className="relative mx-auto mt-4 max-w-lg text-muted-foreground">
            Tell us about timelines, stack, and goals—we&apos;ll reply with a
            clear next step.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-11 rounded-full px-8"
              )}
            >
              Contact form
            </Link>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 rounded-full border-border/80 bg-background/30 px-8 backdrop-blur-sm"
              )}
            >
              {CONTACT_EMAIL}
            </a>
            <a
              href="#hero"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 rounded-full border-border/80 bg-background/30 px-8 backdrop-blur-sm"
              )}
            >
              Back to top
            </a>
          </div>
        </motion.div>
        <footer className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-10 text-sm text-muted-foreground md:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground">
              Terms
            </Link>
          </div>
        </footer>
      </section>
    </div>
  );
}
