import type { ProfileInfoResponse } from '@/lib/common-app-types';

export const getProfileNameParts = (profile: Pick<ProfileInfoResponse, 'user'>) => {
  const nameParts = (profile?.user?.name || '').trim().split(/\s+/).filter(Boolean);
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');

  return { firstName, lastName };
};
