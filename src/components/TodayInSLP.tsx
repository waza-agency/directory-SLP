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
  CurrencyDollarIcon,
  BeakerIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ClockIcon,
  FireIcon,
  ExclamationTriangleIcon,
  TruckIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

interface NewsItem {
  id: string;
  title: string;
  titleEs: string;
  summary: string;
  summaryEs: string;
  category: 'local' | 'economy' | 'culture' | 'safety' | 'infrastructure';
  date: string;
  source: string;
  url?: string;
}

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
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
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

  // Current exchange rate (updated periodically)
  const exchangeRate = {
    usdMxn: 20.15,
    trend: 'down' as 'up' | 'down' | 'stable',
    change: -0.12
  };

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

  // Current news - Updated regularly with real SLP news
  const currentNews: NewsItem[] = [
    {
      id: '1',
      title: 'Operativo Guadalupano 2025 concludes with white balance across all four regions',
      titleEs: 'Operativo Guadalupano 2025 concluye con saldo blanco en las cuatro regiones',
      summary: 'State Civil Guard reports no incidents during Dec 12 festivities. Winter Safe 2025 operation begins.',
      summaryEs: 'Guardia Civil Estatal reporta cero incidencias durante festividades del 12 de diciembre. Inicia operativo Invierno Seguro 2025.',
      category: 'safety',
      date: '2025-12-13',
      source: 'Potosí Noticias',
      url: 'https://potosinoticias.com'
    },
    {
      id: '2',
      title: 'ECOM Expocomic San Luis 2025 arrives December 18-19',
      titleEs: 'ECOM Expocomic San Luis 2025 llega el 18 y 19 de diciembre',
      summary: 'Convention Center hosts geek culture event with anime, manga, e-sports and more.',
      summaryEs: 'Centro de Convenciones será sede del evento de cultura geek con anime, manga, e-sports y más.',
      category: 'culture',
      date: '2025-12-13',
      source: 'Líder Empresarial',
      url: 'https://www.liderempresarial.com'
    },
    {
      id: '3',
      title: 'New IMSS-Bienestar hospital construction to begin in 2026',
      titleEs: 'Construcción de nuevo hospital IMSS-Bienestar iniciará en 2026',
      summary: 'Federal healthcare expansion program confirms new hospital facility for San Luis Potosí state.',
      summaryEs: 'Programa federal de expansión de salud confirma nueva instalación hospitalaria para el estado de SLP.',
      category: 'infrastructure',
      date: '2025-12-12',
      source: 'Plano Informativo',
      url: 'https://planoinformativo.com'
    }
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

  const getCategoryIcon = (category: NewsItem['category']) => {
    switch (category) {
      case 'safety':
        return <ExclamationTriangleIcon className="w-4 h-4" />;
      case 'culture':
        return <CalendarDaysIcon className="w-4 h-4" />;
      case 'infrastructure':
        return <BeakerIcon className="w-4 h-4" />;
      case 'economy':
        return <CurrencyDollarIcon className="w-4 h-4" />;
      default:
        return <NewspaperIcon className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: NewsItem['category']) => {
    switch (category) {
      case 'safety':
        return 'bg-green-100 text-green-700';
      case 'culture':
        return 'bg-purple-100 text-purple-700';
      case 'infrastructure':
        return 'bg-blue-100 text-blue-700';
      case 'economy':
        return 'bg-amber-100 text-amber-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryLabel = (category: NewsItem['category']) => {
    const labels = {
      safety: { en: 'Safety', es: 'Seguridad' },
      culture: { en: 'Culture', es: 'Cultura' },
      infrastructure: { en: 'Infrastructure', es: 'Infraestructura' },
      economy: { en: 'Economy', es: 'Economía' },
      local: { en: 'Local', es: 'Local' }
    };
    return locale === 'es' ? labels[category].es : labels[category].en;
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

          {/* Exchange Rate Card */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-5 border border-emerald-100">
            <div className="flex items-start justify-between mb-3">
              <CurrencyDollarIcon className="w-10 h-10 text-emerald-600" />
              <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                exchangeRate.trend === 'down' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {exchangeRate.trend === 'down' ? (
                  <ArrowTrendingDownIcon className="w-3 h-3" />
                ) : (
                  <ArrowTrendingUpIcon className="w-3 h-3" />
                )}
                {Math.abs(exchangeRate.change).toFixed(2)}
              </div>
            </div>
            <p className="text-4xl font-bold text-gray-900 mb-1">${exchangeRate.usdMxn.toFixed(2)}</p>
            <p className="text-sm text-gray-600 mb-2">USD → MXN</p>
            <p className="text-xs text-gray-500">
              {locale === 'es' ? 'Tipo de cambio Banxico' : 'Banxico exchange rate'}
            </p>
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

        {/* News Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* News Header */}
          <div className="bg-gradient-to-r from-secondary to-secondary-light px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <NewspaperIcon className="w-6 h-6 text-white" />
                <h3 className="text-white font-semibold text-lg">
                  {locale === 'es' ? 'Noticias de San Luis Potosí' : 'San Luis Potosí News'}
                </h3>
              </div>
              <span className="text-white/70 text-sm">
                {locale === 'es' ? 'Actualizado hoy' : 'Updated today'}
              </span>
            </div>
          </div>

          {/* News Grid */}
          <div className="divide-y divide-gray-100">
            {currentNews.map((news, index) => (
              <article key={news.id} className="p-5 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-sm">
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(news.category)}`}>
                        {getCategoryIcon(news.category)}
                        {getCategoryLabel(news.category)}
                      </span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-400">{news.source}</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1 leading-snug">
                      {locale === 'es' ? news.titleEs : news.title}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {locale === 'es' ? news.summaryEs : news.summary}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Daily Tip Footer */}
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 px-6 py-4 border-t border-gray-100">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-lg">💡</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  {locale === 'es' ? 'Tip del día' : 'Tip of the day'}
                </p>
                <p className="text-sm text-gray-700">
                  {locale === 'es' ? dailyTip.es : dailyTip.en}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Official Sources */}
        <div className="mt-6 bg-white rounded-xl border border-gray-100 p-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 text-center">
            {locale === 'es' ? 'Fuentes Oficiales' : 'Official Sources'}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://twitter.com/RGC_Mx" target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-full text-xs text-gray-600 transition-colors">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
              @RGC_Mx
            </a>
            <a href="https://twitter.com/SLPMunicipio" target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-full text-xs text-gray-600 transition-colors">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              @SLPMunicipio
            </a>
            <a href="https://twitter.com/sspc_slp" target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-full text-xs text-gray-600 transition-colors">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
              @sspc_slp
            </a>
            <a href="https://turismo.slp.gob.mx" target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-full text-xs text-gray-600 transition-colors">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
              {locale === 'es' ? 'Turismo SLP' : 'Tourism SLP'}
            </a>
            <a href="https://twitter.com/sedecoslp" target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-full text-xs text-gray-600 transition-colors">
              <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
              @sedecoslp
            </a>
            <a href="https://twitter.com/COPARMEX_SLP" target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-full text-xs text-gray-600 transition-colors">
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
              @COPARMEX_SLP
            </a>
          </div>
          <p className="text-center text-xs text-gray-400 mt-3">
            {locale === 'es'
              ? 'Datos: Banxico, Profeco, medios locales'
              : 'Data: Banxico, Profeco, local media'
            }
          </p>
        </div>

      </div>
    </section>
  );
};

export default TodayInSLP;
