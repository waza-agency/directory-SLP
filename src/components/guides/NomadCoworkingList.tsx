import Image from 'next/image';
import { WifiIcon, ClockIcon, MapPinIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';

interface Spot {
  name: string;
  img: string;
  neighborhood: string;
  price: string;
  wifi: string;
  hours: string;
  vibe: string[];
  rating: number;
}

const spots: Spot[] = [
  {
    name: 'Capital Coffee',
    img: '/images/blog/cafes/capital-coffee.jpg',
    neighborhood: 'Lomas / Av. Venustiano Carranza',
    price: '$60-90 MXN drink',
    wifi: '~80 Mbps',
    hours: '7:30am - 10:00pm',
    vibe: ['Fast wifi', 'Specialty coffee', 'Social'],
    rating: 4.7,
  },
  {
    name: 'Café Sideral',
    img: '/images/blog/cafes/cafe-sideral.jpg',
    neighborhood: 'Centro Histórico',
    price: '$50-80 MXN drink',
    wifi: '~60 Mbps',
    hours: '8:00am - 9:00pm',
    vibe: ['Quiet', 'Cozy', 'Plug points'],
    rating: 4.6,
  },
  {
    name: 'Las Castañas',
    img: '/images/blog/cafes/las-castanas-new.jpg',
    neighborhood: 'Centro / Jardín de San Juan de Dios',
    price: '$55-95 MXN drink',
    wifi: '~50 Mbps',
    hours: '8:00am - 10:00pm',
    vibe: ['Brunch', 'Outdoor seating', 'Laptop-friendly'],
    rating: 4.5,
  },
  {
    name: '500 Noches',
    img: '/images/blog/cafes/500-noches.jpg',
    neighborhood: 'Centro Histórico',
    price: '$45-75 MXN drink',
    wifi: '~45 Mbps',
    hours: '9:00am - 11:00pm',
    vibe: ['Artsy', 'Late hours', 'Good for calls'],
    rating: 4.4,
  },
  {
    name: 'Impact Hub SLP',
    img: '/images/blog/cafes/capital-coffee.jpg',
    neighborhood: 'Av. Benito Juárez',
    price: '$150-250 MXN/day · $2,800 MXN/mo',
    wifi: '~200 Mbps',
    hours: 'Mon-Fri 9:00am - 8:00pm',
    vibe: ['Coworking', 'Events', 'Meeting rooms'],
    rating: 4.8,
  },
  {
    name: 'Halva Café',
    img: '/images/blog/cafes/halva-cafe.png',
    neighborhood: 'Lomas 2da Sección',
    price: '$60-100 MXN drink',
    wifi: '~70 Mbps',
    hours: '8:00am - 10:00pm',
    vibe: ['Healthy menu', 'Quiet', 'AC'],
    rating: 4.6,
  },
];

function Rating({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <StarIcon
          key={n}
          className={`w-4 h-4 ${n <= Math.round(value) ? 'text-amber-400' : 'text-gray-200'}`}
        />
      ))}
      <span className="text-xs text-gray-600 ml-1 font-semibold">{value.toFixed(1)}</span>
    </div>
  );
}

export default function NomadCoworkingList() {
  return (
    <div className="grid sm:grid-cols-2 gap-5">
      {spots.map((s) => (
        <article
          key={s.name}
          className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <div className="relative aspect-[16/10]">
            <Image
              src={s.img}
              alt={s.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-full px-2.5 py-1 shadow-sm">
              <Rating value={s.rating} />
            </div>
          </div>
          <div className="p-5">
            <h3 className="font-bold text-lg text-gray-900 mb-1">{s.name}</h3>
            <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
              <MapPinIcon className="w-3.5 h-3.5" />
              <span>{s.neighborhood}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
              <div className="flex flex-col items-start bg-gray-50 rounded-lg p-2">
                <CurrencyDollarIcon className="w-4 h-4 text-emerald-600 mb-1" />
                <span className="text-gray-500 text-[10px]">Price</span>
                <span className="font-semibold text-gray-900 leading-tight">{s.price}</span>
              </div>
              <div className="flex flex-col items-start bg-gray-50 rounded-lg p-2">
                <WifiIcon className="w-4 h-4 text-blue-600 mb-1" />
                <span className="text-gray-500 text-[10px]">Wifi</span>
                <span className="font-semibold text-gray-900">{s.wifi}</span>
              </div>
              <div className="flex flex-col items-start bg-gray-50 rounded-lg p-2">
                <ClockIcon className="w-4 h-4 text-purple-600 mb-1" />
                <span className="text-gray-500 text-[10px]">Hours</span>
                <span className="font-semibold text-gray-900 text-[11px] leading-tight">
                  {s.hours}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {s.vibe.map((v) => (
                <span
                  key={v}
                  className="text-[11px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium"
                >
                  {v}
                </span>
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
