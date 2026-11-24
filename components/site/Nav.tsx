"use client";

import { Bot, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { openChat } from "./ChatTwin";
import { NAV_LINKS } from "@/lib/nav";
import ThemeToggle from "./ThemeToggle";


/**
 * Sticky top navigation. On the home page it highlights the section in view;
 * on other pages the links point back to the home page sections.
 * Below `md` the links fold into a menu.
 */
export default function Nav({ home = false }: { home?: boolean }) {
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const href = (id: string) => (home ? `#${id}` : `/#${id}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!home) return;
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [home]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 transition-[background-color,border-color] duration-300 ${
        scrolled || open ? "glass-bar border-b border-veil/[0.08]" : "border-b border-transparent"
      }`}
    >
      <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded focus:bg-mint focus:px-3 focus:py-1.5 focus:text-onaccent">
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-page items-center justify-between gap-4 px-6 sm:px-10">
        <a href={home ? "#top" : "/"} className="press font-mono text-sm font-medium tracking-tight text-ink" aria-label="RM. Robel Mamushet, home">
          RM<span className="text-mint">.</span>
        </a>

        <nav aria-label="Sections" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((l) => {
              const on = active === l.id;
              return (
                <li key={l.id}>
                  <a
                    href={href(l.id)}
                    aria-current={on ? "true" : undefined}
                    className={`relative rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] transition-colors duration-200 ${on ? "text-ink" : "text-muted hover:text-ink"}`}
                  >
                    {on && <span className="absolute inset-0 -z-10 rounded-full bg-veil/[0.07]" aria-hidden="true" />}
                    {l.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={openChat}
            className="press hidden items-center gap-2 rounded-full border border-mint/30 px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:border-mint/70 hover:bg-mint/10 sm:inline-flex"
          >
            <Bot className="h-3.5 w-3.5 text-mint" /> Ask my AI twin
          </button>
          <ThemeToggle className="h-9 w-9" />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="press grid h-9 w-9 place-items-center rounded-md text-muted transition-colors hover:text-ink md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Sections" className="border-t border-veil/[0.08] px-6 pb-6 pt-2 md:hidden">
          <ul className="grid gap-1">
            {NAV_LINKS.map((l, i) => (
              <li key={l.id} className="animate-rise" style={{ animationDelay: `${i * 30}ms` }}>
                <a href={href(l.id)} onClick={() => setOpen(false)} className="flex items-baseline gap-3 py-2 text-lg uppercase tracking-[0.08em] text-ink">
                  <span className="font-mono text-xs text-faint">{String(i + 1).padStart(2, "0")}</span>
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openChat();
                }}
                className="mt-2 inline-flex items-center gap-2 rounded-full border border-mint/40 px-4 py-2 text-sm text-ink"
              >
                <Bot className="h-4 w-4 text-mint" /> Ask my AI twin
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
