const path = require('path');

/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en', 'zh', 'ja', 'de'],
  },
  ns: ['common'],
  defaultNS: 'common',
  fallbackLng: {
    default: ['es'],
  },
  localePath: path.resolve('./public/locales'),
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};