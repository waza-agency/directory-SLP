import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function CheckoutSuccessPage() {
  return (
    <>
      <Head>
        <title>Order Success | Directory SLP</title>
        <meta name="description" content="Marketplace temporalmente desactivado." />
      </Head>

      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="mb-6">
                <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Marketplace Temporalmente Desactivado
              </h1>

              <p className="text-gray-600 mb-6">
                La funcionalidad de órdenes y confirmaciones está temporalmente desactivada.
              </p>

              <div className="space-y-4">
                <Link
                  href="/places"
                  className="inline-block bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
                >
                  Explorar Lugares
                </Link>

                <br />

                <Link
                  href="/"
                  className="inline-block bg-gray-600 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-700 transition-colors ml-4"
                >
                  Ir al Inicio
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'es', ['common'])),
    },
  };
};