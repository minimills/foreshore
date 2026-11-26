import Link from "next/link";
import BrandMark from "./BrandMark";
import SocialIcon from "./SocialIcon";
import { getFooter, getSite } from "@/lib/content";

/* Worked out when the site is built, so it updates on every new deploy. */
async function copyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

export default async function Footer() {
  const site = getSite();
  /* Only entries with a link are shown; an empty list hides the icon row. */
  const socials = (getFooter().socials ?? []).filter((s) => s.link?.trim());
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
      {socials.length > 0 && (
        <ul className="footer-socials" aria-label="Social media">
          {socials.map((s) => (
            <li key={s.link}>
              <a
                href={s.link}
                rel="me noopener noreferrer"
                target="_blank"
                aria-label={`${site.studioName} on ${s.platform} (opens in a new tab)`}
                title={s.platform}
              >
                <SocialIcon platform={s.platform} />
              </a>
            </li>
          ))}
        </ul>
      )}
      <div className="footer-links">
        {site.phone && <a href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}>{site.phone}</a>}
        {site.email && <a href={`mailto:${site.email}`}>{site.email}</a>}
        <a href="#top">Back to top</a>
      </div>
    </footer>
  );
}
