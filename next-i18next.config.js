// next-i18next.config.js
module.exports = {
  i18n: {
    defaultLocale: 'en', // Changed from 'id' to 'en'
    locales: ['id', 'en'],
    localeDetection: false,
  },
  fallbackLng: {
    default: ['en'], // Changed from 'id' to 'en'
  },
  supportedLngs: ['id', 'en'],
  ns: ['common'],
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
};