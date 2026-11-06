import { Mail } from "lucide-react";
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/Data";
import SocialIcon from "@/components/ui/SocialIcon";
import ThemeToggle from "./ThemeToggle";

const LINKS = [
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Stack", href: "/#stack" },
  { label: "Work", href: "/#work" },
  { label: "Contact", href: "/#contact" },
];

export default function TopBar() {
  return (
    <header className="sticky top-0 z-40 glass-bar border-b border-veil/[0.08]">
      <div className="column flex h-14 items-center justify-between gap-4 border-y-0 px-5 sm:px-8">
        <a href="/#top" className="press font-mono text-sm font-medium tracking-tight text-ink" aria-label="Robel Mamushet, home">
          RM<span className="text-gold">.</span>
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-5 md:flex">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-muted transition-colors duration-150 hover:text-ink">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" aria-label="GitHub" className="press grid h-8 w-8 place-items-center rounded-md text-muted transition-colors hover:bg-raised hover:text-ink">
            <SocialIcon iconKey="github" className="h-4 w-4" />
          </a>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="press grid h-8 w-8 place-items-center rounded-md text-muted transition-colors hover:bg-raised hover:text-ink">
            <SocialIcon iconKey="linkedin" className="h-4 w-4" />
          </a>
          <ThemeToggle className="h-8 w-8" />
          <a href={`mailto:${EMAIL}`} className="press ml-1 inline-flex items-center gap-1.5 rounded-md border border-rule-strong px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:border-gold hover:text-gold">
            <Mail className="h-3.5 w-3.5" /> Email
          </a>
        </div>
      </div>
    </header>
  );
}
