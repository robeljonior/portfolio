// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import ChatTwin from "@/components/site/ChatTwin";
import { EMAIL, EXPERIENCE, GITHUB_URL, LINKEDIN_URL } from "@/lib/Data";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
const display = Space_Grotesk({ subsets: ["latin"], weight: ["500", "600"], variable: "--font-display" });

const title = "Robel Mamushet · Backend Software Engineer (Java, Spring Boot, Go)";
const description =
  "Backend software engineer with nearly four years of banking and fintech experience: USSD banking, payment processing, core banking integration and microservices in Java, Spring Boot and Go. Open to remote roles.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  alternates: { canonical: "/" },
  authors: [{ name: "Robel Mamushet", url: LINKEDIN_URL }],
  keywords: ["Backend engineer", "Java", "Spring Boot", "Go", "Microservices", "Kafka", "Fintech", "USSD", "Payments", "Remote"],
  openGraph: { title, description, type: "profile", url: "/", siteName: "Robel Mamushet" },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#071A1C" },
    { media: "(prefers-color-scheme: light)", color: "#F5F2EA" },
  ],
};

/** Structured data so search engines know who this site is about. */
const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Robel Mamushet",
  jobTitle: "Backend Software Engineer",
  url: SITE_URL,
  email: `mailto:${EMAIL}`,
  sameAs: [GITHUB_URL, LINKEDIN_URL],
  worksFor: { "@type": "Organization", name: EXPERIENCE.company },
  address: { "@type": "PostalAddress", addressLocality: "Addis Ababa", addressCountry: "ET" },
  knowsAbout: ["Java", "Spring Boot", "Go", "Microservices", "Kafka", "Redis", "PostgreSQL", "Camunda BPMN", "Distributed systems", "Payment processing", "USSD banking"],
};

/** Applies the saved theme before first paint, so day mode never flashes dark. */
const themeScript = `try{var t=localStorage.getItem("theme");document.documentElement.dataset.theme=t==="light"?"light":"dark"}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={`${sans.variable} ${mono.variable} ${display.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <Script id="theme" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
        {children}
        <ChatTwin />
      </body>
    </html>
  );
}
