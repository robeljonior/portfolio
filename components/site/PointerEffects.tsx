"use client";

import { useEffect, useRef } from "react";

/**
 * Mouse-driven effects, desktop only (fine pointer, motion allowed):
 * - a soft gold spotlight that follows the cursor across the page;
 * - 3D tilt plus a light sheen on cards marked `data-tilt`;
 * - buttons marked `data-magnetic` lean towards the cursor.
 * Touch screens and reduced-motion users get the plain page.
 */
export default function PointerEffects() {
  const spot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    document.documentElement.classList.add("pointer-fx");
    let frame = 0;
    let last: PointerEvent | null = null;

    const update = () => {
      frame = 0;
      const e = last;
      if (!e) return;
      spot.current?.style.setProperty("--mx", `${e.clientX}px`);
      spot.current?.style.setProperty("--my", `${e.clientY}px`);

      const target = e.target instanceof Element ? e.target : null;

      const card = target?.closest<HTMLElement>("[data-tilt]");
      if (card !== activeCard) {
        activeCard?.style.removeProperty("--rx");
        activeCard?.style.removeProperty("--ry");
        activeCard?.classList.remove("tilt-on");
        activeCard = card ?? null;
        activeCard?.classList.add("tilt-on");
      }
      if (card) {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        card.style.setProperty("--rx", `${(0.5 - y) * 6}deg`);
        card.style.setProperty("--ry", `${(x - 0.5) * 8}deg`);
        card.style.setProperty("--cx", `${x * 100}%`);
        card.style.setProperty("--cy", `${y * 100}%`);
      }

      const mag = target?.closest<HTMLElement>("[data-magnetic]");
      if (mag !== activeMag) {
        activeMag?.style.removeProperty("translate");
        activeMag = mag ?? null;
      }
      if (mag) {
        const r = mag.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        mag.style.translate = `${dx * 0.18}px ${dy * 0.28}px`;
      }
    };

    let activeCard: HTMLElement | null = null;
    let activeMag: HTMLElement | null = null;

    const onMove = (e: PointerEvent) => {
      last = e;
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onLeave = () => document.documentElement.classList.remove("pointer-in");
    const onEnter = () => document.documentElement.classList.add("pointer-in");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.documentElement.addEventListener("pointerenter", onEnter);
    onEnter();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.documentElement.removeEventListener("pointerenter", onEnter);
      document.documentElement.classList.remove("pointer-fx", "pointer-in");
    };
  }, []);

  return <div ref={spot} aria-hidden="true" className="cursor-spot" />;
}
