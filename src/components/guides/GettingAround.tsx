const options = [
  {
    emoji: '🚶',
    title: 'Walking',
    cost: 'Free',
    description: 'The historic center is compact and pedestrian-friendly. Most top attractions sit within a 10-minute stroll of Plaza de Armas.',
    tip: 'Wear comfortable shoes — cobblestone streets are charming but punishing in heels.',
  },
  {
    emoji: '🚗',
    title: 'Uber / DiDi',
    cost: '$40-80 MXN',
    description: 'The easiest way to reach neighborhoods beyond Centro. Both apps work well and are cheaper than street taxis.',
    tip: 'DiDi is usually 10-15% cheaper than Uber in SLP. Prefer it for longer rides.',
  },
  {
    emoji: '🚌',
    title: 'Local Bus',
    cost: '$10 MXN',
    description: 'Extensive network covering the metro area. Pay in cash on boarding. Routes are labeled on the windshield.',
    tip: 'Download the "Mi Transporte SLP" app or ask your hotel for the best line to your destination.',
  },
  {
    emoji: '🚙',
    title: 'Rental Car',
    cost: '$600-1,200 MXN/day',
    description: 'Essential for day trips to Real de Catorce, Huasteca Potosina or wine country. Not needed within the city.',
    tip: 'Book through Discover Cars or Expedia. Verify the rental includes full insurance (seguro amplio).',
  },
];

export default function GettingAround() {
  return (
    <section id="getting-around">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Getting Around the City</h2>
      <p className="text-gray-600 mb-6">
        SLP is one of the easiest Mexican cities to navigate. Here is what you will actually use.
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        {options.map((o) => (
          <div
            key={o.title}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{o.emoji}</div>
                <h3 className="font-semibold text-gray-900 text-lg">{o.title}</h3>
              </div>
              <span className="text-xs font-semibold bg-primary/10 text-primary px-2.5 py-1 rounded-full">{o.cost}</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">{o.description}</p>
            <p className="text-xs text-gray-500 border-t border-gray-100 pt-3">
              <span className="font-semibold text-gray-700">Tip: </span>{o.tip}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
