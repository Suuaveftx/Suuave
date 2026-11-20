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

const MAX_PAGE_SIZE = 50; // backend rejects limit > 50
const MAX_PAGES = 20; // safety cap

/**
 * Loads EVERY page of a project list (50 per request) and returns them as one list.
 * Stored under the lists() key prefix with { projects, pagination } shape, so
 * useToggleSaveProject keeps its isSaved values in sync automatically.
 */
export function useAllProjects(params: Omit<ProjectListParams, 'page' | 'limit'> = {}) {
  return useQuery({
    queryKey: [...projectQueryKeys.lists(), { ...params, limit: MAX_PAGE_SIZE, scope: 'all' }],
    queryFn: async (): Promise<ProjectListResult> => {
      const first = await listProjects({ ...params, page: 1, limit: MAX_PAGE_SIZE });
      const lastPage = Math.min(first.pagination.totalPages, MAX_PAGES);
      const rest = await Promise.all(
        Array.from({ length: Math.max(0, lastPage - 1) }, (_, i) =>
          listProjects({ ...params, page: i + 2, limit: MAX_PAGE_SIZE })
        )
      );
      const projects = [first, ...rest].flatMap((result) => result.projects);
      return {
        projects,
        pagination: {
          ...first.pagination,
          currentPage: 1,
          limit: Math.max(1, projects.length),
          totalPages: 1,
        },
      };
    },
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
      const currentSavedState =
        previousDetail?.isSaved ??
        previousLists
          .map(([, data]) => (data as ProjectListResult | undefined)?.projects)
          .flat()
          .find((project) => project?.projectId === projectId)?.isSaved ??
        false;

      previousLists.forEach(([queryKey, data]) => {
        const projectList = data as ProjectListResult | undefined;
        if (!projectList?.projects) return;
        const queryParams = queryKey[2];
        const isSavedList =
          typeof queryParams === 'object' &&
          queryParams !== null &&
          'filter' in queryParams &&
          queryParams.filter === 'saved';
        const currentProject = projectList.projects.find(
          (project) => project.projectId === projectId
        );
        const nextIsSaved = !currentSavedState;

        const nextProjects =
          isSavedList && currentProject && !nextIsSaved
            ? projectList.projects.filter((project) => project.projectId !== projectId)
            : projectList.projects.map((project) =>
                project.projectId === projectId
                  ? { ...project, isSaved: nextIsSaved }
                  : project
              );
        const nextTotalProjects =
          isSavedList && !currentProject && nextIsSaved
            ? projectList.pagination.totalProjects + 1
            : isSavedList && currentProject && !nextIsSaved
              ? Math.max(0, projectList.pagination.totalProjects - 1)
              : projectList.pagination.totalProjects;

        queryClient.setQueryData<ProjectListResult>(queryKey, {
          ...projectList,
          projects: nextProjects,
          pagination: isSavedList && nextTotalProjects !== projectList.pagination.totalProjects
            ? {
                ...projectList.pagination,
                totalProjects: nextTotalProjects,
                totalPages: Math.max(
                  1,
                  Math.ceil(nextTotalProjects / projectList.pagination.limit)
                ),
              }
            : projectList.pagination,
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
    onSuccess: (savedProject, projectId) => {
      const currentLists = queryClient.getQueriesData<ProjectListResult>({
        queryKey: projectQueryKeys.lists(),
      });
      currentLists.forEach(([queryKey, data]) => {
        if (!data) return;
        const queryParams = queryKey[2];
        const isSavedList =
          typeof queryParams === 'object' &&
          queryParams !== null &&
          'filter' in queryParams &&
          queryParams.filter === 'saved';
        const containsProject = data.projects.some(
          (project) => project.projectId === projectId
        );
        if (isSavedList && !savedProject.isSaved && containsProject) {
          const projects = data.projects.filter(
            (project) => project.projectId !== projectId
          );
          queryClient.setQueryData<ProjectListResult>(queryKey, {
            ...data,
            projects,
            pagination: {
              ...data.pagination,
              totalProjects: Math.max(0, data.pagination.totalProjects - 1),
              totalPages: Math.max(
                1,
                Math.ceil(
                  Math.max(0, data.pagination.totalProjects - 1) /
                    data.pagination.limit
                )
              ),
            },
          });
          return;
        }
        queryClient.setQueryData<ProjectListResult>(queryKey, {
          ...data,
          projects: data.projects.map((project) =>
            project.projectId === projectId
              ? { ...project, isSaved: savedProject.isSaved }
              : project
          ),
        });
      });
      queryClient.setQueryData<Project>(
        projectQueryKeys.detail(projectId),
        (data) =>
          data
            ? {
                ...data,
                isSaved: savedProject.isSaved,
              }
            : data
      );
    },
    onSettled: (_data, _error, projectId) =>
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: projectQueryKeys.lists(),
          refetchType: 'none',
        }),
        queryClient.invalidateQueries({
          queryKey: projectQueryKeys.detail(projectId),
          refetchType: 'none',
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