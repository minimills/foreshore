export default function About() {
  return (
    <section id="about" className="about pad">
      <div className="about-person" data-reveal="">
        <div className="portrait">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero/josh-portrait.webp"
            alt="Joshua Kimber, web designer at Kimba Studio"
            width={440}
            height={560}
            loading="lazy"
          />
        </div>
        <div className="about-copy">
          <h2>Hi, I&apos;m Joshua</h2>
          <p className="muted">
            Kimba Studio is a one-person web design studio in Brisbane, building fixed-price
            websites for small businesses across Australia. I&apos;ve spent 18 years in IT working
            on large-scale projects. Now I bring that experience to small business owners, building
            websites that help you hit your business goals. I keep things simple: a clear price, a
            fixed timeline, and a site that brings in enquiries, not just compliments.
          </p>
        </div>
      </div>
    </section>
  );
}
