# SRC — Operations Runbook

## Stack

Next.js 16 (App Router) + Payload CMS 3 on Postgres, deployed on Vercel.
Frontend is statically generated from the CMS with on-demand revalidation.

## Environments

| Env         | Branch | Database          | Stripe |
| ----------- | ------ | ----------------- | ------ |
| Development | local  | local Postgres    | test   |
| Preview     | any PR | Neon (preview)    | test   |
| Production  | `main` | Neon (production) | live   |

All secrets live in Vercel project env vars (never committed). See `.env.example`
for the full list. Every integration degrades gracefully when unset.

## Deploy

Vercel builds on every push. The build command does **not** run migrations:

```
payload generate:importmap && next build
```

Pages that read new tables fall back to empty states when a migration is missing,
so a build never fails on it, but the new content stays hidden until it is applied.

CI (`.github/workflows/ci.yml`) must be green before merge: typecheck, lint,
format, i18n parity, unit tests, migrations, build, Playwright e2e + axe.

## Database migrations

- Schema changes are committed migrations (`src/migrations/`), never `push` in prod.
- Create one after changing collections/fields: `npm run migrate:create <name>`
- Apply to production **before merging a release that adds migrations**, using
  the database Vercel's production environment uses (not whatever `.env.local` holds):

  ```
  vercel env pull .env.production.local --environment=production
  (set -a; . ./.env.production.local; set +a; npx payload migrate:status && npx payload migrate)
  rm .env.production.local
  ```

- After deploying, check the build log has no "unavailable" warnings (e.g.
  `Galleries unavailable`); they mean the production database is missing a migration.
- Migrations are forward-only; for destructive changes use expand-then-contract.

## Seeding

`npm run seed` is idempotent (upserts by slug/name). Safe to re-run. It imports
the baseline content and downloads program imagery.

## Rollback

- **App:** Vercel → Deployments → promote the previous production deployment.
  The rollback build reads the same database; keep migrations backward-compatible.
- **Data:** restore from Neon point-in-time restore (enable in the Neon console).

## Revalidation

Publishing/unpublishing content fires `revalidateTag` via Payload afterChange
hooks, so the static site updates within seconds without a redeploy.

## Health & monitoring

- Liveness: `GET /api/health` (returns `{status:"ok"}`).
- Add an uptime monitor on `/api/health` and the home page.
- Sentry (when `SENTRY_DSN` is set) captures client/server errors.

## Secret rotation

Rotate in Vercel env vars, then redeploy: `PAYLOAD_SECRET`, `STRIPE_SECRET_KEY`,
`STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY`, Turnstile keys, Upstash tokens,
`FORM_SALT`. Rotating `PAYLOAD_SECRET` invalidates admin sessions (re-login).

## Incident quick reference

- **Admin 500s:** usually the database — check Neon status and `POSTGRES_URL`.
- **Donations not recording:** verify the Stripe webhook endpoint + signing secret.
- **Emails not arriving:** check Resend domain verification (SPF/DKIM/DMARC).
- **Forms rejected (429):** rate limiter; confirm Upstash env or expected volume.
