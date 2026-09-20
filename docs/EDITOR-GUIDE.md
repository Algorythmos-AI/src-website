# SRC — Editor Guide

The website content is managed in the Payload admin at **`/admin`**.

## Logging in

Sign in with the email and password created for you. Roles:

- **Admin** — full access, manages users and settings.
- **Editor** — creates and edits content.

## Languages

Every content field with a language switcher is localized (English / French /
Arabic). **English is required**; French and Arabic are optional and fall back to
English on the site until translated. Switch locale using the selector at the top
of the edit view.

## Drafts, preview, and publishing

- Content saves as a **draft** first (autosaved).
- Set the status to **Published** to make it live.
- Publishing (or unpublishing) updates the website within a few seconds — no
  developer or redeploy needed.

## Content types

| Section | What it controls |
| --- | --- |
| **Programs** | The Work page + program detail pages. `order` sets the sequence. |
| **News** | Blog posts. Assign a Category; set `Published At` (a future date stays hidden until then). |
| **Events** | Upcoming/past split automatically by start date. Add a registration link. |
| **Press releases** | Statements, with an optional PDF attachment. |
| **Publications** | Reports/briefs with a cover image and a downloadable PDF. |
| **Team members** | The About page leadership grid. |
| **Partners / Stories / Categories** | Supporting content. |

## Globals (Settings)

- **Home / About / Impact** — homepage hero, mission, and the impact stats/map
  (single source of truth for the numbers).
- **Donate settings** — donation tiers, min/max amounts, monthly toggle.
- **Site settings, Header, Footer** — contact info, navigation, default SEO.

## Images and files

- Upload images to **Media** (auto-resized; alt text is required for accessibility).
- Upload PDFs to **Documents** and attach them to press releases or publications.

## Tips

- Slugs auto-generate from the English title; leave blank unless you need a
  specific URL.
- Fill the **SEO** fields (title/description/image) for better search results.
- Contact and newsletter submissions appear under **Form submissions** and
  **Newsletter subscribers** (read-only).
