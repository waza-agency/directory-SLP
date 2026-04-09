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

type Festival = {
  name: string;
  when: string;
  whenEn: string;
  where: string;
  desc: string;
  descEn: string;
  highlights: string[];
  highlightsEn: string[];
  map: string;
};

const festivals: Festival[] = [
  {
    name: 'Festival del Vino Potosino',
    when: 'Octubre (anual)',
    whenEn: 'October (annual)',
    where: 'Caja Real / Plaza Fundadores',
    desc: 'El festival vitivinícola más importante de SLP. Más de 30 bodegas locales y regionales, maridajes con cocina potosina y catas dirigidas. El estado tiene vino desde la época colonial.',
    descEn: 'SLP\'s biggest wine festival. 30+ local and regional wineries, pairings with Potosino cuisine, and guided tastings. The state has been making wine since colonial times.',
    highlights: ['Catas guiadas', 'Maridajes', 'Uvas Tempranillo y Malbec', 'Quesos artesanales'],
    highlightsEn: ['Guided tastings', 'Food pairings', 'Tempranillo & Malbec', 'Artisan cheeses'],
    map: 'Caja+Real+San+Luis+Potosi',
  },
  {
    name: 'Festival del Queso Artesanal',
    when: 'Abril (anual)',
    whenEn: 'April (annual)',
    where: 'Plaza de Armas',
    desc: 'Productores de queso de todo el Altiplano Potosino: queso de tuna, queso fresco, queso envejecido, queso de cabra y las legendarias quesadillas fritas. Entrada libre.',
    descEn: 'Cheese producers from across the Altiplano Potosino: tuna cheese, fresh cheese, aged varieties, goat cheese and legendary fried quesadillas. Free entry.',
    highlights: ['Queso de tuna', 'Quesadillas fritas', 'Queso de cabra', 'Demostraciones en vivo'],
    highlightsEn: ['Tuna cheese', 'Fried quesadillas', 'Goat cheese', 'Live demonstrations'],
    map: 'Plaza+de+Armas+San+Luis+Potosi',
  },
  {
    name: 'Muestra Gastronómica FENAPO',
    when: 'Agosto (durante la feria)',
    whenEn: 'August (during the state fair)',
    where: 'Recinto Ferial FENAPO',
    desc: 'Pabellón gastronómico dentro de la Feria Nacional Potosina. Todos los antojitos tradicionales en un solo lugar: enchiladas potosinas, gorditas, tacos de asado de boda, mole y nopales.',
    descEn: 'Gastronomic pavilion inside the Feria Nacional Potosina. Every traditional dish in one place: enchiladas potosinas, gorditas, asado de boda tacos, mole and nopales.',
    highlights: ['Enchiladas potosinas', 'Asado de boda', 'Gorditas', 'Mole potosino'],
    highlightsEn: ['Enchiladas potosinas', 'Asado de boda', 'Gorditas', 'Mole potosino'],
    map: 'Recinto+Ferial+FENAPO+San+Luis+Potosi',
  },
  {
    name: 'Festival de la Enchilada Potosina',
    when: 'Julio (anual)',
    whenEn: 'July (annual)',
    where: 'Soledad de Graciano Sánchez',
    desc: 'Celebra el platillo más emblemático de SLP. Concursos de la enchilada más grande, demostraciones de elaboración de masa roja y degustación a precios simbólicos.',
    descEn: 'Celebrates SLP\'s most iconic dish. Biggest-enchilada contests, red-masa demonstrations, and tastings at symbolic prices.',
    highlights: ['Enchilada gigante', 'Demos de masa roja', 'Concursos de cocina', 'Música en vivo'],
    highlightsEn: ['Giant enchilada', 'Red-masa demos', 'Cooking contests', 'Live music'],
    map: 'Soledad+de+Graciano+Sanchez+San+Luis+Potosi',
  },
  {
    name: 'Festival del Mezcal y Sotol',
    when: 'Noviembre (anual)',
    whenEn: 'November (annual)',
    where: 'Plaza San Francisco',
    desc: 'Productores artesanales de mezcal y sotol potosino (sí, SLP tiene denominación de origen). Catas, maridajes y mezcales de 8 variedades de agave.',
    descEn: 'Artisan mezcal and sotol producers from San Luis Potosí (yes, SLP has its own appellation). Tastings, pairings, and mezcals from 8 agave varieties.',
    highlights: ['Catas de mezcal', 'Sotol potosino', 'Agaves silvestres', 'Coctelería regional'],
    highlightsEn: ['Mezcal tastings', 'Potosino sotol', 'Wild agaves', 'Regional cocktails'],
    map: 'Plaza+San+Francisco+San+Luis+Potosi',
  },
  {
    name: 'Feria de la Gordita (Villa de Reyes)',
    when: 'Marzo (anual)',
    whenEn: 'March (annual)',
    where: 'Villa de Reyes, SLP',
    desc: 'A 45 minutos de la capital. La capital mundial de la gordita celebra su platillo con 100+ puestos, maratón de gorditas y coronación de la Reina de la Gordita.',
    descEn: '45 minutes from the capital. The world\'s gordita capital celebrates its dish with 100+ stalls, a gordita marathon, and the crowning of the Gordita Queen.',
    highlights: ['100+ variedades', 'Maratón de gorditas', 'Masa recién hecha', 'Música norteña'],
    highlightsEn: ['100+ varieties', 'Gordita marathon', 'Fresh masa', 'Norteño music'],
    map: 'Villa+de+Reyes+San+Luis+Potosi',
  },
];

