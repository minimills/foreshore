const FAQS = [
  {
    q: "How much does a small business website cost?",
    a: "Kimba Studio's packages start at $1,500 + GST for a one-page website, $3,000 + GST for a five-page business website, and $5,000 + GST for an online store or booking system. The price is fixed before we start, with a 50% deposit up front and the rest at launch.",
  },
  {
    q: "How long does it take to build a website?",
    a: "With Kimba Studio, a one-page website can be live in 7 days. A five-page business website usually takes 3 to 6 weeks from our first chat to launch: about a week for designs, 1 to 2 weeks of feedback, 1 to 2 weeks to build, then 2 to 3 days to go live.",
  },
  {
    q: "Do I own my website?",
    a: "Yes. Once the final payment is made, the website and everything on it belongs to you. Your domain stays in your name, and you're never locked into a care plan to keep the site running.",
  },
  {
    q: "Can I make changes after the site is live?",
    a: "Yes. The optional care plan is $79 a month and covers hosting, backups and up to an hour of edits each month, so you just email me what you'd like changed. Without a care plan, I quote small changes as they come up.",
  },
  {
    q: "Will my website show up on Google?",
    a: "Every business website is set up for Google from day one: clear page titles and descriptions, fast mobile-friendly pages, and a sitemap so Google can find every page. At launch I connect your site to Google Search Console. I won't promise rankings, because no one honestly can.",
  },
  {
    q: "Do you only work with businesses in Brisbane?",
    a: "No. I'm based in Brisbane and work with small businesses right across Australia. The chat, designs and feedback all happen by video call, phone and email, so the process is the same wherever you are.",
  },
  {
    q: "What do I need to provide?",
    a: "Your words and photos, in whatever state they're in, and I'll polish them. Beyond that, I need a quick reply to each round of feedback. The timeline assumes you get back to me within 2 business days.",
  },
  {
    q: "Who will I be working with?",
    a: "Me, Joshua Kimber, from start to finish. There's no account manager or outsourced team. I've spent 18 years in IT on large-scale projects, and now I build websites for small businesses with a clear price and a fixed timeline.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="section faq pad">
      <h2 data-reveal="">Common questions</h2>
      <div className="faq-list s2" data-reveal="">
        {FAQS.map((f) => (
          <div className="faq-item" key={f.q}>
            <h3>{f.q}</h3>
            <p className="muted">{f.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
