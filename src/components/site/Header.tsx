import Link from "next/link";
import BrandMark from "./BrandMark";

export const NAV_LINKS = [
  { href: "/#work", label: "Work" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#process", label: "How it works" },
  { href: "/#about", label: "About" },
];

export function Nav({ ghost = false }: { ghost?: boolean }) {
  return (
    <nav
      className={`nav pad${ghost ? " nav-ghost" : " load l1"}`}
      aria-label={ghost ? undefined : "Main"}
      aria-hidden={ghost || undefined}
      inert={ghost || undefined}
    >
      <Link className="brand" href="/#top">
        <BrandMark />
        <span className="brand-text">
          Kimba Studio <span className="brand-label">by Joshua Kimber</span>
        </span>
      </Link>
      <div className="nav-links">
        {NAV_LINKS.map((l) => (
          <Link key={l.href} href={l.href}>
            {l.label}
          </Link>
        ))}
      </div>
      <Link href="/#contact" className="btn btn-ink btn-sm">
        Start your project{" "}
        <span className="arr" aria-hidden="true">
          →
        </span>
      </Link>
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
