import type { CSSProperties } from "react";
import Link from "next/link";
import { Nav } from "./Header";
import { getHero, getProcess, img } from "@/lib/content";

const SPARKS = [
  { left: "18%", top: "22%" },
  { left: "23%", top: "31%" },
  { right: "20%", top: "20%" },
  { right: "16%", top: "34%" },
];

/* Where the floating icons sit. The images themselves come from content/hero.json. */
const ICON_SPOTS = [
  { left: "calc(50% + -480px)", top: "128px" },
  { left: "calc(50% + 416px)", top: "192px" },
  { left: "calc(50% + -544px)", top: "320px" },
  { left: "calc(50% + 416px)", top: "384px" },
];

export default function Hero() {
  const hero = getHero();
  const steps = getProcess().steps.map((s) => s.title);
  const icons = hero.floatingIcons.slice(0, ICON_SPOTS.length);
  const sceneStyle = {
    "--scene": `url(${img(hero.sceneImage)})`,
    "--scene-mobile": `url(${img(hero.sceneImageMobile || hero.sceneImage)})`,
  } as CSSProperties;

  return (
    <div className="hero">
      <div className="hero-grid" aria-hidden="true" />

      <div className="hero-marks" aria-hidden="true">
        {SPARKS.map((s, i) => (
          <b className="spark" key={i} style={s}>
            ✦
          </b>
        ))}
        {icons.map((src, i) => (
          <i className="chip" key={i} style={ICON_SPOTS[i]}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img(src)} alt="" width={160} height={160} loading="lazy" decoding="async" />
          </i>
        ))}
      </div>

      {/* Hidden duplicate of the nav: reserves the header's height in flow. */}
      <Nav ghost />

      <div className="hero-body pad" id="top">
        <h1>
          <span className="eyebrow load l2">{hero.eyebrow}</span>{" "}
          <span className="h1-a load l2">{hero.headingLine1}</span>{" "}
          <span className="h1-b load l3">{hero.headingLine2}</span>
        </h1>
        <p className="hero-sub load l4">{hero.subheading}</p>
        <div className="hero-actions load l5">
          <Link href="/#contact" className="btn btn-ink">
            {hero.primaryButton}{" "}
            <span className="arr" aria-hidden="true">
              →
            </span>
          </Link>
          <a href="#work" className="btn btn-outline">
            {hero.secondaryButton}
          </a>
        </div>
      </div>

      <div className="hero-scene" aria-hidden="true" style={sceneStyle} />

      <div className="hero-cards pad">
        <div className="card card-timeline">
          <p className="card-title">{hero.stepsCardTitle}</p>
          <ol className="steps-mini">
            {steps.map((s, i) => (
              <li key={s} className={i === steps.length - 1 ? "is-live" : undefined}>
                <span className="dot-mini" aria-hidden="true" />
                {s}
              </li>
            ))}
          </ol>
        </div>
        <div className="card card-intro">
          {hero.avatar && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img className="avatar" src={img(hero.avatar)} alt="" width={48} height={48} loading="lazy" />
          )}
          <div>
            <p className="card-title">{hero.introCardTitle}</p>
            <p className="card-body">{hero.introCardText}</p>
          </div>
        </div>
        <ul className="card promises">
          {hero.checklist.map((p) => (
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
