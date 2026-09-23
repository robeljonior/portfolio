import { SYSTEMS } from "@/lib/Data";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProcessFlow from "@/components/ProcessFlow";
import deviceTrackingImage from "@/lib/images/Distributed device tracking.png";
import integrationImage from "@/lib/images/Distributed_system_integration.png";
import goBackendImage from "@/lib/images/Go_backend_services.png";
import dotnetImage from "@/lib/images/NET_enterprise_applications.png";
import qualityImage from "@/lib/images/Qualit_ and_release_confidence.png";
import paymentImage from "@/lib/images/payment_system.png";
import ussdImage from "@/lib/images/ussd.png";

const SYSTEM_IMAGES: Record<string, StaticImageData> = {
  "payment-transaction-flows": paymentImage,
  "distributed-system-integration": integrationImage,
  "go-backend-services": goBackendImage,
  "quality-release-confidence": qualityImage,
  "dotnet-enterprise-applications": dotnetImage,
  "ussd-mobile-gateway": ussdImage,
  "realtime-device-tracking": deviceTrackingImage,
};

export function generateStaticParams() {
  return SYSTEMS.map((system) => ({ slug: system.slug }));
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const system = SYSTEMS.find((item) => item.slug === slug);

  if (!system) return notFound();

  return (
    <section className="min-h-screen bg-ink px-5 py-20 text-paper sm:px-8 sm:py-28 lg:px-10">
      <div className="mx-auto max-w-[900px]">
        <div className="flex items-center justify-between">
          <Link href="/#work" className="font-mono text-[11px] text-gold-bright hover:underline">
            ← back to work
          </Link>
          <a
            href={system.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-[2px] border border-[#527078] px-3 py-1.5 font-mono text-[10px] text-[#d3dfd9] transition-colors hover:border-gold-bright hover:text-gold-bright"
          >
            View on GitHub ↗
          </a>
        </div>

        <p className="mt-8 font-mono text-[10px] uppercase tracking-[.13em] text-[#aebdb7]">
          {system.number} / {system.eyebrow}
        </p>
        <h1 className="mt-4 text-4xl font-extrabold tracking-[-.06em] sm:text-6xl">
          {system.title}
        </h1>
        <p className="mt-8 max-w-[640px] text-base leading-7 text-[#b9c7c1]">
          {system.details.summary}
        </p>

        {SYSTEM_IMAGES[system.slug] && (
          <div className="mt-10 overflow-hidden rounded-[2px] border border-[#3a5259] bg-white/[0.03] p-3 sm:p-5">
            <Image
              src={SYSTEM_IMAGES[system.slug]}
              alt={`${system.title} preview`}
              className="h-auto w-full object-contain"
              sizes="(max-width: 900px) 100vw, 900px"
              priority
            />
          </div>
        )}

        <h2 className="mt-16 font-mono text-[10px] uppercase tracking-[.13em] text-[#aebdb7]">
          How it works
        </h2>
        <ProcessFlow steps={system.steps} />

        <h2 className="mt-16 font-mono text-[10px] uppercase tracking-[.13em] text-[#aebdb7]">
          What I did
        </h2>
        <ul className="mt-4 space-y-3">
          {system.details.responsibilities.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-6 text-[#b9c7c1]">
              <span className="text-gold-bright">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-14 flex flex-wrap gap-2">
          {system.details.stack.map((tag) => (
            <span key={tag} className="rounded-[2px] border border-[#527078] px-2.5 py-1 font-mono text-[9px] text-[#d3dfd9]">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
