import { Html, Head, Main, NextScript, DocumentProps } from 'next/document';
import i18nextConfig from '../../next-i18next.config';

export default function Document(props: DocumentProps) {
  const currentLocale = props.__NEXT_DATA__.locale ?? i18nextConfig.i18n.defaultLocale;
  return (
    <Html lang={currentLocale}>
      <Head>
        <meta charSet="utf-8" />
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/ https://www.youtube.com https://www.youtube-nocookie.com https://s.ytimg.com https://pagead2.googlesyndication.com https://partner.googleadservices.com https://tpc.googlesyndication.com https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google https://www.google-analytics.com https://googleads.g.doubleclick.net https://securepubads.g.doubleclick.net https://www.googletagservices.com https://www.googletagmanager.com https://fundingchoicesmessages.google.com 'unsafe-inline' 'unsafe-eval'; style-src 'self' https://fonts.googleapis.com 'unsafe-inline'; img-src 'self' https: data: blob:; font-src 'self' https://fonts.gstatic.com data:; connect-src 'self' https://*.supabase.co https://www.google-analytics.com https://www.google.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://pagead2.googlesyndication.com https://fundingchoicesmessages.google.com https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google https://region1.google-analytics.com https://analytics.google.com; frame-src https://www.youtube.com https://www.youtube-nocookie.com https://www.google.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://fundingchoicesmessages.google.com;"
        />

        {/* Verification meta tags (cheap, no scripts) */}
        <meta name="google-site-verification" content="s4k5V8dAkvDb3Dv15SNozffS7noII7qQAsUXJfnALOU" />
        <meta name="google-adsense-account" content="ca-pub-7339948154887436" />
        <meta name="facebook-domain-verification" content="eduke3sgsk7rzqsqwyc9xrk4fu13k2" />

        {/*
          Hreflang tags. Site-wide root entries only — per-page alternates
          should ideally be emitted by the SEO component using router.asPath,
          but until then the root-level set is at minimum correct.

          All four locales serve real translated content via next-i18next:
          - /en  -> English  (default, full translation)
          - /es  -> Spanish  (full translation)
          - /de  -> German   (full translation, verified 2026-04-07)
          - /ja  -> Japanese (full translation, verified 2026-04-07)
        */}
        <link rel="alternate" hrefLang="en" href="https://sanluisway.com" />
        <link rel="alternate" hrefLang="es" href="https://sanluisway.com/es" />
        <link rel="alternate" hrefLang="de" href="https://sanluisway.com/de" />
        <link rel="alternate" hrefLang="ja" href="https://sanluisway.com/ja" />
        <link rel="alternate" hrefLang="x-default" href="https://sanluisway.com" />

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