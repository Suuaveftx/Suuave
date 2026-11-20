import { QueryKey, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getProfile,
  getReviews,
  updateGeneralProfile,
  updateProfile,
  uploadFile,
} from './api-calls-helper';

export const profileQueryKey = ['artist_profile'];
export const reviewsQueryKey = ['reviews'];

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
    queryKey: profileQueryKey,
    queryFn: getProfile,
  });
}

export function useUploadFile() {
  return useMutation({
    mutationFn: uploadFile,
  });
}

export function useUpdateProfile() {
  return useMutationWithInvalidation(updateProfile, profileQueryKey);
}

export function useUpdateGeneralProfile() {
  return useMutationWithInvalidation(updateGeneralProfile, profileQueryKey);
}

export function useGetReviews() {
  return useQuery({
    queryKey: reviewsQueryKey,
    queryFn: getReviews,
  });
}
