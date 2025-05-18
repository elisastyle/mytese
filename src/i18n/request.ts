import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  const resolvedLocale = locale ?? 'fa'; // جلوگیری از undefined بودن

  return {
    locale: resolvedLocale,
    messages: (await import(`../app/locale/messages/${resolvedLocale}.json`)).default
  };
});
