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

/*
 * Pages CMS writes an empty file when every item in a list is deleted, and
 * drops keys whose value is blank. So a missing file, an empty file, or a
 * missing key all mean "nothing set here" rather than an error. Each getter
 * below fills in its own defaults, so a component never receives undefined
 * where it expects a list.
 */
function read<T>(file: string): Partial<T> {
  let raw: string;
  try {
    raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
  } catch {
    return {};
  }
  if (!raw.trim()) return {};
  try {
    return (JSON.parse(raw) ?? {}) as Partial<T>;
  } catch (err) {
    throw new Error(`content/${file} is not valid JSON: ${(err as Error).message}`);
  }
}

/** Keeps a list usable even when the CMS leaves the key out entirely. */
const list = <T>(v: T[] | undefined): T[] => (Array.isArray(v) ? v : []);

/*
 * Lays the saved content over a complete set of defaults, so every field the
 * site reads always exists. Keys the CMS dropped (or saved as blank) fall back
 * to the default instead of arriving as undefined.
 */
function withDefaults<T extends object>(defaults: T, saved: Partial<T>): T {
  const out = { ...defaults };
  for (const [k, v] of Object.entries(saved)) {
    if (v !== undefined && v !== null) out[k as keyof T] = v as T[keyof T];
  }
  return out;
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
  mainButton: string;
  navLinks: Link[];
  footerLinks: Link[];
  seo: { title: string; description: string };
};

export type SocialPlatform =
  | "Instagram" | "Facebook" | "LinkedIn" | "TikTok" | "X" | "YouTube" | "GitHub" | "Website";

export type Footer = {
  /* Optional: Pages CMS drops the key when the list is left empty. */
  socials?: { platform: SocialPlatform; link: string }[];
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

const SITE_DEFAULTS: Site = {
  studioName: "",
  ownerName: "",
  city: "",
  province: "",
  provinceShort: "",
  country: "",
  mainButton: "",
  navLinks: [],
  footerLinks: [],
  seo: { title: "", description: "" },
};

export const getSite = (): Site => {
  const d = withDefaults(SITE_DEFAULTS, read<Site>("site.json"));
  return {
    ...d,
    navLinks: list(d.navLinks),
    footerLinks: list(d.footerLinks),
    seo: withDefaults(SITE_DEFAULTS.seo, d.seo ?? {}),
  };
};

export const getFooter = (): Footer => ({ socials: list(read<Footer>("footer.json").socials) });

const HERO_DEFAULTS: Hero = {
  eyebrow: "",
  headingLine1: "",
  headingLine2: "",
  subheading: "",
  primaryButton: "",
  secondaryButton: "",
  stepsCardTitle: "",
  introCardTitle: "",
  introCardText: "",
  avatar: "",
  checklist: [],
  sceneImage: "",
  sceneImageMobile: "",
  floatingIcons: [],
};

export const getHero = (): Hero => {
  const d = withDefaults(HERO_DEFAULTS, read<Hero>("hero.json"));
  return { ...d, checklist: list(d.checklist), floatingIcons: list(d.floatingIcons) };
};

const WORK_DEFAULTS: Work = {
  heading: "",
  note: "",
  allWorkLink: "",
  pageHeading: "",
  pageIntro: "",
  featuredButtonPage: "",
  featuredButtonLive: "",
  featuredButtonDemo: "",
  featuredButtonOther: "",
  inviteTile: { show: false, title: "", label: "", text: "" },
  projectBackLink: "",
  screenshotsHeading: "",
  projectCtaHeading: "",
  projectCtaButton: "",
  liveButton: "",
  demoButton: "",
};

export const getWork = (): Work => {
  const d = withDefaults(WORK_DEFAULTS, read<Work>("work.json"));
  return { ...d, inviteTile: withDefaults(WORK_DEFAULTS.inviteTile, d.inviteTile ?? {}) };
};

const PRICING_DEFAULTS: Pricing = {
  heading: "",
  intro: "",
  buttonText: "",
  popularLabel: "",
  carePlansHeading: "",
  carePlans: [],
  notes: [],
};

export const getPricing = (): Pricing => {
  const d = withDefaults(PRICING_DEFAULTS, read<Pricing>("pricing.json"));
  return {
    ...d,
    notes: list(d.notes),
    carePlans: list(d.carePlans).map((c) => ({
      name: c?.name ?? "",
      priceYearly: c?.priceYearly ?? "",
      priceMonthly: c?.priceMonthly ?? "",
      description: c?.description ?? "",
      features: list(c?.features),
    })),
  };
};

export const getProcess = (): Process => {
  const d = withDefaults<Process>({ heading: "", steps: [], note: "" }, read<Process>("process.json"));
  return {
    ...d,
    steps: list(d.steps).map((st) => ({
      title: st?.title ?? "",
      time: st?.time ?? "",
      text: st?.text ?? "",
    })),
  };
};

export const getAbout = (): About =>
  withDefaults<About>(
    { heading: "", text: "", portrait: "", portraitAlt: "" },
    read<About>("about.json"),
  );

export const getFaq = (): Faq => {
  const d = withDefaults<Faq>({ heading: "", items: [] }, read<Faq>("faq.json"));
  return {
    ...d,
    items: list(d.items).map((i) => ({ question: i?.question ?? "", answer: i?.answer ?? "" })),
  };
};

const CONTACT_DEFAULTS: Contact = {
  heading: "",
  intro: "",
  nameLabel: "",
  emailLabel: "",
  phoneLabel: "",
  businessLabel: "",
  projectTypeQuestion: "",
  projectTypeOptions: [],
  packageQuestion: "",
  packagePlaceholder: "",
  notSureOption: "",
  goalQuestion: "",
  goalPlaceholder: "",
  privacyText: "",
  privacyLinkText: "",
  buttonText: "",
  emailPrompt: "",
  formAccessKey: "",
  emailSubject: "",
};

export const getContact = (): Contact => {
  const d = withDefaults(CONTACT_DEFAULTS, read<Contact>("contact.json"));
  return { ...d, projectTypeOptions: list(d.projectTypeOptions) };
};

export const getPackagePage = (): PackagePage =>
  withDefaults<PackagePage>(
    {
      includedHeading: "",
      whoItsForHeading: "",
      screenshotsHeading: "",
      buttonText: "",
      backLink: "",
    },
    read<PackagePage>("package-page.json"),
  );

export const getLegal = (page: "privacy" | "terms"): Legal => {
  const d = withDefaults<Legal>(
    { title: "", lastUpdated: "", intro: "", sections: [] },
    read<Legal>(`legal/${page}.json`),
  );
  return { ...d, sections: list(d.sections) };
};

/** Reads every .json file in a content folder. The file name becomes the page address (slug). */
function readFolder<T>(folder: string): (Partial<T> & { slug: string })[] {
  let files: string[];
  try {
    files = fs.readdirSync(path.join(CONTENT_DIR, folder));
  } catch {
    return [];
  }
  return files
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
