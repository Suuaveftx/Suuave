import { FileUploadType, ResponseData } from '@/lib/common-app-types';
import { UserDesignsType } from '../../personal-details/types/profile-types';
import { apiClient } from '@/lib/axios';
import {
  PublishUserDesignsPayload,
  RelatedDesignsResponseType,
  SavedDesignsResponseType,
  StudioDesignsResponseType,
  UpdateUserDesignsPayload,
  UserDesignDetailsResponseType,
} from '../types/designs-integration-types';

const DESIGN_API_URL = '/designs/license';

export async function uploadDesignFile(
  file: File,
  fileableId: string
): Promise<FileUploadType> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('fileableType', 'design');
  formData.append('fileableId', fileableId);

  const res = await apiClient.post<FileUploadType | ResponseData<FileUploadType>>(
    '/files/upload',
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
  const uploadedFile = 'data' in res.data ? res.data.data : res.data;
  if (!uploadedFile?.id || !uploadedFile.storage_url) {
    throw new Error('The design upload response did not include a file ID and URL.');
  }
  return uploadedFile;
}

export async function getUserDesigns(): Promise<ResponseData<UserDesignsType>> {
  const res = await apiClient.get<ResponseData<UserDesignsType>>(DESIGN_API_URL);
  return res.data;
}

export async function getUserDesignDetails(
  id: string
): Promise<ResponseData<UserDesignDetailsResponseType>> {
  const res = await apiClient.get<ResponseData<UserDesignDetailsResponseType>>(
    `${DESIGN_API_URL}/${id}`
  );
  return res.data;
}

export async function getSavedDesigns({
  page = 1,
  limit = 12,
  search,
}: {
  page?: number;
  limit?: number;
  search?: string;
} = {}): Promise<ResponseData<SavedDesignsResponseType>> {
  const res = await apiClient.get<ResponseData<SavedDesignsResponseType>>(
    `${DESIGN_API_URL}/saved`,
    { params: { page, limit, ...(search ? { search } : {}) } }
  );
  return res.data;
}

export async function getStudioDesigns({
  page = 1,
  limit = 12,
  search,
}: {
  page?: number;
  limit?: number;
  search?: string;
} = {}): Promise<ResponseData<StudioDesignsResponseType>> {
  const res = await apiClient.get<ResponseData<StudioDesignsResponseType>>(
    `${DESIGN_API_URL}/studio-page`,
    { params: { page, limit, ...(search ? { search } : {}) } }
  );
  return res.data;
}

export async function getRelatedDesigns(
  id: string
): Promise<ResponseData<RelatedDesignsResponseType>> {
  const res = await apiClient.get<ResponseData<RelatedDesignsResponseType>>(
    `${DESIGN_API_URL}/${id}/related`
  );
  return res.data;
}

export async function publishUserDesign({
  payload,
  id,
}: {
  payload: PublishUserDesignsPayload | { rights_confirmed: boolean };
  id?: string;
}): Promise<ResponseData<UserDesignDetailsResponseType>> {
  const res = await apiClient.post<ResponseData<UserDesignDetailsResponseType>>(
    id ? `${DESIGN_API_URL}/${id}/publish` : DESIGN_API_URL,
    payload
  );
  return res.data;
}

export async function saveDesignAsDraft(
  payload: PublishUserDesignsPayload
): Promise<ResponseData<UserDesignDetailsResponseType>> {
  const res = await apiClient.post<ResponseData<UserDesignDetailsResponseType>>(
    `${DESIGN_API_URL}/draft`,
    payload
  );
  return res.data;
}

export async function saveUserDesign(
  id: string
): Promise<ResponseData<UserDesignDetailsResponseType>> {
  const res = await apiClient.post<ResponseData<UserDesignDetailsResponseType>>(
    `${DESIGN_API_URL}/${id}/save`
  );
  return res.data;
}

export async function updateUserDesign({
  id,
  payload,
}: {
  id: string;
  payload: UpdateUserDesignsPayload;
}): Promise<ResponseData<UserDesignDetailsResponseType>> {
  const res = await apiClient.patch<ResponseData<UserDesignDetailsResponseType>>(
    `${DESIGN_API_URL}/${id}`,
    payload
  );
  return res.data;
}

export async function deleteUserDesign(id: string): Promise<ResponseData<null>> {
  const res = await apiClient.delete<ResponseData<null>>(`${DESIGN_API_URL}/${id}`);
  return res.data;
}

export async function unsaveUserDesign(id: string): Promise<ResponseData<null>> {
  const res = await apiClient.delete<ResponseData<null>>(`${DESIGN_API_URL}/${id}/save`);
  return res.data;
}
