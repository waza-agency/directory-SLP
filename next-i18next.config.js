/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en', 'zh', 'ja', 'de'],
  },
  fallbackLng: {
    default: ['es'],
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};
