import Link from "next/link";
const PACKAGES = [
  {
    href: "/services/one-page-website",
    name: "One-page website",
    note: "For a new or very small business. Live in 7 days.",
    price: "from $1,500",
  },
  {
    href: "/services/business-website",
    name: "Business website",
    note: "Five pages, contact form, set up for Google.",
    price: "from $3,000",
  },
  {
    href: "/services/online-store-booking",
    name: "Online store or booking",
    note: "Shop, bookings or custom features. Fixed price, quoted on your scope.",
    price: "from $5,000",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="pricing pad">
      <div className="pricing-intro" data-reveal="">
        <h2>Pick a package. Know the price before we talk.</h2>
        <p className="muted">
          Every package includes design, build, mobile testing and a contact form. Prices are plus
          GST, with a 50% deposit to start.
        </p>
        <Link
          href="/#contact"
          className="btn btn-ink"
          style={{ alignSelf: "flex-start", marginTop: 8 }}
        >
          Start your project
        </Link>
        <a className="more" href="https://kimba.studio/guides/small-business-website-cost-australia">
          How these prices compare
        </a>
      </div>

      <div className="pricing-list s2" data-reveal="">
        {PACKAGES.map((p) => (
          <a className="row svc-row" href={`https://kimba.studio${p.href}`} key={p.href}>
            <div>
              <div className="row-name">{p.name}</div>
              <div className="row-note muted">{p.note}</div>
            </div>
            <div className="row-price">
              {p.price}
              <span className="arr" aria-hidden="true">
                {" "}
                →
              </span>
            </div>
          </a>
        ))}
        <div className="row">
          <div>
            <div className="row-name">Care plan (optional)</div>
            <div className="row-note muted">Hosting, backups and up to 1 hr of edits a month.</div>
          </div>
          <div className="row-price">$79/mo</div>
        </div>
      </div>
    </section>
  );
}
