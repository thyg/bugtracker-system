import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Pages qui nécessitent une authentification
const protectedRoutes = ["/dashboard", "/projects", "/issues", "/performance", "/team", "/settings"]

// Pages d'authentification
const authRoutes = ["/login", "/register"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get("auth-token")?.value

  // Vérifier si la route est protégée
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))
  const isAuthRoute = authRoutes.includes(pathname)

  // Rediriger vers login si pas authentifié et route protégée
  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("redirect", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Rediriger vers dashboard si authentifié et sur page d'auth
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
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
}
