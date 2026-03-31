import { redirect } from 'next/navigation';
import { getServerSession } from './get-session';

/**
 * Ensures user is logged in and has the correct role.
 * Use this on protected dashboard pages.
 */
export async function requireAuth(allowedRoles = []) {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) {
    redirect('/auth/login');
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    redirect('/unauthorized');
  }

  return user;
}
