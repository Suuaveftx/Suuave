import { useQuery } from '@tanstack/react-query';
import useMutationWithInvalidation from '@/lib/api-integration-helper';
import {
  acceptPendingContract,
  approveContractExtension,
  rejectContractExtension,
  declinePendingContract,
  getCompletedContract,
  getOngoingContract,
  getPendingContract,
  listAllCompletedContracts,
  listAllOngoingContracts,
  listAllPendingContracts,
  reportContract,
  requestContractExtension,
  submitContractWork,
} from '../api/artist-contracts';
import type {
  ContractId,
  DeclineOfferRequest,
  ReportContractRequest,
  RequestExtensionRequest,
  SubmitContractRequest,
} from '../types/contract-types';

export const artistContractKeys = {
  all: ['artist-contracts'] as const,
  lists: () => [...artistContractKeys.all, 'list'] as const,
  list: (status: 'pending' | 'ongoing' | 'completed') =>
    [...artistContractKeys.lists(), status] as const,
  details: () => [...artistContractKeys.all, 'detail'] as const,
  detail: (status: 'pending' | 'ongoing' | 'completed', id: ContractId) =>
    [...artistContractKeys.details(), status, id] as const,
};

// ---------- Queries ----------

export const usePendingContracts = () =>
  useQuery({
    queryKey: artistContractKeys.list('pending'),
    queryFn: listAllPendingContracts,
  });

export const useOngoingContracts = () =>
  useQuery({
    queryKey: artistContractKeys.list('ongoing'),
    queryFn: listAllOngoingContracts,
  });

export const useCompletedContracts = () =>
  useQuery({
    queryKey: artistContractKeys.list('completed'),
    queryFn: listAllCompletedContracts,
  });

export const usePendingContract = (contractId: ContractId | null | undefined) =>
  useQuery({
    queryKey: artistContractKeys.detail('pending', contractId ?? ''),
    queryFn: () => getPendingContract(contractId as ContractId),
    enabled: Boolean(contractId),
  });

export const useOngoingContract = (contractId: ContractId | null | undefined) =>
  useQuery({
    queryKey: artistContractKeys.detail('ongoing', contractId ?? ''),
    queryFn: () => getOngoingContract(contractId as ContractId),
    enabled: Boolean(contractId),
  });

export const useCompletedContract = (contractId: ContractId | null | undefined) =>
  useQuery({
    queryKey: artistContractKeys.detail('completed', contractId ?? ''),
    queryFn: () => getCompletedContract(contractId as ContractId),
    enabled: Boolean(contractId),
  });

// ---------- Mutations ----------

// Accepting or declining moves a contract between lists, so every contract list is refreshed.
export function useAcceptContract() {
  return useMutationWithInvalidation(acceptPendingContract, artistContractKeys.all);
}

export function useDeclineContract() {
  return useMutationWithInvalidation(
    ({ contractId, ...input }: { contractId: ContractId } & DeclineOfferRequest) =>
      declinePendingContract(contractId, input),
    artistContractKeys.all
  );
}

export function useRequestExtension() {
  return useMutationWithInvalidation(
    ({ contractId, ...input }: { contractId: ContractId } & RequestExtensionRequest) =>
      requestContractExtension(contractId, input),
    artistContractKeys.all
  );
}

export function useApproveExtension() {
  return useMutationWithInvalidation(approveContractExtension, artistContractKeys.all);
}

export function useRejectExtension() {
  return useMutationWithInvalidation(rejectContractExtension, artistContractKeys.all);
}

export function useReportContract() {
  return useMutationWithInvalidation(
    ({ contractId, ...input }: { contractId: ContractId } & ReportContractRequest) =>
      reportContract(contractId, input),
    artistContractKeys.all
  );
}

export function useSubmitContractWork() {
  return useMutationWithInvalidation(
    ({ contractId, ...input }: { contractId: ContractId } & SubmitContractRequest) =>
      submitContractWork(contractId, input),
    artistContractKeys.all
  );
}
