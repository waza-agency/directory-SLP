import { useTranslation } from 'next-i18next';

interface B2BBannerProps {
  variant?: 'default' | 'compact' | 'inline';
}

export default function B2BBanner({ variant = 'default' }: B2BBannerProps) {
  const { t } = useTranslation('common');

  if (variant === 'inline') {
    return (
      <div className="bg-gradient-to-r from-secondary/10 to-primary/10 border border-secondary/20 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm text-gray-700">
          {t('b2b.inline.text')}
        </p>
        <a
          href="https://sanluiswayhub.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-secondary hover:text-secondary-dark transition-colors whitespace-nowrap"
        >
          {t('b2b.inline.cta')} &rarr;
        </a>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <a
        href="https://sanluiswayhub.com"
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-gradient-to-r from-secondary/10 via-primary/10 to-secondary/10 border border-secondary/20 rounded-xl p-4 hover:border-secondary/40 transition-all group"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-secondary to-primary rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 group-hover:text-secondary transition-colors">
              {t('b2b.banner.title')}
            </p>
            <p className="text-sm text-gray-600 truncate">
              {t('b2b.banner.subtitle')}
            </p>
          </div>
          <div className="text-secondary group-hover:translate-x-1 transition-transform">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </a>
    );
  }

  return (
    <section className="py-8 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4">
        <a
          href="https://sanluiswayhub.com"
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-gradient-to-r from-secondary/20 via-primary/20 to-secondary/20 border border-secondary/30 rounded-2xl p-6 md:p-8 hover:border-secondary/50 transition-all group"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-secondary to-primary rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-secondary transition-colors">
                  {t('b2b.banner.title')}
                </h3>
                <p className="text-gray-300">
                  {t('b2b.banner.subtitle')}
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex gap-3 text-sm text-gray-300">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {t('b2b.banner.benefits.visibility')}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {t('b2b.banner.benefits.clients')}
                </span>
              </div>
              <div className="flex items-center gap-2 px-6 py-3 bg-secondary text-white font-semibold rounded-full group-hover:bg-secondary-dark transition-colors">
                {t('b2b.banner.cta')}
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}
