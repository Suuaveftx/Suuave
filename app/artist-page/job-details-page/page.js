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

const JobDetailsPageContent = () => {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isWithdrawModalOpen,
    onOpen: onWithdrawModalOpen,
    onOpenChange: onWithdrawModalOpenChange
  } = useDisclosure();

  const [proposalSubmitted, setProposalSubmitted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const searchParams = useSearchParams();
  const jobId = searchParams.get('id');

  // Check localStorage on mount or when jobId changes
  useEffect(() => {
    if (jobId) {
      const activeProposals = JSON.parse(localStorage.getItem('activeProposals') || '{}');
      setProposalSubmitted(!!activeProposals[jobId]);

      const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '{}');
      setIsSaved(!!savedJobs[jobId]);
    } else {
      // Fallback for direct access without ID (optional)
      const isProposalActive = localStorage.getItem('proposalActive');
      if (isProposalActive === 'true') {
        setProposalSubmitted(true);
      }
    }
  }, [jobId]);

  const handleBookmark = () => {
    if (!jobId) return;

    const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '{}');
    const newSavedStatus = !isSaved;

    if (newSavedStatus) {
      savedJobs[jobId] = true;
    } else {
      delete savedJobs[jobId];
    }

    localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
    setIsSaved(newSavedStatus);
  };

  const handleSubmitProposal = () => {
    // Navigate to send proposal page with ID
    router.push(`/artist-page/send-proposal?id=${jobId}`);
  };

  const confirmWithdrawProposal = () => {
    if (jobId) {
      const activeProposals = JSON.parse(localStorage.getItem('activeProposals') || '{}');
      delete activeProposals[jobId];
      localStorage.setItem('activeProposals', JSON.stringify(activeProposals));
      setProposalSubmitted(false);
    } else {
      localStorage.removeItem('proposalActive');
      setProposalSubmitted(false);
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
    <div className='grid grid-cols-10'>
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
        <div className='hidden w-screen max-w-[100%] mb-8'>
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
        <div className='hidden lg:flex lg:flex-col'>
          <ReferenceImage jobId={jobId} />
        </div>
        <div className='hidden lg:flex lg:flex-col'>
          <DesignStyle />
        </div>
        <div className='hidden lg:flex lg:flex-col'>
          <SkillRequirement />
        </div>
        <div className='hidden lg:flex lg:flex-col'>
          <Budgets />
        </div>
      </div>

      {/* Button Proposals (30%) */}
      <div className='col-span-10 lg:col-span-3 lg:mt-28 flex flex-col'>
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
