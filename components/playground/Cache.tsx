"use client";

import { useEffect, useState } from "react";
import { DemoNote, LogLine, btn, btnSolid } from "./Shell";

const TTL = 20;
type Entry = { tone: "info" | "ok" | "warn" | "bad"; text: string };

/** Cache-aside with Redis: read through the cache, fall back to the database, invalidate on write. */
export default function Cache() {
  const [cached, setCached] = useState<{ value: number; expires: number } | null>(null);
  const [db, setDb] = useState(12480);
  const [now, setNow] = useState(() => Date.now());
  const [log, setLog] = useState<Entry[]>([]);
  const [stats, setStats] = useState({ hit: 0, miss: 0 });

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 500);
    return () => window.clearInterval(id);
  }, []);

  const left = cached ? Math.max(0, Math.ceil((cached.expires - now) / 1000)) : 0;
  const live = cached && left > 0;

  const read = () => {
    if (live) {
      setStats((s) => ({ ...s, hit: s.hit + 1 }));
      setLog((l) => [...l.slice(-7), { tone: "ok", text: `GET balance:1001 → HIT  ETB ${cached!.value.toLocaleString()}  (~1 ms)` }]);
    } else {
      setStats((s) => ({ ...s, miss: s.miss + 1 }));
      setCached({ value: db, expires: Date.now() + TTL * 1000 });
      setLog((l) => [
        ...l.slice(-6),
        { tone: "warn", text: `GET balance:1001 → MISS  read PostgreSQL  (~40 ms)` },
        { tone: "info", text: `SET balance:1001 ${db} EX ${TTL}` },
      ]);
    }
  };

  const write = () => {
    const next = db - 450;
    setDb(next);
    setCached(null);
    setLog((l) => [...l.slice(-6), { tone: "info", text: `UPDATE accounts SET balance=${next}` }, { tone: "warn", text: "DEL balance:1001  (invalidate, so nobody reads a stale balance)" }]);
  };

  const total = stats.hit + stats.miss;

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          ["Redis", live ? `ETB ${cached!.value.toLocaleString()}` : "empty", live ? `expires in ${left}s` : "no key"],
          ["PostgreSQL", `ETB ${db.toLocaleString()}`, "source of truth"],
          ["Hit rate", total ? `${Math.round((stats.hit / total) * 100)}%` : "—", `${stats.hit} hits · ${stats.miss} misses`],
        ].map(([k, v, s]) => (
          <div key={k} className="rounded-xl border border-veil/[0.08] bg-ground/60 p-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-faint">{k}</p>
            <p className="mt-1 text-lg text-ink">{v}</p>
            <p className="text-xs text-muted">{s}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" className={btnSolid} onClick={read}>
          Read balance
        </button>
        <button type="button" className={btn} onClick={write}>
          Make a payment (write)
        </button>
      </div>
      <ol className="mt-4 min-h-[8rem] space-y-0.5 rounded-xl border border-veil/[0.08] bg-ground/60 p-4" aria-live="polite">
        {log.length === 0 && <LogLine>Read the balance a few times, then make a payment and read again.</LogLine>}
        {log.map((l, i) => (
          <LogLine key={i} tone={l.tone}>
            {l.text}
          </LogLine>
        ))}
      </ol>
      <DemoNote>
        Balance checks are the most common USSD request. Serving repeats from Redis keeps the database free for writes, and
        deleting the key on every write means a customer never sees an old balance. Timings are illustrative.
      </DemoNote>
    </div>
  );
}
