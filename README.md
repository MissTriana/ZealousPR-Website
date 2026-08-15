# Zealous — website

A static site built with Astro, designed for speed and clean, semantic HTML (the two things that matter most for GEO — Generative Engine Optimisation — as well as traditional SEO). Blog posts are managed through **Decap CMS**, a free visual dashboard.

## What's inside

- `src/pages/` — one folder per page: home, services, about, case-studies, contact, blog
- `src/content/blog/` — your blog posts, as Markdown files (edit these directly, or use the CMS dashboard)
- `src/components/`, `src/layouts/` — shared header, footer, SEO/structured-data, and page shell
- `public/admin/` — the Decap CMS dashboard configuration
- `public/robots.txt`, `public/llms.txt`, auto-generated `sitemap-index.xml` — machine-readable signals for search engines and AI crawlers

## Running it locally

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs static site to /dist
npm run preview   # preview the built site
```

## Deploying (free, ~15 minutes)

1. **Push this folder to a GitHub repository** (create a new repo on GitHub, then follow its instructions to push this code).
2. **Create a free Netlify account** at netlify.com and click "Add new site -> Import an existing project," then connect your GitHub repo. Netlify will detect the build settings from `netlify.toml` automatically.
3. **Point your domain** — in Netlify, go to Domain settings and add `zealouspr.com` (or whichever domain you register), following Netlify's instructions to update your DNS.
4. **Turn on the content editor:**
   - In Netlify, go to **Site configuration -> Identity** and click **Enable Identity**.
   - Under Identity -> **Registration**, set it to **Invite only**.
   - Under Identity -> **Services**, enable **Git Gateway**.
   - Go to the **Identity** tab and **invite yourself** by email — you'll get a link to set a password.
5. **Editing content:** once deployed, go to `https://yourdomain.com/admin/`, log in with the account you just invited, and you'll see a dashboard to write and publish blog posts — no code required. New/edited posts are committed straight to GitHub and redeploy automatically.

## Updating page copy (services, about, etc.)

Blog posts are editable through `/admin/`. The core pages (home, services, about, contact) currently live in the page files themselves (`src/pages/.../index.astro`) for full design control — come back here (or to any developer) for copy changes to those, or ask to have them moved into the CMS too if you'd like full self-service control over every page.

## Before going live

- Swap the founder initials placeholder ("YT") on the About page for a real photo
- Fill in the three case-study slots on `/case-studies/` as results come in
- Update `site_url` in `public/admin/config.yml` and `astro.config.mjs` if your final domain differs from `zealouspr.com`
