import { NextRequest, NextResponse } from "next/server";

//Functions to determine application pathnames
const isHomeRoute = (pathname: string) => pathname.startsWith("/home");
const isRootRoute = (pathname: string) => pathname === "/";

const isLoginRoute = (pathname: string) => pathname === "/login";
const isSignUpRoute = (pathname: string) => pathname === "/signup";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token_access")?.value;
  const { pathname } = request.nextUrl;

  // Define relevant URLs
  const homeURL = new URL("/home", request.url);
  const loginURL = new URL("/login", request.url);

  // Switch case to determine redirection based on token state and pathname
  switch (true) {
    case !token && isRootRoute(pathname):
    case !token && isHomeRoute(pathname):
      return NextResponse.redirect(loginURL);
    case token && isLoginRoute(pathname):
    case token && isSignUpRoute(pathname):
      return NextResponse.redirect(homeURL);
    default:
      return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
