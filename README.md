# foreshore

A working clone of the **kimba.studio** homepage, rebuilt as editable Next.js code.

The source is a Next.js marketing site for a one-person web design studio in Brisbane.
This repo reproduces its homepage — layout, assets, type, colour and interactions —
from measured computed styles rather than by shipping the original's compiled bundle.

## Run it

```bash
npm install
```

```bash
npm run dev
```

Then open <http://localhost:3000>. For the production build:

```bash
npm run build && npm run start
```

## Route map

| Source | Local | Status |
| --- | --- | --- |
| `https://kimba.studio/` | `/` | Cloned |

Only the homepage was in scope. Every other destination — `/pricing`, `/about`,
`/services/*`, `/concepts/*`, `/guides/*`, `/privacy`, `/terms`,
`/web-design-brisbane` — is left pointing at the live site, as are the Instagram
and LinkedIn links. In-page anchors (`#work`, `#pricing`, `#process`, `#about`,
`#contact`, `#top`) are local.

## Layout

```
src/app/layout.tsx        fonts, metadata, <html data-skin="motel" class="reveal-on">
src/app/page.tsx          section composition and the band/CTA wrappers
src/app/globals.css       all site styling, tokens first
src/components/site/      Header, Hero, Work, Pricing, Process, About, Faq,
                          Contact, Footer, Waves, Reveal, MobileCta, TilesMarquee
src/components/tiles/     the seven carousel tiles + the mascot sprite canvas
src/fonts/                Inter, Sora and Anton woff2 subsets
public/                   skins, hero art, concept imagery, 40-frame sprite
```

### Theming

The source ships a token architecture with a light default palette on `:root`
overridden per skin, and currently renders with `data-skin="motel"` — the dark
purple/neon treatment. That structure is preserved in `globals.css`: change the
`data-skin` attribute in `layout.tsx` and the default `:root` palette takes over.

Headings switch to Anton (uppercase) only while a skin is active, which is why
`.hero h1` is Inter in the base rules and Anton as rendered.

### Notable mechanics

- **Tiles marquee** — continuous 28 px/s scroll, pauses on hover, with prev/next
  and a pause control. Seven tiles rendered twice; the loop resets after one set.
- **Reveal** — one `IntersectionObserver` adds `.in` to `[data-reveal]`, which
  drives the featured laptop/phone entrance and the process timeline fill.
- **Mascot tile** — a `<canvas>` playing `thumb-idle`, 40 frames at 8 fps.
- **Waves** — the band and CTA dividers are inline SVG paths copied from the source.
- All motion respects `prefers-reduced-motion`.

## Known gaps

- The enquiry form posts to `/api/enquiry`, which does not exist here. The markup,
  validation attributes, honeypot field and all control states are reproduced, but
  submitting returns 404. Add a route handler to make it live.
- The product-showcase tile is a fixed pose. That matches the homepage: its carousel
  only animates on the concept page itself, which is out of scope.
- The hero's hidden `<picture>` fallback is omitted. Under a skin the source sets it
  to `display:none` and paints the scene from `--scene`, so the rendered result is
  identical.
- Fonts include the latin and latin-ext subsets only, not the Cyrillic, Greek or
  Vietnamese ranges the source also serves.
- The dynamically generated `opengraph-image` is not cloned; Open Graph text metadata is.
- Tailwind is installed and its utilities are imported, but preflight is deliberately
  left out so its reset does not fight the cloned base styles.

## Verification

Checked against the live site at 390, 1440, 1920 and 2560 px wide:

- Full-page height matches exactly — 6088 px desktop, 10189 px mobile, and at both
  wider viewports.
- Every section's top offset and height matches to the pixel.
- 45 elements compared on computed font, size, weight, line-height, letter-spacing,
  colour, background, radius, padding, gap, grid columns and display: no differences
  beyond the asset host and `next/font`'s lowercased family names.
- 21 interaction checks pass (marquee speed and pause, arrows, tile hovers, reveals,
  timeline fill, anchor nav, form controls), with no console or page errors and no
  horizontal overflow.
