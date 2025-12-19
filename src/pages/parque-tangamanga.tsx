import { GetStaticProps } from 'next';
import Image from 'next/image';
import { ClockIcon, MapPinIcon, TicketIcon, SunIcon, UsersIcon, SparklesIcon, HeartIcon, TrophyIcon, FireIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'es', ['common'])),
    },
  };
};

/**
 * Page component that renders the Parque Tangamanga informational layout.
 *
 * Renders a hero image and a multi-section content area (ranking highlight, quick info cards,
 * history, attractions, activities, biodiversity, sustainability) alongside a sidebar with services
 * and tips. Text and image alt text are sourced from the 'common' translation namespace.
 *
 * @returns The React element for the Parque Tangamanga page
 */
export default function ParqueTangamanga() {
  const { t } = useTranslation('common');

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full">
        <Image
          src="/images/parque-tangamanga/hero.jpg"
          alt={t('tangamanga.title')}
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {t('tangamanga.title')}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">
              {t('tangamanga.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Description */}
          <div className="lg:col-span-2 space-y-12">
            {/* Ranking Highlight */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white shadow-xl">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <TrophyIcon className="w-12 h-12" />
                <h2 className="text-3xl font-bold">{t('tangamanga.rankingText')}</h2>
              </div>
              <div className="grid grid-cols-3 gap-6 mt-6 text-center">
                <div>
                  <p className="text-4xl font-bold">{t('tangamanga.hectares')}</p>
                  <p className="text-sm opacity-90 mt-1">{t('tangamanga.size')}</p>
                </div>
                <div>
                  <p className="text-4xl font-bold">{t('tangamanga.treesCount')}</p>
                  <p className="text-sm opacity-90 mt-1">{t('tangamanga.trees')}</p>
                </div>
                <div>
                  <p className="text-4xl font-bold">{t('tangamanga.oxygenProduction')}</p>
                  <p className="text-sm opacity-90 mt-1">{t('tangamanga.oxygen')}</p>
                </div>
              </div>
            </div>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <ClockIcon className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-500">{t('tangamanga.hours')}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{t('tangamanga.hoursMon')}</p>
                    <p className="font-semibold text-sm">{t('tangamanga.hoursTueSun')}</p>
                    <p className="text-xs text-gray-500 mt-1">{t('tangamanga.hoursNote')}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <TicketIcon className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-500">{t('tangamanga.admission')}</p>
                  </div>
                  <p className="font-semibold text-lg text-green-600">{t('tangamanga.freeEntry')}</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <MapPinIcon className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-500">{t('tangamanga.location')}</p>
                  </div>
                  <p className="font-semibold text-sm">Av. Dr. Salvador Nava</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <TrophyIcon className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-500">{t('tangamanga.ranking')}</p>
                  </div>
                  <p className="font-semibold text-sm">#2 en México</p>
                </div>
              </div>
            </div>

            {/* History Section with Image */}
            <section className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <SparklesIcon className="w-6 h-6 text-green-600" />
                <h2 className="text-2xl font-bold">{t('tangamanga.history.title')}</h2>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-8">
                  <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden">
                    <Image
                      src="/images/parque-tangamanga/historical.jpg"
                      alt={t('tangamanga.history.meaningTitle')}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">{t('tangamanga.history.meaningTitle')}</h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {t('tangamanga.history.meaningText')}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">{t('tangamanga.history.originTitle')}</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {t('tangamanga.history.originText')}
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">{t('tangamanga.history.creationTitle')}</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {t('tangamanga.history.creationText')}
                  </p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3 text-green-800">{t('tangamanga.history.impactTitle')}</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {t('tangamanga.history.impactText')}
                  </p>
                </div>
              </div>
            </section>

            {/* Main Attractions with Images */}
            <section className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <SparklesIcon className="w-6 h-6 text-green-600" />
                <h2 className="text-2xl font-bold">{t('tangamanga.attractions.title')}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-6">
                    <Image
                      src="/images/parque-tangamanga/lake.jpg"
                      alt={t('tangamanga.attractions.naturalTitle')}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  <h3 className="font-semibold text-lg mb-4">{t('tangamanga.attractions.naturalTitle')}</h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                      <span>{t('tangamanga.attractions.natural1')}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                      <span>{t('tangamanga.attractions.natural2')}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                      <span>{t('tangamanga.attractions.natural3')}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                      <span>{t('tangamanga.attractions.natural4')}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                      <span>{t('tangamanga.attractions.natural5')}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                      <span>{t('tangamanga.attractions.natural6')}</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-6">
                    <Image
                      src="/images/parque-tangamanga/sports.jpg"
                      alt={t('tangamanga.attractions.sportsTitle')}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  <h3 className="font-semibold text-lg mb-4">{t('tangamanga.attractions.sportsTitle')}</h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                      <span>{t('tangamanga.attractions.sports1')}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                      <span>{t('tangamanga.attractions.sports2')}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                      <span>{t('tangamanga.attractions.sports3')}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                      <span>{t('tangamanga.attractions.sports4')}</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-6">
                    <Image
                      src="/images/parque-tangamanga/historical.jpg"
                      alt={t('tangamanga.attractions.culturalTitle')}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  <h3 className="font-semibold text-lg mb-4">{t('tangamanga.attractions.culturalTitle')}</h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                      <span>{t('tangamanga.attractions.cultural1')}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                      <span>{t('tangamanga.attractions.cultural2')}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                      <span>{t('tangamanga.attractions.cultural3')}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                      <span>{t('tangamanga.attractions.cultural4')}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                      <span>{t('tangamanga.attractions.cultural5')}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                      <span>{t('tangamanga.attractions.cultural6')}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Activities Section with Image Gallery */}
            <section className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <UsersIcon className="w-6 h-6 text-green-600" />
                <h2 className="text-2xl font-bold">{t('tangamanga.activities.title')}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden mb-6">
                    <Image
                      src="/images/parque-tangamanga/activities-sports.jpeg"
                      alt={t('tangamanga.activities.sportsTitle')}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="bg-green-50 rounded-lg p-6">
                    <h3 className="font-semibold mb-4">{t('tangamanga.activities.sportsTitle')}</h3>
                    <ul className="space-y-3 text-sm">
                      <li>{t('tangamanga.activities.sports1')}</li>
                      <li>{t('tangamanga.activities.sports2')}</li>
                      <li>{t('tangamanga.activities.sports3')}</li>
                      <li>{t('tangamanga.activities.sports4')}</li>
                      <li>{t('tangamanga.activities.sports5')}</li>
                      <li>{t('tangamanga.activities.sports6')}</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden mb-6">
                    <Image
                      src="/images/parque-tangamanga/activities-culture.jpeg"
                      alt={t('tangamanga.activities.cultureTitle')}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="bg-green-50 rounded-lg p-6">
                    <h3 className="font-semibold mb-4">{t('tangamanga.activities.cultureTitle')}</h3>
                    <ul className="space-y-3 text-sm">
                      <li>{t('tangamanga.activities.culture1')}</li>
                      <li>{t('tangamanga.activities.culture2')}</li>
                      <li>{t('tangamanga.activities.culture3')}</li>
                      <li>{t('tangamanga.activities.culture4')}</li>
                      <li>{t('tangamanga.activities.culture5')}</li>
                      <li>{t('tangamanga.activities.culture6')}</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden mb-6">
                    <Image
                      src="/images/parque-tangamanga/activities-family.jpg"
                      alt={t('tangamanga.activities.familyTitle')}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="bg-green-50 rounded-lg p-6">
                    <h3 className="font-semibold mb-4">{t('tangamanga.activities.familyTitle')}</h3>
                    <ul className="space-y-3 text-sm">
                      <li>{t('tangamanga.activities.family1')}</li>
                      <li>{t('tangamanga.activities.family2')}</li>
                      <li>{t('tangamanga.activities.family3')}</li>
                      <li>{t('tangamanga.activities.family4')}</li>
                      <li>{t('tangamanga.activities.family5')}</li>
                      <li>{t('tangamanga.activities.family6')}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Biodiversity Section with Image */}
            <section className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <HeartIcon className="w-6 h-6 text-green-600" />
                <h2 className="text-2xl font-bold">{t('tangamanga.biodiversity.title')}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {t('tangamanga.biodiversity.text')}
                </p>
                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden">
                  <Image
                    src="/images/parque-tangamanga/biodiversity.jpg"
                    alt={t('tangamanga.biodiversity.title')}
                    fill
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </section>

            {/* Sustainability Section */}
            <section className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-8 shadow-lg border-2 border-green-200">
              <div className="flex items-center space-x-3 mb-6">
                <ArrowTrendingUpIcon className="w-6 h-6 text-green-600" />
                <h2 className="text-2xl font-bold text-green-800">{t('tangamanga.sustainability.title')}</h2>
              </div>
              <p className="text-lg text-gray-700 mb-8">{t('tangamanga.sustainability.description')}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{t('tangamanga.sustainability.feature1Title')}</h3>
                  <p className="text-gray-600 text-sm">{t('tangamanga.sustainability.feature1Text')}</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                    <FireIcon className="w-6 h-6 text-amber-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{t('tangamanga.sustainability.feature2Title')}</h3>
                  <p className="text-gray-600 text-sm">{t('tangamanga.sustainability.feature2Text')}</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <HeartIcon className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{t('tangamanga.sustainability.feature3Title')}</h3>
                  <p className="text-gray-600 text-sm">{t('tangamanga.sustainability.feature3Text')}</p>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Services Card */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-bold mb-6">{t('tangamanga.services.title')}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium">{t('tangamanga.services.parking')}</span>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium">{t('tangamanga.services.restrooms')}</span>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium">{t('tangamanga.services.food')}</span>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium">{t('tangamanga.services.bikeRental')}</span>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium">{t('tangamanga.services.waterpark')}</span>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium">{t('tangamanga.services.museum')}</span>
                </div>
              </div>
            </div>

            {/* Tips Card */}
            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-8 text-white">
              <h3 className="text-xl font-bold mb-6">{t('tangamanga.tips.title')}</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-200 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm">{t('tangamanga.tips.tip1')}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-200 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm">{t('tangamanga.tips.tip2')}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-200 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm">{t('tangamanga.tips.tip3')}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-200 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm">{t('tangamanga.tips.tip4')}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-200 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm">{t('tangamanga.tips.tip5')}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-200 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm">{t('tangamanga.tips.tip6')}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-200 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm">{t('tangamanga.tips.tip7')}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-200 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm">{t('tangamanga.tips.tip8')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}