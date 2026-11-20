'use client';
import React from 'react';
import AcceptModal from '../../../../components/AcceptModal';
import DeclineModal from '../../../../components/DeclineModal';
import { useAcceptContract, useDeclineContract } from '../queries/artist-contracts.queries';
import { getContractErrorMessage } from '../utils/contract-formatters';

type Props = {
  contractId: string;
  trigger?: React.ReactElement;
  onSuccess?: () => void;
};

/** Accept modal bound to one pending contract. */
export function AcceptOffer({ contractId, trigger, onSuccess }: Props) {
  const accept = useAcceptContract();
  return (
    <AcceptModal
      trigger={trigger}
      onConfirm={() => accept.mutateAsync(contractId)}
      isLoading={accept.isPending}
      errorMessage={accept.isError ? getContractErrorMessage(accept.error) : undefined}
      onSuccess={onSuccess}
    />
  );
}

/** Decline modal bound to one pending contract. */
export function DeclineOffer({ contractId, trigger, onSuccess }: Props) {
  const decline = useDeclineContract();
  return (
    <DeclineModal
      trigger={trigger}
      onConfirm={(reason: string) =>
        decline.mutateAsync({ contractId, ...(reason ? { reason } : {}) })
      }
      isLoading={decline.isPending}
      errorMessage={decline.isError ? getContractErrorMessage(decline.error) : undefined}
      onSuccess={onSuccess}
    />
  );
}
