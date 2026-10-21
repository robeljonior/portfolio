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
      data-nav-theme="light"
      className="border-y border-[#d5d4c9] bg-sand px-5 py-20 sm:px-8 sm:py-28 lg:px-10"
    >
      <div
        ref={reveal.ref}
        className={`mx-auto max-w-[1180px] ${reveal.className}`}
      >
        <SectionLabel>01 / overview</SectionLabel>

        <div className="mt-9 grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-24">
          <h2 className="max-w-[330px] text-3xl font-extrabold leading-[1.05] tracking-[-.065em] sm:text-4xl">
            Backend systems for work that matters.
          </h2>

          <div className="max-w-[700px]">
            <p className="text-xl leading-[1.45] tracking-[-.025em] text-teal-line sm:text-2xl">
              APIs, integrations, payment flows, and the infrastructure behind digital
              channels. I build the connective tissue between a product promise and a
              result that must be right.
            </p>

            <p className="mt-6 max-w-[610px] text-sm leading-7 text-[#64736e]">
              I am a backend software engineer at Atlas Computer Technology, building
              banking systems for Hijra, Wegagen, Enat and Siinqee Bank. I work across
              Go (Gin), Java, Spring Boot, Jakarta EE, Node.js, Kafka, ActiveMQ, Apache
              Camel, Camunda, PostgreSQL, Redis and Cassandra, with a focus on transaction
              correctness, reliable integrations and clean service boundaries.
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
