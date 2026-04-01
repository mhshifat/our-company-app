import type { Metadata } from "next";
import { LegalDocShell, LegalSection } from "@/components/legal/legal-doc-shell";
import { CONTACT_EMAIL, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: `How ${SITE.name} collects, uses, and protects information when you use our website.`,
};

const UPDATED = "April 2, 2026";

export default function PrivacyPage() {
  return (
    <LegalDocShell
      eyebrow="Legal"
      title="Privacy policy"
      lastUpdated={UPDATED}
    >
      <LegalSection title="Overview">
        <p>
          This policy describes how {SITE.name} (&quot;we,&quot; &quot;us&quot;)
          handles information when you visit our website or get in touch. If you
          engage us under a separate agreement (for example, a master services
          agreement), those terms may also apply to data processed as part of
          delivery work.
        </p>
      </LegalSection>

      <LegalSection id="collect" title="Information we collect">
        <p>
          <span className="text-foreground font-medium">You provide:</span> when
          you email us or use the contact form, we receive what you send—such as
          name, email address, company, and message content.
        </p>
        <p>
          <span className="text-foreground font-medium">Automatically:</span>{" "}
          like most sites, our hosting and analytics providers may log technical
          data (for example IP address, browser type, approximate location, and
          pages viewed) to operate and secure the service.
        </p>
      </LegalSection>

      <LegalSection title="How we use information">
        <ul className="list-inside list-disc space-y-2 marker:text-cyan-400/70">
          <li>Respond to inquiries and evaluate potential engagements.</li>
          <li>Operate, maintain, and improve the website.</li>
          <li>Detect abuse, fraud, or security issues.</li>
          <li>Comply with law or protect our rights where required.</li>
        </ul>
      </LegalSection>

      <LegalSection title="Cookies and similar technologies">
        <p>
          We may use cookies or similar technologies where needed for site
          function, preferences, or analytics. You can control cookies through
          your browser settings; blocking some cookies may affect how the site
          works.
        </p>
      </LegalSection>

      <LegalSection title="Sharing">
        <p>
          We do not sell your personal information. We may share data with
          vendors who help us run the site (hosting, email, analytics) under
          contracts that limit their use, or when required by law.
        </p>
      </LegalSection>

      <LegalSection title="Retention">
        <p>
          We keep contact and inquiry information only as long as needed for the
          purposes above, unless a longer period is required for legal or
          legitimate business reasons.
        </p>
      </LegalSection>

      <LegalSection title="Your choices">
        <p>
          Depending on where you live, you may have rights to access, correct,
          delete, or restrict certain processing of your personal data. Contact
          us at{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-medium text-cyan-300 hover:text-cyan-200"
          >
            {CONTACT_EMAIL}
          </a>{" "}
          to make a request. We may need to verify your identity before
          responding.
        </p>
      </LegalSection>

      <LegalSection title="International visitors">
        <p>
          Our site may be operated from or processed in countries other than your
          own. By using the site, you understand that data may be transferred
          across borders subject to appropriate safeguards where applicable.
        </p>
      </LegalSection>

      <LegalSection title="Children">
        <p>
          The site is not directed at children under 16, and we do not knowingly
          collect their personal information.
        </p>
      </LegalSection>

      <LegalSection title="Changes">
        <p>
          We may update this policy from time to time. The &quot;Last
          updated&quot; date at the top will change when we do; continued use of
          the site after changes means you accept the revised policy.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Questions about this policy:{" "}
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
