import { getContact, getPackages, getSite } from "@/lib/content";

/*
 * The enquiry form sends through Web3Forms (web3forms.com, free) once an
 * access key is added in content/contact.json. Until then it can't be sent.
 */
export default function Contact() {
  const contact = getContact();
  const site = getSite();
  const packages = getPackages();
  const key = contact.formAccessKey.trim();

  return (
    <section id="contact" className="cta pad" aria-labelledby="contact-heading">
      <h2 id="contact-heading" data-reveal="">
        {contact.heading}
      </h2>
      <p className="s1" data-reveal="">
        {contact.intro}
      </p>

      <div className="s2" data-reveal="">
        <form
          id="enquiry"
          className="enquiry"
          action={key ? "https://api.web3forms.com/submit" : undefined}
          method="post"
        >
          <input type="hidden" name="access_key" value={key} />
          <input type="hidden" name="subject" value={contact.emailSubject} />
          <input type="hidden" name="from_name" value={site.studioName} />

          <div className="field-row">
            <label className="field" htmlFor="enq-name">
              <span>
                {contact.nameLabel} <span aria-hidden="true">*</span>
              </span>
              <input id="enq-name" autoComplete="name" required name="name" />
            </label>
            <label className="field" htmlFor="enq-email">
              <span>
                {contact.emailLabel} <span aria-hidden="true">*</span>
              </span>
              <input id="enq-email" type="email" autoComplete="email" required name="email" />
            </label>
          </div>

          <div className="field-row">
            <label className="field" htmlFor="enq-phone">
              <span>{contact.phoneLabel}</span>
              <input id="enq-phone" type="tel" autoComplete="tel" name="phone" />
            </label>
            <label className="field" htmlFor="enq-business">
              <span>{contact.businessLabel}</span>
              <input id="enq-business" autoComplete="organization" name="business" />
            </label>
          </div>

          <fieldset className="field">
            <legend>
              {contact.projectTypeQuestion} <span aria-hidden="true">*</span>
            </legend>
            <div className="choice">
              {contact.projectTypeOptions.map((o) => (
                <label key={o}>
                  <input type="radio" required name="projectType" value={o} />
                  {o}
                </label>
              ))}
            </div>
          </fieldset>

          <label className="field" htmlFor="enq-package">
            <span>{contact.packageQuestion}</span>
            <select id="enq-package" name="package" defaultValue="">
              <option value="">{contact.packagePlaceholder}</option>
              {packages.map((p) => (
                <option key={p.name} value={p.name}>
                  {p.name}
                </option>
              ))}
              <option value={contact.notSureOption}>{contact.notSureOption}</option>
            </select>
          </label>

          <label className="field" htmlFor="enq-goal">
            <span>
              {contact.goalQuestion} <span aria-hidden="true">*</span>
            </span>
            <textarea
              id="enq-goal"
              name="goal"
              rows={3}
              maxLength={2000}
              placeholder={contact.goalPlaceholder}
              required
            />
          </label>

          {/* Spam trap: hidden from people, bots tick it. */}
          <label className="hp" aria-hidden="true">
            Leave this empty <input type="checkbox" tabIndex={-1} name="botcheck" />
          </label>

          <p className="form-privacy muted">
            {contact.privacyText} <a href="/privacy">{contact.privacyLinkText}</a>
          </p>

          <button type="submit" className="btn btn-ink" disabled={!key}>
            {contact.buttonText}
          </button>
        </form>
      </div>

      {site.email && (
        <p className="cta-note">
          {contact.emailPrompt} <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
      )}
    </section>
  );
}
