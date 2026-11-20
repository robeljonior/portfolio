import type { ReactNode } from "react";
import { NAV_LINKS } from "@/lib/nav";

type SectionProps = {
  id: string;
  /** Short name, shown small above the heading (and used by the nav). */
  title: string;
  /** The editorial headline for the section. */
  heading?: ReactNode;
  /** One or two sentences under the headline. */
  intro?: ReactNode;
  /** Put the heading above the content instead of beside it (for wide demos). */
  stacked?: boolean;
  children: ReactNode;
};

/**
 * A page section in the editorial layout: number, label and headline on the left
 * (sticky on desktop), content on the right.
 */
export default function Section({ id, title, heading, intro, stacked = false, children }: SectionProps) {
  const index = NAV_LINKS.findIndex((l) => l.id === id);
  const number = index >= 0 ? String(index + 1).padStart(2, "0") : null;

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-20 border-t border-veil/[0.07] py-20 sm:py-28">
      <div className={stacked ? "" : "lg:grid lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:gap-16"}>
        <div className={stacked ? "mb-12 max-w-2xl" : "mb-10 lg:mb-0"}>
          <div className={stacked ? "" : "lg:sticky lg:top-28"}>
            <p data-reveal className="flex items-center gap-3 font-mono text-xs text-faint">
              {number && <span>{number}</span>}
              <span className="h-px w-8 bg-rule-strong" aria-hidden="true" />
              <span id={`${id}-title`}>{title}</span>
            </p>
            {heading && (
              <h2 data-reveal className="font-display mt-5 text-[2.5rem] leading-[1.05] text-ink sm:text-5xl">
                {heading}
              </h2>
            )}
            {intro && (
              <p data-reveal className="mt-5 max-w-md text-[15px] leading-7 text-muted">
                {intro}
              </p>
            )}
          </div>
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}
