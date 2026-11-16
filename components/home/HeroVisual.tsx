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
    <div className="relative mx-auto aspect-square w-full max-w-[600px]">
      <div className={`absolute inset-0 transition-opacity duration-700 ${ready ? "pointer-events-none opacity-0" : "opacity-100"}`} aria-hidden={ready}>
        <SystemMap className="h-full w-full" />
      </div>
      {use3D && (
        <div className={`absolute inset-0 transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}>
          <HeroScene onReady={() => window.setTimeout(() => setReady(true), 150)} />
        </div>
      )}
    </div>
  );
}
