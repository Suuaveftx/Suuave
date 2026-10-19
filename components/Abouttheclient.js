'use client';
import React from 'react';
import { MdLocationPin } from 'react-icons/md';
import { FaStar, FaRegUser } from 'react-icons/fa6';
import { MdOutlineMailOutline, MdOutlinePhone } from 'react-icons/md';
import { LuCreditCard } from 'react-icons/lu';
import Link from 'next/link';
import Image from 'next/image';

const Abouttheclient = () => {
  return (
    <div className="bg-white lg:bg-[#FAFAFA] w-full lg:px-6 px-5 pt-5 pb-6 lg:pb-[56px] rounded-[18px] lg:rounded-2xl flex flex-col text-left border border-[#ECECEC] lg:border-[#EAEAEA] mb-4 shadow-[0_1px_8px_rgba(0,0,0,0.04)] lg:shadow-none">
      {/* Header */}
      <div className="lg:mb-8 mb-4 px-0 py-0 w-full border-b border-[#ECECEC] lg:border-none pb-3 lg:pb-0">
        <h4 className="font-bold lg:text-[22px] text-[15px] text-[#2E2E2E]">
          About the Client
        </h4>
      </div>

      {/* Client Info */}
      <div className="mb-6 flex flex-col items-start text-left w-full">
        <div className='font-bold mb-1'>
          <Link href="/artist-page/client-profile" className="text-[#146C94] lg:text-[#3A98BB] hover:opacity-80 transition-opacity duration-200">
            <h4>@Ocean</h4>
          </Link>
        </div>
        <div className="flex flex-col gap-2 mb-6 items-start">
          <h5 className="font-medium text-[14px] text-[#2E2E2E]">Fashion Brand</h5>

          <div className="flex items-center gap-2 justify-start">
            <MdLocationPin className="text-[#878787] w-[18px] h-[18px]" />
            <span className="tracking-[0.33px] text-[#757575] text-[14px]">
              Lagos, Nigeria
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1 justify-start">
            <span className="tracking-[0.33px] text-[#757575] text-[14px]">Ratings:</span>
            <div className="flex items-center gap-1">
              {Array(5)
                .fill(null)
                .map((_, index) => (
                  <FaStar key={index} className="text-[#F8B73B] w-3 h-3" />
                ))}
            </div>
            <Link href="/artist-page/client-profile">
              <span className="text-[14px] text-[#146C94] lg:text-[#3A98BB] tracking-[0.33px] leading-[18px] ml-1">
                (5 Reviews)
              </span>
            </Link>
          </div>

          <div>
            <span className="text-[#757575] text-[14px] tracking-[0.33px] leading-[18px]">
              Member since 12 June, 2024
            </span>
          </div>
        </div>

        {/* Jobs & Artists */}
        <div className="flex flex-col gap-2 items-start">
          <div className="flex items-center gap-2 text-[#757575] text-[14px]">
            <span className="font-bold text-[#2E2E2E]">14</span>
            <span>Jobs Posted</span>
          </div>
          <div className="flex items-center gap-2 text-[#757575] text-[14px]">
            <span className="font-bold text-[#2E2E2E]">14</span>
            <span>Artists Hired</span>
          </div>
        </div>
      </div>

      {/* Client Verifications */}
      <div className="flex flex-col items-start text-left w-full">
        <div className="mb-4">
          <h5 className="leading-[160%] tracking-[0.33px] text-[15px] lg:text-[18px] text-[#2E2E2E] font-bold">
            Client Verifications
          </h5>
        </div>
        <div className="flex flex-col gap-3 items-start">
          <div className="flex items-center gap-3">
            <FaRegUser className="text-[#146C94] lg:text-[#3A98BB] w-4 h-4" />
            <span className="text-[#757575] text-[14px]">Identity Verified</span>
          </div>
          <div className="flex items-center gap-3">
            <MdOutlineMailOutline className="text-[#146C94] lg:text-[#3A98BB] w-4 h-4" />
            <span className="text-[#757575] text-[14px]">Email Address Verified</span>
          </div>
          <div className="flex items-center gap-3">
            <MdOutlinePhone className="text-[#146C94] lg:text-[#3A98BB] w-4 h-4" />
            <span className="text-[#757575] text-[14px]">Phone Number Verified</span>
          </div>
          <div className="flex items-center gap-3">
            <LuCreditCard className="text-[#146C94] lg:text-[#3A98BB] w-4 h-4" />
            <span className="text-[#757575] text-[14px]">Payment Method Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Abouttheclient;
