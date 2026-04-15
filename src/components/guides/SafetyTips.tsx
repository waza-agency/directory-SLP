const tips = [
  {
    emoji: '💧',
    title: 'Tap water',
    text: "Don't drink from the tap. Bottled water is everywhere and cheap ($15-25 MXN / 1.5L). Hotels provide complimentary bottles. Ice at restaurants is safe.",
  },
  {
    emoji: '⛰️',
    title: 'Altitude',
    text: 'SLP sits at 1,860 m (6,100 ft). Most visitors feel fine but take it easy on day one: hydrate, skip heavy alcohol, and pace yourself if coming from sea level.',
  },
  {
    emoji: '☀️',
    title: 'Sun protection',
    text: 'High altitude = strong UV even on cool days. Pack SPF 30+, sunglasses and a hat. The midday sun in spring can be deceptively intense.',
  },
  {
    emoji: '💵',
    title: 'Cash vs cards',
    text: 'Cards accepted almost everywhere, but carry $300-500 MXN for markets, taxis and tips. ATMs in bank branches (BBVA, Banorte, Santander) are the safest.',
  },
  {
    emoji: '💊',
    title: 'Pharmacies',
    text: 'Pharmacies are abundant and many stock the same medications as the US without prescription. Trusted chains: Farmacias San Pablo, Benavides and Guadalajara.',
  },
  {
    emoji: '🚨',
    title: 'Emergency numbers',
    text: 'Dial 911 for any emergency (police, fire, ambulance). Tourist police speak English and patrol the Centro Histórico. Save your embassy phone just in case.',
  },
];

export default function SafetyTips() {
  return (
    <section id="safety">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Safety & Practical Tips</h2>
      <p className="text-gray-600 mb-6">
        SLP is considered one of the safest mid-size cities in Mexico. These practical tips will keep your trip smooth.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tips.map((t) => (
          <div
            key={t.title}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div className="text-3xl mb-2">{t.emoji}</div>
            <h3 className="font-semibold text-gray-900 mb-2">{t.title}</h3>
            <p className="text-sm text-gray-600">{t.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
