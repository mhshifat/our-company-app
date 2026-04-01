import type { Metadata } from "next";
import { LegalDocShell, LegalSection } from "@/components/legal/legal-doc-shell";
import { CONTACT_EMAIL, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of use",
  description: `Terms governing use of the ${SITE.name} website and general engagement expectations.`,
};

const UPDATED = "April 2, 2026";

export default function TermsPage() {
  return (
    <LegalDocShell
      eyebrow="Legal"
      title="Terms of use"
      lastUpdated={UPDATED}
    >
      <LegalSection title="Agreement">
        <p>
          By accessing or using the website operated by {SITE.name}
          (&quot;we,&quot; &quot;us&quot;), you agree to these terms. If you do
          not agree, do not use the site. Separate written agreements (such as
          statements of work) govern paid services and override these terms where
          they conflict.
        </p>
      </LegalSection>

      <LegalSection title="The site">
        <p>
          We provide this site for general information about our capabilities. We
          may change, suspend, or discontinue any part of the site at any time
          without notice. We do not guarantee that the site will be uninterrupted
          or error-free.
        </p>
      </LegalSection>

      <LegalSection title="Acceptable use">
        <p>You agree not to:</p>
        <ul className="list-inside list-disc space-y-2 marker:text-cyan-400/70">
          <li>Use the site in violation of law or third-party rights.</li>
          <li>
            Attempt to probe, scan, or test vulnerabilities without
            authorization.
          </li>
          <li>
            Interfere with the site&apos;s operation or others&apos; use of it.
          </li>
          <li>
            Use automated means to scrape or harvest data at a scale that impairs
            the service.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Intellectual property">
        <p>
          The site, its design, branding, text, and other content are owned by
          us or our licensors and are protected by intellectual property laws.
          You may not copy, modify, or distribute them without our prior written
          permission, except as allowed by law (for example, temporary copies in
          your browser cache).
        </p>
      </LegalSection>

      <LegalSection title="Third-party links">
        <p>
          The site may link to third-party sites or services. We are not
          responsible for their content, policies, or practices.
        </p>
      </LegalSection>

      <LegalSection title="Disclaimer">
        <p>
          THE SITE AND ALL CONTENT ARE PROVIDED &quot;AS IS&quot; AND &quot;AS
          AVAILABLE,&quot; WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR
          IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
          AND NON-INFRINGEMENT, TO THE FULLEST EXTENT PERMITTED BY LAW.
        </p>
      </LegalSection>

      <LegalSection title="Limitation of liability">
        <p>
          TO THE FULLEST EXTENT PERMITTED BY LAW, WE WILL NOT BE LIABLE FOR ANY
          INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR
          ANY LOSS OF PROFITS, DATA, OR GOODWILL, ARISING FROM YOUR USE OF THE
          SITE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
          OUR TOTAL LIABILITY FOR ANY CLAIM RELATING TO THE SITE SHALL NOT EXCEED
          THE GREATER OF (A) THE AMOUNT YOU PAID US FOR THE SPECIFIC SERVICE
          GIVING RISE TO THE CLAIM IN THE TWELVE MONTHS BEFORE THE CLAIM, OR (B)
          ONE HUNDRED U.S. DOLLARS (US$100), IF NO SUCH PAYMENT APPLIES.
        </p>
      </LegalSection>

      <LegalSection title="Indemnity">
        <p>
          You will defend and indemnify us against any claims, damages, losses,
          and expenses (including reasonable attorneys&apos; fees) arising from
          your misuse of the site or violation of these terms.
        </p>
      </LegalSection>

      <LegalSection title="Governing law">
        <p>
          These terms are governed by the laws of the jurisdiction in which{" "}
          {SITE.name} operates, without regard to conflict-of-law rules. Courts
          in that jurisdiction shall have exclusive venue, subject to mandatory
          consumer protections where applicable.
        </p>
      </LegalSection>

      <LegalSection title="Changes">
        <p>
          We may update these terms by posting a revised version on this page and
          updating the &quot;Last updated&quot; date. Your continued use after
          changes constitutes acceptance.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Questions:{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-medium text-cyan-300 hover:text-cyan-200"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </LegalSection>
    </LegalDocShell>
  );
}
