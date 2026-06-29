'use client';

import React, { useState, useEffect, Suspense } from 'react';
import JobDetailsPage from './_components/JobDetailsPage';
import BtnProposals from '../../../components/BtnProposals';
import Abouttheclient from '../../../components/Abouttheclient';
import Budgets from './_components/Budgets';
import DesignStyle from './_components/DesignStyle';
import SkillRequirement from './_components/SkillRequirement';
import ReferenceImage from './_components/ReferenceImage';
import ProposalPopUp from '../send-proposal/_components/ProposalPopUp';
import DeleteConfirmationModal from '../../fashion-designers/my-projects/components/DeleteConfirmationModal';
import { useDisclosure } from '@heroui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import PageContainer from '../../../components/layout/PageContainer';
import { useAppStore } from '@/store';

const JobDetailsPageContent = () => {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isWithdrawModalOpen,
    onOpen: onWithdrawModalOpen,
    onOpenChange: onWithdrawModalOpenChange
  } = useDisclosure();

  const searchParams = useSearchParams();
  const jobId = searchParams.get('id');

  const { savedJobs, toggleSaveJob, activeProposals, clearProposals } = useAppStore();

  const proposalSubmitted = !!activeProposals[jobId] || (jobId === null && useAppStore.getState().proposalActive);
  const isSaved = savedJobs.includes(jobId);

  const handleBookmark = () => {
    if (!jobId) return;
    toggleSaveJob(jobId);
  };

  const handleSubmitProposal = () => {
    // Navigate to send proposal page with ID
    router.push(`/artist-page/send-proposal?id=${jobId}`);
  };

  const confirmWithdrawProposal = () => {
    if (jobId) {
      // In a real app we'd have a removeProposal(jobId)
      // For now let's just clear or mock removal if possible
      // Since proposalSlice doesn't have removeProposal yet, I'll add it or just use set directly
      useAppStore.setState((state) => {
        const newProposals = { ...state.activeProposals };
        delete newProposals[jobId];
        return { activeProposals: newProposals };
      });
    } else {
      useAppStore.setState({ proposalActive: false });
    }
  };

  const handleWithdrawProposal = () => {
    onWithdrawModalOpen();
  };

  const handleViewProposal = () => {
    // Navigate to proposal-active page
    router.push('/artist-page/proposal-active');
  };

  return (
    <PageContainer className="pb-20" withTopSpacing>
      {/* Desktop Header */}
      <section className="hidden lg:block lg:mb-[29.34px] lg:mt-4">
        <div className="border-b-2 text-left w-full">
          <h1 className="font-bold text-2xl">Job Details</h1>
        </div>
      </section>

      <div className='grid grid-cols-10 gap-8 mt-4'>
        {/* Job Details (70%) */}
        <div className='lg:col-span-7 col-span-10'>
          <JobDetailsPage
            proposalSubmitted={proposalSubmitted}
            handleSubmitProposal={handleSubmitProposal}
            handleViewProposal={handleViewProposal}
            handleWithdrawProposal={handleWithdrawProposal}
            jobId={jobId}
            isSaved={isSaved}
            handleBookmark={handleBookmark}
          />
          <div className='hidden w-full max-w-full mb-8'>
            <BtnProposals
              handleSubmitProposal={handleSubmitProposal}
              handleViewProposal={handleViewProposal}
              handleWithdrawProposal={handleWithdrawProposal}
              handleSave={handleBookmark}
              proposalSubmitted={proposalSubmitted}
              isSaved={isSaved}
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              saveText={proposalSubmitted ? 'Withdraw Proposal' : (isSaved ? 'Saved' : 'Save Job')}
              sendText={proposalSubmitted ? 'View Proposal' : 'Send Proposal'}
            />
          </div>
          <div className='hidden lg:flex lg:flex-col mt-6'>
            <ReferenceImage jobId={jobId} />
          </div>
          <div className='hidden lg:flex lg:flex-col mt-6'>
            <DesignStyle />
          </div>
          <div className='hidden lg:flex lg:flex-col mt-6'>
            <SkillRequirement />
          </div>
          <div className='hidden lg:flex lg:flex-col mt-6'>
            <Budgets />
          </div>
        </div>

        {/* Button Proposals (30%) */}
        <div className='col-span-10 lg:col-span-3 flex flex-col'>
          <div className='lg:flex hidden lg:mb-[30px] mb-3'>
            <BtnProposals
              handleSubmitProposal={handleSubmitProposal}
              handleViewProposal={handleViewProposal}
              handleWithdrawProposal={handleWithdrawProposal}
              handleSave={handleBookmark}
              proposalSubmitted={proposalSubmitted}
              isSaved={isSaved}
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              saveText={proposalSubmitted ? 'Withdraw Proposal' : (isSaved ? 'Saved' : 'Save Job')}
              sendText={proposalSubmitted ? 'View Proposal' : 'Send Proposal'}
            />
            <ProposalPopUp isOpen={isOpen} onOpenChange={onOpenChange} />
          </div>
          <div className='lg:mt-[30px] mt-3'>
            <Abouttheclient />
          </div>
        </div>

        <DeleteConfirmationModal
          isOpen={isWithdrawModalOpen}
          onOpenChange={onWithdrawModalOpenChange}
          onConfirm={confirmWithdrawProposal}
          title="Withdraw Proposal?"
          message="Are you sure you want to withdraw your proposal? This action cannot be undone."
          confirmButtonText="Yes"
        />
      </div>
    </PageContainer>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <JobDetailsPageContent />
    </Suspense>
  );
};

export default Page;
