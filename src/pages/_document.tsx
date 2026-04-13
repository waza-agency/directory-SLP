import { Html, Head, Main, NextScript, DocumentProps } from 'next/document';
import i18nextConfig from '../../next-i18next.config';

export default function Document(props: DocumentProps) {
  const currentLocale = props.__NEXT_DATA__.locale ?? i18nextConfig.i18n.defaultLocale;
  return (
    <Html lang={currentLocale}>
      <Head>
        <meta charSet="utf-8" />
        {/* CSP is set via HTTP header in next.config.js — do NOT add a meta tag CSP here.
            Having two CSPs causes the browser to enforce the intersection (most restrictive),
            which was blocking AdSense and Google Ads scripts. */}

        {/* Verification meta tags (cheap, no scripts) */}
        <meta name="google-site-verification" content="s4k5V8dAkvDb3Dv15SNozffS7noII7qQAsUXJfnALOU" />
        <meta name="google-adsense-account" content="ca-pub-7339948154887436" />
        <meta name="facebook-domain-verification" content="eduke3sgsk7rzqsqwyc9xrk4fu13k2" />

        {/*
          Per-page hreflang alternates are now emitted globally from
          src/components/common/HreflangAlternates.tsx (mounted in _app.tsx)
          so every page advertises the right /es, /de, /ja sibling for its
          own path — not just the homepage roots. All four locales serve
          real translated content via next-i18next.
        */}

        {/* DNS prefetch + preconnect for third-party origins that load later via next/script */}
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://googleads.g.doubleclick.net" />
        <link rel="dns-prefetch" href="https://securepubads.g.doubleclick.net" />
        <link rel="dns-prefetch" href="https://www.googletagservices.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://googleads.g.doubleclick.net" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        {/* Fonts are self-hosted via next/font/google in _app.tsx — no external stylesheet or preconnect needed */}

        {/* Preload LCP hero image for faster discovery — matches HeroSection priority image */}
        <link
          rel="preload"
          as="image"
          type="image/avif"
          imageSrcSet="/_next/image?url=%2Fimages%2Fhero-bg.jpg&w=640&q=75 640w, /_next/image?url=%2Fimages%2Fhero-bg.jpg&w=750&q=75 750w, /_next/image?url=%2Fimages%2Fhero-bg.jpg&w=828&q=75 828w, /_next/image?url=%2Fimages%2Fhero-bg.jpg&w=1080&q=75 1080w, /_next/image?url=%2Fimages%2Fhero-bg.jpg&w=1200&q=75 1200w, /_next/image?url=%2Fimages%2Fhero-bg.jpg&w=1920&q=75 1920w, /_next/image?url=%2Fimages%2Fhero-bg.jpg&w=2048&q=75 2048w, /_next/image?url=%2Fimages%2Fhero-bg.jpg&w=3840&q=75 3840w"
          imageSizes="100vw"
          fetchPriority="high"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      </Head>
      <body className="font-sans antialiased text-gray-800 bg-white">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-T4LHTQ9C"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}