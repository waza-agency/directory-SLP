import React from 'react';
import { useTranslation } from 'next-i18next';
import { ShieldCheckIcon, UserGroupIcon, StarIcon } from '@heroicons/react/24/outline';

export default function CircleOfTrustBanner() {
  const { t } = useTranslation('common');

  const features = [
    {
      icon: UserGroupIcon,
      title: t('circleOfTrust.features.curatedByLocals.title', 'Curated by Locals'),
      description: t('circleOfTrust.features.curatedByLocals.description', 'Every recommendation comes from someone who lives in SLP and knows the city'),
    },
    {
      icon: ShieldCheckIcon,
      title: t('circleOfTrust.features.safetyGuaranteed.title', 'Safety Guaranteed'),
      description: t('circleOfTrust.features.safetyGuaranteed.description', 'Only places in safe zones with good community reputation'),
    },
    {
      icon: StarIcon,
      title: t('circleOfTrust.features.qualityOverQuantity.title', 'Quality Over Quantity'),
      description: t('circleOfTrust.features.qualityOverQuantity.description', 'We prefer fewer high-quality places than an endless unfiltered directory'),
    },
  ];

  const stats = [
    { value: '100%', label: t('circleOfTrust.stats.verified', 'Verified') },
    { value: '0', label: t('circleOfTrust.stats.randomPlaces', 'Random Places') },
    { value: 'Local', label: t('circleOfTrust.stats.first', 'First') },
  ];

  return (
    <section id="trust-001" className="py-24 bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content Side */}
          <div className="text-white">
            <span className="inline-block text-white/80 font-semibold text-sm tracking-widest uppercase mb-4">
              {t('circleOfTrust.badge', 'Our Promise')}
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {t('circleOfTrust.title', 'The Circle of Trust')}
            </h2>
            <p className="text-lg md:text-xl leading-relaxed opacity-95 mb-6">
              {t('circleOfTrust.description1', 'Everything we recommend on San Luis Way is')} <strong>{t('circleOfTrust.highlight', 'safe and recommended by locals')}</strong>. {t('circleOfTrust.description2', "We're not a generic directory - we're a curated community of places we know and trust.")}
            </p>
            <p className="text-base md:text-lg leading-relaxed opacity-90">
              {t('circleOfTrust.description3', 'Every place on our platform has been')} <strong>{t('circleOfTrust.highlight2', 'visited, tested, and approved')}</strong> {t('circleOfTrust.description4', "by local residents. We don't accept just any business - only those that meet our standards of quality, service, and authenticity.")}
            </p>
          </div>

          {/* Visual Side */}
          <div className="flex flex-col items-center">
            {/* Trust Circle */}
            <div className="w-56 h-56 md:w-72 md:h-72 bg-white/15 backdrop-blur-sm rounded-full border-4 border-white/30 flex flex-col items-center justify-center mb-8 shadow-2xl">
              <div className="text-6xl md:text-7xl mb-3">🤝</div>
              <p className="text-xl md:text-2xl font-bold text-white">Safe & Trusted</p>
              <p className="text-sm md:text-base text-white/90">Recommended by Locals</p>
            </div>

            {/* Stats Row */}
            <div className="flex gap-6 md:gap-10">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-extrabold text-white">{stat.value}</div>
                  <div className="text-xs md:text-sm text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-white/20 rounded-full mb-4">
                <feature.icon className="w-7 h-7 text-white" strokeWidth={2} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-white/90 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
