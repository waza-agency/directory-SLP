import Head from 'next/head';
import { useRouter } from 'next/router';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    tags?: string[];
  };
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  ogImage = '/og-image.jpg', // Default OG image
  ogType = 'website',
  article,
}) => {
  const router = useRouter();
  const canonicalUrl = `https://www.sanluisway.com${router.asPath}`;
  const siteName = "San Luis Way";

  // Make title specific but also include site name
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />

      {/* Favicon Tags */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <meta name="theme-color" content="#ffffff" />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Article Specific Meta Tags */}
      {ogType === 'article' && article && (
        <>
          {article.publishedTime && <meta property="article:published_time" content={article.publishedTime} />}
          {article.modifiedTime && <meta property="article:modified_time" content={article.modifiedTime} />}
          {article.tags && article.tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Additional SEO tags for better indexing */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
    </Head>
  );
};

export default SEO;