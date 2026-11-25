import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { getSite } from "@/lib/content";

/* Self-hosted font files (Inter, Sora and Anton, all free open-source fonts). */
const inter = localFont({
  src: [
    { path: "../fonts/inter-latin.woff2", weight: "400 600", style: "normal" },
    { path: "../fonts/inter-latin-ext.woff2", weight: "400 600", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const sora = localFont({
  src: [
    { path: "../fonts/sora-latin.woff2", weight: "500 800", style: "normal" },
    { path: "../fonts/sora-latin-ext.woff2", weight: "500 800", style: "normal" },
  ],
  variable: "--font-sora",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const anton = localFont({
  src: [
    { path: "../fonts/anton-latin.woff2", weight: "400", style: "normal" },
    { path: "../fonts/anton-latin-ext.woff2", weight: "400", style: "normal" },
  ],
  variable: "--font-poster",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

const site = getSite();

export const metadata: Metadata = {
  title: site.seo.title,
  description: site.seo.description,
  openGraph: {
    title: site.seo.title,
    description: site.seo.description,
    siteName: site.studioName,
    locale: "en_CA",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-CA"
      data-skin="foreshore"
      className={`${inter.variable} ${sora.variable} ${anton.variable} reveal-on`}
    >
      <body>{children}</body>
    </html>
  );
}
