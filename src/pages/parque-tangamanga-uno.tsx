import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ParqueTangamangaUno() {
  return (
    <>
      <Head>
        <title>Parque Tangamanga I: El Corazón Verde de San Luis Potosí (Guía Definitiva)</title>
        <meta name="description" content="Con 420 hectáreas, el Parque Tangamanga I es uno de los parques urbanos más grandes de Latinoamérica. Descubre qué ver y hacer: Jardín Japonés, Lago Mayor, Teatro, Planetario y más." />
        <meta name="keywords" content="Parque Tangamanga I San Luis Potosí, parque urbano más grande México, Jardín Japonés SLP, Tangamanga Splash, qué hacer Tangamanga" />
        <meta property="og:title" content="Parque Tangamanga I: Guía Definitiva 2025" />
        <meta property="og:description" content="El corazón verde de San Luis Potosí. 420 hectáreas de naturaleza, cultura y diversión." />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://www.sanluisway.com/parque-tangamanga-uno" />
      </Head>

      <Header />

      <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-emerald-900/80 z-10"></div>
          {/* Placeholder para imagen hero */}
          <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
            <p className="text-gray-500 text-lg">📸 Imagen Hero: Vista panorámica Parque Tangamanga I</p>
          </div>

          <div className="relative z-20 text-center text-white px-4 max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Parque Tangamanga I
            </h1>
            <p className="text-xl md:text-2xl mb-6">
              El Corazón Verde de San Luis Potosí
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                🌳 420 hectáreas
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                🎯 Uno de los más grandes de Latinoamérica
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                💚 Entrada gratuita
              </span>
            </div>
          </div>
        </section>

        {/* Quick Links Navigation */}
        <section className="bg-white shadow-md sticky top-0 z-30">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <a href="#jardin-japones" className="px-4 py-2 bg-green-100 hover:bg-green-200 rounded-lg transition-colors">
                🌸 Jardín Japonés
              </a>
              <a href="#lago-mayor" className="px-4 py-2 bg-green-100 hover:bg-green-200 rounded-lg transition-colors">
                🌊 Lago Mayor
              </a>
              <a href="#cultura" className="px-4 py-2 bg-green-100 hover:bg-green-200 rounded-lg transition-colors">
                🎭 Cultura
              </a>
              <a href="#diversion" className="px-4 py-2 bg-green-100 hover:bg-green-200 rounded-lg transition-colors">
                🎢 Diversión
              </a>
              <a href="#info-visita" className="px-4 py-2 bg-green-100 hover:bg-green-200 rounded-lg transition-colors">
                ℹ️ Info Visita
              </a>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Con <strong>420 hectáreas de extensión</strong>, el Parque Tangamanga I no es solo un parque; es un estilo de vida para los potosinos.
              Considerado uno de los parques urbanos más grandes de Latinoamérica (superando en métricas al Central Park),
              este oasis al poniente de la ciudad ofrece desde jardines zen hasta parques acuáticos.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Aquí te contamos qué ver y hacer en este emblemático espacio verde que define a San Luis Potosí.
            </p>

            {/* Related Parks Banner */}
            <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg border-l-4 border-green-500">
              <p className="text-sm font-semibold text-green-800 mb-2">Explora los otros espacios Tangamanga:</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/parque-tangamanga-dos" className="inline-flex items-center text-green-700 hover:text-green-900 font-medium">
                  🏃 Parque Tangamanga II →
                </Link>
                <Link href="/ecomuseo-tangamanga" className="inline-flex items-center text-green-700 hover:text-green-900 font-medium">
                  🏛️ Ecomuseo Tangamanga →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: Jardín Japonés */}
        <section id="jardin-japones" className="container mx-auto px-4 py-12 max-w-6xl scroll-mt-20">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-4xl">🌸</span>
              <h2 className="text-3xl font-bold text-gray-800">El Emblemático Jardín Japonés</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Un rincón de paz diseñado bajo los preceptos tradicionales de la jardinería nipona.
                  Es el spot fotográfico por excelencia del parque.
                </p>

                <h3 className="font-semibold text-lg mb-3 text-gray-800">Lo que verás:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-2">⛩️</span>
                    <span><strong>Arco Torii:</strong> El icónico portal rojo que marca la entrada al espacio sagrado</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">🌉</span>
                    <span><strong>Puentes de madera roja:</strong> Perfectos para fotos románticas</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">🐟</span>
                    <span><strong>Estanque con peces Koi:</strong> Observa los coloridos peces nadar tranquilamente</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">🎋</span>
                    <span><strong>Vegetación de bambú:</strong> Senderos sombreados que invitan a la meditación</span>
                  </li>
                </ul>

                <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                  <p className="text-sm text-yellow-800">
                    <strong>📸 Tip fotográfico:</strong> Las mejores fotos se toman temprano en la mañana (7-9 AM)
                    cuando hay menos gente y la luz es suave.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Placeholder para imagen */}
                <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                  <p className="text-gray-500 text-center px-4">📸 Imagen: Jardín Japonés con Torii y puente rojo</p>
                </div>
                <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
                  <p className="text-gray-500 text-center px-4">📸 Imagen: Estanque con peces Koi</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Lago Mayor */}
        <section id="lago-mayor" className="container mx-auto px-4 py-12 max-w-6xl scroll-mt-20">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-4xl">🌊</span>
              <h2 className="text-3xl font-bold text-gray-800">El Lago Mayor y Actividades Acuáticas</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                {/* Placeholder para imagen */}
                <div className="bg-gray-200 rounded-lg h-80 flex items-center justify-center">
                  <p className="text-gray-500 text-center px-4">📸 Imagen: Vista panorámica del Lago Mayor al atardecer</p>
                </div>
              </div>

              <div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  El espejo de agua central del parque. Es ideal para caminatas al atardecer los fines de semana.
                  Las familias potosinas se reúnen aquí para disfrutar del aire fresco y la tranquilidad.
                </p>

                <h3 className="font-semibold text-lg mb-3 text-gray-800">Actividades en el Lago:</h3>
                <ul className="space-y-2 text-gray-700 mb-6">
                  <li className="flex items-start">
                    <span className="mr-2">🚣</span>
                    <span>Renta de botes de pedales (disponible fines de semana)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">🏃</span>
                    <span>Sendero perimetral de 3.2 km para correr o caminar</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">🦆</span>
                    <span>Observación de aves acuáticas y patos silvestres</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">🌅</span>
                    <span>Mirador con vista al atardecer (lado oeste)</span>
                  </li>
                </ul>

                <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                  <p className="text-sm text-blue-800">
                    <strong>💡 Dato importante:</strong> Frente al lago se encuentra el Ecomuseo.
                    Si te interesa la historia, visita nuestra{' '}
                    <Link href="/ecomuseo-tangamanga" className="font-semibold underline hover:text-blue-900">
                      Guía del Ecomuseo Tangamanga
                    </Link>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Cultura y Espectáculos */}
        <section id="cultura" className="container mx-auto px-4 py-12 max-w-6xl scroll-mt-20">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-4xl">🎭</span>
              <h2 className="text-3xl font-bold text-gray-800">Cultura y Espectáculos</h2>
            </div>

            {/* Teatro de la Ciudad */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Teatro de la Ciudad</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Un impresionante anfiteatro al aire libre que evoca la arquitectura griega,
                    escenario de conciertos masivos, festivales y eventos culturales de talla internacional.
                  </p>

                  <h4 className="font-semibold mb-2">Eventos destacados:</h4>
                  <ul className="space-y-2 text-gray-700 mb-4">
                    <li>🎵 Conciertos de la Orquesta Sinfónica del Estado</li>
                    <li>🎸 Festivales de rock y música popular</li>
                    <li>🎪 Festival Internacional de las Artes (FIA)</li>
                    <li>🌟 Espectáculos de danza contemporánea</li>
                  </ul>

                  <p className="text-sm text-gray-600">
                    <strong>Capacidad:</strong> Hasta 8,000 personas
                  </p>
                </div>

                <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                  <p className="text-gray-500 text-center px-4">📸 Imagen: Teatro de la Ciudad estilo griego</p>
                </div>
              </div>
            </div>

            {/* Planetario */}
            <div className="border-t pt-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Planetario</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                  <p className="text-gray-500 text-center px-4">📸 Imagen: Cúpula del Planetario</p>
                </div>

                <div>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Perfecto para los amantes de la astronomía y visitas escolares.
                    Cuenta con una cúpula de proyección de última generación que ofrece viajes inmersivos por el cosmos.
                  </p>

                  <h4 className="font-semibold mb-2">Experiencias disponibles:</h4>
                  <ul className="space-y-2 text-gray-700 mb-4">
                    <li>🌌 Proyecciones del sistema solar</li>
                    <li>⭐ Constelaciones y mitología</li>
                    <li>🚀 Exploración espacial</li>
                    <li>🌍 Documentales sobre el universo</li>
                  </ul>

                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="text-sm text-purple-800">
                      <strong>Horarios:</strong> Consulta programación en sitio web oficial.
                      Generalmente sábados y domingos con funciones cada 2 horas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Diversión */}
        <section id="diversion" className="container mx-auto px-4 py-12 max-w-6xl scroll-mt-20">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-4xl">🎢</span>
              <h2 className="text-3xl font-bold text-gray-800">Diversión: Splash y Zoológico</h2>
            </div>

            {/* Tangamanga Splash */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Tangamanga Splash - Parque Acuático</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Para los días calurosos, el parque acuático Tangamanga Splash ofrece toboganes,
                    albercas de olas y áreas especiales para niños. Es el escape perfecto del calor potosino.
                  </p>

                  <h4 className="font-semibold mb-2">Atracciones:</h4>
                  <ul className="space-y-2 text-gray-700 mb-4">
                    <li>🌊 Alberca de olas gigante</li>
                    <li>🎢 Toboganes extremos (Kamikaze, Río Rápido)</li>
                    <li>👶 Área infantil con chapoteaderos</li>
                    <li>🏊 Alberca semi-olímpica</li>
                    <li>🌴 Áreas de asoleadero y palapas</li>
                  </ul>

                  <div className="p-4 bg-cyan-50 border-l-4 border-cyan-500 rounded">
                    <p className="text-sm text-cyan-800">
                      <strong>📅 Temporada:</strong> Abierto de mayo a septiembre. Verificar horarios antes de visitar.
                      <br />
                      <strong>💰 Costo aprox:</strong> $80-150 MXN por persona
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                    <p className="text-gray-500 text-center px-4">📸 Imagen: Toboganes y alberca de olas Tangamanga Splash</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Zoológico/UMA */}
            <div className="border-t pt-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Unidad de Manejo Ambiental (UMA) - Zoológico</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                  <p className="text-gray-500 text-center px-4">📸 Imagen: Animales en el área de UMA</p>
                </div>

                <div>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    La Unidad de Manejo Ambiental permite observar fauna local rescatada y especies en rehabilitación.
                    Es una experiencia educativa especialmente valiosa para familias con niños.
                  </p>

                  <h4 className="font-semibold mb-2">Especies que podrás ver:</h4>
                  <ul className="space-y-2 text-gray-700 mb-4">
                    <li>🦌 Venados cola blanca</li>
                    <li>🦅 Aves rapaces (águilas, halcones)</li>
                    <li>🐻 Oso negro americano</li>
                    <li>🦜 Guacamayas y pericos</li>
                    <li>🐾 Fauna endémica de San Luis Potosí</li>
                  </ul>

                  <p className="text-sm text-gray-600">
                    <strong>Entrada:</strong> Generalmente incluida con el acceso general al parque
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Information Section */}
        <section id="info-visita" className="container mx-auto px-4 py-12 max-w-4xl scroll-mt-20">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl shadow-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-6 text-center">📍 Información de Visita</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="font-semibold text-xl mb-3 flex items-center">
                  <span className="mr-2">🕐</span> Horario
                </h3>
                <p className="mb-2"><strong>Martes a Domingo:</strong> 5:00 AM - 10:30 PM</p>
                <p><strong>Lunes:</strong> 5:00 AM - 11:00 AM (cierre temprano por mantenimiento)</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="font-semibold text-xl mb-3 flex items-center">
                  <span className="mr-2">📍</span> Ubicación
                </h3>
                <p>Av. Salvador Nava Martínez</p>
                <p>Zona Poniente, San Luis Potosí</p>
                <p className="text-sm mt-2 text-green-100">Frente a Plaza San Luis</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="font-semibold text-xl mb-3 flex items-center">
                  <span className="mr-2">💰</span> Costo
                </h3>
                <p className="text-2xl font-bold">GRATIS</p>
                <p className="text-sm text-green-100 mt-2">
                  *Museos, Planetario y Balneario pueden tener costo adicional
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="font-semibold text-xl mb-3 flex items-center">
                  <span className="mr-2">🚗</span> Estacionamiento
                </h3>
                <p>Múltiples accesos con estacionamiento</p>
                <p className="text-sm text-green-100 mt-2">
                  Puede llenarse los fines de semana. Llega temprano o considera el Tangamanga II.
                </p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-white/10 backdrop-blur-sm rounded-lg">
              <h3 className="font-semibold text-xl mb-3">💡 Tips para tu visita:</h3>
              <ul className="space-y-2">
                <li>✅ Usa ropa cómoda y tenis para caminar</li>
                <li>✅ Lleva agua y snacks (hay vendedores pero son más caros)</li>
                <li>✅ Aplica bloqueador solar</li>
                <li>✅ Si vas al Splash, lleva toalla y traje de baño extra</li>
                <li>✅ Los domingos hay más actividades familiares pero más gente</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Related Pages CTA */}
        <section className="container mx-auto px-4 py-12 max-w-6xl">
          <div className="bg-gradient-to-br from-emerald-100 to-green-100 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Explora más del sistema Tangamanga
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/parque-tangamanga-dos">
                <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow cursor-pointer">
                  <h3 className="text-xl font-bold mb-2 text-green-700">🏃 Parque Tangamanga II</h3>
                  <p className="text-gray-600">
                    Descubre el parque renovado del norte con autódromo profesional, lagos restaurados y áreas pet-friendly.
                  </p>
                  <span className="text-green-600 font-semibold mt-3 inline-block">Leer más →</span>
                </div>
              </Link>

              <Link href="/ecomuseo-tangamanga">
                <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow cursor-pointer">
                  <h3 className="text-xl font-bold mb-2 text-green-700">🏛️ Ecomuseo Tangamanga</h3>
                  <p className="text-gray-600">
                    Viaja al siglo XVII en la Ex-Hacienda de la Tenería. Historia, arquitectura y naturaleza en un solo lugar.
                  </p>
                  <span className="text-green-600 font-semibold mt-3 inline-block">Leer más →</span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Referencias */}
        <section className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="bg-gray-50 rounded-lg p-6 text-sm text-gray-600">
            <h3 className="font-semibold text-gray-800 mb-3">📚 Referencias Bibliográficas:</h3>
            <ul className="space-y-1">
              <li>• Centros Estatales de Cultura y Recreación Tangamanga (CECURT) - slp.gob.mx</li>
              <li>• Sistema de Información Cultural (Gobierno de México) - sic.cultura.gob.mx</li>
              <li>• Archivo Histórico de San Luis Potosí</li>
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
