import type { CSSProperties } from "react";
import Link from "next/link";
import MascotCanvas from "./MascotCanvas";

const SRC = "https://kimba.studio";

type Meta = { href: string; title: string; pill: string; pillClass: string; industry: string };

function TileShell({ meta, children }: { meta: Meta; children: React.ReactNode }) {
  const inner = (
    <>
      {children}
      <div className="tile-meta">
        <span className="tile-title">{meta.title}</span>
        <span className={`pill ${meta.pillClass}`}>{meta.pill}</span>
      </div>
      <span className="muted tile-industry">{meta.industry}</span>
    </>
  );
  // Same-site anchors route through next/link; concept pages stay on the source.
  return meta.href.startsWith("/") ? (
    <Link className="tile" href={meta.href}>
      {inner}
    </Link>
  ) : (
    <a className="tile" href={meta.href}>
      {inner}
    </a>
  );
}

/* 1 — founding-client placeholder, a plain skeleton UI that lifts on hover */
export function FoundingTile() {
  return (
    <TileShell
      meta={{
        href: "/#contact",
        title: "Your business here",
        pill: "Founding offer",
        pillClass: "pill-offer",
        industry: "3 founding client spots left at 25% off",
      }}
    >
      <div className="shot" aria-hidden="true">
        <div className="ui">
          <div className="l" style={{ width: "40%" }} />
          <div
            className="b"
            style={{ height: 90, background: "linear-gradient(135deg,var(--bg-2),var(--leaf-soft))" }}
          />
          <div className="l" />
          <div className="l" style={{ width: "60%" }} />
          <div className="row3">
            <div className="b" />
            <div className="b" />
            <div className="b" />
          </div>
        </div>
      </div>
    </TileShell>
  );
}

/* 2 — service page: a long page that scrolls up inside the window on hover */
export function ServicePageTile() {
  return (
    <TileShell
      meta={{
        href: `${SRC}/concepts/service-page`,
        title: "Service Page",
        pill: "Concept",
        pillClass: "pill-concept",
        industry: "A solo dietitian's services, fees and story on one calm, clear page",
      }}
    >
      <div className="shot spt" aria-hidden="true">
        <div className="spt-win">
          <div className="spt-page">
            <div className="spt-top">
              <div className="spt-nav">
                <b>Sprig</b>
                <i />
                <i />
                <i />
                <span />
              </div>
              <div className="spt-hero">
                <div>
                  <span className="spt-h" style={{ width: "88%" }} />
                  <span className="spt-h spt-h-green" style={{ width: "62%" }} />
                  <span className="spt-p" />
                  <span className="spt-pill" />
                </div>
                <div className="spt-stats">
                  <b>60 min</b>
                  <b>1:1</b>
                </div>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/concepts/sprig/hero-sm.webp" alt="" className="spt-photo" width={480} height={240} loading="lazy" />
            </div>
            <div className="spt-chips">
              <span />
              <span data-on="" />
              <span />
              <span />
            </div>
            <div className="spt-bento">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/concepts/sprig/maya-sm.webp" alt="" width={240} height={300} loading="lazy" />
              <div>
                <i className="spt-dark" />
                <i className="spt-soft" />
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/concepts/sprig/hero-sm.webp" alt="" width={480} height={240} loading="lazy" />
            </div>
            <div className="spt-fees">
              <span className="spt-h" style={{ width: "46%", background: "#fff" }} />
              <div>
                <i />
                <i />
                <i />
                <i />
              </div>
            </div>
          </div>
        </div>
      </div>
    </TileShell>
  );
}

/* 3 — product showcase. Static pose on the homepage: the carousel only
   animates on the concept page itself, so these are the source's fixed values. */
const SC_ITEMS: { src: string; state: string; style: CSSProperties }[] = [
  { src: "drill", state: "active", style: { "--x": 72, "--y": 52, "--w": 36, "--s": 1, "--b": "0px", "--o": 1, zIndex: 10 } as CSSProperties },
  { src: "tape", state: "queued", style: { "--x": 43.08, "--y": 46, "--w": 36, "--s": 0.44, "--b": "1.25px", "--o": 0.8, zIndex: 9 } as CSSProperties },
  { src: "hammer", state: "queued", style: { "--x": 26.76, "--y": 45, "--w": 36, "--s": 0.3, "--b": "2.5px", "--o": 0.55, zIndex: 8 } as CSSProperties },
  { src: "spanners", state: "queued", style: { "--x": 14.76, "--y": 44, "--w": 36, "--s": 0.2, "--b": "4px", "--o": 0.32, zIndex: 7 } as CSSProperties },
  { src: "pliers", state: "hidden", style: { "--x": 5.64, "--y": 44, "--w": 36, "--s": 0.14, "--b": "5px", "--o": 0, zIndex: 1 } as CSSProperties },
  { src: "driver", state: "exit", style: { "--x": 112.8, "--y": 52, "--w": 36, "--s": 1.1, "--b": "2px", "--o": 0, zIndex: 11 } as CSSProperties },
];

const SC_RAIL = ["drill", "tape", "hammer", "spanners", "pliers", "driver"];

