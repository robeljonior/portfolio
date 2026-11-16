# Robel Mamushet — Portfolio (Next.js + TypeScript)

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Environment

Set `NEXT_PUBLIC_SITE_URL` (for example `https://your-domain.dev`) in your hosting settings. It is used for
canonical links, `sitemap.xml`, `robots.txt` and the social share card. On Vercel the production URL is picked up
automatically if it isn't set.

## Structure

- `app/layout.tsx` — root layout, fonts, metadata
- `app/page.tsx` — page composition
- `app/globals.css` — global theme and reveal animation styles
- `components/home/` — hero, the 3D system scene (`HeroScene`, Three.js, lazy-loaded on desktop only) and its SVG fallback (`SystemMap`)
- `components/site/` — nav, sections, case-study request flow (`RequestFlow`), skills explorer, contact, footer
- `components/playground/` — "Inside my engineering world" demos: idempotency, Redis cache, Kafka (the USSD demo lives in `components/site/UssdDemo.tsx`)
- `lib/Data.tsx` — portfolio content, project details, case studies and request flows (`flow`)
- `lib/architecture.ts` — the services and connections drawn in the hero
- `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx` — SEO and the social share card

The content is based on Robel Mamushet's backend engineering experience at Atlas
Computer Technology (Dec 2022 – present), including USSD banking, core banking
integration, payment workflows, microservices, and the Java-to-Go gateway migration.

## Build for production

```bash
npm run build
npm run start
```

## Adding a new project

All projects live in `SYSTEMS` in `lib/Data.tsx`. To add one, append an entry:

- `slug`, `eyebrow`, `title`, `body`, `tags`, `details`, `steps` — required; the page at `/work/<slug>` is generated from them.
- `featured: 1 | 2 | 3` — shows it as a large case study on the home page, in that order. Leave it out to list it under "More work".
- `caseStudy` — context, problem, role, key decisions and result. Use real numbers where you can.
- `repo` — link to the public code; without it the page links to the GitHub profile.
- An image — add it to `lib/images/` and map the slug in `PROJECT_IMAGES` in `lib/projectImages.ts`.

Numbering (01, 02 …) is automatic.

## Profile photo

Put a square photo at `public/avatar.jpg` (or `.png` / `.webp`). It replaces the "RM" monogram automatically on the next build.