const faqs = [
  {
    q: 'What is the biggest food festival in San Luis Potosí?',
    a: 'The Muestra Gastronómica inside FENAPO (August) is the largest single-venue food event — every traditional Potosino dish in one pavilion. For specialized festivals, the Festival del Vino Potosino (October) and the Festival del Queso Artesanal (April) draw the biggest crowds.',
  },
  {
    q: 'When is the Festival de la Enchilada Potosina?',
    a: 'The Festival de la Enchilada Potosina takes place every July in Soledad de Graciano Sánchez (a 15-minute drive from the capital). It features giant-enchilada contests, live red-masa demonstrations, and low-priced tastings.',
  },
  {
    q: 'Does San Luis Potosí have its own mezcal?',
    a: 'Yes — San Luis Potosí is one of the Mexican states with a mezcal appellation of origin (Denominación de Origen). The annual Festival del Mezcal y Sotol in November showcases artisan producers from across the state, including Potosino sotol, which is distinct from mezcal.',
  },
  {
    q: 'Are food festivals in SLP free to enter?',
    a: 'Most public-plaza festivals (Festival del Queso, Festival del Mezcal, Festival del Vino Potosino) have free entry — you pay only for what you taste. FENAPO\'s gastronomic pavilion is included with general fair admission, which is free during certain hours.',
  },
];

export default function FoodFestivalsSLP() {
  const { locale } = useRouter();
  const isEs = locale === 'es';

  const title = isEs
    ? 'Festivales Gastronómicos en San Luis Potosí — Vino, Queso, Mezcal, Enchiladas'
    : 'Food Festivals in San Luis Potosí — Wine, Cheese, Mezcal & Enchilada Fests';
  const description = isEs
    ? '6 festivales gastronómicos imperdibles en SLP: vino potosino, queso artesanal, mezcal y sotol, enchiladas potosinas, gorditas. Fechas, ubicaciones y qué probar.'
    : '6 must-visit food festivals in San Luis Potosí: Potosino wine, artisan cheese, mezcal and sotol, enchiladas potosinas, gorditas. Dates, locations and what to try.';

  return (
    <>
      <SEO
        title={title}
        description={description}
        keywords="food festivals San Luis Potosí, festivales gastronomicos SLP, festival del vino potosino, festival del queso SLP, enchilada potosina festival, mezcal San Luis Potosi, FENAPO comida"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Food Festivals in San Luis Potosí',
          description,
          numberOfItems: festivals.length,
          itemListElement: festivals.map((f, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
              '@type': 'Festival',
              name: f.name,
              description: f.descEn,
              location: {
                '@type': 'Place',
                name: f.where,
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: 'San Luis Potosí',
                  addressRegion: 'SLP',
                  addressCountry: 'MX',
                },
              },
            },
          })),
        }}
      />

      <main className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-br from-rose-700 to-red-600 py-16 text-white">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold mb-4">
              {isEs ? 'CALENDARIO ANUAL' : 'ANNUAL CALENDAR'}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {isEs ? 'Festivales Gastronómicos en SLP' : 'Food Festivals in San Luis Potosí'}
            </h1>
            <LastUpdated date="2026-04-07" className="text-rose-100 mb-4" />
            <p className="text-lg text-rose-50 max-w-2xl mx-auto">
              {isEs
                ? 'Seis festivales al año para celebrar la cocina potosina: vino, queso, mezcal, enchiladas y más.'
                : 'Six yearly festivals celebrating Potosino cuisine: wine, cheese, mezcal, enchiladas and more.'}
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 max-w-4xl py-12">
          <div className="space-y-6">
            {festivals.map((f) => (
              <article key={f.name} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                  <h2 className="text-2xl font-bold text-gray-900">{f.name}</h2>
                  <span className="text-xs font-semibold uppercase text-rose-700 bg-rose-50 px-2 py-1 rounded">
                    {isEs ? f.when : f.whenEn}
                  </span>
                </div>
                <p className="text-gray-600 mb-3">{isEs ? f.desc : f.descEn}</p>
                <p className="text-sm text-gray-500 mb-3">📍 {f.where}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {(isEs ? f.highlights : f.highlightsEn).map((h) => (
                    <span key={h} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                      {h}
                    </span>
                  ))}
                </div>
                <TrackedMapLink
                  href={`https://www.google.com/maps/search/${f.map}`}
                  placeName={f.name}
                  className="inline-flex items-center text-sm text-rose-700 hover:underline font-medium"
                >
                  {isEs ? 'Cómo llegar →' : 'Get directions →'}
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
            { href: '/free-events-san-luis-potosi', label: 'Free Events in SLP', labelEs: 'Eventos Gratis en SLP' },
            { href: '/breakfast-spots-san-luis-potosi', label: 'Best Breakfast Spots', labelEs: 'Mejores Desayunos' },
            { href: '/farmers-markets-san-luis-potosi', label: 'Farmers Markets in SLP', labelEs: 'Tianguis y Mercados' },
            { href: '/events/all', label: 'Browse All Events', labelEs: 'Todos los Eventos' },
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
