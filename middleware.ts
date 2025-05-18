import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;
const supportedLocales = ['fa', 'en', 'ar', 'tr'];
const defaultLocale = 'fa';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/api') || PUBLIC_FILE.test(pathname)) {
    return NextResponse.next();
  }

  const pathnameIsMissingLocale = supportedLocales.every(
    (locale) => !pathname.startsWith(`/${locale}`)
  );

  if (pathnameIsMissingLocale) {
    const locale = request.headers
      .get('accept-language')
      ?.split(',')[0]
      .split('-')[0];

    const matchedLocale = supportedLocales.includes(locale!) ? locale : defaultLocale;

    return NextResponse.redirect(new URL(`/${matchedLocale}${pathname}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|favicon.ico).*)']
};
