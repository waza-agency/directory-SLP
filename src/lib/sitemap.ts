import { createClient } from '@supabase/supabase-js';

/**
 * Mirror of src/lib/brands.ts:generateBrandSlug. Inlined here so the
 * sitemap module doesn't transitively import the pages-browser Supabase
 * client (which lives in src/lib/supabase.ts and is meant for client use).
 */
function generateBrandSlug(name: string, category: string, city?: string | null): string {
  return [name, category, city || 'san-luis-potosi']
    .join('-')
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Must match the production canonical host exactly — Google rejects
// sitemaps whose inner <loc> URLs don't match the host the sitemap was
// fetched from. The canonical host is www (Netlify redirects apex → www).
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sanluisway.com';

type ChangeFreq = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: ChangeFreq;
  priority: number;
}

const TODAY = () => new Date().toISOString().split('T')[0];

const isoDay = (value: string | null | undefined): string =>
  value ? value.split('T')[0] : TODAY();

/**
 * Static routes that don't come from Supabase. Keep this list focused on
 * pages that actually exist under src/pages and are intentionally indexed.
 * Disallowed paths from robots.txt are intentionally excluded.
 */
const STATIC_ROUTES: Array<Omit<SitemapUrl, 'lastmod'>> = [
  { loc: '/',                                        changefreq: 'weekly',  priority: 1.0 },
  { loc: '/about',                                   changefreq: 'monthly', priority: 0.8 },
  { loc: '/contact',                                 changefreq: 'monthly', priority: 0.7 },
  { loc: '/faq',                                     changefreq: 'monthly', priority: 0.6 },
  { loc: '/privacy',                                 changefreq: 'yearly',  priority: 0.3 },
  { loc: '/terms',                                   changefreq: 'yearly',  priority: 0.3 },
  { loc: '/cookies',                                 changefreq: 'yearly',  priority: 0.3 },
  { loc: '/advertise',                               changefreq: 'monthly', priority: 0.6 },
  { loc: '/services',                                changefreq: 'monthly', priority: 0.7 },
  { loc: '/community',                               changefreq: 'monthly', priority: 0.6 },
  { loc: '/places',                                  changefreq: 'daily',   priority: 0.9 },
  { loc: '/events/all',                              changefreq: 'daily',   priority: 0.9 },
  { loc: '/blog',                                    changefreq: 'daily',   priority: 0.9 },
  { loc: '/brands',                                  changefreq: 'weekly',  priority: 0.8 },
  { loc: '/restaurants',                             changefreq: 'weekly',  priority: 0.8 },
  { loc: '/cultural',                                changefreq: 'monthly', priority: 0.8 },
  { loc: '/cultural-attractions',                    changefreq: 'monthly', priority: 0.8 },
  { loc: '/cultural-tours',                          changefreq: 'monthly', priority: 0.7 },
  { loc: '/cultural/history',                        changefreq: 'monthly', priority: 0.7 },
  { loc: '/cultural/festivals',                      changefreq: 'monthly', priority: 0.7 },
  { loc: '/cultural/music-dance',                    changefreq: 'monthly', priority: 0.7 },
  { loc: '/cultural/culinary-traditions',            changefreq: 'monthly', priority: 0.7 },
  { loc: '/cultural/customs-etiquette',              changefreq: 'monthly', priority: 0.7 },
  { loc: '/cultural/religious-practices',            changefreq: 'monthly', priority: 0.7 },
  { loc: '/outdoors',                                changefreq: 'monthly', priority: 0.8 },
  { loc: '/parque-tangamanga',                       changefreq: 'monthly', priority: 0.7 },
  { loc: '/parque-tangamanga-ii',                    changefreq: 'monthly', priority: 0.7 },
  { loc: '/blog/factchecks',                         changefreq: 'weekly',  priority: 0.8 },
  { loc: '/centro-historico',                        changefreq: 'monthly', priority: 0.7 },
  { loc: '/traditional-cuisine',                     changefreq: 'monthly', priority: 0.7 },
  { loc: '/family-friendly-activities',              changefreq: 'monthly', priority: 0.7 },
  { loc: '/farmers-markets-san-luis-potosi',         changefreq: 'monthly', priority: 0.7 },
  { loc: '/free-events-san-luis-potosi',             changefreq: 'monthly', priority: 0.8 },
  { loc: '/food-festivals-san-luis-potosi',          changefreq: 'monthly', priority: 0.7 },
  { loc: '/breakfast-spots-san-luis-potosi',         changefreq: 'monthly', priority: 0.7 },
  { loc: '/weekend-getaways',                        changefreq: 'monthly', priority: 0.7 },
  { loc: '/festival-primavera-2026',                 changefreq: 'weekly',  priority: 0.7 },
  { loc: '/events/san-luis-metal-fest-2026',         changefreq: 'weekly',  priority: 0.8 },
  { loc: '/events/maraton-tangamanga-2026',          changefreq: 'weekly',  priority: 0.8 },
  { loc: '/events/fenapo-2026',                      changefreq: 'weekly',  priority: 0.8 },
  { loc: '/resources/expat-guide',                   changefreq: 'monthly', priority: 0.8 },
  { loc: '/resources/living-guide',                  changefreq: 'monthly', priority: 0.8 },
  { loc: '/resources/safety-guide',                  changefreq: 'monthly', priority: 0.8 },
  { loc: '/resources/health-guide',                  changefreq: 'monthly', priority: 0.8 },
  { loc: '/resources/family-guide',                  changefreq: 'monthly', priority: 0.8 },
  { loc: '/resources/school-guide',                  changefreq: 'monthly', priority: 0.8 },
  { loc: '/resources/arrival-checklist',             changefreq: 'monthly', priority: 0.8 },
  { loc: '/resources/neighborhoods-san-luis-potosi', changefreq: 'monthly', priority: 0.8 },
  { loc: '/guides/foodie-guide',                     changefreq: 'monthly', priority: 0.7 },
  { loc: '/guides/potosino-wine-scene',              changefreq: 'monthly', priority: 0.7 },
  { loc: '/digital-nomad-guide',                     changefreq: 'monthly', priority: 0.8 },
  { loc: '/visit-san-luis-potosi',                   changefreq: 'monthly', priority: 0.8 },
];

