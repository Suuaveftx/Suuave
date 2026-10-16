'use client';

import React, { Suspense } from 'react';
import BtnProposals from '../../../components/BtnProposals';
import Abouttheclient from '../../../components/Abouttheclient';
import SendProposal from './_components/SendProposal';
import ProposalPopUp from './_components/ProposalPopUp';
import { useSearchParams, useRouter } from 'next/navigation';
import { useDisclosure } from '@heroui/react';

import { useAppStore } from '@/store';
import PageContainer from '../../../components/layout/PageContainer';

const SendProposalPageContent = () => {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const searchParams = useSearchParams();
  const isEditMode = searchParams.get('edit') === 'true';
  const jobId = searchParams.get('id');

  const { addProposal } = useAppStore();

  const handleSubmitProposal = () => {
    // Save to Zustand and open modal
    const proposalData = {
      timestamp: new Date().toISOString(),
    };

    addProposal(jobId || 'default', proposalData);
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
    <PageContainer className="pb-20 pt-0 lg:pt-0 font-satoshi">
      {/* Desktop Header */}
      <section className="hidden lg:block lg:mb-[29.34px] lg:mt-4">
        <div className="border-b-2 text-left w-full">
          <h1 className="font-bold text-2xl">{isEditMode ? "Proposal Details" : "Send Proposal"}</h1>
        </div>
      </section>

      {/* Mobile Header - outside cards */}
      <div className="flex items-center gap-2 mb-4 lg:hidden">
        <h1 className="text-[28px] font-bold text-[#222222]">{isEditMode ? "Proposal Details" : "Send Proposal"}</h1>
      </div>

      <div className='bg-white rounded-3xl px-2 py-6 lg:p-0 lg:bg-transparent lg:rounded-none grid grid-cols-1 lg:grid-cols-10 gap-x-8 gap-y-4 pt-4 pb-4 lg:pb-0 mt-2 mb-32 lg:mb-10 shadow-sm lg:shadow-none'>
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
        <div className='col-span-10 lg:col-span-3 flex flex-col'>
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
    </PageContainer>
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
