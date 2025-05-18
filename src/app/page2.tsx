'use client';

import { useTranslations } from 'next-intl';

export async function generateStaticParams() {
  return [
    { locale: 'fa' },
    { locale: 'en' },
    { locale: 'ar' },
    { locale: 'tr' },
  ];
}

export async function generateStaticProps({ params }: { params: { locale: string } }) {
  const messages = (await import(`./locale/messages/${params.locale}.json`)).default;
  return {
    props: {
      messages,
    },
  };
}

export default function HomePage() {
  const t = useTranslations();

  return (
    <div>
      <h1>{t('welcome')}</h1>
    </div>
  );
}
