import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { ArrowLeftIcon, CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline';
import SEO from '@/components/common/SEO';
import GuideCTA from '@/components/common/GuideCTA';
import { supabase } from '@/lib/supabase';
import { Event } from '@/types';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const { data: familyEvents } = await supabase
    .from('events')
    .select('*')
    .eq('family_friendly', true)
    .gte('end_date', new Date().toISOString())
    .order('start_date', { ascending: true })
    .limit(6);

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'es', ['common'])),
      familyEvents: familyEvents || [],
    },
    revalidate: 3600,
  };
};

const outdoorPlaces = [
  {
    name: 'Parque Tangamanga I',
    desc: 'El parque urbano más grande de SLP con zoológico, lago, canchas, áreas de picnic, Laberinto de las Ciencias y senderos para bici.',
    descEn: 'SLP\'s largest urban park with zoo, lake, sports courts, picnic areas, science museum, and bike trails.',
    price: 'Gratis', priceEn: 'Free',
    hours: 'Lun 5AM-11AM | Mar-Sáb 5AM-10:30PM | Dom 5AM-6PM', hoursEn: 'Mon 5AM-11AM | Tue-Sat 5AM-10:30PM | Sun 5AM-6PM',
    ages: '0-99', icon: '🌳', tip: 'Lleva bicicleta y protector solar. El zoológico abre Mar-Dom 9AM-5PM',
    tipEn: 'Bring a bike and sunscreen. Zoo open Tue-Sun 9AM-5PM',
    map: 'Parque+Tangamanga+I+San+Luis+Potosi',
  },
  {
    name: 'Parque Tangamanga II',
    desc: 'Segundo parque con canchas deportivas, lago y áreas verdes más tranquilas. Ideal para días relajados.',
    descEn: 'Second park with sports courts, lake, and quieter green areas. Perfect for relaxed days.',
    price: 'Gratis', priceEn: 'Free',
    hours: 'Lun 5AM-11AM | Mar-Sáb 5AM-10:30PM | Dom 5AM-6PM', hoursEn: 'Mon 5AM-11AM | Tue-Sat 5AM-10:30PM | Sun 5AM-6PM',
    ages: '0-99', icon: '🏞️', tip: 'Menos concurrido que Tangamanga I',
    tipEn: 'Less crowded than Tangamanga I',
    map: 'Parque+Tangamanga+II+San+Luis+Potosi',
  },
  {
    name: 'Ciclovía Dominical (Av. Carranza)',
    desc: 'Cada domingo la avenida más icónica se cierra al tráfico para ciclistas, patinadores y familias. Renta de bicis disponible.',
    descEn: 'Every Sunday the most iconic avenue closes to traffic for cyclists, skaters, and families. Bike rentals available.',
    price: 'Gratis', priceEn: 'Free',
    hours: 'Dom 8AM-1PM', hoursEn: 'Sun 8AM-1PM',
    ages: '0-99', icon: '🚴', tip: 'Llega temprano para rentar bici (~$50-100 MXN/hr)',
    tipEn: 'Arrive early to rent a bike (~$50-100 MXN/hr)',
    map: 'Avenida+Venustiano+Carranza+San+Luis+Potosi',
  },
  {
    name: 'Presa de San José',
    desc: 'Presa histórica inaugurada en 1903 con paseo peatonal, senderos para correr y andar en bici, vistas al cerro y puestos de gorditas los fines de semana.',
    descEn: 'Historic dam built in 1903 with pedestrian walkway, running and cycling trails, hill views, and gorditas food stands on weekends.',
    price: 'Gratis', priceEn: 'Free',
    hours: 'Diario — consultar estatus de apertura', hoursEn: 'Daily — check current opening status',
    ages: '0-99', icon: '💧',
    tip: 'Área natural protegida. Puede tener cierres temporales por mantenimiento — verifica antes de ir',
    tipEn: 'Protected natural area. May have temporary closures for maintenance — verify before going',
    map: 'Presa+de+San+Jose+San+Luis+Potosi',
  },
  {
    name: 'Parque Bicentenario (IMMSA)',
    desc: 'Parque urbano moderno con pista de ciclismo, skatepark, áreas de juegos infantiles, anfiteatro al aire libre, zonas de ejercicio y Museo de la Energía.',
    descEn: 'Modern urban park with cycling track, skatepark, children\'s playgrounds, outdoor amphitheater, exercise zones, and Energy Museum.',
    price: 'Gratis', priceEn: 'Free',
    hours: 'Diario 7AM-6PM', hoursEn: 'Daily 7AM-6PM',
    ages: '0-99', icon: '🚴‍♂️',
    tip: 'Antigua planta de cobre reconvertida en parque. Tiene 6 áreas de baños gratuitos y miradores',
    tipEn: 'Former copper plant converted into park. Has 6 free bathroom areas and viewpoints',
    map: 'Parque+Bicentenario+IMMSA+San+Luis+Potosi',
  },
  {
    name: 'Rancho La Estación',
    desc: '9 hectáreas de rancho campestre a 10 min de la ciudad. Tirolesa, muro de escalada, rapel, tiro con arco, cabalgata, chapoteadero con agua caliente y granja con animales.',
    descEn: '9-hectare country ranch 10 min from the city. Zip-line, climbing wall, rappelling, archery, horseback riding, heated splash pool, and farm animals.',
    price: 'Consultar precios (varía por evento/grupo)', priceEn: 'Check prices (varies by event/group)',
    hours: 'Con reservación', hoursEn: 'By reservation',
    ages: '3-99', icon: '🐴',
    tip: 'Ideal para grupos y eventos familiares. Contacto: 444-391-2442 | rancholaestacion.com',
    tipEn: 'Great for groups and family events. Contact: 444-391-2442 | rancholaestacion.com',
    website: 'https://www.rancholaestacion.com/',
    map: 'Rancho+La+Estacion+San+Luis+Potosi',
  },
];

