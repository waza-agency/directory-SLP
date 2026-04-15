import Link from 'next/link';
import Image from 'next/image';

const tours = [
  {
    name: 'Free Walking Tour',
    img: '/images/cultural/san-luis-potosi-cathedral.jpg',
    price: 'Tip-based',
    duration: '2 hrs',
    schedule: 'Sat 10am · Plaza de Armas',
    description: 'Local guides cover 400 years of history, architecture and urban legends. Ends in front of Teatro de la Paz.',
    cta: { href: '/centro-historico', label: 'About Centro Histórico' },
  },
  {
    name: 'Tranvía San Luis Rey',
    img: '/images/brands/san-luis-rey-tranvia-logo.jpg',
    price: '$80 MXN',
    duration: '45 min',
    schedule: 'Daily · multiple departures',
    description: 'The iconic historic tram loops through the 7 plazas of the Centro Histórico with narrated commentary.',
    cta: { href: '/places/tranvia-san-luis-rey', label: 'Book the tram' },
  },
  {
    name: 'Huasteca Potosina day tour',
    img: '/images/outdoors/tamul-waterfall.jpg',
    price: '$1,200 - 2,500 MXN',
    duration: '12-14 hrs',
    schedule: 'Daily departures',
    description: 'Full-day excursion to Tamul waterfall, Puente de Dios and Sotano de las Golondrinas. Transport and guide included.',
    cta: { href: '/places/corazon-de-xoconostle', label: 'Corazón de Xoconostle' },
  },
  {
    name: 'Real de Catorce tour',
    img: '/images/outdoors/real-de-catorce-main.jpg',
    price: '$800 - 1,500 MXN',
    duration: 'Full day',
    schedule: 'Weekends recommended',
    description: 'Guided drive through the Ogarrio tunnel into the surreal silver-mining ghost town in the high desert.',
    cta: { href: '/places/corazon-de-xoconostle', label: 'Book with a local guide' },
  },
  {
    name: 'Wine & mezcal tasting',
    img: '/images/food/fusion-restaurant.jpg',
    price: '$600 - 1,200 MXN',
    duration: '3-4 hrs',
    schedule: 'Thu-Sun',
    description: 'Visit local bodegas in the Altiplano or taste artisan mezcal from Laguna Seca with curated pairings.',
    cta: { href: '/brands', label: 'Local producers' },
  },
];

export default function ToursAndExperiences() {
  return (
    <section id="tours">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Tours & Experiences to Book</h2>
      <p className="text-gray-600 mb-6">
        From free walking tours to full-day adventures — here is what is worth booking.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tours.map((t) => (
          <div
            key={t.name}
            className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image src={t.img} alt={t.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-3 right-3 bg-primary text-white rounded-full px-3 py-1 text-xs font-bold shadow">
                {t.price}
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="font-semibold text-gray-900 mb-1">{t.name}</h3>
              <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                <span>⏱ {t.duration}</span>
                <span>•</span>
                <span>{t.schedule}</span>
              </div>
              <p className="text-sm text-gray-600 mb-4 flex-1">{t.description}</p>
              <Link
                href={t.cta.href}
                className="inline-flex items-center gap-1 text-primary font-medium text-sm hover:underline mt-auto"
              >
                {t.cta.label} →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
