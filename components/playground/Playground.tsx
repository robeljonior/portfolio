"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const Loading = () => <div className="h-72 animate-pulse rounded-xl bg-veil/[0.04]" />;

/* Each demo loads only when its tab is opened. */
const DEMOS = [
  { id: "ussd", label: "USSD session", blurb: "Dial a real USSD flow and watch each request cross the gateway.", C: dynamic(() => import("@/components/site/UssdDemo"), { loading: Loading }) },
  { id: "idem", label: "Payment idempotency", blurb: "Why a retried payment must never move money twice.", C: dynamic(() => import("./Idempotency"), { loading: Loading }) },
  { id: "cache", label: "Redis caching", blurb: "Cache-aside reads, TTLs, and invalidating on write.", C: dynamic(() => import("./Cache"), { loading: Loading }) },
  { id: "kafka", label: "Kafka message flow", blurb: "Partitions, ordering by key, consumer groups and lag.", C: dynamic(() => import("./Kafka"), { loading: Loading }) },
];

export default function Playground() {
  const [tab, setTab] = useState(DEMOS[0].id);
  const active = DEMOS.find((d) => d.id === tab)!;

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
      <div role="tablist" aria-label="Demos" aria-orientation="vertical" className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
        {DEMOS.map((d, i) => {
          const on = d.id === tab;
          return (
            <button
              key={d.id}
              id={`tab-${d.id}`}
              role="tab"
              aria-selected={on}
              aria-controls={`panel-${d.id}`}
              tabIndex={on ? 0 : -1}
              onClick={() => setTab(d.id)}
              onKeyDown={(e) => {
                const dir = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
                if (!dir) return;
                e.preventDefault();
                const next = DEMOS[(i + dir + DEMOS.length) % DEMOS.length];
                setTab(next.id);
                document.getElementById(`tab-${next.id}`)?.focus();
              }}
              className={`shrink-0 rounded-xl border px-4 py-3 text-left transition-colors lg:shrink ${
                on ? "border-mint/50 bg-mint/[0.08]" : "border-veil/[0.08] hover:border-veil/20"
              }`}
            >
              <span className="flex items-center gap-2 text-sm text-ink">
                <span className="font-mono text-[10px] text-mint">{String(i + 1).padStart(2, "0")}</span>
                {d.label}
              </span>
              <span className="mt-1 hidden text-xs leading-5 text-muted lg:block">{d.blurb}</span>
            </button>
          );
        })}
      </div>

      <div id={`panel-${active.id}`} role="tabpanel" aria-labelledby={`tab-${active.id}`} className="theme-dark glass glow min-w-0 rounded-2xl bg-ground p-4 sm:p-6">
        <p className="mb-5 text-sm leading-6 text-muted lg:hidden">{active.blurb}</p>
        <active.C />
      </div>
    </div>
  );
}