const indoorPlaces = [
  {
    name: 'Kidiverso',
    desc: 'Parque infantil con trampolines, laberintos, resbaladillas, inflables, pared de escalada, carrusel, alberca de pelotas, área de bebés y cancha de fútbol. También ofrecen fiestas privadas.',
    descEn: 'Kids\' park with trampolines, mazes, slides, inflatables, climbing wall, carousel, ball pit, baby area, and soccer field. Also offer private parties.',
    price: 'Desde $90 MXN (bebés) — consultar precios en sitio', priceEn: 'From $90 MXN (toddlers) — check current prices on-site',
    hours: 'Mar-Vie 1PM-8PM | Sáb-Dom 2PM-8PM', hoursEn: 'Tue-Fri 1PM-8PM | Sat-Sun 2PM-8PM',
    ages: '1-12', icon: '🎢',
    tip: 'Ubicado en Carr. Guadalajara 1235, Lomas del Tecnológico. Grupos de 5+ niños tienen 10% descuento',
    tipEn: 'Located at Carr. Guadalajara 1235, Lomas del Tecnológico. Groups of 5+ kids get 10% discount',
    website: 'https://kidiverso.mx/',
    map: 'Kidiverso+San+Luis+Potosi',
  },
  {
    name: 'Jumparks SLP',
    desc: 'El parque de trampolines más grande de la ciudad. Camas elásticas, fosa de espuma, pared ninja, dodgeball y zona para pequeños.',
    descEn: 'The city\'s largest trampoline park. Trampolines, foam pit, ninja wall, dodgeball, and toddler zone.',
    price: '$189-279 MXN por persona (~$11-16 USD)', priceEn: '$189-279 MXN per person (~$11-16 USD)',
    hours: 'Lun-Dom 11AM-8PM', hoursEn: 'Mon-Sun 11AM-8PM',
    ages: '3-99', icon: '🤸',
    tip: 'Calcetines antideslizantes obligatorios (se venden en el lugar)',
    tipEn: 'Non-slip socks required (sold on-site)',
    map: 'Jumparks+San+Luis+Potosi',
  },
  {
    name: 'Laberinto de las Ciencias y las Artes',
    desc: 'Museo interactivo dentro de Tangamanga con experimentos científicos, planetario, área de agua y exhibiciones rotativas.',
    descEn: 'Interactive museum inside Tangamanga with science experiments, planetarium, water area, and rotating exhibits.',
    price: '$50 MXN entrada general (~$3 USD)', priceEn: '$50 MXN general admission (~$3 USD)',
    hours: 'Mar-Vie 9AM-4PM | Sáb-Dom 11AM-7PM', hoursEn: 'Tue-Fri 9AM-4PM | Sat-Sun 11AM-7PM',
    ages: '3-99', icon: '🔬',
    tip: 'El planetario tiene horarios limitados, consulta al llegar',
    tipEn: 'Planetarium has limited showtimes, check on arrival',
    map: 'Museo+Laberinto+de+las+Ciencias+San+Luis+Potosi',
  },
  {
    name: 'Bol Tanga (Boliche)',
    desc: 'Centro de boliche moderno con lanes iluminados, snack bar y ambiente familiar. Perfecto para tardes lluviosas.',
    descEn: 'Modern bowling center with lit lanes, snack bar, and family atmosphere. Perfect for rainy afternoons.',
    price: '$100-150 MXN por persona/juego (~$6-9 USD)', priceEn: '$100-150 MXN per person/game (~$6-9 USD)',
    hours: 'Lun-Dom 12PM-10PM', hoursEn: 'Mon-Sun 12PM-10PM',
    ages: '4-99', icon: '🎳',
    tip: 'Martes y miércoles suelen tener promociones',
    tipEn: 'Tuesday and Wednesday usually have promotions',
    map: 'Bol+Tanga+Boliche+San+Luis+Potosi',
  },
  {
    name: 'Lost Box — Laser Tag',
    desc: 'Arena de laser tag con escenarios temáticos, efectos de luz y juego en equipo. También tienen escape rooms.',
    descEn: 'Laser tag arena with themed scenarios, light effects, and team play. They also have escape rooms.',
    price: '$150-200 MXN por persona (~$9-12 USD)', priceEn: '$150-200 MXN per person (~$9-12 USD)',
    hours: 'Lun-Dom 12PM-9PM', hoursEn: 'Mon-Sun 12PM-9PM',
    ages: '6-99', icon: '🎯',
    tip: 'Reserva para grupos de 8+ con anticipación',
    tipEn: 'Book ahead for groups of 8+',
    map: 'Lost+Box+Laser+Tag+San+Luis+Potosi',
  },
  {
    name: 'Go-Karts SLP',
    desc: 'Pista de go-karts con carreras para adultos y karts especiales para niños. Emoción sobre ruedas para toda la familia.',
    descEn: 'Go-kart track with adult races and special karts for kids. Wheeled thrills for the whole family.',
    price: '$150-250 MXN por carrera (~$9-15 USD)', priceEn: '$150-250 MXN per race (~$9-15 USD)',
    hours: 'Vie-Dom 11AM-8PM', hoursEn: 'Fri-Sun 11AM-8PM',
    ages: '5-99', icon: '🏎️',
    tip: 'Los fines de semana tienen más horarios disponibles',
    tipEn: 'Weekends have more available time slots',
    map: 'Go+Karts+San+Luis+Potosi',
  },
  {
    name: 'Enigma Rooms (Escape Room)',
    desc: 'Salas de escape temáticas donde la familia trabaja en equipo para resolver acertijos y escapar antes del tiempo. Varias dificultades disponibles.',
    descEn: 'Themed escape rooms where the family works together to solve puzzles and escape before time runs out. Various difficulty levels.',
    price: '$200-300 MXN por persona (~$12-17 USD)', priceEn: '$200-300 MXN per person (~$12-17 USD)',
    hours: 'Lun-Dom 12PM-9PM', hoursEn: 'Mon-Sun 12PM-9PM',
    ages: '8-99', icon: '🔐',
    tip: 'Calificado 5.0/5 en TripAdvisor. Ideal para familias con niños mayores de 8',
    tipEn: 'Rated 5.0/5 on TripAdvisor. Best for families with kids 8+',
    map: 'Enigma+Rooms+San+Luis+Potosi',
  },
  {
    name: 'Jaulas de Bateo Mont Park',
    desc: 'Centro de bateo con jaulas de diferentes velocidades para niños y adultos. Diversión deportiva para practicar béisbol y softbol.',
    descEn: 'Batting center with cages at different speeds for kids and adults. Sports fun for baseball and softball practice.',
    price: '$80-150 MXN por ronda (~$5-9 USD)', priceEn: '$80-150 MXN per round (~$5-9 USD)',
    hours: 'Lun-Dom 10AM-9PM', hoursEn: 'Mon-Sun 10AM-9PM',
    ages: '5-99', icon: '⚾',
    tip: 'Tiene jaulas de velocidad baja para principiantes y niños',
    tipEn: 'Has low-speed cages for beginners and kids',
    map: 'Jaulas+de+Bateo+Mont+Park+San+Luis+Potosi',
  },
];

