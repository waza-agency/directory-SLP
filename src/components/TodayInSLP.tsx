import React, { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  SunIcon,
  CloudIcon,
  CalendarDaysIcon,
  NewspaperIcon,
  MapPinIcon,
  ClockIcon,
  TruckIcon,
  UserGroupIcon,
  HeartIcon,
  SparklesIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';
import type { WeatherData, ExchangeRate, NewsHeadline, CommunityNews } from '@/lib/api/dashboard-data';

interface TodayEvent {
  id: string;
  title: string;
  location: string;
  time?: string;
}

interface TodayInSLPProps {
  todayEvents?: TodayEvent[];
}

const TodayInSLP: React.FC<TodayInSLPProps> = ({ todayEvents = [] }) => {
  const { t } = useTranslation('common');
  const { locale } = useRouter();
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currencyIndex, setCurrencyIndex] = useState(0);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([]);
  const [headlines, setHeadlines] = useState<NewsHeadline[]>([]);
  const [communityNews, setCommunityNews] = useState<CommunityNews[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch dashboard data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/dashboard-data');
        if (res.ok) {
          const data = await res.json();
          if (data.weather) setWeather(data.weather);
          if (data.exchangeRates?.length) setExchangeRates(data.exchangeRates);
          if (data.headlines?.length) setHeadlines(data.headlines);
          if (data.communityNews?.length) setCommunityNews(data.communityNews);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Time and currency rotation
  useEffect(() => {
    setCurrentDate(new Date());
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString(locale === 'es' ? 'es-MX' : 'en-US', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'America/Mexico_City'
      }));
    };
    updateTime();
    const timeInterval = setInterval(updateTime, 60000);
    const currencyInterval = setInterval(() => {
      setCurrencyIndex(prev => (prev + 1) % (exchangeRates.length || 5));
    }, 4000);
    return () => {
      clearInterval(timeInterval);
      clearInterval(currencyInterval);
    };
  }, [locale, exchangeRates.length]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(locale === 'es' ? 'es-MX' : 'en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  /*
   * NEWS SOURCES (for internal reference - not displayed to users)
   * Official: @RGC_Mx, @SLPMunicipio, @sspc_slp, turismo.slp.gob.mx, @sedecoslp
   * Business: @COPARMEX_SLP
   * Media: Líder Empresarial, Plano Informativo, El Sol de San Luis, Potosí Noticias, Pulso SLP
   * CONTENT POLICY: Only positive/neutral news. NO: crimes, violence, arrests, accidents
   * Headlines are now fetched from Supabase and updated every 4 hours via cron job
   */
  const tickerHeadlines = headlines.length > 0
    ? headlines.map(h => ({
        id: h.id,
        text: locale === 'es' ? h.textEs : h.textEn
      }))
    : [
        { id: '1', text: t('todayInSLP.loadingNews') }
      ];

  const dailyTip = t('todayInSLP.dailyTip');

  // Default community news fallback
  const defaultCommunityNews: CommunityNews[] = [
    {
      id: '1',
      titleEs: 'Mercado Tangamanga celebra su 5to aniversario',
      titleEn: 'Tangamanga Market celebrates 5th anniversary',
      summaryEs: 'El mercado artesanal más querido de SLP festeja con actividades especiales este fin de semana.',
      summaryEn: "SLP's beloved artisan market celebrates with special activities this weekend.",
      category: 'community',
      publishedAt: new Date().toISOString()
    },
    {
      id: '2',
      titleEs: 'Nueva ruta ciclista conecta Lomas con el Centro',
      titleEn: 'New bike route connects Lomas to Downtown',
      summaryEs: 'La ciclovía de 8km promete facilitar el transporte sustentable en la ciudad.',
      summaryEn: 'The 8km bike lane promises to facilitate sustainable transportation in the city.',
      category: 'local',
      publishedAt: new Date().toISOString()
    },
    {
      id: '3',
      titleEs: 'Voluntarios limpian el Parque de Morales',
      titleEn: 'Volunteers clean up Morales Park',
      summaryEs: 'Más de 200 ciudadanos participaron en la jornada de limpieza comunitaria.',
      summaryEn: 'Over 200 citizens participated in the community cleanup day.',
      category: 'social',
      publishedAt: new Date().toISOString()
    }
  ];

  const getWeatherIcon = (condition?: string) => {
    switch (condition) {
      case 'cloudy':
        return <CloudIcon className="w-10 h-10 text-gray-400" />;
      case 'rainy':
        return <CloudIcon className="w-10 h-10 text-blue-400" />;
      default:
        return <SunIcon className="w-10 h-10 text-amber-500" />;
    }
  };

  const currentCurrency = exchangeRates[currencyIndex] || {
    code: 'USD', symbol: '$', name: 'Dólar', nameEn: 'US Dollar', rate: 0, flag: '🇺🇸'
  };

  return (
    <section className="py-10 bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">

        {/* Main Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-secondary/10 rounded-full px-4 py-2 mb-4">
            <MapPinIcon className="w-4 h-4 text-secondary" />
            <span className="text-secondary text-sm font-semibold">San Luis Potosí</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {t('todayInSLP.title')}
          </h2>
          <p className="text-gray-500 capitalize">{formatDate(currentDate)}</p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

          {/* Weather Card */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-100">
            <div className="flex items-start justify-between mb-3">
              {getWeatherIcon(weather?.condition)}
              {weather && (
                <span className="text-xs font-medium text-amber-600 bg-amber-100 px-2 py-1 rounded-full">
                  UV {weather.uvIndex}
                </span>
              )}
            </div>
            {isLoading ? (
              <div className="animate-pulse">
                <div className="h-10 bg-amber-200/50 rounded w-20 mb-2"></div>
                <div className="h-4 bg-amber-200/50 rounded w-16"></div>
              </div>
            ) : weather ? (
              <>
                <p className="text-4xl font-bold text-gray-900 mb-1">{weather.temp}°C</p>
                <p className="text-sm text-gray-600 mb-2">
                  {locale === 'es' ? weather.conditionEs : weather.conditionEn}
                </p>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span>↓ {weather.tempMin}°</span>
                  <span>↑ {weather.tempMax}°</span>
                  <span>💧 {weather.humidity}%</span>
                </div>
                <div className="mt-3 pt-3 border-t border-amber-200/50 flex justify-between text-xs text-gray-500">
                  <span>🌅 {weather.sunrise}</span>
                  <span>🌇 {weather.sunset}</span>
                </div>
              </>
            ) : (
              <p className="text-sm text-gray-500">{t('todayInSLP.notAvailable')}</p>
            )}
          </div>

          {/* Exchange Rate Card */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-5 border border-emerald-100 overflow-hidden">
            <div className="flex items-start justify-between mb-3">
              <span className="text-3xl">{currentCurrency.flag}</span>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
                {t('todayInSLP.live')}
              </span>
            </div>
            {isLoading ? (
              <div className="animate-pulse">
                <div className="h-8 bg-emerald-200/50 rounded w-24 mb-2"></div>
                <div className="h-4 bg-emerald-200/50 rounded w-20"></div>
              </div>
            ) : exchangeRates.length > 0 ? (
              <>
                <p className="text-3xl font-bold text-gray-900 mb-1 transition-all duration-300">
                  ${currentCurrency.rate.toFixed(currentCurrency.code === 'JPY' ? 3 : 2)}
                </p>
                <p className="text-sm text-gray-600 mb-2">{currentCurrency.code} → MXN</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">
                    {locale === 'es' ? currentCurrency.name : currentCurrency.nameEn}
                  </p>
                  <div className="flex gap-1">
                    {exchangeRates.map((_, idx) => (
                      <span key={idx} className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === currencyIndex ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <p className="text-sm text-gray-500">{t('todayInSLP.notAvailable')}</p>
            )}
          </div>

          {/* Time & Events Card */}
          <div className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-2xl p-5 border border-indigo-100">
            <div className="flex items-start justify-between mb-3">
              <ClockIcon className="w-10 h-10 text-indigo-600" />
              <span className="text-xs font-medium text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full">
                CST
              </span>
            </div>
            <p className="text-4xl font-bold text-gray-900 mb-1">{currentTime || '--:--'}</p>
            <p className="text-sm text-gray-600 mb-2">
              {t('todayInSLP.localTime')}
            </p>
            <Link href="/events" className="inline-flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 font-medium">
              <CalendarDaysIcon className="w-3 h-3" />
              {todayEvents.length > 0 ? `${todayEvents.length} ${t('todayInSLP.eventsToday')}` : t('todayInSLP.viewCalendar')}
            </Link>
          </div>

          {/* Traffic Map Card */}
          <div className="bg-gradient-to-br from-cyan-50 to-sky-50 rounded-2xl p-3 border border-cyan-100 overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <TruckIcon className="w-5 h-5 text-cyan-600" />
                <span className="text-sm font-semibold text-gray-900">
                  {t('todayInSLP.traffic')}
                </span>
              </div>
              <span className="text-xs font-medium text-cyan-600 bg-cyan-100 px-2 py-0.5 rounded-full">
                {t('todayInSLP.live')}
              </span>
            </div>
            <div className="relative rounded-xl overflow-hidden h-28 mb-2">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d29340.5!2d-100.9855!3d22.1565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2smx!4v1702500000000!5m2!1ses!2smx"
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="San Luis Potosí Traffic Map"
              />
            </div>
            <a
              href="https://www.google.com/maps/@22.1565,-100.9855,14z/data=!5m1!1e1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1 w-full py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-medium rounded-lg transition-colors"
            >
              {t('todayInSLP.viewLiveTraffic')}
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>

        {/* Daily Tip Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 mb-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
              <span className="text-xl">💡</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-1">
                {t('todayInSLP.tipOfDay')}
              </p>
              <p className="text-gray-700">
                {dailyTip}
              </p>
            </div>
          </div>
        </div>

        {/* News Ticker */}
        <div className="bg-gradient-to-r from-secondary to-secondary-light rounded-2xl shadow-lg overflow-hidden">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-white/20 px-4 py-3 flex items-center gap-2">
              <NewspaperIcon className="w-5 h-5 text-white" />
              <span className="text-white font-bold text-sm whitespace-nowrap">
                {t('todayInSLP.slpNews')}
              </span>
            </div>
            <div className="flex-1 overflow-hidden py-3">
              <div className="animate-marquee whitespace-nowrap flex">
                {[...tickerHeadlines, ...tickerHeadlines].map((headline, idx) => (
                  <span key={`${headline.id}-${idx}`} className="inline-flex items-center mx-8">
                    <span className="text-white font-medium">{headline.text}</span>
                    <span className="mx-6 text-white/40">•</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Community News Section */}
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-4">
            <UserGroupIcon className="w-5 h-5 text-secondary" />
            <h3 className="font-semibold text-gray-800">
              {t('todayInSLP.communityLife')}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(communityNews.length > 0 ? communityNews : defaultCommunityNews).map((news) => (
              <div
                key={news.id}
                className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                    news.category === 'social' ? 'bg-rose-100' :
                    news.category === 'community' ? 'bg-emerald-100' :
                    news.category === 'culture' ? 'bg-violet-100' :
                    'bg-blue-100'
                  }`}>
                    {news.category === 'social' && <HeartIcon className="w-5 h-5 text-rose-600" />}
                    {news.category === 'community' && <UserGroupIcon className="w-5 h-5 text-emerald-600" />}
                    {news.category === 'culture' && <SparklesIcon className="w-5 h-5 text-violet-600" />}
                    {news.category === 'local' && <BuildingOfficeIcon className="w-5 h-5 text-blue-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className={`text-xs font-semibold uppercase tracking-wider ${
                      news.category === 'social' ? 'text-rose-600' :
                      news.category === 'community' ? 'text-emerald-600' :
                      news.category === 'culture' ? 'text-violet-600' :
                      'text-blue-600'
                    }`}>
                      {t(`todayInSLP.${news.category}`)}
                    </span>
                    <h4 className="font-semibold text-gray-900 text-sm mt-1 line-clamp-2">
                      {locale === 'es' ? news.titleEs : news.titleEn}
                    </h4>
                    <p className="text-gray-600 text-xs mt-1 line-clamp-2">
                      {locale === 'es' ? news.summaryEs : news.summaryEn}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 25s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}</style>

      </div>
    </section>
  );
};

export default TodayInSLP;
