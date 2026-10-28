import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  createProject,
  deleteProject,
  getProject,
  listProjects,
  toggleSaveProject,
  updateProject,
  uploadProjectReference,
  type UploadProjectReferenceInput,
} from '../api/projects';
import type {
  CreateProjectRequest,
  ProjectId,
  ProjectListParams,
  UpdateProjectRequest,
} from '../types/project-types';

export const projectQueryKeys = {
  all: ['projects'] as const,
  lists: () => [...projectQueryKeys.all, 'list'] as const,
  list: (params: ProjectListParams) => [...projectQueryKeys.lists(), params] as const,
  details: () => [...projectQueryKeys.all, 'detail'] as const,
  detail: (projectId: ProjectId) => [...projectQueryKeys.details(), projectId] as const,
};

export function useProjects(params: ProjectListParams = {}) {
  return useQuery({
    queryKey: projectQueryKeys.list(params),
    queryFn: () => listProjects(params),
  });
}

export function useProject(projectId: ProjectId | null | undefined) {
  return useQuery({
    queryKey: projectId
      ? projectQueryKeys.detail(projectId)
      : [...projectQueryKeys.details(), 'unselected'],
    queryFn: () => {
      if (!projectId) {
        throw new Error('A project ID is required to fetch project details.');
      }

      return getProject(projectId);
    },
    enabled: Boolean(projectId),
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateProjectRequest) => createProject(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: projectQueryKeys.lists() }),
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId, input }: { projectId: ProjectId; input: UpdateProjectRequest }) =>
      updateProject(projectId, input),
    onSuccess: (_data, variables) =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: projectQueryKeys.lists() }),
        queryClient.invalidateQueries({
          queryKey: projectQueryKeys.detail(variables.projectId),
        }),
      ]),
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectId: ProjectId) => deleteProject(projectId),
    onSuccess: (_data, projectId) =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: projectQueryKeys.lists() }),
        queryClient.removeQueries({ queryKey: projectQueryKeys.detail(projectId) }),
      ]),
  });
}

export function useToggleSaveProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectId: ProjectId) => toggleSaveProject(projectId),
    onSuccess: (_data, projectId) =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: projectQueryKeys.lists() }),
        queryClient.invalidateQueries({
          queryKey: projectQueryKeys.detail(projectId),
        }),
      ]),
  });
}

export function useUploadProjectReference() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UploadProjectReferenceInput) => uploadProjectReference(input),
    onSuccess: (_data, variables) =>
      queryClient.invalidateQueries({
        queryKey: projectQueryKeys.detail(variables.projectId),
      }),
  });
}
