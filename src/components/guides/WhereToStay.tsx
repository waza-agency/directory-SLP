const tiers = [
  {
    tier: 'Budget',
    price: '$30-60 USD',
    emoji: '🎒',
    accent: 'from-emerald-500 to-teal-500',
    description: 'Comfortable hostels, guesthouses and small hotels in Centro or near Alameda.',
    options: ['Hostal San Francisco', 'Hotel Filher', 'Hotel Plaza'],
    tip: 'Book rooms facing the interior courtyard — quieter at night.',
  },
  {
    tier: 'Mid-range',
    price: '$80-150 USD',
    emoji: '🏨',
    accent: 'from-blue-500 to-indigo-500',
    description: 'Stylish boutique hotels and refurbished colonial buildings within walking distance of Plaza de Armas.',
    options: ['Hotel Panorama', 'Hotel Concordia', 'Hotel Nápoles'],
    tip: 'Hotel Panorama has a rooftop pool with skyline views — perfect at sunset.',
  },
  {
    tier: 'Luxury',
    price: '$200+ USD',
    emoji: '✨',
    accent: 'from-amber-500 to-rose-500',
    description: 'Restored palaces and design-forward boutique hotels offering a full five-star experience.',
    options: ['Hotel Museo Palacio de San Agustín', 'Fiesta Americana San Luis Potosí', 'Hotel Hilton SLP'],
    tip: 'Hotel Museo is a former aristocratic mansion — even non-guests can book afternoon tea.',
  },
];

export default function WhereToStay() {
  return (
    <section id="where-to-stay">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Where to Stay by Budget</h2>
      <p className="text-gray-600 mb-6">
        Staying in the Centro Histórico puts you within walking distance of nearly every attraction, restaurant and plaza. Pick your tier below.
      </p>
      <div className="grid md:grid-cols-3 gap-4">
        {tiers.map((t) => (
          <div
            key={t.tier}
            className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-white text-xs font-semibold bg-gradient-to-r ${t.accent} mb-4`}>
              <span>{t.emoji}</span>
              <span>{t.tier}</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-2">{t.price}<span className="text-sm text-gray-500 font-normal">/night</span></div>
            <p className="text-sm text-gray-600 mb-4">{t.description}</p>
            <div className="mb-4">
              <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">Typical options</div>
              <ul className="space-y-1">
                {t.options.map((o) => (
                  <li key={o} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>{o}
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-xs text-gray-500 bg-gray-50 rounded-lg p-3 border border-gray-100">
              <span className="font-semibold text-gray-700">Tip: </span>{t.tip}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-sm text-gray-600 bg-primary/5 border border-primary/10 rounded-xl p-4">
        <span className="font-semibold text-primary">AirBnB note: </span>
        Airbnb is abundant and usually 20-40% cheaper than hotels. The best neighborhoods for short-term rentals are Centro, Lomas de San Luis and Tequisquiapan. Expect $35-90 USD/night for a well-reviewed private studio.
      </div>
    </section>
  );
}
