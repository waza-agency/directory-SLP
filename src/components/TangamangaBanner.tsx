import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

export default function TangamangaBanner() {
  const { t } = useTranslation('common');

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-r from-green-700 via-emerald-600 to-green-800">
      {/* Subtle leaf pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative container mx-auto px-4 md:px-8 lg:px-16 py-12 md:py-16">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left: Stats cluster */}
          <div className="flex-shrink-0">
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: '411', label: t('tangamangaBanner.stats.hectares') },
                { value: '400K', label: t('tangamangaBanner.stats.trees') },
                { value: t('tangamangaBanner.stats.free'), label: t('tangamangaBanner.stats.entry') },
                { value: '100+', label: t('tangamangaBanner.stats.species') },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="w-24 h-24 rounded-2xl bg-white/15 border border-white/20 flex flex-col items-center justify-center backdrop-blur-sm"
                >
                  <span className="text-xl font-bold text-white">{stat.value}</span>
                  <span className="text-[10px] text-white/70 uppercase tracking-wider">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Center: Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-4 py-1.5 mb-4">
              <span className="text-white text-xs font-bold uppercase tracking-widest">
                {t('tangamangaBanner.badge')}
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4 leading-tight">
              {t('tangamangaBanner.title')}
              <span className="block text-lg md:text-xl font-light text-white/70 mt-2">
                {t('tangamangaBanner.subtitle')}
              </span>
            </h2>

            <p className="text-white/80 text-sm md:text-base max-w-2xl mb-5 leading-relaxed">
              {t('tangamangaBanner.description')}
            </p>

            <Link
              href="/parque-tangamanga"
              className="inline-flex items-center gap-2 bg-white text-green-800 px-8 py-3.5 rounded-full font-bold text-base hover:bg-green-50 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              {t('tangamangaBanner.cta')}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Right: Image */}
          <div className="flex-shrink-0 w-full lg:w-80 relative h-64 lg:h-80">
            <Image
              src="/images/parque-tangamanga/banner.jpg"
              alt={t('tangamangaBanner.altText')}
              fill
              className="object-cover rounded-2xl shadow-xl"
              sizes="(max-width: 1024px) 100vw, 320px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}