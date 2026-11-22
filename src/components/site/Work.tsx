import Link from "next/link";
import TilesMarquee from "./TilesMarquee";

export default function Work() {
  return (
    <section id="work" className="work pad">
      <h2 data-reveal="">Recent work</h2>

      <Link className="featured" data-reveal="" data-founding="true" href="/#contact">
        <div className="featured-stage" aria-hidden="true">
          <div className="shot laptop">
            <div className="ui">
              <div className="l" style={{ width: "30%" }} />
              <div
                className="b"
                style={{ height: 120, background: "linear-gradient(135deg,var(--bg-2),var(--leaf-soft))" }}
              />
              <div className="l" style={{ width: "80%" }} />
              <div className="l" style={{ width: "60%" }} />
              <div className="row3">
                <div className="b" />
                <div className="b" />
                <div className="b" />
              </div>
            </div>
          </div>
          <div className="phone">
            <div className="phone-screen">
              <div className="l" style={{ width: "50%" }} />
              <div className="img" />
              <div className="l" />
              <div className="l" style={{ width: "70%" }} />
            </div>
          </div>
        </div>

        <div className="featured-copy">
          <span className="pill pill-offer" style={{ alignSelf: "flex-start" }}>
            Founding client spots: 3 available
          </span>
          <h3>This space is saved for your business.</h3>
          <p className="muted" style={{ lineHeight: 1.6 }}>
            I&apos;m choosing the first few projects to feature here. Founding clients get 25% off
            any package in exchange for letting me feature the finished site as a case study.
          </p>
          <span className="btn btn-ink" style={{ alignSelf: "flex-start" }}>
            Start your project
          </span>
          <p className="offer-note muted">
            Same process, same 2 feedback rounds, same quality. Just a better price, once.
          </p>
        </div>
      </Link>

      <TilesMarquee />

      <p className="muted note" data-reveal="">
        Concept sites are demo builds for realistic local businesses, so you can see exactly what
        you&apos;d get. Every project is labelled as a client site or a concept.
      </p>
    </section>
  );
}
