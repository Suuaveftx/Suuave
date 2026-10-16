import { redirect } from 'next/navigation';
import { getServerSession } from './get-session';
import { Roles } from '@/utils/enum';

/**
 * Redirects logged-in users to their respective dashboards.
 * Use this on "Guest-only" pages like Login or Sign Up.
 */
export async function redirectIfAuthenticated() {
  const session = await getServerSession();
  const user = session?.user;

  if (user) {
    const roleRoutes = {
      [Roles.artist]: '/artist-page',
      [Roles.brand]: '/fashion-designers',
      [Roles.admin]: '/administrator',
    };

    const route = roleRoutes[user.role];

    // Redirect to assigned route or fallback to unauthorized
    redirect(route || '/unauthorized');
  }

  return null;
}
