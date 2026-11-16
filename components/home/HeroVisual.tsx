"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import SystemMap from "./SystemMap";

/* Three.js only loads on capable desktops, after the page is idle. */
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

function canRender3D() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (!window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches) return false;
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Right side of the hero. Everyone first sees the light SVG system map;
 * capable desktops then swap in the interactive 3D version.
 */
export default function HeroVisual() {
  const [use3D, setUse3D] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!canRender3D()) return;
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 600));
    const id = idle(() => setUse3D(true));
    return () => (window.cancelIdleCallback ?? window.clearTimeout)(id as number);
  }, []);

  return (
    <div className="world-frame relative mx-auto aspect-square w-full max-w-[640px] overflow-hidden rounded-[2rem] border border-mint/20 bg-panel/45 p-3 shadow-[0_30px_80px_-45px_rgb(var(--mint)/0.6)] sm:p-5">
      <div className="world-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-6 top-5 z-10 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-faint sm:inset-x-9 sm:top-8">
        <span className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-mint shadow-[0_0_12px_rgb(var(--mint)/0.9)]" />Robel systems world</span>
        <span className="hidden sm:inline">Live architecture map</span>
      </div>
      <div className="absolute bottom-5 left-6 z-10 max-w-[13rem] rounded-lg border border-veil/10 bg-ground/60 px-3 py-2 backdrop-blur-md sm:bottom-8 sm:left-9">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-mint">Explore the flow</p>
        <p className="mt-1 text-[11px] leading-4 text-muted">Hover a node to inspect what happens when money moves.</p>
      </div>
      <div className="pointer-events-none absolute bottom-5 right-6 z-10 text-right font-mono text-[10px] uppercase tracking-[0.12em] text-faint sm:bottom-8 sm:right-9">
        <p>Mouse / touch</p>
        <p className="mt-1 text-ink">Inspect · follow · scroll</p>
      </div>
      <div className={`relative z-[1] h-full w-full transition-opacity duration-700 ${ready ? "pointer-events-none opacity-0" : "opacity-100"}`} aria-hidden={ready}>
        <SystemMap className="h-full w-full p-8 sm:p-12" />
      </div>
      {use3D && (
        <div className={`absolute inset-0 z-[1] transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}>
          <HeroScene onReady={() => window.setTimeout(() => setReady(true), 150)} />
        </div>
      )}
    </div>
  );
}
