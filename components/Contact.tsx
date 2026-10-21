// components/Contact.tsx
"use client";

import { FormEvent, useState } from "react";
import { useReveal } from "@/lib/UseReveal";
import { GITHUB_URL, LINKEDIN_URL } from "@/lib/Data";

export default function Contact() {
  const reveal = useReveal();
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("robelmamoshet@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  };

  const submitMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get("website")) return;
    if (!data.get("name") || !data.get("email") || !data.get("message")) {
      setStatus("error");
      return;
    }
    setStatus("success");
    const subject = encodeURIComponent(`Portfolio inquiry from ${data.get("name")}`);
    const body = encodeURIComponent(`${data.get("message")}\n\nReply to: ${data.get("email")}`);
    window.location.href = `mailto:robelmamoshet@gmail.com?subject=${subject}&body=${body}`;
    form.reset();
  };

  return (
    <section
      id="contact"
      data-nav-theme="gold"
      className="bg-gold px-5 py-20 sm:px-8 sm:py-28 lg:px-10"
    >
      <div className="mx-auto max-w-[1180px]">
        <div ref={reveal.ref} className={reveal.className}>
            <div className="eyebrow flex items-center gap-3 text-ink/70">
            <span className="h-px w-7 bg-ink" />
              06 / open channel
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_.7fr] lg:items-end">
            <div>
              <h2 className="max-w-[700px] text-[clamp(2.8rem,6vw,5.5rem)] font-extrabold leading-[.95] tracking-[-.08em] text-ink">
                Let&apos;s build something dependable.
              </h2>
              <p className="mt-6 max-w-[470px] text-base leading-7 text-[#38545a]">
                Open to backend engineering roles and thoughtful work on financial,
                enterprise, and distributed systems.
              </p>
            </div>

            <div className="flex flex-col items-start gap-5 lg:items-end">
              <a
                href="mailto:robelmamoshet@gmail.com"
                className="group inline-flex items-center gap-3 border-b-2 border-ink pb-2 text-xl font-bold tracking-[-.04em] text-ink transition-colors hover:text-paper sm:text-2xl"
              >
                robelmamoshet@gmail.com
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                >
                  ↗
                </span>
              </a>

              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.14em] text-[#38545a] transition-colors hover:text-ink"
              >
                <span>{copied ? "✓" : "⧉"}</span>
                <span>{copied ? "copied to clipboard" : "copy email address"}</span>
              </button>
            </div>
          </div>

          <form onSubmit={submitMessage} className="mt-14 grid gap-4 border-t border-[#bb8e28] pt-7 sm:grid-cols-2" noValidate>
            <label className="font-mono text-[10px] uppercase tracking-[.12em] text-[#38545a]">Name<input name="name" required className="mt-2 block w-full border border-[#bb8e28] bg-white/20 px-3 py-3 font-sans text-sm text-ink outline-none placeholder:text-[#64736e] focus:border-ink" placeholder="Your name" /></label>
            <label className="font-mono text-[10px] uppercase tracking-[.12em] text-[#38545a]">Email<input name="email" type="email" required className="mt-2 block w-full border border-[#bb8e28] bg-white/20 px-3 py-3 font-sans text-sm text-ink outline-none placeholder:text-[#64736e] focus:border-ink" placeholder="you@example.com" /></label>
            <label className="sm:col-span-2 font-mono text-[10px] uppercase tracking-[.12em] text-[#38545a]">Message<textarea name="message" required rows={4} className="mt-2 block w-full resize-y border border-[#bb8e28] bg-white/20 px-3 py-3 font-sans text-sm text-ink outline-none placeholder:text-[#64736e] focus:border-ink" placeholder="What are you building?" /></label>
            <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
            <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
              <button type="submit" className="bg-ink px-5 py-3 text-sm font-semibold text-gold-bright hover:bg-teal-mid">Send message ↗</button>
              {status === "success" && <p role="status" className="text-sm text-[#38545a]">Thanks. Your email client is opening.</p>}
              {status === "error" && <p role="alert" className="text-sm text-[#8e3f32]">Please complete your name, email, and message.</p>}
            </div>
          </form>

          <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-[#bb8e28] pt-5">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.14em] text-[#38545a]">
              📍 Addis Ababa, Ethiopia
            </div>

            <div className="flex items-center gap-5">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="text-ink transition-colors hover:text-paper"
              >
                GitHub
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                className="text-ink transition-colors hover:text-paper"
              >
                LinkedIn
              </a>
              <a
                href="mailto:robelmamoshet@gmail.com"
                className="text-ink transition-colors hover:text-paper"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
