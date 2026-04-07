import Head from 'next/head';
import { useRouter } from 'next/router';

const LOCALES = ['en', 'es', 'de', 'ja'] as const;
const DEFAULT_LOCALE = 'en';

/**
 * Emits per-page hreflang alternates for every locale (en/es/de/ja) plus
 * x-default. Mounted once in _app.tsx so EVERY page automatically advertises
 * its localized siblings to Google, regardless of whether the page imports
 * the SEO component.
 *
 * URL shape:
 *   - en (default) → https://sanluisway.com{path}
 *   - es/de/ja     → https://sanluisway.com/{locale}{path}
 */
export default function HreflangAlternates() {
  const router = useRouter();
  // Strip query string and hash — hreflang URLs should be the canonical path only.
  const path = router.asPath.split('?')[0].split('#')[0];
  const cleanPath = path === '/' ? '' : path.replace(/\/$/, '');
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sanluisway.com';

  const urlForLocale = (locale: string) => {
    if (locale === DEFAULT_LOCALE) return cleanPath ? `${siteUrl}${cleanPath}` : siteUrl;
    return cleanPath ? `${siteUrl}/${locale}${cleanPath}` : `${siteUrl}/${locale}`;
  };

  return (
    <Head>
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
