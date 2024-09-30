export {auth as middleware} from "./auth"
//TODO: add route protection
export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico, sitemap.xml, robots.txt (metadata files)
   */
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};