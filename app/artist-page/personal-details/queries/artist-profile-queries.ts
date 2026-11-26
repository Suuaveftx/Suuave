import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  addArtistCertification,
  addWorkSample,
  deleteArtistCertification,
  deleteWorkSample,
  getArtistProfile,
  getArtistDesigns,
  getArtistReviews,
  getWorkSamples,
  updateArtistProfile,
  updateGeneralArtistProfile,
  updateWorkSample,
  uploadProfileFile,
} from '../api/artist-profile';
import useMutationWithInvalidation from '@/lib/api-integration-helper';

export const artistProfileQueryKey = ['artist_profile'];
export const artistsDesignsQueryKey = ['artist_designs'];
export const artistsReviewsQueryKey = ['artist_reviews'];
export const workSamplesQueryKey = ['work_samples'];

export function useGetArtistProfile() {
  return useQuery({
    queryKey: artistProfileQueryKey,
    queryFn: getArtistProfile,
  });
}

export function useUploadProfileFile() {
  return useMutation({
    mutationFn: uploadProfileFile,
  });
}

export function useUpdateArtistProfile() {
  return useMutationWithInvalidation(updateArtistProfile, artistProfileQueryKey);
}

export function useAddArtistCertification() {
  return useMutationWithInvalidation(addArtistCertification, artistProfileQueryKey);
}

export function useUpdateGeneralArtistProfile() {
  return useMutationWithInvalidation(updateGeneralArtistProfile, artistProfileQueryKey);
}

export function useDeleteArtistCertification() {
  return useMutationWithInvalidation(deleteArtistCertification, artistProfileQueryKey);
}

export function useGetArtistDesigns() {
  return useInfiniteQuery({
    queryKey: artistsDesignsQueryKey,
    queryFn: ({ pageParam }) => getArtistDesigns(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.meta;
      return page < totalPages ? page + 1 : undefined;
    },
  });
}

export function useGetArtistReviews() {
  return useQuery({
    queryKey: artistsReviewsQueryKey,
    queryFn: getArtistReviews,
  });
}

export function useGetWorksSamples() {
  return useQuery({
    queryKey: workSamplesQueryKey,
    queryFn: getWorkSamples,
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
