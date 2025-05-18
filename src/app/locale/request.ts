import type { NextIntlConfig } from 'next-intl';

const requestConfig: NextIntlConfig = {
  locales: ['fa', 'en', 'ar', 'tr'],
  defaultLocale: 'fa',
  messages: {
    fa: () => import('./messages/fa.json').then(m => m.default),
    en: () => import('./messages/en.json').then(m => m.default),
    ar: () => import('./messages/ar.json').then(m => m.default),
    tr: () => import('./messages/tr.json').then(m => m.default),
  },
};

export default requestConfig;
