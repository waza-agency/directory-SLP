import Link from 'next/link';
import Image from 'next/image';

const souvenirs = [
  {
    name: 'Rebozo',
    emoji: '🧣',
    img: '/images/cultural/culinary-traditions.jpg',
    description: 'Traditional silk or cotton shawls hand-woven in Santa María del Río — a UNESCO intangible heritage craft.',
    price: '$200 - 800 MXN',
  },
  {
    name: 'Chocolates Costanzo',
    emoji: '🍫',
    img: '/images/brands/chocolates-costanzo.jpg',
    description: 'The city\'s beloved artisan chocolatier since 1929. Signature chocolate bars, bombones and drinking chocolate.',
    price: '$80 - 300 MXN',
  },
  {
    name: 'Mezcal Laguna Seca',
    emoji: '🥃',
    img: '/images/brands/la-legendaria-logo.png',
    description: 'Small-batch mezcal from the Altiplano region, made from wild-harvested salmiana agave.',
    price: '$400 - 900 MXN',
  },
  {
    name: 'Cajeta Coronado',
    emoji: '🍯',
    img: '/images/brands/productos-don-tacho.jpg',
    description: 'Classic Mexican goat-milk caramel — perfect on toast, ice cream or eaten straight from the jar.',
    price: '$60 - 150 MXN',
  },
  {
    name: 'Ron Potosí',
    emoji: '🍹',
    img: '/images/brands/ron-potosi.jpg',
    description: 'Locally produced aged rum with smooth vanilla and oak notes. A distinctive gift from the region.',
    price: '$350 - 700 MXN',
  },
  {
    name: 'Cerámica Aguas de Lourdes',
    emoji: '🏺',
    img: '/images/brands/aguas-de-lourdes.jpg',
    description: 'Hand-painted artisan pottery and ceramic water jars from a generations-old local workshop.',
    price: '$150 - 900 MXN',
  },
];

export default function SouvenirGuide() {
  return (
    <section id="souvenirs">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Typical Souvenirs & What to Bring Back</h2>
      <p className="text-gray-600 mb-6">
        Skip the generic gift-shop trinkets. These are the authentic SLP products locals actually buy.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {souvenirs.map((s) => (
          <div
            key={s.name}
            className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-gray-50">
              <Image src={s.img} alt={s.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <span className="text-xl">{s.emoji}</span>
                  {s.name}
                </h3>
                <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">{s.price}</span>
              </div>
              <p className="text-sm text-gray-600">{s.description}</p>
            </div>
          </div>
        ))}
      </div>
      <Link
        href="/brands"
        className="inline-flex items-center gap-2 text-primary font-medium hover:underline mt-5"
      >
        Explore all local brands →
      </Link>
    </section>
  );
}
