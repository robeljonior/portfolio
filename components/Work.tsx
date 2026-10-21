"use client";

import Link from "next/link";
import { useReveal } from "@/lib/UseReveal";
import { PROJECTS } from "@/lib/Data";
import SectionLabel from "./ui/SectionLabel";

export default function Work() {
  const reveal = useReveal();
  const featured = PROJECTS.filter((p) => p.featured);
  const more = PROJECTS.filter((p) => !p.featured);

  return (
    <section id="work" data-nav-theme="dark" className="bg-ink px-5 py-20 text-paper sm:px-8 sm:py-28 lg:px-10">
      <div className="mx-auto max-w-[1180px]">
        <div ref={reveal.ref} className={reveal.className}>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionLabel inverse>03 / case studies</SectionLabel>
              <h2 className="mt-6 max-w-[590px] text-3xl font-extrabold leading-[1.02] tracking-[-.07em] sm:text-5xl">
                Practical architecture.<br /><span className="text-gold-bright">Visible consequences.</span>
              </h2>
            </div>
            <p className="max-w-[260px] font-mono text-[10px] leading-6 text-[#adbbb5]">
              Production banking work for Ethiopian banks. Details stay high-level where client work is confidential.
            </p>
          </div>

          <div className="mt-14 grid gap-4 lg:grid-cols-3">
            {featured.map((project) => (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className="group flex flex-col border border-[#47646a] bg-white/[0.03] p-6 transition-colors hover:border-gold-bright"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-gold-bright">{project.number}</span>
                  <span className="text-gold" aria-hidden="true">{project.icon}</span>
                </div>
                <p className="mt-6 font-mono text-[9px] uppercase tracking-[.13em] text-[#aebdb7]">{project.eyebrow}</p>
                <h3 className="mt-2 text-2xl font-bold leading-tight tracking-[-.04em] transition-colors group-hover:text-gold-bright">
                  {project.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-[#b9c7c1]">{project.body}</p>
                {project.caseStudy && (
                  <p className="mt-5 border-l border-gold-bright pl-3 text-sm leading-6 text-paper">
                    {project.caseStudy.result}
                  </p>
                )}
                <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-[2px] border border-[#527078] px-2.5 py-1 font-mono text-[9px] text-[#d3dfd9]">
                      {tag}
                    </span>
                  ))}
                  <span className="ml-auto font-mono text-[10px] text-gold-bright">read ↗</span>
                </div>
              </Link>
            ))}
          </div>

          {more.length > 0 && (
            <>
              <p className="mt-16 font-mono text-[10px] uppercase tracking-[.16em] text-[#aebdb7]">More work</p>
              <div className="mt-4 grid border-y border-[#47646a]">
                {more.map((project, index) => (
                  <Link
                    key={project.slug}
                    href={`/work/${project.slug}`}
                    className={`group grid gap-3 py-5 transition-colors hover:bg-white/[0.03] md:grid-cols-[70px_1fr_1.1fr_180px] md:items-center md:gap-8 ${
                      index < more.length - 1 ? "border-b border-[#47646a]" : ""
                    }`}
                  >
                    <span className="font-mono text-[11px] text-gold-bright">{project.number}</span>
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[.13em] text-[#aebdb7]">{project.eyebrow}</p>
                      <h3 className="mt-1 text-lg font-bold tracking-[-.04em] transition-colors group-hover:text-gold-bright">{project.title}</h3>
                    </div>
                    <p className="max-w-[430px] text-sm leading-6 text-[#b9c7c1]">{project.body}</p>
                    <div className="flex flex-wrap gap-2 md:justify-end">
                      {project.tags.map((tag) => (
                        <span key={tag} className="rounded-[2px] border border-[#527078] px-2.5 py-1 font-mono text-[9px] text-[#d3dfd9]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
