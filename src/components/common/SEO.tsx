import Head from 'next/head';
import { useRouter } from 'next/router';

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noIndex?: boolean;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    tags?: string[];
  };
  structuredData?: Record<string, unknown>;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  ogImage = '/og-image.jpg',
  ogType = 'website',
  noIndex = false,
  article,
  structuredData,
}) => {
  const router = useRouter();
  const path = router.asPath.split('?')[0];
  const cleanPath = path === '/' ? path : path.replace(/\/$/, '');
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sanluisway.com';
  const canonicalUrl = `${siteUrl}${cleanPath}`;
  const siteName = "San Luis Way";
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  const absoluteOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;

  return (
    <Head>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1"} />
      {!noIndex && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={absoluteOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={router.locale === 'es' ? 'es_MX' : router.locale === 'de' ? 'de_DE' : router.locale === 'ja' ? 'ja_JP' : 'en_US'} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={absoluteOgImage} />

      {/* Article Meta */}
      {ogType === 'article' && article && (
        <>
          {article.publishedTime && <meta property="article:published_time" content={article.publishedTime} />}
          {article.modifiedTime && <meta property="article:modified_time" content={article.modifiedTime} />}
          {article.tags && article.tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}

      <meta name="author" content="San Luis Way" />

      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      )}
    </Head>
  );
};

export default SEO;