import { ArrowUp } from "lucide-react";
import { CV_TXT_URL, CV_URL, EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/Data";
import { NAV_LINKS } from "@/lib/nav";

const CHANNELS = [
  { label: "Email", href: `mailto:${EMAIL}` },
  { label: "LinkedIn", href: LINKEDIN_URL },
  { label: "GitHub", href: GITHUB_URL },
  { label: "CV (PDF)", href: CV_URL },
  { label: "CV (text)", href: CV_TXT_URL },
];

export default function Footer() {
  return (
    <footer className="relative z-[1] border-t border-veil/[0.07]">
      <div className="mx-auto grid max-w-page gap-10 px-6 py-14 sm:grid-cols-3 sm:px-10">
        <nav aria-label="Index">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-faint">Index</p>
          <ul className="mt-4 space-y-2">
            {NAV_LINKS.map((item) => (
              <li key={item.id}>
                <a href={`/#${item.id}`} className="text-sm text-muted transition-colors hover:text-ink">{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Channels">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-faint">Channels</p>
          <ul className="mt-4 space-y-2">
            {CHANNELS.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="text-sm text-muted transition-colors hover:text-ink">{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-faint">Status</p>
          <p className="mt-4 flex items-center gap-2 text-sm text-ink">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lcd" aria-hidden="true" /> Open to remote roles
          </p>
          <p className="mt-2 text-sm text-muted">Addis Ababa, Ethiopia (UTC+3)</p>
          <a href="/#top" className="press mt-6 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-mint">
            <ArrowUp className="h-3.5 w-3.5" /> Back to top
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-page overflow-hidden px-6 sm:px-10">
        <svg viewBox="0 0 1000 190" className="block w-full select-none fill-veil/[0.06]" aria-hidden="true" focusable="false">
          <text x="0" y="168" className="font-display" style={{ fontSize: 210 }} textLength="1000" lengthAdjust="spacingAndGlyphs">
            ROBEL
          </text>
        </svg>
      </div>
      <div className="border-t border-veil/[0.07]">
        <div className="mx-auto flex max-w-page flex-wrap justify-between gap-2 px-6 py-5 font-mono text-[11px] text-faint sm:px-10">
          <span>© {new Date().getFullYear()} Robel Mamushet</span>
          <span>Built with Next.js, TypeScript and Three.js in Addis Ababa</span>
        </div>
      </div>
    </footer>
  );
}
