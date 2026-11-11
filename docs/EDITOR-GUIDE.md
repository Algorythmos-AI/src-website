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

| Section                             | What it controls                                                                           |
| ----------------------------------- | ------------------------------------------------------------------------------------------ |
| **Programs**                        | The Work page + program detail pages. `order` sets the sequence.                           |
| **News**                            | Blog posts. Assign a Category; set `Published At` (a future date stays hidden until then). |
| **Events**                          | Upcoming/past split automatically by start date. Add a registration link.                  |
| **Press releases**                  | Statements, with an optional PDF attachment.                                               |
| **Publications**                    | Reports/briefs with a cover image and a downloadable PDF; each gets its own page.          |
| **Galleries**                       | The Media page: photo galleries and public YouTube/Vimeo videos.                           |
| **Team members**                    | The About page leadership grid.                                                            |
| **Partners / Stories / Categories** | Supporting content.                                                                        |

## Globals (Settings)

- **Home / About / Impact** — homepage hero, mission, and the impact stats/map
  (single source of truth for the numbers).
- **Donate settings** — donation tiers, min/max amounts, monthly toggle.
- **Site settings, Header, Footer** — contact info, navigation, default SEO.

## Images and files

- Upload images to **Media** (auto-resized; alt text is required for accessibility).
- Upload PDFs to **Documents** and attach them to press releases or publications.

## Step by step

### Post a news update

1. **News → Create new**. Enter the English title, an excerpt (shown on the
   news list) and the body. Add a hero image from Media.
2. Pick a **Category** and set **Published At** (today, or a future date to
   schedule it).
3. Optional: switch the locale to Français / العربية and translate.
4. Set the status to **Published**. It appears on `/news` within seconds.

### Add a report or publication

1. **Documents → Create new**: upload the PDF, give it a title and choose its
   **Language**. The site shows the language and file size next to the
   download button.
2. **Publications → Create new**: title, type (Annual report / Report /
   Brief), year and a short summary. Attach the PDF from Documents and a cover
   image from Media.
3. **Publish**. It is listed on `/publications`, newest year first, and gets
   its own page at `/publications/<slug>`.

One PDF per language? Upload each as its own Document and create one
publication per language, or attach the main-language PDF and mention the
others in the summary.

### Add a photo gallery or video to the Media page

1. Upload the photos to **Media** first (alt text is required).
2. **Galleries → Create new**: title, date, optional description.
3. Under **Photos**, add a row per photo and pick it from Media.
4. Under **Videos**, add a title and a **public YouTube or Vimeo link** (e.g.
   `https://www.youtube.com/watch?v=…`). Other links are rejected.
5. **Publish**. Newest galleries are shown first on `/media`.

**Evidence videos never go in Galleries or Media.** They are handled
separately by an admin and are not listed anywhere on the site.

## Tips

- Slugs auto-generate from the English title; leave blank unless you need a
  specific URL.
- Fill the **SEO** fields (title/description/image) for better search results.
- Contact and newsletter submissions appear under **Form submissions** and
  **Newsletter subscribers** (read-only).
