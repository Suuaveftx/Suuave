'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useDisclosure } from '@heroui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import PageContainer from '../../../components/layout/PageContainer';
import BtnProposals from '../../../components/BtnProposals';
import DeleteConfirmationModal from '../../fashion-designers/my-projects/components/DeleteConfirmationModal';
import JobDetailsPage from './_components/JobDetailsPage';
import Budgets from './_components/Budgets';
import SkillRequirement from './_components/SkillRequirement';
import DesignStyle from './_components/DesignStyle';
import ReferenceImage from './_components/ReferenceImage';
import AboutClient from './_components/AboutClient';
import {
  useProject,
  useToggleSaveProject,
} from '@/app/projects/queries/projects.queries';
import { getProjectApiErrorMessage } from '@/app/projects/api/projects';
import { useAppStore } from '@/store';
import { useProjectProposalState } from '@/app/projects/selectors/project-selectors';

const JobDetailsPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams.get('id');
  const projectQuery = useProject(projectId);
  const saveMutation = useToggleSaveProject();
  const { activeProposals, proposalActive } = useProjectProposalState();
  const {
    isOpen: isWithdrawModalOpen,
    onOpen: onWithdrawModalOpen,
    onOpenChange: onWithdrawModalOpenChange,
  } = useDisclosure();

  const project = projectQuery.data;
  const proposalSubmitted =
    Boolean(activeProposals[projectId]) || (!projectId && proposalActive);
  const isSaved = Boolean(project?.isSaved);

  const errorStatus = projectQuery.error?.response?.status;
  const isPermissionDenied = errorStatus === 401 || errorStatus === 403;
  const isNotFound = errorStatus === 404 || !projectId;
  const isUnavailable = errorStatus >= 500;

  const handleBookmark = () => {
    if (projectId && !saveMutation.isPending) saveMutation.mutate(projectId);
  };

  const handleSubmitProposal = () => {
    if (projectId) {
      router.push(`/artist-page/send-proposal?id=${encodeURIComponent(projectId)}`);
    }
  };

  const handleViewProposal = () => {
    router.push('/artist-page/proposal-active');
  };

  const handleWithdrawProposal = () => {
    onWithdrawModalOpen();
  };

  const confirmWithdrawProposal = () => {
    if (projectId) {
      useAppStore.setState((state) => {
        const nextProposals = { ...state.activeProposals };
        delete nextProposals[projectId];
        return { activeProposals: nextProposals };
      });
    } else {
      useAppStore.setState({ proposalActive: false });
    }
  };

  if (projectQuery.isPending && projectId) {
    return (
      <PageContainer className='pb-20 pt-6'>
        <div className='animate-pulse space-y-4' aria-label='Loading project details'>
          <div className='h-8 w-64 rounded bg-gray-200' />
          <div className='h-48 rounded-2xl bg-gray-200' />
          <div className='h-28 rounded-2xl bg-gray-200' />
        </div>
      </PageContainer>
    );
  }

  if (projectQuery.isError || !project) {
    const heading = isNotFound
      ? 'Project not found'
      : isPermissionDenied
        ? 'You do not have permission to view this project'
        : isUnavailable
          ? 'This project is temporarily unavailable'
          : 'We could not load this project';

    return (
      <PageContainer className='pb-20 pt-6'>
        <div className='rounded-2xl border border-[#EAEAEA] bg-white px-6 py-12 text-center'>
          <h1 className='text-xl font-bold text-[#222222]'>{heading}</h1>
          {projectQuery.error && (
            <p className='mt-2 text-sm text-gray-600'>
              {getProjectApiErrorMessage(projectQuery.error)}
            </p>
          )}
          {!isNotFound && !isPermissionDenied && (
            <button
              type='button'
              onClick={() => projectQuery.refetch()}
              className='mt-5 rounded-full bg-[#035A7A] px-5 py-2 text-sm font-semibold text-white'
            >
              Try again
            </button>
          )}
          <Link
            href='/artist-page/project-page'
            className='mt-5 inline-block text-sm font-semibold text-[#035A7A] underline'
          >
            Back to projects
          </Link>
        </div>
      </PageContainer>
    );
  }

  return (
    <div className='lg:bg-transparent'>
      <PageContainer className='pb-[100px] pt-4 md:pt-7 lg:pb-20'>
        <section className='mb-4 lg:mb-[29.34px] lg:mt-4'>
          <div className='border-b-2 text-left w-full'>
            <h1 className='pb-2 font-bold text-[28px] text-[#222222] lg:pb-0 lg:text-2xl'>
              Job Details
            </h1>
          </div>
        </section>

        <div className='grid grid-cols-10 gap-8 mt-4 lg:mt-4'>
          {/* Job Details (70%) */}
          <div className='col-span-10 lg:col-span-7 flex flex-col'>
            <JobDetailsPage
              project={project}
              proposalSubmitted={proposalSubmitted}
              isSaved={isSaved}
              handleBookmark={handleBookmark}
            />
            <div className='mt-4 flex flex-col lg:mt-6'>
              <ReferenceImage project={project} />
            </div>
            <div className='flex flex-col lg:mt-6'>
              <DesignStyle project={project} />
            </div>
            <div className='flex flex-col lg:mt-6'>
              <SkillRequirement project={project} />
            </div>
            <div className='flex flex-col lg:mt-6'>
              <Budgets project={project} />
            </div>
            {/* Mobile: client card sits under the budget. Desktop: it is in the right column. */}
            <div className='lg:hidden'>
              <AboutClient project={project} />
            </div>
          </div>

          {/* Button Proposals + client (30%) - desktop only */}
          <div className='hidden lg:col-span-3 lg:flex lg:flex-col'>
            <div className='flex lg:mb-[30px]'>
              <BtnProposals
                handleSubmitProposal={handleSubmitProposal}
                handleViewProposal={handleViewProposal}
                handleWithdrawProposal={handleWithdrawProposal}
                handleSave={handleBookmark}
                proposalSubmitted={proposalSubmitted}
                isSaved={isSaved}
                saveText={
                  proposalSubmitted ? 'Withdraw Proposal' : isSaved ? 'Saved' : 'Save Job'
                }
                sendText={proposalSubmitted ? 'View Proposal' : 'Send Proposal'}
              />
            </div>
            <div className='lg:mt-[30px]'>
              <AboutClient project={project} />
            </div>
          </div>

          <DeleteConfirmationModal
            isOpen={isWithdrawModalOpen}
            onOpenChange={onWithdrawModalOpenChange}
            onConfirm={confirmWithdrawProposal}
            title='Withdraw Proposal?'
            message='Are you sure you want to withdraw your proposal? This action cannot be undone.'
            confirmButtonText='Yes'
          />
        </div>

        {saveMutation.isError && (
          <p role='alert' className='mt-4 text-sm text-red-600'>
            {getProjectApiErrorMessage(saveMutation.error)}
          </p>
        )}
      </PageContainer>

      {/* Sticky CTA (mobile) */}
      <div className='fixed bottom-0 left-0 w-full bg-white border-t border-[#ECECEC] px-4 py-4 z-50 flex items-center gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] lg:hidden'>
        {proposalSubmitted ? (
          <>
            <button
              type='button'
              onClick={handleWithdrawProposal}
              className='flex-1 flex items-center justify-center border-2 border-[#146C94] text-[#146C94] font-bold text-[15px] py-3.5 rounded-full bg-white h-[52px]'
            >
              Withdraw Proposal
            </button>
            <button
              type='button'
              onClick={handleViewProposal}
              className='flex-1 flex items-center justify-center bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] text-[#035A7A] font-bold text-[15px] py-3.5 rounded-full shadow-[0_4px_14px_rgba(110,193,228,0.4)] h-[52px]'
            >
              View Proposal
            </button>
          </>
        ) : (
          <>
            <button
              type='button'
              disabled={saveMutation.isPending}
              onClick={handleBookmark}
              className='flex-1 flex items-center justify-center gap-2 border-2 border-[#035A7A] text-[#035A7A] font-bold text-[15px] py-3.5 rounded-full bg-white h-[52px] disabled:opacity-50'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill={isSaved ? '#035A7A' : 'none'}
                viewBox='0 0 24 24'
                strokeWidth={2}
                stroke='#035A7A'
                className='w-5 h-5'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z'
                />
              </svg>
              {isSaved ? 'Saved' : 'Save Post'}
            </button>
            <button
              type='button'
              onClick={handleSubmitProposal}
              className='flex-1 flex items-center justify-center bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] text-[#035A7A] font-bold text-[15px] py-3.5 rounded-full shadow-[0_4px_14px_rgba(110,193,228,0.4)] h-[52px]'
            >
              Send Proposal
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const Page = () => (
  <Suspense fallback={<div className='p-8'>Loading project…</div>}>
    <JobDetailsPageContent />
  </Suspense>
);

export default Page;
