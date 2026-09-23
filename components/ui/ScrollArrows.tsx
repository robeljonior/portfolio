// components/ui/ScrollArrows.tsx
"use client";

export default function ScrollArrows() {
  const scrollBy = (dir: 1 | -1) =>
    window.scrollBy({ top: dir * window.innerHeight * 0.9, behavior: "smooth" });

  return (
    <div className="absolute right-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 md:flex">
      <button
        aria-label="Scroll up"
        onClick={() => scrollBy(-1)}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 backdrop-blur transition hover:border-white/40 hover:text-white"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
          <path d="m18 15-6-6-6 6" />
        </svg>
      </button>
      <button
        aria-label="Scroll down"
        onClick={() => scrollBy(1)}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 backdrop-blur transition hover:border-white/40 hover:text-white"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
    </div>
  );
}