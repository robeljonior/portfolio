/**
 * Public URL of the site, used for canonical links, the sitemap and social cards.
 * Set NEXT_PUBLIC_SITE_URL in your hosting settings (e.g. https://robelmamushet.dev).
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? process.env.VERCEL_PROJECT_PRODUCTION_URL ?? "http://localhost:3000")
  .replace(/\/$/, "")
  .replace(/^(?!https?:\/\/)/, "https://");
