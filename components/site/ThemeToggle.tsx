"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "dark" | "light";

/** Sun/moon button that switches between night (dark) and day (light) and remembers the choice. */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
  }, []);

  const toggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage blocked: the switch still works for this visit */
    }
    setTheme(next);
  };

  const day = theme === "light";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={day ? "Switch to night mode" : "Switch to day mode"}
      title={day ? "Night mode" : "Day mode"}
      className={`press relative grid h-9 w-9 place-items-center overflow-hidden rounded-md text-muted transition-colors hover:bg-veil/[0.06] hover:text-ink ${className}`}
    >
      {/* Both icons stay mounted so the swap can rotate between them. */}
      <Sun
        className={`absolute h-5 w-5 transition-[transform,opacity] duration-500 ease-out ${
          theme && !day ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0"
        }`}
      />
      <Moon
        className={`absolute h-5 w-5 transition-[transform,opacity] duration-500 ease-out ${
          day ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-50 opacity-0"
        }`}
      />
    </button>
  );
}
