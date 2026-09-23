"use client";

import { useEffect, useRef, useState } from "react";

type Step = { label: string; text: string };

export default function ProcessFlow({ steps }: { steps: Step[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setInView(true),
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || paused) return;
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % steps.length);
    }, 2600);
    return () => clearInterval(id);
  }, [inView, paused, steps.length]);

  return (
    <div
      ref={wrapRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="mt-6"
    >
      <div className="relative flex items-center justify-between">
        <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-[#3a5259]" />
        <div
          className="absolute left-0 top-1/2 h-px -translate-y-1/2 bg-gold-bright transition-all duration-700 ease-out"
          style={{
            width: inView ? `${(active / (steps.length - 1)) * 100}%` : "0%",
          }}
        />
        {steps.map((step, i) => (
          <button
            key={step.label}
            onClick={() => setActive(i)}
            className="group relative z-10 flex flex-col items-center gap-3"
            aria-label={step.label}
          >
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full border font-mono text-[10px] transition-all duration-500 ${
                i <= active
                  ? "scale-110 border-gold-bright bg-gold-bright text-ink"
                  : "border-[#527078] bg-ink text-[#8fa39d]"
              } ${i === active ? "shadow-[0_0_0_4px_rgba(212,175,55,0.15)]" : ""}`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-3 flex justify-between">
        {steps.map((step, i) => (
          <span
            key={step.label}
            className={`w-20 text-center font-mono text-[9px] uppercase tracking-[.08em] transition-colors duration-500 sm:w-28 ${
              i === active ? "text-gold-bright" : "text-[#6c827c]"
            }`}
          >
            {step.label}
          </span>
        ))}
      </div>

      <div className="relative mt-8 h-[72px] overflow-hidden rounded-[2px] border border-[#3a5259] bg-white/[0.02] px-5 py-4">
        {steps.map((step, i) => (
          <p
            key={step.label}
            className={`absolute inset-x-5 top-4 text-sm leading-6 text-[#c3d0ca] transition-all duration-500 ${
              i === active ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
          >
            {step.text}
          </p>
        ))}
      </div>
    </div>
  );
}