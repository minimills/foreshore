import { getFaq } from "@/lib/content";

export default function Faq() {
  const faq = getFaq();
  return (
    <section id="faq" className="section faq pad">
      <h2 data-reveal="">{faq.heading}</h2>
      <div className="faq-list s2" data-reveal="">
        {faq.items.map((f) => (
          <div className="faq-item" key={f.question}>
            <h3>{f.question}</h3>
            <p className="muted">{f.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
