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

type FreeEvent = {
  name: string;
  category: string;
  frequency: string;
  frequencyEn: string;
  where: string;
  hours: string;
  desc: string;
  descEn: string;
  map: string;
};

const freeEvents: FreeEvent[] = [
  {
    name: 'Ciclovía Dominical',
    category: 'Outdoors',
    frequency: 'Cada domingo',
    frequencyEn: 'Every Sunday',
    where: 'Av. Venustiano Carranza',
    hours: '8:00 AM – 1:00 PM',
    desc: 'La avenida principal se cierra al tráfico para ciclistas, patinadores, corredores y familias. Zumba, rentadoras de bicis y puestos de fruta gratis en todo el recorrido.',
    descEn: 'The main avenue closes to traffic for cyclists, skaters, runners and families. Zumba sessions, bike rentals, and free fruit stands along the whole route.',
    map: 'Avenida+Venustiano+Carranza+San+Luis+Potosi',
  },
  {
    name: 'Noche de Museos',
    category: 'Culture',
    frequency: 'Último viernes de cada mes',
    frequencyEn: 'Last Friday of each month',
    where: 'Centro Histórico — 6+ museos',
    hours: '7:00 PM – 11:00 PM',
    desc: 'Todos los museos del Centro abren gratis: Museo Federico Silva, Museo de la Máscara, Museo del Virreinato, Museo Nacional de la Máscara. Algunos incluyen conciertos y performances.',
    descEn: 'All Centro museums open free: Museo Federico Silva, Museo de la Máscara, Museo del Virreinato, and more. Some include concerts and performances.',
    map: 'Museo+Federico+Silva+San+Luis+Potosi',
  },
  {
    name: 'Festival Internacional San Luis en Primavera',
    category: 'Festival',
    frequency: 'Abril (anual)',
    frequencyEn: 'April (annual)',
    where: 'Plaza de Armas, Teatro de la Paz, Caja Real',
    hours: 'Varies',
    desc: 'Una semana de conciertos, ballet, ópera, teatro y danza — casi todo gratuito al aire libre. Uno de los festivales culturales más importantes de México.',
    descEn: 'A week of concerts, ballet, opera, theater and dance — most of it free and open-air. One of Mexico\'s top cultural festivals.',
    map: 'Plaza+de+Armas+San+Luis+Potosi',
  },
  {
    name: 'FENAPO (Feria Nacional Potosina)',
    category: 'Festival',
    frequency: 'Agosto (anual)',
    frequencyEn: 'August (annual)',
    where: 'Recinto Ferial FENAPO',
    hours: '4:00 PM – 2:00 AM',
    desc: 'La feria más tradicional de México. Entrada general gratis hasta ciertas horas, pabellones estatales, expo ganadera, teatro del pueblo con artistas grandes sin costo.',
    descEn: 'Mexico\'s most traditional state fair. Free general admission during certain hours, state pavilions, livestock expo, and free concerts at Teatro del Pueblo with big-name artists.',
    map: 'Recinto+Ferial+FENAPO+San+Luis+Potosi',
  },
  {
    name: 'Procesión del Silencio',
    category: 'Culture',
    frequency: 'Viernes Santo (Semana Santa)',
    frequencyEn: 'Good Friday (Holy Week)',
    where: 'Centro Histórico',
    hours: '8:00 PM',
    desc: 'Procesión religiosa declarada Patrimonio Cultural Inmaterial. Más de 2,000 cofrades vestidos de época recorren en completo silencio las calles del Centro. Imperdible.',
    descEn: 'Religious procession declared Intangible Cultural Heritage. Over 2,000 robed cofrades walk in complete silence through the Centro streets. Unmissable.',
    map: 'Catedral+San+Luis+Potosi',
  },
  {
    name: 'Conciertos en Plaza de Armas',
    category: 'Music',
    frequency: 'Jueves y domingos',
    frequencyEn: 'Thursdays and Sundays',
    where: 'Plaza de Armas (Kiosco)',
    hours: '6:00 PM – 8:00 PM',
    desc: 'La Banda del Estado toca música mexicana clásica, potosina y popular desde el kiosco. Traer silla plegable o sentarse en las bancas del jardín.',
    descEn: 'The State Band plays classic Mexican, Potosino and popular music from the bandstand. Bring a folding chair or grab a garden bench.',
    map: 'Plaza+de+Armas+San+Luis+Potosi',
  },
  {
    name: 'Xantolo (Día de Muertos en la Huasteca)',
    category: 'Culture',
    frequency: 'Octubre 31 – Noviembre 2',
    frequencyEn: 'October 31 – November 2',
    where: 'Huasteca Potosina (Tamazunchale, Axtla)',
    hours: 'All day',
    desc: 'La versión más auténtica del Día de Muertos. Danzas de viejos y huehues, ofrendas callejeras, altares abiertos al público. Todo gratis.',
    descEn: 'The most authentic Day of the Dead celebration. Huehues dances, street altars, and open-to-public ofrendas. All free.',
    map: 'Tamazunchale+San+Luis+Potosi',
  },
  {
    name: 'Parque Tangamanga (Zoológico + Laberinto)',
    category: 'Outdoors',
    frequency: 'Diario',
    frequencyEn: 'Daily',
    where: 'Parque Tangamanga I',
    hours: '5:00 AM – 10:30 PM',
    desc: 'El parque urbano más grande de SLP: zoológico gratuito, lago, pista para correr, Laberinto de las Ciencias (museo interactivo también gratis), canchas y áreas de picnic.',
    descEn: 'SLP\'s largest urban park: free zoo, lake, running track, Laberinto de las Ciencias (free interactive science museum), sports courts and picnic areas.',
    map: 'Parque+Tangamanga+I+San+Luis+Potosi',
  },
];

