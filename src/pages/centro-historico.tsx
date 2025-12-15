import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ClockIcon,
  MapPinIcon,
  BuildingLibraryIcon,
  SparklesIcon,
  MusicalNoteIcon,
  ShoppingBagIcon,
  CameraIcon,
  StarIcon,
  ShieldCheckIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import SEO from '@/components/common/SEO';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'es', ['common'])),
    },
  };
};

export default function CentroHistorico() {
  const { t } = useTranslation('common');

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <SEO
        title={t('centroHistorico.seo.title')}
        description={t('centroHistorico.seo.description')}
        keywords="Centro Historico San Luis Potosi, colonial architecture, Plaza de Armas, Cathedral, expat guide, historic downtown"
      />

      {/* Hero Section */}
      <section className="relative h-[70vh] w-full">
        <Image
          src="/images/centro-historico/hero.jpg"
          alt={t('centroHistorico.title')}
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <div className="container mx-auto">
              <span className="inline-flex items-center gap-2 bg-amber-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <StarIcon className="w-4 h-4" />
                {t('centroHistorico.badge')}
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                {t('centroHistorico.title')}
              </h1>
              <p className="text-xl text-white/90 max-w-2xl">
                {t('centroHistorico.subtitle')}
              </p>
            </div>
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
                  <div className="bg-amber-100 p-2 rounded-lg">
                    <MapPinIcon className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t('centroHistorico.quickInfo.location')}</p>
                    <p className="font-semibold text-sm">{t('centroHistorico.quickInfo.locationValue')}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-amber-100 p-2 rounded-lg">
                    <ClockIcon className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t('centroHistorico.quickInfo.bestTime')}</p>
                    <p className="font-semibold text-sm">{t('centroHistorico.quickInfo.bestTimeValue')}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-amber-100 p-2 rounded-lg">
                    <ShieldCheckIcon className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t('centroHistorico.quickInfo.safety')}</p>
                    <p className="font-semibold text-sm">{t('centroHistorico.quickInfo.safetyValue')}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-amber-100 p-2 rounded-lg">
                    <BuildingLibraryIcon className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t('centroHistorico.quickInfo.founded')}</p>
                    <p className="font-semibold text-sm">1592</p>
                  </div>
                </div>
              </div>
            </div>

            {/* History Section */}
            <section className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <SparklesIcon className="w-6 h-6 text-amber-600" />
                <h2 className="text-2xl font-bold">{t('centroHistorico.history.title')}</h2>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-8">
                  <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden">
                    <Image
                      src="/images/centro-historico/cathedral.jpg"
                      alt={t('centroHistorico.history.cathedralAlt')}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">{t('centroHistorico.history.originsTitle')}</h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {t('centroHistorico.history.originsText')}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">{t('centroHistorico.history.architectureTitle')}</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {t('centroHistorico.history.architectureText')}
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">{t('centroHistorico.history.todayTitle')}</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {t('centroHistorico.history.todayText')}
                  </p>
                </div>
              </div>
            </section>

            {/* Points of Interest */}
            <section className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <CameraIcon className="w-6 h-6 text-amber-600" />
                <h2 className="text-2xl font-bold">{t('centroHistorico.pointsOfInterest.title')}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-6">
                    <Image
                      src="/images/centro-historico/plaza-armas.jpg"
                      alt={t('centroHistorico.pointsOfInterest.landmarksTitle')}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  <h3 className="font-semibold text-lg mb-4">{t('centroHistorico.pointsOfInterest.landmarksTitle')}</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-amber-500 rounded-full mt-2"></span>
                      <span>{t('centroHistorico.pointsOfInterest.landmark1')}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-amber-500 rounded-full mt-2"></span>
                      <span>{t('centroHistorico.pointsOfInterest.landmark2')}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-amber-500 rounded-full mt-2"></span>
                      <span>{t('centroHistorico.pointsOfInterest.landmark3')}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-amber-500 rounded-full mt-2"></span>
                      <span>{t('centroHistorico.pointsOfInterest.landmark4')}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-amber-500 rounded-full mt-2"></span>
                      <span>{t('centroHistorico.pointsOfInterest.landmark5')}</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-6">
                    <Image
                      src="/images/centro-historico/museums.jpg"
                      alt={t('centroHistorico.pointsOfInterest.museumsTitle')}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  <h3 className="font-semibold text-lg mb-4">{t('centroHistorico.pointsOfInterest.museumsTitle')}</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-amber-500 rounded-full mt-2"></span>
                      <span>{t('centroHistorico.pointsOfInterest.museum1')}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-amber-500 rounded-full mt-2"></span>
                      <span>{t('centroHistorico.pointsOfInterest.museum2')}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-amber-500 rounded-full mt-2"></span>
                      <span>{t('centroHistorico.pointsOfInterest.museum3')}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-amber-500 rounded-full mt-2"></span>
                      <span>{t('centroHistorico.pointsOfInterest.museum4')}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Gastronomy Section */}
            <section className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <HeartIcon className="w-6 h-6 text-amber-600" />
                <h2 className="text-2xl font-bold">{t('centroHistorico.gastronomy.title')}</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                {t('centroHistorico.gastronomy.intro')}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden mb-6">
                    <Image
                      src="/images/centro-historico/restaurants.jpg"
                      alt={t('centroHistorico.gastronomy.restaurantsTitle')}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="bg-amber-50 rounded-lg p-6">
                    <h3 className="font-semibold mb-4">{t('centroHistorico.gastronomy.restaurantsTitle')}</h3>
                    <ul className="space-y-3 text-sm">
                      <li>{t('centroHistorico.gastronomy.restaurant1')}</li>
                      <li>{t('centroHistorico.gastronomy.restaurant2')}</li>
                      <li>{t('centroHistorico.gastronomy.restaurant3')}</li>
                      <li>{t('centroHistorico.gastronomy.restaurant4')}</li>
                      <li>{t('centroHistorico.gastronomy.restaurant5')}</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden mb-6">
                    <Image
                      src="/images/centro-historico/bars.jpg"
                      alt={t('centroHistorico.gastronomy.barsTitle')}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="bg-amber-50 rounded-lg p-6">
                    <h3 className="font-semibold mb-4">{t('centroHistorico.gastronomy.barsTitle')}</h3>
                    <ul className="space-y-3 text-sm">
                      <li>{t('centroHistorico.gastronomy.bar1')}</li>
                      <li>{t('centroHistorico.gastronomy.bar2')}</li>
                      <li>{t('centroHistorico.gastronomy.bar3')}</li>
                      <li>{t('centroHistorico.gastronomy.bar4')}</li>
                      <li>{t('centroHistorico.gastronomy.bar5')}</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden mb-6">
                    <Image
                      src="/images/centro-historico/markets.jpg"
                      alt={t('centroHistorico.gastronomy.marketsTitle')}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="bg-amber-50 rounded-lg p-6">
                    <h3 className="font-semibold mb-4">{t('centroHistorico.gastronomy.marketsTitle')}</h3>
                    <ul className="space-y-3 text-sm">
                      <li>{t('centroHistorico.gastronomy.market1')}</li>
                      <li>{t('centroHistorico.gastronomy.market2')}</li>
                      <li>{t('centroHistorico.gastronomy.market3')}</li>
                      <li>{t('centroHistorico.gastronomy.market4')}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Nightlife & Entertainment */}
            <section className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <MusicalNoteIcon className="w-6 h-6 text-amber-600" />
                <h2 className="text-2xl font-bold">{t('centroHistorico.nightlife.title')}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-8">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {t('centroHistorico.nightlife.text')}
                </p>
                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden">
                  <Image
                    src="/images/centro-historico/nightlife.jpg"
                    alt={t('centroHistorico.nightlife.title')}
                    fill
                    className="object-cover object-center"
                  />
                </div>
              </div>

              {/* Bar Crawl Section */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
                <h3 className="text-xl font-semibold mb-3">{t('centroHistorico.nightlife.tourTitle')}</h3>
                <p className="text-gray-700 mb-4">{t('centroHistorico.nightlife.tourText')}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                    <span className="text-gray-700">{t('centroHistorico.nightlife.spot1')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                    <span className="text-gray-700">{t('centroHistorico.nightlife.spot2')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                    <span className="text-gray-700">{t('centroHistorico.nightlife.spot3')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                    <span className="text-gray-700">{t('centroHistorico.nightlife.spot4')}</span>
                  </div>
                </div>
                <p className="text-sm text-amber-700 font-medium italic">
                  {t('centroHistorico.nightlife.tourTip')}
                </p>
              </div>
            </section>

            {/* Shopping & Curiosities */}
            <section className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <ShoppingBagIcon className="w-6 h-6 text-amber-600" />
                <h2 className="text-2xl font-bold">{t('centroHistorico.shopping.title')}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-8">
                <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden">
                  <Image
                    src="/images/centro-historico/shopping.jpg"
                    alt={t('centroHistorico.shopping.title')}
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">{t('centroHistorico.shopping.artisansTitle')}</h3>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    {t('centroHistorico.shopping.artisansText')}
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-amber-500 rounded-full mt-2"></span>
                      <span>{t('centroHistorico.shopping.item1')}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-amber-500 rounded-full mt-2"></span>
                      <span>{t('centroHistorico.shopping.item2')}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-amber-500 rounded-full mt-2"></span>
                      <span>{t('centroHistorico.shopping.item3')}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-amber-500 rounded-full mt-2"></span>
                      <span>{t('centroHistorico.shopping.item4')}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Hidden Gems */}
            <section className="bg-gradient-to-br from-amber-600 to-amber-700 rounded-xl p-8 text-white">
              <div className="flex items-center space-x-3 mb-6">
                <StarIcon className="w-6 h-6 text-amber-200" />
                <h2 className="text-2xl font-bold">{t('centroHistorico.hiddenGems.title')}</h2>
              </div>
              <p className="text-lg text-amber-100 leading-relaxed mb-6">
                {t('centroHistorico.hiddenGems.intro')}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-3">{t('centroHistorico.hiddenGems.gem1Title')}</h3>
                  <p className="text-amber-100 text-sm">{t('centroHistorico.hiddenGems.gem1Text')}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-3">{t('centroHistorico.hiddenGems.gem2Title')}</h3>
                  <p className="text-amber-100 text-sm">{t('centroHistorico.hiddenGems.gem2Text')}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-3">{t('centroHistorico.hiddenGems.gem3Title')}</h3>
                  <p className="text-amber-100 text-sm">{t('centroHistorico.hiddenGems.gem3Text')}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-3">{t('centroHistorico.hiddenGems.gem4Title')}</h3>
                  <p className="text-amber-100 text-sm">{t('centroHistorico.hiddenGems.gem4Text')}</p>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Practical Info */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-bold mb-6">{t('centroHistorico.practical.title')}</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-amber-100 p-2 rounded-lg">
                    <MapPinIcon className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{t('centroHistorico.practical.gettingThere')}</h4>
                    <p className="text-sm text-gray-600">{t('centroHistorico.practical.gettingThereText')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-amber-100 p-2 rounded-lg">
                    <ClockIcon className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{t('centroHistorico.practical.parking')}</h4>
                    <p className="text-sm text-gray-600">{t('centroHistorico.practical.parkingText')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-amber-100 p-2 rounded-lg">
                    <ShieldCheckIcon className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{t('centroHistorico.practical.safetyInfo')}</h4>
                    <p className="text-sm text-gray-600">{t('centroHistorico.practical.safetyInfoText')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips Card */}
            <div className="bg-gradient-to-br from-amber-600 to-amber-700 rounded-xl p-8 text-white">
              <h3 className="text-xl font-bold mb-6">{t('centroHistorico.tips.title')}</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-amber-200 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{t('centroHistorico.tips.tip1')}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-amber-200 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{t('centroHistorico.tips.tip2')}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-amber-200 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{t('centroHistorico.tips.tip3')}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-amber-200 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{t('centroHistorico.tips.tip4')}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-amber-200 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{t('centroHistorico.tips.tip5')}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-amber-200 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{t('centroHistorico.tips.tip6')}</span>
                </li>
              </ul>
            </div>

            {/* Fun Facts */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-bold mb-6">{t('centroHistorico.funFacts.title')}</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">🏛️</span>
                  <p className="text-sm text-gray-600">{t('centroHistorico.funFacts.fact1')}</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">🪨</span>
                  <p className="text-sm text-gray-600">{t('centroHistorico.funFacts.fact2')}</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">👑</span>
                  <p className="text-sm text-gray-600">{t('centroHistorico.funFacts.fact3')}</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">🎭</span>
                  <p className="text-sm text-gray-600">{t('centroHistorico.funFacts.fact4')}</p>
                </div>
              </div>
            </div>

            {/* Best Cafes */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-8 border border-amber-200">
              <h3 className="text-xl font-bold mb-4">{t('centroHistorico.cafes.title')}</h3>
              <p className="text-sm text-gray-600 mb-4">{t('centroHistorico.cafes.intro')}</p>
              <ul className="space-y-3">
                <li className="flex items-center space-x-2">
                  <span className="text-amber-600">☕</span>
                  <span className="text-sm font-medium">{t('centroHistorico.cafes.cafe1')}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-amber-600">☕</span>
                  <span className="text-sm font-medium">{t('centroHistorico.cafes.cafe2')}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-amber-600">☕</span>
                  <span className="text-sm font-medium">{t('centroHistorico.cafes.cafe3')}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-amber-600">☕</span>
                  <span className="text-sm font-medium">{t('centroHistorico.cafes.cafe4')}</span>
                </li>
              </ul>
            </div>

            {/* Annual Events */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-bold mb-6">{t('centroHistorico.events.title')}</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-amber-500 pl-4">
                  <h4 className="font-semibold text-sm">{t('centroHistorico.events.event1Title')}</h4>
                  <p className="text-xs text-gray-500">{t('centroHistorico.events.event1Date')}</p>
                </div>
                <div className="border-l-4 border-amber-500 pl-4">
                  <h4 className="font-semibold text-sm">{t('centroHistorico.events.event2Title')}</h4>
                  <p className="text-xs text-gray-500">{t('centroHistorico.events.event2Date')}</p>
                </div>
                <div className="border-l-4 border-amber-500 pl-4">
                  <h4 className="font-semibold text-sm">{t('centroHistorico.events.event3Title')}</h4>
                  <p className="text-xs text-gray-500">{t('centroHistorico.events.event3Date')}</p>
                </div>
                <div className="border-l-4 border-amber-500 pl-4">
                  <h4 className="font-semibold text-sm">{t('centroHistorico.events.event4Title')}</h4>
                  <p className="text-xs text-gray-500">{t('centroHistorico.events.event4Date')}</p>
                </div>
                <div className="border-l-4 border-amber-500 pl-4">
                  <h4 className="font-semibold text-sm">{t('centroHistorico.events.event5Title')}</h4>
                  <p className="text-xs text-gray-500">{t('centroHistorico.events.event5Date')}</p>
                </div>
              </div>
            </div>

            {/* Pedestrian Streets */}
            <div className="bg-gradient-to-br from-amber-600 to-amber-700 rounded-xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4">{t('centroHistorico.streets.title')}</h3>
              <p className="text-sm text-amber-100 mb-4">{t('centroHistorico.streets.intro')}</p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <span className="text-amber-200">→</span>
                  <span className="text-sm">{t('centroHistorico.streets.street1')}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-amber-200">→</span>
                  <span className="text-sm">{t('centroHistorico.streets.street2')}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-amber-200">→</span>
                  <span className="text-sm">{t('centroHistorico.streets.street3')}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-amber-200">→</span>
                  <span className="text-sm">{t('centroHistorico.streets.street4')}</span>
                </li>
              </ul>
            </div>

            {/* CTA Card */}
            <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-amber-200">
              <h3 className="text-xl font-bold mb-4">{t('centroHistorico.cta.title')}</h3>
              <p className="text-gray-600 mb-6">{t('centroHistorico.cta.text')}</p>
              <Link
                href="/places"
                className="block w-full bg-amber-600 text-white text-center px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
              >
                {t('centroHistorico.cta.button')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
