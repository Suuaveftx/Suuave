import axios from 'axios';
import { apiClient } from '@/lib/axios';

export type PartnerInquiryInput = {
  name: string;
  email: string;
  message: string;
};

export type PartnerInquiryResponse = {
  message: string;
};

type PartnerInquiryErrorResponse = {
  message?: string;
};

export async function submitPartnerInquiry(
  input: PartnerInquiryInput
): Promise<PartnerInquiryResponse> {
  const response = await apiClient.post<PartnerInquiryResponse>('/partner-with-us', input);
  return response.data;
}

export function getPartnerInquiryErrorMessage(error: unknown): string {
  if (axios.isAxiosError<PartnerInquiryErrorResponse>(error)) {
    return (
      error.response?.data?.message ??
      error.message ??
      'Unable to send your message. Please try again.'
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Unable to send your message. Please try again.';
}