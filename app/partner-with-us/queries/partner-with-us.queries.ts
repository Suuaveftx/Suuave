import { useMutation } from '@tanstack/react-query';
import {
  submitPartnerInquiry,
  type PartnerInquiryInput,
} from '../api/partner-with-us';

export function useSubmitPartnerInquiry() {
  return useMutation({
    mutationFn: (input: PartnerInquiryInput) => submitPartnerInquiry(input),
  });
}