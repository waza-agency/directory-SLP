import Image from 'next/image';
import Link from 'next/link';

const pueblos = [
  {
    name: 'Real de Catorce',
    badge: 'Pueblo Mágico',
    img: '/images/outdoors/real-de-catorce-main.jpg',
    distance: '260 km · ~3 hrs drive',
    description: 'A former silver-mining ghost town perched at 2,750 m. You enter through the one-lane Ogarrio tunnel and emerge into cobblestone streets, sacred peyote country and a Wim Wenders kind of silence. Pilgrims walk here for the feast of San Francisco (Oct 4).',
    highlights: ['Ogarrio Tunnel entrance', 'Parroquia de la Purísima', 'Jeep tour to Pueblo Fantasma', 'Wixárika cultural heritage'],
    cta: { href: '/real-de-catorce-guide', label: 'Real de Catorce guide' },
  },
  {
    name: 'Xilitla',
    badge: 'Pueblo Mágico',
    img: '/images/outdoors/xilitla.webp',
    distance: '350 km · ~4.5 hrs drive',
    description: 'Home to Las Pozas, the surrealist sculpture garden designed by Edward James in the Huasteca jungle. Spiral staircases climb to nowhere, concrete orchids bloom in the mist and waterfalls cut through the ruins.',
    highlights: ['Las Pozas surrealist garden', 'Edward James castle', 'Sótano de las Huahuas cave', 'Coffee plantations'],
    cta: { href: '/places/las-pozas-xilitla', label: 'Visit Las Pozas' },
  },
  {
    name: 'Aquismón',
    badge: 'Waterfall country',
    img: '/images/outdoors/tamul-waterfall.jpg',
    distance: '380 km · ~5 hrs drive',
    description: 'Gateway to the Huasteca Potosina\'s biggest wonders — the 105m Tamul waterfall, the Sótano de las Golondrinas cave and turquoise rivers. Nearby Tancanhuitz Teenek villages offer deep indigenous culture.',
    highlights: ['Cascada de Tamul', 'Sótano de las Golondrinas', 'Puente de Dios', 'Teenek cultural experiences'],
    cta: { href: '/huasteca-potosina', label: 'Huasteca Potosina guide' },
  },
];

export default function PueblosMagicos() {
  return (
    <section id="pueblos-magicos">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Pueblos Mágicos & Nearby Towns</h2>
      <p className="text-gray-600 mb-6">
        San Luis Potosí state holds two of Mexico's most iconic Pueblos Mágicos, plus the gateway to the Huasteca Potosina waterfalls.
      </p>
      <div className="space-y-4">
        {pueblos.map((p) => (
          <div
            key={p.name}
            className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 grid md:grid-cols-[240px_1fr]"
          >
            <div className="relative aspect-[4/3] md:aspect-auto md:h-full min-h-[200px]">
              <Image src={p.img} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-3 left-3 bg-amber-500 text-white rounded-full px-2.5 py-1 text-xs font-bold shadow">
                ✨ {p.badge}
              </div>
            </div>
            <div className="p-5 md:p-6">
              <div className="flex flex-wrap items-baseline gap-3 mb-2">
                <h3 className="font-bold text-xl text-gray-900">{p.name}</h3>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">📍 {p.distance}</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{p.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {p.highlights.map((h) => (
                  <span key={h} className="text-xs bg-primary/5 text-primary border border-primary/10 px-2.5 py-1 rounded-full">
                    {h}
                  </span>
                ))}
              </div>
              <Link href={p.cta.href} className="inline-flex items-center gap-1 text-primary font-medium text-sm hover:underline">
                {p.cta.label} →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
