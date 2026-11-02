import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteArtistCertification,
  getArtistProfile,
  updateArtistProfile,
  updateArtistProfileImage,
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

export function useUpdateArtistProfileImage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateArtistProfileImage,
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
