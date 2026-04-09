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

type Spot = {
  name: string;
  type: string;
  priceRange: string;
  desc: string;
  descEn: string;
  mustOrder: string[];
  mustOrderEn: string[];
  address: string;
  hours: string;
  map: string;
};

const spots: Spot[] = [
  {
    name: 'La Parroquia Potosina',
    type: 'Traditional',
    priceRange: '$$',
    desc: 'Una institución potosina. Enchiladas potosinas, asado de boda y chilaquiles con todo. Sirven desayuno desde las 7 AM y se llena los fines de semana.',
    descEn: 'A Potosino institution. Enchiladas potosinas, asado de boda and loaded chilaquiles. Open for breakfast from 7 AM — expect lines on weekends.',
    mustOrder: ['Enchiladas potosinas', 'Huevos rancheros', 'Asado de boda', 'Café de olla'],
    mustOrderEn: ['Enchiladas potosinas', 'Huevos rancheros', 'Asado de boda', 'Café de olla'],
    address: 'Av. Carranza 303, Centro',
    hours: '7:00 AM – 11:30 PM',
    map: 'La+Parroquia+Potosina+Avenida+Carranza+San+Luis+Potosi',
  },
  {
    name: 'El Mesón de San Pascual',
    type: 'Regional',
    priceRange: '$$',
    desc: 'Cocina regional en un patio colonial del Centro. Famoso por el desayuno buffet los fines de semana con fruta, chilaquiles, huevos al gusto y mole.',
    descEn: 'Regional cuisine in a colonial courtyard in the Centro. Famous for weekend brunch buffet with fruit, chilaquiles, eggs to order and mole.',
    mustOrder: ['Mole potosino', 'Buffet dominical', 'Tamales de zarzamora', 'Atole'],
    mustOrderEn: ['Mole potosino', 'Sunday buffet', 'Blackberry tamales', 'Atole'],
    address: 'Aldama 40, Centro',
    hours: '8:00 AM – 10:00 PM',
    map: 'El+Meson+de+San+Pascual+San+Luis+Potosi',
  },
  {
    name: 'La Oruga y la Cebolla',
    type: 'Contemporary',
    priceRange: '$$$',
    desc: 'Bistró moderno en el Centro con ingredientes locales. Hotcakes con frutos rojos, eggs benedict con chorizo potosino y jugos prensados en frío.',
    descEn: 'Modern bistro in the Centro using local ingredients. Red fruit pancakes, eggs benedict with Potosino chorizo, and cold-pressed juices.',
    mustOrder: ['Hotcakes frutos rojos', 'Eggs benedict', 'Jugos prensados', 'Latte'],
    mustOrderEn: ['Berry pancakes', 'Eggs benedict', 'Cold-pressed juices', 'Latte'],
    address: 'Escobedo 305, Centro',
    hours: '8:00 AM – 10:00 PM',
    map: 'La+Oruga+y+la+Cebolla+San+Luis+Potosi',
  },
  {
    name: 'Café Córtex',
    type: 'Specialty coffee',
    priceRange: '$$',
    desc: 'La mejor especialidad de café en SLP. Grano potosino y mexicano, tostado en casa. Desayunos ligeros tipo bowls, huevos revueltos y sandwich de aguacate.',
    descEn: 'The best specialty coffee in SLP. Potosino and Mexican beans, roasted in-house. Light breakfasts: bowls, scrambled eggs, avocado sandwiches.',
    mustOrder: ['V60', 'Avocado toast', 'Bowl de granola', 'Flat white'],
    mustOrderEn: ['V60 pour-over', 'Avocado toast', 'Granola bowl', 'Flat white'],
    address: 'Juan Sarabia 120, Centro',
    hours: '8:00 AM – 9:00 PM',
    map: 'Cafe+Cortex+San+Luis+Potosi',
  },
  {
    name: 'Sanborns Carranza',
    type: 'Chain classic',
    priceRange: '$$',
    desc: 'Clásico mexicano 24/7. Desayuno completo (enchiladas suizas, molletes, huevos) y el famoso molletes Sanborns. Ideal si tienes prisa o viajas en familia.',
    descEn: 'Classic Mexican chain, open 24/7. Full breakfast menu (enchiladas suizas, molletes, eggs) and their famous Sanborns molletes. Great for families in a hurry.',
    mustOrder: ['Molletes Sanborns', 'Enchiladas suizas', 'Chilaquiles verdes', 'Café americano'],
    mustOrderEn: ['Molletes Sanborns', 'Enchiladas suizas', 'Green chilaquiles', 'Americano'],
    address: 'Av. Carranza 410, Tequis',
    hours: '24 horas',
    map: 'Sanborns+Carranza+San+Luis+Potosi',
  },
  {
    name: 'Gorditas Carmelita',
    type: 'Street food',
    priceRange: '$',
    desc: 'Las mejores gorditas de la ciudad según locales. Masa recién hecha, rellenos tradicionales (nopales, chicharrón, mole, asado) y salsa verde legendaria.',
    descEn: 'The best gorditas in the city according to locals. Fresh masa, traditional fillings (nopales, chicharrón, mole, asado) and legendary green salsa.',
    mustOrder: ['Gordita de asado', 'Gordita de nopales', 'Gordita de mole', 'Agua de horchata'],
    mustOrderEn: ['Asado gordita', 'Nopales gordita', 'Mole gordita', 'Horchata'],
    address: 'Mercado República, Centro',
    hours: '7:00 AM – 2:00 PM',
    map: 'Mercado+Republica+San+Luis+Potosi',
  },
  {
    name: 'La Virgen',
    type: 'Brunch',
    priceRange: '$$$',
    desc: 'Brunch de fin de semana en casa restaurada del Centro. Menú corto pero impecable: shakshuka, pancakes de ricotta, bloody mary y mimosas.',
    descEn: 'Weekend brunch in a restored Centro house. Short but flawless menu: shakshuka, ricotta pancakes, bloody mary and mimosas.',
    mustOrder: ['Shakshuka', 'Ricotta pancakes', 'Bloody Mary', 'Mimosa'],
    mustOrderEn: ['Shakshuka', 'Ricotta pancakes', 'Bloody Mary', 'Mimosa'],
    address: 'Aldama 215, Centro',
    hours: '9:00 AM – 3:00 PM (Sáb-Dom)',
    map: 'La+Virgen+Restaurante+San+Luis+Potosi',
  },
];

