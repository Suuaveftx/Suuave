import ProfileDetailsPage from '@/components/profile/ProfileDetailsPage';
import { Roles } from '@/lib/roles';

export default function Page() {
  return <ProfileDetailsPage role={Roles.artist} />;
}
