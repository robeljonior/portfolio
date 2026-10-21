import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";
import { CV_URL, EDUCATION, EXPERIENCE, LANGUAGES, PROJECTS, STACK_GROUPS, TIMELINE } from "@/lib/Data";
import { PROJECT_IMAGES } from "@/lib/projectImages";
import Section from "./Section";
import { Chip } from "./TechIcon";
import UssdDemo from "./UssdDemo";

const arrow =
  "inline-block h-4 w-4 shrink-0 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5";

export function About() {
  return (
    <Section id="about" title="About">
      <div className="space-y-4 text-[15px] leading-7 text-muted">
        <p>
          I&apos;m a full-stack engineer who starts at the backend. For almost four years at{" "}
          <span className="text-ink">Atlas Computer Technology</span> I&apos;ve built banking systems for four
          Ethiopian banks: payment services, USSD banking that works on any phone, and the integrations that
          connect new services to decades-old core banking systems.
        </p>
        <p>
          My strongest work is careful migration. I ported a production USSD gateway from Java/Spring Boot to{" "}
          <span className="text-ink">Go</span>; running the old and new gateways side by side caught{" "}
          <span className="text-ink">12 behaviour differences before any customer saw one</span>.
        </p>
        <p>
          I also build the front of the stack: Node.js services and <span className="text-ink">Next.js / TypeScript</span>{" "}
          dashboards on top of the APIs, and earlier React and React Native apps.
        </p>
        <p>
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
      <ol className="group/list space-y-12">
        <li className="grid gap-2 sm:grid-cols-[130px_1fr] sm:gap-8">
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

        <li className="grid gap-2 sm:grid-cols-[130px_1fr] sm:gap-8">
          <p className="pt-0.5 font-mono text-xs uppercase tracking-[0.08em] text-faint">{EDUCATION.period}</p>
          <div>
            <h3 className="font-medium leading-snug text-ink">{EDUCATION.degree}</h3>
            <p className="text-sm text-faint">{EDUCATION.school}</p>
            <p className="mt-3 text-sm text-muted">Languages: {LANGUAGES}</p>
          </div>
        </li>
      </ol>

      <a href={CV_URL} download className="group mt-12 inline-flex items-center gap-2 font-medium text-ink hover:text-gold">
        <FileText className="h-4 w-4" /> Download full CV <ArrowUpRight className={arrow} />
      </a>
    </Section>
  );
}

export function Work() {
  const featured = PROJECTS.filter((p) => p.featured);
  const more = PROJECTS.filter((p) => !p.featured);

  return (
    <Section id="work" title="Work">
      <div className="rounded-lg border border-rule bg-panel/60 p-4 sm:p-6">
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
            <li key={project.slug} className="group relative grid gap-4 sm:grid-cols-[150px_1fr] sm:gap-8">
              <div className="order-2 sm:order-1">
                {image ? (
                  <Image
                    src={image}
                    alt=""
                    sizes="150px"
                    className="aspect-[16/10] w-full max-w-[200px] rounded border border-rule object-cover opacity-80 grayscale transition-[filter,opacity] duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                  />
                ) : (
                  <div className="grid aspect-[16/10] w-full max-w-[200px] place-items-center rounded border border-rule bg-panel font-mono text-xs text-faint">
                    {project.tags[0]}
                  </div>
                )}
              </div>
              <div className="order-1 sm:order-2">
                <h3 className="font-medium leading-snug text-ink">
                  <Link href={`/work/${project.slug}`} className="inline-flex items-baseline gap-1 group-hover:text-gold">
                    <span className="absolute -inset-3 rounded-md transition-colors group-hover:bg-panel/70 sm:-inset-4" aria-hidden="true" />
                    <span className="relative">{project.title}</span>
                    <ArrowUpRight className={`relative ${arrow}`} />
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

      <h3 className="mt-16 font-mono text-xs uppercase tracking-[0.14em] text-faint">More work</h3>
      <ul className="mt-3 divide-y divide-rule border-y border-rule">
        {more.map((project) => (
          <li key={project.slug}>
            <Link href={`/work/${project.slug}`} className="group flex items-center gap-4 py-3 transition-colors duration-150 hover:bg-panel/70">
              <span className="min-w-0 flex-1 pl-1">
                <span className="block truncate text-sm font-medium text-ink group-hover:text-gold">{project.title}</span>
                <span className="block truncate text-xs text-muted">{project.tags.join(" · ")}</span>
              </span>
              <ArrowUpRight className={`mr-1 text-faint group-hover:text-gold ${arrow}`} />
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function Stack() {
  return (
    <Section id="stack" title="Stack">
      <dl className="divide-y divide-rule">
        {STACK_GROUPS.map((group) => (
          <div key={group.label} className="grid gap-3 py-4 first:pt-0 last:pb-0 sm:grid-cols-[150px_1fr]">
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
