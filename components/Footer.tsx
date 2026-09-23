// components/Footer.tsx

export default function Footer() {
  return (
    <footer className="bg-ink px-5 py-7 text-[#aebdb7] sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[.14em]">
          © {new Date().getFullYear()} Robel Mamushet
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[.14em]">
          built for the long run <span className="text-gold-bright">/</span> no downtime
        </p>
        <a
          href="#top"
          className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.14em] text-gold-bright"
        >
          back to top ↑
        </a>
      </div>
    </footer>
  );
}