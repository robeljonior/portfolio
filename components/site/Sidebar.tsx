"use client";

import { FileText, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { CV_URL, EMAIL, GITHUB_URL, LINKEDIN_URL, OVERLAP, PITCH, TITLE } from "@/lib/Data";
import SocialIcon from "@/components/ui/SocialIcon";
import LocalTime from "./LocalTime";

const NAV = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
];

export default function Sidebar() {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const sections = NAV.map((item) => document.getElementById(item.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[46%] lg:flex-col lg:justify-between lg:py-24">
      <div>
        <h1 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
          <a href="/" className="text-ink">Robel Mamushet</a>
        </h1>
        <p className="mt-3 text-lg font-medium tracking-[-0.02em] text-gold sm:text-xl">{TITLE}</p>
        <p className="mt-4 max-w-[34ch] leading-relaxed text-muted">{PITCH}</p>

        <dl className="mt-6 space-y-1.5 text-sm">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lcd" aria-hidden="true" />
            <dt className="sr-only">Status</dt>
            <dd className="text-ink">Open to remote roles</dd>
          </div>
          <div className="flex gap-2 text-muted">
            <dt className="sr-only">Local time</dt>
            <dd>
              Addis Ababa · <LocalTime />
            </dd>
          </div>
          <div className="text-muted">
            <dt className="sr-only">Time-zone overlap</dt>
            <dd>{OVERLAP}</dd>
          </div>
        </dl>

        <nav aria-label="Sections" className="mt-14 hidden lg:block">
          <ul className="space-y-1">
            {NAV.map((item) => {
              const on = active === item.id;
              return (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="group flex items-center gap-4 py-2" aria-current={on ? "true" : undefined}>
                    <span
                      className={`h-px transition-[width,background-color] duration-200 ease-out ${
                        on ? "w-16 bg-ink" : "w-8 bg-faint group-hover:w-16 group-hover:bg-ink"
                      }`}
                    />
                    <span
                      className={`font-mono text-xs uppercase tracking-[0.12em] transition-colors duration-200 ${
                        on ? "text-ink" : "text-faint group-hover:text-ink"
                      }`}
                    >
                      {item.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-2 lg:mt-0">
        <a href={`mailto:${EMAIL}`} className="press inline-flex items-center gap-2 rounded-md bg-gold px-4 py-2 text-sm font-semibold text-ground transition-colors hover:bg-[#f0d482]">
          <Mail className="h-4 w-4" /> Email me
        </a>
        <a href={CV_URL} download className="press inline-flex items-center gap-2 rounded-md border border-rule-strong px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-ink">
          <FileText className="h-4 w-4" /> CV
        </a>
        <a href={GITHUB_URL} target="_blank" rel="noreferrer" aria-label="GitHub" className="press grid h-9 w-9 place-items-center rounded-md text-muted transition-colors hover:bg-raised hover:text-ink">
          <SocialIcon iconKey="github" className="h-5 w-5" />
        </a>
        <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="press grid h-9 w-9 place-items-center rounded-md text-muted transition-colors hover:bg-raised hover:text-ink">
          <SocialIcon iconKey="linkedin" className="h-5 w-5" />
        </a>
      </div>
    </header>
  );
}
