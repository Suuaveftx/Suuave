'use client';
import React, { useState } from 'react';
import { HiBookmark, HiOutlineBookmark } from 'react-icons/hi2';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import {
  FaShareAlt,
  FaWhatsapp,
  FaTwitter,
  FaFacebook,
  FaLinkedin,
  FaCopy,
} from 'react-icons/fa';

const TIME_UNITS = [
  ['year', 31536000],
  ['month', 2592000],
  ['week', 604800],
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
];

const timeAgo = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  const seconds = Math.max(0, (Date.now() - date.getTime()) / 1000);
  for (const [name, size] of TIME_UNITS) {
    if (seconds >= size) {
      const count = Math.floor(seconds / size);
      return `${count} ${name}${count > 1 ? 's' : ''} ago`;
    }
  }
  return 'just now';
};

// Label + colours for the "Job status" text
const getStatus = (status, proposalSubmitted) => {
  if (proposalSubmitted) return { label: 'Applied', mobile: 'text-[#035A7A]', desktop: 'text-[#035A7A]' };
  switch (status) {
    case 'in_progress':
      return { label: 'In progress', mobile: 'text-[#035A7A]', desktop: 'text-[#035A7A]' };
    case 'completed':
      return { label: 'Completed', mobile: 'text-[#757575]', desktop: 'text-[#757575]' };
    case 'cancelled':
      return { label: 'Cancelled', mobile: 'text-[#B42318]', desktop: 'text-[#B42318]' };
    default:
      return { label: 'Active', mobile: 'text-[#24B26B]', desktop: 'text-[#056D16]' };
  }
};

const JobDetailsPage = ({
  project,
  proposalSubmitted = false,
  isSaved = false,
  handleBookmark,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const status = getStatus(project.status, proposalSubmitted);
  const posted = timeAgo(project.postedAt);
  const title = project.title;
  const description = project.description || 'No project brief was provided.';

  const flashCopied = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSocialShare = async (platform) => {
    const url = window.location.href;
    const text = `Check out this project: ${title}`;
    let shareUrl = '';

    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'copy':
        try {
          await navigator.clipboard.writeText(url);
          flashCopied();
        } catch {
          /* clipboard blocked - ignore */
        }
        return;
      default:
        return;
    }
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  const shareMenu = (
    <DropdownMenu aria-label='Share options' onAction={(key) => handleSocialShare(String(key))}>
      <DropdownItem key='whatsapp' startContent={<FaWhatsapp className='text-green-500' />}>
        WhatsApp
      </DropdownItem>
      <DropdownItem key='twitter' startContent={<FaTwitter className='text-blue-400' />}>
        X (Twitter)
      </DropdownItem>
      <DropdownItem key='facebook' startContent={<FaFacebook className='text-blue-700' />}>
        Facebook
      </DropdownItem>
      <DropdownItem key='linkedin' startContent={<FaLinkedin className='text-blue-800' />}>
        LinkedIn
      </DropdownItem>
      <DropdownItem key='copy' startContent={<FaCopy className='text-gray-500' />}>
        Copy Link
      </DropdownItem>
    </DropdownMenu>
  );

  return (
    <>
      {/* ── MOBILE LAYOUT ── */}
      <div className='lg:hidden'>
        <div className='bg-white rounded-[18px] border border-[#ECECEC] p-5 shadow-[0_1px_8px_rgba(0,0,0,0.04)]'>
          {/* Top Row: Status + Share */}
          <div className='flex items-center justify-between mb-3'>
            <div className='flex items-center gap-1 text-[13px] font-medium'>
              <span className='text-[#757575]'>Job Status :</span>
              <span className={status.mobile}>{status.label}</span>
            </div>
            <div className='relative'>
              <Dropdown>
                <DropdownTrigger>
                  <button
                    type='button'
                    aria-label='Share project'
                    className='p-1 hover:bg-gray-100 rounded-full transition-colors'
                  >
                    <FaShareAlt className='text-[#878787] w-5 h-5' />
                  </button>
                </DropdownTrigger>
                {shareMenu}
              </Dropdown>
              {isCopied && (
                <span className='absolute -bottom-8 right-0 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10'>
                  Copied!
                </span>
              )}
            </div>
          </div>

          {/* Title */}
          <h1 className='text-[22px] font-bold text-[#2E2E2E] leading-tight mb-2 flex items-center gap-2 flex-wrap break-words'>
            {title}
            {proposalSubmitted && (
              <span className='bg-[#035A7A] text-white text-xs font-medium px-2 py-1 rounded-[4px]'>
                Applied
              </span>
            )}
          </h1>
          {posted && <p className='text-[14px] text-[#757575] mb-5'>Posted {posted}</p>}

          {/* Description */}
          <div className='text-[15px] text-[#2E2E2E] leading-[1.9]'>
            <p className='whitespace-pre-wrap break-words'>{description}</p>
          </div>
        </div>
      </div>

      {/* ── DESKTOP LAYOUT ── */}
      <section className='hidden lg:block'>
        <div className='bg-[#FAFAFA] lg:px-8 lg:py-8 lg:pb-[42px] rounded-2xl w-full px-4 pt-8 pb-6 border border-[#EAEAEA]'>
          <div className='text-sm text-[#767676] tracking-[0.33px] flex justify-between lg:mb-8 mb-4'>
            <div className='flex'>
              <span>{posted ? `Posted ${posted}` : ''}</span>
            </div>
            <div className='flex gap-1'>
              <span>Job status:</span>
              <span className={status.desktop}>{status.label}</span>
            </div>
            <div className='flex gap-6 items-center'>
              <div className='relative'>
                <Dropdown>
                  <DropdownTrigger>
                    <button
                      type='button'
                      aria-label='Share project'
                      className='hover:opacity-75 transition-opacity mt-0.5'
                    >
                      <FaShareAlt style={{ color: '#878787', width: '20px', height: '20px' }} />
                    </button>
                  </DropdownTrigger>
                  {shareMenu}
                </Dropdown>
                {isCopied && (
                  <span className='absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap z-40'>
                    Copied!
                  </span>
                )}
              </div>
              <button
                type='button'
                aria-label={isSaved ? 'Unsave project' : 'Save project'}
                onClick={handleBookmark}
                className='hover:opacity-75 transition-opacity'
              >
                {isSaved ? (
                  <HiBookmark style={{ color: '#3A98BB', width: '24px', height: '24px' }} />
                ) : (
                  <HiOutlineBookmark style={{ color: '#3A98BB', width: '24px', height: '24px' }} />
                )}
              </button>
            </div>
          </div>

          <div className='lg:font-bold lg:text-[22px] w-full'>
            <h4 className='font-bold text-[20px] leading-6 flex items-center gap-3 flex-wrap break-words'>
              {title}
              {proposalSubmitted && (
                <span className='bg-[#035A7A] text-white text-xs font-medium px-[8px] py-[4px] rounded-[4px]'>
                  Applied
                </span>
              )}
            </h4>
            <div className='lg:mt-7 mt-4 text-[#222222] w-full'>
              <h5 className='text-base font-normal'>Job Description</h5>
              <p className='text-base font-normal tracking-[0.33px] whitespace-pre-wrap break-words'>
                {description}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default JobDetailsPage;
