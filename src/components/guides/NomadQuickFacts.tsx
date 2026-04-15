import {
  WifiIcon,
  CurrencyDollarIcon,
  ClockIcon,
  ShieldCheckIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline';

const facts = [
  {
    Icon: WifiIcon,
    label: 'Avg Internet',
    value: '150 Mbps',
    hint: 'Fiber in most homes',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    Icon: CurrencyDollarIcon,
    label: 'Cost of Living',
    value: '$1,200 USD',
    hint: 'per month, comfortable',
    color: 'from-emerald-500 to-green-500',
  },
  {
    Icon: ClockIcon,
    label: 'Time Zone',
    value: 'CST (UTC-6)',
    hint: 'Same as Chicago',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    Icon: ShieldCheckIcon,
    label: 'Safety',
    value: 'High',
    hint: 'Safest mid-size MX',
    color: 'from-amber-500 to-orange-500',
  },
  {
    Icon: PaperAirplaneIcon,
    label: 'Airport',
    value: 'SLP',
    hint: 'Direct flights to USA',
    color: 'from-rose-500 to-pink-500',
  },
];

export default function NomadQuickFacts() {
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
