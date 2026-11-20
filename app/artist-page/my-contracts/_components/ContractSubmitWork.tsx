'use client';
import React from 'react';
import SubmitWorkModal from '../../../fashion-designers/contracts/components/SubmitWorkModal';
import { uploadContractFile } from '../api/artist-contracts';
import { useSubmitContractWork } from '../queries/artist-contracts.queries';
import { getContractErrorMessage } from '../utils/contract-formatters';

type Props = {
  contractId: string;
  trigger: React.ReactElement;
  isResubmit?: boolean;
};

/** Work-submission modal bound to one ongoing contract: uploads the files, then submits their URLs. */
export default function SubmitWork({ contractId, trigger, isResubmit }: Props) {
  const submit = useSubmitContractWork();
  const [uploading, setUploading] = React.useState(false);
  const [uploadError, setUploadError] = React.useState<string | undefined>();

  const handleSubmit = async ({ files, message }: { files: File[]; message: string }) => {
    setUploadError(undefined);
    setUploading(true);
    let urls: string[];
    try {
      urls = await Promise.all(files.map((file) => uploadContractFile(file, contractId)));
    } catch (error) {
      setUploadError(getContractErrorMessage(error, 'We could not upload your files.'));
      throw error;
    } finally {
      setUploading(false);
    }
    await submit.mutateAsync({ contractId, files: urls, ...(message ? { note: message } : {}) });
  };

  return (
    <SubmitWorkModal
      trigger={trigger}
      isResubmit={isResubmit}
      onSubmit={handleSubmit}
      isSubmitting={uploading || submit.isPending}
      errorMessage={uploadError ?? (submit.isError ? getContractErrorMessage(submit.error) : undefined)}
    />
  );
}
