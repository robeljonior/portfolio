"use client";

import Link from "next/link";
import { useReveal } from "@/lib/UseReveal";
import { SYSTEMS } from "@/lib/Data";
import SectionLabel from "./ui/SectionLabel";

export default function Work() {
  const reveal = useReveal();

  return (
    <section id="work" className="bg-ink px-5 py-20 text-paper sm:px-8 sm:py-28 lg:px-10">
      <div className="mx-auto max-w-[1180px]">
        <div ref={reveal.ref} className={reveal.className}>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionLabel inverse>02 / selected systems</SectionLabel>
              <h2 className="mt-6 max-w-[590px] text-3xl font-extrabold leading-[1.02] tracking-[-.07em] sm:text-5xl">
                Practical architecture.<br /><span className="text-gold-bright">Visible consequences.</span>
              </h2>
            </div>
            <p className="max-w-[250px] font-mono text-[10px] leading-6 text-[#adbbb5]">
              Backend services, payment workflows, enterprise integrations, and production support shaped by four years at Atlas Computer Technology.
            </p>
          </div>

          <div className="mt-14 grid gap-0 border-y border-[#47646a]">
            {SYSTEMS.map((system, index) => (
              <Link
                key={system.number}
                href={`/work/${system.slug}`}
                className={`group grid cursor-pointer gap-6 py-7 transition-colors hover:bg-white/[0.03] md:grid-cols-[70px_1fr_1.1fr_180px] md:items-center md:gap-8 ${
                  index < SYSTEMS.length - 1 ? "border-b border-[#47646a]" : ""
                }`}
              >
                <span className="font-mono text-[11px] text-gold-bright">{system.number}</span>
                <div className="flex items-start gap-3">
                  <span className="mt-1 shrink-0 text-gold" aria-hidden="true">{system.icon}</span>
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[.13em] text-[#aebdb7]">{system.eyebrow}</p>
                    <h3 className="mt-2 text-xl font-bold tracking-[-.04em] transition-colors group-hover:text-gold-bright">{system.title}</h3>
                  </div>
                </div>
                <p className="max-w-[430px] text-sm leading-6 text-[#b9c7c1]">{system.body}</p>
                <div className="flex flex-wrap gap-2 md:justify-end">
                  {system.tags.map((tag) => (
                    <span key={tag} className="rounded-[2px] border border-[#527078] px-2.5 py-1 font-mono text-[9px] text-[#d3dfd9]">
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}