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
    router.push(`/artist-page/send-proposal?id=${jobId}`);
  };

  const confirmWithdrawProposal = () => {
    if (jobId) {
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
    router.push('/artist-page/proposal-active');
  };

  return (
    <div className="lg:bg-transparent">
      {/* ─── MOBILE PIXEL PERFECT LAYOUT ─── */}
      <div className="block lg:hidden w-full overflow-x-hidden relative pb-[84px] min-h-screen px-4 -mt-[80px] pt-[88px]">
        {/* Page heading */}
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-[28px] font-bold text-[#222222]">Job Details</h1>
        </div>

        {/* Job card + content */}
        <div className="flex flex-col gap-4 w-full pt-2">
          <JobDetailsPage
            proposalSubmitted={proposalSubmitted}
            handleSubmitProposal={handleSubmitProposal}
            handleViewProposal={handleViewProposal}
            handleWithdrawProposal={handleWithdrawProposal}
            jobId={jobId}
            isSaved={isSaved}
            handleBookmark={handleBookmark}
          />
          <ReferenceImage jobId={jobId} />
          <DesignStyle />
          <SkillRequirement />
          <Budgets />
          <Abouttheclient />
        </div>

        {/* Sticky CTA - Figma matched */}
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-[#ECECEC] px-4 py-4 z-50 flex items-center gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          {proposalSubmitted ? (
            <>
              <button
                onClick={handleWithdrawProposal}
                className="flex-1 flex items-center justify-center border-2 border-[#146C94] text-[#146C94] font-bold text-[15px] py-3.5 rounded-full bg-white h-[52px]"
              >
                Withdraw Proposal
              </button>
              <button
                onClick={handleViewProposal}
                className="flex-1 flex items-center justify-center bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] text-[#035A7A] font-bold text-[15px] py-3.5 rounded-full shadow-[0_4px_14px_rgba(110,193,228,0.4)] h-[52px]"
              >
                View Proposal
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleBookmark}
                className="flex-1 flex items-center justify-center gap-2 border-2 border-[#035A7A] text-[#035A7A] font-bold text-[15px] py-3.5 rounded-full bg-white h-[52px]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill={isSaved ? "#035A7A" : "none"} viewBox="0 0 24 24" strokeWidth={2} stroke="#035A7A" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                </svg>
                {isSaved ? "Saved" : "Save Post"}
              </button>
              <button
                onClick={handleSubmitProposal}
                className="flex-1 flex items-center justify-center bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] text-[#035A7A] font-bold text-[15px] py-3.5 rounded-full shadow-[0_4px_14px_rgba(110,193,228,0.4)] h-[52px]"
              >
                Send Proposal
              </button>
            </>
          )}
        </div>
      </div>

      {/* ─── DESKTOP LEGACY LAYOUT ─── */}
      <div className="hidden lg:block">
        <PageContainer className="pb-20 pt-4 md:pt-7">
          <section className="lg:mb-[29.34px] lg:mt-4">
            <div className="border-b-2 text-left w-full">
              <h1 className="font-bold text-2xl">Job Details</h1>
            </div>
          </section>

          <div className='grid grid-cols-10 gap-8 mt-4 lg:mt-4'>
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
      </div>

    </div>
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
