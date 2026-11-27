'use client';

import { Suspense } from 'react';
import PageContainer from '../../../components/layout/PageContainer';
import FashionCards from './_components/FashionCard';
import ProfileArtist from './_components/Profile';
import ProfileError from './_components/ProfileError';
import { useGetProfile } from '@/lib/api-integration-helper';
import { Roles } from '@/utils/enum';
import { useGetArtistProfileForBrand } from '../personal-details/queries/artist-profile-queries';
import { useAppStore } from '@/store';

export default function ProfilePageContainer() {
  const artistProfileId = useAppStore((state) => state.artistProfileId);

  const {
    data,
    isLoading: loadingArtistProfile,
    refetch,
    isRefetching,
    isError,
    error,
  } = useGetProfile();

  const {
    data: artistProfileForBrand,
    isLoading: loadingArtistProfileForBrand,
    refetch: refetchArtistProfile,
    isRefetching: refetchingArtistProfile,
    isError: isArtistProfileError,
    error: artistProfileError,
  } = useGetArtistProfileForBrand(artistProfileId);

  const isVisitor = data?.data?.user?.role === Roles.artist ? false : true;

  if (isError || isArtistProfileError) {
    return (
      <ProfileError
        error={isVisitor ? artistProfileError : error}
        refetch={isVisitor ? refetchArtistProfile : refetch}
        isRefetching={isVisitor ? refetchingArtistProfile : isRefetching}
      />
    );
  }

  return (
    <div className='bg-[#F1F1F1] min-h-screen w-full'>
      <PageContainer className='flex flex-col lg:flex-row items-start gap-4 pt-4 pb-4'>
        <Suspense fallback={<p>Loading...</p>}>
          <ProfileArtist
            data={isVisitor ? artistProfileForBrand : data}
            loadingArtistProfile={loadingArtistProfile}
            loadingArtistProfileForBrand={loadingArtistProfileForBrand}
            isVisitor={isVisitor}
          />
          <FashionCards
            data={isVisitor ? artistProfileForBrand : data}
            loadingArtistProfile={loadingArtistProfile}
            loadingArtistProfileForBrand={loadingArtistProfileForBrand}
            isVisitor={isVisitor}
          />
        </Suspense>
      </PageContainer>
    </div>
  );
}
