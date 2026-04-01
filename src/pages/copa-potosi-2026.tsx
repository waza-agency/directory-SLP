import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import SEO from '@/components/common/SEO';

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'es', ['common'])),
  },
});

const venues = [
  {
    name: 'Unidad Deportiva Adolfo López Mateos',
    role: 'Sede Principal',
    roleEn: 'Main Venue',
    address: 'Av. Himno Nacional 4000, Col. Alamitos, C.P. 78280',
    icon: '🏟️',
  },
  {
    name: 'Instituto Potosino de la Juventud (Inpojuve)',
    role: 'Sede Oficial',
    roleEn: 'Official Venue',
    address: 'San Luis Potosí Centro',
    icon: '⚽',
  },
  {
    name: 'Universidad Politécnica de SLP (UPSLP)',
    role: 'Sede Complementaria',
    roleEn: 'Additional Venue',
    address: 'Urbano Villalón 500, Col. La Ladrillera',
    icon: '🏫',
  },
  {
    name: 'Estadio Alfonso Lastras Ramírez',
    role: 'Gran Final',
    roleEn: 'Grand Final',
    address: 'Blvd. Antonio Rocha Cordero, Lomas del Tecnológico',
    icon: '🏆',
  },
];

const categories = [
  {
    name: 'Varonil Libre',
    nameEn: "Men's Open",
    teams: 16,
    format: 'Round Robin',
    icon: '👨',
    color: 'blue',
  },
  {
    name: 'Femenil Libre',
    nameEn: "Women's Open",
    teams: 16,
    format: 'Round Robin',
    icon: '👩',
    color: 'pink',
  },
  {
    name: 'Infantil 2012-2013',
    nameEn: 'Youth 2012-2013',
    teams: 20,
    format: 'Round Robin',
    icon: '🧒',
    color: 'green',
  },
  {
    name: 'Infantil 2014-2015',
    nameEn: 'Youth 2014-2015',
    teams: 20,
    format: 'Round Robin',
    icon: '👦',
    color: 'amber',
  },
];

const schedule = [
  { date: '30 Mar', label: 'Inauguración + Fase de Grupos', labelEn: 'Opening Ceremony + Group Stage' },
  { date: '31 Mar', label: 'Fase de Grupos', labelEn: 'Group Stage' },
  { date: '1 Abr', label: 'Fase de Grupos', labelEn: 'Group Stage' },
  { date: '2 Abr', label: 'Octavos de Final', labelEn: 'Round of 16' },
  { date: '3 Abr', label: 'Cuartos y Semifinales', labelEn: 'Quarters & Semifinals' },
  { date: '4 Abr', label: 'Gran Final — Estadio Alfonso Lastras', labelEn: 'Grand Final — Alfonso Lastras Stadium' },
];

