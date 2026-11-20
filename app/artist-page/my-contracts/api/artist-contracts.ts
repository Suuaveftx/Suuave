import { apiClient } from '@/lib/axios';
import type {
  ApiResponse,
  CompletedContractDetail,
  CompletedContractListItem,
  ContractActionResponse,
  ContractId,
  ContractList,
  ContractListParams,
  DeclineOfferRequest,
  OngoingContractDetail,
  OngoingContractListItem,
  PendingContractDetail,
  PendingContractListItem,
  ReportContractRequest,
  RequestExtensionRequest,
  SubmitContractRequest,
} from '../types/contract-types';

const ARTIST_CONTRACTS = '/artist/contracts';
const MAX_PAGE_SIZE = 50; // matches the backend page-size cap used by /projects
const MAX_PAGES = 20; // safety cap

const enc = encodeURIComponent;

async function fetchList<T>(
  status: 'pending' | 'ongoing' | 'completed',
  params: ContractListParams = {}
): Promise<ContractList<T>> {
  const response = await apiClient.get<ApiResponse<ContractList<T>>>(
    `${ARTIST_CONTRACTS}/${status}`,
    { params }
  );
  return response.data.data;
}

// The tabs search, filter and paginate on the client, so they load every page up front.
async function fetchAllPages<T>(
  status: 'pending' | 'ongoing' | 'completed'
): Promise<ContractList<T>> {
  const first = await fetchList<T>(status, { page: 1, limit: MAX_PAGE_SIZE });
  const lastPage = Math.min(first.pagination.totalPages, MAX_PAGES);
  const rest = await Promise.all(
    Array.from({ length: Math.max(0, lastPage - 1) }, (_, i) =>
      fetchList<T>(status, { page: i + 2, limit: MAX_PAGE_SIZE })
    )
  );
  const contracts = [first, ...rest].flatMap((page) => page.contracts);
  return {
    contracts,
    pagination: {
      ...first.pagination,
      currentPage: 1,
      limit: Math.max(1, contracts.length),
      totalPages: 1,
    },
  };
}

// ---------- Pending ----------

export const listPendingContracts = (params?: ContractListParams) =>
  fetchList<PendingContractListItem>('pending', params);

export const listAllPendingContracts = () =>
  fetchAllPages<PendingContractListItem>('pending');

export async function getPendingContract(
  contractId: ContractId
): Promise<PendingContractDetail> {
  const response = await apiClient.get<ApiResponse<PendingContractDetail>>(
    `${ARTIST_CONTRACTS}/pending/${enc(contractId)}`
  );
  return response.data.data;
}

export async function acceptPendingContract(
  contractId: ContractId
): Promise<ContractActionResponse> {
  const response = await apiClient.patch<ContractActionResponse>(
    `${ARTIST_CONTRACTS}/pending/${enc(contractId)}/accept`
  );
  return response.data;
}

export async function declinePendingContract(
  contractId: ContractId,
  input: DeclineOfferRequest = {}
): Promise<ContractActionResponse> {
  const response = await apiClient.patch<ContractActionResponse>(
    `${ARTIST_CONTRACTS}/pending/${enc(contractId)}/decline`,
    input
  );
  return response.data;
}

// ---------- Ongoing ----------

export const listOngoingContracts = (params?: ContractListParams) =>
  fetchList<OngoingContractListItem>('ongoing', params);

export const listAllOngoingContracts = () =>
  fetchAllPages<OngoingContractListItem>('ongoing');

export async function getOngoingContract(
  contractId: ContractId
): Promise<OngoingContractDetail> {
  const response = await apiClient.get<ApiResponse<OngoingContractDetail>>(
    `${ARTIST_CONTRACTS}/ongoing/${enc(contractId)}`
  );
  return response.data.data;
}

export async function requestContractExtension(
  contractId: ContractId,
  input: RequestExtensionRequest
): Promise<ContractActionResponse> {
  const response = await apiClient.post<ContractActionResponse>(
    `${ARTIST_CONTRACTS}/ongoing/${enc(contractId)}/extension`,
    input
  );
  return response.data;
}

export async function reportContract(
  contractId: ContractId,
  input: ReportContractRequest
): Promise<ContractActionResponse> {
  const response = await apiClient.post<ContractActionResponse>(
    `${ARTIST_CONTRACTS}/ongoing/${enc(contractId)}/report`,
    input
  );
  return response.data;
}

export async function submitContractWork(
  contractId: ContractId,
  input: SubmitContractRequest
): Promise<ContractActionResponse> {
  const response = await apiClient.post<ContractActionResponse>(
    `${ARTIST_CONTRACTS}/ongoing/${enc(contractId)}/submit`,
    input
  );
  return response.data;
}

export async function approveContractExtension(
  contractId: ContractId
): Promise<ContractActionResponse> {
  const response = await apiClient.patch<ContractActionResponse>(
    `${ARTIST_CONTRACTS}/ongoing/${enc(contractId)}/approve-extension`
  );
  return response.data;
}

export async function rejectContractExtension(
  contractId: ContractId
): Promise<ContractActionResponse> {
  const response = await apiClient.patch<ContractActionResponse>(
    `${ARTIST_CONTRACTS}/ongoing/${enc(contractId)}/reject-extension`
  );
  return response.data;
}

/**
 * Uploads one deliverable and returns its storage URL. `fileableType: 'contract'` is an assumption:
 * the API doc does not list the allowed fileableType values for POST /files/upload.
 */
export async function uploadContractFile(file: File, contractId: ContractId): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('fileableType', 'contract');
  formData.append('fileableId', contractId);

  const response = await apiClient.post<
    { storage_url?: string } | ApiResponse<{ storage_url?: string }>
  >('/files/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
  const body = response.data;
  const uploaded = 'data' in body ? body.data : body;
  if (!uploaded?.storage_url) {
    throw new Error('The upload response did not include a file URL.');
  }
  return uploaded.storage_url;
}

// ---------- Completed ----------

export const listCompletedContracts = (params?: ContractListParams) =>
  fetchList<CompletedContractListItem>('completed', params);

export const listAllCompletedContracts = () =>
  fetchAllPages<CompletedContractListItem>('completed');

export async function getCompletedContract(
  contractId: ContractId
): Promise<CompletedContractDetail> {
  const response = await apiClient.get<ApiResponse<CompletedContractDetail>>(
    `${ARTIST_CONTRACTS}/completed/${enc(contractId)}`
  );
  return response.data.data;
}
