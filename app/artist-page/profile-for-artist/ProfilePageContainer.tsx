'use client';

import { Suspense } from 'react';
import PageContainer from '../../../components/layout/PageContainer';
import FashionCards from './_components/FashionCard';
import ProfileArtist from './_components/Profile';
import { useGetArtistProfile } from '../personal-details/queries/artist-profile-queries';
import ProfileError from './_components/ProfileError';

export default function ProfilePageContainer() {
  const {
    data,
    isLoading: loadingArtistProfile,
    refetch,
    isRefetching,
    isError,
    error,
  } = useGetArtistProfile();

  const isVisitor = data?.data?.user?.role === 'artist' ? false : true;

  if (isError) {
    return <ProfileError error={error} refetch={refetch} isRefetching={isRefetching} />;
  }

  return (
    <div className='bg-[#F1F1F1] min-h-screen w-full'>
      <PageContainer className='flex flex-col lg:flex-row items-start gap-4 pt-4 pb-4'>
        <Suspense fallback={<p>Loading...</p>}>
          <ProfileArtist
            data={data}
            loadingArtistProfile={loadingArtistProfile}
            isVisitor={isVisitor}
          />
          <FashionCards
            data={data}
            loadingArtistProfile={loadingArtistProfile}
            isVisitor={isVisitor}
          />
        </Suspense>
      </PageContainer>
    </div>
  );
}
