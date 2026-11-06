"use client";

import { Bot, FileText, Mail } from "lucide-react";
import { openChat } from "./ChatTwin";
import PillLink from "./PillLink";
import { useEffect, useState } from "react";
import { CV_URL, EMAIL, GITHUB_URL, LINKEDIN_URL, OVERLAP, PITCH } from "@/lib/Data";
import SocialIcon from "@/components/ui/SocialIcon";
import LocalTime from "./LocalTime";
import ThemeToggle from "./ThemeToggle";
import SplitText from "./SplitText";
import Typewriter from "./Typewriter";

const ROLES = ["Full stack developer", "Fintech systems", "Fintech integration", "System architecture"];

const NAV = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
];

/** `avatar` is the public path of the profile photo, or null to show the monogram. */
export default function Sidebar({ avatar }: { avatar: string | null }) {
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
        <div className="relative mb-6 h-24 w-24 animate-rise sm:h-28 sm:w-28">
          <div className="h-full w-full rounded-full bg-gradient-to-br from-gold via-gold/40 to-transparent p-[3px]">
            <div className="grid h-full w-full place-items-center overflow-hidden rounded-full bg-raised ring-4 ring-ground">
              {avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={avatar} alt="Robel Mamushet" width={112} height={112} className="h-full w-full object-cover" />
              ) : (
                <span className="text-3xl font-semibold tracking-tight text-gold" aria-hidden="true">
                  RM
                </span>
              )}
            </div>
          </div>
          <span
            className="absolute bottom-1.5 right-1.5 h-4 w-4 rounded-full border-[3px] border-ground bg-[#3aa55d]"
            title="Open to remote roles"
            aria-hidden="true"
          />
        </div>
        <h1 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
          <a href="/" className="text-ink">
            <SplitText text="Robel Mamushet" />
          </a>
        </h1>
        <p className="mt-3 min-h-[1.75rem] animate-rise text-lg font-medium [animation-delay:80ms] tracking-[-0.02em] text-gold sm:min-h-[2rem] sm:text-xl">
          <Typewriter phrases={ROLES} />
        </p>
        <p className="mt-4 max-w-[34ch] animate-rise [animation-delay:160ms] leading-relaxed text-muted">{PITCH}</p>

        <dl className="mt-6 animate-rise space-y-1.5 text-sm [animation-delay:240ms]">
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

        <button
          type="button"
          onClick={openChat}
          data-magnetic
          className="press group mt-6 inline-flex animate-rise items-center gap-2.5 rounded-full border border-gold/30 bg-gold/[0.06] py-1.5 pl-1.5 pr-4 text-sm text-ink transition-colors [animation-delay:280ms] hover:border-gold/60 hover:bg-gold/[0.12]"
        >
          <span className="grid h-7 w-7 place-items-center rounded-full bg-gold text-onaccent">
            <Bot className="h-4 w-4" />
          </span>
          Chat with my AI twin
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-gold">Ask anything</span>
        </button>

        <nav aria-label="Sections" className="mt-10 hidden animate-rise [animation-delay:320ms] lg:block">
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

      <div className="mt-8 flex animate-rise flex-wrap items-center gap-2 [animation-delay:400ms] lg:mt-0">
        <PillLink href={`mailto:${EMAIL}`}>
          <Mail className="h-4 w-4" /> Email me
        </PillLink>
        <PillLink href={CV_URL} download tone="ghost">
          <FileText className="h-4 w-4" /> CV
        </PillLink>
        <a href={GITHUB_URL} target="_blank" rel="noreferrer" aria-label="GitHub" className="press grid h-9 w-9 place-items-center rounded-md text-muted transition-colors hover:bg-raised hover:text-ink">
          <SocialIcon iconKey="github" className="h-5 w-5" />
        </a>
        <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="press grid h-9 w-9 place-items-center rounded-md text-muted transition-colors hover:bg-raised hover:text-ink">
          <SocialIcon iconKey="linkedin" className="h-5 w-5" />
        </a>
        <ThemeToggle />
      </div>
    </header>
  );
}
