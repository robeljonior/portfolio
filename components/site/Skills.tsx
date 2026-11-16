"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { PROJECTS, STACK_GROUPS } from "@/lib/Data";
import TechIcon from "./TechIcon";

/* Loose match so "Go (Gin)" finds projects tagged "Go" or "Gin", "Jenkins" finds "Jenkins CI/CD", etc. */
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
function usedIn(skill: string) {
  const parts = norm(skill).split(" ").filter((p) => p.length > 1 && !["ee", "apis", "design", "systems"].includes(p));
  return PROJECTS.filter((p) => {
    const hay = norm([...p.tags, ...p.details.stack, p.title, p.body].join(" "));
    return parts.some((part) => new RegExp(`\\b${part}\\b`).test(hay));
  });
}

/** Skills by category. Hover or focus one to see the projects where it was used. */
export default function Skills() {
  const [skill, setSkill] = useState<string | null>(null);
  const projects = useMemo(() => (skill ? usedIn(skill) : []), [skill]);

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_240px]">
      <dl className="glass divide-y divide-veil/[0.06] rounded-2xl px-5 sm:px-6">
        {STACK_GROUPS.map((group) => (
          <div key={group.label} data-reveal className="grid gap-3 py-4 sm:grid-cols-[170px_1fr]">
            <dt className="text-sm text-muted">{group.label}</dt>
            <dd className="flex flex-wrap gap-1.5">
              {group.values.map((value) => {
                const on = skill === value;
                return (
                  <button
                    key={value}
                    type="button"
                    onMouseEnter={() => setSkill(value)}
                    onFocus={() => setSkill(value)}
                    onClick={() => setSkill(on ? null : value)}
                    aria-pressed={on}
                    className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-[11px] transition-colors duration-150 ${
                      on ? "border-mint/60 bg-mint/10 text-ink" : "border-veil/[0.08] bg-veil/[0.04] text-muted hover:text-ink"
                    }`}
                  >
                    <TechIcon name={value} />
                    {value}
                  </button>
                );
              })}
            </dd>
          </div>
        ))}
      </dl>

      <aside aria-live="polite" className="xl:sticky xl:top-28 xl:self-start">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-faint">{skill ? `Used in · ${skill}` : "Used in"}</p>
        {skill ? (
          projects.length ? (
            <ul className="mt-3 space-y-2">
              {projects.map((p) => (
                <li key={p.slug} className="animate-rise">
                  <Link href={`/work/${p.slug}`} className="block rounded-lg border border-veil/[0.08] px-3 py-2 text-sm leading-5 text-ink transition-colors hover:border-mint/50">
                    <span className="block font-mono text-[10px] text-mint">{p.eyebrow}</span>
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm leading-6 text-muted">Day-to-day work across the banking systems at Atlas.</p>
          )
        ) : (
          <p className="mt-3 text-sm leading-6 text-muted">Pick a skill to see where I used it.</p>
        )}
      </aside>
    </div>
  );
}
