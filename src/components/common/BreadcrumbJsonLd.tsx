import Head from 'next/head';
import { useRouter } from 'next/router';

// Auto-generates a BreadcrumbList JSON-LD entry from the current URL path.
// No UI — only injects schema.org structured data into <head>. Mounted
// globally in _app.tsx so every non-home page ships breadcrumbs to Google
// without requiring per-page wiring.
//
// Skips:
//   - the homepage (no useful breadcrumb trail)
//   - dynamic [id]/[slug] segments where the human label would be a UUID
//     (those pages should mount the full <Breadcrumbs> component themselves
//     with explicit labels — see /places/[id] and /blog/[slug])
const SITE_URL = 'https://www.sanluisway.com';

const formatLabel = (segment: string): string =>
  segment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

const looksLikeId = (segment: string): boolean =>
  /^[0-9a-f]{8}-[0-9a-f]{4}/i.test(segment) || /^\d+$/.test(segment);

export default function BreadcrumbJsonLd() {
  const router = useRouter();
  const cleanPath = router.asPath.split('?')[0].split('#')[0];
  const segments = cleanPath.split('/').filter(Boolean);

  if (segments.length === 0) return null;
  if (segments.some(looksLikeId)) return null;

  const itemListElement = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: SITE_URL,
    },
    ...segments.map((segment, index) => ({
      '@type': 'ListItem',
      position: index + 2,
      name: formatLabel(segment),
      item: `${SITE_URL}/${segments.slice(0, index + 1).join('/')}`,
    })),
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </Head>
  );
}
