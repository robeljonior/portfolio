"use client";

import { Delete, Phone, PhoneOff } from "lucide-react";
import { KeyboardEvent, useCallback, useRef, useState } from "react";

/*
 * A sample USSD session against an imaginary bank, with the path each
 * request takes through the gateway. All balances, accounts and timings
 * are made up; the hop order mirrors how the real gateway is wired.
 */

type Lang = "en" | "am";
type Step =
  | { kind: "idle"; message?: string }
  | { kind: "menu" }
  | { kind: "pin"; next: "balance" | "statement" }
  | { kind: "result"; text: string }
  | { kind: "account" }
  | { kind: "amount"; account: string }
  | { kind: "confirm"; account: string; amount: string }
  | { kind: "ended" };

type Hop = { at: string; detail: string; ms: string };

const TEXT = {
  en: {
    menu: "Demo Bank\n1 Balance\n2 Send money\n3 Mini statement\n4 ቋንቋ / Language\n0 Exit",
    pin: "Enter your 4-digit PIN:",
    balance: "Available balance:\nETB 12,480.50\n\n0 Back",
    statement: "Last 3:\n-ETB 450.00  Telebirr\n+ETB 9,000  Salary\n-ETB 120.00  Airtime\n\n0 Back",
    account: "Recipient account no:",
    amount: "Amount (ETB):",
    confirm: (a: string, n: string) => `Send ETB ${n} to\n...${a.slice(-4)}?\n1 Confirm\n2 Cancel`,
    sent: (ref: string) => `Sent.\nRef ${ref}\n\n0 Main menu`,
    cancelled: "Cancelled.\n\n0 Main menu",
    ended: "Session ended.\nThank you.",
  },
  am: {
    menu: "Demo Bank\n1 ቀሪ ሂሳብ\n2 ገንዘብ ላክ\n3 አጭር መግለጫ\n4 Language / ቋንቋ\n0 ውጣ",
    pin: "ባለ 4 አሃዝ ፒን ያስገቡ:",
    balance: "ቀሪ ሂሳብ:\nETB 12,480.50\n\n0 ተመለስ",
    statement: "የመጨረሻ 3:\n-ETB 450.00  Telebirr\n+ETB 9,000  ደመወዝ\n-ETB 120.00  የአየር ሰዓት\n\n0 ተመለስ",
    account: "የተቀባይ ሂሳብ ቁጥር:",
    amount: "መጠን (ETB):",
    confirm: (a: string, n: string) => `ETB ${n} ወደ\n...${a.slice(-4)} ይላክ?\n1 አረጋግጥ\n2 ሰርዝ`,
    sent: (ref: string) => `ተልኳል።\nRef ${ref}\n\n0 ዋና ማውጫ`,
    cancelled: "ተሰርዟል።\n\n0 ዋና ማውጫ",
    ended: "ክፍለ ጊዜው አብቅቷል።\nእናመሰግናለን።",
  },
};

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"];

function hopsFor(input: string, touches: { auth?: boolean; core?: "read" | "write" } = {}): Hop[] {
  const hops: Hop[] = [
    { at: "carrier", detail: `POST /ussd  input="${input}"`, ms: "—" },
    { at: "gateway", detail: "Go · Gin  route /ussd", ms: "1.8ms" },
    { at: "redis", detail: "GET session  → hit", ms: "0.4ms" },
  ];
  if (touches.auth) hops.push({ at: "keycloak", detail: "verify PIN · issue token", ms: "21ms" });
  if (touches.core === "read") hops.push({ at: "core bank", detail: "SOAP getBalance via Camel", ms: "64ms" });
  if (touches.core === "write") hops.push({ at: "core bank", detail: "SOAP postTransfer via Camel", ms: "88ms" });
  hops.push({ at: "redis", detail: "SET session  (TTL 180s)", ms: "0.3ms" });
  hops.push({ at: "cassandra", detail: "append session event", ms: "2.6ms" });
  return hops;
}

