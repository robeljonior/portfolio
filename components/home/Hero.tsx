import { ArrowDown, ArrowUpRight } from "lucide-react";
import SocialIcon from "@/components/ui/SocialIcon";
import LocalTime from "@/components/site/LocalTime";
import SplitText from "@/components/site/SplitText";
import { ABOUT_STATS, GITHUB_URL, HEADLINE_STACK, LINKEDIN_URL, TITLE } from "@/lib/Data";
import HeroVisual from "./HeroVisual";

/** An engineering keyword picked out in the intro (same words as PITCH in lib/Data). */
function Key({ children }: { children: React.ReactNode }) {
  return <span className="font-medium text-ink underline decoration-mint/40 decoration-1 underline-offset-[5px]">{children}</span>;
}

export default function Hero({ avatar }: { avatar: string | null }) {
  return (
    <section id="top" aria-labelledby="hero-name" className="relative grid min-h-[calc(100svh-4rem)] items-center gap-10 pb-16 pt-10 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:gap-4 lg:pb-24">
      <div className="relative z-10">
        <div className="flex flex-wrap items-center gap-3">
          {avatar && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatar} alt="" width={40} height={40} className="h-10 w-10 rounded-full object-cover ring-1 ring-mint/40" />
          )}
          <p className="inline-flex items-center gap-2 rounded-full border border-veil/10 px-3 py-1 text-xs text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-lcd" aria-hidden="true" />
            Open to remote roles · Addis Ababa<span className="hidden sm:inline">&nbsp;· <LocalTime /></span>
          </p>
        </div>

        <p className="mt-8 font-mono text-xs text-faint">Backend systems · banking · fintech</p>
        <h1 id="hero-name" className="font-display mt-4 text-[3.2rem] leading-[0.95] text-ink sm:text-7xl xl:text-[4.5rem]">
          <SplitText text="Robel Mamushet" step={30} start={120} />
        </h1>

        <p className="mt-6 animate-rise text-lg text-ink [animation-delay:420ms] sm:text-xl">{TITLE}</p>
        <p className="mt-2 animate-rise font-mono text-sm text-muted [animation-delay:480ms]">
          {HEADLINE_STACK.join(" · ")}
        </p>
        <p className="mt-6 max-w-[48ch] text-base leading-7 text-muted sm:text-[17px] sm:leading-8">
          Nearly four years building banking and fintech backends: <Key>USSD banking</Key>, <Key>payment processing</Key> and{" "}
          <Key>core banking integrations</Key> that have to work every time.
        </p>

        <div className="mt-9 flex animate-rise flex-wrap items-center gap-3 [animation-delay:620ms]">
          <a href="#work" className="press group inline-flex items-center">
            <span className="pill gap-2 bg-mint text-onaccent group-hover:bg-mint/85">View projects</span>
            <span className="pill-dot bg-mint text-onaccent group-hover:bg-mint/85" aria-hidden="true">
              <ArrowDown className="h-4 w-4 -rotate-45" />
            </span>
          </a>
          <a href="#contact" className="press group inline-flex items-center">
            <span className="pill glass-soft gap-2 text-ink group-hover:bg-veil/[0.1]">Contact me</span>
            <span className="pill-dot glass-soft text-ink group-hover:bg-veil/[0.1]" aria-hidden="true">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </a>
          <span className="mx-1 hidden h-6 w-px bg-veil/10 sm:block" aria-hidden="true" />
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" aria-label="GitHub" className="press grid h-10 w-10 place-items-center rounded-full text-muted transition-colors hover:bg-veil/[0.06] hover:text-ink">
            <SocialIcon iconKey="github" className="h-5 w-5" />
          </a>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="press grid h-10 w-10 place-items-center rounded-full text-muted transition-colors hover:bg-veil/[0.06] hover:text-ink">
            <SocialIcon iconKey="linkedin" className="h-5 w-5" />
          </a>
        </div>

        <div className="mt-10 grid max-w-[30rem] grid-cols-3 gap-px overflow-hidden rounded-xl border border-veil/[0.1] bg-veil/[0.08] animate-rise [animation-delay:760ms]">
          {ABOUT_STATS.map((stat) => (
            <div key={stat.label} className="bg-ground/80 px-3 py-3 backdrop-blur-sm sm:px-4">
              <p className="font-display text-2xl text-ink sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-[10px] leading-4 text-muted sm:text-xs">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative animate-rise [animation-delay:300ms]">
        <HeroVisual />
      </div>
    </section>
  );
}
