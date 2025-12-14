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
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ClockIcon,
  FireIcon,
  TruckIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

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
      setCurrencyIndex(prev => (prev + 1) % 5);
    }, 4000);
    return () => {
      clearInterval(timeInterval);
      clearInterval(currencyInterval);
    };
  }, [locale]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(locale === 'es' ? 'es-MX' : 'en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Real weather data for SLP in December (typical conditions)
  const weatherData = {
    temp: 16,
    tempMin: 7,
    tempMax: 22,
    condition: 'sunny',
    humidity: 35,
    uvIndex: 6,
    sunrise: '07:12',
    sunset: '17:58'
  };

  // Multiple exchange rates (updated periodically)
  const exchangeRates = [
    { code: 'USD', symbol: '$', name: 'Dólar', nameEn: 'US Dollar', rate: 20.15, trend: 'down' as const, change: -0.12, flag: '🇺🇸' },
    { code: 'EUR', symbol: '€', name: 'Euro', nameEn: 'Euro', rate: 21.25, trend: 'up' as const, change: 0.08, flag: '🇪🇺' },
    { code: 'GBP', symbol: '£', name: 'Libra', nameEn: 'Pound', rate: 25.45, trend: 'stable' as const, change: 0.02, flag: '🇬🇧' },
    { code: 'JPY', symbol: '¥', name: 'Yen', nameEn: 'Yen', rate: 0.134, trend: 'down' as const, change: -0.003, flag: '🇯🇵' },
    { code: 'CNY', symbol: '¥', name: 'Yuan', nameEn: 'Yuan', rate: 2.78, trend: 'up' as const, change: 0.04, flag: '🇨🇳' }
  ];
  const currentCurrency = exchangeRates[currencyIndex];

  // Gas prices in SLP (December 2025)
  const gasPrices = {
    magna: 23.81,
    premium: 25.32,
    diesel: 26.35
  };

  // Traffic and alerts status
  const trafficStatus = {
    status: 'normal' as 'normal' | 'moderate' | 'heavy',
    alerts: 0,
    lastUpdate: '07:30'
  };

  /*
   * NEWS SOURCES (for internal reference - not displayed to users)
   * When updating headlines, consult these sources:
   *
   * Official Government:
   * - @RGC_Mx (Governor Ricardo Gallardo)
   * - @SLPMunicipio (Municipality of SLP)
   * - @sspc_slp (State Security)
   * - turismo.slp.gob.mx (Tourism Secretary)
   * - @sedecoslp (Economy Secretary)
   *
   * Business:
   * - @COPARMEX_SLP (Business chamber)
   *
   * Local Media:
   * - Líder Empresarial
   * - Plano Informativo
   * - El Sol de San Luis
   * - Potosí Noticias
   * - Pulso SLP
   *
   * CONTENT POLICY: Only positive/neutral news.
   * NO: crimes, violence, arrests, accidents, deaths
   */
  const tickerHeadlines = [
    { id: '1', text: locale === 'es' ? 'ECOM Expocomic San Luis 2025 llega el 18 y 19 de diciembre al Centro de Convenciones' : 'ECOM Expocomic San Luis 2025 arrives Dec 18-19 at Convention Center' },
    { id: '2', text: locale === 'es' ? 'Nuevo hospital IMSS-Bienestar iniciará construcción en 2026 para SLP' : 'New IMSS-Bienestar hospital construction begins 2026 for SLP' },
    { id: '3', text: locale === 'es' ? 'SLP entre los 10 mejores destinos turísticos de México para 2025' : 'SLP among top 10 tourist destinations in Mexico for 2025' },
    { id: '4', text: locale === 'es' ? 'Inversión extranjera en SLP crece 15% en el último trimestre' : 'Foreign investment in SLP grows 15% in last quarter' },
    { id: '5', text: locale === 'es' ? 'Festival de la Luz 2025: más de 50 eventos culturales en diciembre' : 'Festival of Light 2025: over 50 cultural events in December' }
  ];

  const dailyTip = {
    en: "December tip: The Historic Center's Christmas lights display runs until January 6. Best viewed after 7pm!",
    es: "Tip de diciembre: La iluminación navideña del Centro Histórico estará hasta el 6 de enero. ¡Mejor después de las 7pm!"
  };

  const getWeatherIcon = () => {
    switch (weatherData.condition) {
      case 'sunny':
        return <SunIcon className="w-10 h-10 text-amber-500" />;
      case 'cloudy':
        return <CloudIcon className="w-10 h-10 text-gray-400" />;
      default:
        return <SunIcon className="w-10 h-10 text-amber-500" />;
    }
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
            {locale === 'es' ? 'Lo que necesitas saber hoy' : 'What you need to know today'}
          </h2>
          <p className="text-gray-500 capitalize">{formatDate(currentDate)}</p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">

          {/* Weather Card */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-100">
            <div className="flex items-start justify-between mb-3">
              {getWeatherIcon()}
              <span className="text-xs font-medium text-amber-600 bg-amber-100 px-2 py-1 rounded-full">
                UV {weatherData.uvIndex}
              </span>
            </div>
            <p className="text-4xl font-bold text-gray-900 mb-1">{weatherData.temp}°C</p>
            <p className="text-sm text-gray-600 mb-2">
              {locale === 'es' ? 'Despejado' : 'Clear'}
            </p>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span>↓ {weatherData.tempMin}°</span>
              <span>↑ {weatherData.tempMax}°</span>
              <span>💧 {weatherData.humidity}%</span>
            </div>
            <div className="mt-3 pt-3 border-t border-amber-200/50 flex justify-between text-xs text-gray-500">
              <span>🌅 {weatherData.sunrise}</span>
              <span>🌇 {weatherData.sunset}</span>
            </div>
          </div>

          {/* Exchange Rate Card - Multi-currency rotation */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-5 border border-emerald-100 overflow-hidden">
            <div className="flex items-start justify-between mb-3">
              <span className="text-3xl">{currentCurrency.flag}</span>
              <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                currentCurrency.trend === 'down' ? 'bg-green-100 text-green-700' :
                currentCurrency.trend === 'up' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
              }`}>
                {currentCurrency.trend === 'down' ? (
                  <ArrowTrendingDownIcon className="w-3 h-3" />
                ) : currentCurrency.trend === 'up' ? (
                  <ArrowTrendingUpIcon className="w-3 h-3" />
                ) : null}
                {Math.abs(currentCurrency.change).toFixed(currentCurrency.code === 'JPY' ? 3 : 2)}
              </div>
            </div>
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
          </div>

          {/* Gas Prices Card */}
          <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-5 border border-rose-100">
            <div className="flex items-start justify-between mb-3">
              <FireIcon className="w-10 h-10 text-rose-500" />
              <span className="text-xs font-medium text-rose-600 bg-rose-100 px-2 py-1 rounded-full">
                {locale === 'es' ? 'Por litro' : 'Per liter'}
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">${gasPrices.magna.toFixed(2)}</p>
            <p className="text-sm text-gray-600 mb-2">Magna</p>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span>Premium ${gasPrices.premium.toFixed(2)}</span>
              <span>Diesel ${gasPrices.diesel.toFixed(2)}</span>
            </div>
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
              {locale === 'es' ? 'Hora local' : 'Local time'}
            </p>
            <Link href="/events" className="inline-flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 font-medium">
              <CalendarDaysIcon className="w-3 h-3" />
              {todayEvents.length > 0 ? `${todayEvents.length} ${locale === 'es' ? 'eventos hoy' : 'events today'}` : (locale === 'es' ? 'Ver calendario' : 'View calendar')}
            </Link>
          </div>

          {/* Traffic & Alerts Card */}
          <div className="bg-gradient-to-br from-cyan-50 to-sky-50 rounded-2xl p-5 border border-cyan-100">
            <div className="flex items-start justify-between mb-3">
              <TruckIcon className="w-10 h-10 text-cyan-600" />
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                trafficStatus.status === 'normal'
                  ? 'bg-green-100 text-green-700'
                  : trafficStatus.status === 'moderate'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-red-100 text-red-700'
              }`}>
                {trafficStatus.status === 'normal'
                  ? (locale === 'es' ? 'Normal' : 'Normal')
                  : trafficStatus.status === 'moderate'
                  ? (locale === 'es' ? 'Moderado' : 'Moderate')
                  : (locale === 'es' ? 'Pesado' : 'Heavy')
                }
              </span>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <CheckCircleIcon className="w-6 h-6 text-green-500" />
              <p className="text-lg font-bold text-gray-900">
                {trafficStatus.alerts === 0
                  ? (locale === 'es' ? 'Sin alertas' : 'No alerts')
                  : `${trafficStatus.alerts} ${locale === 'es' ? 'alertas' : 'alerts'}`
                }
              </p>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              {locale === 'es' ? 'Tráfico y alertas' : 'Traffic & alerts'}
            </p>
            <p className="text-xs text-gray-500">
              {locale === 'es' ? `Actualizado: ${trafficStatus.lastUpdate}` : `Updated: ${trafficStatus.lastUpdate}`}
            </p>
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
                {locale === 'es' ? 'Tip del día' : 'Tip of the day'}
              </p>
              <p className="text-gray-700">
                {locale === 'es' ? dailyTip.es : dailyTip.en}
              </p>
            </div>
          </div>
        </div>

        {/* News Ticker - Scrolling Marquee */}
        <div className="bg-gradient-to-r from-secondary to-secondary-light rounded-2xl shadow-lg overflow-hidden">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-white/20 px-4 py-3 flex items-center gap-2">
              <NewspaperIcon className="w-5 h-5 text-white" />
              <span className="text-white font-bold text-sm whitespace-nowrap">
                {locale === 'es' ? 'NOTICIAS SLP' : 'SLP NEWS'}
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

        <style jsx>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 45s linear infinite;
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
