import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

const pros = [
  'Among the safest cities in Mexico — walk the Centro at night',
  'Low cost: $1,000-$1,500 USD/mo comfortable lifestyle',
  'Stunning colonial architecture & UNESCO-listed Centro',
  'World-class food (enchiladas potosinas, gorditas, mezcal)',
  '2-3 hr drive to Huasteca Potosina waterfalls & caves',
  'Clean air, altitude (1,860 m), manageable traffic',
  'Direct flights SLP → DFW, IAH, MEX',
  'Strong universities = educated, entrepreneurial locals',
];

const cons = [
  'Smaller nomad community than CDMX, Oaxaca or Mérida',
  'Limited English outside tourist/business zones',
  'Fewer vegan / international cuisine options',
  'Cold winter nights (most homes lack heating)',
  'Dust & dry air Feb-May can irritate skin/sinuses',
  'Uber/DiDi coverage thinner in outer neighborhoods',
  'Some bureaucracy (visa, RFC, bank) requires patience',
];

export function NomadProsConsSection() {
  return (
    <section id="pros-cons">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Honest Pros & Cons</h2>
      <p className="text-gray-600 mb-6">
        No city is perfect. Here's the unvarnished reality after talking to dozens of nomads who've
        lived 3-24 months in SLP.
      </p>
      <div className="grid md:grid-cols-2 gap-5">
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircleIcon className="w-7 h-7 text-emerald-600" />
            <h3 className="font-bold text-lg text-emerald-900">Pros</h3>
          </div>
          <ul className="space-y-2.5">
            {pros.map((p) => (
              <li key={p} className="flex gap-2 text-sm text-gray-800">
                <CheckCircleIcon className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gradient-to-br from-rose-50 to-red-50 border border-rose-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-2 mb-4">
            <XCircleIcon className="w-7 h-7 text-rose-600" />
            <h3 className="font-bold text-lg text-rose-900">Cons</h3>
          </div>
          <ul className="space-y-2.5">
            {cons.map((c) => (
              <li key={c} className="flex gap-2 text-sm text-gray-800">
                <XCircleIcon className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const checklist = [
  'Buy local SIM card (Telcel/AT&T store — bring passport)',
  'Download Uber + DiDi, link your card',
  'Walk the Centro Histórico (Plaza de Armas, Cathedral, Jardín de San Francisco)',
  'Try enchiladas potosinas at La Oruga y La Cebada or La Posada del Virrey',
  'Install your bank app — enable international transactions',
  'Scope out a gym or studio (Smart Fit ~$400 MXN/mo, local boutiques $800-$1,500)',
  'Join "SLP Expats & Nomads" Facebook + WhatsApp groups',
  'Visit a coworking day pass — Impact Hub or Capital Coffee',
  'Buy groceries at La Comer, Soriana or Mercado Hidalgo',
  'Stock up on bottled water (most locals don\'t drink tap)',
  'Get a mezcal tasting — Mezcal Oso & El Pasito are classics',
  'Take a weekend trip to Real de Catorce or Huasteca',
];

export function NomadArrivalChecklist() {
  return (
    <section id="arrival-checklist">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">First Week Arrival Checklist</h2>
      <p className="text-gray-600 mb-6">
        Hit these 12 things in your first 7 days and you'll feel at home fast.
      </p>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-primary to-primary-dark px-6 py-4">
          <div className="text-white font-bold">Week 1 Essentials</div>
          <div className="text-xs text-white/80">Tap to check off — your local rite of passage</div>
        </div>
        <ul className="divide-y divide-gray-100">
          {checklist.map((item, idx) => (
            <li
              key={item}
              className="group flex items-center gap-4 px-5 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex-shrink-0 w-6 h-6 rounded-md border-2 border-gray-300 group-hover:border-primary group-hover:bg-primary/10 transition-all flex items-center justify-center">
                <CheckCircleIcon className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="flex-shrink-0 text-xs font-mono text-gray-400 w-6">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span className="text-sm text-gray-800 group-hover:text-gray-900">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