const culturePlaces = [
  {
    name: 'Centro de las Artes',
    desc: 'Antigua penitenciaría convertida en centro cultural con talleres de arte, galerías y la Sala Leonora Carrington.',
    descEn: 'Former penitentiary turned cultural center with art workshops, galleries, and the Leonora Carrington Room.',
    price: 'Gratis', priceEn: 'Free',
    hours: 'Mar-Dom 10AM-6PM', hoursEn: 'Tue-Sun 10AM-6PM',
    ages: '0-99', icon: '🎨',
    tip: 'Los talleres infantiles de fin de semana son gratuitos',
    tipEn: 'Weekend kids\' workshops are free',
    map: 'Centro+de+las+Artes+San+Luis+Potosi',
  },
  {
    name: 'Museo Nacional de la Máscara',
    desc: 'Más de 1,300 máscaras ceremoniales de todo México. A los niños les fascina la variedad de diseños y colores.',
    descEn: 'Over 1,300 ceremonial masks from across Mexico. Kids love the variety of designs and colors.',
    price: '$20 MXN general / $10 niños y estudiantes (~$1.15 USD). Gratis los martes', priceEn: '$20 MXN general / $10 kids & students (~$1.15 USD). Free on Tuesdays',
    hours: 'Lun-Sáb 10AM-9PM | Dom 11AM-7PM', hoursEn: 'Mon-Sat 10AM-9PM | Sun 11AM-7PM',
    ages: '3-99', icon: '🎭',
    tip: 'Los martes la entrada es gratuita. En el Centro Histórico, combínalo con un paseo por las plazas',
    tipEn: 'Free admission on Tuesdays. In Centro Histórico, combine with a walk around the plazas',
    map: 'Museo+Nacional+de+la+Mascara+San+Luis+Potosi',
  },
  {
    name: 'San Luis Rey (Tranvía)',
    desc: 'Recorrido narrado en tranvía por el centro histórico. Historia, arquitectura y leyendas de la ciudad.',
    descEn: 'Narrated trolley tour through the historic center. History, architecture, and city legends.',
    price: '$50 MXN adultos / $35 niños (~$3/$2 USD)', priceEn: '$50 MXN adults / $35 kids (~$3/$2 USD)',
    hours: 'Salidas desde Plaza de Armas', hoursEn: 'Departures from Plaza de Armas',
    ages: '3-99', icon: '🚋',
    tip: 'Los recorridos nocturnos de leyendas son geniales para niños mayores',
    tipEn: 'Night legend tours are great for older kids',
    map: 'Tranvia+Turistico+San+Luis+Rey+San+Luis+Potosi',
  },
];

