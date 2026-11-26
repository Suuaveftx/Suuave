import { ArtistProfileInfoResponse } from '@/app/artist-page/personal-details/types/profile-types';

export const getProfileNameParts = (profile: ArtistProfileInfoResponse) => {
  const nameParts = (profile?.user?.name || '').trim().split(/\s+/).filter(Boolean);
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');

  return { firstName, lastName };
};
