import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import commonEn from '../public/locales/en/common.json';
import commonEs from '../public/locales/es/common.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: commonEn,
      },
      es: {
        common: commonEs,
      },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    defaultNS: 'common',
  });

export default i18n; 