import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,
} from '@convex-dev/auth/nextjs/server';
import { fetchMutation, fetchQuery } from 'convex/nextjs';
import { api } from '../convex/_generated/api';

const isRootPage = createRouteMatcher(['/']);

const onboardingSteps = ['profile', 'organisation'];

export default convexAuthNextjsMiddleware(async (request, { convexAuth }) => {
  const authenticated = await convexAuth.isAuthenticated();

  // If the user is not authenticated, always go to the landing page
  if (!authenticated) {
    return nextjsMiddlewareRedirect(request, '/home');
  }

  // User is authenticated

  // If the user is on the root page, redirect them to the dashboard
  if (isRootPage(request)) {
    return nextjsMiddlewareRedirect(request, '/dashboard');
  }

  // Get the current user
  const user = await fetchQuery(
    api.services.users.getCurrent,
    {},
    { token: await convexAuth.getToken() }
  );
  if (!user) {
    return nextjsMiddlewareRedirect(request, '/home');
  }

  // Check the user's onboarding step
  const onboardingStep = user.onboardingStep;

  // The onboarding step should never be undefined, but if it is, patch it and redirect
  if (onboardingStep === undefined) {
    await fetchMutation(
      api.services.users.updateCurrent,
      { onboardingStep: 0 },
      { token: await convexAuth.getToken() }
    );
    return nextjsMiddlewareRedirect(request, '/onboarding/profile');
  }

  // Check if the user has completed onboarding
  // Onboarding step will equal the length of the onboarding steps array when complete
  if (onboardingStep === onboardingSteps.length) {
    // Redirect to the dashboard if the user is authenticated and onboarding is complete
    return nextjsMiddlewareRedirect(request, '/dashboard');
  }

  // Check if the user is on the right onboarding step
  const correctOnboardingStep = onboardingSteps[onboardingStep];
  if (request.nextUrl.pathname === `/onboarding/${correctOnboardingStep}`) {
    // If the user is on the correct onboarding step, continue
    return;
  }

  // Otherwise, redirect to the correct onboarding step
  return nextjsMiddlewareRedirect(
    request,
    `/onboarding/${onboardingSteps[onboardingStep]}`
  );
});

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
