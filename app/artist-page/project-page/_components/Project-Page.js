'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaBookmark, FaRegBookmark, FaShareAlt } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';
import {
  useProjects,
  useToggleSaveProject,
} from '@/app/projects/queries/projects.queries';
import { getProjectApiErrorMessage } from '@/app/projects/api/projects';
import { formatProjectTimeline } from '@/app/projects/utils/project-formatters';

const FILTERS = [
  { value: 'recently', label: 'Recently' },
  { value: 'open', label: 'Open' },
  { value: 'closed', label: 'Closed' },
];

const getStatusClassName = (status) => {
  switch (status) {
    case 'open':
      return 'text-green-700';
    case 'in_progress':
      return 'text-blue-700';
    case 'completed':
      return 'text-gray-600';
    case 'cancelled':
      return 'text-red-700';
    default:
      return 'text-gray-600';
  }
};

const ProjectPage = ({ search = '' }) => {
  const [filter, setFilter] = useState('recently');
  const [page, setPage] = useState(1);
  const apiFilter = filter === 'saved' ? 'recently' : filter;
  const params = {
    page,
    limit: filter === 'saved' ? 100 : 10,
    filter: apiFilter,
    search: search.trim() || undefined,
  };
  const projectsQuery = useProjects(params);
  const saveMutation = useToggleSaveProject();
  const projects = projectsQuery.data?.projects ?? [];
  const visibleProjects =
    filter === 'saved'
      ? projects.filter((project) => project.isSaved)
      : filter === 'closed'
      ? projects.filter((project) => ['completed', 'cancelled'].includes(project.status))
      : filter === 'open'
        ? projects.filter((project) => project.status === 'open')
        : projects;
  const pagination = projectsQuery.data?.pagination;
  const savedCount =
    filter === 'saved'
      ? visibleProjects.length
      : projects.filter((project) => project.isSaved).length;

  useEffect(() => {
    setPage(1);
  }, [search]);

  const changeFilter = (nextFilter) => {
    setFilter(nextFilter);
    setPage(1);
  };

  const changePage = (nextPage) => {
    if (projectsQuery.isFetching) return;
    setPage(Math.min(Math.max(1, nextPage), pagination?.totalPages ?? nextPage));
  };

  const shareProject = async (projectId, title) => {
    const url = `${window.location.origin}/artist-page/job-details-page?id=${encodeURIComponent(projectId)}`;
    if (navigator.share) {
      await navigator.share({ title, url });
      return;
    }

    await navigator.clipboard.writeText(url);
  };

  const queryError = projectsQuery.error;
  const statusCode = queryError?.response?.status;
  const isPermissionDenied = statusCode === 401 || statusCode === 403;
  const isUnavailable = statusCode >= 500;
  const saveErrorStatus = saveMutation.error?.response?.status;
  const saveErrorMessage =
    saveErrorStatus === 401
      ? 'Please sign in with an artist account to save projects.'
      : saveErrorStatus === 403
        ? 'Only artist accounts can save projects.'
        : getProjectApiErrorMessage(saveMutation.error);

  return (
    <section className='w-full max-w-full overflow-x-hidden pb-6'>
      <div className='flex flex-wrap items-center justify-between gap-4 border-b mb-4'>
        <div className='flex gap-4' role='tablist' aria-label='Project filters'>
          {[...FILTERS, { value: 'saved', label: `Saved (${savedCount})` }].map(
            ({ value, label }) => (
            <button
              key={value}
              type='button'
              role='tab'
              aria-selected={filter === value}
              onClick={() => changeFilter(value)}
              className={`px-1 py-2 ${
                filter === value
                  ? 'text-[#3A98BB] font-bold border-b-[3px] border-[#3A98BB]'
                  : 'text-gray-500'
              }`}
            >
              {label}
            </button>
            )
          )}
        </div>
        <span className='text-sm text-gray-500'>
          {filter === 'saved'
            ? `${visibleProjects.length} projects`
            : pagination
              ? `${pagination.totalProjects} projects`
              : ''}
        </span>
      </div>

      {projectsQuery.isPending ? (
        <div
          className='grid grid-cols-1 lg:grid-cols-2 gap-4'
          aria-label='Loading projects'
        >
          {Array.from({ length: 6 }, (_, index) => (
            <div
              key={index}
              className='animate-pulse px-4 py-6 bg-white border border-[#EAEAEA] rounded-2xl shadow-sm mt-2'
            >
              <div className='h-4 w-20 bg-gray-200 rounded mb-3' />
              <div className='h-5 w-3/4 bg-gray-200 rounded mb-3' />
              <div className='h-3 w-1/2 bg-gray-200 rounded mb-5' />
              <div className='h-16 w-full bg-gray-200 rounded mb-4' />
              <div className='h-4 w-28 bg-gray-200 rounded' />
            </div>
          ))}
        </div>
      ) : projectsQuery.isError ? (
        <div className='rounded-2xl border border-red-200 bg-red-50 px-6 py-10 text-center'>
          <h2 className='font-semibold text-[#222222]'>
            {isPermissionDenied
              ? 'You do not have permission to browse projects'
              : isUnavailable
                ? 'Projects are temporarily unavailable'
                : 'We could not load projects'}
          </h2>
          <p className='mt-2 text-sm text-gray-600'>
            {getProjectApiErrorMessage(queryError)}
          </p>
          {!isPermissionDenied && (
            <button
              type='button'
              onClick={() => projectsQuery.refetch()}
              className='mt-4 rounded-full bg-[#035A7A] px-5 py-2 text-sm font-semibold text-white'
            >
              Try again
            </button>
          )}
        </div>
      ) : visibleProjects.length === 0 ? (
        <div className='rounded-2xl border border-[#EAEAEA] bg-white px-6 py-14 text-center'>
          <h2 className='font-semibold text-[#222222]'>No projects found</h2>
          <p className='mt-2 text-sm text-gray-500'>
            Try a different search or filter to find projects.
          </p>
        </div>
      ) : (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          {visibleProjects.map((project) => (
            <article
              key={project.projectId}
              role='link'
              tabIndex={0}
              onClick={() =>
                window.location.assign(
                  `/artist-page/job-details-page?id=${encodeURIComponent(project.projectId)}`
                )
              }
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  window.location.assign(
                    `/artist-page/job-details-page?id=${encodeURIComponent(project.projectId)}`
                  );
                }
              }}
              className='relative mt-2 flex min-h-[360px] cursor-pointer flex-col rounded-2xl border border-[#EAEAEA] bg-white px-4 py-6 shadow-sm transition-shadow hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3A98BB]'
            >
              <div className='absolute right-4 top-4 flex gap-3'>
                <button
                  type='button'
                  aria-label={`Share ${project.title}`}
                  onClick={(event) => {
                    event.stopPropagation();
                    shareProject(project.projectId, project.title);
                  }}
                  className='rounded-full p-2 text-gray-500 hover:bg-gray-100'
                >
                  <FaShareAlt />
                </button>
                <button
                  type='button'
                  aria-label={
                    project.isSaved ? `Unsave ${project.title}` : `Save ${project.title}`
                  }
                  disabled={saveMutation.isPending}
                  onClick={(event) => {
                    event.stopPropagation();
                    saveMutation.mutate(project.projectId);
                  }}
                  className='rounded-full p-2 text-[#3A98BB] hover:bg-gray-100 disabled:opacity-50'
                >
                  {project.isSaved ? <FaBookmark /> : <FaRegBookmark />}
                </button>
              </div>
              <p className='text-xs leading-4 text-[#878787]'>
                Project status:{' '}
                <span
                  className={`font-medium capitalize ${getStatusClassName(project.status)}`}
                >
                  {project.status.replace('_', ' ')}
                </span>
              </p>
              <Link
                href={`/artist-page/job-details-page?id=${encodeURIComponent(project.projectId)}`}
                className='block pr-16 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3A98BB]'
              >
                <h2 className='mt-2 text-lg font-bold text-[#222222]'>{project.title}</h2>
              </Link>
              <p className='mt-1 text-sm text-gray-500'>
                {project.postedAt ? new Date(project.postedAt).toLocaleDateString() : ''}
                {project.user?.name ? ` · ${project.user.name}` : ''}
              </p>
              <p className='mt-3 text-sm text-[#727272] line-clamp-3'>
                {project.description}
              </p>
              {project.description?.length > 180 && (
                <span className='mt-1 inline-block text-sm font-semibold text-[#035A7A]'>
                  Read more
                </span>
              )}
              {formatProjectTimeline(project) && (
                <p className='mt-2 text-sm text-gray-500'>
                  Timeline: {formatProjectTimeline(project)}
                </p>
              )}
              <div className='mt-auto pt-4'>
                {formatProjectTimeline(project) && (
                  <p className='mb-3 text-sm text-gray-500'>
                    Timeline: {formatProjectTimeline(project)}
                  </p>
                )}
                <div className='flex min-h-[32px] flex-wrap gap-2'>
                {(project.skillsRequired ?? []).map((skill) => (
                  <span
                    key={skill}
                    className='rounded-full bg-[#F0F0F0] px-3 py-1 text-sm text-[#767676]'
                  >
                    {skill}
                  </span>
                ))}
                </div>
                <div className='mt-4 flex items-center justify-between gap-3'>
                  <p className='font-semibold text-gray-800'>
                    Budget:{' '}
                    {new Intl.NumberFormat(undefined, {
                      style: 'currency',
                      currency: project.currency,
                      maximumFractionDigits: 0,
                    }).format(project.budget)}
                  </p>
                  <p className='text-sm text-gray-500'>
                    {project.proposalsCount ?? 0} proposals
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {pagination && pagination.totalPages > 1 && visibleProjects.length > 0 && (
        <nav
          className='mt-8 flex items-center justify-center gap-4'
          aria-label='Project pages'
        >
          <button
            type='button'
            disabled={page <= 1 || projectsQuery.isFetching}
            onClick={() => changePage(page - 1)}
            className='rounded border px-4 py-2 text-sm disabled:opacity-40'
          >
            Previous
          </button>
          <span className='text-sm text-gray-600'>
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <button
            type='button'
            disabled={page >= pagination.totalPages || projectsQuery.isFetching}
            onClick={() => changePage(page + 1)}
            className='rounded border px-4 py-2 text-sm disabled:opacity-40'
          >
            Next
          </button>
        </nav>
      )}

      {saveMutation.isError && (
        <p role='alert' className='mt-4 text-center text-sm text-red-600'>
          {saveErrorMessage}
        </p>
      )}

      <div className='fixed bottom-24 right-6 z-[9999] lg:hidden'>
        <Link
          href='/artist-page/license-your-design'
          className='flex items-center rounded-full border border-[#73D9FF] bg-[#EAF9FF] p-4 text-[#035A7A] shadow-2xl'
          aria-label='List a Design'
        >
          <FiPlus className='h-6 w-6 shrink-0' />
        </Link>
      </div>
    </section>
  );
};

export default ProjectPage;
