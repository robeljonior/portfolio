import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowUpRight, FileText } from "lucide-react";
import Playground from "@/components/playground/Playground";
import { ABOUT_STATS, CV_URL, EDUCATION, EXPERIENCE, LANGUAGES, PRINCIPLES, PROJECTS, ROADMAP, TIMELINE } from "@/lib/Data";
import { PROJECT_IMAGES } from "@/lib/projectImages";
import PillLink from "./PillLink";
import Section from "./Section";
import Skills from "./Skills";
import { Chip } from "./TechIcon";

/** Stagger for `data-reveal` items: each one starts a little after the last. */
const delay = (i: number) => ({ "--reveal-delay": `${i * 90}ms` }) as CSSProperties;

/** Round arrow that turns and fills mint when its `group` is hovered. */
function ArrowDot({ className = "" }: { className?: string }) {
  return (
    <span
      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-veil/10 text-faint transition-[transform,background-color,color,border-color] duration-300 ease-out group-hover:rotate-45 group-hover:border-mint group-hover:bg-mint group-hover:text-onaccent ${className}`}
      aria-hidden="true"
    >
      <ArrowUpRight className="h-4 w-4" />
    </span>
  );
}

export function About() {
  return (
    <Section
      id="about"
      title="About"
      heading={
        <>
          Banking backends in <span className="text-mint">Java and Go</span>.
        </>
      }
    >
      <div className="space-y-5 text-[17px] leading-8 text-muted">
        <p data-reveal style={delay(0)}>
          <span className="text-ink">
            I build Java and Go services for banks: USSD banking, payment workflows, and integrations with legacy core banking systems.
          </span>{" "}
          For almost four years at Atlas Computer
          Technology I&apos;ve built banking software for four Ethiopian banks: payment services, USSD banking that works on any phone,
          and the integrations that connect new services to decades-old core banking systems.
        </p>
        <p data-reveal style={delay(1)}>
          The problems I enjoy most sit where things fail: a network that drops a response, a core system that answers slowly, a
          migration that must not change a single screen. I ported a production USSD gateway from Java/Spring Boot to{" "}
          <span className="text-ink">Go</span>, and running the old and new gateways side by side caught{" "}
          <span className="text-ink">12 behaviour differences before any customer saw one</span>.
        </p>
        <p data-reveal style={delay(2)}>
          I&apos;m looking for a remote backend role where payments, messaging or reliability are the core problem. I work in English
          every day and overlap a full workday with Europe.
        </p>
      </div>

      <dl className="mt-12 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-veil/[0.08] bg-veil/[0.08]">
        {ABOUT_STATS.map((s, i) => (
          <div key={s.label} data-reveal style={delay(i)} className="flex flex-col bg-ground px-4 py-5 sm:px-6">
            <dt className="order-2 mt-1 text-xs leading-5 text-muted sm:text-sm">{s.label}</dt>
            <dd className="font-display text-4xl text-ink sm:text-5xl">{s.value}</dd>
          </div>
        ))}
      </dl>

      <h3 data-reveal className="mt-14 font-mono text-xs uppercase tracking-[0.14em] text-faint">
        How I approach architecture
      </h3>
      <ul className="mt-5 grid gap-3 sm:grid-cols-3">
        {PRINCIPLES.map((p, i) => (
          <li key={p.title} data-reveal data-tilt style={delay(i)} className="glass relative rounded-2xl p-5">
            <span className="font-mono text-sm text-mint" aria-hidden="true">
              {p.icon}
            </span>
            <p className="mt-3 font-medium text-ink">{p.title}</p>
            <p className="mt-1.5 text-sm leading-6 text-muted">{p.text}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function Experience() {
  const steps = [...TIMELINE].reverse();
  return (
    <Section
      id="experience"
      title="Experience"
      heading="Production banking systems since 2022."
      intro="One company, four banks, and a steady move from building features to owning the systems underneath them."
    >
      <article data-reveal data-tilt className="glass glow rounded-2xl p-6 sm:p-8">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-medium text-ink">{EXPERIENCE.role}</h3>
            <p className="mt-1 text-muted">
              {EXPERIENCE.company} · {EXPERIENCE.location}
            </p>
          </div>
          <p className="rounded-full border border-mint/30 px-3 py-1 font-mono text-xs text-mint">{EXPERIENCE.period}</p>
        </header>
        <p className="mt-4 text-[15px] leading-7 text-muted">{EXPERIENCE.summary}</p>

        <ol className="relative mt-8 space-y-7 border-l border-veil/10 pl-7">
          {steps.map((item, i) => (
            <li key={item.title} data-reveal style={delay(i)} className="relative">
              <span
                aria-hidden="true"
                className={`absolute -left-[33px] top-1.5 h-[11px] w-[11px] rounded-full border-2 ${
                  i === 0 ? "border-mint bg-mint shadow-[0_0_0_5px_rgb(var(--mint)/0.15)]" : "border-mint/60 bg-ground"
                }`}
              />
              {item.when && <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-faint">{item.when}</p>}
              <p className="font-medium text-ink">{item.title}</p>
              <p className="mt-1 text-sm leading-6 text-muted">{item.text}</p>
            </li>
          ))}
        </ol>

        <h4 className="mt-10 font-mono text-xs uppercase tracking-[0.14em] text-faint">Engineering achievements</h4>
        <ul className="mt-4 space-y-2.5">
          {EXPERIENCE.responsibilities.slice(0, 6).map((r) => (
            <li key={r} className="flex gap-3 text-sm leading-6 text-muted">
              <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-mint" aria-hidden="true" />
              {r}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-1.5">
          {["Go", "Java", "Spring Boot", "Kafka", "Redis", "PostgreSQL", "Camunda BPMN", "Docker"].map((t) => (
            <Chip key={t} name={t} />
          ))}
        </div>
      </article>

      <div data-reveal className="mt-4 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
        <div className="glass rounded-2xl p-5 sm:p-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-faint">{EDUCATION.period}</p>
          <p className="mt-1 font-medium text-ink">{EDUCATION.degree}</p>
          <p className="text-sm text-muted">
            {EDUCATION.school} · {LANGUAGES}
          </p>
        </div>
        <PillLink href={CV_URL} download tone="ghost">
          <FileText className="h-4 w-4" /> Download CV
        </PillLink>
      </div>
    </Section>
  );
}

export function Work() {
  const featured = PROJECTS.filter((p) => p.featured);
  const more = PROJECTS.filter((p) => !p.featured);

  return (
    <Section
      id="work"
      title="Work"
      heading="Case studies"
      intro="The problem, the hard part, the decisions and the outcome. Each one opens with an interactive diagram of how a request moves through the system."
    >
      <ul className="space-y-6">
        {featured.map((project) => {
          const image = PROJECT_IMAGES[project.slug];
          const cs = project.caseStudy;
          return (
            <li key={project.slug} data-reveal data-tilt className="glass group relative overflow-hidden rounded-2xl">
              <Link href={`/work/${project.slug}`} className="grid gap-0 sm:grid-cols-[minmax(0,1fr)_200px]">
                <div className="p-6 sm:p-7">
                  <p className="font-mono text-xs text-mint">
                    {project.number} · {project.eyebrow}
                  </p>
                  <h3 className="mt-3 flex items-start justify-between gap-4 text-xl font-medium leading-snug text-ink sm:text-2xl">
                    <span className="transition-colors group-hover:text-mint">{project.title}</span>
                    <ArrowDot />
                  </h3>
                  {cs ? (
                    <dl className="mt-5 grid gap-4 text-sm leading-6 sm:grid-cols-2">
                      <div>
                        <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-faint">Problem</dt>
                        <dd className="mt-1 text-muted">{cs.problem}</dd>
                      </div>
                      <div>
                        <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-faint">Outcome</dt>
                        <dd className="mt-1 text-ink">{cs.result}</dd>
                      </div>
                    </dl>
                  ) : (
                    <p className="mt-3 text-sm leading-6 text-muted">{project.body}</p>
                  )}
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <Chip key={tag} name={tag} />
                    ))}
                  </div>
                </div>
                {image && (
                  <div className="relative hidden border-l border-veil/[0.08] sm:block">
                    <Image
                      src={image}
                      alt={`Architecture diagram: ${project.title}`}
                      fill
                      sizes="200px"
                      className="object-cover opacity-60 grayscale transition-[filter,opacity,transform] duration-500 ease-out group-hover:scale-105 group-hover:opacity-90 group-hover:grayscale-0"
                    />
                  </div>
                )}
              </Link>
            </li>
          );
        })}
      </ul>

      {more.length > 0 && (
        <>
          <h3 data-reveal className="mt-16 font-mono text-xs uppercase tracking-[0.14em] text-faint">
            More work
          </h3>
          <ul className="mt-4 divide-y divide-veil/[0.07] border-y border-veil/[0.07]">
            {more.map((p) => (
              <li key={p.slug} data-reveal>
                <Link href={`/work/${p.slug}`} className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-4">
                  <span className="font-mono text-xs text-faint">{p.number}</span>
                  <span>
                    <span className="block text-ink transition-colors group-hover:text-mint">{p.title}</span>
                    <span className="block text-sm text-muted">{p.tags.join(" · ")}</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-faint transition-[transform,color] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-mint" />
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}

      <h3 data-reveal className="mt-16 font-mono text-xs uppercase tracking-[0.14em] text-faint">
        Building next
      </h3>
      <p data-reveal className="mt-2 text-sm leading-6 text-muted">
        Projects I&apos;m building in public. Each one gets its own repo and case study here when it ships.
      </p>
      <ul className="mt-4 grid gap-3 sm:grid-cols-3">
        {ROADMAP.map((item, i) => (
          <li key={item.title} data-reveal style={delay(i)} className="rounded-2xl border border-dashed border-veil/[0.14] p-4">
            <span
              className={`rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] ${
                item.status === "In progress" ? "border-lcd/40 text-lcd" : "border-veil/15 text-faint"
              }`}
            >
              {item.status}
            </span>
            <h4 className="mt-3 font-medium leading-snug text-ink">{item.title}</h4>
            <p className="mt-2 text-sm leading-6 text-muted">{item.body}</p>
            <p className="mt-2 font-mono text-[11px] text-mint">{item.stack.join(" · ")}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function PlaygroundSection() {
  return (
    <Section
      id="playground"
      title="Playground"
      stacked
      heading={
        <>
          Inside my <span className="text-mint">engineering world</span>
        </>
      }
      intro="Small, working demos of the ideas I use every day. Click around: each one shows a failure, and the design that handles it."
    >
      <Playground />
    </Section>
  );
}

export function Stack() {
  return (
    <Section id="stack" title="Skills" heading="The tools I reach for." intro="Grouped by what they do in a system. Pick one to see where I used it.">
      <Skills />
    </Section>
  );
}
