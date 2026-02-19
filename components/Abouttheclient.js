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
    <div className="bg-[#FAFAFA] lg:w-screen lg:max-w-[80%] lg:px-6 px-4 pt-0 pb-[56px] w-screen max-w-[550px] lg:mx-0 rounded-2xl flex flex-col items-center justify-center text-center border border-[#EAEAEA] mx-auto">
      {/* Header */}
      <div className="lg:mb-8 mb-6 px-0 py-4">
        <h4 className="border-b font-bold lg:text-[22px] text-[18px] whitespace-nowrap">
          About the Client
        </h4>
      </div>

      {/* Client Image */}
      <div>
        <Link href="/artist-page/client-profile">
          <Image
            src="/dev-images/Clients.png"
            alt="Client Image"
            width={120}
            height={120}
            className="mb-4 rounded-full"
          />
        </Link>
      </div>

      {/* Client Info */}
      <div className="mb-8 flex flex-col items-center text-center">
        <div className='font-bold'>
          <Link href="/artist-page/client-profile" className="text-[#3A98BB] hover:opacity-80 transition-opacity duration-200">
            <h4>@Ocean</h4>
          </Link>
        </div>
        <div className="flex flex-col gap-2 mb-6 items-center">
          <h5 className="font-medium text-sm">Fashion Brand</h5>


          <div className="flex items-center gap-2 justify-center">
            <MdLocationPin color="#878787" />
            <span className="tracking-[0.33px] text-[#767676]">
              Lagos, Nigeria
            </span>
          </div>

          <div className="flex items-center gap-2 justify-center">
            <span className="tracking-[0.33px] text-[#767676]">Ratings:</span>
            <Link href="/artist-page/client-profile" className='flex gap-2'>
              <div className="flex">
                {Array(5)
                  .fill(null)
                  .map((_, index) => (
                    <FaStar key={index} color="#F8B73B" />
                  ))}
              </div>

              <span className="text-sm text-[#3A98BB] tracking-[0.33px] leading-[18px]">
                (5 Reviews)
              </span>
            </Link>
          </div>

          <div>
            <span className="text-[#767676] tracking-[0.33px] leading-[18px]">
              Member since 12 June, 2024
            </span>
          </div>
        </div>

        {/* Jobs & Artists */}
        <div className="flex flex-col gap-2 items-center">
          <div className="flex flex-col items-center gap-2 text-[#76767676]">
            <span className="font-bold text-[#222222]">14</span>
            <span>Jobs Posted</span>
          </div>
          <div className="flex flex-col items-center gap-2 text-[#76767676]">
            <span className="font-bold text-[#222222]">14</span>
            <span>Artists Hired</span>
          </div>
        </div>
      </div>

      {/* Client Verifications */}
      <div className="flex flex-col items-center text-center">
        <div className="text-lg mb-[22px]">
          <h5 className="leading-[160%] tracking-[0.33px] text-[18px] text-[#222222] font-bold">
            Client Verifications
          </h5>
        </div>
        <div className="flex flex-col gap-4 items-center">
          <div className="flex items-center gap-2">
            <FaRegUser color="#3A98BB" />
            <span className="text-[#767676]">Identity Verified</span>
          </div>
          <div className="flex items-center gap-2">
            <MdOutlineMailOutline color="#3A98BB" />
            <span className="text-[#767676]">Email Address Verified</span>
          </div>
          <div className="flex items-center gap-2">
            <MdOutlinePhone color="#3A98BB" />
            <span className="text-[#767676]">Phone Number Verified</span>
          </div>
          <div className="flex items-center gap-2">
            <LuCreditCard color="#3A98BB" />
            <span className="text-[#767676]">Payment Method Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Abouttheclient;
