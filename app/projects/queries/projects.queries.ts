import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
import type { ProjectListResult } from '../api/projects';
import type {
  CreateProjectRequest,
  Project,
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
    placeholderData: (previousData) => previousData,
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
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: projectQueryKeys.lists() }),
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectId,
      input,
    }: {
      projectId: ProjectId;
      input: UpdateProjectRequest;
    }) => updateProject(projectId, input),
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
    onMutate: async (projectId) => {
      await queryClient.cancelQueries({ queryKey: projectQueryKeys.lists() });
      const previousLists = queryClient.getQueriesData<ProjectListResult>({
        queryKey: projectQueryKeys.lists(),
      });

      previousLists.forEach(([queryKey, data]) => {
        const projectList = data as ProjectListResult | undefined;
        if (!projectList?.projects) return;

        queryClient.setQueryData<ProjectListResult>(queryKey, {
          ...projectList,
          projects: projectList.projects.filter(
            (project) => project.projectId !== projectId
          ),
          pagination: {
            ...projectList.pagination,
            totalProjects: Math.max(0, projectList.pagination.totalProjects - 1),
          },
        });
      });

      return { previousLists };
    },
    onError: (_error, _projectId, context) => {
      context?.previousLists?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },
    onSettled: (_data, _error, projectId) =>
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: projectQueryKeys.lists(),
          refetchType: 'none',
        }),
        queryClient.removeQueries({ queryKey: projectQueryKeys.detail(projectId) }),
      ]),
  });
}

export function useToggleSaveProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectId: ProjectId) => toggleSaveProject(projectId),
    onMutate: async (projectId) => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: projectQueryKeys.lists() }),
        queryClient.cancelQueries({ queryKey: projectQueryKeys.detail(projectId) }),
      ]);

      const previousLists = queryClient.getQueriesData({
        queryKey: projectQueryKeys.lists(),
      });
      const previousDetail = queryClient.getQueryData<Project>(
        projectQueryKeys.detail(projectId)
      );

      previousLists.forEach(([queryKey, data]) => {
        const projectList = data as ProjectListResult | undefined;
        if (!projectList?.projects) return;

        queryClient.setQueryData<ProjectListResult>(queryKey, {
          ...projectList,
          projects: projectList.projects.map((project) =>
            project.projectId === projectId
              ? { ...project, isSaved: !project.isSaved }
              : project
          ),
        });
      });

      if (previousDetail) {
        queryClient.setQueryData<Project>(projectQueryKeys.detail(projectId), {
          ...previousDetail,
          isSaved: !previousDetail.isSaved,
        });
      }

      return { previousLists, previousDetail };
    },
    onError: (_error, projectId, context) => {
      context?.previousLists?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
      queryClient.setQueryData(
        projectQueryKeys.detail(projectId),
        context?.previousDetail
      );
    },
    onSettled: (_data, _error, projectId) =>
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
