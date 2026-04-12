import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

interface EventSlide {
  key: string;
  href: string;
  image: string;
  imageFit?: 'cover' | 'contain';
  bgColor?: string;
  gradient: string;
  badgeBg: string;
  badgeText: string;
  badgeDot: string;
  ctaGradient: string;
  ctaHover: string;
  ctaShadow: string;
}

const slides: EventSlide[] = [
  {
    key: 'metalFest',
    href: '/events/san-luis-metal-fest-2026',
    image: '/images/events/metal-fest-stage.jpg',
    gradient: 'from-black/80 via-red-950/70 to-purple-950/80',
    badgeBg: 'bg-red-500/20 border-red-500/30',
    badgeText: 'text-red-300',
    badgeDot: 'bg-red-500',
    ctaGradient: 'from-red-500 to-red-600',
    ctaHover: 'hover:from-red-400 hover:to-red-500',
    ctaShadow: 'shadow-red-500/25',
  },
  {
    key: 'maraton',
    href: '/events/maraton-tangamanga-2026',
    image: '/images/events/maraton-runners.jpg',
    gradient: 'from-emerald-950/80 via-teal-900/70 to-blue-950/80',
    badgeBg: 'bg-amber-400/20 border-amber-400/30',
    badgeText: 'text-amber-300',
    badgeDot: 'bg-amber-400',
    ctaGradient: 'from-amber-400 to-amber-500',
    ctaHover: 'hover:from-amber-300 hover:to-amber-400',
    ctaShadow: 'shadow-amber-500/25',
  },
  {
    key: 'fenapo',
    href: '/events/fenapo-2026',
    image: '/images/events/fenapo-2026-logo.png',
    imageFit: 'contain',
    bgColor: 'bg-black',
    gradient: 'from-blue-950/80 via-purple-900/70 to-indigo-950/80',
    badgeBg: 'bg-purple-400/20 border-purple-400/30',
    badgeText: 'text-purple-300',
    badgeDot: 'bg-purple-400',
    ctaGradient: 'from-purple-400 to-purple-500',
    ctaHover: 'hover:from-purple-300 hover:to-purple-400',
    ctaShadow: 'shadow-purple-500/25',
  },
];

const EventCarouselBanner = () => {
  const { t } = useTranslation('common');
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [fading, setFading] = useState(false);

  const goTo = useCallback((index: number) => {
    setFading(true);
    setTimeout(() => {
      setCurrent(index);
      setFading(false);
    }, 300);
  }, []);

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [paused, next]);

  const slide = slides[current];
  const ns = `eventCarousel.${slide.key}`;

  const stats = [
    { value: t(`${ns}.stat1Value`), label: t(`${ns}.stat1Label`) },
    { value: t(`${ns}.stat2Value`), label: t(`${ns}.stat2Label`) },
    { value: t(`${ns}.stat3Value`), label: t(`${ns}.stat3Label`) },
    { value: t(`${ns}.stat4Value`), label: t(`${ns}.stat4Label`) },
  ];

  return (
    <section
      className="relative overflow-hidden min-h-[420px] md:min-h-[380px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Base background color (shown when image uses contain) */}
      {slide.bgColor && <div className={`absolute inset-0 ${slide.bgColor}`} />}

      {/* Background image */}
      <div
        className={
          slide.imageFit === 'contain'
            ? 'absolute inset-6 md:inset-10 lg:inset-12'
            : 'absolute inset-0'
        }
      >
        <Image
          src={slide.image}
          alt={t(`${ns}.title`)}
          fill
          className={`${slide.imageFit === 'contain' ? 'object-contain' : 'object-cover'} transition-opacity duration-500 ${fading ? 'opacity-0' : 'opacity-100'}`}
          sizes="100vw"
          loading="lazy"
        />
      </div>

      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />

      {/* Stars effect */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            'radial-gradient(2px 2px at 20px 30px, white, transparent), radial-gradient(2px 2px at 40px 70px, white, transparent), radial-gradient(1px 1px at 90px 40px, white, transparent), radial-gradient(1px 1px at 130px 80px, white, transparent), radial-gradient(2px 2px at 160px 30px, white, transparent)',
          backgroundSize: '200px 100px',
        }}
      />

      <div className={`relative container mx-auto px-4 md:px-8 lg:px-16 py-10 md:py-14 transition-opacity duration-300 ${fading ? 'opacity-0' : 'opacity-100'}`}>
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-3xl mx-auto lg:mx-0">
          {/* Badge */}
          <div className={`inline-flex items-center gap-2 ${slide.badgeBg} border rounded-full px-4 py-1.5 mb-4`}>
            <span className={`w-2 h-2 rounded-full ${slide.badgeDot} animate-pulse`} />
            <span className={`${slide.badgeText} text-xs font-bold uppercase tracking-widest`}>
              {t(`${ns}.badge`)}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-3 leading-tight drop-shadow-lg">
            {t(`${ns}.title`)}
          </h3>

          {/* Description */}
          <p className="text-white/90 text-sm md:text-base max-w-2xl mb-5 leading-relaxed drop-shadow">
            {t(`${ns}.description`)}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-bold text-white drop-shadow">{s.value}</p>
                <p className="text-xs text-white/70 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <Link
            href={slide.href}
            className={`inline-flex items-center gap-2 bg-gradient-to-r ${slide.ctaGradient} text-white px-8 py-3.5 rounded-full font-bold text-base ${slide.ctaHover} transition-all duration-300 hover:scale-105 shadow-lg ${slide.ctaShadow}`}
          >
            {t(`${ns}.cta`)}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Dots */}
        <div className="flex justify-center lg:justify-start gap-2 mt-8">
          {slides.map((s, i) => (
            <button
              key={s.key}
              onClick={() => goTo(i)}
              aria-label={`Go to ${s.key}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === current ? 'bg-white w-8' : 'bg-white/40 hover:bg-white/60 w-2.5'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventCarouselBanner;
