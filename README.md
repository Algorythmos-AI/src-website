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

| Script                 | What it does                                         |
| ---------------------- | ---------------------------------------------------- |
| `npm run dev`          | Start the Vite dev server with HMR                   |
| `npm run build`        | Type-check (`tsc --noEmit`) then build to `dist/`    |
| `npm run preview`      | Serve the built `dist/` locally                      |
| `npm run typecheck`    | `tsc --noEmit` — strict type check                   |
| `npm run lint`         | ESLint (TypeScript + react-hooks + jsx-a11y)         |
| `npm run format`       | Format the codebase with Prettier                    |
| `npm run format:check` | Verify formatting (used in CI)                       |
| `npm run test`         | Run unit tests with Vitest                           |
| `npm run e2e`          | Run Playwright smoke tests (builds + previews first) |
| `npm run clean`        | Remove `dist/`                                       |

## Quality gates

CI (`.github/workflows/ci.yml`) runs on every push and PR to `main`/`next`: typecheck,
lint, format check, unit tests, production build, and a Playwright smoke suite. Dependabot
keeps dependencies current (`.github/dependabot.yml`).

## Notes

- **Donate page is a UI mock.** The `/donate` page is a visual placeholder only — no payment processor is wired up. Do **not** treat it as live giving; Stripe Checkout is planned (see the migration plan). The page no longer claims donations are "processed securely".
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
