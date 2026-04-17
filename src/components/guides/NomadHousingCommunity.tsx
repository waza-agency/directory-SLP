import Link from 'next/link';
import {
  HomeIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  CalendarDaysIcon,
  BuildingLibraryIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline';

const platforms = [
  {
    name: 'Airbnb',
    for: 'First 1-4 weeks',
    priceRange: '$600-$1,400 USD/mo',
    note: 'Use monthly discounts (often 30-50% off). Verify wifi with host.',
    external: 'https://www.airbnb.com/s/San-Luis-Potosi--Mexico',
    color: 'bg-rose-500',
  },
  {
    name: 'Inmuebles24',
    for: 'Long-term unfurnished',
    priceRange: '$6,000-$18,000 MXN/mo',
    note: 'Largest local listings. Filter "amueblado" for furnished.',
    external: 'https://www.inmuebles24.com/departamentos-en-renta-en-san-luis-potosi.html',
    color: 'bg-blue-600',
  },
  {
    name: 'Vivanuncios',
    for: 'Direct from owner',
    priceRange: '$5,500-$15,000 MXN/mo',
    note: 'Cheaper, fewer scams than FB but verify in person.',
    external: 'https://www.vivanuncios.com.mx/s-departamentos-renta/san-luis-potosi/v1c1098l1021p1',
    color: 'bg-orange-500',
  },
  {
    name: 'Facebook Groups',
    for: 'Deals & community',
    priceRange: '$5,000-$20,000 MXN/mo',
    note: '"Renta SLP", "Expats in San Luis Potosí", "Departamentos en Renta SLP".',
    external: 'https://www.facebook.com/search/groups/?q=renta%20san%20luis%20potosi',
    color: 'bg-indigo-600',
  },
];

export function NomadHousingSection() {
  return (
    <section id="housing">
      <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
        <HomeIcon className="w-7 h-7 text-primary" />
        Where to Find Housing
      </h2>
      <p className="text-gray-600 mb-6">
        Start with Airbnb for the first month while you explore neighborhoods in person, then switch
        to a longer lease. Most landlords ask for <strong>1-2 months deposit</strong>; foreigners are
        usually <strong>exempt from the "aval" (guarantor)</strong> rule Mexicans deal with —
        a passport and bank statements are typically enough.
      </p>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        {platforms.map((p) => (
          <a
            key={p.name}
            href={p.external}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className={`inline-block ${p.color} text-white text-xs font-semibold px-2.5 py-1 rounded-full mb-2`}>
                  {p.for}
                </div>
                <h3 className="font-bold text-lg text-gray-900 group-hover:text-primary transition-colors">
                  {p.name}
                </h3>
              </div>
              <ArrowTopRightOnSquareIcon className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
            </div>
            <div className="text-sm text-gray-600 mb-2">{p.note}</div>
            <div className="pt-3 border-t border-gray-100">
              <div className="text-xs text-gray-500 uppercase tracking-wider">Typical range</div>
              <div className="font-bold text-primary">{p.priceRange}</div>
            </div>
          </a>
        ))}
      </div>
      <div className="bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10 rounded-2xl p-5">
        <h4 className="font-bold text-gray-900 mb-2">Rental norms to know</h4>
        <ul className="text-sm text-gray-700 space-y-1.5">
          <li>• Leases typically run <strong>12 months</strong>, shorter with furnished places.</li>
          <li>• <strong>Deposit</strong>: 1 month (returned) + 1 month (first month rent).</li>
          <li>• <strong>Utilities not included</strong>: electricity (CFE), water, internet, gas.</li>
          <li>• Most Mexican landlords don't run credit checks on foreigners — bank statements work.</li>
          <li>• Ask about "cuota de mantenimiento" for condos ($500-$2,000 MXN/mo extra).</li>
        </ul>
      </div>
    </section>
  );
}

const communityLinks = [
  {
    Icon: CalendarDaysIcon,
    title: 'Local Events',
    desc: 'Language exchanges, art nights, rooftop parties',
    href: '/events/all',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    Icon: UserGroupIcon,
    title: 'Community Directory',
    desc: 'Expat groups, hobby clubs, volunteer orgs',
    href: '/community',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    Icon: ChatBubbleLeftRightIcon,
    title: 'WhatsApp Groups',
    desc: '"SLP Expats & Nomads" · "English Speakers SLP"',
    href: '/community',
    color: 'from-green-500 to-emerald-500',
  },
  {
    Icon: BuildingLibraryIcon,
    title: 'Coliving Options',
    desc: 'Short-term shared housing in Lomas & Centro',
    href: '/resources/neighborhoods-san-luis-potosi',
    color: 'from-purple-500 to-pink-500',
  },
];

export function NomadCommunitySection() {
  return (
    <section id="community">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Nomad Community & Meetups</h2>
      <p className="text-gray-600 mb-6">
        SLP's nomad scene is smaller than CDMX or Oaxaca, but that means newcomers get noticed and
        welcomed fast. The core group meets weekly at Capital Coffee and Impact Hub.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {communityLinks.map(({ Icon, title, desc, href, color }) => (
          <Link
            key={title}
            href={href}
            className="group bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div
              className={`inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br ${color} text-white mb-3 shadow-sm`}
            >
              <Icon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">{desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
