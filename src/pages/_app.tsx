import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
// import { CartProvider } from '@/lib/cart-context'; // MARKETPLACE DISABLED
import React from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { Inter, Crimson_Pro } from 'next/font/google';

// Self-hosted Google Fonts via next/font. Fonts are downloaded at build time
// and served from /_next/static/media, eliminating the render-blocking
// stylesheet from fonts.googleapis.com and the extra round-trip to
// fonts.gstatic.com. adjustFontFallback (default: true) computes a metrics-
// matching fallback so there is no CLS when the real font swaps in.
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-crimson-pro',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { AuthProvider } from '@/lib/supabase-auth';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import BreadcrumbJsonLd from '@/components/common/BreadcrumbJsonLd';
import { appWithTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';

const PageAgentWidget = dynamic(() => import('@/components/PageAgentWidget'), {
  ssr: false,
});

// Create a single instance of the Supabase client
const supabaseClient = createPagesBrowserClient();

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* Global meta tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1F2937" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />

        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Microsoft Tiles */}
        <meta name="msapplication-TileColor" content="#1F2937" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="es_MX" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />

        {/*
          Global structured data (Organization + WebSite) lives on the
          homepage SEO component (src/pages/index.tsx) as a typed @graph
          with proper @id references. Previously there were duplicate
          WebSite + Organization blocks here with the www host and
          unverified Facebook/Instagram/Twitter sameAs links, which
          conflicted with the homepage graph. Removed 2026-04-07.
        */}
      </Head>

      {/* Auto-generated BreadcrumbList JSON-LD for every non-home page */}
      <BreadcrumbJsonLd />

      {/*
        Third-party scripts. All loaded via next/script with deferred strategies
        so they do NOT block initial render / LCP. Previously these lived in
        _document.tsx and executed during HTML parse, pushing mobile LCP to 18.2s.
      */}

      {/* Google Tag Manager */}
      <Script id="gtm" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-T4LHTQ9C');`}
      </Script>

      {/* Google Analytics 4 (property-level) */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-5R48THR70E"
        strategy="afterInteractive"
      />
      <Script id="ga4" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-5R48THR70E');
        `}
      </Script>

      {/* Google Ads (conversion tracking) */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-17635572319"
        strategy="afterInteractive"
      />
      <Script id="google-ads" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-17635572319');
        `}
      </Script>

      {/* AdSense — lazyOnload so ads never block LCP */}
      <Script
        id="adsense"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7339948154887436"
        strategy="lazyOnload"
        crossOrigin="anonymous"
      />

      <ErrorBoundary>
        <SessionContextProvider
          supabaseClient={supabaseClient}
          initialSession={pageProps.initialSession}
        >
          <AuthProvider>
            {/* MARKETPLACE DISABLED - Removed CartProvider */}
            <div className={`min-h-screen flex flex-col ${inter.variable} ${crimsonPro.variable}`}>
              <Header />
              <main className="flex-grow">
                <ErrorBoundary>
                  <Component {...pageProps} />
                </ErrorBoundary>
              </main>
              <Footer />
            </div>

            <PageAgentWidget />

            <ToastContainer
              position="top-right"
              autoClose={4000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </AuthProvider>
        </SessionContextProvider>
      </ErrorBoundary>
    </>
  );
}

export default appWithTranslation(App);