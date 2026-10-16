import { Roles } from '@suuaveftx/prisma-shared';
// A simple server-side utility to redirect user in server components
const getRoleRoute = (role) => {
  switch (role) {
    case Roles.user_pending:
      return '/onboarding/ga-category';
    case Roles.artist:
      return '/artist-page';
    case Roles.brand:
      return '/fashion-designers';
    case Roles.admin:
      return '/administrator';
    default:
      return '/auth/login';
  }
};

export default getRoleRoute;
