# Sudanese Rural Community (SRC)

A premium nonprofit website for the Sudanese Rural Community (SRC), focused on peacebuilding, education, humanitarian aid, and rural development in Sudan.

## Tech stack

- React 19 + TypeScript
- Vite 6
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- React Router v7
- Motion (`motion/react`)
- Lucide icons

## Run locally

**Prerequisites:** Node.js 20+

```bash
npm install
npm run dev
```

The dev server runs on `http://localhost:3000`.

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Type-check via `tsc` is in `lint`; this builds to `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run lint` | `tsc --noEmit` — strict type check |
| `npm run clean` | Remove `dist/` |

## Notes

- **Donate page is a UI mock.** The credit card form on `/donate` is a visual placeholder only — no payment processor is wired up. Do **not** deploy this page as-is for live donations; integrate Stripe (or your processor of choice) before going public.
- **Newsletter and contact forms** are inert placeholders that prevent default submission. Wire up to your transactional email / CRM provider when ready.
- **Theme**: light/dark is toggled via the moon/sun in the navbar. The choice is persisted in `localStorage` and the initial theme is applied via an inline script in `index.html` to avoid a flash of unstyled content (FOUC). System `prefers-color-scheme` is honored when no choice has been saved.
- **Routing**: client-side via `react-router-dom`. A `<ScrollToTop />` helper resets scroll on route change, and an `<ErrorBoundary>` wraps lazy-loaded routes so chunk-load failures show a recovery UI instead of a white screen.

## Project structure

```
src/
├── components/      Reusable UI (Navbar, Footer, Hero, ShareButtons, …)
├── context/         Theme provider
├── pages/           Route-level views (About, Work, Impact, Contact, Donate)
├── App.tsx          Router shell + Home page
├── main.tsx         Entry point
└── index.css        Tailwind + theme tokens + custom dark variant
```
