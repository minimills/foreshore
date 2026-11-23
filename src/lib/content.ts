/*
 * Reads the editable content in /content. Every word and image on the site
 * comes from those JSON files (edited by hand or through Pages CMS), so this
 * file should rarely need to change.
 */
import fs from "node:fs";
import path from "node:path";

const CONTENT_DIR = path.join(process.cwd(), "content");

function read<T>(file: string): T {
  return JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, file), "utf8")) as T;
}

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

export type Link = { label: string; link: string };

export type Site = {
  studioName: string;
  ownerName: string;
  city: string;
  province: string;
  provinceShort: string;
  country: string;
  email: string;
  phone: string;
  socials: Link[];
  mainButton: string;
  navLinks: Link[];
  footerLinks: Link[];
  seo: { title: string; description: string };
};

export type Hero = {
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  subheading: string;
  primaryButton: string;
  secondaryButton: string;
  stepsCardTitle: string;
  introCardTitle: string;
  introCardText: string;
  avatar: string;
  checklist: string[];
  sceneImage: string;
  sceneImageMobile: string;
  floatingIcons: string[];
};

export type Work = {
  heading: string;
  note: string;
  featuredButtonLive: string;
  featuredButtonDemo: string;
  featuredButtonOther: string;
  inviteTile: { show: boolean; title: string; label: string; text: string };
};

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
};

export type Package = {
  name: string;
  price: string;
  description: string;
  features: string[];
  timeline: string;
  mostPopular: boolean;
};

export type CarePlan = {
  name: string;
  priceYearly: string;
  priceMonthly: string;
  description: string;
  features: string[];
};

export type Pricing = {
  heading: string;
  intro: string;
  buttonText: string;
  popularLabel: string;
  packages: Package[];
  carePlansHeading: string;
  carePlans: CarePlan[];
  notes: string[];
};

export type Process = {
  heading: string;
  steps: { title: string; time: string; text: string }[];
  note: string;
};

export type About = { heading: string; text: string; portrait: string; portraitAlt: string };

export type Faq = { heading: string; items: { question: string; answer: string }[] };

export type Contact = {
  heading: string;
  intro: string;
  nameLabel: string;
  emailLabel: string;
  phoneLabel: string;
  businessLabel: string;
  projectTypeQuestion: string;
  projectTypeOptions: string[];
  packageQuestion: string;
  packagePlaceholder: string;
  notSureOption: string;
  goalQuestion: string;
  goalPlaceholder: string;
  privacyText: string;
  privacyLinkText: string;
  buttonText: string;
  emailPrompt: string;
  formAccessKey: string;
  emailSubject: string;
};

export type Legal = {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: { heading: string; text: string }[];
};

export const getSite = () => read<Site>("site.json");
export const getHero = () => read<Hero>("hero.json");
export const getWork = () => read<Work>("work.json");
export const getPricing = () => read<Pricing>("pricing.json");
export const getProcess = () => read<Process>("process.json");
export const getAbout = () => read<About>("about.json");
export const getFaq = () => read<Faq>("faq.json");
export const getContact = () => read<Contact>("contact.json");
export const getLegal = (page: "privacy" | "terms") => read<Legal>(`legal/${page}.json`);

/** All showcase projects, one JSON file each in content/showcase, sorted by `order`. */
export function getProjects(): Project[] {
  const dir = path.join(CONTENT_DIR, "showcase");
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      const data = read<Partial<Project>>(`showcase/${f}`);
      return {
        slug: f.replace(/\.json$/, ""),
        title: data.title ?? "",
        type: data.type ?? "",
        status: data.status ?? "",
        summary: data.summary ?? "",
        cover: data.cover ?? "",
        screenshots: data.screenshots ?? [],
        liveUrl: data.liveUrl ?? "",
        demoUrl: data.demoUrl ?? "",
        tags: data.tags ?? [],
        featured: Boolean(data.featured),
        order: Number(data.order ?? 999),
      };
    })
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}
