import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { MapPinIcon, TicketIcon, DevicePhoneMobileIcon, StarIcon } from '@heroicons/react/24/outline';
import { venues, festivalInfo } from '@/data/festival-primavera-2026';

const FestivalDetails = () => {
  const { t } = useTranslation('common');
  const { locale } = useRouter();
  const isEs = locale === 'es';

  const highlights = isEs ? [
    { icon: '🇪🇸', title: 'España, país invitado', desc: 'Exposiciones fotográficas, catas de vino español y actividades culturales de la Embajada de España.' },
    { icon: '🎭', title: 'Guelaguetza de Oaxaca', desc: '320 participantes con danza, música y artesanías del estado invitado.' },
    { icon: '🕯️', title: 'Procesión del Silencio', desc: '73ª edición, 3 de abril. 2,000 cofrades, 3.5 km por el Centro Histórico. Hermanamiento con Sevilla, España.' },
    { icon: '♿', title: 'Festival inclusivo', desc: 'Chalecos sensoriales, intérpretes de LSM, audiodescripción y materiales en braille. Pionero en Latinoamérica.' },
    { icon: '🍷', title: 'Gastronomía', desc: 'Catas de vino español, mezcal y café salvadoreño. Cocina oaxaqueña y demostraciones culinarias.' },
    { icon: '🎸', title: 'Jazz & Flow', desc: 'Freestyle rap con Orquesta Nacional de Jazz. Jony Beltrán, Skiper, Pato Machete y más.' },
  ] : [
    { icon: '🇪🇸', title: 'Spain, guest country', desc: 'Photo exhibitions, Spanish wine tastings and cultural events from the Embassy of Spain.' },
    { icon: '🎭', title: 'Guelaguetza from Oaxaca', desc: '320 participants with dance, music and crafts from the guest state.' },
    { icon: '🕯️', title: 'Procession of Silence', desc: '73rd edition, April 3. 2,000 brothers, 3.5km through the Historic Center. Twinned with Seville, Spain.' },
    { icon: '♿', title: 'Inclusive festival', desc: 'Sensory vests, sign language interpreters, audio description and braille materials. Pioneer in Latin America.' },
    { icon: '🍷', title: 'Gastronomy', desc: 'Spanish wine, mezcal and Salvadoran coffee tastings. Oaxacan cuisine and culinary demonstrations.' },
    { icon: '🎸', title: 'Jazz & Flow', desc: 'Freestyle rap with the National Jazz Orchestra. Jony Beltrán, Skiper, Pato Machete and more.' },
  ];

  return (
    <>
      {/* Highlights */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            {isEs ? 'Eventos Destacados' : 'Event Highlights'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {highlights.map(h => (
              <div key={h.title} className="bg-gray-50 rounded-xl p-5 border border-gray-100 hover:shadow-md transition-shadow">
                <span className="text-3xl mb-3 block">{h.icon}</span>
                <h3 className="font-bold text-gray-900 mb-1">{h.title}</h3>
                <p className="text-sm text-gray-600">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Venues + Practical Info */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Venues */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MapPinIcon className="w-6 h-6 text-purple-600" />
                {isEs ? 'Sedes' : 'Venues'}
              </h2>
              <div className="space-y-2">
                {venues.map(v => (
                  <div key={v.name} className="flex justify-between items-center bg-white rounded-lg p-3 border border-gray-100">
                    <span className="font-medium text-gray-900">{v.name}</span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{v.type}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Practical info */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TicketIcon className="w-6 h-6 text-purple-600" />
                {isEs ? 'Info Práctica' : 'Practical Info'}
              </h2>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-4 border border-gray-100">
                  <p className="font-semibold text-gray-900">{isEs ? 'Entrada' : 'Admission'}</p>
                  <p className="text-sm text-gray-600">{isEs ? festivalInfo.admission : festivalInfo.admissionEn}</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-100">
                  <p className="font-semibold text-gray-900">{isEs ? 'Clima' : 'Weather'}</p>
                  <p className="text-sm text-gray-600">{isEs ? '20-25°C, primaveral. Lleva protector solar y agua.' : '20-25°C, spring weather. Bring sunscreen and water.'}</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-100">
                  <p className="font-semibold text-gray-900">{isEs ? 'Transporte' : 'Transportation'}</p>
                  <p className="text-sm text-gray-600">{isEs ? 'Todas las sedes en el Centro Histórico, accesibles a pie.' : 'All venues in the Historic Center, walkable.'}</p>
                </div>
                <a href={festivalInfo.website} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-purple-600 text-white rounded-lg p-4 font-semibold hover:bg-purple-700 transition-colors">
                  <DevicePhoneMobileIcon className="w-5 h-5" />
                  {isEs ? 'Sitio oficial del festival' : 'Official festival website'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FestivalDetails;
