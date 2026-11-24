# Foreshore Studio website

The website for Foreshore Studio, a web design studio in Charlottetown, Prince Edward Island.

**To change any words, prices, projects or images, see [EDITING.md](EDITING.md).**

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000. For a production build: `npm run build && npm run start`.

## How it's organised

```
content/                 all editable text (JSON), one file per section
content/showcase/        one file per showcase project (pages at /work/<name>)
content/packages/        one file per package (pages at /packages/<name>)
content/legal/           privacy policy and terms
public/images/           all images, referenced as /images/<file name>
.pages.yml               Pages CMS settings (the browser editing forms)
src/lib/content.ts       reads the content files
src/app/                 pages (home, /work, /work/[slug], /packages/[slug],
                         /privacy, /terms), layout and styles
src/components/site/     the page sections (Hero, Work, Pricing, ...)
src/fonts/               Inter, Sora and Anton (open-source fonts)
```

Built with Next.js. The pages are generated from the content files when the site is built, so every page is fast, static HTML.

### Theme

Colours live in `src/app/globals.css`. The site uses the dark "motel" palette, set with `data-skin="motel"` in `src/app/layout.tsx`. Remove that attribute to switch to the light default palette.

### Contact form

The enquiry form posts to [Web3Forms](https://web3forms.com). Add your access key in `content/contact.json` (`formAccessKey`). The send button stays disabled while the key is empty.
