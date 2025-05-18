'use client';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

export default function HomePageFa() {
  const t = useTranslations();

  useEffect(() => {
    console.log("کامپوننت HomePageFa در سمت کلاینت مونت شد");
  }, []);

  console.log("کامپوننت HomePageFa در سمت سرور رندر شد");

  return <h1>{t('welcome')}</h1>;
}