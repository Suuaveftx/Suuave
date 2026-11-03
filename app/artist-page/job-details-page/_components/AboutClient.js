'use client';
import React from 'react';
import Link from 'next/link';
import { FaStar, FaRegUser } from 'react-icons/fa6';
import { MdOutlineMailOutline, MdOutlinePhone } from 'react-icons/md';
import { LuCreditCard } from 'react-icons/lu';

// Same card as components/Abouttheclient.js, but filled from the project's client data.
const formatMemberSince = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  const month = date.toLocaleDateString('en-GB', { month: 'long' });
  return `${date.getDate()} ${month}, ${date.getFullYear()}`;
};

const iconClass = 'text-[#146C94] lg:text-[#3A98BB] w-4 h-4';

const AboutClient = ({ project }) => {
  const user = project?.user;
  if (!user) return null;

  const verification = project?.verification ?? {};
  const memberSince = formatMemberSince(user.memberSince);
  const rating = typeof user.rating === 'number' ? Math.round(user.rating) : null;

  const verifications = [
    {
      ok: Boolean(verification.identity ?? user.identity),
      icon: <FaRegUser className={iconClass} />,
      label: 'Identity Verified',
    },
    {
      ok: Boolean(verification.email ?? user.emailVerified),
      icon: <MdOutlineMailOutline className={iconClass} />,
      label: 'Email Address Verified',
    },
    {
      ok: Boolean(verification.phone ?? user.phoneVerified),
      icon: <MdOutlinePhone className={iconClass} />,
      label: 'Phone Number Verified',
    },
    {
      ok: Boolean(user.paymentVerified),
      icon: <LuCreditCard className={iconClass} />,
      label: 'Payment Method Verified',
    },
  ].filter((item) => item.ok);

  return (
    <div className='bg-white lg:bg-[#FAFAFA] w-full lg:px-6 px-5 pt-5 pb-6 lg:pb-[56px] rounded-[18px] lg:rounded-2xl flex flex-col text-left border border-[#ECECEC] lg:border-[#EAEAEA] mb-4 shadow-[0_1px_8px_rgba(0,0,0,0.04)] lg:shadow-none'>
      {/* Header */}
      <div className='lg:mb-8 mb-4 px-0 py-0 w-full border-b border-[#ECECEC] lg:border-none pb-3 lg:pb-0'>
        <h4 className='font-bold lg:text-[22px] text-[15px] text-[#2E2E2E]'>About the Client</h4>
      </div>

      {/* Client Info */}
      <div className='mb-6 flex flex-col items-start text-left w-full'>
        <div className='font-bold mb-1'>
          <Link
            href='/artist-page/client-profile'
            className='text-[#146C94] lg:text-[#3A98BB] hover:opacity-80 transition-opacity duration-200'
          >
            <h4>{user.name}</h4>
          </Link>
        </div>
        <div className='flex flex-col gap-2 mb-6 items-start'>
          {user.role === 'brand' && (
            <h5 className='font-medium text-[14px] text-[#2E2E2E]'>Fashion Brand</h5>
          )}

          <div className='flex flex-wrap items-center gap-1 justify-start'>
            <span className='tracking-[0.33px] text-[#757575] text-[14px]'>Ratings:</span>
            {rating === null ? (
              <span className='tracking-[0.33px] text-[#757575] text-[14px]'>No ratings yet</span>
            ) : (
              <div className='flex items-center gap-1'>
                {Array.from({ length: 5 }, (_, index) => (
                  <FaStar
                    key={index}
                    className={`w-3 h-3 ${index < rating ? 'text-[#F8B73B]' : 'text-[#D9D9D9]'}`}
                  />
                ))}
              </div>
            )}
          </div>

          {memberSince && (
            <span className='text-[#757575] text-[14px] tracking-[0.33px] leading-[18px]'>
              Member since {memberSince}
            </span>
          )}
        </div>

        {/* Jobs & Artists */}
        <div className='flex flex-col gap-2 items-start'>
          <div className='flex items-center gap-2 text-[#757575] text-[14px]'>
            <span className='font-bold text-[#2E2E2E]'>{user.jobsPosted ?? 0}</span>
            <span>Jobs Posted</span>
          </div>
          <div className='flex items-center gap-2 text-[#757575] text-[14px]'>
            <span className='font-bold text-[#2E2E2E]'>{user.artistHired ?? 0}</span>
            <span>Artists Hired</span>
          </div>
        </div>
      </div>

      {/* Client Verifications */}
      <div className='flex flex-col items-start text-left w-full'>
        <div className='mb-4'>
          <h5 className='leading-[160%] tracking-[0.33px] text-[15px] lg:text-[18px] text-[#2E2E2E] font-bold'>
            Client Verifications
          </h5>
        </div>
        {verifications.length === 0 ? (
          <span className='text-[#757575] text-[14px]'>No verifications yet</span>
        ) : (
          <div className='flex flex-col gap-3 items-start'>
            {verifications.map((item) => (
              <div key={item.label} className='flex items-center gap-3'>
                {item.icon}
                <span className='text-[#757575] text-[14px]'>{item.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutClient;
