import {
  DevicePhoneMobileIcon,
  BanknotesIcon,
  CreditCardIcon,
  GlobeAltIcon,
  CheckBadgeIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

const carriers = [
  {
    name: 'Telcel',
    tag: 'Best coverage',
    accent: 'from-blue-600 to-blue-800',
    eSim: 'eSIM supported (iPhone + select Androids)',
    plan: 'Amigo Sin Límite 200',
    details: '15 GB + unlimited social apps (WhatsApp, IG, FB, TikTok) + 1,500 min',
    price: '$200 MXN / 28 days',
  },
  {
    name: 'AT&T México',
    tag: 'Best for calls to USA',
    accent: 'from-sky-500 to-blue-500',
    eSim: 'eSIM supported',
    plan: 'Paquete 200',
    details: '12 GB + unlimited calls & SMS to MX/USA/CAN + social',
    price: '$200 MXN / 30 days',
  },
  {
    name: 'Movistar',
    tag: 'Cheapest data',
    accent: 'from-emerald-500 to-teal-600',
    eSim: 'Physical SIM (eSIM limited)',
    plan: 'Movistar Prepago 200',
    details: '11 GB + unlimited WhatsApp + 3,000 min',
    price: '$200 MXN / 30 days',
  },
];

const banking = [
  {
    Icon: BanknotesIcon,
    title: 'ATMs to use',
    points: [
      'BBVA, Santander, HSBC, Banorte — inside bank branches',
      'Avoid standalone ATMs in the street (skimmer risk + high fees)',
      'Typical fee: $30-$50 MXN per withdrawal',
      'Max: $6,000-$10,000 MXN per transaction',
    ],
    color: 'from-blue-500 to-indigo-500',
  },
  {
    Icon: CreditCardIcon,
    title: 'Open a Mexican account',
    points: [
      'Need Temporary Resident Card + CURP + proof of address (CFE bill)',
      'BBVA and Banorte are most expat-friendly',
      'Digital banks: Nu (simple, no branches), Hey Banco',
      'Takes 1-2 visits, allow 2 weeks',
    ],
    color: 'from-emerald-500 to-teal-500',
  },
  {
    Icon: GlobeAltIcon,
    title: 'Apps that work',
    points: [
      'Wise — best for international transfers & MXN card',
      'Revolut — works but limited Mexico support',
      'PayPal — accepted by freelancers, conversion fees apply',
      'Payoneer — good for US/EU remote salary payouts',
    ],
    color: 'from-purple-500 to-pink-500',
  },
  {
    Icon: CheckBadgeIcon,
    title: 'Tip culture',
    points: [
      'Restaurants: 10-15% (sometimes included as "propina sugerida")',
      'Taxis/Uber: round up, 5-10% for long trips',
      'Hotel staff: $20-$50 MXN per bag / per night',
      'Gas station attendants: $5-$10 MXN',
    ],
    color: 'from-amber-500 to-orange-500',
  },
];

export function NomadSimSection() {
  return (
    <section id="sim-mobile">
      <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
        <DevicePhoneMobileIcon className="w-7 h-7 text-primary" />
        SIM Cards & Mobile Plans
      </h2>
      <p className="text-gray-600 mb-6">
        Mexican prepaid plans are cheap and generous. For arrival day, an international eSIM like{' '}
        <span className="font-semibold">Airalo</span> or{' '}
        <span className="font-semibold">Holafly</span> ($10-$30 USD for 7-30 days) gives you data the
        moment you land — then switch to a local carrier for longer stays.
      </p>
      <div className="grid sm:grid-cols-3 gap-4 mb-4">
        {carriers.map((c) => (
          <div
            key={c.name}
            className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className={`bg-gradient-to-r ${c.accent} px-5 py-4 text-white`}>
              <div className="text-xs uppercase tracking-wider opacity-90 font-semibold">{c.tag}</div>
              <div className="text-2xl font-bold">{c.name}</div>
            </div>
            <div className="p-5 space-y-3">
              <div className="text-xs text-gray-500">{c.eSim}</div>
              <div>
                <div className="font-semibold text-gray-900">{c.plan}</div>
                <div className="text-sm text-gray-600">{c.details}</div>
              </div>
              <div className="pt-2 border-t">
                <div className="text-xs text-gray-500">Price</div>
                <div className="text-lg font-bold text-primary">{c.price}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
        <ExclamationTriangleIcon className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-amber-900">
          <strong>Tip:</strong> Buy your SIM at an official Telcel/AT&T store (bring passport).
          OXXO sells SIMs too, but staff may not help activate them. Recharges at any OXXO, 7-Eleven,
          or via the carrier app.
        </p>
      </div>
    </section>
  );
}

export function NomadBankingSection() {
  return (
    <section id="banking">
      <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
        <BanknotesIcon className="w-7 h-7 text-primary" />
        Banking & Money
      </h2>
      <p className="text-gray-600 mb-6">
        Mexico is still a largely cash-friendly economy, especially for small purchases, taxis and
        markets. Cards work at most restaurants and supermarkets.
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        {banking.map(({ Icon, title, points, color }) => (
          <div
            key={title}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div
              className={`inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br ${color} text-white mb-3 shadow-sm`}
            >
              <Icon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
            <ul className="space-y-1.5 text-sm text-gray-600">
              {points.map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
