import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest, res: NextResponse) {
  const token = req.cookies.get("token");

  if (
    req.nextUrl.pathname !== "/" &&
    req.nextUrl.pathname !== "/login" &&
    req.nextUrl.pathname !== "/register" &&
    !token
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher:
    "/((?!api|_next/static|_next/image|icons|background|favicon.ico|sitemap.xml|robots.txt).*)",
};
