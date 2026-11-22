import BrandMark from "./BrandMark";

const SERVICES = [
  { href: "https://kimba.studio/services/one-page-website", label: "One-page websites" },
  { href: "https://kimba.studio/services/business-website", label: "Business websites" },
  { href: "https://kimba.studio/services/online-store-booking", label: "Online stores and booking" },
  { href: "https://kimba.studio/web-design-brisbane", label: "Web design Brisbane" },
];

const STUDIO = [
  { href: "https://kimba.studio/pricing", label: "Prices" },
  { href: "https://kimba.studio/guides/small-business-website-cost-australia", label: "Website costs" },
  { href: "https://kimba.studio/about", label: "About" },
  { href: "https://kimba.studio/privacy", label: "Privacy" },
  { href: "https://kimba.studio/terms", label: "Terms" },
];

export default function Footer() {
  return (
    <footer className="footer pad">
      <div className="footer-brand">
        <BrandMark size={22} />
        <span>© 2026 Kimba Studio · Brisbane, QLD · ABN 82 169 256 562</span>
      </div>
      <nav className="footer-links" aria-label="Services">
        {SERVICES.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
      </nav>
      <nav className="footer-links" aria-label="Studio">
        {STUDIO.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
      </nav>
      <div className="footer-links">
        <a href="https://www.instagram.com/kimbastudio_au/" rel="me noopener" target="_blank">
          Instagram
        </a>
        <a href="https://www.linkedin.com/company/kimba-studio/" rel="me noopener" target="_blank">
          LinkedIn
        </a>
        <a href="#top">Back to top</a>
      </div>
    </footer>
  );
}
