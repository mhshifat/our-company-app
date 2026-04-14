import "server-only";

import { getPage, getString, type CmsPage } from "./cms";

export type ContactFormCopy = {
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  companyLabel: string;
  companyPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  helperText: string;
  submitLabel: string;
  /** Inbox used in the mailto: fallback — controlled via CMS for override flexibility. */
  mailtoEmail: string;
};

export type ContactContent = {
  header: { eyebrow: string; headline: string; subhead: string };
  form: ContactFormCopy;
  footer: {
    emailPrompt: string;
    emailLabel: string;
    emailHref: string;
    backLabel: string;
    backHref: string;
  };
};

function buildContent(page: CmsPage): ContactContent {
  const f = page.fields ?? {};
  const s = (k: string, fb = "") => getString(f, k, fb);

  return {
    header: {
      eyebrow: s("header_eyebrow", "Contact"),
      headline: s("header_headline", "Let's talk about what you're building."),
      subhead: s("header_subhead"),
    },
    form: {
      nameLabel: s("form_name_label", "Name"),
      namePlaceholder: s("form_name_placeholder", "Jordan Lee"),
      emailLabel: s("form_email_label", "Work email"),
      emailPlaceholder: s("form_email_placeholder", "you@company.com"),
      companyLabel: s("form_company_label", "Company (optional)"),
      companyPlaceholder: s("form_company_placeholder", "Acme Inc."),
      messageLabel: s("form_message_label", "How can we help?"),
      messagePlaceholder: s(
        "form_message_placeholder",
        "Timeline, stack, goals, links to briefs or repos…"
      ),
      helperText: s("form_helper_text"),
      submitLabel: s("form_submit_label", "Send message"),
      mailtoEmail: s("footer_email_label", "hello@bytloop.com"),
    },
    footer: {
      emailPrompt: s("footer_email_prompt", "Prefer email only?"),
      emailLabel: s("footer_email_label", "hello@bytloop.com"),
      emailHref: s("footer_email_href", "mailto:hello@bytloop.com"),
      backLabel: s("footer_back_label", "← Back to home"),
      backHref: s("footer_back_href", "/"),
    },
  };
}

export async function getContactContent(): Promise<{
  page: CmsPage | null;
  content: ContactContent;
}> {
  const page = await getPage("contact");
  if (!page) {
    return {
      page: null,
      content: buildContent({ slug: "contact", locale: "default", fields: {} }),
    };
  }
  return { page, content: buildContent(page) };
}