const familyPlans = [
  {
    title: 'Día de Aventura',
    titleEn: 'Adventure Day',
    budget: '$1,500-2,500 MXN',
    budgetEn: '$85-145 USD',
    schedule: [
      { time: '9:00', act: 'Desayuno en La Parroquia Potosina', actEn: 'Breakfast at La Parroquia Potosina' },
      { time: '10:30', act: 'Parque Tangamanga - Zoológico y lago', actEn: 'Tangamanga Park - Zoo and lake' },
      { time: '13:30', act: 'Almuerzo picnic en el parque', actEn: 'Picnic lunch in the park' },
      { time: '15:00', act: 'Jumparks o Go-Karts', actEn: 'Jumparks or Go-Karts' },
      { time: '18:00', act: 'Helado en La Flor de SLP', actEn: 'Ice cream at La Flor de SLP' },
    ],
    color: 'green',
  },
  {
    title: 'Día Cultural',
    titleEn: 'Culture Day',
    budget: '$800-1,500 MXN',
    budgetEn: '$45-85 USD',
    schedule: [
      { time: '9:00', act: 'Desayuno en Sanborns o VIPS', actEn: 'Breakfast at Sanborns or VIPS' },
      { time: '10:30', act: 'Laberinto de las Ciencias', actEn: 'Laberinto Science Museum' },
      { time: '13:00', act: 'San Luis Rey Tranvía', actEn: 'San Luis Rey Trolley Tour' },
      { time: '14:30', act: 'Comida en La Oruga y la Cebolla', actEn: 'Lunch at La Oruga y la Cebolla' },
      { time: '16:30', act: 'Museo de la Máscara + paseo Centro', actEn: 'Mask Museum + Centro walk' },
    ],
    color: 'blue',
  },
  {
    title: 'Domingo en Familia',
    titleEn: 'Family Sunday',
    budget: '$600-1,200 MXN',
    budgetEn: '$35-70 USD',
    schedule: [
      { time: '8:00', act: 'Ciclovía en Av. Carranza', actEn: 'Ciclovía on Av. Carranza' },
      { time: '10:30', act: 'Desayuno en El Mesón de San Pascual', actEn: 'Breakfast at El Mesón de San Pascual' },
      { time: '12:00', act: 'Kidiverso o Boliche', actEn: 'Kidiverso or Bowling' },
      { time: '14:30', act: 'Comida en Peter Piper Pizza', actEn: 'Lunch at Peter Piper Pizza' },
      { time: '16:00', act: 'Helado y paseo en Plaza Citadina', actEn: 'Ice cream and stroll at Plaza Citadina' },
    ],
    color: 'orange',
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  green: { bg: 'bg-green-50', border: 'border-green-300', text: 'text-green-700', badge: 'bg-green-600' },
  blue: { bg: 'bg-blue-50', border: 'border-blue-300', text: 'text-blue-700', badge: 'bg-blue-600' },
  orange: { bg: 'bg-orange-50', border: 'border-orange-300', text: 'text-orange-700', badge: 'bg-orange-600' },
};

export default function FamilyFriendlyActivities({ familyEvents = [] }: { familyEvents?: Event[] }) {
  const { locale } = useRouter();
  const isEs = locale === 'es';

  const pageTitle = isEs
    ? 'Family Friendly Activities en San Luis Potosí — Guía Completa de Actividades Familiares con Precios y Horarios'
    : 'Family Friendly Activities in San Luis Potosí — Complete Guide with Prices, Hours & Plans';
  const pageDesc = isEs
    ? '30+ planes familiares en SLP con precios, horarios y edades. Parques, trampolines, museos, go-karts y más — encuentra el plan perfecto para este fin de semana.'
    : '30+ family plans in San Luis Potosí with prices, hours and age ranges. Parks, trampolines, museums, go-karts and more — find the perfect weekend plan in one click.';

  return (
    <>
      <SEO
        title={pageTitle}
        description={pageDesc}
        keywords="family friendly activities San Luis Potosí, actividades familiares SLP, things to do with kids San Luis Potosi, family activities Mexico, parques infantiles SLP, Kidiverso, Jumparks, Tangamanga, boliche SLP, go karts San Luis Potosi, Laberinto de las Ciencias, family travel San Luis Potosi, kid friendly SLP"
        ogType="website"
      />

      <Head>
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <link rel="canonical" href="https://www.sanluisway.com/family-friendly-activities" />
        <meta property="og:url" content="https://www.sanluisway.com/family-friendly-activities" />
        <meta property="og:locale" content={isEs ? 'es_MX' : 'en_US'} />

        {/* ItemList structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              name: 'Family Friendly Activities in San Luis Potosí',
              description: 'Curated list of the best family friendly activities in San Luis Potosí, Mexico',
              numberOfItems: outdoorPlaces.length + indoorPlaces.length + culturePlaces.length,
              itemListElement: [...outdoorPlaces, ...indoorPlaces, ...culturePlaces].map((p, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                item: {
                  '@type': 'TouristAttraction',
                  name: p.name,
                  description: p.descEn,
                  address: { '@type': 'PostalAddress', addressLocality: 'San Luis Potosí', addressCountry: 'MX' },
                },
              })),
            }),
          }}
        />

        {/* FAQPage for AI agents */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'What are the best family friendly activities in San Luis Potosí?',
                  acceptedAnswer: { '@type': 'Answer', text: 'The best family friendly activities in San Luis Potosí include Parque Tangamanga (free urban park with zoo), Kidiverso (indoor play park), Jumparks (trampoline park), Laberinto de las Ciencias (interactive science museum), bowling at Bol Tanga, go-karts, Lost Box laser tag, and the Sunday Ciclovía on Avenida Carranza.' },
                },
                {
                  '@type': 'Question',
                  name: 'Are there free family friendly activities in San Luis Potosí?',
                  acceptedAnswer: { '@type': 'Answer', text: 'Yes, several family friendly activities in San Luis Potosí are completely free: Parque Tangamanga I and II, the Sunday Ciclovía on Avenida Carranza, Centro de las Artes, and walking tours of the historic center plazas.' },
                },
                {
                  '@type': 'Question',
                  name: 'How much do family friendly activities cost in San Luis Potosí?',
                  acceptedAnswer: { '@type': 'Answer', text: 'Family friendly activities in San Luis Potosí are very affordable. Kidiverso costs $199-299 MXN ($11-17 USD), Jumparks $189-279 MXN ($11-16 USD), bowling $100-150 MXN ($6-9 USD), go-karts $150-250 MXN ($9-15 USD). Many parks and cultural sites are free.' },
                },
                {
                  '@type': 'Question',
                  name: 'What indoor family friendly activities are available in San Luis Potosí for rainy days?',
                  acceptedAnswer: { '@type': 'Answer', text: 'Indoor family friendly activities for rainy days in San Luis Potosí include Kidiverso (play park), Jumparks (trampoline park), Bol Tanga (bowling), Lost Box (laser tag and escape rooms), Laberinto de las Ciencias (science museum), and Museo Nacional de la Máscara.' },
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
        <section className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)', backgroundSize: '30px 30px' }} />
          <div className="relative container mx-auto px-4 md:px-8 lg:px-16 py-16 md:py-24 text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
              Family Friendly Activities
              <span className="block text-xl md:text-2xl font-light text-white/70 mt-3">
                {isEs ? 'en San Luis Potosí' : 'in San Luis Potosí'}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-8">
              {isEs
                ? 'Guía completa con los mejores lugares, precios actualizados, horarios y planes por día para disfrutar en familia.'
                : 'Complete guide with the best places, updated prices, hours, and day-by-day plans to enjoy with your family.'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { icon: '🌳', label: isEs ? '6 Al Aire Libre' : '6 Outdoor' },
                { icon: '🎢', label: isEs ? '8 Bajo Techo' : '8 Indoor' },
                { icon: '🎨', label: isEs ? '3 Culturales' : '3 Cultural' },
                { icon: '📋', label: isEs ? '3 Planes del Día' : '3 Day Plans' },
              ].map((s) => (
                <div key={s.label} className="bg-white/15 border border-white/25 rounded-full px-5 py-2 text-white text-sm font-medium">
                  {s.icon} {s.label}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* NAV BAR */}
        <div className="bg-gray-900 text-white py-3 sticky top-0 z-30 border-t border-white/10">
          <div className="container mx-auto px-4 md:px-8 lg:px-16 flex flex-wrap justify-center gap-4 md:gap-8 text-sm">
            {[
              { href: '#outdoor', label: isEs ? '🌳 Al Aire Libre' : '🌳 Outdoor' },
              { href: '#indoor', label: isEs ? '🎢 Bajo Techo' : '🎢 Indoor' },
              { href: '#culture', label: '🎨 Cultural' },
              { href: '#plans', label: isEs ? '📋 Planes' : '📋 Day Plans' },
              { href: '#tips', label: isEs ? '💡 Consejos' : '💡 Tips' },
              ...(familyEvents.length > 0 ? [{ href: '#events', label: isEs ? '📅 Eventos' : '📅 Events' }] : []),
            ].map((l) => (
              <a key={l.href} href={l.href} className="hover:text-orange-300 transition-colors">{l.label}</a>
            ))}
          </div>
        </div>

        {/* UPCOMING FAMILY EVENTS */}
        {familyEvents.length > 0 && (
          <section className="py-16 bg-green-50" id="events">
            <div className="container mx-auto px-4 md:px-8 lg:px-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-3 text-center">
                {isEs ? 'Eventos Familiares Próximos' : 'Upcoming Family Events'}
              </h2>
              <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
                {isEs ? 'Eventos especiales para disfrutar en familia' : 'Special events to enjoy with the whole family'}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {familyEvents.map((event) => (
                  <Link
                    key={event.id}
                    href={`/events/${event.category}/${event.id}`}
                    className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
                  >
                    <div className="relative h-48 overflow-hidden">
                      {event.image_url ? (
                        <Image
                          src={event.image_url}
                          alt={event.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600" />
                      )}
                      <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Family Friendly
                      </span>
                      {event.cost && (
                        <span className="absolute top-3 right-3 px-2.5 py-1 text-xs font-semibold rounded-full bg-white text-gray-800">
                          {event.cost}
                        </span>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-green-600 transition-colors line-clamp-2">
                        {event.title}
                      </h3>
                      <div className="space-y-1.5 text-sm text-gray-500 mb-3">
                        <p className="flex items-center gap-1.5">
                          <CalendarIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          {new Date(event.start_date).toLocaleDateString(isEs ? 'es-MX' : 'en-US', {
                            weekday: 'long', month: 'long', day: 'numeric',
                            timeZone: 'America/Mexico_City',
                          })}
                        </p>
                        <p className="flex items-center gap-1.5">
                          <MapPinIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <span className="truncate">{event.location}</span>
                        </p>
                      </div>
                      {event.description && (
                        <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link
                  href="/events/community-social"
                  className="inline-flex items-center gap-2 bg-green-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-green-700 transition-colors"
                >
                  {isEs ? 'Ver todos los eventos familiares' : 'View all family events'} →
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* OUTDOOR */}
        <section className="py-16 bg-white" id="outdoor">
          <div className="container mx-auto px-4 md:px-8 lg:px-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-3 text-center">
              🌳 {isEs ? 'Family Friendly Activities al Aire Libre' : 'Outdoor Family Friendly Activities'}
            </h2>
            <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
              {isEs ? 'Parques, ciclovía y naturaleza — muchas opciones gratuitas' : 'Parks, cycling, and nature — many free options'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {outdoorPlaces.map((p) => (
                <PlaceCard key={p.name} place={p} isEs={isEs} />
              ))}
            </div>
          </div>
        </section>

        {/* INDOOR */}
        <section className="py-16 bg-gray-50" id="indoor">
          <div className="container mx-auto px-4 md:px-8 lg:px-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-3 text-center">
              🎢 {isEs ? 'Family Friendly Activities Bajo Techo' : 'Indoor Family Friendly Activities'}
            </h2>
            <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
              {isEs ? 'Perfectas para días lluviosos o tardes calurosas' : 'Perfect for rainy days or hot afternoons'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {indoorPlaces.map((p) => (
                <PlaceCard key={p.name} place={p} isEs={isEs} />
              ))}
            </div>
          </div>
        </section>

        {/* CULTURE */}
        <section className="py-16 bg-white" id="culture">
          <div className="container mx-auto px-4 md:px-8 lg:px-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-3 text-center">
              🎨 {isEs ? 'Family Friendly Activities Culturales' : 'Cultural Family Friendly Activities'}
            </h2>
            <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
              {isEs ? 'Museos, arte y recorridos que toda la familia disfrutará' : 'Museums, art, and tours the whole family will enjoy'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {culturePlaces.map((p) => (
                <PlaceCard key={p.name} place={p} isEs={isEs} />
              ))}
            </div>
          </div>
        </section>

        {/* DAY PLANS */}
        <section className="py-16 bg-gray-50" id="plans">
          <div className="container mx-auto px-4 md:px-8 lg:px-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-3 text-center">
              📋 {isEs ? 'Planes del Día para Family Friendly Activities' : 'Day Plans for Family Friendly Activities'}
            </h2>
            <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
              {isEs ? '3 itinerarios listos para usar con presupuesto estimado' : '3 ready-to-use itineraries with estimated budgets'}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {familyPlans.map((plan) => {
                const c = colorMap[plan.color];
                return (
                  <div key={plan.title} className={`${c.bg} border-2 ${c.border} rounded-2xl overflow-hidden`}>
                    <div className={`${c.badge} px-6 py-4 text-white`}>
                      <h3 className="text-xl font-bold">{isEs ? plan.title : plan.titleEn}</h3>
                      <p className="text-sm text-white/80">{isEs ? 'Presupuesto familia de 4' : 'Budget for family of 4'}: {isEs ? plan.budget : plan.budgetEn}</p>
                    </div>
                    <div className="p-6 space-y-4">
                      {plan.schedule.map((s) => (
                        <div key={s.time} className="flex items-start gap-3">
                          <span className={`flex-shrink-0 ${c.text} font-bold text-sm w-12`}>{s.time}</span>
                          <span className="text-gray-700 text-sm">{isEs ? s.act : s.actEn}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* TIPS */}
        <section className="py-16 bg-white" id="tips">
          <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-12 text-center">
              💡 {isEs ? 'Consejos para Family Friendly Activities en SLP' : 'Tips for Family Friendly Activities in SLP'}
            </h2>
            <div className="space-y-4">
              {[
                { color: 'green', icon: '☀️', text: isEs ? 'El clima de SLP es semiárido. Lleva protector solar, gorra y agua, especialmente para actividades al aire libre entre 11AM-3PM.' : 'SLP has a semi-arid climate. Bring sunscreen, a cap, and water, especially for outdoor activities between 11AM-3PM.' },
                { color: 'blue', icon: '🚗', text: isEs ? 'Uber y DiDi funcionan bien en toda la ciudad. Para recorrer varios lugares en un día, considera rentar auto — el estacionamiento es barato ($20-40 MXN/hr).' : 'Uber and DiDi work well throughout the city. To visit multiple places in a day, consider renting a car — parking is cheap ($20-40 MXN/hr).' },
                { color: 'amber', icon: '💰', text: isEs ? 'Muchas family friendly activities en SLP son gratis o cuestan menos de $200 MXN por persona. Comer en fondas locales cuesta $60-100 MXN por persona vs $200+ en restaurantes.' : 'Many family friendly activities in SLP are free or under $200 MXN per person. Eating at local fondas costs $60-100 MXN per person vs $200+ at restaurants.' },
                { color: 'purple', icon: '📅', text: isEs ? 'Los fines de semana son más concurridos. Para evitar filas en Kidiverso y Jumparks, ve entre semana o llega temprano.' : 'Weekends are busier. To avoid lines at Kidiverso and Jumparks, go on weekdays or arrive early.' },
                { color: 'red', icon: '🏥', text: isEs ? 'Farmacias están en todas partes. Para emergencias: Hospital Lomas (privado) y Star Médica. Número de emergencias: 911.' : 'Pharmacies are everywhere. For emergencies: Hospital Lomas (private) and Star Médica. Emergency number: 911.' },
              ].map((tip) => (
                <div key={tip.icon} className={`bg-${tip.color}-50 border-l-4 border-${tip.color}-400 p-4 rounded-r-lg`}>
                  <p className={`text-${tip.color}-800`}><strong>{tip.icon}</strong> {tip.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 md:px-8 lg:px-16 py-8">
          <GuideCTA relatedLinks={[
            { href: '/free-events-san-luis-potosi', label: 'Free Events', labelEs: 'Eventos Gratis' },
            { href: '/parque-tangamanga', label: 'Parque Tangamanga Guide', labelEs: 'Guía Tangamanga' },
            { href: '/weekend-getaways', label: 'Weekend Getaways', labelEs: 'Escapadas de Fin de Semana' },
            { href: '/resources/family-guide', label: 'Family Guide', labelEs: 'Guía Familiar' },
          ]} />
        </div>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 text-white">
          <div className="container mx-auto px-4 md:px-8 lg:px-16 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              {isEs ? '¡Planea tus Family Friendly Activities!' : 'Plan Your Family Friendly Activities!'}
            </h2>
            <p className="text-white/70 max-w-xl mx-auto mb-8">
              {isEs
                ? '¿Necesitas recomendaciones personalizadas? Contáctanos para ayudarte a planear el día perfecto en familia.'
                : 'Need personalized recommendations? Contact us to help plan the perfect family day.'}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-purple-700 font-bold px-8 py-4 rounded-full hover:bg-purple-50 transition-colors shadow-lg">
                {isEs ? 'Contáctanos' : 'Contact Us'} →
              </Link>
              <Link href="/blog/fin-de-semana-familiar-san-luis-potosi-parques-go-karts-ninos" className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/30 text-white font-bold px-8 py-4 rounded-full hover:bg-white/20 transition-colors">
                {isEs ? 'Guía de Fin de Semana' : 'Weekend Guide'} →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

function PlaceCard({ place, isEs }: { place: any; isEs: boolean }) {
  const mapsUrl = place.map ? `https://www.google.com/maps/search/?api=1&query=${place.map}` : undefined;

  return (
    <a
      href={mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-orange-300 hover:shadow-lg transition-all cursor-pointer group"
    >
      <div className="flex items-start gap-3 mb-3">
        <span className="text-3xl">{place.icon}</span>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors">{place.name}</h3>
            <span className="text-gray-400 group-hover:text-orange-500 transition-colors text-sm">📍</span>
          </div>
          <span className="text-xs text-gray-400">{isEs ? 'Edades' : 'Ages'}: {place.ages}</span>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-4">{isEs ? place.desc : place.descEn}</p>
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-green-600 font-bold">💲</span>
          <span className="text-gray-700">{isEs ? place.price : place.priceEn}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-blue-600 font-bold">🕐</span>
          <span className="text-gray-700">{isEs ? place.hours : place.hoursEn}</span>
        </div>
        <div className="flex items-center gap-2 bg-amber-50 rounded-lg px-3 py-1.5">
          <span className="text-amber-600 font-bold">💡</span>
          <span className="text-amber-800 text-xs">{isEs ? place.tip : place.tipEn}</span>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-3">
        {place.website && (
          <span className="text-xs text-blue-600 underline">
            {isEs ? 'Sitio web' : 'Website'} ↗
          </span>
        )}
        <span className="text-xs text-orange-600 font-semibold group-hover:underline">
          {isEs ? 'Ver en Google Maps' : 'View on Google Maps'} →
        </span>
      </div>
    </a>
  );
}
