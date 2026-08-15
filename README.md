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

Every page's text — homepage, services, about, contact, and the results page — is editable through `/admin/`. Log in, pick "Page Text," choose the page, and edit any field. Publishing commits the change straight to GitHub and Netlify redeploys automatically — no code, no re-uploading.

Layout, colours, and structural changes (new sections, design tweaks) still require editing the actual page files in `src/pages/`.

## The newsletter ("The GEO Nerd")

Newsletter content is written entirely on **Substack** (`thegeonerd.substack.com`), not on this site's dashboard. The site automatically pulls in your latest Substack posts at `/newsletter/` every time it rebuilds, using Substack's public RSS feed (`src/lib/substack.ts`).

- **To publish a new issue:** just write and publish it on Substack, as normal.
- **It won't appear on the site instantly** — only after the next rebuild. Every edit you make elsewhere on the site (e.g. through `/admin/`) triggers a rebuild, so posts will typically show up within a day. To make a Substack post appear immediately, go to Netlify → your site → **Deploys** → **Trigger deploy** → **Deploy site**.
- **Optional — full automation:** a free service like cron-job.org can be set to ping a Netlify "build hook" URL a few times a day, so new Substack posts appear without you doing anything. Ask if you'd like this set up.
- **Why posts link back to Substack:** each mirrored post includes a technical tag (a "canonical link") pointing back to the original Substack post. This is standard practice for syndicated content — it tells Google "the original lives on Substack," avoiding duplicate-content issues, while still keeping the full content crawlable on your own domain for GEO purposes.

## Company News & Insights

A separate section, at `/news/`, for announcements and company updates you write directly — not connected to Substack. Fully editable through `/admin/` under "News & Insights," exactly like the old blog worked: write, publish, done.

## Before going live

- Swap the founder initials placeholder ("YT") on the About page for a real photo
- Fill in the three case-study slots on `/case-studies/` as results come in
- Update `site_url` in `public/admin/config.yml` and `astro.config.mjs` if your final domain differs from `zealouspr.com`
