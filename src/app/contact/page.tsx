import type { Metadata } from "next";
import Link from "next/link";
import { LandingNav } from "@/components/landing/nav";
import { MeshBackground } from "@/components/landing/mesh-background";
import { ContactForm } from "@/components/contact/contact-form";
import { CONTACT_EMAIL, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Reach ${SITE.name}: timelines, stack, and goals. We reply with a clear next step.`,
};

export default function ContactPage() {
  return (
    <div className="relative min-h-screen text-foreground">
      <MeshBackground />
      <LandingNav />
      <main className="mx-auto max-w-3xl px-6 pt-28 pb-20 md:px-10 md:pt-32 md:pb-28">
        <p className="text-sm font-medium tracking-wide text-cyan-300/90 uppercase">
          Contact
        </p>
        <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight text-balance md:text-5xl">
          Let&apos;s talk about what you&apos;re building.
        </h1>
        <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
          Share a bit of context—we&apos;ll get back with questions, a rough
          approach, or a short call if it&apos;s a fit.
        </p>

        <div className="mt-10 rounded-2xl border border-border/50 bg-card/40 p-6 shadow-sm backdrop-blur-sm md:p-8">
          <ContactForm />
        </div>

        <div className="mt-10 border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
          <p>
            Prefer email only?{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-medium text-cyan-300 hover:text-cyan-200"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
          <p className="mt-4">
            <Link
              href="/"
              className="text-foreground underline-offset-4 hover:underline"
            >
              ← Back to home
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
