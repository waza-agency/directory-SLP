import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import Link from 'next/link';
import SEO from '@/components/common/SEO';
import LastUpdated from '@/components/common/LastUpdated';
import TrackedMapLink from '@/components/common/TrackedMapLink';
import GuideCTA from '@/components/common/GuideCTA';

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common'])),
  },
});

type Market = {
  name: string;
  desc: string;
  descEn: string;
  days: string;
  daysEn: string;
  hours: string;
  address: string;
  neighborhood: string;
  specialties: string[];
  specialtiesEn: string[];
  map: string;
};

const markets: Market[] = [
  {
    name: 'Tianguis del Martes',
    desc: 'El tianguis más grande y tradicional de la ciudad. Frutas, verduras, flores, ropa, herramientas, comida preparada y todo lo imaginable.',
    descEn: 'The biggest traditional street market in the city. Fruits, vegetables, flowers, clothing, tools, prepared food — everything imaginable.',
    days: 'Martes',
    daysEn: 'Tuesdays',
    hours: '7:00 AM – 4:00 PM',
    address: 'Blvd. Salvador Nava Martínez, Col. Himno Nacional',
    neighborhood: 'Himno Nacional',
    specialties: ['Frutas y verduras', 'Gorditas', 'Enchiladas potosinas', 'Nopales', 'Ropa'],
    specialtiesEn: ['Fresh produce', 'Gorditas', 'Enchiladas potosinas', 'Nopales', 'Clothing'],
    map: 'Tianguis+del+Martes+Himno+Nacional+San+Luis+Potosi',
  },
  {
    name: 'Tianguis del Jueves (Satélite)',
    desc: 'Tianguis semanal muy popular en la zona de Satélite. Fruta y verdura a precio de mayoreo, ropa y puestos de antojitos.',
    descEn: 'Popular weekly market in the Satélite area. Wholesale-price produce, clothing, and Mexican street food stalls.',
    days: 'Jueves',
    daysEn: 'Thursdays',
    hours: '7:00 AM – 3:00 PM',
    address: 'Col. Satélite Francisco I. Madero',
    neighborhood: 'Satélite',
    specialties: ['Fruta de temporada', 'Verduras orgánicas', 'Tacos de canasta', 'Licuados'],
    specialtiesEn: ['Seasonal fruit', 'Organic vegetables', 'Tacos de canasta', 'Smoothies'],
    map: 'Tianguis+Jueves+Satelite+San+Luis+Potosi',
  },
  {
    name: 'Mercado Hidalgo',
    desc: 'Mercado tradicional permanente en el Centro Histórico. Imperdible para probar asado de boda, enchiladas potosinas y comprar especias regionales.',
    descEn: 'Permanent traditional market in the Historic Center. Must-visit for asado de boda, enchiladas potosinas, and regional spices.',
    days: 'Lun – Dom',
    daysEn: 'Mon – Sun',
    hours: '7:00 AM – 7:00 PM',
    address: 'Hidalgo 1950, Centro Histórico',
    neighborhood: 'Centro',
    specialties: ['Asado de boda', 'Chiles secos', 'Cecina', 'Queso de tuna', 'Dulces típicos'],
    specialtiesEn: ['Asado de boda', 'Dried chiles', 'Cecina', 'Tuna candy', 'Traditional sweets'],
    map: 'Mercado+Hidalgo+San+Luis+Potosi',
  },
  {
    name: 'Mercado República',
    desc: 'Segundo mercado histórico del Centro. Carne fresca, abarrotes, puestos de jugos naturales y comida casera a precios locales.',
    descEn: 'The Centro\'s second historic market. Fresh meat, groceries, natural juice stands, and home-cooked meals at local prices.',
    days: 'Lun – Dom',
    daysEn: 'Mon – Sun',
    hours: '6:00 AM – 6:00 PM',
    address: 'Díaz de León 275, Centro',
    neighborhood: 'Centro',
    specialties: ['Carnicerías', 'Jugos naturales', 'Pollo rostizado', 'Abarrotes'],
    specialtiesEn: ['Butchers', 'Fresh juices', 'Roast chicken', 'Groceries'],
    map: 'Mercado+Republica+San+Luis+Potosi',
  },
  {
    name: 'Tianguis Orgánico Potosino',
    desc: 'El punto de encuentro para productores orgánicos locales. Verduras sin pesticidas, huevos de rancho, pan artesanal, miel y productos fermentados.',
    descEn: 'The meeting point for local organic producers. Pesticide-free vegetables, free-range eggs, artisan bread, honey, and fermented products.',
    days: 'Sábados',
    daysEn: 'Saturdays',
    hours: '9:00 AM – 1:00 PM',
    address: 'Parque Juan H. Sánchez / varían según temporada',
    neighborhood: 'Tequisquiapan',
    specialties: ['Verduras orgánicas', 'Pan de masa madre', 'Miel cruda', 'Kombucha', 'Jabones artesanales'],
    specialtiesEn: ['Organic vegetables', 'Sourdough bread', 'Raw honey', 'Kombucha', 'Artisan soap'],
    map: 'Parque+Juan+H+Sanchez+San+Luis+Potosi',
  },
  {
    name: 'Mercado 16 de Septiembre',
    desc: 'Mercado de barrio con lo mejor de productos frescos, flores y cocinas económicas. Desayunos completos desde 60 pesos.',
    descEn: 'Neighborhood market with fresh produce, flowers, and cheap kitchens. Full breakfasts from 60 pesos.',
    days: 'Lun – Dom',
    daysEn: 'Mon – Sun',
    hours: '6:30 AM – 5:00 PM',
    address: 'Av. Venustiano Carranza, Col. Moderna',
    neighborhood: 'Moderna',
    specialties: ['Desayunos económicos', 'Flores frescas', 'Frutas de temporada', 'Carnitas'],
    specialtiesEn: ['Cheap breakfast', 'Fresh flowers', 'Seasonal fruit', 'Carnitas'],
    map: 'Mercado+16+Septiembre+San+Luis+Potosi',
  },
];

