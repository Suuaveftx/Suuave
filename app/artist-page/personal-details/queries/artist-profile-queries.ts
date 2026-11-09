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
  getUserDesigns,
  getUserReviews,
  getWorkSamples,
  updateArtistProfile,
  updateGeneralArtistProfile,
  updateWorkSample,
  uploadProfileFile,
} from '../api/artist-profile';
import { ProfileUpdateRequestType } from '../types/profile-types';

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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ProfileUpdateRequestType) => updateArtistProfile(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: artistProfileQueryKey });
    },
  });
}

export function useAddArtistCertification() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateArtistProfile,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: artistProfileQueryKey });
    },
  });
}

export function useAddNewArtistAward() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addArtistCertification,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: artistProfileQueryKey });
    },
  });
}

export function useUpdateGeneralArtistProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateGeneralArtistProfile,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: artistProfileQueryKey });
    },
  });
}

export function useUpdateArtistProfileImage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateGeneralArtistProfile,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: artistProfileQueryKey });
    },
  });
}

export function useDeleteArtistCertification() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteArtistCertification,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: artistProfileQueryKey });
    },
  });
}

export function useGetArtistDesigns() {
  return useInfiniteQuery({
    queryKey: artistsDesignsQueryKey,
    queryFn: ({ pageParam }) => getUserDesigns(pageParam),
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
    queryFn: getUserReviews,
  });
}

export function useGetWorksSamples() {
  return useQuery({
    queryKey: workSamplesQueryKey,
    queryFn: getWorkSamples,
  });
}

export function useUpdateWorkSample() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateWorkSample,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: workSamplesQueryKey });
    },
  });
}

export function useDeleteWorkSample() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteWorkSample,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: workSamplesQueryKey });
    },
  });
}

export function useAddWorkSample() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addWorkSample,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: workSamplesQueryKey });
    },
  });
}
