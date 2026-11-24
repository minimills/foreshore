import { paragraphs, type Section } from "@/lib/format";

/* A list of headings with text underneath, as written in the content files. */
export default function Sections({ sections }: { sections: Section[] }) {
  return (
    <>
      {sections.map((s) => (
        <section className="page-section" key={s.heading}>
          <h3>{s.heading}</h3>
          {paragraphs(s.text).map((p) => (
            <p className="muted" key={p}>
              {p}
            </p>
          ))}
        </section>
      ))}
    </>
  );
}
