'use client';

import React, { useState } from 'react';

const formatDate = (dateValue) => {
  const date = new Date(dateValue);
  return Number.isNaN(date.getTime())
    ? ''
    : date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
};

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

const JobDetailsPage = ({ project }) => {
  const [shareMessage, setShareMessage] = useState('');
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: project.title,
          url: window.location.href,
        });
        return;
      }

      await navigator.clipboard.writeText(window.location.href);
      setShareMessage('Link copied');
      window.setTimeout(() => setShareMessage(''), 2000);
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        setShareMessage('Could not share this project');
      }
    }
  };

  return (
    <article className='rounded-[18px] border border-[#ECECEC] bg-white p-5 shadow-[0_1px_8px_rgba(0,0,0,0.04)] lg:rounded-2xl lg:border-[#EAEAEA] lg:bg-[#FAFAFA] lg:p-8 lg:shadow-none'>
      {/* Project header */}
      <div className='mb-6 grid grid-cols-[1fr_auto_1fr] items-center gap-4'>
        {/* Posted - left */}
        <div className='justify-self-start'>
          {project.postedAt && (
            <p className='text-sm text-[#767676]'>
              Posted {formatDate(project.postedAt)}
            </p>
          )}
        </div>

        {/* Status - centre */}
        <p className='justify-self-center text-center text-sm text-[#767676]'>
          Project status:{' '}
          <span
            className={`font-semibold capitalize ${getStatusClassName(project.status)}`}
          >
            {project.status.replaceAll('_', ' ')}
          </span>
        </p>

        {/* Share - right */}
        <div className='flex flex-col items-end gap-2 justify-self-end'>
          <button
            type='button'
            onClick={handleShare}
            className='rounded-full border border-[#EAEAEA] px-4 py-2 text-sm font-medium text-[#035A7A] hover:bg-[#EFF8FB]'
          >
            Share
          </button>

          {shareMessage && (
            <span role='status' className='text-xs text-gray-600'>
              {shareMessage}
            </span>
          )}
        </div>
      </div>

      <h1 className='mb-6 text-[22px] font-bold leading-tight text-[#222222] lg:text-2xl'>
        {project.title}
      </h1>

      {/* Project brief */}
      <section>
        <h2 className='text-base font-semibold text-[#222222]'>Project brief</h2>

        <p className='mt-2 whitespace-pre-wrap text-[15px] leading-7 text-[#444444]'>
          {project.description || 'No project brief was provided.'}
        </p>
      </section>
    </article>
  );
};

export default JobDetailsPage;
