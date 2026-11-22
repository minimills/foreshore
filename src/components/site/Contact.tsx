export default function Contact() {
  return (
    <section id="contact" className="cta pad" aria-labelledby="contact-heading">
      <h2 id="contact-heading" data-reveal="">
        Let&apos;s build yours
      </h2>
      <p className="s1" data-reveal="">
        Tell me a bit about your business and what you need. You&apos;ll get a fixed quote within 2
        business days, and no pressure either way.
      </p>

      <div className="s2" data-reveal="">
        <form id="enquiry" className="enquiry" action="/api/enquiry" method="post" noValidate>
          <div className="field-row">
            <label className="field" htmlFor="enq-name">
              <span>
                Name <span aria-hidden="true">*</span>
              </span>
              <input id="enq-name" autoComplete="name" required name="name" />
            </label>
            <label className="field" htmlFor="enq-email">
              <span>
                Email <span aria-hidden="true">*</span>
              </span>
              <input id="enq-email" type="email" autoComplete="email" required name="email" />
            </label>
          </div>

          <div className="field-row">
            <label className="field" htmlFor="enq-phone">
              <span>Phone</span>
              <input id="enq-phone" type="tel" autoComplete="tel" name="phone" />
            </label>
            <label className="field" htmlFor="enq-business">
              <span>Business name</span>
              <input id="enq-business" autoComplete="organization" name="business" />
            </label>
          </div>

          <fieldset className="field">
            <legend>
              New website or a revamp? <span aria-hidden="true">*</span>
            </legend>
            <div className="choice">
              <label>
                <input type="radio" required name="projectType" value="new" />
                New website
              </label>
              <label>
                <input type="radio" required name="projectType" value="revamp" />
                Revamp
              </label>
            </div>
          </fieldset>

          <label className="field" htmlFor="enq-package">
            <span>Which package are you interested in?</span>
            <select id="enq-package" name="package" defaultValue="">
              <option value="">Choose one</option>
              <option value="one-page">One-page website</option>
              <option value="business">Business website</option>
              <option value="store">Online store or booking</option>
              <option value="unsure">Not sure yet</option>
            </select>
          </label>

          <label className="field" htmlFor="enq-goal">
            <span>
              What&apos;s the main goal for your website? <span aria-hidden="true">*</span>
            </span>
            <textarea
              id="enq-goal"
              name="goal"
              rows={3}
              maxLength={2000}
              placeholder="e.g. more phone calls, taking bookings online, looking more professional"
              required
            />
          </label>

          <label className="check">
            <input type="checkbox" name="foundingOffer" value="yes" />
            <span>
              <strong>Claim a founding client spot (25% off)</strong>
              <span className="muted">
                In return, you&apos;re happy for me to feature your finished site as a case study.
              </span>
            </span>
          </label>

          {/* Honeypot, as on the source form. */}
          <label className="hp" aria-hidden="true">
            Website <input tabIndex={-1} autoComplete="off" name="website" />
          </label>

          <p className="form-privacy muted">
            I only use your details to reply to your enquiry.{" "}
            <a href="https://kimba.studio/privacy">Privacy notice</a>
          </p>

          <button type="submit" className="btn btn-ink">
            Start your project
          </button>
        </form>
      </div>

      <p className="cta-note">
        Prefer email? <a href="mailto:hello@kimba.studio">hello@kimba.studio</a>
      </p>
    </section>
  );
}
