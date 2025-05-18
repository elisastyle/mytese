// src/app/layout.tsx
import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';

export default async function RootLayout({ children }: { children: ReactNode }) {
  const messages = await import('./locale/messages/fa.json').then((m) => m.default);

  return (
    <html lang="fa">
      <body>
        <NextIntlClientProvider locale="fa" messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
