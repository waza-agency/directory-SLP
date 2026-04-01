import Link from 'next/link';
import { useRouter } from 'next/router';

const activities = ['Parks', 'Trampolines', 'Bowling', 'Museums', 'Go-Karts', 'Laser Tag'];
const activitiesEs = ['Parques', 'Trampolines', 'Boliche', 'Museos', 'Go-Karts', 'Laser Tag'];

export default function FamilyActivitiesBanner() {
  const { locale } = useRouter();
  const isEs = locale === 'es';

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600">
      {/* Playful dots pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'radial-gradient(circle, white 2px, transparent 2px)',
          backgroundSize: '30px 30px',
        }}
      />

      <div className="relative container mx-auto px-4 md:px-8 lg:px-16 py-12 md:py-16">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left: Icon cluster */}
          <div className="flex-shrink-0">
            <div className="grid grid-cols-3 gap-3">
              {['🎢', '⚽', '🎳', '🏛️', '🎯', '🌳'].map((e, i) => (
                <div
                  key={i}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center text-2xl md:text-3xl backdrop-blur-sm"
                >
                  {e}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-4 py-1.5 mb-4">
              <span className="text-white text-xs font-bold uppercase tracking-widest">
                {isEs ? 'Guía Familiar Completa' : 'Complete Family Guide'}
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4 leading-tight">
              Family Friendly Activities
              <span className="block text-lg md:text-xl font-light text-white/70 mt-2">
                {isEs ? 'en San Luis Potosí' : 'in San Luis Potosí'}
              </span>
            </h2>

            <p className="text-white/80 text-sm md:text-base max-w-2xl mb-5 leading-relaxed">
              {isEs
                ? 'Descubre los mejores planes para disfrutar en familia: parques, trampolines, boliche, museos interactivos, go-karts y mucho más. Con precios, horarios y recomendaciones.'
                : 'Discover the best family plans: parks, trampolines, bowling, interactive museums, go-karts and more. With prices, hours, and recommendations.'}
            </p>

            {/* Activity pills */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6">
              {(isEs ? activitiesEs : activities).map((a) => (
                <span
                  key={a}
                  className="bg-white/15 border border-white/25 text-white text-xs font-medium px-3 py-1.5 rounded-full"
                >
                  {a}
                </span>
              ))}
            </div>

            <Link
              href="/family-friendly-activities"
              className="inline-flex items-center gap-2 bg-white text-purple-700 px-8 py-3.5 rounded-full font-bold text-base hover:bg-purple-50 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              {isEs ? 'Explorar Actividades' : 'Explore Activities'}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
