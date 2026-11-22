import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

/* Self-hosted copies of the exact woff2 subsets the source page serves. */
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

export const metadata: Metadata = {
  title: "Small Business Web Design Australia | Fixed Price | Kimba Studio",
  description:
    "Fixed-price websites for Australian small businesses from $1,500 + GST. One person from start to finish, mobile-ready, live in weeks, and you own it.",
  openGraph: {
    title: "Small Business Web Design Australia | Fixed Price | Kimba Studio",
    description:
      "Fixed-price websites for Australian small businesses from $1,500 + GST. One person from start to finish, mobile-ready, live in weeks, and you own it.",
    siteName: "Kimba Studio",
    locale: "en_AU",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-skin="motel"
      className={`${inter.variable} ${sora.variable} ${anton.variable} reveal-on`}
    >
      <body>{children}</body>
    </html>
  );
}
