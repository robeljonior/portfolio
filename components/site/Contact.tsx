"use client";

import { Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { EMAIL } from "@/lib/Data";
import Section from "./Section";

const field =
  "mt-1.5 block w-full rounded-md border border-rule bg-panel px-3 py-2.5 text-sm text-ink outline-none transition-colors duration-150 placeholder:text-faint hover:border-rule-strong focus:border-gold";

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
    <Section id="contact" title="Contact">
      <p className="text-xl font-semibold tracking-[-0.025em]">Let&apos;s build something dependable.</p>
      <p className="mt-2 text-[15px] leading-7 text-muted">
        Hiring for any role in backend development, frontend development, or system architecture? Need someone with experience in banking and fintech integrations? Feel free to contact me. I’ll respond immediately
      </p>

      <form onSubmit={submit} noValidate className="mt-6 grid gap-4 sm:grid-cols-2">
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
          <button type="submit" className="press inline-flex items-center gap-2 rounded-md bg-gold px-4 py-2 text-sm font-semibold text-ground transition-colors hover:bg-[#f0d482]">
            <Send className="h-4 w-4" /> Send
          </button>
          <p className="text-xs text-faint" role="status" aria-live="polite">
            {error ? <span className="text-[#e59a8f]">{error}</span> : opened ? "Your email app should open now." : "Opens your email app with the message filled in."}
          </p>
        </div>
      </form>
    </Section>
  );
}