export function ProductShowcaseTile() {
  return (
    <TileShell
      meta={{
        href: `${SRC}/concepts/product-showcase`,
        title: "Product Showcase",
        pill: "Concept",
        pillClass: "pill-concept",
        industry: "A storefront where every product gets its moment in the spotlight",
      }}
    >
      <div className="shot sc" aria-hidden="true">
        <div className="sc-win">
          <div className="sc-head">
            <span className="sc-mark">Ironbark</span>
            <span className="sc-cart" />
          </div>
          <div className="sc-body">
            <div className="sc-stage">
              <span className="sc-line" style={{ width: "34%" }} />
              <span className="sc-line" style={{ width: "22%" }} />
              {SC_ITEMS.map((it) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={it.src}
                  src={`/concepts/ironbark/${it.src}-sm.webp`}
                  alt=""
                  width={360}
                  height={360}
                  className="sc-item"
                  data-state={it.state}
                  style={it.style}
                  loading="lazy"
                />
              ))}
            </div>
            <div className="sc-rail">
              <div className="sc-track" style={{ "--off": 0 } as CSSProperties}>
                {SC_RAIL.map((n, i) => (
                  <div className="sc-card" key={n} data-on={i === 0 ? "true" : undefined}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/concepts/ironbark/${n}-sm.webp`} alt="" width={360} height={360} loading="lazy" />
                    <span className="sc-card-name" />
                    <span className="sc-card-price" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </TileShell>
  );
}

/* 4 — mascot, a 40-frame sprite loop on a canvas */
export function MascotTile() {
  return (
    <TileShell
      meta={{
        href: `${SRC}/concepts/interactive`,
        title: "Interactive Animation",
        pill: "Concept",
        pillClass: "pill-concept",
        industry: "A mascot that follows, reacts and naps: interaction as a design tool",
      }}
    >
      <div className="shot bt" aria-hidden="true">
        <MascotCanvas />
      </div>
    </TileShell>
  );
}

/* 5 — style palettes: four rotated strips that straighten on hover */
const PALETTES = [
  { cls: "pt-minimal", name: "Minimal", bg: "#FFFFFF", fg: "#111111", chips: ["#FFFFFF", "#F5F6F8", "#9CA3AF", "#111111", "#2563EB"] },
  { cls: "pt-brutalist", name: "Brutalist", bg: "#FFD600", fg: "#000000", chips: ["#FFD600", "#000000", "#FFFFFF", "#E11D48", "#D4D4D4"] },
  { cls: "pt-retro", name: "Retro", bg: "#F4E7C9", fg: "#4A2C1A", chips: ["#F4E7C9", "#E3A72F", "#D9622B", "#2A7F7F", "#4A2C1A"] },
  { cls: "pt-luxury", name: "Luxury", bg: "#141414", fg: "#F2EDE4", chips: ["#141414", "#2A2A2A", "#C9A45C", "#F2EDE4", "#5B6B6B"] },
];

export function StylePalettesTile() {
  return (
    <TileShell
      meta={{
        href: `${SRC}/concepts/style-switcher`,
        title: "Style Palettes",
        pill: "Concept",
        pillClass: "pill-concept",
        industry: "One business, four styles: how the look follows your customers",
      }}
    >
      <div className="shot pt" aria-hidden="true">
        <div className="pt-stack">
          {PALETTES.map((p) => (
            <div className={`pt-strip ${p.cls}`} key={p.cls} style={{ background: p.bg, color: p.fg }}>
              <span className="pt-name">{p.name}</span>
              <span className="pt-chips">
                {p.chips.map((c, i) => (
                  <span key={i} style={{ background: c }} />
                ))}
              </span>
            </div>
          ))}
        </div>
      </div>
    </TileShell>
  );
}

/* 6 & 7 — two stills that cross-fade on hover */
function StillTile({ meta, a, b, w, h }: { meta: Meta; a: string; b: string; w: number; h: number }) {
  return (
    <TileShell meta={meta}>
      <div className="shot st" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={a} alt="" width={w} height={h} loading="lazy" className="st-img" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={b} alt="" width={w} height={h} loading="lazy" className="st-img st-end" />
      </div>
    </TileShell>
  );
}

export function ScrollStoryTile() {
  return (
    <StillTile
      meta={{
        href: `${SRC}/concepts/scroll-story`,
        title: "Scroll Story",
        pill: "Concept",
        pillClass: "pill-concept",
        industry: "A bookshop where scrolling dives you into the book",
      }}
      a="/concepts/turning-page/desktop/still-0-sm.webp"
      b="/concepts/turning-page/desktop/still-4-sm.webp"
      w={720}
      h={405}
    />
  );
}

export function BuilderTile() {
  return (
    <StillTile
      meta={{
        href: `${SRC}/concepts/builder`,
        title: "Builder",
        pill: "Concept",
        pillClass: "pill-concept",
        industry: "A renovation that builds itself as you scroll",
      }}
      a="/concepts/wattle-lane/mobile/still-0.webp"
      b="/concepts/wattle-lane/mobile/still-6.webp"
      w={960}
      h={720}
    />
  );
}
