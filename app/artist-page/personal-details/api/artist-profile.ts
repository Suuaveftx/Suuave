import { apiClient } from '@/lib/axios';
import {
  ArtistCertificationPayload,
  ArtistProfileInfoResponse,
  FileUploadType,
  GeneralProfileUpdatePayload,
  ProfileUpdateRequestType,
  ResponseData,
} from '../types/profile-types';

export async function getArtistProfile(): Promise<
  ResponseData<ArtistProfileInfoResponse>
> {
  const res = await apiClient.get<ResponseData<ArtistProfileInfoResponse>>('/profile');
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

export async function updateArtistProfile(
  payload: ProfileUpdateRequestType
): Promise<ResponseData<ArtistProfileInfoResponse>> {
  const res = await apiClient.patch<ResponseData<ArtistProfileInfoResponse>>(
    '/profile/onboarding',
    payload
  );
  return res.data;
}

export async function updateGeneralArtistProfile(
  payload: GeneralProfileUpdatePayload
): Promise<ResponseData<ArtistProfileInfoResponse>> {
  const res = await apiClient.patch<ResponseData<ArtistProfileInfoResponse>>(
    '/profile',
    payload
  );
  return res.data;
}

export async function deleteArtistCertification(id: string): Promise<void> {
  await apiClient.delete(`/profile/certifications/${encodeURIComponent(id)}`);
}

export async function addArtistCertification(
  payload: ArtistCertificationPayload
): Promise<ResponseData<ArtistProfileInfoResponse>> {
  const res = await apiClient.post<ResponseData<ArtistProfileInfoResponse>>(
    `/profile/certifications`,
    payload
  );
  return res.data;
}
