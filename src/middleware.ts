import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;

  // Protect admin routes
  if (pathname.startsWith("/admin")) {
    // if (!token) {
    //   const loginUrl = new URL("/auth/login", request.url);
    //   loginUrl.searchParams.set("redirect", pathname);
    //   return NextResponse.redirect(loginUrl);
    // }

    // In a real app, you would verify the token and check user role
    // For now, we'll just check if token exists
  }

  // Redirect authenticated users away from auth pages
  if (pathname.startsWith("/auth") && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
