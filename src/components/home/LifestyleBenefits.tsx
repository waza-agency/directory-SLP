import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { HeartIcon, UserGroupIcon, MegaphoneIcon } from '@heroicons/react/24/outline';

export default function LifestyleBenefits() {
  const { t } = useTranslation('common');

  const benefits = [
    {
      key: 'affordable',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      gradient: 'from-amber-400 to-orange-500'
    },
    {
      key: 'culture',
      icon: <HeartIcon className="w-6 h-6 text-white" strokeWidth={2} />,
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      key: 'community',
      icon: <UserGroupIcon className="w-6 h-6 text-white" strokeWidth={2} />,
      gradient: 'from-emerald-500 to-teal-600'
    }
  ];

  return (
    <section id="benefits-001" className="py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-block text-primary-800 font-semibold text-sm tracking-widest uppercase mb-4">{t('homepage.benefits.badge')}</span>
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {t('homepage.benefits.title')}
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            {t('homepage.benefits.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {benefits.map((benefit) => (
            <div key={benefit.key} className="group relative bg-white rounded-3xl p-10 shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2">
              <div className={`absolute -top-6 left-10 w-12 h-12 bg-gradient-to-br ${benefit.gradient} rounded-2xl shadow-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}>
                {benefit.icon}
              </div>
              <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4 mt-6">{t(`homepage.benefits.${benefit.key}.title`)}</h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                {t(`homepage.benefits.${benefit.key}.description`)}
              </p>
              <div className="border-t border-gray-100 pt-4 mt-4">
                <p className="text-sm text-gray-500 font-medium">{t(`homepage.benefits.${benefit.key}.detail`)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-3xl p-10 border border-primary/20">
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                <MegaphoneIcon className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-serif text-2xl font-bold text-gray-900 mb-2">
                {t('homepage.benefits.recognition.title')}
              </h3>
              <p className="text-gray-700 text-lg">
                {t('homepage.benefits.recognition.description')}
              </p>
            </div>
            <Link
              href="/about#rankings"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-secondary font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:shadow-lg"
            >
              {t('homepage.benefits.recognition.cta')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}