const faqs = [
  {
    q: 'What day is the biggest farmers market in San Luis Potosí?',
    a: 'The Tianguis del Martes (Tuesday Market) on Blvd. Salvador Nava is the largest street market, open every Tuesday from 7 AM to 4 PM. For permanent markets, Mercado Hidalgo in the Centro Histórico is open daily.',
  },
  {
    q: 'Where can I buy organic produce in San Luis Potosí?',
    a: 'The Tianguis Orgánico Potosino meets every Saturday from 9 AM to 1 PM at Parque Juan H. Sánchez in Tequisquiapan. You\'ll find local producers selling pesticide-free vegetables, sourdough bread, raw honey, and more.',
  },
  {
    q: 'Do I need to speak Spanish to shop at SLP farmers markets?',
    a: 'Not at all — prices are usually marked or pointed to, and vendors are friendly and patient. Learning "¿Cuánto cuesta?" (how much) and basic numbers helps, but hand gestures and calculators solve most interactions.',
  },
  {
    q: 'Can I pay with card at the tianguis?',
    a: 'No, farmers markets in SLP are cash-only. Bring small bills (20, 50, 100 pesos) — vendors rarely have change for 500-peso notes.',
  },
];

export default function FarmersMarketsSLP() {
  const { locale } = useRouter();
  const isEs = locale === 'es';

  const title = isEs
    ? 'Tianguis y Mercados en San Luis Potosí — Guía Completa con Días, Horarios y Especialidades'
    : 'Farmers Markets in San Luis Potosí — Complete Guide with Days, Hours & What to Buy';
  const description = isEs
    ? '6 tianguis y mercados de SLP con días, horarios, direcciones y qué comprar. Desde el Tianguis del Martes hasta el Mercado Hidalgo — dónde compran los locales.'
    : '6 farmers markets and tianguis in San Luis Potosí with days, hours, addresses and specialties. From the Tuesday tianguis to Mercado Hidalgo — where locals actually shop.';

  return (
    <>
      <SEO
        title={title}
        description={description}
        keywords="farmers market San Luis Potosí, tianguis SLP, mercado Hidalgo, tianguis martes, tianguis organico, where to buy produce San Luis Potosi, mercados SLP"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Farmers Markets in San Luis Potosí',
          description,
          numberOfItems: markets.length,
          itemListElement: markets.map((m, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
              '@type': 'LocalBusiness',
              name: m.name,
              description: m.descEn,
              address: {
                '@type': 'PostalAddress',
                streetAddress: m.address,
                addressLocality: 'San Luis Potosí',
                addressRegion: 'SLP',
                addressCountry: 'MX',
              },
              openingHours: m.hours,
            },
          })),
        }}
      />

      <main className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-br from-emerald-700 to-teal-600 py-16 text-white">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold mb-4">
              {isEs ? 'GUÍA LOCAL' : 'LOCAL GUIDE'}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {isEs ? 'Tianguis y Mercados en San Luis Potosí' : 'Farmers Markets in San Luis Potosí'}
            </h1>
            <LastUpdated date="2026-04-07" className="text-emerald-100 mb-4" />
            <p className="text-lg text-emerald-50 max-w-2xl mx-auto">
              {isEs
                ? '6 mercados donde compran los potosinos. Días, horarios, direcciones y qué llevar — todo en un solo lugar.'
                : 'Six markets where the locals of SLP actually shop. Days, hours, addresses and what to buy — all in one place.'}
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 max-w-4xl py-12">
          <div className="space-y-6">
            {markets.map((m) => (
              <article key={m.name} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                  <h2 className="text-2xl font-bold text-gray-900">{m.name}</h2>
                  <span className="text-sm font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                    {isEs ? m.days : m.daysEn} · {m.hours}
                  </span>
                </div>
                <p className="text-gray-600 mb-3">{isEs ? m.desc : m.descEn}</p>
                <p className="text-sm text-gray-500 mb-3">
                  📍 {m.address} · <strong>{m.neighborhood}</strong>
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {(isEs ? m.specialties : m.specialtiesEn).map((s) => (
                    <span key={s} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                      {s}
                    </span>
                  ))}
                </div>
                <TrackedMapLink
                  href={`https://www.google.com/maps/search/${m.map}`}
                  placeName={m.name}
                  className="inline-flex items-center text-sm text-emerald-700 hover:underline font-medium"
                >
                  {isEs ? 'Ver en Google Maps →' : 'View on Google Maps →'}
                </TrackedMapLink>
              </article>
            ))}
          </div>

          <section className="mt-12 bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {isEs ? 'Preguntas frecuentes' : 'Frequently Asked Questions'}
            </h2>
            <dl className="space-y-4">
              {faqs.map((f) => (
                <div key={f.q}>
                  <dt className="font-semibold text-gray-900 mb-1">{f.q}</dt>
                  <dd className="text-gray-600">{f.a}</dd>
                </div>
              ))}
            </dl>
          </section>

          <GuideCTA relatedLinks={[
            { href: '/breakfast-spots-san-luis-potosi', label: 'Best Breakfast Spots in SLP', labelEs: 'Mejores Desayunos en SLP' },
            { href: '/traditional-cuisine', label: 'Traditional Potosino Cuisine', labelEs: 'Cocina Tradicional Potosina' },
            { href: '/free-events-san-luis-potosi', label: 'Free Events in SLP', labelEs: 'Eventos Gratis en SLP' },
            { href: '/places', label: 'Browse All Places in SLP', labelEs: 'Todos los Lugares en SLP' },
          ]} />
        </section>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }),
        }}
      />
    </>
  );
}
