import {
  TruckIcon,
  ShoppingBagIcon,
  BuildingOfficeIcon,
  BoltIcon,
  BriefcaseIcon,
  HomeModernIcon,
  CloudIcon,
  SunIcon,
  CloudArrowDownIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

const apps = [
  {
    name: 'Uber',
    desc: 'Rideshare — reliable, English UI',
    Icon: TruckIcon,
    color: 'bg-black text-white',
  },
  {
    name: 'DiDi',
    desc: 'Often 20-30% cheaper than Uber',
    Icon: TruckIcon,
    color: 'bg-orange-500 text-white',
  },
  {
    name: 'Rappi',
    desc: 'Food, groceries, pharmacy delivery',
    Icon: ShoppingBagIcon,
    color: 'bg-rose-500 text-white',
  },
  {
    name: 'Uber Eats',
    desc: 'Food delivery — wide selection',
    Icon: ShoppingBagIcon,
    color: 'bg-emerald-600 text-white',
  },
  {
    name: 'Mercado Libre',
    desc: 'Amazon of LatAm — next-day delivery',
    Icon: BriefcaseIcon,
    color: 'bg-yellow-400 text-gray-900',
  },
  {
    name: 'BBVA México',
    desc: 'Mobile banking for residents',
    Icon: BuildingOfficeIcon,
    color: 'bg-blue-700 text-white',
  },
  {
    name: 'CFE Contigo',
    desc: 'Pay electricity bill, report outages',
    Icon: BoltIcon,
    color: 'bg-green-700 text-white',
  },
  {
    name: 'Airbnb',
    desc: 'Short- and mid-term stays (1 week+)',
    Icon: HomeModernIcon,
    color: 'bg-pink-500 text-white',
  },
];

export function NomadAppsSection() {
  return (
    <section id="apps">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Apps You'll Need</h2>
      <p className="text-gray-600 mb-6">
        Install these on day one. All work with foreign credit cards (Wise, Revolut, etc.).
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {apps.map(({ name, desc, Icon, color }) => (
          <div
            key={name}
            className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center"
          >
            <div
              className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl ${color} mb-3 shadow-sm`}
            >
              <Icon className="w-6 h-6" />
            </div>
            <div className="font-bold text-gray-900 text-sm">{name}</div>
            <div className="text-xs text-gray-500 mt-1 leading-tight">{desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

const seasons = [
  {
    label: 'Spring',
    months: 'Mar – May',
    temp: '22° / 10°C',
    Icon: SunIcon,
    desc: 'Warm sunny days, cool nights. Driest months — expect dust. Best time for outdoor exploration.',
    pack: ['Light layers', 'Sunscreen SPF 50', 'Lip balm'],
    gradient: 'from-amber-400 to-orange-400',
  },
  {
    label: 'Summer',
    months: 'Jun – Sep',
    temp: '26° / 14°C',
    Icon: CloudArrowDownIcon,
    desc: 'Rainy season — afternoon thunderstorms, lush green landscape. Mornings are perfect.',
    pack: ['Light rain jacket', 'Umbrella', 'Quick-dry shoes'],
    gradient: 'from-emerald-400 to-teal-500',
  },
  {
    label: 'Autumn',
    months: 'Oct – Nov',
    temp: '23° / 10°C',
    Icon: CloudIcon,
    desc: 'Mild, clear days — arguably the best weather of the year. Day of the Dead celebrations.',
    pack: ['Light sweater', 'Jeans', 'Comfortable walking shoes'],
    gradient: 'from-orange-400 to-rose-500',
  },
  {
    label: 'Winter',
    months: 'Dec – Feb',
    temp: '20° / 4°C',
    Icon: SparklesIcon,
    desc: 'Surprisingly cold nights (sometimes freezing). Most homes have NO heating — layers inside too.',
    pack: ['Warm jacket', 'Thermal layers', 'Hat & scarf for nights'],
    gradient: 'from-sky-400 to-indigo-500',
  },
];

export function NomadClimateSection() {
  return (
    <section id="climate">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Climate & What to Pack</h2>
      <p className="text-gray-600 mb-6">
        SLP sits at <strong>1,860 m</strong> elevation with a semi-arid climate. Average year-round
        temp hovers around 18-22°C, but altitude makes nights colder than you'd expect — especially
        Dec–Feb.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {seasons.map(({ label, months, temp, Icon, desc, pack, gradient }) => (
          <div
            key={label}
            className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className={`bg-gradient-to-br ${gradient} p-4 text-white`}>
              <Icon className="w-8 h-8 mb-2" />
              <div className="font-bold text-lg">{label}</div>
              <div className="text-xs opacity-90">{months}</div>
              <div className="text-2xl font-bold mt-2">{temp}</div>
              <div className="text-[10px] opacity-80 uppercase tracking-wider">high / low</div>
            </div>
            <div className="p-4">
              <p className="text-xs text-gray-600 mb-3 leading-relaxed">{desc}</p>
              <div className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold mb-1.5">
                Pack
              </div>
              <ul className="space-y-1 text-xs text-gray-700">
                {pack.map((p) => (
                  <li key={p} className="flex gap-1.5">
                    <span className="text-primary">✓</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
