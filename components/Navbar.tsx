// components/Navbar.tsx
"use client";

import { useState } from "react";
import { NAV_ITEMS } from "@/lib/Data";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/5 bg-night/70 backdrop-blur-md">
      <div className="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-6 lg:px-10">
        <a href="#top" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-to-br from-violet-500 to-indigo-500 text-xs font-extrabold text-white">
            RM
          </span>
          <span className="hidden text-xs font-medium uppercase tracking-[.16em] text-slate-300 sm:block">
            robel mamushet
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_ITEMS.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs uppercase tracking-[.16em] text-slate-400 transition-colors hover:text-white"
            >
              <span className="mr-2 text-slate-600">0{i + 1}</span>
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="mailto:robelmamoshet@gmail.com"
          className="hidden text-xs uppercase tracking-[.13em] text-slate-300 transition-colors hover:text-violet-300 md:inline"
        >
          Start a conversation ↗
        </a>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 text-white md:hidden"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/5 bg-night px-6 py-3 md:hidden">
          {NAV_ITEMS.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between border-b border-white/5 py-4 text-xs uppercase tracking-[.16em] text-slate-300 last:border-b-0"
            >
              <span>
                <span className="mr-4 text-violet-400">0{i + 1}</span>
                {item.label}
              </span>
              ↗
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
