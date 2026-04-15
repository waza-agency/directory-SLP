import { useState } from 'react';

type Slot = {
  time: string;
  title: string;
  detail: string;
  cost?: string;
};

type DayPlan = {
  id: string;
  label: string;
  emoji: string;
  subtitle: string;
  slots: Slot[];
};

const plans: DayPlan[] = [
  {
    id: 'day1',
    label: 'Day 1',
    emoji: '🏛️',
    subtitle: 'History, plazas & baroque architecture',
    slots: [
      { time: '9:00 - 10:30', title: 'Breakfast at La Parroquia', detail: 'Classic potosino breakfast — enchiladas potosinas or huevos rancheros at the institution by the Cathedral.', cost: '$120-180 MXN' },
      { time: '10:30 - 13:00', title: 'Plaza de Armas + Cathedral + Palacio de Gobierno', detail: 'Walk the main square, visit the baroque Cathedral and tour the Palacio de Gobierno murals (free).' },
      { time: '13:00 - 15:00', title: 'Lunch at La Oruga y La Cebada', detail: 'Contemporary Mexican cuisine on a leafy patio. Try the gordas potosinas and mezcal flight.', cost: '$300-450 MXN' },
      { time: '15:00 - 17:30', title: 'Museo Federico Silva + Templo del Carmen', detail: 'Modern sculpture museum housed in a former prison, then the Churrigueresque masterpiece of Templo del Carmen.', cost: 'Museum $40 MXN' },
      { time: '17:30 - 19:00', title: 'Stroll Plaza del Carmen + Caja del Agua', detail: 'Golden hour in the plazas. Stop at Chocolates Costanzo for a traditional hot chocolate.' },
      { time: '19:00 - 22:00', title: 'Dinner at La Gran Vía', detail: 'A SLP institution since 1966. Spanish-Mexican classics, white tablecloths, impeccable service.', cost: '$450-700 MXN' },
    ],
  },
  {
    id: 'day2',
    label: 'Day 2',
    emoji: '🎨',
    subtitle: 'Culture, parks & nightlife',
    slots: [
      { time: '8:30 - 10:00', title: 'Breakfast at Café Cortao', detail: 'Specialty coffee, shakshuka or chilaquiles verdes in a bright, minimalist space near the Centro.', cost: '$130-200 MXN' },
      { time: '10:00 - 12:30', title: 'Centro de las Artes (former prison)', detail: 'World-class contemporary art museum on the grounds of the state penitentiary. Allow 2 hrs.', cost: 'Free' },
      { time: '12:30 - 14:30', title: 'Mercado República food crawl', detail: 'Enchiladas potosinas, asado de boda, aguas frescas and tacos al pastor from the tortillerías within the market.', cost: '$120-200 MXN' },
      { time: '14:30 - 17:00', title: 'Parque Tangamanga', detail: 'Rent a bike, walk the lakes or visit the planetarium. SLP\'s Central Park — 411 hectares of green space.' },
      { time: '17:00 - 19:00', title: 'Sunset rooftop drink', detail: 'Head to Azotea Rooftop Bar or Hotel Panorama rooftop for skyline views at golden hour.', cost: '$100-180 MXN' },
      { time: '19:00 - 22:00', title: 'Dinner at La Posta del Virrey', detail: 'Elegant regional cuisine in a restored mansion. Try the cabrito en salsa borracha.', cost: '$500-800 MXN' },
      { time: '22:00 - late', title: 'Calle Zaragoza bars', detail: 'The Callejón de los Besos area comes alive after 10pm. Cantinas, mezcalerías and live music.' },
    ],
  },
  {
    id: 'day3',
    label: 'Day 3',
    emoji: '🏞️',
    subtitle: 'Day trip — Real de Catorce OR Huasteca Potosina',
    slots: [
      { time: '6:00', title: 'Early departure', detail: 'Both options require an early start. Rent a car at SLP airport or book through a local tour operator.' },
      { time: '6:00 - 9:00', title: 'Option A: Drive to Real de Catorce', detail: '3-hour drive through the Altiplano desert. Enter through the legendary Ogarrio Tunnel.', cost: 'Fuel ~$600 MXN' },
      { time: '9:00 - 17:00', title: 'Real de Catorce experience', detail: 'Explore the silver-mining ghost town, take a jeep ride to Pueblo Fantasma, visit the Parroquia and have lunch at Mesón de la Abundancia.', cost: 'Jeep $300 MXN + lunch $250-400 MXN' },
      { time: '6:00 - 11:00', title: 'Option B: Drive to Huasteca Potosina', detail: '4.5-hour drive to Ciudad Valles. Or book a full-day guided tour — easier and all-inclusive.', cost: 'Tour $1,200-2,500 MXN' },
      { time: '11:00 - 17:00', title: 'Waterfalls circuit', detail: 'Tamul waterfall, Puente de Dios and Cascadas de Micos. Swim in turquoise rivers, zipline and raft.' },
      { time: '17:00 - 20:00', title: 'Return or overnight', detail: 'Real de Catorce: drive back to SLP. Huasteca: consider overnighting in Ciudad Valles and driving back next morning.' },
    ],
  },
];

export default function ExtendedItinerary() {
  const [active, setActive] = useState(plans[0].id);
  const plan = plans.find((p) => p.id === active) ?? plans[0];

  return (
    <section id="itinerary">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">3-Day Itinerary (Actionable)</h2>
      <p className="text-gray-600 mb-5">Timestamps, real restaurant names and ballpark costs. Swap freely — each day stands on its own.</p>

      <div className="flex gap-2 mb-5 flex-wrap">
        {plans.map((p) => (
          <button
            key={p.id}
            onClick={() => setActive(p.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
              active === p.id
                ? 'bg-primary text-white border-primary shadow-md'
                : 'bg-white text-gray-700 border-gray-200 hover:border-primary/40 hover:text-primary'
            }`}
          >
            {p.emoji} {p.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 to-secondary/5 px-5 py-4 border-b border-gray-100">
          <div className="font-semibold text-gray-900 text-lg">{plan.emoji} {plan.label}</div>
          <div className="text-sm text-gray-600">{plan.subtitle}</div>
        </div>
        <div className="divide-y divide-gray-100">
          {plan.slots.map((s, i) => (
            <div key={i} className="flex gap-4 p-4 hover:bg-gray-50 transition-colors">
              <div className="flex-shrink-0 w-24 text-xs font-semibold text-primary bg-primary/5 rounded-lg px-2 py-1 h-fit text-center">
                {s.time}
              </div>
              <div className="flex-1">
                <div className="flex items-baseline justify-between gap-2 flex-wrap">
                  <h4 className="font-semibold text-gray-900 text-sm">{s.title}</h4>
                  {s.cost && <span className="text-xs text-gray-500 font-medium">{s.cost}</span>}
                </div>
                <p className="text-sm text-gray-600 mt-1">{s.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
