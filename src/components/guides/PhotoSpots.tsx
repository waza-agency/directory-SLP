import Image from 'next/image';

const spots = [
  {
    name: 'Plaza de Armas at golden hour',
    img: '/images/blog/centro-san-luis/hero-Centro-Historico.jpg',
    tip: 'Arrive 30 min before sunset. The Cathedral facade lights up with warm tones while locals gather on the benches.',
  },
  {
    name: 'Caja del Agua',
    img: '/images/cultural/museum.jpg',
    tip: 'Shoot from the staircase opposite for a symmetrical frame of this neoclassical fountain. Best midmorning when shadows are soft.',
  },
  {
    name: 'Teatro de la Paz facade',
    img: '/images/cultural/teatro-de-la-paz.jpg',
    tip: 'The portico columns frame dramatic portraits. Come after dusk when the facade is illuminated in amber light.',
  },
  {
    name: 'Templo del Carmen',
    img: '/images/cultural/san-luis-potosi-cathedral.jpg',
    tip: 'The Churrigueresque facade is best photographed in the morning when the east light hits it directly. A wide lens captures the full tile dome.',
  },
  {
    name: 'Parque Tangamanga at sunrise',
    img: '/images/parque-tangamanga/lake.jpg',
    tip: 'The lakes at Tangamanga mirror the sky at dawn. Arrive 15 min before sunrise for dreamy reflections and no crowds.',
  },
  {
    name: 'Hotel Museo rooftop',
    img: '/images/cultural/museo-federico-silva.jpg',
    tip: 'Book a drink at the rooftop bar of Hotel Museo Palacio de San Agustín for a bird-eye view of the historic skyline — especially magical at dusk.',
  },
];

export default function PhotoSpots() {
  return (
    <section id="photo-spots">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Photo Spots & Instagram-Worthy Locations</h2>
      <p className="text-gray-600 mb-6">
        Six places where SLP looks its absolute best — and what time to show up.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {spots.map((s, i) => (
          <div
            key={s.name}
            className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={s.img}
                alt={s.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur rounded-full px-2.5 py-1 text-xs font-bold text-gray-900">
                #{i + 1}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">{s.name}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                <span className="font-semibold text-primary">📸 </span>{s.tip}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
