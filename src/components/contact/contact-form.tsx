"use client";

import { useState } from "react";
import { CONTACT_EMAIL } from "@/lib/site";
import { cn } from "@/lib/utils";

const fieldClass =
  "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50";

export function ContactForm() {
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
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium">
          Name
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
          placeholder="Jordan Lee"
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium">
          Work email
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
          placeholder="you@company.com"
        />
      </div>
      <div>
        <label htmlFor="contact-company" className="mb-1.5 block text-sm font-medium">
          Company <span className="font-normal text-muted-foreground">(optional)</span>
        </label>
        <input
          id="contact-company"
          name="company"
          type="text"
          autoComplete="organization"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className={cn(fieldClass)}
          placeholder="Acme Inc."
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium">
          How can we help?
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={cn(fieldClass, "min-h-[120px] resize-y")}
          placeholder="Timeline, stack, goals, links to briefs or repos…"
        />
      </div>
      <p className="text-xs text-muted-foreground">
        Submitting opens your email app with this message addressed to{" "}
        <span className="text-foreground">{CONTACT_EMAIL}</span>. You can edit
        before sending.
      </p>
      <button
        type="submit"
        className="inline-flex h-10 w-full items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto"
      >
        Send message
      </button>
    </form>
  );
}
