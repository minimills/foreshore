import { getAbout, img, paragraphs } from "@/lib/content";

export default function About() {
  const about = getAbout();
  return (
    <section id="about" className="about pad">
      <div className="about-person" data-reveal="">
        {about.portrait && (
          <div className="portrait">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img(about.portrait)} alt={about.portraitAlt} width={440} height={560} loading="lazy" />
          </div>
        )}
        <div className="about-copy">
          <h2>{about.heading}</h2>
          {paragraphs(about.text).map((p) => (
            <p className="muted" key={p}>
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
