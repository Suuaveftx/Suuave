import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  addArtistCertification,
  deleteArtistCertification,
  getArtistProfile,
  updateArtistProfile,
  updateGeneralArtistProfile,
  uploadProfileFile,
} from '../api/artist-profile';
import { ProfileUpdateRequestType } from '../types/profile-types';

export const artistProfileQueryKey = ['artist_profile'];

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