export default function UssdDemo() {
  const [lang, setLang] = useState<Lang>("en");
  const [step, setStep] = useState<Step>({ kind: "idle" });
  const [input, setInput] = useState("");
  const [hops, setHops] = useState<Hop[]>([]);
  const [run, setRun] = useState(0);
  const phoneRef = useRef<HTMLDivElement>(null);

  const t = TEXT[lang];
  const live = step.kind !== "idle" && step.kind !== "ended";

  const screen = (() => {
    switch (step.kind) {
      case "idle":
        return step.message ?? "Dial *123# and\npress call";
      case "menu":
        return t.menu;
      case "pin":
        return t.pin;
      case "result":
        return step.text;
      case "account":
        return t.account;
      case "amount":
        return t.amount;
      case "confirm":
        return t.confirm(step.account, step.amount);
      case "ended":
        return t.ended;
    }
  })();

  const trace = useCallback((next: Hop[]) => {
    setHops(next);
    setRun((r) => r + 1);
  }, []);

  const send = useCallback(
    (raw: string) => {
      const value = raw.trim();
      setInput("");

      if (step.kind === "idle" || step.kind === "ended") {
        if (value === "*123#") {
          setStep({ kind: "menu" });
          trace(hopsFor(value));
        } else {
          setStep({ kind: "idle", message: value ? `Unknown code ${value}\nTry *123#` : undefined });
        }
        return;
      }

      const toMenu = () => {
        setStep({ kind: "menu" });
        trace(hopsFor(value));
      };

      switch (step.kind) {
        case "menu":
          if (value === "1") return setStep({ kind: "pin", next: "balance" }), trace(hopsFor(value));
          if (value === "2") return setStep({ kind: "account" }), trace(hopsFor(value));
          if (value === "3") return setStep({ kind: "pin", next: "statement" }), trace(hopsFor(value));
          if (value === "4") return setLang((l) => (l === "en" ? "am" : "en")), trace(hopsFor(value));
          if (value === "0") return setStep({ kind: "ended" }), trace(hopsFor(value));
          return;
        case "pin":
          if (!/^\d{4}$/.test(value)) return;
          setStep({ kind: "result", text: step.next === "balance" ? t.balance : t.statement });
          return trace(hopsFor("****", { auth: true, core: "read" }));
        case "result":
          if (value === "0") toMenu();
          return;
        case "account":
          if (!/^\d{6,16}$/.test(value)) return;
          setStep({ kind: "amount", account: value });
          return trace(hopsFor(value));
        case "amount":
          if (!/^\d+(\.\d{1,2})?$/.test(value) || Number(value) <= 0) return;
          setStep({ kind: "confirm", account: step.account, amount: value });
          return trace(hopsFor(value));
        case "confirm":
          if (value === "1") {
            const ref = `TX${Math.floor(100000 + Math.random() * 900000)}`;
            setStep({ kind: "result", text: t.sent(ref) });
            return trace(hopsFor(value, { auth: true, core: "write" }));
          }
          if (value === "2") {
            setStep({ kind: "result", text: t.cancelled });
            return trace(hopsFor(value));
          }
          return;
      }
    },
    [step, t, trace],
  );

  const press = (key: string) => setInput((v) => (v + key).slice(0, 20));
  const hangUp = () => {
    setInput("");
    setStep({ kind: "ended" });
    setHops([]);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (/^[0-9*#.]$/.test(e.key)) {
      press(e.key);
      e.preventDefault();
    } else if (e.key === "Backspace") {
      setInput((v) => v.slice(0, -1));
      e.preventDefault();
    } else if (e.key === "Enter") {
      send(input);
      e.preventDefault();
    } else if (e.key === "Escape") {
      hangUp();
    }
  };

  const quickDial = () => {
    phoneRef.current?.focus();
    setInput("");
    setLang("en");
    setStep({ kind: "menu" });
    trace(hopsFor("*123#"));
  };

  return (
    <figure className="grid gap-6 sm:grid-cols-[220px_1fr] sm:gap-8">
      {/* Phone */}
      <div
        ref={phoneRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        aria-label="Sample USSD phone. Type digits, Enter to send, Escape to hang up."
        className="mx-auto w-[220px] rounded-[28px] border border-rule-strong bg-raised p-3 shadow-[0_24px_48px_-24px_rgba(0,0,0,.8)] focus-visible:outline-lcd"
      >
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-rule-strong" aria-hidden="true" />
        <div
          className="h-[168px] rounded-md bg-lcd-ground p-3 font-mono text-[11.5px] leading-[1.45] text-lcd-ink"
          role="status"
          aria-live="polite"
        >
          <p className="whitespace-pre-line">{screen}</p>
          <p className="mt-1 h-4 text-lcd">
            {input}
            <span className="animate-blink">▍</span>
          </p>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-1.5">
          <button
            type="button"
            onClick={() => send(input)}
            aria-label="Call or send"
            className="press grid h-8 place-items-center rounded-md bg-[#1f3a24] text-[#8fdc9a] transition-colors hover:bg-[#25462b]"
          >
            <Phone className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setInput((v) => v.slice(0, -1))}
            aria-label="Delete"
            className="press grid h-8 place-items-center rounded-md bg-panel text-muted transition-colors hover:bg-rule hover:text-ink"
          >
            <Delete className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={hangUp}
            aria-label="Hang up"
            className="press grid h-8 place-items-center rounded-md bg-[#3a1f1f] text-[#e59a8f] transition-colors hover:bg-[#462525]"
          >
            <PhoneOff className="h-4 w-4" />
          </button>
          {KEYS.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => press(key)}
              className="press h-9 rounded-md bg-panel font-mono text-sm text-ink transition-colors hover:bg-rule"
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      {/* Trace */}
      <div className="flex min-w-0 flex-col">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted">
            {live ? "Each key you send travels this path:" : "Dial on the phone, or start a session here."}
          </p>
          <button
            type="button"
            onClick={quickDial}
            className="press rounded-md border border-rule-strong px-3 py-1.5 font-mono text-xs text-ink transition-colors hover:border-lcd hover:text-lcd"
          >
            Dial *123#
          </button>
        </div>

        <ol key={run} className="mt-4 min-h-[220px] space-y-1.5 rounded-md border border-rule bg-panel p-3 font-mono text-[11.5px]">
          {hops.length === 0 && (
            <li className="text-faint">
              carrier → Go gateway → Redis → Keycloak → core bank → Cassandra
            </li>
          )}
          {hops.map((hop, i) => (
            <li
              key={`${hop.at}-${i}`}
              className="grid animate-rise grid-cols-[76px_1fr_auto] gap-3"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <span className={hop.at === "gateway" ? "text-gold" : "text-lcd"}>{hop.at}</span>
              <span className="truncate text-muted">{hop.detail}</span>
              <span className="text-faint">{hop.ms}</span>
            </li>
          ))}
        </ol>

        <figcaption className="mt-3 text-xs leading-5 text-faint">
          <span className="font-mono text-muted">Fig. 1.</span> A sample session through the USSD gateway I
          ported from Java to Go. Demo Bank, balances and timings are made up; the path is the real
          one. Press 4 for Amharic.
        </figcaption>
      </div>
    </figure>
  );
}
