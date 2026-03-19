import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { CalendarIcon, MapPinIcon, MusicalNoteIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { festivalInfo } from '@/data/festival-primavera-2026';

const FestivalHero = () => {
  const { t } = useTranslation('common');
  const { locale } = useRouter();
  const isEs = locale === 'es';

  const stats = [
    { label: isEs ? 'Actividades' : 'Activities', value: festivalInfo.activities },
    { label: isEs ? 'Artistas' : 'Artists', value: festivalInfo.artists },
    { label: isEs ? 'Países' : 'Countries', value: String(festivalInfo.countries) },
    { label: isEs ? 'Sedes' : 'Venues', value: String(festivalInfo.venues) },
  ];

  return (
    <section className="relative bg-[#1a0a3e] text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a3e] via-[#4a1478] to-[#0d2b6b]" />
      <div className="absolute inset-0 opacity-30"
        style={{ background: 'radial-gradient(ellipse at 20% 50%, #ff6b9d33 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, #4f46e533 0%, transparent 50%)' }}
      />
      <div className="absolute inset-0 opacity-40"
        style={{ backgroundImage: 'radial-gradient(2px 2px at 20px 30px, white, transparent), radial-gradient(1px 1px at 90px 40px, white, transparent), radial-gradient(2px 2px at 160px 30px, white, transparent)', backgroundSize: '200px 100px' }}
      />

      <div className="relative container mx-auto px-4 md:px-8 lg:px-16 py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto">
          {/* Colibri */}
          <div className="relative w-36 h-28 md:w-48 md:h-36 mx-auto mb-6">
            <Image src="/images/festival/colibri.png" alt="Colibrí" fill className="object-contain drop-shadow-[0_0_30px_rgba(255,107,157,0.5)]" />
          </div>

          <span className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/30 rounded-full px-4 py-1.5 text-sm font-bold mb-4">
            <MusicalNoteIcon className="w-4 h-4 text-amber-300" />
            <span className="text-amber-300">{festivalInfo.edition}</span>
          </span>

          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
            {t('festival.title')}
          </h1>
          <p className="text-xl md:text-2xl text-white/80 italic mb-6">
            &ldquo;{isEs ? festivalInfo.theme : festivalInfo.themeEn}&rdquo;
          </p>

          {/* Description */}
          <p className="text-white/70 text-base md:text-lg max-w-3xl mx-auto mb-8 leading-relaxed">
            {t('festivalBanner.description')}
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-10 text-sm">
            <span className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
              <CalendarIcon className="w-4 h-4" />
              {isEs ? festivalInfo.dates : festivalInfo.datesEn}
            </span>
            <span className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
              <MapPinIcon className="w-4 h-4" />
              {festivalInfo.location}
            </span>
            <span className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
              <GlobeAltIcon className="w-4 h-4" />
              {isEs ? `País invitado: ${festivalInfo.guestCountry}` : 'Guest country: Spain'}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-10">
            {stats.map(s => (
              <div key={s.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <p className="text-3xl font-bold">{s.value}</p>
                <p className="text-white/60 text-sm">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={festivalInfo.schedule} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900 px-8 py-3 rounded-full font-bold hover:from-amber-300 hover:to-amber-400 transition-all shadow-lg shadow-amber-500/25">
              {t('festival.viewSchedule')}
            </a>
            <a href="#lineup"
              className="inline-flex items-center justify-center gap-2 bg-white/15 border border-white/30 px-8 py-3 rounded-full font-bold hover:bg-white/25 transition-all">
              {t('festival.seeLineup')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FestivalHero;
