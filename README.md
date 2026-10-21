# Robel Mamushet — Portfolio (Next.js + TypeScript)

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Structure

- `app/layout.tsx` — root layout, fonts, metadata
- `app/page.tsx` — page composition
- `app/globals.css` — global theme and reveal animation styles
- `components/` — hero, overview, experience, selected systems, toolkit, contact, and footer sections
- `lib/Data.tsx` — portfolio content, navigation, project details, and social links

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
