import { apiClient } from '@/lib/axios';
import {
  ArtistCertificationPayload,
  UserDesignsType,
  UserReviewsType,
  WorkSamplePayloadType,
  WorkSamplesResponseType,
} from '../types/profile-types';
import { ProfileInfoResponse, ResponseData } from '@/lib/common-app-types';

export async function deleteArtistCertification(id: string): Promise<void> {
  await apiClient.delete(`/profile/certifications/${encodeURIComponent(id)}`);
}

export async function addArtistCertification(
  payload: ArtistCertificationPayload
): Promise<ResponseData<ProfileInfoResponse>> {
  const res = await apiClient.post<ResponseData<ProfileInfoResponse>>(
    `/profile/certifications`,
    payload
  );
  return res.data;
}

export async function getArtistDesigns(page = 1): Promise<ResponseData<UserDesignsType>> {
  const res = await apiClient.get<ResponseData<UserDesignsType>>('/profile/designs', {
    params: { page },
  });
  return res.data;
}

export async function getArtistReviews(): Promise<ResponseData<UserReviewsType>> {
  const res = await apiClient.get<ResponseData<UserReviewsType>>('/reviews');
  return res.data;
}

export async function getWorkSamples(): Promise<ResponseData<WorkSamplesResponseType[]>> {
  const res = await apiClient.get<ResponseData<WorkSamplesResponseType[]>>(
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
