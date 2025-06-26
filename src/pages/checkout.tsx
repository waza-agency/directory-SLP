import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function CheckoutPage() {
  return (
    <>
      <Head>
        <title>Checkout | Directory SLP</title>
        <meta name="description" content="Checkout temporalmente desactivado." />
      </Head>

      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="mb-6">
                <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 5M7 13l-1.5-5M7 13v5a2 2 0 002 2h4" />
                </svg>
              </div>

              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Checkout Temporalmente Desactivado
              </h1>

              <p className="text-gray-600 mb-6">
                La funcionalidad de compra está temporalmente desactivada mientras mejoramos nuestra plataforma.
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