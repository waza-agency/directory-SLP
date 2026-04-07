import type { GetServerSideProps } from 'next';
import { buildSitemapXml } from '@/lib/sitemap';

/**
 * Serves /sitemap.xml on demand. The XML is generated from a static route
 * config + live Supabase queries (blog_posts, places, events, brands), so
 * new content is automatically indexed without manual sitemap edits.
 *
 * Cached at the edge for 1 hour, with a 1-day stale-while-revalidate window
 * so a single cold request never blocks crawlers.
 */
export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const xml = await buildSitemapXml();

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader(
    'Cache-Control',
    'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
  );
  res.write(xml);
  res.end();

  return { props: {} };
};

export default function Sitemap() {
  // getServerSideProps streams the XML directly — this component never renders.
  return null;
}
