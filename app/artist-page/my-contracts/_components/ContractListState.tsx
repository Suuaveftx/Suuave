'use client';
import React from 'react';
import { Button, Spinner } from '@heroui/react';

type Props =
  | { type: 'loading' }
  | { type: 'error'; message?: string; onRetry?: () => void };

export default function ContractListState(props: Props) {
  if (props.type === 'loading') {
    return (
      <div className="flex justify-center py-16" role="status" aria-label="Loading contracts">
        <Spinner color="primary" />
      </div>
    );
  }
  return (
    <div className="text-center py-12" role="alert">
      <p className="text-gray-600 mb-4">
        {props.message || 'We could not load your contracts.'}
      </p>
      {props.onRetry && (
        <Button radius="full" variant="bordered" onPress={props.onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