const faqs = [
  {
    q: 'Where do locals have breakfast in San Luis Potosí?',
    a: 'Locals favor traditional spots like La Parroquia Potosina (Centro) for enchiladas potosinas, and Gorditas Carmelita at Mercado República for cheap, authentic street breakfast. For weekend brunch, El Mesón de San Pascual\'s buffet is a go-to.',
  },
  {
    q: 'What should I order for breakfast in SLP?',
    a: 'The regional must-tries are enchiladas potosinas (red salsa with crumbled cheese), asado de boda (sweet-savory pork in chocolate-chile sauce), and gorditas filled with nopales or chicharrón. Pair with café de olla or atole.',
  },
  {
    q: 'What time do breakfast spots open in San Luis Potosí?',
    a: 'Most traditional spots open at 7 AM (La Parroquia Potosina, Gorditas Carmelita). Specialty cafés like Café Córtex open at 8 AM. Sanborns Carranza runs 24 hours. Weekend brunch places like La Virgen open at 9 AM.',
  },
  {
    q: 'Are there good specialty coffee shops in SLP?',
    a: 'Yes — Café Córtex leads SLP\'s third-wave coffee scene, roasting Potosino and Mexican beans in-house. They serve V60 pour-over, flat whites, and light breakfast options.',
  },
];

export default function BreakfastSpotsSLP() {
  const { locale } = useRouter();
  const isEs = locale === 'es';

  const title = isEs
    ? 'Mejores Lugares para Desayunar en San Luis Potosí — 7 Spots que los Locales Eligen'
    : 'Best Breakfast Spots in San Luis Potosí — 7 Places Locals Actually Go';
  const description = isEs
    ? 'Los 7 mejores spots para desayunar en SLP: enchiladas potosinas, gorditas de mercado, brunch moderno y café de especialidad. Direcciones, horarios y qué ordenar.'
    : '7 best breakfast spots in SLP: enchiladas potosinas, street-market gorditas, modern brunch and specialty coffee. Addresses, hours, and what to order.';

  return (
    <>
      <SEO
        title={title}
        description={description}
        keywords="breakfast San Luis Potosí, best breakfast SLP, enchiladas potosinas, gorditas SLP, brunch San Luis Potosi, specialty coffee San Luis Potosi, La Parroquia Potosina, El Meson de San Pascual"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Best Breakfast Spots in San Luis Potosí',
          description,
          numberOfItems: spots.length,
          itemListElement: spots.map((s, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
              '@type': 'Restaurant',
              name: s.name,
              description: s.descEn,
              priceRange: s.priceRange,
              servesCuisine: s.type,
              address: {
                '@type': 'PostalAddress',
                streetAddress: s.address,
                addressLocality: 'San Luis Potosí',
                addressRegion: 'SLP',
                addressCountry: 'MX',
              },
              openingHours: s.hours,
            },
          })),
        }}
      />

      <main className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-br from-amber-700 to-orange-600 py-16 text-white">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold mb-4">
              {isEs ? 'GUÍA LOCAL' : 'LOCAL GUIDE'}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {isEs ? 'Mejores Lugares para Desayunar en SLP' : 'Best Breakfast Spots in San Luis Potosí'}
            </h1>
            <LastUpdated date="2026-04-07" className="text-amber-100 mb-4" />
            <p className="text-lg text-amber-50 max-w-2xl mx-auto">
              {isEs
                ? 'Siete spots donde los potosinos realmente desayunan. Tradicionales, modernos y algunos secretos de mercado.'
                : 'Seven spots where locals actually have breakfast. Traditional, modern, and a few market secrets.'}
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 max-w-4xl py-12">
          <div className="space-y-6">
            {spots.map((s) => (
              <article key={s.name} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                  <h2 className="text-2xl font-bold text-gray-900">{s.name}</h2>
                  <span className="text-xs font-semibold uppercase text-amber-700 bg-amber-50 px-2 py-1 rounded">
                    {s.type} · {s.priceRange}
                  </span>
                </div>
                <p className="text-gray-600 mb-3">{isEs ? s.desc : s.descEn}</p>
                <p className="text-sm text-gray-500 mb-2">📍 {s.address} · 🕒 {s.hours}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {(isEs ? s.mustOrder : s.mustOrderEn).map((item) => (
                    <span key={item} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                      {item}
                    </span>
                  ))}
                </div>
                <TrackedMapLink
                  href={`https://www.google.com/maps/search/${s.map}`}
                  placeName={s.name}
                  className="inline-flex items-center text-sm text-amber-700 hover:underline font-medium"
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
            { href: '/farmers-markets-san-luis-potosi', label: 'Farmers Markets in SLP', labelEs: 'Tianguis y Mercados en SLP' },
            { href: '/food-festivals-san-luis-potosi', label: 'Food Festivals in SLP', labelEs: 'Festivales Gastronómicos en SLP' },
            { href: '/traditional-cuisine', label: 'Traditional Potosino Cuisine', labelEs: 'Cocina Tradicional Potosina' },
            { href: '/restaurants', label: 'Restaurant Directory', labelEs: 'Directorio de Restaurantes' },
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
