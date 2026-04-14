"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const fieldClass =
  "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50";

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
  mailtoEmail: string;
};

export function ContactForm({ copy }: { copy: ContactFormCopy }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Contact from ${name.trim() || "website"}`
    );
    const body = encodeURIComponent(
      [
        `Name: ${name.trim()}`,
        `Email: ${email.trim()}`,
        company.trim() ? `Company: ${company.trim()}` : null,
        "",
        message.trim(),
      ]
        .filter(Boolean)
        .join("\n")
    );
    window.location.href = `mailto:${copy.mailtoEmail}?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium">
          {copy.nameLabel}
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={cn(fieldClass)}
          placeholder={copy.namePlaceholder}
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium">
          {copy.emailLabel}
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={cn(fieldClass)}
          placeholder={copy.emailPlaceholder}
        />
      </div>
      <div>
        <label htmlFor="contact-company" className="mb-1.5 block text-sm font-medium">
          {copy.companyLabel}
        </label>
        <input
          id="contact-company"
          name="company"
          type="text"
          autoComplete="organization"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className={cn(fieldClass)}
          placeholder={copy.companyPlaceholder}
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium">
          {copy.messageLabel}
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={cn(fieldClass, "min-h-[120px] resize-y")}
          placeholder={copy.messagePlaceholder}
        />
      </div>
      {copy.helperText ? (
        <p className="text-xs text-muted-foreground">{copy.helperText}</p>
      ) : null}
      <button
        type="submit"
        className="inline-flex h-10 w-full items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto"
      >
        {copy.submitLabel}
      </button>
    </form>
  );
}
