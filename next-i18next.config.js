// Static export friendly i18next config
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
  },
  defaultNS: 'common',
  ns: ['common'],
  localePath: './public/locales',
  react: {
    useSuspense: false,
  }
}; 