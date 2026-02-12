import { useRouter } from 'next/navigation';
import { Roles } from '../utils/enum';

export const useRoleRedirect = () => {
  const router = useRouter();

  const redirectUser = (role) => {
    const routes = {
      [Roles.artist]: '/artist-page',
      [Roles.brand]: '/fashion-designers',
      [Roles.admin]: '/administrator',
    };

    // If role doesn't exist in our map, fall back to login
    const destination = routes[role] || '/auth/login';

    router.push(destination);
  };

  return { redirectUser };
};
