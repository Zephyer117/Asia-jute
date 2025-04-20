import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Create a route matcher for service routes
const isServiceRoute = createRouteMatcher([
  '/services(.*)',
]);

export default clerkMiddleware((auth, req) => {
  // Handle service to category redirects
  if (isServiceRoute(req)) {
    const url = new URL(req.url);
    const path = url.pathname;
    
    // Redirect /services to /categories
    if (path === '/services') {
      return NextResponse.redirect(new URL('/categories', req.url));
    }
    
    // Redirect /services/[slug] to /category/[slug]
    const slug = path.split('/services/')[1];
    if (slug) {
      return NextResponse.redirect(new URL(`/category/${slug}`, req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};