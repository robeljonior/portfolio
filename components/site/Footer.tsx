import { ArrowUp } from "lucide-react";
import { CV_URL, EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/Data";

const INDEX = [
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Stack", href: "/#stack" },
  { label: "Selected systems", href: "/#work" },
  { label: "Contact", href: "/#contact" },
];

const CHANNELS = [
  { label: "Email", href: `mailto:${EMAIL}` },
  { label: "LinkedIn", href: LINKEDIN_URL },
  { label: "GitHub", href: GITHUB_URL },
  { label: "CV", href: CV_URL },
];

export default function Footer() {
  return (
    <footer>
      <div className="hatch" aria-hidden="true" />
      <div className="grid gap-8 px-5 py-10 sm:grid-cols-3 sm:px-8">
        <nav aria-label="Index">
          <p className="font-mono text-xs text-faint">Index</p>
          <ul className="mt-3 space-y-1.5">
            {INDEX.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-sm text-muted transition-colors hover:text-ink">{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Channels">
          <p className="font-mono text-xs text-faint">Channels</p>
          <ul className="mt-3 space-y-1.5">
            {CHANNELS.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="text-sm text-muted transition-colors hover:text-ink">{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="font-mono text-xs text-faint">Status</p>
          <p className="mt-3 flex items-center gap-2 text-sm text-ink">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lcd" aria-hidden="true" /> Open to remote roles
          </p>
          <p className="mt-1.5 text-sm text-muted">Addis Ababa, Ethiopia (UTC+3)</p>
          <a href="#top" className="press mt-5 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-gold">
            <ArrowUp className="h-3.5 w-3.5" /> Back to top
          </a>
        </div>
      </div>

      <div className="overflow-hidden border-t border-rule px-5 pt-6 sm:px-8">
        <p aria-hidden="true" className="select-none text-[clamp(3.5rem,15.5vw,7.4rem)] font-semibold leading-[0.8] tracking-[-0.06em] text-raised">
          MAMUSHET
        </p>
      </div>
      <div className="flex flex-wrap justify-between gap-2 border-t border-rule px-5 py-4 font-mono text-[11px] text-faint sm:px-8">
        <span>© {new Date().getFullYear()} Robel Mamushet</span>
        <span>Built with Next.js in Addis Ababa</span>
      </div>
    </footer>
  );
}
