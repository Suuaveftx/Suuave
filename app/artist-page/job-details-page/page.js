'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useDisclosure } from '@heroui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import PageContainer from '../../../components/layout/PageContainer';
import DeleteConfirmationModal from '../../fashion-designers/my-projects/components/DeleteConfirmationModal';
import JobDetailsPage from './_components/JobDetailsPage';
import Budgets from './_components/Budgets';
import SkillRequirement from './_components/SkillRequirement';
import { useProject, useToggleSaveProject } from '@/app/projects/queries/projects.queries';
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
  const isPermissionDenied =
    projectQuery.error?.response?.status === 401 ||
    projectQuery.error?.response?.status === 403;
  const isNotFound = projectQuery.error?.response?.status === 404 || !projectId;
  const isUnavailable = projectQuery.error?.response?.status >= 500;

  const handleSaveProject = () => {
    if (projectId) saveMutation.mutate(projectId);
  };

  const handleSubmitProposal = () => {
    if (projectId) router.push(`/artist-page/send-proposal?id=${encodeURIComponent(projectId)}`);
  };

  const confirmWithdrawProposal = () => {
    if (projectId) {
      useAppStore.setState((state) => {
        const activeProposals = { ...state.activeProposals };
        delete activeProposals[projectId];
        return { activeProposals };
      });
    } else {
      useAppStore.setState({ proposalActive: false });
    }
  };

  if (projectQuery.isPending && projectId) {
    return (
      <PageContainer className="pb-20 pt-6">
        <div className="animate-pulse space-y-4" aria-label="Loading project details">
          <div className="h-8 w-64 rounded bg-gray-200" />
          <div className="h-48 rounded-2xl bg-gray-200" />
          <div className="h-28 rounded-2xl bg-gray-200" />
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
      <PageContainer className="pb-20 pt-6">
        <div className="rounded-2xl border border-[#EAEAEA] bg-white px-6 py-12 text-center">
          <h1 className="text-xl font-bold text-[#222222]">{heading}</h1>
          {projectQuery.error && (
            <p className="mt-2 text-sm text-gray-600">
              {getProjectApiErrorMessage(projectQuery.error)}
            </p>
          )}
          {!isNotFound && !isPermissionDenied && (
            <button
              type="button"
              onClick={() => projectQuery.refetch()}
              className="mt-5 rounded-full bg-[#035A7A] px-5 py-2 text-sm font-semibold text-white"
            >
              Try again
            </button>
          )}
          <Link
            href="/artist-page/project-page"
            className="mt-5 inline-block text-sm font-semibold text-[#035A7A] underline"
          >
            Back to projects
          </Link>
        </div>
      </PageContainer>
    );
  }

  return (
    <div className="lg:bg-transparent">
      <PageContainer className="pb-28 pt-5 lg:pb-20 lg:pt-7">
        <h1 className="mb-5 border-b-2 pb-3 text-2xl font-bold text-[#222222]">
          Project Details
        </h1>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-10 lg:gap-8">
          <div className="space-y-4 lg:col-span-7">
            <JobDetailsPage project={project} />
            <Budgets project={project} />
            <SkillRequirement project={project} />
            <section className="rounded-[18px] border border-[#ECECEC] bg-white p-5 lg:rounded-2xl lg:border-[#EAEAEA] lg:bg-[#FAFAFA] lg:p-6">
              <h2 className="font-bold text-[#222222]">About the client</h2>
              {project.user?.name && (
                <p className="mt-2 text-sm text-[#444444]">{project.user.name}</p>
              )}
              {project.user?.verified && (
                <p className="mt-1 text-sm text-green-700">Verified client</p>
              )}
            </section>
          </div>

          <aside className="hidden flex-col gap-3 lg:col-span-3 lg:flex">
            <button
              type="button"
              disabled={saveMutation.isPending}
              onClick={handleSaveProject}
              className="rounded-full border-2 border-[#035A7A] px-5 py-3 font-semibold text-[#035A7A] disabled:opacity-50"
            >
              {saveMutation.isPending ? 'Saving…' : project.isSaved ? 'Unsave project' : 'Save project'}
            </button>
            {proposalSubmitted ? (
              <>
                <button
                  type="button"
                  onClick={onWithdrawModalOpen}
                  className="rounded-full border-2 border-[#146C94] px-5 py-3 font-semibold text-[#146C94]"
                >
                  Withdraw proposal
                </button>
                <Link
                  href="/artist-page/proposal-active"
                  className="rounded-full bg-[#EAF9FF] px-5 py-3 text-center font-semibold text-[#035A7A]"
                >
                  View proposal
                </Link>
              </>
            ) : (
              <button
                type="button"
                onClick={handleSubmitProposal}
                className="rounded-full bg-[#EAF9FF] px-5 py-3 font-semibold text-[#035A7A]"
              >
                Send proposal
              </button>
            )}
          </aside>
        </div>
        {saveMutation.isError && (
          <p role="alert" className="mt-4 text-sm text-red-600">
            {getProjectApiErrorMessage(saveMutation.error)}
          </p>
        )}
        <DeleteConfirmationModal
          isOpen={isWithdrawModalOpen}
          onOpenChange={onWithdrawModalOpenChange}
          onConfirm={confirmWithdrawProposal}
          title="Withdraw proposal?"
          message="Are you sure you want to withdraw your proposal? This action cannot be undone."
          confirmButtonText="Yes"
        />
      </PageContainer>

      <div className="fixed bottom-0 left-0 z-50 flex w-full items-center gap-3 border-t border-[#ECECEC] bg-white px-4 py-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] lg:hidden">
        {proposalSubmitted ? (
          <>
            <button
              type="button"
              onClick={onWithdrawModalOpen}
              className="h-[52px] flex-1 rounded-full border-2 border-[#146C94] font-bold text-[#146C94]"
            >
              Withdraw proposal
            </button>
            <Link
              href="/artist-page/proposal-active"
              className="flex h-[52px] flex-1 items-center justify-center rounded-full bg-[#EAF9FF] font-bold text-[#035A7A]"
            >
              View proposal
            </Link>
          </>
        ) : (
          <>
            <button
              type="button"
              disabled={saveMutation.isPending}
              onClick={handleSaveProject}
              className="h-[52px] flex-1 rounded-full border-2 border-[#035A7A] font-bold text-[#035A7A] disabled:opacity-50"
            >
              {project.isSaved ? 'Saved' : 'Save project'}
            </button>
            <button
              type="button"
              onClick={handleSubmitProposal}
              className="h-[52px] flex-1 rounded-full bg-[#EAF9FF] font-bold text-[#035A7A]"
            >
              Send proposal
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const Page = () => (
  <Suspense fallback={<div className="p-8">Loading project…</div>}>
    <JobDetailsPageContent />
  </Suspense>
);

export default Page;
