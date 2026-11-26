import Link from "next/link";
import BrandMark from "./BrandMark";
import { getSite } from "@/lib/content";

/* Worked out when the site is built, so it updates on every new deploy. */
async function copyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

export default async function Footer() {
  const site = getSite();
  const year = await copyrightYear();
  return (
    <footer className="footer pad">
      <div className="footer-brand">
        <BrandMark size={22} />
        <span>
          © {year} {site.studioName} · {site.city}, {site.provinceShort}, {site.country}
        </span>
      </div>
      <nav className="footer-links" aria-label="Footer">
        {site.footerLinks.map((l) => (
          <Link key={l.link} href={l.link}>
            {l.label}
          </Link>
        ))}
      </nav>
      <div className="footer-links">
        {site.phone && <a href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}>{site.phone}</a>}
        {site.email && <a href={`mailto:${site.email}`}>{site.email}</a>}
        {(site.socials ?? []).map((s) => (
          <a key={s.link} href={s.link} rel="me noopener" target="_blank">
            {s.label}
          </a>
        ))}
        <a href="#top">Back to top</a>
      </div>
    </footer>
  );
}
