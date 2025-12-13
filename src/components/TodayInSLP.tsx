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
  ExclamationTriangleIcon,
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

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(locale === 'es' ? 'es-MX' : 'en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const weatherData = {
    temp: 18,
    condition: 'sunny',
    humidity: 45,
    wind: 12
  };

  const trafficStatus = {
    status: 'normal',
    alerts: 0
  };

  const dailyTip = {
    en: "The Historic Center is hosting the Christmas Market this weekend. Perfect for unique gifts!",
    es: "El Centro Histórico tiene el Mercado Navideño este fin de semana. ¡Perfecto para regalos únicos!"
  };

  const getWeatherIcon = () => {
    switch (weatherData.condition) {
      case 'sunny':
        return <SunIcon className="w-8 h-8 text-amber-500" />;
      case 'cloudy':
        return <CloudIcon className="w-8 h-8 text-gray-400" />;
      default:
        return <SunIcon className="w-8 h-8 text-amber-500" />;
    }
  };

  const getTrafficIcon = () => {
    if (trafficStatus.status === 'normal') {
      return <CheckCircleIcon className="w-6 h-6 text-green-500" />;
    }
    return <ExclamationTriangleIcon className="w-6 h-6 text-amber-500" />;
  };

  return (
    <section className="py-8 bg-gradient-to-r from-secondary/5 via-primary/5 to-secondary/5">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">

          {/* Header with Date */}
          <div className="bg-gradient-to-r from-secondary to-secondary-light px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-white font-serif text-xl md:text-2xl font-bold">
                  {t('todayInSLP.title')}
                </h2>
                <p className="text-white/80 text-sm capitalize">
                  {formatDate(currentDate)}
                </p>
              </div>
              <div className="hidden md:flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <MapPinIcon className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-medium">San Luis Potosí</span>
              </div>
            </div>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-100">

            {/* Weather */}
            <div className="p-4 md:p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                {getWeatherIcon()}
                <div>
                  <p className="text-3xl font-bold text-gray-900">{weatherData.temp}°C</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                {t('todayInSLP.weather')}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {t('todayInSLP.humidity')}: {weatherData.humidity}% • {t('todayInSLP.wind')}: {weatherData.wind} km/h
              </p>
            </div>

            {/* Traffic */}
            <div className="p-4 md:p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                {getTrafficIcon()}
                <div>
                  <p className="text-lg font-bold text-gray-900">
                    {trafficStatus.status === 'normal'
                      ? t('todayInSLP.trafficNormal')
                      : t('todayInSLP.trafficSlow')}
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                {t('todayInSLP.traffic')}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {trafficStatus.alerts === 0
                  ? t('todayInSLP.noAlerts')
                  : `${trafficStatus.alerts} ${t('todayInSLP.alerts')}`}
              </p>
            </div>

            {/* Events Today */}
            <div className="p-4 md:p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <CalendarDaysIcon className="w-6 h-6 text-primary" />
                <div>
                  <p className="text-lg font-bold text-gray-900">
                    {todayEvents.length > 0 ? todayEvents.length : '3'} {t('todayInSLP.eventsCount')}
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                {t('todayInSLP.events')}
              </p>
              {todayEvents.length > 0 ? (
                <p className="text-sm text-gray-600 mt-1 truncate">
                  {todayEvents[0].title}
                </p>
              ) : (
                <Link href="/events" className="text-sm text-primary hover:underline mt-1 inline-block">
                  {t('todayInSLP.viewEvents')}
                </Link>
              )}
            </div>

            {/* Daily Tip/News */}
            <div className="p-4 md:p-6 hover:bg-gray-50 transition-colors col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-2">
                <NewspaperIcon className="w-6 h-6 text-secondary" />
                <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                  {t('todayInSLP.tipOfDay')}
                </p>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed line-clamp-2">
                {locale === 'es' ? dailyTip.es : dailyTip.en}
              </p>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-100">
            <p className="text-xs text-gray-500">
              {t('todayInSLP.updatedAt')} {currentDate.toLocaleTimeString(locale === 'es' ? 'es-MX' : 'en-US', { hour: '2-digit', minute: '2-digit' })}
            </p>
            <Link
              href="/events"
              className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
            >
              {t('todayInSLP.seeMore')} →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TodayInSLP;
