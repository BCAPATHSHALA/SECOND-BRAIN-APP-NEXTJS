/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get the token from the request
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // console.log("token:", token);
  /*
  token: {
    sub: '67484f6092c08503ebcce706',
    _id: '67484f6092c08503ebcce706',
    username: 'username1',
    role: 'USER',
    iat: 1732792278,
    exp: 1735384278,
    jti: '97e83883-cfce-4df3-af30-865eb3f6b2fb'
  }
  */

  // If there's no token and it's a protected route, redirect to sign-in
  if (!token && isProtectedRoute(pathname)) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  // If there's a token and user is trying to access sign-in or sign-up, redirect to dashboard
  if (token && pathname === "/auth") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Check for role-based access for protected routes
  if (token && !hasAccess(token, pathname)) {
    // If the token doesn't have the required role, check if there's an updated role in the session
    const updatedToken = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
      raw: true,
    });

    if (updatedToken && hasAccess(updatedToken, pathname)) {
      // If the updated token has the required role, allow access
      return NextResponse.next();
    }
    // Redirect to access denied page
    return NextResponse.redirect(new URL("/access-denied", request.url));
  }

  return NextResponse.next();
}

// Check if the route is protected
function isProtectedRoute(pathname: string): boolean {
  const protectedRoutes = ["/dashboard", "/admin"];
  return protectedRoutes.some((route) => pathname.startsWith(route));
}

// Check if the user has access
function hasAccess(token: any, pathname: string): boolean {
  const roleAccess: { [key: string]: string[] } = {
    "/admin": ["admin"],
    "/dashboard": ["user", "admin"],
  };

  const userRole = token.role || "user";
  const requiredRoles = Object.entries(roleAccess).find(([route]) =>
    pathname.startsWith(route)
  )?.[1];

  return requiredRoles ? requiredRoles.includes(userRole) : true;
}

// All are the protected routes always in the middleware matcher
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/auth/:path*",
    "/api/auth/:path*",
    "/api/admin/:path*",
    "/api/content/:path*",
  ],
};
