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
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { HeroVisual } from "./hero-visual";
import { ProjectsShowcase } from "./projects-showcase";
import { TestimonialsMarquee } from "./testimonials-marquee";
import { LandingNav } from "./nav";
import { MeshBackground } from "./mesh-background";
import { BlogSection } from "./blog-section";
import type { BlogListItem } from "@/lib/blog";
import type { HomeContent } from "@/lib/home-content";
import type { NavContent } from "@/lib/navigation-content";

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

const COMMERCE_ICONS: LucideIcon[] = [LayoutTemplate, ShoppingBag, Store];
const PLATFORM_ICONS: LucideIcon[] = [Globe, Smartphone, Monitor];

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

export function LandingPage({
  content,
  blogPosts,
  nav,
}: {
  content: HomeContent;
  blogPosts: BlogListItem[];
  nav: NavContent;
}) {
  const { hero, commerce, platforms, stack, ai, testimonials, blogTeaser, projects, contactCta, footer } =
    content;

  return (
    <div className="relative text-foreground">
      <MeshBackground />
      <LandingNav nav={nav} />

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
                {hero.eyebrow}
              </Badge>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]"
            >
              {hero.headline}
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty"
            >
              {hero.subhead}
            </motion.p>
            <motion.div
              variants={fadeUp}
              custom={3}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <a
                href={hero.primaryCta.href}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-11 rounded-full px-7 text-sm"
                )}
              >
                {hero.primaryCta.label}
              </a>
              <a
                href={hero.secondaryCta.href}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-11 rounded-full border-border/80 bg-background/40 px-7 text-sm backdrop-blur-sm"
                )}
              >
                {hero.secondaryCta.label}
              </a>
            </motion.div>
            <motion.div
              variants={fadeUp}
              custom={4}
              className="flex flex-wrap gap-2 pt-4"
            >
              {hero.chips.map((label) => (
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
          <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-linear-to-br from-violet-500/15 via-transparent to-cyan-500/10 blur-2xl" />
          <div className="overflow-hidden rounded-3xl border border-border/50 bg-zinc-950/60 p-1 shadow-2xl shadow-black/30 ring-1 ring-white/5 backdrop-blur-md md:p-1.5">
            <HeroVisual
              caption={hero.visualCaption}
              loadingText={hero.visualLoading}
              skills={hero.floatingSkills}
            />
          </div>
        </motion.div>
      </section>

      <SectionShell id="commerce">
        <p className="text-sm font-medium tracking-wide text-violet-300/90 uppercase">
          {commerce.eyebrow}
        </p>
        <h2 className="mt-3 max-w-2xl font-heading text-3xl font-semibold tracking-tight md:text-4xl">
          {commerce.headline}
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          {commerce.subhead}
        </p>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {commerce.cards.map((item, i) => {
            const Icon = COMMERCE_ICONS[i] ?? LayoutTemplate;
            return (
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
                      <Icon className="size-5" aria-hidden />
                    </div>
                    <CardTitle className="pt-2 text-lg">{item.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {item.desc}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </SectionShell>

      <SectionShell id="platforms" className="border-y border-border/40 bg-muted/10">
        <p className="text-sm font-medium tracking-wide text-cyan-300/90 uppercase">
          {platforms.eyebrow}
        </p>
        <h2 className="mt-3 max-w-2xl font-heading text-3xl font-semibold tracking-tight md:text-4xl">
          {platforms.headline}
        </h2>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {platforms.cards.map((item, i) => {
            const Icon = PLATFORM_ICONS[i] ?? Globe;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.65 }}
                className="group relative overflow-hidden rounded-2xl border border-border/50 bg-linear-to-b from-card/80 to-card/30 p-8 backdrop-blur-sm"
              >
                <div className="absolute -right-8 -top-8 size-32 rounded-full bg-cyan-500/10 blur-2xl transition-opacity group-hover:opacity-80" />
                <Icon className="relative size-8 text-cyan-300/90" aria-hidden />
                <h3 className="relative mt-6 font-heading text-xl font-semibold">
                  {item.title}
                </h3>
                <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </SectionShell>

      <SectionShell id="stack">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
              {stack.eyebrow}
            </p>
            <h2 className="mt-2 max-w-xl font-heading text-3xl font-semibold tracking-tight md:text-4xl">
              {stack.headline}
            </h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            {stack.subhead}
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
          {stack.techList.map((t) => (
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
              {ai.eyebrow}
            </p>
            <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight md:text-4xl">
              {ai.headline}
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {ai.subhead}
            </p>
            <ul className="mt-8 space-y-4 text-sm">
              {ai.bullets.map((line) => (
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
                <p className="font-medium">{ai.card.title}</p>
                <p className="text-sm text-muted-foreground">{ai.card.meta}</p>
              </div>
            </div>
            <div className="space-y-4 pt-6 text-sm text-muted-foreground">
              <p>{ai.card.desc}</p>
              <div className="flex flex-wrap gap-2">
                {ai.card.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="rounded-md">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </SectionShell>

      <TestimonialsMarquee
        eyebrow={testimonials.eyebrow}
        headline={testimonials.headline}
        subhead={testimonials.subhead}
        items={testimonials.items}
      />

      <BlogSection
        posts={blogPosts}
        eyebrow={blogTeaser.eyebrow}
        headline={blogTeaser.headline}
        subhead={blogTeaser.subhead}
        ctaLabel={blogTeaser.cta.label}
        ctaHref={blogTeaser.cta.href}
      />

      <SectionShell
        id="projects"
        className="min-h-0 justify-start py-24 md:py-32"
      >
        <ProjectsShowcase
          eyebrow={projects.eyebrow}
          headline={projects.headline}
          subhead={projects.subhead}
          items={projects.items}
        />
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
          className="relative overflow-hidden rounded-3xl border border-border/50 bg-linear-to-br from-violet-600/20 via-card/80 to-cyan-600/15 p-10 text-center md:p-16"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.55_0.2_280/0.25),transparent_55%)]" />
          <h2 className="relative font-heading text-3xl font-semibold tracking-tight md:text-4xl">
            {contactCta.headline}
          </h2>
          <p className="relative mx-auto mt-4 max-w-lg text-muted-foreground">
            {contactCta.subhead}
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href={contactCta.primary.href}
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-11 rounded-full px-8"
              )}
            >
              {contactCta.primary.label}
            </Link>
            <a
              href={contactCta.emailHref}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 rounded-full border-border/80 bg-background/30 px-8 backdrop-blur-sm"
              )}
            >
              {contactCta.emailLabel}
            </a>
            <a
              href={contactCta.backHref}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 rounded-full border-border/80 bg-background/30 px-8 backdrop-blur-sm"
              )}
            >
              {contactCta.backLabel}
            </a>
          </div>
        </motion.div>
        <footer className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-10 text-sm text-muted-foreground md:flex-row">
          <p>{footer.copyright}</p>
          <div className="flex gap-6">
            <Link href={footer.privacyHref} className="hover:text-foreground">
              {footer.privacyLabel}
            </Link>
            <Link href={footer.termsHref} className="hover:text-foreground">
              {footer.termsLabel}
            </Link>
          </div>
        </footer>
      </section>
    </div>
  );
}
