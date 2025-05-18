import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  const resolvedLocale = locale ?? 'fa';

  return {
    locale: resolvedLocale,
    messages: (await import(`../app/locale/messages/${resolvedLocale}.json`)).default
  };
});
