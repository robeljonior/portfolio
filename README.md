# Robel Mamushet — Portfolio (Next.js + TypeScript)

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Structure

- `app/layout.tsx` — root layout, fonts, metadata
- `app/page.tsx` — renders the page
- `app/globals.css` — Tailwind + custom keyframes (reveal-on-scroll, hero animations)
- `components/Portfolio.tsx` — the entire page: header, hero (4-act cinematic
  animation), about, work, stack, field notes, contact

## The hero animation

`HeroVisual` inside `components/Portfolio.tsx` cycles through four acts every
4.4s, each with its own mini-animation driven by refs + `useEffect`:

1. **USSD** — a feature-phone screen types through a `*123#` session
2. **Mobile banking** — a wallet app balance updates and a toast confirms receipt
3. **Backend** — a packet travels gateway → wallet service → ledger → Kafka,
   lighting up each node as it arrives
4. **Laptop + phone / distributed VPN** — two devices register with a
   signaling backend, then a direct WireGuard-style encrypted tunnel opens
   between them and the signaling backend fades out of the data path

## Before you ship this

Replace the placeholders in `components/Portfolio.tsx`:

- `hello@robelmamushet.dev` — your real email
- the GitHub / LinkedIn `href`s in the contact section (currently point at
  the bare homepages)
- confirm `robelmamushet.dev` is a domain you actually own, or point this at
  wherever you deploy it (Vercel, etc.)

## Build for production

```bash
npm run build
npm run start
```
