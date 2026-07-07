import { NextResponse, type NextRequest } from "next/server";

import { defaultLocale, isLocale, locales } from "@/i18n/config";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const firstSegment = pathname.split("/")[1];

  if (isLocale(firstSegment)) {
    return NextResponse.next();
  }

  const preferredLocale =
    request.cookies.get("NEXT_LOCALE")?.value ??
    request.headers.get("accept-language")?.split(",")[0]?.split("-")[0] ??
    defaultLocale;

  const locale = isLocale(preferredLocale) ? preferredLocale : defaultLocale;
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next|sw.js|manifest.json|icons|.*\\..*).*)"]
};
