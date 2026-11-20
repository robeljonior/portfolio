"use client";

import { Pause, Play, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { FlowHop } from "@/lib/Data";

const HOP_MS = 1100;

/**
 * Interactive architecture diagram: a request travels hop by hop through the
 * system and the response comes back. Click any hop to read what happens there.
 */
export default function RequestFlow({ hops, title = "Follow a request" }: { hops: FlowHop[]; title?: string }) {
  // Positions 0..n-1 go forward, n..2n-2 come back as the response.
  const last = hops.length * 2 - 2;
  const [pos, setPos] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [picked, setPicked] = useState<number | null>(null);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (!playing) return;
    if (pos >= last) {
      setPlaying(false);
      return;
    }
    const id = window.setTimeout(() => setPos((p) => p + 1), pos < 0 ? 150 : reduced.current ? 1600 : HOP_MS);
    return () => window.clearTimeout(id);
  }, [playing, pos, last]);

  const at = pos < 0 ? null : pos < hops.length ? pos : last - pos;
  const returning = pos >= hops.length;
  const shown = picked ?? at;
  const detail = shown === null ? null : hops[shown];

  const start = () => {
    setPicked(null);
    if (pos >= last) setPos(-1);
    setPlaying(true);
  };

  return (
    <div className="glass glow rounded-2xl p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-faint">{title}</p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={playing ? () => setPlaying(false) : start}
            className="press inline-flex items-center gap-2 rounded-full bg-mint px-3.5 py-1.5 text-xs font-semibold text-onaccent transition-colors hover:bg-mint/85"
          >
            {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            {playing ? "Pause" : pos >= last ? "Send again" : pos >= 0 ? "Resume" : "Send a request"}
          </button>
          <button
            type="button"
            onClick={() => {
              setPlaying(false);
              setPos(-1);
              setPicked(null);
            }}
            aria-label="Reset"
            className="press grid h-8 w-8 place-items-center rounded-full text-muted transition-colors hover:bg-veil/[0.06] hover:text-ink"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <ol className="relative mt-6 grid gap-2 sm:grid-flow-col sm:auto-cols-fr sm:gap-0">
        {hops.map((hop, i) => {
          const passed = at !== null && (returning ? i >= at : i <= at);
          const current = at === i;
          const sel = picked === i;
          return (
            <li key={hop.label} className="relative flex items-center sm:flex-col">
              {/* Connector to the next hop. */}
              {i < hops.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute left-[19px] top-10 h-[calc(100%-1rem)] w-px bg-rule-strong sm:left-1/2 sm:top-[19px] sm:h-px sm:w-full"
                >
                  <span
                    className={`absolute inset-0 bg-mint transition-opacity duration-500 ${
                      at !== null && (returning ? i >= at : i < at) ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </span>
              )}
              <button
                type="button"
                onClick={() => setPicked(sel ? null : i)}
                aria-pressed={sel}
                className="group relative z-10 flex items-center gap-3 rounded-lg p-1 text-left sm:flex-col sm:text-center"
              >
                <span
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border font-mono text-[11px] transition-all duration-300 ${
                    current
                      ? "border-gold bg-gold text-onaccent shadow-[0_0_0_4px_rgb(var(--gold)/0.12)]"
                      : passed
                        ? "border-mint/70 bg-mint/15 text-mint"
                        : sel
                          ? "border-mint bg-ground text-mint"
                          : "border-rule-strong bg-ground text-muted group-hover:border-mint/60"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="sm:mt-2 sm:px-1">
                  <span className={`block text-sm leading-5 ${current || sel ? "text-ink" : "text-muted"}`}>{hop.label}</span>
                  <span className="block font-mono text-[10px] text-faint">{hop.tech}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="mt-6 min-h-[4.5rem] rounded-xl border border-veil/[0.08] bg-veil/[0.03] px-4 py-3" aria-live="polite">
        {detail ? (
          <p className="text-sm leading-6 text-ink">
            <span className="mr-2 font-mono text-xs text-mint">
              {returning && picked === null ? "← response" : "→ request"} · {detail.label}
            </span>
            {returning && picked === null && detail.back ? detail.back : detail.note}
          </p>
        ) : (
          <p className="text-sm leading-6 text-faint">Press “Send a request” to watch it travel through the system, or tap any step.</p>
        )}
      </div>
    </div>
  );
}
