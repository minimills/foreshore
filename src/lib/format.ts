/*
 * Small helpers with no file access, safe to use in browser-side components.
 */

/**
 * Turns an image value from the content files into a usable address.
 * Accepts a plain file name ("logo.png", looked up in public/images),
 * a site path ("/images/logo.png", what Pages CMS writes) or a full URL.
 */
export function img(value?: string): string {
  if (!value) return "";
  if (value.startsWith("/") || /^https?:\/\//.test(value)) return value;
  return `/images/${value}`;
}

/** Splits a block of text on blank lines, so one field can hold several paragraphs. */
export function paragraphs(text?: string): string[] {
  return (text ?? "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export type Section = { heading: string; text: string };

export type Project = {
  slug: string;
  title: string;
  type: string;
  status: string;
  summary: string;
  cover: string;
  screenshots: string[];
  liveUrl: string;
  demoUrl: string;
  tags: string[];
  featured: boolean;
  order: number;
  hasPage: boolean;
  details: Section[];
};

/** Where a project goes when clicked: its own page, else its live site or demo. */
export function projectHref(p: Project): string {
  if (p.hasPage) return `/work/${p.slug}`;
  return p.liveUrl || p.demoUrl || "";
}
