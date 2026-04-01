import type { Metadata } from "next";
import Link from "next/link";
import { LandingNav } from "@/components/landing/nav";
import { MeshBackground } from "@/components/landing/mesh-background";
import { CONTACT_EMAIL, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About us",
  description: `Meet ${SITE.name}: a senior engineering studio for web, mobile, commerce, and AI. Mission, values, and how we partner with your team.`,
};

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-28 border-t border-border/40 py-20 md:scroll-mt-24 md:py-24"
    >
      <div className="mx-auto max-w-3xl px-6 md:px-10">
        <p className="text-sm font-medium tracking-wide text-cyan-300/90 uppercase">
          {eyebrow}
        </p>
        <h2 className="mt-3 font-heading text-2xl font-semibold tracking-tight md:text-3xl">
          {title}
        </h2>
        <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
          {children}
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <div className="relative min-h-screen text-foreground">
      <MeshBackground />
      <LandingNav />
      <main>
        <header className="mx-auto max-w-3xl px-6 pt-28 pb-14 md:px-10 md:pt-32 md:pb-20">
          <p className="text-sm font-medium tracking-wide text-violet-300/90 uppercase">
            About {SITE.name}
          </p>
          <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight text-balance md:text-5xl">
            Software that holds up in production.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            We&apos;re a senior engineering studio for web, mobile, commerce,
            and AI—partnering with product and engineering leaders who care
            about velocity <em>and</em> maintainability.
          </p>
        </header>

        <Section
          id="who-we-are"
          eyebrow="Company"
          title="Who we are"
        >
          <p>
            {SITE.name} works as an extension of your team: we ship in your
            repos, document decisions, and leave you with systems your own
            engineers can own. No black boxes, no surprise handoffs.
          </p>
          <p>
            Our sweet spot is multi-surface products—Shopify and WordPress
            ecosystems, Next.js storefronts and dashboards, mobile crews in the
            field, and pragmatic AI on top of your real data.
          </p>
        </Section>

        <Section id="mission" eyebrow="Mission" title="What we optimize for">
          <p>
            We optimize for outcomes you can measure: faster releases, clearer
            ownership, fewer incidents, and teams that aren&apos;t afraid to
            change the codebase. Strategy decks are fine; working software in
            production is the bar.
          </p>
        </Section>

        <Section id="values" eyebrow="Values" title="How we behave">
          <ul className="list-inside list-disc space-y-2 marker:text-cyan-400/80">
            <li>
              <span className="text-foreground font-medium">Clarity</span> —
              explicit tradeoffs, written context, and agendas before meetings.
            </li>
            <li>
              <span className="text-foreground font-medium">Craft</span> —
              types, tests where they matter, and observability you can actually
              use.
            </li>
            <li>
              <span className="text-foreground font-medium">Partnership</span>{" "}
              — we align incentives with your roadmap, not billable churn.
            </li>
          </ul>
        </Section>

        <Section
          id="approach"
          eyebrow="Delivery"
          title="How we engage"
        >
          <p>
            Typical engagements blend discovery, incremental delivery, and
            knowledge transfer. We favor thin vertical slices, feature flags,
            and staging paths that mirror production.
          </p>
          <p>
            Whether you need a focused build phase or ongoing capacity, we
            scope in writing, track progress in the open, and adjust when
            priorities shift—without losing sight of the quality bar.
          </p>
        </Section>

        <Section
          id="industries"
          eyebrow="Focus"
          title="Industries & problem spaces"
        >
          <p>
            We gravitate toward commerce and content platforms, internal ops
            tools, mobile workflows with offline requirements, and AI features
            that need citations, guardrails, and auditability—not toy demos.
          </p>
        </Section>

        <Section id="culture" eyebrow="Team" title="Culture">
          <p>
            Remote-friendly and documentation-first. We hire for curiosity,
            communication, and respect for the people who will maintain what we
            ship. Low ego, high standards.
          </p>
        </Section>

        <Section id="careers" eyebrow="Careers" title="Join us">
          <p>
            We&apos;re always interested in hearing from strong full-stack,
            mobile, and platform engineers who care about product outcomes. Send
            a short note with what you&apos;ve shipped and what you want next—we
            post specific roles here as we open them.
          </p>
          <p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-medium text-cyan-300 hover:text-cyan-200"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </Section>

        <section
          id="contact"
          className="scroll-mt-28 border-t border-border/40 py-20 md:scroll-mt-24 md:py-24"
        >
          <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
            <p className="text-sm font-medium tracking-wide text-violet-300/90 uppercase">
              Next step
            </p>
            <h2 className="mt-3 font-heading text-2xl font-semibold tracking-tight md:text-3xl">
              Tell us what you&apos;re building.
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Timelines, stack, and goals—we&apos;ll reply with a clear next
              step.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Contact us
              </Link>
              <Link
                href="/"
                className="inline-flex h-11 items-center justify-center rounded-full border border-border/80 bg-background/30 px-8 text-sm font-medium backdrop-blur-sm transition-colors hover:bg-muted/50"
              >
                Back to home
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-7xl border-t border-border/40 px-6 py-10 text-center text-sm text-muted-foreground md:px-10">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <span className="mx-3 opacity-40">·</span>
        © {new Date().getFullYear()} {SITE.name}
      </footer>
    </div>
  );
}
