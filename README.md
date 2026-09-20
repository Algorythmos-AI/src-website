# Sudanese Rural Community (SRC)

A premium nonprofit website for the Sudanese Rural Community (SRC), focused on peacebuilding, education, humanitarian aid, and rural development in Sudan.

## Tech stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 (via `@tailwindcss/postcss`)
- next-intl 4 — English / French / Arabic (RTL), locale-prefixed routes (`/en`, `/fr`, `/ar`)
- Motion (`motion/react`)
- Lucide icons
- Fonts self-hosted via `next/font` (Inter, Playfair Display, IBM Plex Sans Arabic)

> **Migration in progress.** This branch (`next`) is the Vite → Next.js + Payload CMS
> migration. `main` remains the original Vite SPA and stays deployable. Payload CMS,
> forms, and donations land in later phases (see the migration plan).

## Run locally

**Prerequisites:** Node.js 22+

```bash
npm install
npm run dev
```

The dev server runs on `http://localhost:3000`. The site redirects `/` to `/en`.

Copy `.env.example` to `.env.local` and adjust as needed.

## Scripts

| Script                 | What it does                                        |
| ---------------------- | --------------------------------------------------- |
| `npm run dev`          | Start the Next.js dev server                        |
| `npm run build`        | Production build (`next build`)                     |
| `npm run start`        | Serve the production build                          |
| `npm run typecheck`    | `tsc --noEmit` — strict type check                  |
| `npm run lint`         | ESLint (TypeScript + react-hooks + jsx-a11y + Next) |
| `npm run format`       | Format the codebase with Prettier                   |
| `npm run format:check` | Verify formatting (used in CI)                      |
| `npm run i18n:check`   | Verify translation key parity across locales        |
| `npm run test`         | Run unit tests with Vitest                          |
| `npm run e2e`          | Run Playwright smoke tests (builds + serves first)  |
| `npm run clean`        | Remove `.next/`                                     |

## Quality gates

CI (`.github/workflows/ci.yml`) runs on every push and PR to `main`/`next`: typecheck,
lint, format check, i18n key parity, unit tests, production build, and a Playwright smoke
suite. Dependabot keeps dependencies current (`.github/dependabot.yml`).

## Project structure

```
src/
├── app/
│   ├── [locale]/        Localized routes (layout, home, about, work, impact, contact, donate)
│   ├── api/health/      Liveness probe
│   ├── global-error.tsx / not-found.tsx
│   └── globals.css      Tailwind + theme tokens
├── components/          Reusable UI (Navbar, Footer, Hero, LanguageSwitcher, …)
├── views/               Page-level views rendered by the route wrappers
├── context/             Theme provider
├── i18n/                next-intl routing / navigation / request config
└── proxy.ts             next-intl middleware (locale negotiation)
messages/                en.json / fr.json / ar.json
```

## Notes

- **Donate page is a UI mock.** The `/donate` page is a visual placeholder only — no payment processor is wired up. Stripe Checkout is planned. The page no longer claims donations are "processed securely".
- **Newsletter and contact forms** are inert placeholders that prevent default submission. They get wired to a mail provider with spam protection in a later phase.
- **Theme**: light/dark is toggled via the moon/sun in the navbar, persisted in `localStorage`, and applied pre-paint via an inline script in the root layout to avoid a flash of the wrong theme. System `prefers-color-scheme` is honored when no choice has been saved.
- **i18n**: UI chrome (nav, footer, 404) is translated across all three locales; page prose is migrated to the CMS/messages incrementally in later phases.
