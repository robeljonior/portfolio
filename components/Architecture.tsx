"use client";

import { useState } from "react";
import { useReveal } from "@/lib/UseReveal";
import SectionLabel from "./ui/SectionLabel";

const NODES = [
  { id: "client", label: "Client / channel", detail: "Web, mobile, or USSD request enters through a controlled boundary." },
  { id: "api", label: "API boundary", detail: "Authentication, validation, rate limits, and idempotency protect the operation." },
  { id: "service", label: "Domain service", detail: "Business rules live in a focused service layer with explicit state transitions." },
  { id: "event", label: "Kafka / queue", detail: "Asynchronous work is published for reliable downstream processing." },
  { id: "data", label: "Database / Redis", detail: "Durable state and short-lived session or cache data are handled separately." },
  { id: "partner", label: "External system", detail: "Partner and financial systems receive a traceable, validated request." },
];

export default function Architecture() {
  const reveal = useReveal();
  const [active, setActive] = useState("api");
  const activeNode = NODES.find((node) => node.id === active) ?? NODES[1];

  return (
    <section id="architecture" data-nav-theme="dark" className="bg-teal-deep px-5 py-20 text-paper sm:px-8 sm:py-28 lg:px-10">
      <div ref={reveal.ref} className={`mx-auto max-w-[1180px] ${reveal.className}`}>
        <SectionLabel inverse>05 / architecture notes</SectionLabel>
        <div className="mt-9 grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-24">
          <div>
            <h2 className="text-3xl font-extrabold leading-[1.04] tracking-[-.065em] sm:text-4xl">Think beyond the endpoint.</h2>
            <p className="mt-6 max-w-[360px] text-sm leading-7 text-[#b9c7c1]">Reliable financial software is a sequence of boundaries, state changes, and recovery decisions. This is the shape I look for when designing backend systems.</p>
            <div className="mt-8 border-l border-gold-bright pl-4 text-sm leading-6 text-[#d3dfd9]">{activeNode.detail}</div>
          </div>

          <div>
            <div className="grid gap-2 sm:grid-cols-3">
              {NODES.map((node, index) => (
                <button key={node.id} type="button" onClick={() => setActive(node.id)} className={`group relative min-h-[92px] border p-4 text-left transition-colors ${active === node.id ? "border-gold-bright bg-gold text-ink" : "border-[#527078] bg-white/[0.03] hover:border-gold-bright"}`}>
                  <span className={`font-mono text-[10px] ${active === node.id ? "text-ink/60" : "text-gold-bright"}`}>0{index + 1}</span>
                  <span className="mt-3 block text-sm font-semibold leading-5">{node.label}</span>
                  {index < NODES.length - 1 && <span className="absolute -right-2 top-1/2 z-10 hidden text-gold-bright sm:block">→</span>}
                </button>
              ))}
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                ["Idempotency", "Repeatable requests should not duplicate a financial operation."],
                ["Consistency", "State changes need a clear source of truth and recovery path."],
                ["Observability", "Logs, events, and errors should explain what happened."],
              ].map(([title, text]) => (
                <div key={title} className="border-t border-[#527078] pt-4">
                  <p className="font-mono text-[10px] uppercase tracking-[.14em] text-gold-bright">{title}</p>
                  <p className="mt-2 text-xs leading-5 text-[#b9c7c1]">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
