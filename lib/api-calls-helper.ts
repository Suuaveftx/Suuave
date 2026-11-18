import { apiClient } from './axios';
import {
  FileUploadType,
  GeneralProfileUpdatePayload,
  ProfileInfoResponse,
  ProfileUpdateRequestType,
  ResponseData,
} from './common-app-types';

export async function getProfile(): Promise<ResponseData<ProfileInfoResponse>> {
  const res = await apiClient.get<ResponseData<ProfileInfoResponse>>('/profile');
  return res.data;
}

export async function uploadProfileFile({
  file,
  fileableType,
  fileableId,
}: {
  file: File;
  fileableType: string;
  fileableId: string;
}): Promise<FileUploadType> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('fileableType', fileableType);
  formData.append('fileableId', fileableId);

  const res = await apiClient.post<FileUploadType | ResponseData<FileUploadType>>(
    '/files/upload',
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
  const uploadedFile = 'data' in res.data ? res.data.data : res.data;
  if (!uploadedFile?.storage_url) {
    throw new Error('The upload response did not include a file URL.');
  }
  return uploadedFile;
}

export async function updateProfile(
  payload: ProfileUpdateRequestType
): Promise<ResponseData<ProfileInfoResponse>> {
  const res = await apiClient.patch<ResponseData<ProfileInfoResponse>>(
    '/profile/onboarding',
    payload
  );
  return res.data;
}

export async function updateGeneralProfile(
  payload: GeneralProfileUpdatePayload
): Promise<ResponseData<ProfileInfoResponse>> {
  const res = await apiClient.patch<ResponseData<ProfileInfoResponse>>(
    '/profile',
    payload
  );
  return res.data;
}
