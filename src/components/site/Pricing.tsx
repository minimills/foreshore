import Link from "next/link";
import { getPricing } from "@/lib/content";

export default function Pricing() {
  const pricing = getPricing();
  return (
    <section id="pricing" className="pricing pad">
      <div className="pricing-intro" data-reveal="">
        <h2>{pricing.heading}</h2>
        <p className="muted">{pricing.intro}</p>
        <Link
          href="/#contact"
          className="btn btn-ink"
          style={{ alignSelf: "flex-start", marginTop: 8 }}
        >
          {pricing.buttonText}
        </Link>
        {pricing.notes.map((n) => (
          <p className="pricing-note muted" key={n}>
            {n}
          </p>
        ))}
      </div>

      <div className="pricing-list s2" data-reveal="">
        {pricing.packages.map((p) => (
          <div className="row" key={p.name}>
            <div>
              <div className="row-name">
                {p.name}
                {p.mostPopular && <span className="pill pill-offer row-pill">{pricing.popularLabel}</span>}
              </div>
              <div className="row-note muted">{p.description}</div>
              {p.features.length > 0 && (
                <ul className="row-features muted">
                  {p.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              )}
              {p.timeline && <div className="row-time">{p.timeline}</div>}
            </div>
            <div className="row-price">{p.price}</div>
          </div>
        ))}

        {pricing.carePlans.length > 0 && (
          <h3 className="care-heading">{pricing.carePlansHeading}</h3>
        )}
        {pricing.carePlans.map((c) => (
          <div className="row" key={c.name}>
            <div>
              <div className="row-name">{c.name}</div>
              <div className="row-note muted">{c.description}</div>
              {c.features.length > 0 && (
                <ul className="row-features muted">
                  {c.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              )}
            </div>
            <div className="row-price">
              {c.priceYearly}
              {c.priceMonthly && <span className="row-price-alt muted">{c.priceMonthly}</span>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
