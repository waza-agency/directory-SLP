import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import nextI18NextConfig from '../../next-i18next.config.js';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
// import { CartProvider } from '@/lib/cart-context'; // MARKETPLACE DISABLED
import React from 'react';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { AuthProvider } from '@/lib/supabase-auth';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import ErrorBoundary from '@/components/common/ErrorBoundary';

// Create a single instance of the Supabase client
const supabaseClient = createPagesBrowserClient();

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* Global meta tags */}
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

        {/* Global Site Verification - Add your verification codes here */}
        {/* Google Analytics - Add your GA4 tracking code here */}
        {/* Add other verification meta tags as needed */}

        {/* Structured Data - JSON-LD for local business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Directory SLP",
              "url": "https://directory-slp.com",
              "description": "Directorio completo de San Luis Potosí - lugares, eventos, y guías locales",
              "inLanguage": ["es-MX", "en-US"],
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://directory-slp.com/search?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </Head>

      <ErrorBoundary>
        <SessionContextProvider
          supabaseClient={supabaseClient}
          initialSession={pageProps.initialSession}
        >
          <AuthProvider>
            {/* MARKETPLACE DISABLED - Removed CartProvider */}
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow">
                <ErrorBoundary>
                  <Component {...pageProps} />
                </ErrorBoundary>
              </main>
              <Footer />
            </div>

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

export default appWithTranslation(App, nextI18NextConfig);