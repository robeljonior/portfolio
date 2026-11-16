import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import ProcessFlow from "@/components/ProcessFlow";
import Footer from "@/components/site/Footer";
import Nav from "@/components/site/Nav";
import RequestFlow from "@/components/site/RequestFlow";
import ScrollEffects from "@/components/site/ScrollEffects";
import { Chip } from "@/components/site/TechIcon";
import { GITHUB_URL, PROJECTS } from "@/lib/Data";
import { PROJECT_IMAGES } from "@/lib/projectImages";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = PROJECTS.find((item) => item.slug === slug);
  if (!project) return {};
  const title = `${project.title} · Case study · Robel Mamushet`;
  return {
    title,
    description: project.details.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: { title, description: project.details.summary, type: "article" },
  };
}

/** One numbered part of the case study. */
function Part({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <section data-reveal className="grid gap-4 border-t border-veil/[0.07] py-10 md:grid-cols-[220px_minmax(0,1fr)] md:gap-10">
      <h2 className="flex items-baseline gap-3 md:block">
        <span className="font-mono text-xs text-mint">{String(n).padStart(2, "0")}</span>
        <span className="font-display text-3xl text-ink md:mt-2 md:block">{title}</span>
      </h2>
      <div className="min-w-0 text-[16px] leading-8 text-muted">{children}</div>
    </section>
  );
}

export default async function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = PROJECTS.find((item) => item.slug === slug);
  if (!project) return notFound();

  const image = PROJECT_IMAGES[project.slug];
  const index = PROJECTS.indexOf(project);
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  const cs = project.caseStudy;
  let n = 0;

  return (
    <>
      <ScrollEffects />
      <Nav />
      <main id="content" className="relative z-[1] mx-auto max-w-page px-6 sm:px-10">
        <div className="flex items-center justify-between py-6">
          <Link href="/#work" className="press inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink">
            <ArrowLeft className="h-3.5 w-3.5" /> All case studies
          </Link>
          <a
            href={project.repo ?? GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="press inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
          >
            {project.repo ? "View code" : "GitHub"} <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <header className="max-w-3xl pb-12 pt-6">
          <p className="animate-rise font-mono text-xs text-mint">
            Case study {project.number} · {project.eyebrow}
          </p>
          <h1 className="font-display mt-4 animate-rise text-5xl leading-[1.02] text-ink [animation-delay:80ms] sm:text-6xl">{project.title}</h1>
          <p className="mt-6 animate-rise text-lg leading-8 text-muted [animation-delay:160ms]">{project.details.summary}</p>
        </header>

        {project.flow && (
          <div data-reveal className="pb-12">
            <RequestFlow hops={project.flow} title="Architecture · follow a request" />
          </div>
        )}

        {cs && (
          <Part n={++n} title="Business problem">
            <p>{cs.context}</p>
            <p className="mt-4 text-ink">{cs.problem}</p>
          </Part>
        )}

        {cs?.challenge && (
          <Part n={++n} title="Technical challenge">
            <p className="text-ink">{cs.challenge}</p>
          </Part>
        )}

        {(image || !project.flow) && (
          <Part n={++n} title="Architecture">
            {image ? (
              <figure>
                <div className="glass overflow-hidden rounded-xl">
                  <Image src={image} alt={`${project.title} architecture diagram`} className="h-auto w-full" sizes="(min-width: 768px) 820px, 100vw" />
                </div>
                <figcaption className="mt-2 font-mono text-[11px] text-faint">
                  Fig. {project.number}. {project.eyebrow}
                </figcaption>
              </figure>
            ) : (
              <ProcessFlow steps={project.steps} />
            )}
          </Part>
        )}

        <Part n={++n} title="Technologies">
          <div className="flex flex-wrap gap-1.5">
            {project.details.stack.map((tag) => (
              <Chip key={tag} name={tag} />
            ))}
          </div>
        </Part>

        {cs && (
          <Part n={++n} title="Engineering decisions">
            <ol className="space-y-4">
              {cs.decisions.map((item, i) => (
                <li key={item} className="flex gap-4">
                  <span className="mt-[3px] font-mono text-xs text-mint">{i + 1}.</span>
                  <span className="text-ink">{item}</span>
                </li>
              ))}
            </ol>
          </Part>
        )}

        <Part n={++n} title="Implementation">
          {cs && <p className="mb-5 text-ink">{cs.role}</p>}
          <ul className="space-y-2.5">
            {project.details.responsibilities.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-[14px] h-1 w-1 shrink-0 rounded-full bg-mint" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          {project.flow && (
            <div className="mt-8">
              <ProcessFlow steps={project.steps} />
            </div>
          )}
        </Part>

        {cs && (
          <Part n={++n} title="Outcome">
            <p className="font-display text-3xl leading-tight text-ink sm:text-[2.1rem]">{cs.result}</p>
          </Part>
        )}

        <Link
          href={`/work/${next.slug}`}
          className="group my-12 flex items-center justify-between gap-6 rounded-2xl border border-veil/[0.08] p-6 transition-colors hover:border-mint/40 sm:p-8"
        >
          <span>
            <span className="block font-mono text-xs text-faint">Next case study</span>
            <span className="font-display mt-2 block text-3xl text-ink transition-colors group-hover:text-mint">{next.title}</span>
          </span>
          <ArrowUpRight className="h-6 w-6 shrink-0 text-faint transition-[transform,color] duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-mint" />
        </Link>
      </main>
      <Footer />
    </>
  );
}
