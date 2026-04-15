const months = [
  { label: 'Jan', rating: 'best', note: 'Cool & dry' },
  { label: 'Feb', rating: 'best', note: 'Cool & dry' },
  { label: 'Mar', rating: 'good', note: 'Semana Santa' },
  { label: 'Apr', rating: 'good', note: 'Semana Santa / warm' },
  { label: 'May', rating: 'hot', note: 'Hot & dry' },
  { label: 'Jun', rating: 'rainy', note: 'Rainy afternoons' },
  { label: 'Jul', rating: 'rainy', note: 'Peak rainy' },
  { label: 'Aug', rating: 'good', note: 'FENAPO festival' },
  { label: 'Sep', rating: 'rainy', note: 'Rainy' },
  { label: 'Oct', rating: 'best', note: 'Ideal weather' },
  { label: 'Nov', rating: 'best', note: 'Cool evenings' },
  { label: 'Dec', rating: 'best', note: 'Festive season' },
];

const ratingStyles: Record<string, string> = {
  best: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  good: 'bg-amber-100 text-amber-800 border-amber-200',
  hot: 'bg-orange-100 text-orange-800 border-orange-200',
  rainy: 'bg-blue-100 text-blue-800 border-blue-200',
};

const events = [
  {
    name: 'Procesión del Silencio',
    when: 'Good Friday (March/April)',
    description: 'Mexico\'s most dramatic Holy Week procession — 2,000 hooded cofrades walking in absolute silence through the Centro. UNESCO Intangible Heritage.',
  },
  {
    name: 'Semana Santa',
    when: 'Holy Week (March/April)',
    description: 'A full week of religious processions, candlelight vigils and baroque music. The city fills up — book accommodation months ahead.',
  },
  {
    name: 'FENAPO',
    when: 'August (3 weeks)',
    description: 'Feria Nacional Potosina — Mexico\'s third-largest fair, with concerts (Bad Bunny, Molotov, Luis Miguel past headliners), bullfights, food and rides.',
  },
  {
    name: 'Día de Muertos',
    when: 'Oct 31 - Nov 2',
    description: 'Altars in every plaza, traditional pan de muerto, and catrinas marches through the Centro. More intimate than CDMX.',
  },
];

export default function WeatherCalendar() {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Monthly weather snapshot</h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {months.map((m) => (
            <div
              key={m.label}
              className={`rounded-xl border p-3 text-center ${ratingStyles[m.rating]}`}
            >
              <div className="font-bold text-sm">{m.label}</div>
              <div className="text-[10px] uppercase tracking-wider opacity-80 mt-0.5">{m.rating}</div>
              <div className="text-xs mt-1 leading-tight">{m.note}</div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mt-3 text-xs">
          <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-200 border border-emerald-300" /> Best</span>
          <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-amber-200 border border-amber-300" /> Good</span>
          <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-orange-200 border border-orange-300" /> Hot</span>
          <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-blue-200 border border-blue-300" /> Rainy</span>
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Key events & festivals</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {events.map((e) => (
            <div key={e.name} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-baseline justify-between gap-2 mb-1">
                <h4 className="font-semibold text-gray-900">{e.name}</h4>
                <span className="text-xs text-primary font-medium">{e.when}</span>
              </div>
              <p className="text-sm text-gray-600">{e.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
