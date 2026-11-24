import PageShell from "./PageShell";
import Sections from "./Sections";
import { getLegal, paragraphs } from "@/lib/content";

/* Shared layout for the privacy and terms pages (text in content/legal/). */
export default function LegalPage({ page }: { page: "privacy" | "terms" }) {
  const legal = getLegal(page);
  return (
    <PageShell>
      <article className="section page pad">
        <h2>{legal.title}</h2>
        {legal.lastUpdated && <p className="page-small muted">{legal.lastUpdated}</p>}
        {paragraphs(legal.intro).map((p) => (
          <p className="muted" key={p}>
            {p}
          </p>
        ))}
        <Sections sections={legal.sections} />
      </article>
    </PageShell>
  );
}
