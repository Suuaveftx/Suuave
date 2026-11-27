import useMutationWithInvalidation from '@/lib/api-integration-helper';
import {
  deleteUserDesign,
  getRelatedDesigns,
  getSavedDesigns,
  getStudioDesigns,
  getUserDesignDetails,
  getUserDesigns,
  publishUserDesign,
  saveDesignAsDraft,
  saveUserDesign,
  unsaveUserDesign,
  updateUserDesign,
} from '../api/designs-api-calls';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { artistsDesignsQueryKey } from '../../personal-details/queries/artist-profile-queries';

export const userDesignsQueryKey = ['user_designs'];
export const studioDesignsQueryKey = ['studio_designs'];
export const savedDesignsQueryKey = ['saved_designs'];
export const relatedDesignsQueryKey = ['related_designs'];

export function usePublishUserDesign() {
  return useMutationWithInvalidation(publishUserDesign, userDesignsQueryKey);
}

export function useUpdateUserDesign() {
  return useMutationWithInvalidation(updateUserDesign, userDesignsQueryKey);
}

export function useSaveDesignAsDraft() {
  return useMutationWithInvalidation(saveDesignAsDraft, artistsDesignsQueryKey);
}

export function useSaveUserDesign() {
  return useMutationWithInvalidation(saveUserDesign, savedDesignsQueryKey);
}

export function useDeleteUserDesign() {
  return useMutationWithInvalidation(deleteUserDesign, artistsDesignsQueryKey);
}

export function useUnsaveUserDesign() {
  return useMutationWithInvalidation(unsaveUserDesign, savedDesignsQueryKey);
}

export function useGetUserDesigns() {
  return useQuery({
    queryKey: userDesignsQueryKey,
    queryFn: getUserDesigns,
  });
}

export function useGetStudioDesigns(search = '') {
  const normalizedSearch = search.trim();
  return useInfiniteQuery({
    queryKey: [...studioDesignsQueryKey, normalizedSearch],
    queryFn: ({ pageParam }) =>
      getStudioDesigns({
        page: pageParam,
        search: normalizedSearch || undefined,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, hasNextPage } = lastPage.data.pagination;
      return hasNextPage ? page + 1 : undefined;
    },
  });
}

export function useSavedDesigns(search = '') {
  const normalizedSearch = search.trim();
  return useInfiniteQuery({
    queryKey: [...savedDesignsQueryKey, normalizedSearch],
    queryFn: ({ pageParam }) =>
      getSavedDesigns({
        page: pageParam,
        search: normalizedSearch || undefined,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, hasNextPage } = lastPage.data.pagination;
      return hasNextPage ? page + 1 : undefined;
    },
  });
}

export function useGetRelatedDesign(id: string, enabled?: boolean) {
  return useQuery({
    queryKey: [...relatedDesignsQueryKey, id],
    queryFn: () => getRelatedDesigns(id),
    enabled: Boolean(id) && enabled !== false,
    staleTime: 5 * 60 * 1000,
  });
}

export function useGetUserDesignDetails(id: string, enabled?: boolean) {
  return useQuery({
    queryKey: ['user_designs', 'artist_designs', id],
    queryFn: () => getUserDesignDetails(id),
    enabled,
    staleTime: 5 * 60 * 1000,
  });
}
