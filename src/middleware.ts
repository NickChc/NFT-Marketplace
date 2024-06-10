import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { i18n } from "../i18n.config";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { isValidPassword } from "@/lib/isValidPassword";
import { auth } from "@/firebase";

function getLocale(req: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  req.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  //   @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;
  const languages = new Negotiator({
    headers: negotiatorHeaders,
  }).languages();

  const locale = matchLocale(languages, locales, i18n.defaultLocale);
  return locale;
}

async function isAuthenticated(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const authHeader =
    req.headers.get("Authorization") || req.headers.get("authorization");

  if (authHeader == null) return false;

  const [username, password] = Buffer.from(authHeader.split(" ")[1], "base64")
    .toString()
    .split(":");

  return (
    username === process.env.ADMIN_USERNAME &&
    isValidPassword(password, process.env.HASHED_ADMIN_PASSWORD as string)
  );
}

export async function middleware(req: NextRequest) {
  const locale = getLocale(req);
  const protectedRoutes = ["profile", "buy", "bid"];

  const pathname = req.nextUrl.pathname;
  const pathnameisMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  const tokenCookie = req.cookies.get("auth");
  const token = tokenCookie?.value;

  if (protectedRoutes.some((route) => pathname.includes(route))) {
    if (!token) {
      return NextResponse.redirect(new URL(`/${locale}/auth/sign-in`, req.url));
    }
  }
  if (pathnameisMissingLocale) {
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        req.url
      )
    );
  }

  if (
    pathname.startsWith(`/${locale}/admin`) &&
    (await isAuthenticated(req)) === false
  ) {
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: { "WWW-Authenticate": "Basic" },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
