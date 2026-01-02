'use client';

import React, { useState, useEffect, Suspense } from 'react';
import JobDetailsPage from './_components/JobDetailsPage';
import BtnProposals from '../../../components/BtnProposals';
import Abouttheclient from '../../../components/Abouttheclient';
import Budgets from './_components/Budgets';
import DesignStyle from './_components/DesignStyle';
import SkillRequirement from './_components/SkillRequirement';
<<<<<<< HEAD
import ReferenceImage from './_components/ReferenceImage';
=======
>>>>>>> development
import ProposalPopUp from '../send-proposal/_components/ProposalPopUp';
import { useDisclosure } from '@heroui/react';
import { useRouter, useSearchParams } from 'next/navigation';

const JobDetailsPageContent = () => {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [proposalSubmitted, setProposalSubmitted] = useState(false);
  const searchParams = useSearchParams();
  const jobId = searchParams.get('id');

  // Check localStorage on mount or when jobId changes
  useEffect(() => {
    if (jobId) {
      const activeProposals = JSON.parse(localStorage.getItem('activeProposals') || '{}');
      setProposalSubmitted(!!activeProposals[jobId]);
    } else {
      // Fallback for direct access without ID (optional)
      const isProposalActive = localStorage.getItem('proposalActive');
      if (isProposalActive === 'true') {
        setProposalSubmitted(true);
      }
    }
  }, [jobId]);

  const handleSubmitProposal = () => {
    // Navigate to send proposal page with ID
    router.push(`/artist-page/send-proposal?id=${jobId}`);
  };

  const handleWithdrawProposal = () => {
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
<<<<<<< HEAD
          jobId={jobId}
=======
>>>>>>> development
        />
        <div className='hidden w-screen max-w-[100%] mb-8'>
          <BtnProposals
            handleSubmitProposal={handleSubmitProposal}
            handleViewProposal={handleViewProposal}
            handleWithdrawProposal={handleWithdrawProposal}
            proposalSubmitted={proposalSubmitted}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            saveText={proposalSubmitted ? 'Withdraw Proposal' : 'Save Job'}
            sendText={proposalSubmitted ? 'View Proposal' : 'Send Proposal'}
          />
        </div>
        <div className='hidden lg:flex lg:flex-col'>
<<<<<<< HEAD
          <ReferenceImage jobId={jobId} />
        </div>
        <div className='hidden lg:flex lg:flex-col'>
=======
>>>>>>> development
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
            proposalSubmitted={proposalSubmitted}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            saveText={proposalSubmitted ? 'Withdraw Proposal' : 'Save Job'}
            sendText={proposalSubmitted ? 'View Proposal' : 'Send Proposal'}
          />
          <ProposalPopUp isOpen={isOpen} onOpenChange={onOpenChange} />
        </div>
        <div className='lg:mt-[30px] mt-3'>
          <Abouttheclient />
        </div>
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
