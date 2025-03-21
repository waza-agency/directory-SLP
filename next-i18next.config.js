module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'de', 'ja'],
    localeDetection: false,
  },
  debug: process.env.NODE_ENV === 'development',
  ns: ['common'],
  defaultNS: 'common',
  localePath: './public/locales',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
}; 