"use client";

import { EDUCATION, EXPERIENCE, LANGUAGES } from "@/lib/Data";
import { useReveal } from "@/lib/UseReveal";
import SectionLabel from "./ui/SectionLabel";

export default function Experience() {
  const reveal = useReveal();

  return (
    <section id="experience" data-nav-theme="light" className="border-y border-[#d5d4c9] bg-paper px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
      <div ref={reveal.ref} className={`mx-auto max-w-[1180px] ${reveal.className}`}>
        <SectionLabel>02 / experience</SectionLabel>

        <div className="mt-9 grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-24">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[.16em] text-gold-dim">{EXPERIENCE.period}</p>
            <h2 className="mt-4 text-3xl font-extrabold leading-[1.04] tracking-[-.065em] sm:text-4xl">
              {EXPERIENCE.role}
            </h2>
            <p className="mt-3 text-lg font-semibold text-teal-mid">{EXPERIENCE.company}</p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[.14em] text-[#788580]">{EXPERIENCE.location}</p>

            <div className="mt-10 border-t border-[#c7cbc0] pt-6">
              <p className="font-mono text-[10px] uppercase tracking-[.16em] text-gold-dim">Education · {EDUCATION.period}</p>
              <p className="mt-3 text-sm font-semibold text-teal-line">{EDUCATION.degree}</p>
              <p className="mt-1 text-sm text-[#64736e]">{EDUCATION.school}</p>
              <p className="mt-6 font-mono text-[10px] uppercase tracking-[.16em] text-gold-dim">Languages</p>
              <p className="mt-3 text-sm text-[#64736e]">{LANGUAGES}</p>
            </div>
          </div>

          <div>
            <p className="max-w-[680px] text-xl leading-[1.45] tracking-[-.025em] text-teal-line sm:text-2xl">
              {EXPERIENCE.summary}
            </p>
            <ul className="mt-8 grid gap-x-8 gap-y-4 border-t border-[#c7cbc0] pt-6 sm:grid-cols-2">
              {EXPERIENCE.responsibilities.map((responsibility) => (
                <li key={responsibility} className="flex gap-3 text-sm leading-6 text-[#64736e]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-dim" aria-hidden="true" />
                  {responsibility}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
