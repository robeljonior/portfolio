// components/Hero.tsx
"use client";

import { useEffect, useState } from "react";
import { AVAILABILITY, CV_URL, EMAIL, SOCIALS, TECH } from "@/lib/Data";
import SocialIcon from "./ui/SocialIcon";

function HeroIllustration() {
  return (
    <div className="relative flex h-[420px] w-full max-w-[560px] items-center justify-center">
      {/* soft warm glow, not purple */}
      <div className="absolute inset-0 animate-pulse-glow rounded-full bg-gradient-to-tr from-[#e6c669]/40 via-[#e58b68]/25 to-[#1e4f57]/25 blur-[90px]" />

      {/* big gear */}
      <svg
        viewBox="0 0 100 100"
        className="absolute right-4 top-2 h-32 w-32 animate-spin-slow text-[#0d262b]/15"
      >
        <path
          fill="currentColor"
          d="M50 8l6 10 12-2 2 12 10 6-6 10 6 10-10 6-2 12-12-2-6 10-6-10-12 2-2-12-10-6 6-10-6-10 10-6 2-12 12 2z"
        />
        <circle cx="50" cy="50" r="12" fill="#edeae1" />
      </svg>

      {/* small gear */}
      <svg
        viewBox="0 0 100 100"
        className="absolute bottom-4 left-0 h-24 w-24 animate-float-slow text-[#0d262b]/20"
      >
        <path
          fill="currentColor"
          d="M50 8l6 10 12-2 2 12 10 6-6 10 6 10-10 6-2 12-12-2-6 10-6-10-12 2-2-12-10-6 6-10-6-10 10-6 2-12 12 2z"
        />
        <circle cx="50" cy="50" r="12" fill="#edeae1" />
      </svg>

      {/* laptop card — now teal ink instead of indigo */}
      <div className="relative z-10 animate-float">
        <div className="rounded-2xl border border-[#0d262b]/10 bg-ink p-1 shadow-[0_30px_80px_-30px_rgba(13,38,43,0.55)]">
          <div className="rounded-xl bg-[#132f34] p-4">
            <div className="flex gap-1.5 pb-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#e58b68]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#e6c669]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#7de08a]" />
            </div>
            <div className="space-y-2 font-mono text-[10px] leading-relaxed">
              <p className="text-[#e6c669]">
                const <span className="text-[#7de08a]">dev</span> = {"{"}
              </p>
              <p className="pl-3 text-[#95a6a2]">
                stack: <span className="text-[#f0d482]">&quot;Spring Boot&quot;</span>,
              </p>
              <p className="pl-3 text-[#95a6a2]">
                focus: <span className="text-[#f0d482]">&quot;Fintech&quot;</span>,
              </p>
              <p className="text-[#e6c669]">{"}"};</p>
            </div>
          </div>
          <div className="mx-auto mt-1 h-2 w-3/4 rounded-b-xl bg-[#0a1a1c]" />
        </div>
      </div>

      {/* phone */}
      <div className="absolute -right-2 top-1/2 z-20 h-40 w-20 -translate-y-1/2 animate-float-slow rounded-3xl border border-[#0d262b]/10 bg-ink p-1 shadow-2xl">
        <div className="flex h-full flex-col items-center justify-center rounded-[20px] bg-[#132f34]">
          <div className="mb-2 h-1 w-8 rounded-full bg-[#2d565d]" />
          <div className="h-16 w-12 rounded-lg bg-gradient-to-br from-[#e6c669]/40 to-[#1e4f57]/40" />
        </div>
      </div>

      {/* code bubble */}
      <div className="absolute bottom-16 left-4 z-20 flex h-16 w-16 animate-float items-center justify-center rounded-2xl bg-[#1e4f57] font-mono text-lg font-bold text-[#f0d482] shadow-xl">
        {"</>"}
      </div>

      {/* settings chip */}
      <div className="absolute left-8 top-8 z-20 flex h-12 w-12 animate-float-slow items-center justify-center rounded-xl bg-[#1e4f57] shadow-lg">
        <svg viewBox="0 0 24 24" fill="none" stroke="#f0d482" strokeWidth="1.8" className="h-5 w-5">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" />
        </svg>
      </div>

      {/* cloud chip */}
      <div className="absolute right-12 top-4 z-20 flex h-14 w-14 animate-float items-center justify-center rounded-xl bg-[#1e4f57] shadow-lg">
        <svg viewBox="0 0 24 24" fill="none" stroke="#f0d482" strokeWidth="1.8" className="h-6 w-6">
          <path d="M18 16a4 4 0 0 0 0-8 6 6 0 0 0-11.6 1.5A4 4 0 0 0 6 16Z" />
          <path d="M12 12v6m0 0-2.5-2.5M12 18l2.5-2.5" />
        </svg>
      </div>
    </div>
  );
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section id="top" data-nav-theme="light" className="relative overflow-hidden bg-paper">
      {/* faint dot grid, warm-tinted */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(13,38,43,0.08) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(ellipse at 60% 40%, black 20%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid min-h-screen max-w-[1180px] grid-cols-1 items-center gap-12 px-6 pb-24 pt-32 lg:grid-cols-2 lg:gap-8 lg:px-10">
        {/* LEFT — copy */}
        <div className={mounted ? "animate-fade-up" : "opacity-0"}>
          <p className="inline-flex items-center gap-2 rounded-full border border-[#0d262b]/15 bg-white/50 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[.14em] text-[#38545a]">
            <span className="h-2 w-2 rounded-full bg-[#2f9e5b]" aria-hidden="true" />
            {AVAILABILITY}
          </p>

          <h1 className="mt-6 text-4xl font-extrabold leading-[1.04] tracking-[-.06em] text-ink sm:text-5xl lg:text-6xl">
            Backend engineer building <span className="text-teal-mid">banking systems</span> in Go and Java.
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-[#4d5f5a]">
            I ported a production USSD gateway from Java to Go, with{" "}
            <strong className="font-semibold text-ink">12 behaviour differences caught before release</strong>.
            Nearly 4 years building payment, USSD and core banking integrations for{" "}
            <strong className="font-semibold text-ink">4 Ethiopian banks</strong>.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {TECH.map((t) => (
              <span
                key={t}
                className="rounded-full border border-[#0d262b]/15 bg-white/50 px-3.5 py-1.5 text-xs font-medium text-[#38545a] backdrop-blur transition hover:border-[#1e4f57] hover:text-ink"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-lg bg-ink px-5 py-3 text-sm font-semibold text-gold-bright shadow-[0_10px_30px_-15px_rgba(13,38,43,0.6)] transition hover:bg-teal-mid"
            >
              See case studies
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 transition group-hover:translate-y-0.5">
                <path d="M12 5v14m0 0-6-6m6 6 6-6" />
              </svg>
            </a>
            <a
              href={CV_URL}
              download
              className="inline-flex items-center gap-2 rounded-lg border border-[#0d262b]/20 bg-white/50 px-5 py-3 text-sm font-semibold text-ink backdrop-blur transition hover:border-ink hover:bg-white/70"
            >
              Download CV
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 px-1 py-3 text-sm font-semibold text-teal-mid transition hover:text-ink"
            >
              Email me <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="mt-8 flex gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#0d262b]/15 bg-white/40 text-[#38545a] backdrop-blur transition hover:border-ink hover:text-ink"
              >
                <SocialIcon iconKey={s.iconKey} />
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT — illustration */}
        <div className={mounted ? "animate-fade-up [animation-delay:200ms]" : "opacity-0"}>
          <HeroIllustration />
        </div>
      </div>
    </section>
  );
}
