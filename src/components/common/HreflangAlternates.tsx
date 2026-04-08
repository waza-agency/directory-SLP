import Head from 'next/head';
import { useRouter } from 'next/router';

const LOCALES = ['en', 'es', 'de', 'ja'] as const;
const DEFAULT_LOCALE = 'en';

/**
 * Emits per-page hreflang alternates AND the self-referential canonical
 * link for every locale (en/es/de/ja) plus x-default. Mounted once in
 * _app.tsx so EVERY page automatically advertises its localized siblings
 * and canonical URL to Google, regardless of whether the page imports
 * the SEO component.
 *
 * URL shape:
 *   - en (default) → https://www.sanluisway.com{path}
 *   - es/de/ja     → https://www.sanluisway.com/{locale}{path}
 *
 * Canonical emission here is the single source of truth — the SEO
 * component no longer emits its own canonical to avoid duplication.
 */
export default function HreflangAlternates() {
  const router = useRouter();
  // Strip query string and hash — hreflang URLs should be the canonical path only.
  const path = router.asPath.split('?')[0].split('#')[0];
  const cleanPath = path === '/' ? '' : path.replace(/\/$/, '');
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sanluisway.com';
  const currentLocale = router.locale || DEFAULT_LOCALE;

  const urlForLocale = (locale: string) => {
    if (locale === DEFAULT_LOCALE) return cleanPath ? `${siteUrl}${cleanPath}` : siteUrl;
    return cleanPath ? `${siteUrl}/${locale}${cleanPath}` : `${siteUrl}/${locale}`;
  };

  const canonicalUrl = urlForLocale(currentLocale);

  return (
    <Head>
      <link rel="canonical" href={canonicalUrl} />
      {LOCALES.map((locale) => (
        <link
          key={`hreflang-${locale}`}
          rel="alternate"
          hrefLang={locale}
          href={urlForLocale(locale)}
        />
      ))}
      <link
        key="hreflang-x-default"
        rel="alternate"
        hrefLang="x-default"
        href={urlForLocale(DEFAULT_LOCALE)}
      />
    </Head>
  );
}
