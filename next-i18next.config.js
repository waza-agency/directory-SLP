// Static export friendly i18next config
module.exports = {
  // Remove the i18n config as it's not compatible with static export
  // We're handling this ourselves with the static HTML files
  ns: ['common'],
  defaultNS: 'common',
  localePath: './public/locales',
  react: {
    useSuspense: false,
  }
}; 