"use client";

import { useEffect, useState } from "react";
import { NAV_ITEMS } from "@/lib/Data";

type NavTheme = "light" | "dark" | "gold";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<NavTheme>("light");

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-nav-theme]");
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const activeSection = visibleSections[0];
        const nextTheme = activeSection?.target.getAttribute("data-nav-theme") as NavTheme | null;

        if (nextTheme) setTheme(nextTheme);
      },
      { threshold: [0.2, 0.4, 0.6], rootMargin: "-70px 0px -35% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const isDark = theme === "dark";
  const isGold = theme === "gold";
  const textClass = isDark ? "text-paper" : "text-ink";
  const mutedTextClass = isDark ? "text-[#aebdb7]" : isGold ? "text-[#38545a]" : "text-[#52635e]";
  const borderClass = isDark ? "border-white/10" : isGold ? "border-ink/15" : "border-ink/10";
  const hoverClass = isDark ? "hover:text-gold-bright" : "hover:text-teal-mid";
  const backgroundClass = isDark ? "bg-ink/75" : isGold ? "bg-gold/75" : "bg-paper/75";
  const mobileBackgroundClass = isDark ? "bg-ink" : isGold ? "bg-gold" : "bg-paper";

  return (
    <header className={`fixed inset-x-0 top-0 z-40 border-b backdrop-blur-md transition-colors duration-500 ${borderClass} ${backgroundClass}`}>
      <div className="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-6 lg:px-10">
        <a href="#top" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-ink text-xs font-extrabold text-gold-bright">RM</span>
          <span className={`hidden text-xs font-bold uppercase tracking-[.16em] transition-colors duration-500 sm:block ${textClass}`}>robel mamushet</span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_ITEMS.map((item, i) => (
            <a key={item.href} href={item.href} className={`text-xs font-semibold uppercase tracking-[.16em] transition-colors duration-500 ${mutedTextClass} ${hoverClass}`}>
              <span className={`mr-2 transition-colors duration-500 ${isDark ? "text-gold-bright" : "text-teal-mid"}`}>0{i + 1}</span>
              {item.label}
            </a>
          ))}
        </nav>

        <a href="mailto:robelmamoshet@gmail.com" className={`hidden text-xs font-semibold uppercase tracking-[.13em] transition-colors duration-500 lg:inline ${textClass} ${hoverClass}`}>
          Email
        </a>

        <button type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((current) => !current)} className={`flex h-10 w-10 items-center justify-center rounded-md border transition-colors duration-500 lg:hidden ${borderClass} ${textClass}`}>
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <nav className={`border-t px-6 py-3 transition-colors duration-500 lg:hidden ${borderClass} ${mobileBackgroundClass}`}>
          {NAV_ITEMS.map((item, i) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)} className={`flex items-center justify-between border-b py-4 text-xs uppercase tracking-[.16em] transition-colors duration-500 last:border-b-0 ${borderClass} ${mutedTextClass} ${hoverClass}`}>
              <span><span className={`mr-4 ${isDark ? "text-gold-bright" : "text-teal-mid"}`}>0{i + 1}</span>{item.label}</span>
              ↗
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
