import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,
} from '@convex-dev/auth/nextjs/server';

const isRootPage = createRouteMatcher(['/']);
const isProtectedRoute = createRouteMatcher([
  '/onboarding/(.*)',
  '/dashboard/(.*)?',
]);

export default convexAuthNextjsMiddleware(async (request, { convexAuth }) => {
  if (isRootPage(request)) {
    if (await convexAuth.isAuthenticated()) {
      return nextjsMiddlewareRedirect(request, '/dashboard');
    }
    return nextjsMiddlewareRedirect(request, '/home');
  }
  if (isProtectedRoute(request) && !(await convexAuth.isAuthenticated())) {
    return nextjsMiddlewareRedirect(request, '/');
  }
});

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
