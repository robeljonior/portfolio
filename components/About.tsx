// components/About.tsx
"use client";

import { useReveal } from "@/lib/UseReveal";
import { ABOUT_STATS } from "@/lib/Data";
import SectionLabel from "./ui/SectionLabel";

export default function About() {
  const reveal = useReveal();

  return (
    <section
      id="about"
      className="border-y border-[#d5d4c9] bg-sand px-5 py-20 sm:px-8 sm:py-28 lg:px-10"
    >
      <div
        ref={reveal.ref}
        className={`mx-auto max-w-[1180px] ${reveal.className}`}
      >
        <SectionLabel>01 / the brief</SectionLabel>

        <div className="mt-9 grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-24">
          <h2 className="max-w-[330px] text-3xl font-extrabold leading-[1.05] tracking-[-.065em] sm:text-4xl">
            The work is where things get difficult.
          </h2>

          <div className="max-w-[700px]">
            <p className="text-xl leading-[1.45] tracking-[-.025em] text-teal-line sm:text-2xl">
              Transaction orchestration. Core banking integrations. Message delivery.
              I work on the connective tissue between a product promise and a balance
              that must be right.
            </p>

            <p className="mt-6 max-w-[610px] text-sm leading-7 text-[#64736e]">
              At Atlas Computer Technology, I have spent three years building and
              supporting enterprise backend applications, after one year focused on
              software testing. I work across payment processing, transaction
              management, distributed integrations, production debugging, and release
              quality.
            </p>

            <div className="mt-9 grid grid-cols-2 gap-y-6 border-t border-[#c7cbc0] pt-6 sm:grid-cols-3 sm:gap-5">
              {ABOUT_STATS.map((s) => (
                <div key={s.label}>
                  <p className="text-3xl font-extrabold tracking-[-.07em]">{s.value}</p>
                  <p className="mt-2 font-mono text-[9px] uppercase tracking-[.14em] text-[#788580]">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
