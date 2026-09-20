# Cura Heritage Foods

## Description

Website and online catalog for Cura Heritage Foods (formerly Tosaf Foods), a Lagos-based natural foods
brand. Visitors browse the products, search and filter the shop, open a product page, build a cart,
and "check out" by sending a pre-filled order message to the business on WhatsApp. There is no payment
processing, database, or login.

Built with React 18, Vite 8, Tailwind CSS 3, React Router 7 and Framer Motion.

Live domain: https://curaheritagefoods.com

## Pages

| Route | Page |
| --- | --- |
| `/` | Home: hero, standard, catalog, featured products, story, **Why Cura**, contact |
| `/shop` | All products with search, category filter and sorting (state is kept in the URL, e.g. `/shop?category=Honey&q=raw`) |
| `/shop/:id` | Single product page: description, highlights, usage, ingredients, quantity picker, add to cart, WhatsApp order, related products |
| `*` | 404 page |

The cart is saved in the browser (`localStorage`), so it survives a refresh. Only product ids and
quantities are saved; prices and names always come from the current catalog.

## Requirements

- Node.js 22 (`engines` in `package.json`; Vite 8 needs 20.19+ or 22.12+)
- npm (the project uses `package-lock.json`)

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Opens on http://localhost:5173.

## Production Build

```bash
npm run build
```

Output goes to `dist/`. The build also writes `dist/sitemap.xml` from the product list
(`scripts/generate-sitemap.mjs`), so the sitemap never goes out of date.

## Preview

```bash
npm run preview
```

Serves the production build locally on http://localhost:4173. Note: the preview server does not apply
the headers in `vercel.json`.

## Managing Products

All products live in one file: [src/data/products.js](src/data/products.js). Add, edit or remove entries
there; the shop, product pages, category filters, footer links, cart and sitemap all update automatically.

| Field | Required | Notes |
| --- | --- | --- |
| `id` | yes | Unique, lowercase, dashes. Becomes the URL: `/shop/<id>` |
| `title`, `category`, `price`, `desc`, `image` | yes | `price` is a number in naira. `category` creates the shop filter chips. `desc` is also used as the page's meta description |
| `imagePosition` | no | CSS `object-position`, e.g. `'center 85%'`, to keep the jar in frame when an image is cropped |
| `eyebrow`, `tags`, `size` | no | Small label above the title, badges, pack size |
| `details` | no | Long description. A blank line starts a new paragraph |
| `highlightsTitle`, `highlights` | no | Bullet list: `[{ label: 'Bold lead', text: '...' }]` (`label` optional) |
| `usage` | no | `{ title: 'Perfect for', text: '...' }`, each new line becomes a row |
| `ingredients`, `tip` | no | Shown as "Ingredients" and a "Pro tip" box |

**Product images** go in `public/images/products/` and are referenced as `/images/products/<name>.jpg`.
If an image file is missing, a branded placeholder is shown instead of a broken image.

The home page shows the first 4 products as "Featured" and the first 6 in the quick-add catalog, so
put the products you want to promote first.

Other editable content: contact details in `src/components/cura/contactInfo.js`, free-shipping threshold
in `src/lib/store.js`.

## SEO

- **Domain, site name and default description:** `src/lib/site.js`. If the domain changes, update it
  there and in the `curaheritagefoods.com` URLs in `index.html` (share image and structured data) and
  `public/robots.txt`.
- **Per page:** `src/lib/usePageMeta.js` sets the title, description, canonical URL, Open Graph and Twitter
  tags for each route. Product pages also get Product and Breadcrumb structured data (JSON-LD) built from the
  product data. Stock availability is not included because it isn't tracked. The 404 and "product not
  found" pages are marked `noindex`.
- **Default tags** in `index.html` are what crawlers that do not run JavaScript (WhatsApp, Facebook)
  see for every URL, so a shared product link shows the site-wide card. Per-product previews would need
  prerendering.
- **Share image:** `public/og-image.png` (1200x630). Replace the file to change it.
- **Organization structured data** (name, address, phone, email, Instagram) is in `index.html`.
- `public/robots.txt` allows all crawlers and points to the sitemap.

After deploying, submit `https://curaheritagefoods.com/sitemap.xml` in Google Search Console.

## Environment Variables

**None.** The app reads no `import.meta.env` / `process.env` values, so no `.env` file is needed for
local development or for Vercel. `.env*` files (except `.env.example`) are git-ignored.

## Base44 Dependencies

This app has **no Base44 SDK, API, database, authentication or backend dependency**. The only Base44
touchpoint is image hosting: the hero image and the "heritage moment" image in `src/pages/Home.jsx` are
loaded from `https://media.base44.com/images/public/...`. They are public URLs and load fine, but they
only stay live as long as Base44 keeps hosting them. To remove that dependency, download the two images
into `public/images/`, update the URLs in `Home.jsx`, and remove `https://media.base44.com` from the
`img-src` rule in the Content-Security-Policy in `vercel.json`.

The original `App.jsx` wrapped the app in Base44 platform scaffolding (`AuthProvider`,
`QueryClientProvider`, `Toaster`, `UserNotRegisteredError`). Those files were not part of the export and
nothing in the app used them, so they were removed rather than fabricated.

## Vercel Deployment

| Setting | Value |
| --- | --- |
| Framework Preset | Vite |
| Install Command | `npm install` |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Node.js Version | 22.x |
| Environment Variables | none |

`vercel.json` does three things:

- **Rewrites** every path to `/index.html`, so a direct visit or refresh on `/shop` or a product URL loads
  the app. Real files (`robots.txt`, `sitemap.xml`, images) are served first.
- **Security headers** on every response: `Content-Security-Policy`, `X-Content-Type-Options`,
  `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`.
- **Caching:** hashed `/assets/*` for a year, `/images/*` for a day.

**If you add a third-party script, font, analytics tool or image host, update the
Content-Security-Policy in `vercel.json`** or the browser will block it. It currently allows only this
site, Google Fonts (`fonts.googleapis.com`, `fonts.gstatic.com`) and `media.base44.com` images.

## Known Limitations

- **Some home page copy still talks about grains** (hero headline "Heritage in every grain", the footer
  tagline, "The Cura Standard" pillar text and the story section) while the catalog is spices, soup
  essentials, honey and breakfast purée. Update it to match the current range.
- **Product copy uses the "Tosaf" name** while the site is branded Cura Heritage Foods (formerly Tosaf).
- **Health and quality claims** in the product copy ("boost immunity", "enriched with vitamins",
  "detoxified", "0% chemicals", "no MSG") come from the business and should be confirmed as substantiated
  and compliant with food labelling and advertising rules before launch.
- **Product images look AI-generated**, most carry a visible corner watermark, and the packaging text in
  them is garbled. Replace them with real product photos when available (same filenames).
- **Checkout is WhatsApp-only.** Nothing is paid for on the site.
- **Search is client-side** over the local product list, which is fine for a catalog of this size.
