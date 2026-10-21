import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import ProcessFlow from "@/components/ProcessFlow";
import Footer from "@/components/site/Footer";
import { Chip } from "@/components/site/TechIcon";
import TopBar from "@/components/site/TopBar";
import { GITHUB_URL, PROJECTS } from "@/lib/Data";
import { PROJECT_IMAGES } from "@/lib/projectImages";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = PROJECTS.find((item) => item.slug === slug);
  return project ? { title: `${project.title} — Robel Mamushet`, description: project.details.summary } : {};
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-rule px-5 py-8 sm:px-8">
      <h2 className="text-lg font-semibold tracking-[-0.02em]">{title}</h2>
      <div className="mt-4">{children}</div>
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

  return (
    <>
      <TopBar />
      <main className="column">
        <div className="flex items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/#work" className="press inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink">
            <ArrowLeft className="h-3.5 w-3.5" /> All work
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
        <div className="hatch" aria-hidden="true" />

        <header className="px-5 py-8 sm:px-8">
          <p className="font-mono text-xs text-faint">{project.number} · {project.eyebrow}</p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.035em] sm:text-4xl">{project.title}</h1>
          <p className="mt-4 text-[15px] leading-7 text-muted">{project.details.summary}</p>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.details.stack.map((tag) => (
              <Chip key={tag} name={tag} />
            ))}
          </div>
        </header>

        {image && (
          <figure className="border-t border-rule px-5 py-6 sm:px-8">
            <div className="overflow-hidden rounded border border-rule bg-panel">
              <Image src={image} alt={`${project.title} diagram`} className="h-auto w-full" sizes="760px" priority />
            </div>
            <figcaption className="mt-2 font-mono text-[11px] text-faint">Fig. {project.number}. {project.eyebrow}</figcaption>
          </figure>
        )}

        {project.caseStudy && (
          <>
            <div className="grid border-t border-rule sm:grid-cols-2">
              {[
                ["Context", project.caseStudy.context],
                ["Problem", project.caseStudy.problem],
                ["My role", project.caseStudy.role],
                ["Result", project.caseStudy.result],
              ].map(([label, text], i) => (
                <div key={label} className={`border-rule px-5 py-6 sm:px-8 ${i < 2 ? "border-b" : ""} ${i % 2 === 0 ? "sm:border-r" : ""} max-sm:border-b`}>
                  <h2 className={`text-sm font-medium ${label === "Result" ? "text-gold" : "text-muted"}`}>{label}</h2>
                  <p className="mt-2 text-[15px] leading-7 text-ink">{text}</p>
                </div>
              ))}
            </div>
            <Block title="Key decisions">
              <ol className="space-y-3">
                {project.caseStudy.decisions.map((item, i) => (
                  <li key={item} className="flex gap-3 text-[15px] leading-7">
                    <span className="mt-[3px] font-mono text-xs text-faint">{i + 1}.</span>
                    {item}
                  </li>
                ))}
              </ol>
            </Block>
          </>
        )}

        <Block title="How it works">
          <ProcessFlow steps={project.steps} />
        </Block>

        <Block title="What I did">
          <ul className="space-y-3">
            {project.details.responsibilities.map((item) => (
              <li key={item} className="flex gap-3 text-[15px] leading-7">
                <span className="mt-[11px] h-1 w-1 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </Block>

        <Link href={`/work/${next.slug}`} className="group flex items-center justify-between border-t border-rule px-5 py-6 transition-colors hover:bg-panel sm:px-8">
          <span>
            <span className="block text-sm text-muted">Next</span>
            <span className="mt-1 block font-semibold tracking-[-0.02em]">{next.title}</span>
          </span>
          <ArrowUpRight className="h-5 w-5 text-faint transition-[transform,color] duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold" />
        </Link>

        <Footer />
      </main>
    </>
  );
}
