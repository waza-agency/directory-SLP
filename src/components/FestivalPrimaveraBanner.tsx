import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const artists = ['Miguel Bosé', 'Lucero', 'Mon Laferte', 'Diego El Cigala', 'Gilberto Santa Rosa', 'Gente de Zona'];

const FestivalPrimaveraBanner = () => {
  const { t } = useTranslation('common');
  const { locale } = useRouter();
  const isEs = locale === 'es';

  return (
    <section className="relative overflow-hidden bg-[#1a0a3e]">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a3e] via-[#4a1478] to-[#0d2b6b]" />
      <div className="absolute inset-0 opacity-30"
        style={{ background: 'radial-gradient(ellipse at 20% 50%, #ff6b9d33 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, #4f46e533 0%, transparent 50%), radial-gradient(ellipse at 60% 80%, #f59e0b22 0%, transparent 50%)' }}
      />
      {/* Stars effect */}
      <div className="absolute inset-0 opacity-40"
        style={{ backgroundImage: 'radial-gradient(2px 2px at 20px 30px, white, transparent), radial-gradient(2px 2px at 40px 70px, white, transparent), radial-gradient(1px 1px at 90px 40px, white, transparent), radial-gradient(1px 1px at 130px 80px, white, transparent), radial-gradient(2px 2px at 160px 30px, white, transparent)', backgroundSize: '200px 100px' }}
      />

      <div className="relative container mx-auto px-4 md:px-8 lg:px-16 py-10 md:py-14">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">

          {/* Left: Colibri + Logo */}
          <div className="flex-shrink-0 flex flex-col items-center lg:items-start gap-4">
            <div className="relative w-32 h-28 md:w-40 md:h-32">
              <Image src="/images/festival/colibri.png" alt="Festival Colibrí" fill className="object-contain drop-shadow-[0_0_25px_rgba(255,107,157,0.5)]" />
            </div>
            <Image src="/images/festival/logo-horizontal.png" alt="Festival San Luis en Primavera" width={280} height={42} className="hidden lg:block opacity-90" />
          </div>

          {/* Center: Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/30 rounded-full px-4 py-1.5 mb-3">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-amber-300 text-xs font-bold uppercase tracking-widest">
                {t('festivalBanner.badge')}
              </span>
            </div>

            <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-3 leading-tight">
              {t('festivalBanner.title')}
            </h3>

            <p className="text-white/80 text-sm md:text-base max-w-2xl mb-4 leading-relaxed">
              {t('festivalBanner.description')}
            </p>

            {/* Artist pills */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6">
              {artists.map(a => (
                <span key={a} className="bg-white/10 border border-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm">
                  {a}
                </span>
              ))}
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-6 text-center">
              {[
                { n: '110+', l: isEs ? 'Eventos' : 'Events' },
                { n: '800+', l: isEs ? 'Artistas' : 'Artists' },
                { n: '14', l: isEs ? 'Sedes' : 'Venues' },
                { n: isEs ? 'Gratis' : 'Free', l: isEs ? 'Entrada' : 'Admission' },
              ].map(s => (
                <div key={s.l}>
                  <p className="text-2xl font-bold text-white">{s.n}</p>
                  <p className="text-xs text-white/60 uppercase tracking-wider">{s.l}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/festival-primavera-2026"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900 px-8 py-3.5 rounded-full font-bold text-base hover:from-amber-300 hover:to-amber-400 transition-all duration-300 hover:scale-105 shadow-lg shadow-amber-500/25"
            >
              {t('festivalBanner.cta')}
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

export default FestivalPrimaveraBanner;
