// src/components/CurrencyProvider.tsx
'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';

const CurrencyContext = createContext<any>(null);

export const useCurrency = () => useContext(CurrencyContext);

const apiKey = '0ae6c1ffb4373ecff36775ad4cb038d0';

export default function CurrencyProvider({
  children,
  locale,
}: {
  children: ReactNode;
  locale: string;
}) {
  const [rates, setRates] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState('TOMAN');

  // دریافت نرخ ارز فقط یکبار هنگام بارگذاری اولیه
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await axios.get('https://api.currencylayer.com/live', {
          params: {
            access_key: apiKey,
            symbols: 'USD,EUR,AED,TRY,IRR',
          },
        });
        setRates(res.data.quotes);
      } catch (e) {
        console.error('Failed to fetch rates:', e);
      } finally {
        setLoading(false);
      }
    };

    if (!rates) {
      fetchRates();  // فقط اگر نرخ‌ها موجود نیستند، نرخ‌ها را بارگذاری کن
    }
  }, [rates]); // این باعث می‌شود که نرخ‌ها فقط یکبار دریافت شوند

  // تنظیم ارز بر اساس locale
  useEffect(() => {
    switch (locale) {
      case 'fa':
        setCurrency('TOMAN');
        break;
      case 'en':
        setCurrency('USD');
        break;
      case 'ar':
        setCurrency('AED');
        break;
      case 'tr':
        setCurrency('TRY');
        break;
      default:
        setCurrency('TOMAN');
    }
  }, [locale]);

  return (
    <CurrencyContext.Provider value={{ currency, rates, loading }}>
      {children}
    </CurrencyContext.Provider>
  );
}
