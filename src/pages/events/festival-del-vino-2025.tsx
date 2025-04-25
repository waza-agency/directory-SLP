import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { CalendarIcon, MapPinIcon, TicketIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'es', ['common'])),
    },
  };
};

export default function FestivalDelVino() {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>Festival Internacional del Vino de San Luis Potosí 2025 | SLP Descubre</title>
        <meta 
          name="description" 
          content="Festival Internacional del Vino 2025 en San Luis Potosí - Descubre más de 500 vinos de todo el mundo, bodegas nacionales e internacionales, experiencias gastronómicas y mucho más." 
        />
      </Head>

      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-red-800/90">
          <Image
            src="/images/events/festival-del-vino.jpg"
            alt="Festival Internacional del Vino"
            fill
            className="mix-blend-overlay object-cover opacity-60"
            priority
          />
        </div>
        <div className="relative container mx-auto px-4 py-24 text-white">
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-1.5 bg-white/20 rounded-full backdrop-blur-sm mb-6">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                <span className="font-medium">6 & 7 de Junio, 2025</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-serif">
              Festival Internacional del Vino de San Luis Potosí
            </h1>
            <p className="text-xl mb-8 max-w-2xl">
              Una experiencia única para los amantes del vino, gastronomía y cultura en el corazón de San Luis Potosí.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://festivaldelvino.mx/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-white/90 text-red-900 font-bold px-6 py-3 rounded-full inline-flex items-center gap-2 transition-colors"
              >
                Sitio Oficial
                <ArrowTopRightOnSquareIcon className="w-5 h-5" />
              </a>
              <a
                href="https://festivaldelvino.mx/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-700 hover:bg-red-800 text-white font-bold px-6 py-3 rounded-full inline-flex items-center gap-2 transition-colors"
              >
                Comprar Boletos
                <TicketIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-6 font-serif">Sobre el Festival</h2>
              <div className="prose prose-lg max-w-none mb-8">
                <p>
                  El Festival Internacional del Vino de San Luis Potosí es uno de los eventos enológicos más importantes 
                  de México. Durante dos días, el Centro de las Artes se transforma en un punto de encuentro para 
                  amantes del vino, sommeliers, productores y entusiastas de la gastronomía.
                </p>
                <p>
                  Con más de 500 vinos de todo el mundo, bodegas nacionales e internacionales, catas premium, 
                  experiencias gastronómicas y eventos culturales, el festival ofrece una experiencia completa 
                  para todos los asistentes.
                </p>

                <h3>Lo que encontrarás en el festival:</h3>
                <ul>
                  <li>Más de 500 vinos de todo el mundo</li>
                  <li>Bodegas nacionales e internacionales</li>
                  <li>Cerveza artesanal</li>
                  <li>Mezcales</li>
                  <li>Experiencias gastronómicas</li>
                  <li>Catas premium</li>
                  <li>Productos gourmet</li>
                  <li>Enólogos e invitados internacionales</li>
                  <li>Obras de arte</li>
                  <li>Música en vivo</li>
                </ul>
              </div>

              <div className="bg-red-50 border border-red-100 rounded-xl p-6 mb-8">
                <h3 className="text-xl font-bold mb-3 text-red-900">Zonas del Festival</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium text-red-800">Zona Wine Tasting</h4>
                    <p className="text-gray-600 text-sm">By Aeroméxico</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium text-red-800">Zona Beer Fest</h4>
                    <p className="text-gray-600 text-sm">By Heineken</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium text-red-800">Zona Gastronómica</h4>
                    <p className="text-gray-600 text-sm">By Fiesta Americana</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium text-red-800">Zona Catas y Maridaje</h4>
                    <p className="text-gray-600 text-sm">By Toneles</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium text-red-800">Zona Argentina</h4>
                    <p className="text-gray-600 text-sm">Especialidades argentinas</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium text-red-800">Circo del Vino</h4>
                    <p className="text-gray-600 text-sm">Entretenimiento temático</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-4">Información del Evento</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <CalendarIcon className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Fecha</p>
                      <p className="text-gray-600">6 y 7 de Junio, 2025</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <MapPinIcon className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Ubicación</p>
                      <p className="text-gray-600">Centro de las Artes</p>
                      <p className="text-gray-600">San Luis Potosí, México</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <TicketIcon className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Boletos</p>
                      <div className="space-y-2 mt-2">
                        <div className="bg-white p-3 rounded border border-gray-200">
                          <p className="font-medium">Silver Access</p>
                          <p className="text-gray-600 text-sm">$899 MXN por persona</p>
                          <p className="text-xs text-green-600">Promoción especial hasta el 15 de mayo</p>
                        </div>
                        <div className="bg-white p-3 rounded border border-gray-200">
                          <p className="font-medium">VIP Access</p>
                          <p className="text-gray-600 text-sm">Consultar precios</p>
                        </div>
                        <div className="bg-white p-3 rounded border border-gray-200">
                          <p className="font-medium">Catas Premium</p>
                          <p className="text-gray-600 text-sm">Con costo adicional</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <a
                    href="https://festivaldelvino.mx/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-red-800 hover:bg-red-900 text-white font-medium px-4 py-3 rounded-lg text-center transition-colors"
                  >
                    Visitar Sitio Oficial
                  </a>
                  <a
                    href="https://festivaldelvino.mx/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-4 py-3 rounded-lg text-center transition-colors"
                  >
                    Ver Programa Completo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Travel Information */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 font-serif">Información de Viaje</h2>
            <p className="text-lg text-gray-600">
              Planifica tu visita a San Luis Potosí para disfrutar del Festival Internacional del Vino.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <Image 
                src="/images/brands/aeromexico-logo.png" 
                alt="Aeroméxico" 
                width={120} 
                height={40} 
                className="object-contain" 
              />
              <div>
                <h3 className="font-medium">Descuento Especial en Vuelos</h3>
                <p className="text-gray-600 text-sm">Código de descuento: IT5MXRC01626C</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              AEROMÉXICO tiene para ti un descuento especial. Viaja desde cualquier parte de la república y/o EUA, 
              solo comunícate al call center para cotizar tu vuelo.
            </p>
            <div className="bg-gray-50 p-3 rounded text-sm text-gray-700">
              <p>Teléfono: 55 5133 4000</p>
              <p>Menciona el código de descuento al hacer tu reservación.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-red-800 to-purple-900 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 font-serif">¡No te quedes fuera!</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            El Festival Internacional del Vino es una experiencia única que no te puedes perder. 
            Asegura tu lugar y disfruta de una experiencia enológica inolvidable.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://festivaldelvino.mx/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-white/90 text-red-900 font-bold px-8 py-4 rounded-full inline-flex items-center gap-2 transition-colors"
            >
              Comprar Boletos
              <TicketIcon className="w-5 h-5" />
            </a>
            <Link
              href="/events"
              className="bg-transparent hover:bg-white/10 border-2 border-white text-white font-bold px-8 py-4 rounded-full inline-flex items-center gap-2 transition-colors"
            >
              Ver Otros Eventos
            </Link>
          </div>
        </div>
      </section>
    </>
  );
} 