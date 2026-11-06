import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowUpRight, FileText } from "lucide-react";
import { CV_URL, EDUCATION, EXPERIENCE, LANGUAGES, PROJECTS, ROADMAP, STACK_GROUPS, TIMELINE } from "@/lib/Data";
import { PROJECT_IMAGES } from "@/lib/projectImages";
import PillLink from "./PillLink";
import Section from "./Section";
import { Chip } from "./TechIcon";
import UssdDemo from "./UssdDemo";

/** Stagger for `data-reveal` items: each one starts a little after the last. */
const delay = (i: number) => ({ "--reveal-delay": `${i * 90}ms` }) as CSSProperties;

/** Round arrow that turns and fills gold when its `group` is hovered. */
function ArrowDot({ className = "" }: { className?: string }) {
  return (
    <span
      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-veil/10 text-faint transition-[transform,background-color,color,border-color] duration-300 ease-out group-hover:rotate-45 group-hover:border-gold group-hover:bg-gold group-hover:text-onaccent ${className}`}
      aria-hidden="true"
    >
      <ArrowUpRight className="h-4 w-4" />
    </span>
  );
}

export function About() {
  return (
    <Section id="about" title="About">
      <div className="space-y-4 text-[15px] leading-7 text-muted">
        <p data-reveal style={delay(0)}>
          I&apos;m a full-stack engineer who starts at the backend. For almost four years at{" "}
          <span className="text-ink">Atlas Computer Technology</span> I&apos;ve built banking systems for four
          Ethiopian banks: payment services, USSD banking that works on any phone, and the integrations that
          connect new services to decades-old core banking systems.
        </p>
        <p data-reveal style={delay(1)}>
          My strongest work is careful migration. I ported a production USSD gateway from Java/Spring Boot to{" "}
          <span className="text-ink">Go</span>; running the old and new gateways side by side caught{" "}
          <span className="text-ink">12 behaviour differences before any customer saw one</span>.
        </p>
        <p data-reveal style={delay(2)}>
          I also build the front of the stack: Node.js services and <span className="text-ink">Next.js / TypeScript</span>{" "}
          dashboards on top of the APIs, and earlier React and React Native apps.
        </p>
        <p data-reveal style={delay(3)}>
          I&apos;m looking for a remote backend or full-stack role with a team that cares about correctness. I work in
          English every day and overlap a full workday with Europe.
        </p>
      </div>
    </Section>
  );
}

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      <ol className="group/list space-y-6">
        <li data-reveal data-tilt className="glass glow grid gap-2 rounded-2xl p-5 sm:grid-cols-[130px_1fr] sm:gap-8 sm:p-6">
          <p className="pt-0.5 font-mono text-xs uppercase tracking-[0.08em] text-faint">{EXPERIENCE.period}</p>
          <div>
            <h3 className="font-medium leading-snug text-ink">
              {EXPERIENCE.role} · {EXPERIENCE.company}
            </h3>
            <p className="text-sm text-faint">Junior Developer → Software Engineer · {EXPERIENCE.location}</p>
            <p className="mt-3 text-sm leading-6 text-muted">{EXPERIENCE.summary}</p>

            <ul className="mt-4 space-y-3">
              {TIMELINE.slice(1, -1).reverse().map((item) => (
                <li key={item.title} className="text-sm leading-6">
                  <span className="text-ink">{item.title}.</span> <span className="text-muted">{item.text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {["Go", "Java", "Spring Boot", "Kafka", "Redis", "PostgreSQL", "Next.js", "TypeScript"].map((t) => (
                <Chip key={t} name={t} />
              ))}
            </div>
          </div>
        </li>

        <li data-reveal data-tilt style={delay(1)} className="glass relative grid gap-2 rounded-2xl p-5 sm:grid-cols-[130px_1fr] sm:gap-8 sm:p-6">
          <p className="pt-0.5 font-mono text-xs uppercase tracking-[0.08em] text-faint">{EDUCATION.period}</p>
          <div>
            <h3 className="font-medium leading-snug text-ink">{EDUCATION.degree}</h3>
            <p className="text-sm text-faint">{EDUCATION.school}</p>
            <p className="mt-3 text-sm text-muted">Languages: {LANGUAGES}</p>
          </div>
        </li>
      </ol>

      <div data-reveal className="mt-10">
        <PillLink href={CV_URL} download tone="ghost">
          <FileText className="h-4 w-4" /> Download full CV
        </PillLink>
      </div>
    </Section>
  );
}

export function Work() {
  const featured = PROJECTS.filter((p) => p.featured);

  return (
    <Section id="work" title="Work">
      <div data-reveal className="theme-dark glass glow rounded-2xl bg-ground p-4 sm:p-6">
        <h3 className="font-medium text-ink">Try it: a USSD banking session</h3>
        <p className="mb-6 mt-1 text-sm leading-6 text-muted">
          USSD is how millions of people without smartphones bank: dial a short code, answer a text menu. This is
          the flow my Go gateway serves, with the real request path beside it.
        </p>
        <UssdDemo />
      </div>

      <ul className="mt-14 space-y-12">
        {featured.map((project) => {
          const image = PROJECT_IMAGES[project.slug];
          return (
            <li key={project.slug} data-reveal className="group relative isolate grid gap-4 sm:grid-cols-[150px_1fr] sm:gap-8">
              <div className="relative order-2 w-full max-w-[200px] self-start overflow-hidden rounded-lg border border-veil/10 sm:order-1">
                {image ? (
                  <Image
                    src={image}
                    alt=""
                    sizes="150px"
                    className="aspect-[16/10] w-full object-cover opacity-80 grayscale transition-[filter,opacity,transform] duration-500 ease-out group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0"
                  />
                ) : (
                  <div className="grid aspect-[16/10] w-full place-items-center glass-soft font-mono text-xs text-faint transition-transform duration-500 ease-out group-hover:scale-110">
                    {project.tags[0]}
                  </div>
                )}
              </div>
              <div className="order-1 sm:order-2">
                <h3 className="font-medium leading-snug text-ink">
                  <Link href={`/work/${project.slug}`} className="flex items-start justify-between gap-3 group-hover:text-gold">
                    <span className="glass absolute -inset-3 -z-10 rounded-2xl opacity-0 transition-opacity duration-200 group-hover:opacity-100 sm:-inset-4" aria-hidden="true" />
                    <span className="relative pt-1">{project.title}</span>
                    <ArrowDot className="relative" />
                  </Link>
                </h3>
                <p className="relative mt-2 text-sm leading-6 text-muted">{project.body}</p>
                {project.caseStudy && (
                  <p className="relative mt-2 text-sm leading-6 text-ink">
                    <span className="text-gold">Result:</span> {project.caseStudy.result}
                  </p>
                )}
                <div className="relative mt-3 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <Chip key={tag} name={tag} />
                  ))}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <h3 data-reveal className="mt-16 font-mono text-xs uppercase tracking-[0.14em] text-faint">Building next</h3>
      <p data-reveal className="mt-2 text-sm leading-6 text-muted">
        Projects I&apos;m building in public. Each one gets its own repo and case study here when it ships.
      </p>
      <ul className="mt-4 space-y-3">
        {ROADMAP.map((item, i) => (
          <li
            key={item.title}
            data-reveal
            style={delay(i)}
            className="rounded-2xl border border-dashed border-veil/[0.14] p-4 sm:p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <h4 className="font-medium leading-snug text-ink">{item.title}</h4>
              <span
                className={`shrink-0 rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] ${
                  item.status === "In progress" ? "border-lcd/40 text-lcd" : "border-veil/15 text-faint"
                }`}
              >
                {item.status}
              </span>
            </div>
            <p className="mt-2 text-sm leading-6 text-muted">{item.body}</p>
            <p className="mt-2 text-sm leading-6">
              <span className="text-gold">Shows:</span> <span className="text-ink">{item.shows.join(" · ")}</span>
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {item.stack.map((tag) => (
                <Chip key={tag} name={tag} />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function Stack() {
  return (
    <Section id="stack" title="Stack">
      <dl className="glass divide-y divide-veil/[0.06] rounded-2xl px-5 sm:px-6">
        {STACK_GROUPS.map((group, i) => (
          <div key={group.label} data-reveal style={delay(i)} className="grid gap-3 py-4 sm:grid-cols-[150px_1fr]">
            <dt className="text-sm text-muted">{group.label}</dt>
            <dd className="flex flex-wrap gap-1.5">
              {group.values.map((value) => (
                <Chip key={value} name={value} />
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
