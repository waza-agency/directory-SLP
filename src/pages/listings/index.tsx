import React from 'react';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function ListingsPage() {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>Business Listings | San Luis Way</title>
        <meta name="description" content="Browse and discover businesses in San Luis Potosí" />
      </Head>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Business Listings
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Discover local businesses in San Luis Potosí
            </p>
            <p className="text-gray-500">
              Business listings from subscribed businesses will be displayed here.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}