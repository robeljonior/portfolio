// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Robel Mamushet — Backend Engineer",
  description: "Enterprise and fintech systems with Java, Spring Boot, Go, TypeScript, and .NET.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-night font-sans text-white antialiased">{children}</body>
    </html>
  );
}