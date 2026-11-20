import { ArrowDown, ArrowUpRight } from "lucide-react";
import SocialIcon from "@/components/ui/SocialIcon";
import LocalTime from "@/components/site/LocalTime";
import SplitText from "@/components/site/SplitText";
import { ABOUT_STATS, GITHUB_URL, HEADLINE_STACK, LINKEDIN_URL, TITLE } from "@/lib/Data";
import AskTwin from "./HeroActions";
import HeroVisual from "./HeroVisual";

/** An engineering keyword picked out in the intro (same words as PITCH in lib/Data). */
function Key({ children }: { children: React.ReactNode }) {
  return <span className="text-ink">{children}</span>;
}

export default function Hero({ avatar }: { avatar: string | null }) {
  return (
    <section id="top" aria-labelledby="hero-name" className="relative grid min-h-[calc(100svh-4rem)] items-center gap-14 pb-20 pt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16 lg:pb-28">
      <div className="relative z-10">
        <div className="flex animate-rise flex-wrap items-center gap-3">
          {avatar && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatar} alt="" width={32} height={32} className="h-8 w-8 rounded-full object-cover ring-1 ring-veil/15" />
          )}
          <p className="inline-flex items-center gap-2 font-mono text-xs text-faint">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-mint" aria-hidden="true" />
            Open to remote roles · Addis Ababa<span className="hidden sm:inline">&nbsp;· <LocalTime /></span>
          </p>
        </div>

        <h1 id="hero-name" className="font-display mt-10 text-[3.75rem] leading-[0.92] text-ink sm:text-[5.5rem] xl:text-[6.5rem]">
          <SplitText text="Robel Mamushet" step={45} start={150} />
        </h1>

        <p className="mt-8 animate-rise text-lg text-ink [animation-delay:500ms] sm:text-xl">
          {TITLE} <span className="text-faint">·</span> <span className="font-display text-[1.35em] italic text-muted">systems that move money</span>
        </p>
        <p className="mt-3 animate-rise font-mono text-[13px] text-faint [animation-delay:560ms]">{HEADLINE_STACK.join("  /  ")}</p>

        <p className="mt-8 max-w-[46ch] animate-rise text-base leading-8 text-muted [animation-delay:620ms] sm:text-[17px]">
          Nearly four years building banking and fintech backends: <Key>USSD banking</Key>, <Key>payment processing</Key> and{" "}
          <Key>core banking integrations</Key> that have to work every time.
        </p>

        <div className="mt-10 flex animate-rise flex-wrap items-center gap-3 [animation-delay:700ms]">
          <a href="#work" data-magnetic className="press group inline-flex items-center">
            <span className="pill gap-2 bg-ink text-ground group-hover:bg-ink/90">View projects</span>
            <span className="pill-dot bg-ink text-ground group-hover:bg-ink/90" aria-hidden="true">
              <ArrowDown className="h-4 w-4 -rotate-45" />
            </span>
          </a>
          <a href="#contact" data-magnetic className="press group inline-flex items-center">
            <span className="pill glass-soft gap-2 text-ink group-hover:bg-raised">Contact me</span>
            <span className="pill-dot glass-soft text-ink group-hover:bg-raised" aria-hidden="true">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </a>
          <span className="mx-2 hidden h-5 w-px bg-veil/10 sm:block" aria-hidden="true" />
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" aria-label="GitHub" data-magnetic className="grid h-10 w-10 place-items-center rounded-[10px] text-faint transition-colors duration-300 hover:text-ink">
            <SocialIcon iconKey="github" className="h-[18px] w-[18px]" />
          </a>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" aria-label="LinkedIn" data-magnetic className="grid h-10 w-10 place-items-center rounded-[10px] text-faint transition-colors duration-300 hover:text-ink">
            <SocialIcon iconKey="linkedin" className="h-[18px] w-[18px]" />
          </a>
        </div>

        <div className="mt-6 animate-rise [animation-delay:760ms]">
          <AskTwin />
        </div>

        <dl className="mt-14 flex max-w-[34rem] animate-rise divide-x divide-veil/[0.08] border-t border-veil/[0.08] pt-6 [animation-delay:840ms]">
          {ABOUT_STATS.map((stat) => (
            <div key={stat.label} className="flex-1 px-5 first:pl-0">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-display text-4xl tabular-nums text-ink">{stat.value}</dd>
              <dd className="mt-2 text-xs leading-5 text-faint">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="relative animate-rise [animation-delay:350ms]">
        <HeroVisual />
      </div>
    </section>
  );
}
