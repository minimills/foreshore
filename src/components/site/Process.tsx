import { getProcess } from "@/lib/content";

export default function Process() {
  const process = getProcess();
  return (
    <section id="process" className="section process pad">
      <h2 data-reveal="">{process.heading}</h2>
      <div className="steps" data-reveal="">
        <div className="line" aria-hidden="true" />
        {process.steps.map((s, i) => (
          <div className="step" key={s.title}>
            <div className="n">{i + 1}</div>
            <h3 className="step-title">{s.title}</h3>
            <div className="step-time">{s.time}</div>
            <p className="muted">{s.text}</p>
          </div>
        ))}
      </div>
      {process.note && (
        <p className="process-note muted" data-reveal="">
          {process.note}
        </p>
      )}
    </section>
  );
}
