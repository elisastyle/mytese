import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;
const supportedLocales = ['fa', 'en', 'ar', 'tr'];
const defaultLocale = 'fa';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // مسیر ریشه را به لوکال پیش‌فرض هدایت می‌کند
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
  }

  const pathnameIsMissingLocale = supportedLocales.every(
    (locale) => !pathname.startsWith(`/${locale}`)
  );

  if (pathnameIsMissingLocale) {
    const localeRaw = request.headers.get('accept-language')?.split(',')[0].split('-')[0];
    const matchedLocale = localeRaw && supportedLocales.includes(localeRaw) ? localeRaw : defaultLocale;
    return NextResponse.redirect(new URL(`/${matchedLocale}${pathname}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
