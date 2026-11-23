import Header, { Nav } from "./Header";
import Footer from "./Footer";
import { getLegal, paragraphs } from "@/lib/content";

/* Shared layout for the privacy and terms pages (text in content/legal/). */
export default function LegalPage({ page }: { page: "privacy" | "terms" }) {
  const legal = getLegal(page);
  return (
    <>
      <Header />
      <main id="main" className="wrap">
        <Nav ghost />
        <article className="section legal pad" id="top">
          <h2>{legal.title}</h2>
          {legal.lastUpdated && <p className="legal-date muted">{legal.lastUpdated}</p>}
          {paragraphs(legal.intro).map((p) => (
            <p className="muted" key={p}>
              {p}
            </p>
          ))}
          {legal.sections.map((s) => (
            <section key={s.heading}>
              <h3>{s.heading}</h3>
              {paragraphs(s.text).map((p) => (
                <p className="muted" key={p}>
                  {p}
                </p>
              ))}
            </section>
          ))}
        </article>
      </main>
      <div className="wrap">
        <div className="cta-band legal-foot">
          <Footer />
        </div>
      </div>
    </>
  );
}
