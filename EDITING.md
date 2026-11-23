# Editing your website

All the words, prices, projects and pictures on the Foreshore Studio site live in two folders:

- **`content/`** holds the text. Each part of the page has its own file (for example `pricing.json` or `faq.json`). Each showcase project has its own file in `content/showcase/`.
- **`public/images/`** holds the pictures.

You never need to touch the code. The easiest way to edit is **Pages CMS**, a free website that turns these files into simple forms.

---

## One-time setup: connect Pages CMS

1. Go to **https://app.pagescms.org** and click **Sign in with GitHub**.
2. When asked, install the Pages CMS GitHub App and give it access to the **foreshore** repository.
3. Open the **foreshore** repository in Pages CMS.
4. Pick the branch you want to edit, for example `foreshore-new` (and later `main`). Pages CMS reads its settings from the `.pages.yml` file on that branch.

You'll see a menu on the left: *Showcase projects, Site settings, Hero, Recent work section, Pricing, How it works, About, FAQ, Contact form, Privacy policy, Terms of use*, plus *Media* for images.

Every time you click **Save**, Pages CMS saves the change to GitHub for you. If your site is connected to a host such as Vercel or Netlify, it will update a minute or two later.

---

## How to change a price

1. In Pages CMS, click **Pricing**.
2. Open the package you want under **Packages** (for example *Business Website (4–5 pages)*).
3. Change the **Price** box, for example `$999` to `$1,099`. Type it exactly as you want it to appear, including the `$` sign and any words like `from`.
4. Click **Save**.

Care plan prices are further down the same form, under **Care plans**. Each plan has a **Main price** (`$49/mo billed yearly`) and a **Second price** (`or $59 monthly`).

Also update the **FAQ** answer "How much does a website cost?", because it mentions the prices too.

## How to edit the hero (the top of the page)

1. Click **Hero (top of page)**.
2. Change any of the boxes:
   - **Small line above the heading**: the little pink line at the very top.
   - **Heading line 1** and **Heading line 2**: the big headline, in two colours.
   - **Subheading**: the sentence under the headline.
   - **Button texts**, **Checklist items**, and the small **Intro card** with your picture.
3. Click **Save**.

The five step names in the little "Online in 5 steps" card come from **How it works**, so they always stay in sync.

## How to add a showcase project

1. Click **Showcase projects**, then **Add an entry**.
2. Fill in the form:
   - **Project name**, **Type** (e.g. "Website") and **Status** (Live, Demo, Concept or Coming soon).
   - **Short description**: one or two sentences.
   - **Cover image**: a wide screenshot, about 1200 × 800 pixels. Leave it empty and a simple grey sketch is shown instead.
   - **Extra screenshots**: the first one fades in when someone hovers over the project.
   - **Live website link** or **Demo link**: the full address, starting with `https://`. Leave both empty if there's nothing to link to yet.
   - **Tags**: a few short words.
   - **Featured**: tick this for the one project you want shown big at the top of *Recent work*. Only tick one.
   - **Order**: `1` shows first, `2` second, and so on.
3. Click **Save**.

To remove a project, open it and delete it (or untick *Featured* and change its order if you only want to move it).

## How to replace an image

**Option A: in the form (easiest).** Open the section that uses the image, for example **About → Portrait (your Memoji)**. Click the image box, upload your new picture, select it, and **Save**.

**Option B: in Media.** Click **Media**, upload your picture, then go to the form where it's used and choose it.

**Option C: keep the same name.** Upload a new picture with exactly the same file name as the old one (for example `memoji-placeholder.svg`). It replaces the old one everywhere, with no form changes needed. Keep the same file type too.

Tips:
- Use `.webp`, `.jpg` or `.png` for photos and screenshots, and `.svg` for simple drawings. Keep each file under about 500 KB so the site stays fast.
- In the content files, images are written as `/images/file-name.png`. You can also write just the file name, like `file-name.png`, and the site looks for it in `public/images/`.

Images to replace with your own when you're ready:

| File | Where it shows |
| --- | --- |
| `memoji-placeholder.svg` | small picture in the hero intro card |
| `portrait-placeholder.svg` | large picture in the About section |
| `hero-scene.svg`, `hero-scene-mobile.svg` | shoreline scene at the bottom of the hero (desktop and phone) |
| `icon-*.svg` | the four floating icons in the hero |
| `shop-floor-cover.svg`, `shop-floor-screenshot-1.svg` | the Shop Floor Operations App showcase project |

---

## Before you publish

Fill these in, because they're empty or marked **DRAFT** on purpose:

- **Site settings → Email / Phone / Social links.** These are hidden on the site until you fill them in.
- **Contact form → Web3Forms access key.** The enquiry form uses Web3Forms (free). Sign up at https://web3forms.com with the email address you want enquiries sent to, copy the access key, and paste it here. Until then, the **Send** button is greyed out.
- **About → Text.** Rewrite the DRAFT text in your own words.
- **Privacy policy** and **Terms of use.** These are short starting drafts for a Canadian business, not legal advice. Have them reviewed, then remove the word "DRAFT".

## Editing without Pages CMS

You can also edit the files in `content/` directly on GitHub (open the file, click the pencil icon, then *Commit changes*). Keep the quote marks `"`, commas and brackets exactly as they are, and change only the words between the quotes.

## Previewing on your own computer

In the Terminal, inside the project folder:

```bash
npm install     # only the first time
npm run dev
```

Then open http://localhost:3000. Changes to the content files show up after a page refresh.
