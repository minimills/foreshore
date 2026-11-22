const STEPS = [
  {
    title: "Chat",
    time: "Day 1",
    body: "We talk about your business, what you want the site to do, who it's for and who your competitors are. You send me your words and photos, and I'll polish them.",
  },
  {
    title: "Design",
    time: "About 1 week",
    body: "Based on that, I send you 3 designs in different styles. You pick the one that feels right.",
  },
  {
    title: "Feedback",
    time: "1–2 weeks",
    body: "I build a first draft in your chosen style. You get 2 rounds of changes to get it right.",
  },
  {
    title: "Build",
    time: "1–2 weeks",
    body: "With your feedback in, I complete the full build and test it on phones, tablets and desktops.",
  },
  {
    title: "Live",
    time: "2–3 days",
    body: "You sign it off and pay the final 50%. I connect your domain, set up hosting and link Google, then we launch.",
  },
];

export default function Process() {
  return (
    <section id="process" className="section process pad">
      <h2 data-reveal="">From first chat to launch in 5 steps</h2>
      <div className="steps" data-reveal="">
        <div className="line" aria-hidden="true" />
        {STEPS.map((s, i) => (
          <div className="step" key={s.title}>
            <div className="n">{i + 1}</div>
            <h3 className="step-title">{s.title}</h3>
            <div className="step-time">{s.time}</div>
            <p className="muted">{s.body}</p>
          </div>
        ))}
      </div>
      <p className="process-note muted" data-reveal="">
        Timings assume feedback within 2 business days. I&apos;ll let you know straight away if
        anything slips on my end.
      </p>
    </section>
  );
}
