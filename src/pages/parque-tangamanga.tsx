import { GetStaticProps } from 'next';
import Image from 'next/image';
import { ClockIcon, MapPinIcon, TicketIcon, SunIcon, UsersIcon, SparklesIcon, HeartIcon } from '@heroicons/react/24/outline';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'es', ['common'])),
    },
  };
};

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
            {/* Quick Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <ClockIcon className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t('tangamanga.hours')}</p>
                    <p className="font-semibold text-sm">{t('tangamanga.hoursMon')}</p>
                    <p className="font-semibold text-sm">{t('tangamanga.hoursTueSun')}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <TicketIcon className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t('tangamanga.admission')}</p>
                    <p className="font-semibold text-sm">{t('tangamanga.freeEntry')}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <MapPinIcon className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t('tangamanga.location')}</p>
                    <p className="font-semibold text-sm">Av. Dr. Salvador Nava</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <SunIcon className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t('tangamanga.size')}</p>
                    <p className="font-semibold text-sm">{t('tangamanga.hectares')}</p>
                  </div>
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
                  <h3 className="text-xl font-semibold mb-3">{t('tangamanga.history.creationTitle')}</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {t('tangamanga.history.creationText')}
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">{t('tangamanga.history.impactTitle')}</h3>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                  <ul className="space-y-3">
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
                  <ul className="space-y-3">
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
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Services Card */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-bold mb-6">{t('tangamanga.services.title')}</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-lg p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">{t('tangamanga.services.parking')}</span>
                </div>
                <div className="bg-green-50 rounded-lg p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">{t('tangamanga.services.restrooms')}</span>
                </div>
                <div className="bg-green-50 rounded-lg p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">{t('tangamanga.services.food')}</span>
                </div>
                <div className="bg-green-50 rounded-lg p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">{t('tangamanga.services.bikeRental')}</span>
                </div>
              </div>
            </div>

            {/* Tips Card */}
            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-8 text-white">
              <h3 className="text-xl font-bold mb-6">{t('tangamanga.tips.title')}</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-200 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{t('tangamanga.tips.tip1')}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-200 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{t('tangamanga.tips.tip2')}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-200 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{t('tangamanga.tips.tip3')}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-200 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{t('tangamanga.tips.tip4')}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-200 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{t('tangamanga.tips.tip5')}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-200 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{t('tangamanga.tips.tip6')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
