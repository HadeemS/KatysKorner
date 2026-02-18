# Katy's Korner

Minimal clothing store frontend built with React + Vite + JavaScript. Static site deployable to GitHub Pages. Uses Stripe Payment Links per product (no backend required).

## Run Locally

```bash
npm install
npm run dev
```

Open http://localhost:5173/KatysKorner/ (or the URL shown in terminal).

## Build

```bash
npm run build
```

Output goes to `dist/`.

## Deploy to GitHub Pages

1. Update `base` in `vite.config.js` to match your repo:
   - Project page: `base: '/KatysKorner/'` (or your repo name)
   - User/org page: `base: '/'`

2. Deploy:

```bash
npm run deploy
```

This builds and pushes the `dist` folder to the `gh-pages` branch. Configure GitHub Pages to serve from that branch.

## Edit Products & Stripe Links

- **Products**: Edit `src/data/products.json`
  - Add/remove products, change name, category, price (in cents), description
  - Optional: `sizes`, `colors` arrays for variant selectors
  - `image`: URL or path to product image (e.g. `assets/products/hoodie1.jpg` in `public/`)
  - `checkoutUrl`: Your Stripe Payment Link URL (create at [dashboard.stripe.com](https://dashboard.stripe.com))

## Assets

Place these files in `public/assets/`:

- `EtsyBanner.png` – hero banner on Home
- `LogoFORInsta.png` – navbar logo
- `InstaReel.png` – “Coming Soon” section

Product images: add to `public/assets/products/` and set the `image` field in `products.json` (e.g. `assets/products/hoodie1.jpg`).

## Tech Stack

- React 18
- React Router (HashRouter)
- Vite 5
- No TypeScript, UI frameworks, or state libraries
