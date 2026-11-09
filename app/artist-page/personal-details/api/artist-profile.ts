import { apiClient } from '@/lib/axios';
import {
  ArtistCertificationPayload,
  ArtistProfileInfoResponse,
  FileUploadType,
  GeneralProfileUpdatePayload,
  ProfileUpdateRequestType,
  ResponseData,
  UserDesignsType,
  UserReviewsType,
  WorkSamplePayloadType,
  WorkSamplesResponseType,
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

export async function getUserDesigns(
  page = 1
): Promise<ResponseData<UserDesignsType>> {
  const res = await apiClient.get<ResponseData<UserDesignsType>>('/profile/designs', {
    params: { page },
  });
  return res.data;
}

export async function getUserReviews(): Promise<ResponseData<UserReviewsType>> {
  const res = await apiClient.get<ResponseData<UserReviewsType>>('/reviews');
  return res.data;
}

export async function getWorkSamples(): Promise<ResponseData<WorkSamplesResponseType>> {
  const res = await apiClient.get<ResponseData<WorkSamplesResponseType>>(
    '/profile/work-samples'
  );
  return res.data;
}

export async function addWorkSample(
  payload: WorkSamplePayloadType
): Promise<ResponseData<WorkSamplesResponseType>> {
  const res = await apiClient.post<ResponseData<WorkSamplesResponseType>>(
    `/profile/work-samples`,
    payload
  );
  return res.data;
}

export async function updateWorkSample(
  payload: WorkSamplePayloadType
): Promise<ResponseData<WorkSamplesResponseType>> {
  const res = await apiClient.patch<ResponseData<WorkSamplesResponseType>>(
    `/profile/work-samples`,
    payload
  );
  return res.data;
}

export async function deleteWorkSample(id: string): Promise<void> {
  const res = await apiClient.delete<void>(
    `/profile/work-samples/${encodeURIComponent(id)}`
  );
  return res.data;
}
