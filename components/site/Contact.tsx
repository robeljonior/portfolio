"use client";

import { ArrowUpRight, Mail, MapPin, Send } from "lucide-react";
import SocialIcon from "@/components/ui/SocialIcon";
import CopyButton from "./CopyButton";
import LocalTime from "./LocalTime";
import { FormEvent, useState } from "react";
import { EMAIL, GITHUB_URL, LINKEDIN_URL, OVERLAP } from "@/lib/Data";
import Section from "./Section";

const field =
  "mt-1.5 block w-full rounded-lg border border-veil/10 bg-veil/[0.04] px-3 py-2.5 text-sm text-ink outline-none transition-colors duration-150 placeholder:text-faint hover:border-veil/20 focus:border-mint";

export default function Contact() {
  const [error, setError] = useState("");
  const [opened, setOpened] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!email || !message) {
      setError("Add your email and a message so I can reply.");
      return;
    }
    setError("");
    setOpened(true);
    const subject = encodeURIComponent(`Hello from ${name || email}`);
    const body = encodeURIComponent(`${message}\n\n${name ? `${name}\n` : ""}${email}`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <Section id="contact" title="Contact" heading={<>Let&apos;s build something <span className="text-mint">dependable</span>.</>}>
      <p data-reveal className="text-[17px] leading-8 text-muted">
        Hiring for a backend or full-stack role, or need someone who has shipped banking and fintech integrations? Write to me and
        I&apos;ll get back to you quickly.
      </p>

      <ul data-reveal className="mt-8 grid gap-3 sm:grid-cols-2">
        <li className="glass flex items-center justify-between gap-3 rounded-2xl p-4">
          <a href={`mailto:${EMAIL}`} className="flex min-w-0 items-center gap-3 text-ink transition-colors hover:text-mint">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-mint/15 text-mint"><Mail className="h-4 w-4" /></span>
            <span className="min-w-0">
              <span className="block text-xs text-faint">Email</span>
              <span className="block truncate text-sm">{EMAIL}</span>
            </span>
          </a>
          <CopyButton value={EMAIL} label="email address" />
        </li>
        <li className="glass flex items-center gap-3 rounded-2xl p-4">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold/15 text-gold"><MapPin className="h-4 w-4" /></span>
          <span className="min-w-0 text-sm">
            <span className="block text-xs text-faint">Addis Ababa, Ethiopia · <LocalTime /></span>
            <span className="block text-ink">{OVERLAP}</span>
          </span>
        </li>
        <li>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="glass group flex items-center gap-3 rounded-2xl p-4 transition-colors hover:border-mint/40">
            <SocialIcon iconKey="linkedin" className="h-5 w-5 text-muted group-hover:text-ink" />
            <span className="text-sm text-ink">LinkedIn</span>
            <ArrowUpRight className="ml-auto h-4 w-4 text-faint group-hover:text-mint" />
          </a>
        </li>
        <li>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="glass group flex items-center gap-3 rounded-2xl p-4 transition-colors hover:border-mint/40">
            <SocialIcon iconKey="github" className="h-5 w-5 text-muted group-hover:text-ink" />
            <span className="text-sm text-ink">GitHub</span>
            <ArrowUpRight className="ml-auto h-4 w-4 text-faint group-hover:text-mint" />
          </a>
        </li>
      </ul>

      <form onSubmit={submit} noValidate data-reveal aria-label="Send a message" className="glass glow mt-3 grid gap-4 rounded-2xl p-5 sm:grid-cols-2 sm:p-6">
        <label className="text-sm text-muted">
          Name
          <input name="name" autoComplete="name" className={field} placeholder="Your name" />
        </label>
        <label className="text-sm text-muted">
          Email
          <input name="email" type="email" autoComplete="email" required className={field} placeholder="you@company.com" />
        </label>
        <label className="text-sm text-muted sm:col-span-2">
          Message
          <textarea name="message" rows={4} required className={`${field} resize-y`} placeholder="The role, the team, the problem." />
        </label>
        <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
          <button type="submit" className="press group inline-flex items-center">
            <span className="pill gap-2 bg-mint text-onaccent group-hover:bg-mint/85">
              <Send className="h-4 w-4" /> Send
            </span>
            <span className="pill-dot bg-mint text-onaccent group-hover:bg-mint/85" aria-hidden="true">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </button>
          <p className="text-xs text-faint" role="status" aria-live="polite">
            {error ? <span className="text-[#e59a8f]">{error}</span> : opened ? "Your email app should open now." : "Opens your email app with the message filled in."}
          </p>
        </div>
      </form>
    </Section>
  );
}