const faqs = [
  {
    q: 'What free events can I attend this weekend in San Luis Potosí?',
    a: 'Every Sunday from 8 AM to 1 PM, Av. Carranza closes for Ciclovía — free bikes and rollerblading. On Thursday and Sunday evenings, free outdoor concerts happen at Plaza de Armas. Parque Tangamanga, including the zoo and science museum, is free every day.',
  },
  {
    q: 'When is Noche de Museos in SLP?',
    a: 'Noche de Museos happens the last Friday of each month from 7 PM to 11 PM. All major museums in the Centro Histórico open for free, often with live music and performances.',
  },
  {
    q: 'Is FENAPO (the state fair) free?',
    a: 'Yes — FENAPO general admission is free during certain hours in August, and all Teatro del Pueblo concerts (often with major Mexican artists) are included. Expect crowds on weekends.',
  },
  {
    q: 'What is the best free cultural event in San Luis Potosí?',
    a: 'Two stand out: the Festival Internacional San Luis en Primavera in April (a week of free concerts, ballet and theater), and the Procesión del Silencio on Good Friday (a centuries-old silent religious procession with over 2,000 participants, declared Intangible Cultural Heritage).',
  },
];

export default function FreeEventsSLP() {
  const { locale } = useRouter();
  const isEs = locale === 'es';

  const title = isEs
    ? 'Eventos Gratis en San Luis Potosí — Ciclovía, Noche de Museos, FENAPO y Más'
    : 'Free Events in San Luis Potosí — Ciclovía, Museum Nights, Concerts & Festivals';
  const description = isEs
    ? '8 eventos gratuitos en SLP que cualquiera puede disfrutar: ciclovía, Noche de Museos, conciertos en Plaza de Armas, FENAPO, festivales culturales. Días, horarios y cómo llegar.'
    : '8 free events anyone can enjoy in San Luis Potosí: Sunday ciclovía, monthly museum nights, Plaza de Armas concerts, FENAPO, cultural festivals. Days, hours and how to get there.';

  return (
    <>
      <SEO
        title={title}
        description={description}
        keywords="free events San Luis Potosí, eventos gratis SLP, free things to do San Luis Potosi, ciclovía SLP, noche de museos, Plaza de Armas conciertos, FENAPO entrada gratis"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Free Events in San Luis Potosí',
          description,
          numberOfItems: freeEvents.length,
          itemListElement: freeEvents.map((e, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
              '@type': 'Event',
              name: e.name,
              description: e.descEn,
              location: {
                '@type': 'Place',
                name: e.where,
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: 'San Luis Potosí',
                  addressRegion: 'SLP',
                  addressCountry: 'MX',
                },
              },
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'MXN',
                availability: 'https://schema.org/InStock',
              },
            },
          })),
        }}
      />

      <main className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-br from-blue-700 to-indigo-600 py-16 text-white">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold mb-4">
              {isEs ? 'GUÍA GRATIS' : 'FREE GUIDE'}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {isEs ? 'Eventos Gratis en San Luis Potosí' : 'Free Events in San Luis Potosí'}
            </h1>
            <LastUpdated date="2026-04-07" className="text-blue-100 mb-4" />
            <p className="text-lg text-blue-50 max-w-2xl mx-auto">
              {isEs
                ? 'Ocho planes que no cuestan un peso — desde el domingo en la Ciclovía hasta la Procesión del Silencio.'
                : 'Eight plans that cost zero pesos — from Sunday ciclovía to the Silent Procession.'}
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 max-w-4xl py-12">
          <div className="space-y-6">
            {freeEvents.map((e) => (
              <article key={e.name} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                  <h2 className="text-2xl font-bold text-gray-900">{e.name}</h2>
                  <span className="text-xs font-semibold uppercase text-blue-700 bg-blue-50 px-2 py-1 rounded">
                    {e.category}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-3">
                  🗓 <strong>{isEs ? e.frequency : e.frequencyEn}</strong> · {e.hours}
                </p>
                <p className="text-gray-600 mb-3">{isEs ? e.desc : e.descEn}</p>
                <p className="text-sm text-gray-500 mb-3">📍 {e.where}</p>
                <TrackedMapLink
                  href={`https://www.google.com/maps/search/${e.map}`}
                  placeName={e.name}
                  className="inline-flex items-center text-sm text-blue-700 hover:underline font-medium"
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
            { href: '/food-festivals-san-luis-potosi', label: 'Food Festivals in SLP', labelEs: 'Festivales Gastronómicos en SLP' },
            { href: '/family-friendly-activities', label: 'Family-Friendly Activities', labelEs: 'Actividades Familiares' },
            { href: '/farmers-markets-san-luis-potosi', label: 'Farmers Markets in SLP', labelEs: 'Tianguis y Mercados en SLP' },
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
