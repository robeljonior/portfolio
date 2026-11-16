"use client";

import { useState } from "react";
import { DemoNote, LogLine, btn, btnSolid } from "./Shell";

type Entry = { tone: "info" | "ok" | "warn" | "bad"; text: string };

/**
 * A payment request whose response is lost on the way back, so the client retries.
 * Without an idempotency key the customer is charged twice.
 */
export default function Idempotency() {
  const [keyed, setKeyed] = useState(true);
  const [balance, setBalance] = useState(5000);
  const [seen, setSeen] = useState<Record<string, string>>({});
  const [log, setLog] = useState<Entry[]>([]);
  const [attempt, setAttempt] = useState<{ key: string; n: number } | null>(null);
  const charges = log.filter((l) => l.text.startsWith("DEBIT")).length;

  const process = (key: string, n: number, lostResponse: boolean) => {
    const out: Entry[] = [{ tone: "info", text: `→ POST /payments  amount=500${keyed ? `  Idempotency-Key: ${key}` : ""}  (try ${n})` }];
    if (keyed && seen[key]) {
      out.push({ tone: "ok", text: `  key ${key} already processed → return stored result ${seen[key]}` });
      out.push({ tone: "ok", text: "← 200 OK (no second debit)" });
    } else {
      const ref = `TX-${Math.floor(1000 + Math.random() * 9000)}`;
      setBalance((b) => b - 500);
      out.push({ tone: "warn", text: `DEBIT ETB 500 · ref ${ref}` });
      if (keyed) setSeen((s) => ({ ...s, [key]: ref }));
      out.push(lostResponse ? { tone: "bad", text: "← response lost (network timeout)" } : { tone: "ok", text: `← 200 OK ${ref}` });
    }
    return out;
  };

  const pay = () => {
    const key = `pay-${Math.random().toString(36).slice(2, 7)}`;
    setAttempt({ key, n: 1 });
    setLog((l) => [...l, ...process(key, 1, true)]);
  };

  const retry = () => {
    if (!attempt) return;
    const n = attempt.n + 1;
    setAttempt({ ...attempt, n });
    setLog((l) => [...l, { tone: "info", text: "  client didn't get an answer, so it retries…" }, ...process(attempt.key, n, false)]);
  };

  const reset = () => {
    setBalance(5000);
    setSeen({});
    setLog([]);
    setAttempt(null);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-ink">
          <input type="checkbox" checked={keyed} onChange={(e) => (setKeyed(e.target.checked), reset())} className="h-4 w-4 accent-[rgb(var(--mint))]" />
          Send an idempotency key
        </label>
        <span className="ml-auto font-mono text-xs text-muted">
          Balance <span className="text-ink">ETB {balance.toLocaleString()}</span> · debits <span className={charges > 1 ? "text-[#e59a8f]" : "text-ink"}>{charges}</span>
        </span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" className={btnSolid} onClick={pay} disabled={!!attempt}>
          1. Pay ETB 500
        </button>
        <button type="button" className={btn} onClick={retry} disabled={!attempt || attempt.n > 2}>
          2. Retry after timeout
        </button>
        <button type="button" className={btn} onClick={reset}>
          Reset
        </button>
      </div>
      <ol className="mt-4 min-h-[9rem] space-y-0.5 rounded-xl border border-veil/[0.08] bg-ground/60 p-4" aria-live="polite">
        {log.length === 0 && <LogLine>Pay once, then retry. Try it with the key on and off.</LogLine>}
        {log.map((l, i) => (
          <LogLine key={i} tone={l.tone}>
            {l.text}
          </LogLine>
        ))}
        {charges > 1 && <LogLine tone="bad">✕ The customer paid twice for one purchase.</LogLine>}
      </ol>
      <DemoNote>
        Mobile networks drop responses all the time, and clients retry. The server must recognise a repeat of the same payment and
        return the first result instead of moving money again.
      </DemoNote>
    </div>
  );
}
