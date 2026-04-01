import Link from 'next/link';
import { useRouter } from 'next/router';

const categories = ['Varonil Libre', 'Femenil Libre', 'Infantil 2012-2013', 'Infantil 2014-2015'];

const CopaPotosiBanner = () => {
  const { locale } = useRouter();
  const isEs = locale === 'es';

  return (
    <section className="relative overflow-hidden bg-[#0a4d1a]">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a4d1a] via-[#1a7a30] to-[#0d3b6b]" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            'radial-gradient(ellipse at 30% 50%, #4ade8033 0%, transparent 50%), radial-gradient(ellipse at 70% 20%, #3b82f633 0%, transparent 50%)',
        }}
      />
      {/* Field pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.1) 40px, rgba(255,255,255,0.1) 42px)',
        }}
      />

      <div className="relative container mx-auto px-4 md:px-8 lg:px-16 py-10 md:py-14">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left: Icon + Badge */}
          <div className="flex-shrink-0 flex flex-col items-center gap-4">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center backdrop-blur-sm">
              <span className="text-6xl md:text-7xl">⚽</span>
            </div>
            <div className="bg-amber-400/90 text-gray-900 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
              {isEs ? 'En Vivo' : 'Live Now'}
            </div>
          </div>

          {/* Center: Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-3">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
              <span className="text-white/90 text-xs font-bold uppercase tracking-widest">
                30 {isEs ? 'Marzo' : 'March'} — 4 {isEs ? 'Abril' : 'April'} 2026
              </span>
            </div>

            <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-3 leading-tight">
              Copa Potosí 2026
            </h3>

            <p className="text-white/80 text-sm md:text-base max-w-2xl mb-4 leading-relaxed">
              {isEs
                ? 'La máxima fiesta del fútbol amateur en México. Más de 1,400 jugadores, equipos internacionales de EE.UU. y Perú, y $1.9 millones en premios.'
                : 'The biggest amateur soccer tournament in Mexico. Over 1,400 players, international teams from USA and Peru, and $1.9 million MXN in prizes.'}
            </p>

            {/* Category pills */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6">
              {categories.map((c) => (
                <span
                  key={c}
                  className="bg-white/10 border border-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm"
                >
                  {c}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-6 text-center">
              {[
                { n: '1,400+', l: isEs ? 'Jugadores' : 'Players' },
                { n: '60K+', l: isEs ? 'Espectadores' : 'Spectators' },
                { n: '$1.9M', l: isEs ? 'En Premios' : 'In Prizes' },
                { n: '4', l: isEs ? 'Categorías' : 'Categories' },
              ].map((s) => (
                <div key={s.l}>
                  <p className="text-2xl font-bold text-white">{s.n}</p>
                  <p className="text-xs text-white/60 uppercase tracking-wider">{s.l}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/copa-potosi-2026"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-400 to-emerald-500 text-gray-900 px-8 py-3.5 rounded-full font-bold text-base hover:from-green-300 hover:to-emerald-400 transition-all duration-300 hover:scale-105 shadow-lg shadow-green-500/25"
            >
              {isEs ? 'Ver Toda la Info' : 'See Full Details'}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CopaPotosiBanner;
