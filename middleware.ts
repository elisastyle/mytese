import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;
const locales = ['fa', 'en', 'ar', 'tr'];
const defaultLocale = 'fa';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip public files, API routes, etc.
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // اگر مسیر / است، ریدایرکت به زبان پیش‌فرض
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
  }

  // اگر مسیر locale ندارد
  const missingLocale = locales.every((locale) => !pathname.startsWith(`/${locale}`));

  if (missingLocale) {
    const acceptLanguage = request.headers.get('accept-language');
    const preferred = acceptLanguage?.split(',')[0].split('-')[0];
    const matched = locales.includes(preferred!) ? preferred : defaultLocale;

    return NextResponse.redirect(new URL(`/${matched}${pathname}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|static|favicon.ico).*)'],
};
