import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

type PillLinkProps = {
  href: string;
  children: ReactNode;
  /** "solid" is the primary dark button; "ghost" a glass one. */
  tone?: "solid" | "ghost";
  download?: boolean;
};

const TONES = {
  solid: "bg-ink text-ground group-hover:bg-mint group-hover:text-onaccent",
  ghost: "glass-soft text-ink group-hover:bg-veil/[0.1]",
};

/** A pill button with a detached round arrow that turns on hover. */
export default function PillLink({ href, children, tone = "solid", download }: PillLinkProps) {
  return (
    <a href={href} download={download} data-magnetic className="press group inline-flex items-center">
      <span className={`pill gap-2 ${TONES[tone]}`}>{children}</span>
      <span className={`pill-dot ${TONES[tone]}`} aria-hidden="true">
        <ArrowUpRight className="h-4 w-4" />
      </span>
    </a>
  );
}
