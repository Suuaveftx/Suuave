import ProfileDetailsPage from '@/components/profile/ProfileDetailsPage';
import { Roles } from '@/utils/enum';

export default function Page() {
  return <ProfileDetailsPage role={Roles.artist} />;
}
