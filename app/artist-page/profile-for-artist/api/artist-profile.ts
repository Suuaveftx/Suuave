import { apiClient } from '@/lib/axios';
import { ArtistProfileInfoResponse } from '../types/profile-types';


export async function getArtistProfile(): Promise<ArtistProfileInfoResponse> {
  const res = await apiClient.get<ArtistProfileInfoResponse>('/profile');
  return res.data;
}