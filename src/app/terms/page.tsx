import type { Metadata } from "next";
import { LegalDocShell, LegalSection } from "@/components/legal/legal-doc-shell";
import { LinkifiedText } from "@/components/legal/linkified-text";
import { getTermsContent } from "@/lib/terms-content";

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await getTermsContent();
  return {
    title: page?.metaTitle ?? page?.title ?? "Terms of use",
    description: page?.metaDesc,
  };
}

export default async function TermsPage() {
  const { content } = await getTermsContent();
  const { header, sections } = content;

  return (
    <LegalDocShell
      eyebrow={header.eyebrow}
      title={header.title}
      lastUpdated={header.lastUpdated}
    >
      {sections.map((section) => (
        <LegalSection
          key={section.id ?? section.title}
          id={section.id}
          title={section.title}
        >
          {section.kind === "paragraphs" ? (
            section.paragraphs.map((p, i) => (
              <p key={i}>
                <LinkifiedText text={p} />
              </p>
            ))
          ) : (
            <>
              {section.intro ? <p>{section.intro}</p> : null}
              <ul className="list-inside list-disc space-y-2 marker:text-cyan-400/70">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </>
          )}
        </LegalSection>
      ))}
    </LegalDocShell>
  );
}
