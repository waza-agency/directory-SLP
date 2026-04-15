const costs = [
  { item: 'Museum entry', price: 'Free - $50 MXN', emoji: '🏛️' },
  { item: 'Coffee at a cafe', price: '$40 - 60 MXN', emoji: '☕' },
  { item: 'Street tacos', price: '$15 - 25 MXN each', emoji: '🌮' },
  { item: 'Mid-range dinner', price: '$300 - 500 MXN', emoji: '🍽️' },
  { item: 'Local beer / cocktail', price: '$40 - 90 MXN', emoji: '🍺' },
  { item: 'Guided tour', price: '$400 - 1,200 MXN', emoji: '🧭' },
  { item: 'Artisan rebozo', price: '$200 - 800 MXN', emoji: '🧣' },
  { item: 'Uber across town', price: '$60 - 120 MXN', emoji: '🚕' },
];

export default function MoneyAndCosts() {
  return (
    <section id="money">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Money & Costs Snapshot</h2>
      <p className="text-gray-600 mb-6">
        San Luis Potosí is one of Mexico's best value cities. A comfortable day on the ground rarely tops $50 USD.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {costs.map((c) => (
          <div
            key={c.item}
            className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
          >
            <div className="text-2xl mb-2">{c.emoji}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">{c.item}</div>
            <div className="text-sm md:text-base font-bold text-gray-900 mt-1">{c.price}</div>
          </div>
        ))}
      </div>
      <div className="mt-5 grid md:grid-cols-2 gap-3">
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-sm">
          <div className="font-semibold text-emerald-800 mb-1">💳 Cash vs cards</div>
          <p className="text-emerald-700">Cards work at hotels, mid-range restaurants and malls. Carry cash ($300-500 MXN) for taxis, street food, markets and small shops.</p>
        </div>
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm">
          <div className="font-semibold text-amber-800 mb-1">🙏 Tipping norms</div>
          <p className="text-amber-700">Restaurants: 10-15%. Bellboys: $20-30 MXN per bag. Tour guides: $100-200 MXN per person. Uber: optional, rounding up is appreciated.</p>
        </div>
      </div>
    </section>
  );
}