export default function CopaPotosi2026() {
  const { locale } = useRouter();
  const isEs = locale === 'es';

  const pageTitle = isEs
    ? 'Copa Potosí 2026 — Torneo de Fútbol Amateur en San Luis Potosí | Fechas, Sedes y Categorías'
    : 'Copa Potosí 2026 — Amateur Soccer Tournament in San Luis Potosí | Dates, Venues & Categories';
  const pageDescription = isEs
    ? 'Copa Potosí 2026: el torneo de fútbol amateur más grande de México. Del 30 de marzo al 4 de abril en San Luis Potosí. +1,400 jugadores, equipos internacionales de EE.UU. y Perú, $1.9 millones en premios. Sedes, categorías, calendario y cómo asistir.'
    : 'Copa Potosí 2026: Mexico\'s biggest amateur soccer tournament. March 30 - April 4 in San Luis Potosí. 1,400+ players, international teams from USA & Peru, $1.9M MXN in prizes. Venues, categories, schedule & how to attend.';

  return (
    <>
      <SEO
        title={pageTitle}
        description={pageDescription}
        keywords="Copa Potosí 2026, torneo fútbol San Luis Potosí, fútbol amateur México, soccer tournament SLP, Copa Potosi, Inpode, Estadio Alfonso Lastras, fútbol juvenil San Luis Potosí, amateur football Mexico 2026, deportes San Luis Potosí"
        ogType="website"
      />

      <Head>
        {/* Extended SEO for AI discoverability and Google */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <link rel="canonical" href="https://www.sanluisway.com/copa-potosi-2026" />
        <meta property="og:url" content="https://www.sanluisway.com/copa-potosi-2026" />
        <meta property="og:locale" content={isEs ? 'es_MX' : 'en_US'} />
        <meta property="og:site_name" content="San Luis Way" />

        {/* Event structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SportsEvent',
              name: 'Copa Potosí 2026',
              description: isEs
                ? 'Torneo de fútbol amateur más grande de México con más de 1,400 jugadores y $1.9 millones en premios'
                : 'Mexico\'s biggest amateur soccer tournament with over 1,400 players and $1.9M MXN in prizes',
              startDate: '2026-03-30',
              endDate: '2026-04-04',
              eventStatus: 'https://schema.org/EventScheduled',
              eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
              location: [
                {
                  '@type': 'Place',
                  name: 'Unidad Deportiva Adolfo López Mateos',
                  address: {
                    '@type': 'PostalAddress',
                    streetAddress: 'Av. Himno Nacional 4000',
                    addressLocality: 'San Luis Potosí',
                    addressRegion: 'SLP',
                    postalCode: '78280',
                    addressCountry: 'MX',
                  },
                },
                {
                  '@type': 'Place',
                  name: 'Estadio Alfonso Lastras Ramírez',
                  address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'San Luis Potosí',
                    addressRegion: 'SLP',
                    addressCountry: 'MX',
                  },
                },
              ],
              organizer: {
                '@type': 'Organization',
                name: 'Instituto Potosino de Cultura Física y Deporte (INPODE)',
                url: 'https://inpode.slp.gob.mx',
              },
              sport: 'Soccer',
              competitor: {
                '@type': 'SportsTeam',
                name: 'Multiple amateur and youth teams',
              },
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'MXN',
                availability: 'https://schema.org/InStock',
                description: isEs ? 'Entrada gratuita para espectadores' : 'Free admission for spectators',
              },
              image: 'https://www.sanluisway.com/og-image.jpg',
              url: 'https://www.sanluisway.com/copa-potosi-2026',
            }),
          }}
        />

        {/* FAQ structured data for AI agents */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: isEs ? '¿Cuándo es la Copa Potosí 2026?' : 'When is Copa Potosí 2026?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: isEs
                      ? 'La Copa Potosí 2026 se lleva a cabo del 30 de marzo al 4 de abril de 2026 en San Luis Potosí, México.'
                      : 'Copa Potosí 2026 takes place from March 30 to April 4, 2026 in San Luis Potosí, Mexico.',
                  },
                },
                {
                  '@type': 'Question',
                  name: isEs ? '¿Dónde se juega la Copa Potosí 2026?' : 'Where is Copa Potosí 2026 played?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: isEs
                      ? 'Las sedes son la Unidad Deportiva Adolfo López Mateos, Inpojuve, UPSLP, y la gran final en el Estadio Alfonso Lastras Ramírez.'
                      : 'Venues include Unidad Deportiva Adolfo López Mateos, Inpojuve, UPSLP, with the grand final at Estadio Alfonso Lastras Ramírez.',
                  },
                },
                {
                  '@type': 'Question',
                  name: isEs ? '¿Cuánto cuesta la entrada a la Copa Potosí 2026?' : 'How much does Copa Potosí 2026 cost?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: isEs
                      ? 'La entrada para espectadores es gratuita en todas las sedes.'
                      : 'Spectator admission is free at all venues.',
                  },
                },
                {
                  '@type': 'Question',
                  name: isEs ? '¿Cuántos equipos participan en la Copa Potosí 2026?' : 'How many teams play in Copa Potosí 2026?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: isEs
                      ? 'Participan más de 72 equipos en 4 categorías: Varonil Libre, Femenil Libre, Infantil 2012-2013 e Infantil 2014-2015, con más de 1,400 jugadores incluyendo equipos de EE.UU. y Perú.'
                      : 'Over 72 teams across 4 categories: Men\'s Open, Women\'s Open, Youth 2012-2013, and Youth 2014-2015, with 1,400+ players including teams from USA and Peru.',
                  },
                },
              ],
            }),
          }}
        />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Back nav */}
        <div className="bg-gray-900">
          <div className="container mx-auto px-4 md:px-8 lg:px-16 py-3">
            <Link href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors">
              <ArrowLeftIcon className="w-4 h-4" />
              {isEs ? 'Volver al inicio' : 'Back to home'}
            </Link>
          </div>
        </div>

        {/* HERO */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#0a4d1a] via-[#1a7a30] to-[#0d3b6b]">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.15) 40px, rgba(255,255,255,0.15) 42px)',
            }}
          />
          <div className="relative container mx-auto px-4 md:px-8 lg:px-16 py-16 md:py-24">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                <span className="text-white/90 text-sm font-bold uppercase tracking-widest">
                  30 {isEs ? 'Marzo' : 'March'} — 4 {isEs ? 'Abril' : 'April'} 2026
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
                Copa Potosí 2026
              </h1>
              <p className="text-xl md:text-2xl text-white/80 mb-4 font-light">
                {isEs
                  ? 'La Máxima Fiesta del Fútbol Amateur en México'
                  : "Mexico's Biggest Amateur Soccer Tournament"}
              </p>
              <p className="text-base text-white/60 max-w-2xl mx-auto mb-10">
                {isEs
                  ? 'Más de 1,400 jugadores de todo México, Estados Unidos y Perú compiten en 4 categorías por $1.9 millones de pesos en premios. Organizado por INPODE y el Gobierno del Estado.'
                  : 'Over 1,400 players from across Mexico, the United States, and Peru compete in 4 categories for $1.9 million MXN in prizes. Organized by INPODE and the State Government.'}
              </p>

              {/* Hero stats */}
              <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                {[
                  { n: '1,400+', l: isEs ? 'Jugadores' : 'Players' },
                  { n: '72+', l: isEs ? 'Equipos' : 'Teams' },
                  { n: '$1.9M', l: isEs ? 'En Premios' : 'In Prizes' },
                  { n: '60K+', l: isEs ? 'Espectadores' : 'Spectators' },
                  { n: isEs ? 'Gratis' : 'Free', l: isEs ? 'Entrada' : 'Admission' },
                ].map((s) => (
                  <div key={s.l} className="text-center">
                    <p className="text-3xl md:text-4xl font-bold text-white">{s.n}</p>
                    <p className="text-xs text-white/50 uppercase tracking-wider mt-1">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* QUICK INFO BAR */}
        <div className="bg-gray-900 text-white py-4 border-t border-white/10">
          <div className="container mx-auto px-4 md:px-8 lg:px-16">
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-sm">
              <div className="flex items-center gap-2">
                <span>📅</span>
                <span>30 Mar — 4 Abr 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📍</span>
                <span>San Luis Potosí, México</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🎟️</span>
                <span>{isEs ? 'Entrada Gratuita' : 'Free Admission'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📞</span>
                <span>444 128 8465</span>
              </div>
            </div>
          </div>
        </div>

        {/* CATEGORIES */}
        <section className="py-16 bg-white" id="categorias">
          <div className="container mx-auto px-4 md:px-8 lg:px-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-3 text-center">
              {isEs ? 'Categorías de Competencia' : 'Competition Categories'}
            </h2>
            <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
              {isEs
                ? 'Cuatro categorías con formato Round Robin. Equipos nacionales e internacionales de Estados Unidos y Perú.'
                : 'Four categories in Round Robin format. National and international teams from the United States and Peru.'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((cat) => (
                <div
                  key={cat.name}
                  className={`bg-gradient-to-br from-${cat.color}-50 to-${cat.color}-100 border-2 border-${cat.color}-200 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow`}
                >
                  <div className="text-4xl mb-3">{cat.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {isEs ? cat.name : cat.nameEn}
                  </h3>
                  <p className="text-3xl font-bold text-green-700 mb-1">{cat.teams}</p>
                  <p className="text-sm text-gray-500">{isEs ? 'Equipos' : 'Teams'}</p>
                  <div className="mt-3 inline-block bg-white/80 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
                    {cat.format}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SCHEDULE */}
        <section className="py-16 bg-gray-50" id="calendario">
          <div className="container mx-auto px-4 md:px-8 lg:px-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-3 text-center">
              {isEs ? 'Calendario del Torneo' : 'Tournament Schedule'}
            </h2>
            <p className="text-gray-500 text-center mb-12">
              {isEs ? '6 días de fútbol de alto nivel competitivo' : '6 days of high-level competitive soccer'}
            </p>

            <div className="max-w-3xl mx-auto space-y-4">
              {schedule.map((day, i) => (
                <div
                  key={day.date}
                  className={`flex items-center gap-6 p-5 rounded-xl border-2 transition-colors ${
                    i === schedule.length - 1
                      ? 'bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-300 shadow-md'
                      : 'bg-white border-gray-200 hover:border-green-300'
                  }`}
                >
                  <div className="flex-shrink-0 w-20 text-center">
                    <p className={`text-lg font-bold ${i === schedule.length - 1 ? 'text-amber-700' : 'text-green-700'}`}>
                      {day.date}
                    </p>
                  </div>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm bg-green-600">
                    {i === schedule.length - 1 ? '🏆' : i + 1}
                  </div>
                  <div className="flex-1">
                    <p className={`font-semibold ${i === schedule.length - 1 ? 'text-amber-900 text-lg' : 'text-gray-900'}`}>
                      {isEs ? day.label : day.labelEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* VENUES */}
        <section className="py-16 bg-white" id="sedes">
          <div className="container mx-auto px-4 md:px-8 lg:px-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-3 text-center">
              {isEs ? 'Sedes del Torneo' : 'Tournament Venues'}
            </h2>
            <p className="text-gray-500 text-center mb-12">
              {isEs
                ? '4 sedes deportivas de primer nivel en San Luis Potosí'
                : '4 top-tier sports venues across San Luis Potosí'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {venues.map((v) => (
                <div key={v.name} className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-6 hover:border-green-300 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{v.icon}</div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{v.name}</h3>
                      <p className="text-sm text-green-700 font-semibold mb-2">
                        {isEs ? v.role : v.roleEn}
                      </p>
                      <p className="text-sm text-gray-500">{v.address}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INTERNATIONAL */}
        <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50" id="internacional">
          <div className="container mx-auto px-4 md:px-8 lg:px-16 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
              {isEs ? 'Participación Internacional' : 'International Participation'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-10">
              {isEs
                ? 'La Copa Potosí 2026 recibe equipos de tres países, consolidándose como uno de los torneos amateur más importantes a nivel internacional.'
                : 'Copa Potosí 2026 welcomes teams from three countries, establishing itself as one of the most important amateur tournaments internationally.'}
            </p>
            <div className="flex justify-center gap-8 md:gap-16">
              {[
                { flag: '🇲🇽', country: 'México' },
                { flag: '🇺🇸', country: isEs ? 'Estados Unidos' : 'United States' },
                { flag: '🇵🇪', country: isEs ? 'Perú' : 'Peru' },
              ].map((c) => (
                <div key={c.country} className="text-center">
                  <div className="text-5xl md:text-6xl mb-2">{c.flag}</div>
                  <p className="font-semibold text-gray-900">{c.country}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRACTICAL INFO */}
        <section className="py-16 bg-white" id="info-practica">
          <div className="container mx-auto px-4 md:px-8 lg:px-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-12 text-center">
              {isEs ? 'Información Práctica para Asistir' : 'Practical Info for Attendees'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <div className="text-2xl mb-3">🎟️</div>
                <h3 className="font-bold text-gray-900 mb-2">{isEs ? 'Entrada' : 'Admission'}</h3>
                <p className="text-sm text-gray-600">
                  {isEs
                    ? 'Entrada completamente gratuita para espectadores en todas las sedes y todos los días del torneo.'
                    : 'Completely free admission for spectators at all venues on all tournament days.'}
                </p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <div className="text-2xl mb-3">🚗</div>
                <h3 className="font-bold text-gray-900 mb-2">{isEs ? 'Cómo Llegar' : 'Getting There'}</h3>
                <p className="text-sm text-gray-600">
                  {isEs
                    ? 'Las sedes son accesibles en transporte público, Uber/DiDi, o auto particular. Hay estacionamiento disponible.'
                    : 'Venues are accessible by public transit, Uber/DiDi, or private car. Parking is available.'}
                </p>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                <div className="text-2xl mb-3">☀️</div>
                <h3 className="font-bold text-gray-900 mb-2">{isEs ? 'Recomendaciones' : 'Tips'}</h3>
                <p className="text-sm text-gray-600">
                  {isEs
                    ? 'Lleva protector solar, gorra y agua. Los partidos se juegan al aire libre. Hay venta de alimentos y bebidas en las sedes.'
                    : 'Bring sunscreen, a cap, and water. Matches are played outdoors. Food and drinks are available at venues.'}
                </p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                <div className="text-2xl mb-3">👨‍👩‍👧‍👦</div>
                <h3 className="font-bold text-gray-900 mb-2">{isEs ? 'Para Familias' : 'For Families'}</h3>
                <p className="text-sm text-gray-600">
                  {isEs
                    ? 'Evento familiar. Las categorías infantiles permiten a los niños vivir la experiencia del fútbol competitivo de cerca.'
                    : 'Family-friendly event. Youth categories let kids experience competitive soccer up close.'}
                </p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <div className="text-2xl mb-3">📞</div>
                <h3 className="font-bold text-gray-900 mb-2">{isEs ? 'Contacto' : 'Contact'}</h3>
                <p className="text-sm text-gray-600">
                  INPODE: 444 128 8465<br />
                  inpodedireccion@gmail.com<br />
                  Av. Himno Nacional 4000
                </p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <div className="text-2xl mb-3">🏛️</div>
                <h3 className="font-bold text-gray-900 mb-2">{isEs ? 'Organizador' : 'Organizer'}</h3>
                <p className="text-sm text-gray-600">
                  {isEs
                    ? 'Instituto Potosino de Cultura Física y Deporte (INPODE), Gobierno del Estado de San Luis Potosí.'
                    : 'Potosino Institute of Physical Culture and Sport (INPODE), State Government of San Luis Potosí.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ - SEO enriched */}
        <section className="py-16 bg-gray-50" id="preguntas-frecuentes">
          <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-12 text-center">
              {isEs ? 'Preguntas Frecuentes' : 'Frequently Asked Questions'}
            </h2>

            <div className="space-y-6">
              {[
                {
                  q: isEs ? '¿Cuándo es la Copa Potosí 2026?' : 'When is Copa Potosí 2026?',
                  a: isEs
                    ? 'Del 30 de marzo al 4 de abril de 2026. La inauguración es el 30 de marzo y la gran final el 4 de abril en el Estadio Alfonso Lastras Ramírez.'
                    : 'March 30 to April 4, 2026. The opening ceremony is March 30 and the grand final is April 4 at Estadio Alfonso Lastras Ramírez.',
                },
                {
                  q: isEs ? '¿Cuánto cuesta la entrada?' : 'How much does admission cost?',
                  a: isEs
                    ? 'La entrada es completamente gratuita para todos los espectadores en todas las sedes durante todo el torneo.'
                    : 'Admission is completely free for all spectators at all venues throughout the tournament.',
                },
                {
                  q: isEs ? '¿Qué categorías hay?' : 'What categories are there?',
                  a: isEs
                    ? 'Hay 4 categorías: Varonil Libre (16 equipos), Femenil Libre (16 equipos), Infantil 2012-2013 (20 equipos) e Infantil 2014-2015 (20 equipos).'
                    : "There are 4 categories: Men's Open (16 teams), Women's Open (16 teams), Youth 2012-2013 (20 teams), and Youth 2014-2015 (20 teams).",
                },
                {
                  q: isEs ? '¿Hay equipos internacionales?' : 'Are there international teams?',
                  a: isEs
                    ? 'Sí, la Copa Potosí 2026 cuenta con participación de equipos de México, Estados Unidos y Perú.'
                    : 'Yes, Copa Potosí 2026 features teams from Mexico, the United States, and Peru.',
                },
                {
                  q: isEs ? '¿Dónde es la final?' : 'Where is the final?',
                  a: isEs
                    ? 'La gran final se juega el 4 de abril de 2026 en el Estadio Alfonso Lastras Ramírez, casa del Atlético de San Luis de la Liga MX.'
                    : 'The grand final is played on April 4, 2026 at Estadio Alfonso Lastras Ramírez, home of Atlético de San Luis in Liga MX.',
                },
              ].map((faq) => (
                <div key={faq.q} className="bg-white border-2 border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-br from-[#0a4d1a] via-[#1a7a30] to-[#0d3b6b] text-white">
          <div className="container mx-auto px-4 md:px-8 lg:px-16 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              {isEs ? '¡Vive la Copa Potosí 2026!' : 'Experience Copa Potosí 2026!'}
            </h2>
            <p className="text-white/70 max-w-xl mx-auto mb-8">
              {isEs
                ? 'No te pierdas el torneo de fútbol amateur más grande de México. Entrada gratuita en todas las sedes.'
                : "Don't miss Mexico's biggest amateur soccer tournament. Free admission at all venues."}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="https://inpode.slp.gob.mx/eventos/2026/2/10/copa-potos%C3%AD-2026/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-green-800 font-bold px-8 py-4 rounded-full hover:bg-green-50 transition-colors shadow-lg"
              >
                {isEs ? 'Sitio Oficial INPODE' : 'Official INPODE Site'} ↗
              </a>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/30 text-white font-bold px-8 py-4 rounded-full hover:bg-white/20 transition-colors"
              >
                {isEs ? 'Explorar San Luis Way' : 'Explore San Luis Way'}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
