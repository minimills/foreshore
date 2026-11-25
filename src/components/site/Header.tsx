import Link from "next/link";
import BrandMark from "./BrandMark";
import MobileMenu from "./MobileMenu";
import { getSite } from "@/lib/content";

export function Nav({ ghost = false }: { ghost?: boolean }) {
  const site = getSite();
  return (
    <nav
      className={`nav pad${ghost ? " nav-ghost" : " load l1"}`}
      aria-label={ghost ? undefined : "Main"}
      aria-hidden={ghost || undefined}
      inert={ghost || undefined}
    >
      <Link className="brand" href="/#top">
        <BrandMark />
        <span className="brand-text">{site.studioName}</span>
      </Link>
      <div className="nav-links">
        {site.navLinks.map((l) => (
          <Link key={l.link} href={l.link}>
            {l.label}
          </Link>
        ))}
      </div>
      <Link href="/#contact" className="btn btn-ink btn-sm">
        {site.mainButton}{" "}
        <span className="arr" aria-hidden="true">
          →
        </span>
      </Link>
      <MobileMenu links={site.navLinks} buttonLabel={site.mainButton} />
    </nav>
  );
}

export default function Header() {
  return (
    <header className="hero-head">
      <a className="skip-link" href="#top">
        Skip to content
      </a>
      <Nav />
    </header>
  );
}