/**
 * Build a fresh server-side Supabase client. We don't reuse the browser
 * client from src/lib/supabase.ts because it relies on cookies/session
 * that won't exist in a serverless function context.
 */
function getServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) throw new Error('Supabase env vars missing for sitemap generation');
  return createClient(url, anon);
}

async function fetchBlogUrls(): Promise<SitemapUrl[]> {
  const supabase = getServerClient();
  const { data, error } = await supabase
    .from('blog_posts')
    .select('slug, updated_at, published_at')
    .eq('status', 'published');
  if (error || !data) return [];
  return data.map((row) => ({
    loc: `/blog/${row.slug}`,
    lastmod: isoDay(row.updated_at || row.published_at),
    changefreq: 'monthly',
    priority: 0.7,
  }));
}

async function fetchPlaceUrls(): Promise<SitemapUrl[]> {
  const supabase = getServerClient();
  const { data, error } = await supabase
    .from('places')
    .select('id, updated_at, created_at');
  if (error || !data) return [];
  return data.map((row) => ({
    loc: `/places/${row.id}`,
    lastmod: isoDay(row.updated_at || row.created_at),
    changefreq: 'monthly',
    priority: 0.6,
  }));
}

async function fetchEventUrls(): Promise<SitemapUrl[]> {
  const supabase = getServerClient();
  // Only include events that haven't ended yet — past events have no SEO value.
  const { data, error } = await supabase
    .from('events')
    .select('id, category, updated_at, end_date')
    .gte('end_date', TODAY());
  if (error || !data) return [];
  return data.map((row) => ({
    loc: `/events/${row.category}/${row.id}`,
    lastmod: isoDay(row.updated_at),
    changefreq: 'weekly',
    priority: 0.6,
  }));
}

function fetchFactcheckUrls(): SitemapUrl[] {
  // Factcheck reports are markdown files in public/factchecks/.
  // Include them so crawlers (including AI agents) see the ClaimReview-rich
  // pages that are arguably our highest-authority content.
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const fs = require('fs');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const path = require('path');
    const dir = path.join(process.cwd(), 'public', 'factchecks');
    if (!fs.existsSync(dir)) return [];
    const files = fs.readdirSync(dir).filter((f: string) => f.endsWith('.md'));
    const today = TODAY();
    return files.map((file: string) => {
      const slug = file.replace('.md', '');
      const stat = fs.statSync(path.join(dir, file));
      return {
        loc: `/blog/factchecks/${slug}`,
        lastmod: isoDay(stat.mtime.toISOString()),
        changefreq: 'monthly' as const,
        priority: 0.8,
      };
    });
  } catch {
    return [];
  }
}

async function fetchBrandUrls(): Promise<SitemapUrl[]> {
  const supabase = getServerClient();
  // The brands table has no `slug` column — slugs are derived at request
  // time from name + category + city. See src/lib/brands.ts:generateBrandSlug.
  const { data, error } = await supabase
    .from('brands')
    .select('name, category, city, updated_at, created_at');
  if (error || !data) return [];
  return data
    .map((row) => {
      const slug = generateBrandSlug(row.name, row.category, row.city ?? undefined);
      if (!slug) return null;
      return {
        loc: `/brands/${slug}`,
        lastmod: isoDay(row.updated_at || row.created_at),
        changefreq: 'monthly' as const,
        priority: 0.6,
      };
    })
    .filter((u): u is SitemapUrl => u !== null);
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function urlToXml(url: SitemapUrl): string {
  return `  <url>
    <loc>${escapeXml(`${SITE_URL}${url.loc}`)}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority.toFixed(1)}</priority>
  </url>`;
}

/**
 * Build the full sitemap XML by merging static routes with the four
 * Supabase-backed dynamic sets. Failures in any one fetcher are isolated
 * so a transient query error never blanks the whole sitemap.
 */
export async function buildSitemapXml(): Promise<string> {
  const today = TODAY();
  const staticUrls: SitemapUrl[] = STATIC_ROUTES.map((r) => ({ ...r, lastmod: today }));

  const [blog, places, events, brands] = await Promise.all([
    fetchBlogUrls().catch(() => []),
    fetchPlaceUrls().catch(() => []),
    fetchEventUrls().catch(() => []),
    fetchBrandUrls().catch(() => []),
  ]);

  const factchecks = fetchFactcheckUrls();

  const all = [...staticUrls, ...blog, ...places, ...events, ...brands, ...factchecks];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all.map(urlToXml).join('\n')}
</urlset>`;
}
