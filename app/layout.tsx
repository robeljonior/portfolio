// app/layout.tsx
import type { Metadata } from "next";
import { Geist_Mono, Lexend } from "next/font/google";
import Script from "next/script";
import ChatTwin from "@/components/site/ChatTwin";
import "./globals.css";

const sans = Lexend({ subsets: ["latin"], variable: "--font-sans" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

const title = "Robel Mamushet — Full-Stack Engineer, Backend First (Go, Java, Next.js)";
const description =
  "Full-stack engineer, backend first: banking systems in Go and Java and Next.js dashboards on top. Ported a production USSD gateway from Java to Go. Open to remote roles.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

/** Applies the saved theme before first paint, so day mode never flashes dark. */
const themeScript = `try{var t=localStorage.getItem("theme");document.documentElement.dataset.theme=t==="light"?"light":"dark"}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <Script id="theme" strategy="beforeInteractive">
          {themeScript}
        </Script>
        {children}
        <ChatTwin />
      </body>
    </html>
  );
}
