import type { Metadata } from "next";
import Link from "next/link";
import { LandingNav } from "@/components/landing/nav";
import { MeshBackground } from "@/components/landing/mesh-background";
import { getAboutContent } from "@/lib/about-content";
import { getNavigationContent } from "@/lib/navigation-content";

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await getAboutContent();
  return {
    title: page?.metaTitle ?? page?.title ?? "About",
    description: page?.metaDesc,
  };
}

function SectionShell({
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

export default async function AboutPage() {
  const [{ content }, nav] = await Promise.all([
    getAboutContent(),
    getNavigationContent(),
  ]);
  const { header, sections, contactCta, footer } = content;

  return (
    <div className="relative min-h-screen text-foreground">
      <MeshBackground />
      <LandingNav nav={nav} />
      <main>
        <header className="mx-auto max-w-3xl px-6 pt-28 pb-14 md:px-10 md:pt-32 md:pb-20">
          <p className="text-sm font-medium tracking-wide text-violet-300/90 uppercase">
            {header.eyebrow}
          </p>
          <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight text-balance md:text-5xl">
            {header.headline}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            {header.subhead}
          </p>
        </header>

        {sections.map((section) => {
          if (section.kind === "paragraphs") {
            return (
              <SectionShell
                key={section.id}
                id={section.id}
                eyebrow={section.eyebrow}
                title={section.title}
              >
                {section.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </SectionShell>
            );
          }
          if (section.kind === "list") {
            return (
              <SectionShell
                key={section.id}
                id={section.id}
                eyebrow={section.eyebrow}
                title={section.title}
              >
                <ul className="list-inside list-disc space-y-2 marker:text-cyan-400/80">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </SectionShell>
            );
          }
          return (
            <SectionShell
              key={section.id}
              id={section.id}
              eyebrow={section.eyebrow}
              title={section.title}
            >
              <p>{section.body}</p>
              <p>
                <a
                  href={section.emailHref}
                  className="font-medium text-cyan-300 hover:text-cyan-200"
                >
                  {section.emailLabel}
                </a>
              </p>
            </SectionShell>
          );
        })}

        <section
          id="contact"
          className="scroll-mt-28 border-t border-border/40 py-20 md:scroll-mt-24 md:py-24"
        >
          <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
            <p className="text-sm font-medium tracking-wide text-violet-300/90 uppercase">
              {contactCta.eyebrow}
            </p>
            <h2 className="mt-3 font-heading text-2xl font-semibold tracking-tight md:text-3xl">
              {contactCta.headline}
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {contactCta.subhead}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href={contactCta.primary.href}
                className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {contactCta.primary.label}
              </Link>
              <Link
                href={contactCta.secondary.href}
                className="inline-flex h-11 items-center justify-center rounded-full border border-border/80 bg-background/30 px-8 text-sm font-medium backdrop-blur-sm transition-colors hover:bg-muted/50"
              >
                {contactCta.secondary.label}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-7xl border-t border-border/40 px-6 py-10 text-center text-sm text-muted-foreground md:px-10">
        <Link href={footer.homeHref} className="hover:text-foreground">
          {footer.homeLabel}
        </Link>
        <span className="mx-3 opacity-40">·</span>
        {footer.copyright}
      </footer>
    </div>
  );
}
