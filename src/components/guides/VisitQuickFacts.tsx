import {
  BuildingLibraryIcon,
  CalendarDaysIcon,
  ArrowTrendingUpIcon,
  CurrencyDollarIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';

const facts = [
  {
    Icon: BuildingLibraryIcon,
    label: 'Heritage',
    value: 'UNESCO',
    hint: 'Camino Real World Heritage',
    color: 'from-amber-500 to-orange-500',
  },
  {
    Icon: CalendarDaysIcon,
    label: 'Founded',
    value: '1592',
    hint: 'Over 430 years of history',
    color: 'from-rose-500 to-pink-500',
  },
  {
    Icon: ArrowTrendingUpIcon,
    label: 'Elevation',
    value: '1,860 m',
    hint: '6,100 ft above sea level',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    Icon: CurrencyDollarIcon,
    label: 'Currency',
    value: 'MXN',
    hint: '~$18 MXN per 1 USD',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    Icon: ChatBubbleLeftRightIcon,
    label: 'Language',
    value: 'Spanish',
    hint: 'English in tourist areas',
    color: 'from-indigo-500 to-purple-500',
  },
];

export default function VisitQuickFacts() {
  return (
    <section className="relative -mt-10 md:-mt-14 mb-10 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
          {facts.map(({ Icon, label, value, hint, color }) => (
            <div
              key={label}
              className="group bg-white rounded-2xl p-4 md:p-5 shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${color} text-white mb-3 shadow-sm`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-[10px] md:text-xs uppercase tracking-wider text-gray-500 font-semibold">
                {label}
              </div>
              <div className="text-base md:text-lg font-bold text-gray-900 leading-tight">
                {value}
              </div>
              <div className="text-[11px] md:text-xs text-gray-500 mt-0.5">
                {hint}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
