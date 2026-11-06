"use client";

import { ArrowUp, X } from "lucide-react";
import { KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";

type Message = { role: "user" | "assistant"; content: string };

const OPEN_EVENT = "chat-twin:open";

/** Opens the chat panel from anywhere on the page. */
export function openChat() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

const TOPICS = [
  {
    tag: "Go // migration",
    title: "The Java → Go gateway",
    text: "How I ported a live USSD gateway and caught 12 differences before release.",
    ask: "Tell me about porting the USSD gateway from Java to Go.",
  },
  {
    tag: "Banking // integration",
    title: "Core banking & payments",
    text: "Camel routes into SOAP/XML cores, Kafka between services, traceable payments.",
    ask: "What banking and payment systems have you built?",
  },
  {
    tag: "Stack // full stack",
    title: "What I work with",
    text: "Go, Java, Spring Boot, Kafka, Redis, PostgreSQL, Next.js and TypeScript.",
    ask: "What's your tech stack, and where are you strongest?",
  },
  {
    tag: "Hiring // availability",
    title: "Working together",
    text: "Remote roles, time-zone overlap, and the fastest way to reach me.",
    ask: "Are you open to remote roles, and how do I contact you?",
  },
];

export default function ChatTwin() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const panelRef = useRef<HTMLElement>(null);

  // Keep the closed panel out of the tab order and away from screen readers.
  useEffect(() => {
    panelRef.current?.toggleAttribute("inert", !open);
  }, [open]);

  useEffect(() => {
    const show = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, show);
    return () => window.removeEventListener(OPEN_EVENT, show);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: globalThis.KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const id = window.setTimeout(() => inputRef.current?.focus(), 250);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      window.clearTimeout(id);
    };
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages]);

  useEffect(() => () => abortRef.current?.abort(), []);

  const send = useCallback(
    async (text: string) => {
      const question = text.trim();
      if (!question || busy) return;
      const history: Message[] = [...messages, { role: "user", content: question }];
      setMessages([...history, { role: "assistant", content: "" }]);
      setInput("");
      setBusy(true);

      const controller = new AbortController();
      abortRef.current = controller;
      const append = (chunk: string) =>
        setMessages((current) => {
          const next = current.slice();
          const last = next[next.length - 1];
          next[next.length - 1] = { ...last, content: last.content + chunk };
          return next;
        });

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history }),
          signal: controller.signal,
        });
        if (!res.body) throw new Error("no body");
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          append(decoder.decode(value, { stream: true }));
        }
      } catch (error) {
        if ((error as Error).name !== "AbortError") append("I couldn't reach the server. Try again, or email me.");
      } finally {
        setBusy(false);
        abortRef.current = null;
      }
    },
    [busy, messages],
  );

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px] transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Chat with Robel's AI twin"
        ref={panelRef}
        className={`fixed inset-y-0 right-0 z-50 flex w-full flex-col border-l border-veil/[0.08] bg-ground/95 backdrop-blur-xl transition-transform duration-500 ease-out sm:w-[420px] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center gap-3 border-b border-veil/[0.08] px-4 py-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold font-mono text-sm font-medium text-onaccent">
            RM
          </span>
          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-2 font-semibold leading-tight text-ink">
              Robel Mamushet
              <span className="rounded-full border border-lcd/30 bg-lcd/10 px-2 py-0.5 font-mono text-[10px] font-medium text-lcd">
                AI twin
              </span>
            </p>
            <p className="text-xs text-faint">Direct line · Software Engineer</p>
          </div>
          <kbd className="hidden rounded-md border border-veil/10 px-1.5 py-0.5 font-mono text-[10px] text-faint sm:block">ESC</kbd>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close chat"
            className="press grid h-8 w-8 place-items-center rounded-md text-muted transition-colors hover:bg-veil/[0.06] hover:text-ink"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-5" aria-live="polite">
          <div className="glass glow rounded-2xl p-4">
            <p className="font-semibold text-ink">👋 Hey, I&apos;m Robel.</p>
            <p className="mt-1.5 text-sm leading-6 text-muted">
              This is my AI twin. Ask me anything about my banking systems, the Go migration, my stack, or working
              together, or pick a topic below.
            </p>
          </div>

          {messages.length === 0 &&
            TOPICS.map((topic, i) => (
              <button
                key={topic.title}
                type="button"
                onClick={() => send(topic.ask)}
                style={{ animationDelay: `${120 + i * 70}ms` }}
                className="group block w-full animate-rise rounded-2xl border border-veil/[0.08] bg-veil/[0.02] p-4 text-left transition-colors hover:border-gold/40 hover:bg-veil/[0.04]"
              >
                <span className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-gold">
                  {topic.tag}
                  <ArrowUp className="h-3.5 w-3.5 rotate-45 text-faint transition-transform duration-300 group-hover:rotate-90 group-hover:text-gold" />
                </span>
                <span className="mt-2 block text-sm font-semibold text-ink">{topic.title}</span>
                <span className="mt-1 block text-sm leading-6 text-muted">{topic.text}</span>
              </button>
            ))}

          {messages.map((m, i) =>
            m.role === "user" ? (
              <div key={i} className="flex justify-end">
                <p className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-md bg-gold px-3.5 py-2.5 text-sm leading-6 text-onaccent">
                  {m.content}
                </p>
              </div>
            ) : (
              <div key={i} className="flex">
                <p className="max-w-[90%] whitespace-pre-wrap rounded-2xl rounded-bl-md border border-veil/[0.08] bg-veil/[0.04] px-3.5 py-2.5 text-sm leading-6 text-ink">
                  {m.content || (
                    <span className="inline-flex gap-1 py-1" aria-label="Thinking">
                      {[0, 150, 300].map((d) => (
                        <span key={d} className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" style={{ animationDelay: `${d}ms` }} />
                      ))}
                    </span>
                  )}
                </p>
              </div>
            ),
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="border-t border-veil/[0.08] p-3"
        >
          <div className="flex items-end gap-2 rounded-2xl border border-veil/10 bg-veil/[0.04] p-2 transition-colors focus-within:border-gold/60">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              rows={1}
              maxLength={2000}
              aria-label="Your question"
              placeholder="Ask about my work, stack or projects…"
              className="max-h-32 min-h-[2.25rem] flex-1 resize-none bg-transparent px-2 py-1.5 text-sm text-ink outline-none placeholder:text-faint"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              aria-label="Send"
              className="press grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold text-onaccent transition-[background-color,opacity] hover:bg-gold/85 disabled:opacity-40"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-2 flex justify-between px-1 font-mono text-[10px] text-faint">
            <span>Press ↵ to send · AI answers, may be imperfect</span>
            <span>Addis Ababa (UTC+3)</span>
          </p>
        </form>
      </aside>
    </>
  );
}
