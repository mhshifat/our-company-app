import Link from "next/link";
import { LandingNav } from "@/components/landing/nav";
import { MeshBackground } from "@/components/landing/mesh-background";

export function LegalSection({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="font-heading text-xl font-semibold text-foreground md:text-2xl">
        {title}
      </h2>
      <div className="mt-4 space-y-3 text-sm leading-relaxed md:text-[15px]">
        {children}
      </div>
    </section>
  );
}

export function LegalDocShell({
  eyebrow,
  title,
  lastUpdated,
  children,
}: {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen text-foreground">
      <MeshBackground />
      <LandingNav />
      <main className="mx-auto max-w-3xl px-6 pt-28 pb-20 md:px-10 md:pt-32 md:pb-28">
        <p className="text-sm font-medium tracking-wide text-cyan-300/90 uppercase">
          {eyebrow}
        </p>
        <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight text-balance md:text-5xl">
          {title}
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Last updated: {lastUpdated}
        </p>
        <article className="mt-12 space-y-12 border-t border-border/40 pt-12 text-muted-foreground">
          {children}
        </article>
        <nav
          className="mt-14 flex flex-wrap gap-x-5 gap-y-2 border-t border-border/40 pt-8 text-sm text-muted-foreground"
          aria-label="Legal and site links"
        >
          <Link href="/" className="text-foreground hover:underline">
            Home
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
          <Link href="/privacy" className="hover:underline">
            Privacy
          </Link>
          <Link href="/terms" className="hover:underline">
            Terms
          </Link>
        </nav>
      </main>
    </div>
  );
}
