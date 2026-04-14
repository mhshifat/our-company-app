import type { Metadata } from "next";
import Link from "next/link";
import { LandingNav } from "@/components/landing/nav";
import { MeshBackground } from "@/components/landing/mesh-background";
import { ContactForm } from "@/components/contact/contact-form";
import { getContactContent } from "@/lib/contact-content";
import { getNavigationContent } from "@/lib/navigation-content";

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await getContactContent();
  return {
    title: page?.metaTitle ?? page?.title ?? "Contact",
    description: page?.metaDesc,
  };
}

export default async function ContactPage() {
  const [{ content }, nav] = await Promise.all([
    getContactContent(),
    getNavigationContent(),
  ]);
  const { header, form, footer } = content;

  return (
    <div className="relative min-h-screen text-foreground">
      <MeshBackground />
      <LandingNav nav={nav} />
      <main className="mx-auto max-w-3xl px-6 pt-28 pb-20 md:px-10 md:pt-32 md:pb-28">
        <p className="text-sm font-medium tracking-wide text-cyan-300/90 uppercase">
          {header.eyebrow}
        </p>
        <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight text-balance md:text-5xl">
          {header.headline}
        </h1>
        <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
          {header.subhead}
        </p>

        <div className="mt-10 rounded-2xl border border-border/50 bg-card/40 p-6 shadow-sm backdrop-blur-sm md:p-8">
          <ContactForm copy={form} />
        </div>

        <div className="mt-10 border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
          <p>
            {footer.emailPrompt}{" "}
            <a
              href={footer.emailHref}
              className="font-medium text-cyan-300 hover:text-cyan-200"
            >
              {footer.emailLabel}
            </a>
          </p>
          <p className="mt-4">
            <Link
              href={footer.backHref}
              className="text-foreground underline-offset-4 hover:underline"
            >
              {footer.backLabel}
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
