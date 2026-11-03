'use client';

import { Suspense } from 'react';
import PageContainer from '../../../components/layout/PageContainer';
import FashionCards from './_components/FashionCard';
import ProfileArtist from './_components/Profile';
import { useGetArtistProfile } from '../personal-details/queries/artist-profile-queries';
import ProfileError from './_components/ProfileError';

export default function AppContainer() {
  const { data, isLoading: loadingArtistProfile, isError, error } = useGetArtistProfile();

  if (isError || !data?.data) {
    return <ProfileError error={error} />;
  }

  return (
    <div className='bg-[#F1F1F1] min-h-screen w-full'>
      <PageContainer className='flex flex-col lg:flex-row items-start gap-4 pt-4 pb-4'>
        <Suspense fallback={<p>Loading...</p>}>
          <ProfileArtist data={data} loadingArtistProfile={loadingArtistProfile} />
          <FashionCards data={data} loadingArtistProfile={loadingArtistProfile} />
        </Suspense>
      </PageContainer>
    </div>
  );
}
