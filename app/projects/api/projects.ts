import axios from 'axios';
import { apiClient } from '@/lib/axios';
import type {
  CreateProjectRequest,
  CreateProjectResponse,
  DeleteProjectResponse,
  ProjectApiError,
  ProjectApiModel,
  ProjectDetailApiResponse,
  ProjectFileUploadResponse,
  ProjectId,
  ProjectListParams,
  ProjectPagination,
  ProjectsApiResponse,
  ToggleSaveProjectResponse,
  UpdateProjectRequest,
} from '../types/project-types';

const PROJECTS_ENDPOINT = '/api/v1/projects';

export type ProjectListResult = {
  projects: ProjectApiModel[];
  pagination: ProjectPagination;
};

export type UploadProjectReferenceInput = {
  file: File;
  projectId: ProjectId;
};

export async function listProjects(params: ProjectListParams = {}): Promise<ProjectListResult> {
  const response = await apiClient.get<ProjectsApiResponse>(PROJECTS_ENDPOINT, { params });
  return response.data.data;
}

export async function getProject(projectId: ProjectId): Promise<ProjectApiModel> {
  const response = await apiClient.get<ProjectDetailApiResponse>(
    `${PROJECTS_ENDPOINT}/${encodeURIComponent(projectId)}`
  );
  const result = response.data.data;

  if ('projectId' in result) {
    return result;
  }

  return result.data;
}

export async function createProject(
  input: CreateProjectRequest
): Promise<CreateProjectResponse['data']> {
  const response = await apiClient.post<CreateProjectResponse>(PROJECTS_ENDPOINT, input);
  return response.data.data;
}

export async function updateProject(
  projectId: ProjectId,
  input: UpdateProjectRequest
): Promise<void> {
  await apiClient.patch(`${PROJECTS_ENDPOINT}/${encodeURIComponent(projectId)}`, input);
}

export async function deleteProject(projectId: ProjectId): Promise<DeleteProjectResponse['data']> {
  const response = await apiClient.delete<DeleteProjectResponse>(
    `${PROJECTS_ENDPOINT}/${encodeURIComponent(projectId)}`
  );
  return response.data.data;
}

export async function toggleSaveProject(
  projectId: ProjectId
): Promise<ToggleSaveProjectResponse['data']> {
  const response = await apiClient.post<ToggleSaveProjectResponse>(
    `${PROJECTS_ENDPOINT}/${encodeURIComponent(projectId)}/save`
  );
  return response.data.data;
}

export async function uploadProjectReference({
  file,
  projectId,
}: UploadProjectReferenceInput): Promise<ProjectFileUploadResponse['data']> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('fileable_type', 'project');
  formData.append('fileable_id', projectId);

  const response = await apiClient.post<ProjectFileUploadResponse>(
    '/api/v1/files/upload',
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );
  return response.data.data;
}

export function getProjectApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ProjectApiError>(error)) {
    const response = error.response?.data;
    const validationMessage = response?.errors?.map((item) => item.message).join(' ');

    return (
      validationMessage ||
      response?.error ||
      response?.message ||
      error.message ||
      'Unable to complete the project request. Please try again.'
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Unable to complete the project request. Please try again.';
}
