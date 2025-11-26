import Link from 'next/link';
import Image from 'next/image';
import SEO from '@/components/common/SEO';
import {
  MegaphoneIcon,
  ChartBarIcon,
  UserGroupIcon,
  GlobeAltIcon,
  SparklesIcon,
  BuildingOfficeIcon,
  NewspaperIcon,
  PhotoIcon,
  PresentationChartBarIcon,
  CameraIcon,
  DocumentTextIcon,
  TrophyIcon,
  StarIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

export default function Advertise() {
  return (
    <>
      <SEO
        title="Publicita con San Luis Way - Conecta con tu Audiencia en San Luis Potosí"
        description="Haz crecer tu marca en San Luis Potosí con nuestras opciones de publicidad: banners, contenido patrocinado, reportajes y menciones especiales. Conecta con locales y expatriados."
        keywords="publicidad, marketing, San Luis Potosí, banners, contenido patrocinado, blog posts, reportajes, marcas locales"
        ogType="website"
      />

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-primary to-primary-dark text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              <MegaphoneIcon className="w-20 h-20 mx-auto mb-6 text-white/90" />
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Haz Crecer Tu Marca en <span className="text-yellow-300">San Luis Potosí</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
                Conecta con nuestra audiencia comprometida de locales, expatriados y visitantes a través de nuestras opciones de publicidad premium
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/contact?subject=Consulta%20de%20Publicidad"
                  className="inline-flex items-center bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-300 transition-all transform hover:scale-105 shadow-lg"
                >
                  Comienza Hoy
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  href="#opciones"
                  className="inline-flex items-center border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-all"
                >
                  Ver Opciones
                </Link>
              </div>
            </div>
          </div>
        </section>



        {/* Why Choose Us Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-4xl font-bold mb-6">¿Por Qué Elegir San Luis Way?</h2>
              <p className="text-xl text-gray-600">
                Somos la plataforma líder para descubrir y conectar con lo mejor de San Luis Potosí
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <UserGroupIcon className="w-16 h-16 text-primary mb-6" />
                <h3 className="text-2xl font-semibold mb-4">Audiencia Comprometida</h3>
                <p className="text-gray-600">
                  Nuestra comunidad busca activamente nuevas experiencias, servicios y productos locales. Son consumidores listos para actuar.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <TrophyIcon className="w-16 h-16 text-primary mb-6" />
                <h3 className="text-2xl font-semibold mb-4">Autoridad Local</h3>
                <p className="text-gray-600">
                  Somos la fuente confiable para descubrir lo mejor de SLP. Tu marca se beneficia de nuestra reputación y credibilidad.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <ChartBarIcon className="w-16 h-16 text-primary mb-6" />
                <h3 className="text-2xl font-semibold mb-4">Resultados Medibles</h3>
                <p className="text-gray-600">
                  Recibe reportes detallados sobre el rendimiento de tu campaña con métricas claras y actionables.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Advertising Options */}
        <section id="opciones" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Opciones de Publicidad</h2>
              <p className="text-xl text-gray-600">
                Elige la opción perfecta para hacer crecer tu marca y conectar con nuevos clientes
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Banners Publicitarios */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mr-6">
                    <PhotoIcon className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Banners Publicitarios</h3>
                    <p className="text-gray-600">Visibilidad premium en nuestro sitio</p>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <StarIcon className="w-5 h-5 text-blue-600 mr-3" />
                    <span>Banners en homepage y páginas principales</span>
                  </li>
                  <li className="flex items-center">
                    <StarIcon className="w-5 h-5 text-blue-600 mr-3" />
                    <span>Formatos: leaderboard, rectangle, skyscraper</span>
                  </li>
                  <li className="flex items-center">
                    <StarIcon className="w-5 h-5 text-blue-600 mr-3" />
                    <span>Targeting por ubicación e intereses</span>
                  </li>
                  <li className="flex items-center">
                    <StarIcon className="w-5 h-5 text-blue-600 mr-3" />
                    <span>Reportes de impresiones y clicks</span>
                  </li>
                  <li className="flex items-center">
                    <StarIcon className="w-5 h-5 text-blue-600 mr-3" />
                    <span>Diseño incluido por nuestro equipo</span>
                  </li>
                </ul>
                <Link
                  href="/contact?subject=Banners%20Publicitarios"
                  className="block text-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Solicitar Información
                </Link>
              </div>

              {/* Contenido Patrocinado */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mr-6">
                    <NewspaperIcon className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Contenido Patrocinado</h3>
                    <p className="text-gray-600">Artículos y blog posts promocionales</p>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <StarIcon className="w-5 h-5 text-green-600 mr-3" />
                    <span>Blog posts de 800-1200 palabras</span>
                  </li>
                  <li className="flex items-center">
                    <StarIcon className="w-5 h-5 text-green-600 mr-3" />
                    <span>Optimización SEO incluida</span>
                  </li>
                  <li className="flex items-center">
                    <StarIcon className="w-5 h-5 text-green-600 mr-3" />
                    <span>Promoción en redes sociales</span>
                  </li>
                  <li className="flex items-center">
                    <StarIcon className="w-5 h-5 text-green-600 mr-3" />
                    <span>Fotografía profesional incluida</span>
                  </li>
                  <li className="flex items-center">
                    <StarIcon className="w-5 h-5 text-green-600 mr-3" />
                    <span>Distribución en newsletter</span>
                  </li>
                </ul>
                <Link
                  href="/contact?subject=Contenido%20Patrocinado"
                  className="block text-center bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Crear Contenido
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Reportajes de Marca */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mr-6">
                    <CameraIcon className="w-8 h-8 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Reportajes de Marca</h3>
                    <p className="text-gray-600">Historias profundas sobre tu negocio</p>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <StarIcon className="w-5 h-5 text-purple-600 mr-3" />
                    <span>Entrevistas con fundadores/propietarios</span>
                  </li>
                  <li className="flex items-center">
                    <StarIcon className="w-5 h-5 text-purple-600 mr-3" />
                    <span>Sesión fotográfica profesional</span>
                  </li>
                  <li className="flex items-center">
                    <StarIcon className="w-5 h-5 text-purple-600 mr-3" />
                    <span>Video promocional (opcional)</span>
                  </li>
                  <li className="flex items-center">
                    <StarIcon className="w-5 h-5 text-purple-600 mr-3" />
                    <span>Posicionamiento como líder local</span>
                  </li>
                  <li className="flex items-center">
                    <StarIcon className="w-5 h-5 text-purple-600 mr-3" />
                    <span>Distribución multiplataforma</span>
                  </li>
                </ul>
                <Link
                  href="/contact?subject=Reportaje%20de%20Marca"
                  className="block text-center bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                  Contar Mi Historia
                </Link>
              </div>

              {/* Menciones Especiales */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mr-6">
                    <SparklesIcon className="w-8 h-8 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Menciones Especiales</h3>
                    <p className="text-gray-600">Destacados en guías y listados</p>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <StarIcon className="w-5 h-5 text-orange-600 mr-3" />
                    <span>Inclusión en guías temáticas</span>
                  </li>
                  <li className="flex items-center">
                    <StarIcon className="w-5 h-5 text-orange-600 mr-3" />
                    <span>Badges de "Recomendado por SLW"</span>
                  </li>
                  <li className="flex items-center">
                    <StarIcon className="w-5 h-5 text-orange-600 mr-3" />
                    <span>Listados de "Lo Mejor de SLP"</span>
                  </li>
                  <li className="flex items-center">
                    <StarIcon className="w-5 h-5 text-orange-600 mr-3" />
                    <span>Mención en newsletter semanal</span>
                  </li>
                  <li className="flex items-center">
                    <StarIcon className="w-5 h-5 text-orange-600 mr-3" />
                    <span>Presencia en eventos virtuales</span>
                  </li>
                </ul>
                <Link
                  href="/contact?subject=Menciones%20Especiales"
                  className="block text-center bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
                >
                  Ser Destacado
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Package Deals */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-4xl font-bold mb-6">Paquetes Integrales</h2>
              <p className="text-xl text-gray-600">
                Combina múltiples servicios para máximo impacto y ahorro
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-gray-200 hover:shadow-xl transition-shadow">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Básico</h3>
                  <p className="text-gray-600">Perfecto para empezar</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    1 Banner publicitario
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    1 Mención especial
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Reportes mensuales
                  </li>
                </ul>
                <Link
                  href="/contact?subject=Paquete%20Básico"
                  className="block text-center bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                >
                  Consultar Precio
                </Link>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg border-4 border-primary hover:shadow-xl transition-shadow relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold">Más Popular</span>
                </div>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Premium</h3>
                  <p className="text-gray-600">Máxima visibilidad</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    3 Banners en ubicaciones premium
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    2 Blog posts patrocinados
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    1 Reportaje de marca
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Múltiples menciones especiales
                  </li>
                </ul>
                <Link
                  href="/contact?subject=Paquete%20Premium"
                  className="block text-center bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
                >
                  Consultar Precio
                </Link>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-gray-200 hover:shadow-xl transition-shadow">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
                  <p className="text-gray-600">Solución personalizada</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Campaña 360° personalizada
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Contenido ilimitado
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Account manager dedicado
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Análisis avanzado y reportes
                  </li>
                </ul>
                <Link
                  href="/contact?subject=Paquete%20Enterprise"
                  className="block text-center bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                >
                  Contactar Ahora
                </Link>
              </div>
            </div>
          </div>
        </section>



        {/* Process Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-4xl font-bold mb-6">Nuestro Proceso</h2>
              <p className="text-xl text-gray-600">
                Trabajamos contigo paso a paso para crear la campaña perfecta
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Consulta Inicial</h3>
                <p className="text-gray-600">Entendemos tus objetivos y audiencia objetivo</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Propuesta Personalizada</h3>
                <p className="text-gray-600">Creamos una estrategia específica para tu marca</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Creación de Contenido</h3>
                <p className="text-gray-600">Nuestro equipo desarrolla todos los materiales</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">4</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Resultados y Análisis</h3>
                <p className="text-gray-600">Medimos el impacto y optimizamos continuamente</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-primary-dark text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">¿Listo para Hacer Crecer Tu Marca?</h2>
              <p className="text-xl mb-8 opacity-90">
                Únete a las marcas exitosas que confían en San Luis Way para conectar con su audiencia ideal
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/contact?subject=Consulta%20de%20Publicidad%20-%20Quiero%20Empezar"
                  className="inline-flex items-center bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-300 transition-all transform hover:scale-105 shadow-lg"
                >
                  Empezar Mi Campaña
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  href="/contact?subject=Solicitar%20Información%20Publicitaria"
                  className="inline-flex items-center border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-all"
                >
                  Solicitar Información
                </Link>
              </div>
              <p className="text-sm mt-6 opacity-75">
                Respuesta garantizada en 24 horas • Consulta inicial gratuita
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl font-bold mb-4">¿Tienes Preguntas?</h3>
              <p className="text-gray-600 mb-6">
                Nuestro equipo está aquí para ayudarte a encontrar la solución perfecta para tu marca
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center text-primary hover:text-primary-dark font-semibold"
                >
                  Enviar Mensaje
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Link>
                <span className="text-gray-400">•</span>
                <a
                  href="mailto:info@sanluisway.com"
                  className="inline-flex items-center text-primary hover:text-primary-dark font-semibold"
                >
                  info@sanluisway.com
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}