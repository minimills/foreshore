import Link from "next/link";
import { Nav } from "./Header";

const SPARKS = [
  { left: "18%", top: "22%" },
  { left: "23%", top: "31%" },
  { right: "20%", top: "20%" },
  { right: "16%", top: "34%" },
];

const CHIPS = [
  { src: "/hero/icons/pencil.webp", left: "calc(50% + -480px)", top: "128px" },
  { src: "/hero/icons/rocket.webp", left: "calc(50% + 416px)", top: "192px" },
  { src: "/hero/icons/browser.webp", left: "calc(50% + -544px)", top: "320px" },
  { src: "/hero/icons/bubble.webp", left: "calc(50% + 416px)", top: "384px" },
];

const STEPS_MINI = ["Chat", "Design", "Feedback", "Build", "Live"];
const PROMISES = ["Mobile-ready", "Edits handled", "Fixed price", "You own it"];

export default function Hero() {
  return (
    <div className="hero">
      <div className="hero-grid" aria-hidden="true" />

      <div className="hero-marks" aria-hidden="true">
        {SPARKS.map((s, i) => (
          <b className="spark" key={i} style={s}>
            ✦
          </b>
        ))}
        {CHIPS.map((c) => (
          <i className="chip" key={c.src} style={{ left: c.left, top: c.top }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.src} alt="" width={160} height={160} loading="lazy" decoding="async" />
          </i>
        ))}
      </div>

      {/* Hidden duplicate of the nav: reserves the header's height in flow. */}
      <Nav ghost />

      <div className="hero-body pad" id="top">
        <h1>
          <span className="eyebrow load l2">Web design for small business in Australia</span>{" "}
          <span className="h1-a load l2">Your business is great.</span>{" "}
          <span className="h1-b load l3">Your website should be too.</span>
        </h1>
        <p className="hero-sub load l4">
          Custom, fast, mobile-ready websites for small businesses, built by someone with 18 years
          in IT rather than a template factory.
        </p>
        <div className="hero-actions load l5">
          <Link href="/#contact" className="btn btn-ink">
            Start your project{" "}
            <span className="arr" aria-hidden="true">
              →
            </span>
          </Link>
          <a href="#work" className="btn btn-outline">
            See my work
          </a>
        </div>
      </div>

      {/* With a skin active the scene is painted from --scene; the source's
          <picture> fallback is display:none in that state. */}
      <div className="hero-scene" aria-hidden="true" />

      <div className="hero-cards pad">
        <div className="card card-timeline">
          <p className="card-title">Live in 5 steps</p>
          <ol className="steps-mini">
            {STEPS_MINI.map((s, i) => (
              <li key={s} className={i === STEPS_MINI.length - 1 ? "is-live" : undefined}>
                <span className="dot-mini" aria-hidden="true" />
                {s}
              </li>
            ))}
          </ol>
        </div>
        <div className="card card-intro">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="avatar" src="/hero/josh-avatar.webp" alt="" width={48} height={48} loading="lazy" />
          <div>
            <p className="card-title">Hi, I&apos;m Joshua</p>
            <p className="card-body">You deal with me from start to finish.</p>
          </div>
        </div>
        <ul className="card promises">
          {PROMISES.map((p) => (
            <li key={p}>
              <span className="tick" aria-hidden="true">
                ✓
              </span>{" "}
              {p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
