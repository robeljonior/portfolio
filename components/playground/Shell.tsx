import type { ReactNode } from "react";

/** Common frame for a playground demo: the controls/visual, then a short "why it matters". */
export function DemoNote({ children }: { children: ReactNode }) {
  return (
    <p className="mt-5 border-l-2 border-mint/50 pl-4 text-sm leading-6 text-muted">
      <span className="font-medium text-ink">Why it matters: </span>
      {children}
    </p>
  );
}

export function LogLine({ tone = "info", children }: { tone?: "info" | "ok" | "warn" | "bad"; children: ReactNode }) {
  const color = { info: "text-muted", ok: "text-lcd", warn: "text-mint", bad: "text-error" }[tone];
  return <li className={`animate-rise font-mono text-[12px] leading-5 ${color}`}>{children}</li>;
}

export const btn =
  "press inline-flex items-center gap-2 rounded-full border border-veil/15 px-3.5 py-1.5 text-xs font-medium text-ink transition-colors hover:border-mint/60 hover:bg-mint/10 disabled:opacity-40";
export const btnSolid =
  "press inline-flex items-center gap-2 rounded-full bg-ink px-3.5 py-1.5 text-xs font-semibold text-ground transition-colors hover:bg-mint hover:text-onaccent disabled:opacity-40";
