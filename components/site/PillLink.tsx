import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

type PillLinkProps = {
  href: string;
  children: ReactNode;
  /** "solid" is the mint button; "ghost" a glass one. */
  tone?: "solid" | "ghost";
  download?: boolean;
};

const TONES = {
  solid: "bg-mint text-onaccent group-hover:bg-mint/85",
  ghost: "glass-soft text-ink group-hover:bg-veil/[0.1]",
};

/** A pill button with a detached round arrow that turns on hover. */
export default function PillLink({ href, children, tone = "solid", download }: PillLinkProps) {
  return (
    <a href={href} download={download} className="press group inline-flex items-center">
      <span className={`pill gap-2 ${TONES[tone]}`}>{children}</span>
      <span className={`pill-dot ${TONES[tone]}`} aria-hidden="true">
        <ArrowUpRight className="h-4 w-4" />
      </span>
    </a>
  );
}
