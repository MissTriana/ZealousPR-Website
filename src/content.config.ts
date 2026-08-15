import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// The Substack-driven newsletter ("The GEO Nerd") is pulled in at build
// time — see src/lib/substack.ts — and needs no local content collection.

// Company News & Insights — written and published directly on the site
// via the CMS, kept separate from the Substack-sourced newsletter.
const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string().default('Zealous'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

// Specialisms — one page per sector Zealous works in. Markdown body for
// the full page content, plus a short summary shown on the index page.
const specialisms = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/specialisms' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    seo_description: z.string(),
    order: z.number().default(0),
    draft: z.boolean().default(false),
  }),
});

// Editable page copy — one YAML file per page, managed through the CMS.
// Left unvalidated (no schema) since fields differ per page and the CMS
// dashboard already constrains what editors can enter.
const pages = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/pages' }),
});

export const collections = { news, pages, specialisms };
