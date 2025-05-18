export default {
  locales: ['fa', 'en', 'ar', 'tr'],
  defaultLocale: 'fa',
  messages: {
    fa: () => import('../app/locale/messages/fa.json').then((m) => m.default),
    en: () => import('../app/locale/messages/en.json').then((m) => m.default),
    ar: () => import('../app/locale/messages/ar.json').then((m) => m.default),
    tr: () => import('../app/locale/messages/tr.json').then((m) => m.default),
  }
};
