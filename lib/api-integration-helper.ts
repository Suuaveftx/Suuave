import { QueryKey, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getProfile,
  updateGeneralProfile,
  updateProfile,
  uploadProfileFile,
} from './api-calls-helper';

export const artistProfileQueryKey = ['artist_profile'];

export default function useMutationWithInvalidation<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  queryKey: QueryKey
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });
}

export function useGetProfile() {
  return useQuery({
    queryKey: artistProfileQueryKey,
    queryFn: getProfile,
  });
}

export function useUploadProfileFile() {
  return useMutation({
    mutationFn: uploadProfileFile,
  });
}

export function useUpdateProfile() {
  return useMutationWithInvalidation(updateProfile, artistProfileQueryKey);
}

export function useUpdateGeneralProfile() {
  return useMutationWithInvalidation(updateGeneralProfile, artistProfileQueryKey);
}
