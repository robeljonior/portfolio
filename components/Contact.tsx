// components/Contact.tsx
"use client";

import { useState } from "react";
import { useReveal } from "@/lib/UseReveal";

export default function Contact() {
  const reveal = useReveal();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("robelmamoshet@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  };

  return (
    <section
      id="contact"
      className="bg-gold px-5 py-20 sm:px-8 sm:py-28 lg:px-10"
    >
      <div className="mx-auto max-w-[1180px]">
        <div ref={reveal.ref} className={reveal.className}>
          <div className="eyebrow flex items-center gap-3 text-ink/70">
            <span className="h-px w-7 bg-ink" />
            05 / open channel
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_.7fr] lg:items-end">
            <div>
              <h2 className="max-w-[700px] text-[clamp(2.8rem,6vw,5.5rem)] font-extrabold leading-[.95] tracking-[-.08em] text-ink">
                Have a hard system problem?
              </h2>
              <p className="mt-6 max-w-[470px] text-base leading-7 text-[#38545a]">
                Tell me what is failing, what is changing, or what needs to exist next.
                I like the part where the constraints become clear.
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

          <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-[#bb8e28] pt-5">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.14em] text-[#38545a]">
              📍 Addis Ababa, Ethiopia
            </div>

            <div className="flex items-center gap-5">
              <a
                href="https://github.com/robeljonior"
                target="_blank"
                rel="noreferrer"
                className="text-ink transition-colors hover:text-paper"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/robel-mamoshet-90990b287/"
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
