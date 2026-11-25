import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {
  addArtistCertification,
  addWorkSample,
  deleteArtistCertification,
  deleteWorkSample,
  getArtistDesigns,
  getArtistDesignsForBrand,
  getArtistProfileForBrand,
  getArtistReviews,
  getArtistReviewsForBrand,
  getWorkSamples,
  updateWorkSample,
} from '../api/artist-profile';
import useMutationWithInvalidation from '@/lib/api-integration-helper';

export const artistProfileQueryKey = ['artist_profile'];
export const artistsDesignsQueryKey = ['artist_designs'];
export const artistsReviewsQueryKey = ['artist_reviews'];
export const workSamplesQueryKey = ['work_samples', 'artist_profile'];

export const brandArtistprofileQueryKey = ['brand_artist_profile'];
export const brandArtistReviewsQueryKey = ['brand_artist_reviews'];
export const brandArtistDesignsQueryKey = ['brand_artist_designs'];

export function useAddArtistCertification() {
  return useMutationWithInvalidation(addArtistCertification, artistProfileQueryKey);
}

export function useDeleteArtistCertification() {
  return useMutationWithInvalidation(deleteArtistCertification, artistProfileQueryKey);
}

export function useGetArtistDesigns(enabled?: boolean) {
  return useInfiniteQuery({
    queryKey: artistsDesignsQueryKey,
    queryFn: ({ pageParam }) => getArtistDesigns(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.meta;
      return page < totalPages ? page + 1 : undefined;
    },
    enabled,
  });
}

export function useGetArtistReviews(enabled?: boolean) {
  return useQuery({
    queryKey: artistsReviewsQueryKey,
    queryFn: getArtistReviews,
    enabled,
  });
}

export function useGetWorksSamples(enabled?: boolean) {
  return useQuery({
    queryKey: workSamplesQueryKey,
    queryFn: getWorkSamples,
    enabled,
  });
}

export function useUpdateWorkSample() {
  return useMutationWithInvalidation(updateWorkSample, workSamplesQueryKey);
}

export function useDeleteWorkSample() {
  return useMutationWithInvalidation(deleteWorkSample, workSamplesQueryKey);
}

export function useAddWorkSample() {
  return useMutationWithInvalidation(addWorkSample, workSamplesQueryKey);
}

export function useGetArtistProfileForBrand(artistId: string) {
  return useQuery({
    queryKey: brandArtistprofileQueryKey,
    queryFn: () => getArtistProfileForBrand(artistId),
    enabled: !!artistId,
  });
}
export function useGetArtistReviewsForBrand(artistId: string, enabled?: boolean) {
  return useQuery({
    queryKey: brandArtistReviewsQueryKey,
    queryFn: () => getArtistReviewsForBrand(artistId),
    enabled: !!artistId && enabled,
  });
}

export function useGetArtistDesignsForBrand(artistId: string, enabled?: boolean) {
  return useInfiniteQuery({
    queryKey: brandArtistDesignsQueryKey,
    queryFn: ({ pageParam }) => getArtistDesignsForBrand(pageParam, artistId),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.meta;
      return page < totalPages ? page + 1 : undefined;
    },
    enabled: !!artistId && enabled,
  });
}
