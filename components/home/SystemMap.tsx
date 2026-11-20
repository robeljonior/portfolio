"use client";

import { useState } from "react";
import { ARCH_EDGES, ARCH_FLOW, ARCH_NODES, nodeById } from "@/lib/architecture";

const W = 100;
const H = 100;
const STEP = 0.9; // seconds per hop of the payment packet
const TOTAL = ARCH_FLOW.length * STEP;

/**
 * Flat SVG version of the hero system: the fallback for phones, reduced motion
 * and browsers without WebGL. Hover or focus a service to see what it does.
 */
export default function SystemMap({ className = "" }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const focus = active ? nodeById(active) : null;

  return (
    <figure className={`relative ${className}`}>
      <svg viewBox={`-4 -6 ${W + 8} ${H + 14}`} className="h-full w-full overflow-visible" role="img" aria-labelledby="sysmap-title">
        <title id="sysmap-title">
          A payment request travelling from a client through an API gateway, auth, payment and transaction services to the
          database, with events sent through a message broker to a notification service.
        </title>
        {ARCH_EDGES.map(([a, b]) => {
          const p = nodeById(a);
          const q = nodeById(b);
          const lit = active === a || active === b;
          return (
            <line
              key={`${a}-${b}`}
              x1={p.x}
              y1={p.y}
              x2={q.x}
              y2={q.y}
              className={`transition-[stroke,stroke-opacity] duration-300 stroke-mint`}
              strokeOpacity={lit ? 0.9 : 0.4}
              strokeWidth={0.35}
              strokeDasharray="1 1.2"
            />
          );
        })}

        {ARCH_FLOW.map(([a, b], i) => {
          const p = nodeById(a);
          const q = nodeById(b);
          return (
            <circle key={`pkt-${i}`} r={0.9} className="arch-packet fill-gold" opacity={0}>
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur={`${STEP}s`} begin={`${i * STEP}s;pkt${i}.begin+${TOTAL}s`} id={`pkt${i}`} />
              <animateMotion dur={`${STEP}s`} begin={`${i * STEP}s;pkt${i}.begin+${TOTAL}s`} path={`M${p.x},${p.y} L${q.x},${q.y}`} />
            </circle>
          );
        })}

        {ARCH_NODES.map((n) => {
          const on = active === n.id;
          return (
            <g
              key={n.id}
              tabIndex={0}
              role="button"
              aria-label={`${n.label}: ${n.role}`}
              onMouseEnter={() => setActive(n.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(n.id)}
              onBlur={() => setActive(null)}
              className="cursor-default outline-none"
            >
              <circle cx={n.x} cy={n.y} r={on ? 4.4 : 3.6} className={`transition-colors duration-300 ${on ? "fill-mint/15 stroke-mint" : "fill-ground stroke-mint/50"}`} strokeWidth={0.4} />
              <circle cx={n.x} cy={n.y} r={1.2} className={n.id === "payment" || n.id === "transaction" ? "fill-gold" : "fill-mint"} />
              <text x={n.x} y={n.y + 8} textAnchor="middle" className={`font-mono transition-colors ${on ? "fill-ink" : "fill-muted"}`} style={{ fontSize: 2.6 }}>
                {n.label}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="pointer-events-none mt-2 min-h-[2.5rem] text-center text-xs leading-5 text-muted" aria-live="polite">
        {focus ? (
          <>
            <span className="text-ink">{focus.label}</span> · {focus.role} <span className="font-mono text-mint">{focus.tech}</span>
          </>
        ) : (
          <span className="text-faint">One payment request, end to end. Hover a service.</span>
        )}
      </figcaption>
    </figure>
  );
}
