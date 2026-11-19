import ProfileDetailsPage from '@/components/profile/ProfileDetailsPage';
import { Roles } from '@suuaveftx/prisma-shared';

export default function Page() {
  return <ProfileDetailsPage role={Roles.brand} />;
}
