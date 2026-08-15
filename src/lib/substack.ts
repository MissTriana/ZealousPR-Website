import { XMLParser } from 'fast-xml-parser';

export interface SubstackPost {
  title: string;
  slug: string;
  substackUrl: string;
  pubDate: Date;
  excerpt: string;
  contentHtml: string;
  author: string;
}

const FEED_URL = 'https://thegeonerd.substack.com/feed';

/** Pull the /p/{slug} part out of a Substack post URL. */
function slugFromLink(link: string): string {
  const match = link.match(/\/p\/([^/?#]+)/);
  return match ? match[1] : link.replace(/[^a-z0-9]+/gi, '-').toLowerCase();
}

function stripHtml(html: string, maxLen = 220): string {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return text.length > maxLen ? `${text.slice(0, maxLen).trim()}…` : text;
}

let cache: SubstackPost[] | null = null;

/**
 * Fetches and parses the Substack RSS feed at build time.
 * Returns an empty array (rather than throwing) if the feed is
 * unreachable or empty, so a Substack hiccup never breaks the whole
 * site build — the blog page just shows "no posts yet".
 */
export async function getSubstackPosts(): Promise<SubstackPost[]> {
  if (cache) return cache;

  try {
    const res = await fetch(FEED_URL, {
      headers: {
        // Substack (and the CDN in front of it) can 403 requests that
        // don't look like they're coming from a browser or a known feed
        // reader — this header avoids that.
        'User-Agent':
          'Mozilla/5.0 (compatible; ZealousSiteBuild/1.0; +https://www.zealouspr.com)',
        Accept: 'application/rss+xml, application/xml, text/xml',
      },
    });
    if (!res.ok) {
      console.warn(`[substack] Feed returned ${res.status} — showing no posts.`);
      cache = [];
      return cache;
    }
    const xml = await res.text();
    const parser = new XMLParser({ ignoreAttributes: false, cdataPropName: '__cdata' });
    const data = parser.parse(xml);

    const rawItems = data?.rss?.channel?.item;
    const items = Array.isArray(rawItems) ? rawItems : rawItems ? [rawItems] : [];

    cache = items.map((item: any): SubstackPost => {
      const title: string = typeof item.title === 'object' ? item.title.__cdata : item.title ?? 'Untitled';
      const link: string = item.link ?? '';
      const contentHtml: string =
        (typeof item['content:encoded'] === 'object' ? item['content:encoded'].__cdata : item['content:encoded']) ??
        (typeof item.description === 'object' ? item.description.__cdata : item.description) ??
        '';
      const description: string =
        (typeof item.description === 'object' ? item.description.__cdata : item.description) ?? contentHtml;

      return {
        title,
        slug: slugFromLink(link),
        substackUrl: link,
        pubDate: item.pubDate ? new Date(item.pubDate) : new Date(),
        excerpt: stripHtml(description),
        contentHtml,
        author: item['dc:creator'] ?? 'Yasmine Triana',
      };
    });

    return cache;
  } catch (err) {
    console.warn('[substack] Could not fetch feed — showing no posts.', err);
    cache = [];
    return cache;
  }
}
