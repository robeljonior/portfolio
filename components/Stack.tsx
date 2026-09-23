// components/Stack.tsx
"use client";

import { useReveal } from "@/lib/UseReveal";
import { STACK_GROUPS, PRINCIPLES } from "@/lib/Data";
import SectionLabel from "./ui/SectionLabel";

export default function Stack() {
  const reveal = useReveal();

  return (
    <section
      id="stack"
      className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8 sm:py-28 lg:px-10"
    >
      <div ref={reveal.ref} className={reveal.className}>
        <SectionLabel>03 / the toolkit</SectionLabel>

        <div className="mt-9 grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-24">
          <div>
            <h2 className="text-3xl font-extrabold leading-[1.04] tracking-[-.065em] sm:text-4xl">
              Familiar tools.
              <br />
              <span className="text-teal-mid">Unfamiliar care.</span>
            </h2>
            <p className="mt-6 max-w-[330px] text-sm leading-7 text-[#697773]">
              The language matters less than the shape of the system. These are the
              tools I reach for when the shape is clear.
            </p>
          </div>

          <div className="grid gap-0 border-t border-[#c7cbc0] sm:grid-cols-2">
            {STACK_GROUPS.map((group, index) => (
              <div
                key={group.label}
                className={`border-b border-[#c7cbc0] py-6 ${
                  index % 2 === 0 ? "sm:border-r sm:pr-10" : "sm:pl-10"
                }`}
              >
                <p className="font-mono text-[10px] uppercase tracking-[.16em] text-gold-dim">
                  {group.label}
                </p>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                  {group.values.map((value) => (
                    <span
                      key={value}
                      className="text-lg font-semibold tracking-[-.03em] text-teal-line"
                    >
                      {value}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 grid border border-[#c7cbc0] bg-[#eef0e8] sm:grid-cols-3">
          {PRINCIPLES.map((item, index) => (
            <div
              key={item.title}
              className={`flex gap-4 p-6 ${
                index < 2 ? "border-b sm:border-b-0 sm:border-r" : ""
              }`}
            >
              <span className="mt-0.5 shrink-0 text-gold-dim" aria-hidden="true">
                {item.icon}
              </span>
              <div>
                <h3 className="text-sm font-bold tracking-[-.02em]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#697773]">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
