// src/components/Price.tsx
'use client';

import { useCurrency } from './CurrencyProvider';

export default function Price({ amount }: { amount: number }) {
  const { currency, rates, loading } = useCurrency();

  if (loading) return <span>در حال تبدیل...</span>;

  const rial = amount * 10;

  if (currency === 'TOMAN') {
    return <span>{amount.toLocaleString('fa-IR')} تومان</span>;
  }

  const usd = rial / rates['USDIRR'];
  let converted = usd;
  let symbol = currency;

  switch (currency) {
    case 'USD':
      symbol = 'USD';
      converted = usd;
      break;
    case 'EUR':
      symbol = 'EUR';
      converted = usd * rates['USDEUR'];
      break;
    case 'AED':
      symbol = 'AED';
      converted = usd * rates['USDAED'];
      break;
    case 'TRY':
      symbol = 'TRY';
      converted = usd * rates['USDTRY'];
      break;
  }

  return (
    <span>
      {converted.toLocaleString('en-US', { style: 'currency', currency: symbol })}
    </span>
  );
}
