import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title: string;
  children: ReactNode;
};

/**
 * A content section in the right-hand column. On phones the title sticks to the
 * top while the section scrolls; on desktop the sidebar nav names it instead.
 */
export default function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="mb-20 scroll-mt-16 sm:mb-28 lg:scroll-mt-24">
      <div className="sticky top-0 z-20 -mx-6 mb-6 glass-bar px-6 py-4 sm:-mx-12 sm:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-0 lg:px-0 lg:py-0">
        <h2 id={`${id}-title`} className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-ink">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}
