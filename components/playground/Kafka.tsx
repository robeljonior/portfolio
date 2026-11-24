"use client";

import { useEffect, useState } from "react";
import { DemoNote, btn, btnSolid } from "./Shell";

const PARTITIONS = 3;
type Msg = { id: number; account: string };

const hash = (s: string) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
const ACCOUNTS = ["1001", "1002", "1003", "1004", "1005"];

/**
 * A topic with three partitions and a consumer group. Same account → same
 * partition, so events for one account stay in order. Stop a consumer and
 * its partitions move to the others.
 */
export default function Kafka() {
  const [logs, setLogs] = useState<Msg[][]>(() => Array.from({ length: PARTITIONS }, () => []));
  const [offsets, setOffsets] = useState<number[]>(() => Array(PARTITIONS).fill(0));
  const [consumers, setConsumers] = useState([true, true, true]);
  const [next, setNext] = useState(1);
  const [running, setRunning] = useState(true);

  const alive = consumers.map((on, i) => (on ? i : -1)).filter((i) => i >= 0);
  // Round-robin partitions over the consumers that are up.
  const owner = (p: number) => (alive.length ? alive[p % alive.length] : -1);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setOffsets((o) => o.map((off, p) => (owner(p) >= 0 && off < logs[p].length ? off + 1 : off)));
    }, 900);
    return () => window.clearInterval(id);
  });

  const publish = (n = 1) => {
    let id = next;
    setLogs((ls) => {
      const copy = ls.map((l) => [...l]);
      for (let i = 0; i < n; i++) {
        const account = ACCOUNTS[Math.floor(Math.random() * ACCOUNTS.length)];
        copy[hash(account) % PARTITIONS].push({ id: id++, account });
      }
      return copy;
    });
    setNext(id);
  };

  const lag = logs.reduce((sum, l, p) => sum + (l.length - offsets[p]), 0);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <button type="button" className={btnSolid} onClick={() => publish(1)}>
          Publish PaymentCompleted
        </button>
        <button type="button" className={btn} onClick={() => publish(6)}>
          Burst of 6
        </button>
        <button type="button" className={btn} onClick={() => setRunning((r) => !r)}>
          {running ? "Pause consumers" : "Resume consumers"}
        </button>
        <span className="ml-auto self-center font-mono text-xs text-muted">
          consumer lag <span className={lag > 4 ? "text-mint" : "text-ink"}>{lag}</span>
        </span>
      </div>

      <div className="mt-4 grid gap-2">
        {logs.map((l, p) => {
          const o = owner(p);
          return (
            <div key={p} className="grid grid-cols-[88px_1fr] items-center gap-3 rounded-xl border border-veil/[0.08] bg-ground/60 p-2.5">
              <div className="font-mono text-[11px] leading-4">
                <div className="text-ink">partition {p}</div>
                <div className={o >= 0 ? "text-mint" : "text-error"}>{o >= 0 ? `→ consumer ${o + 1}` : "unassigned"}</div>
              </div>
              <div className="flex min-h-[28px] flex-wrap gap-1 overflow-hidden">
                {l.slice(-14).map((m) => {
                  const done = l.indexOf(m) < offsets[p];
                  return (
                    <span
                      key={m.id}
                      title={`event #${m.id} for account ${m.account}`}
                      className={`animate-rise rounded px-1.5 py-0.5 font-mono text-[10px] transition-colors duration-500 ${
                        done ? "bg-mint/15 text-mint" : "bg-gold/20 text-gold"
                      }`}
                    >
                      {m.account}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-xs text-muted">Notification service consumers:</span>
        {consumers.map((on, i) => (
          <button
            key={i}
            type="button"
            aria-pressed={on}
            onClick={() => setConsumers((c) => c.map((v, j) => (j === i ? !v : v)))}
            className={`press rounded-full border px-3 py-1 font-mono text-[11px] transition-colors ${
              on ? "border-mint/50 text-mint" : "border-error/50 text-error line-through"
            }`}
          >
            consumer {i + 1}
          </button>
        ))}
      </div>

      <DemoNote>
        Payment events go to Kafka once, and each service reads them at its own pace. Keying by account keeps one customer&apos;s
        events in order, and when a consumer stops, its partitions are handed to the others instead of piling up.
      </DemoNote>
    </div>
  );
}
