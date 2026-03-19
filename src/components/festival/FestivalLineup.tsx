import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { headliners, localArtists, FestivalConcert } from '@/data/festival-primavera-2026';

const ConcertRow = ({ c }: { c: FestivalConcert }) => (
  <div className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-4 rounded-xl transition-colors ${
    c.highlight ? 'bg-purple-50 border border-purple-200' : 'bg-white border border-gray-100'
  }`}>
    <span className="text-sm font-mono text-gray-500 w-24 flex-shrink-0">{c.day}</span>
    <span className="text-sm text-purple-600 font-medium w-14 flex-shrink-0">{c.time}</span>
    <div className="flex-1 min-w-0">
      <p className={`font-semibold truncate ${c.highlight ? 'text-purple-900' : 'text-gray-900'}`}>
        {c.highlight && <span className="text-amber-500 mr-1">★</span>}
        {c.artist}
      </p>
      <p className="text-sm text-gray-500">{c.venue}</p>
    </div>
    {c.genre && (
      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full flex-shrink-0">
        {c.genre}
      </span>
    )}
  </div>
);

const FestivalLineup = () => {
  const { t } = useTranslation('common');
  const { locale } = useRouter();
  const isEs = locale === 'es';

  return (
    <section id="lineup" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        {/* Headliners */}
        <div className="mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {t('festival.headliners')}
          </h2>
          <p className="text-gray-500 mb-6">
            {isEs ? 'Todos los conciertos en plazas públicas son gratuitos' : 'All concerts in public plazas are free'}
          </p>
          <div className="space-y-3">
            {headliners.map((c, i) => <ConcertRow key={i} c={c} />)}
          </div>
        </div>

        {/* Local artists */}
        <div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {isEs ? 'Artistas Locales (CAPO)' : 'Local Artists (CAPO)'}
          </h2>
          <p className="text-gray-500 mb-6">
            {isEs ? '22 grupos potosinos — música, teatro, danza y circo' : '22 local groups — music, theater, dance and circus'}
          </p>
          <div className="space-y-3">
            {localArtists.map((c, i) => <ConcertRow key={i} c={c} />)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FestivalLineup;
