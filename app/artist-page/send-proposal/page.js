'use client';

import React, { Suspense } from 'react';
import BtnProposals from '../../../components/BtnProposals';
import Abouttheclient from '../../../components/Abouttheclient';
import SendProposal from './_components/SendProposal';
import ProposalPopUp from './_components/ProposalPopUp';
import { useSearchParams, useRouter } from 'next/navigation';
import { useDisclosure } from '@heroui/react';

const SendProposalPageContent = () => {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const searchParams = useSearchParams();
  const isEditMode = searchParams.get('edit') === 'true';
  const jobId = searchParams.get('id');

  const handleSubmitProposal = () => {
    // Save to localStorage and open modal
    if (jobId) {
      const activeProposals = JSON.parse(localStorage.getItem('activeProposals') || '{}');
      activeProposals[jobId] = true;
      localStorage.setItem('activeProposals', JSON.stringify(activeProposals));
    } else {
      localStorage.setItem('proposalActive', 'true');
    }
    onOpen();
  };

  const handleUpdateProposal = () => {
    // Logic for updating proposal
    console.log("Updating proposal...");
    router.push('/artist-page/my-proposals');
  };

  const handleCancel = () => {
    router.push('/artist-page/project-page');
  };

  const handleCancelEdit = () => {
    router.push('/artist-page/my-proposals');
  };

  return (
    <div className='grid grid-cols-10 gap-2'>
      {/* Main Content */}
      <div className='lg:col-span-7 col-span-10'>
        <SendProposal
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
          handleSubmitProposal={isEditMode ? handleUpdateProposal : handleSubmitProposal}
          jobId={jobId}
          isEditMode={isEditMode}
          handleCancelEdit={handleCancelEdit}
        />
      </div>
      {/* Sidebar */}
      <div className='col-span-10 lg:col-span-3 lg:mt-24 flex flex-col'>
        <div className='hidden lg:flex mb-2 lg:mb-4'>
          <BtnProposals
            handleSubmitProposal={isEditMode ? handleUpdateProposal : handleSubmitProposal}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            sendText={isEditMode ? "Update" : "Send Proposal"}
            saveText={isEditMode ? "Cancel" : "Cancel"}
            handleSave={isEditMode ? handleCancelEdit : handleCancel}
            showSaveIcon={false}
          />
          <ProposalPopUp isOpen={isOpen} onOpenChange={onOpenChange} />
        </div>

        <div className='lg:flex mt-2 lg:mt-4 lg:mx-0 mx-auto w-full'>
          <Abouttheclient />
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SendProposalPageContent />
    </Suspense>
  );
};

export default Page;
