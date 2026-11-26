/*
 * Reads the editable content in /content. Every word and image on the site
 * comes from those JSON files (edited by hand or through Pages CMS), so this
 * file should rarely need to change.
 */
import fs from "node:fs";
import path from "node:path";
import type { Project, Section } from "./format";

export { img, paragraphs, projectHref } from "./format";
export type { Project, Section } from "./format";

const CONTENT_DIR = path.join(process.cwd(), "content");

function read<T>(file: string): T {
  return JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, file), "utf8")) as T;
}

export type Link = { label: string; link: string };

export type Site = {
  studioName: string;
  ownerName: string;
  city: string;
  province: string;
  provinceShort: string;
  country: string;
  email?: string;
  phone?: string;
  /* Pages CMS drops these keys when they are left empty. */
  socials?: Link[];
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
  allWorkLink: string;
  pageHeading: string;
  pageIntro: string;
  featuredButtonPage: string;
  featuredButtonLive: string;
  featuredButtonDemo: string;
  featuredButtonOther: string;
  inviteTile: { show: boolean; title: string; label: string; text: string };
  projectBackLink: string;
  screenshotsHeading: string;
  projectCtaHeading: string;
  projectCtaButton: string;
  liveButton: string;
  demoButton: string;
};

export type Package = {
  slug: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  timeline: string;
  mostPopular: boolean;
  order: number;
  pageIntro: string;
  whoItsFor: string;
  details: Section[];
  screenshots: string[];
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
  sections: Section[];
};

export type PackagePage = {
  includedHeading: string;
  whoItsForHeading: string;
  screenshotsHeading: string;
  buttonText: string;
  backLink: string;
};

export const getSite = () => read<Site>("site.json");
export const getHero = () => read<Hero>("hero.json");
export const getWork = () => read<Work>("work.json");
export const getPricing = () => read<Pricing>("pricing.json");
export const getProcess = () => read<Process>("process.json");
export const getAbout = () => read<About>("about.json");
export const getFaq = () => read<Faq>("faq.json");
export const getContact = () => read<Contact>("contact.json");
export const getPackagePage = () => read<PackagePage>("package-page.json");
export const getLegal = (page: "privacy" | "terms") => read<Legal>(`legal/${page}.json`);

/** Reads every .json file in a content folder. The file name becomes the page address (slug). */
function readFolder<T>(folder: string): (Partial<T> & { slug: string })[] {
  return fs
    .readdirSync(path.join(CONTENT_DIR, folder))
    .filter((f) => f.endsWith(".json"))
    .map((f) => ({ ...read<Partial<T>>(`${folder}/${f}`), slug: f.replace(/\.json$/, "") }));
}

const byOrder = (a: { order: number; title?: string; name?: string }, b: typeof a) =>
  a.order - b.order || (a.title ?? a.name ?? "").localeCompare(b.title ?? b.name ?? "");

/** All showcase projects, one JSON file each in content/showcase, sorted by `order`. */
export function getProjects(): Project[] {
  return readFolder<Project>("showcase")
    .map((d) => ({
      slug: d.slug,
      title: d.title ?? "",
      type: d.type ?? "",
      status: d.status ?? "",
      summary: d.summary ?? "",
      cover: d.cover ?? "",
      screenshots: d.screenshots ?? [],
      mobileScreenshot: d.mobileScreenshot ?? "",
      liveUrl: d.liveUrl ?? "",
      demoUrl: d.demoUrl ?? "",
      tags: d.tags ?? [],
      featured: Boolean(d.featured),
      order: Number(d.order ?? 999),
      hasPage: Boolean(d.hasPage),
      details: d.details ?? [],
    }))
    .sort(byOrder);
}

/** All website packages, one JSON file each in content/packages, sorted by `order`. */
export function getPackages(): Package[] {
  return readFolder<Package>("packages")
    .map((d) => ({
      slug: d.slug,
      name: d.name ?? "",
      price: d.price ?? "",
      description: d.description ?? "",
      features: d.features ?? [],
      timeline: d.timeline ?? "",
      mostPopular: Boolean(d.mostPopular),
      order: Number(d.order ?? 999),
      pageIntro: d.pageIntro ?? "",
      whoItsFor: d.whoItsFor ?? "",
      details: d.details ?? [],
      screenshots: d.screenshots ?? [],
    }))
    .sort(byOrder);
}
