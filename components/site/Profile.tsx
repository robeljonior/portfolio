import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { Briefcase, Clock, FileText, Mail, MapPin } from "lucide-react";
import { CV_URL, EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/Data";
import SocialIcon from "@/components/ui/SocialIcon";
import CopyButton from "./CopyButton";
import LocalTime from "./LocalTime";
import UssdDemo from "./UssdDemo";

const ROLES = ["Backend engineer", "Go migration", "USSD banking", "Core banking integration"];

/** Drop a photo at public/avatar.(jpg|png|webp) and it replaces the monogram. */
function findAvatar() {
  for (const ext of ["jpg", "jpeg", "png", "webp"]) {
    const file = `avatar.${ext}`;
    if (fs.existsSync(path.join(process.cwd(), "public", file))) return `/${file}`;
  }
  return null;
}

function Banner() {
  return (
    <div className="relative h-40 overflow-hidden border-b border-rule bg-panel sm:h-48" aria-hidden="true">
      <svg viewBox="0 0 760 192" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <defs>
          <pattern id="dots" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#1f2929" />
          </pattern>
        </defs>
        <rect width="760" height="192" fill="url(#dots)" />
        {/* the request path, left to right */}
        <path d="M40 150 H250 L290 110 H470 L510 70 H720" fill="none" stroke="#2c3a3a" strokeWidth="1.5" strokeDasharray="4 6" />
        {[40, 250, 470, 720].map((x, i) => (
          <circle key={x} cx={x} cy={[150, 150, 110, 70][i]} r="4" fill={i === 1 ? "#e6c669" : "#b9d27a"} />
        ))}
        <text
          x="752"
          y="180"
          textAnchor="end"
          fontFamily="var(--font-mono)"
          fontSize="132"
          fontWeight="500"
          fill="none"
          stroke="#2c3a3a"
          strokeWidth="1.5"
          letterSpacing="-4"
        >
          *123#
        </text>
      </svg>
    </div>
  );
}

function InfoRow({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex min-h-11 items-center gap-3 border-b border-rule px-5 py-2.5 text-sm sm:px-8 sm:[&:nth-last-child(-n+2)]:border-b-0">
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-rule bg-panel text-muted">
        {icon}
      </span>
      <div className="flex min-w-0 flex-1 items-center justify-between gap-2">{children}</div>
    </div>
  );
}

export default function Profile() {
  const avatar = findAvatar();

  return (
    <section id="top" aria-labelledby="name">
      <Banner />

      <div className="relative px-5 pb-6 sm:px-8">
        <div className="-mt-12 h-24 w-24 overflow-hidden rounded-full border-4 border-ground bg-raised sm:-mt-14 sm:h-28 sm:w-28">
          {avatar ? (
            <Image src={avatar} alt="Robel Mamushet" width={112} height={112} className="h-full w-full object-cover" priority />
          ) : (
            <span className="grid h-full w-full place-items-center text-3xl font-semibold tracking-[-0.04em] text-gold">RM</span>
          )}
        </div>

        <h1 id="name" className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
          Robel Mamushet
        </h1>
        <p className="mt-2 max-w-[56ch] text-base leading-relaxed text-muted">
          Backend engineer building banking systems in Go and Java. I ported a production USSD gateway
          to Go and caught 12 behaviour differences before release.
        </p>

        <ul className="mt-5 flex flex-wrap gap-x-2 gap-y-1 font-mono text-[11px] uppercase tracking-[0.08em] text-faint">
          {ROLES.map((role, i) => (
            <li key={role} className={i === 0 ? "text-ink" : undefined}>
              {i > 0 && <span className="mr-2 text-rule-strong">/</span>}
              {role}
            </li>
          ))}
        </ul>
      </div>

      <div className="grid border-t border-rule sm:grid-cols-2 sm:[&>*:nth-child(odd)]:border-r">
        <InfoRow icon={<MapPin className="h-3.5 w-3.5" />}>
          <span>Addis Ababa, Ethiopia</span>
        </InfoRow>
        <InfoRow icon={<Clock className="h-3.5 w-3.5" />}>
          <LocalTime />
        </InfoRow>
        <InfoRow icon={<Mail className="h-3.5 w-3.5" />}>
          <a href={`mailto:${EMAIL}`} className="truncate hover:underline">
            {EMAIL}
          </a>
          <CopyButton value={EMAIL} label="email" />
        </InfoRow>
        <InfoRow icon={<Briefcase className="h-3.5 w-3.5" />}>
          <span>
            Open to remote roles <span className="ml-1 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-lcd align-middle" />
          </span>
        </InfoRow>
        <InfoRow icon={<SocialIcon iconKey="linkedin" className="h-3.5 w-3.5" />}>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="truncate hover:underline">
            linkedin.com/in/robel-mamushet
          </a>
        </InfoRow>
        <InfoRow icon={<SocialIcon iconKey="github" className="h-3.5 w-3.5" />}>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="truncate hover:underline">
            github.com/robeljonior
          </a>
        </InfoRow>
      </div>

      <div className="flex flex-wrap gap-2 border-t border-rule px-5 py-5 sm:px-8">
        <a
          href={`mailto:${EMAIL}`}
          className="press inline-flex items-center gap-2 rounded-md bg-gold px-4 py-2 text-sm font-semibold text-onaccent transition-colors hover:bg-gold/85"
        >
          <Mail className="h-4 w-4" /> Email me
        </a>
        <a
          href={CV_URL}
          download
          className="press inline-flex items-center gap-2 rounded-md border border-rule-strong px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-ink"
        >
          <FileText className="h-4 w-4" /> Download CV
        </a>
      </div>

      <div className="border-t border-rule px-5 py-8 sm:px-8">
        <UssdDemo />
      </div>
    </section>
  );
}
