import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';

export default function ShopPage() {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>Tienda | Directory SLP</title>
        <meta name="description" content="Tienda temporalmente desactivada." />
      </Head>

      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <div className="bg-primary text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Tienda
            </h1>
            <p className="text-lg max-w-2xl mx-auto">
              La tienda está temporalmente desactivada
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="mb-6">
                <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Marketplace Temporalmente Desactivado
              </h2>

              <p className="text-gray-600 mb-6">
                Estamos mejorando nuestra plataforma. La funcionalidad de compra y venta está temporalmente desactivada.
                Mientras tanto, puedes explorar nuestro directorio de lugares y eventos.
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
                  href="/events"
                  className="inline-block bg-secondary text-white px-6 py-3 rounded-md font-medium hover:bg-secondary/90 transition-colors ml-4"
                >
                  Ver Eventos
                </Link>
              </div>

              <div className="mt-8 p-4 bg-blue-50 rounded-md">
                <p className="text-blue-800 text-sm">
                  <strong>¿Eres dueño de un negocio?</strong><br />
                  Puedes seguir creando tu perfil de negocio y anunciar tus servicios.
                </p>
                <Link
                  href="/submit-listing/business"
                  className="inline-block mt-2 text-blue-600 hover:text-blue-800 font-medium"
                >
                  Crear Perfil de Negocio →
                </Link>
              </div>
            </div>
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