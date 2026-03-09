'use client';
import React from 'react';
import Payment from './_components/Payment';
import PaymentAll from './_components/PaymentAll';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();

  return (
    <>
      <div className='w-full md:max-w-none md:mx-0 md:w-64 px-4 md:pl-8 mt-4 flex items-center gap-2 sm:gap-4'>
        {/* Show chevron only on mobile */}
        <ChevronLeft
          className='w-5 h-5 sm:hidden cursor-pointer'
          color='#878787'
          onClick={() => router.push("/artist-page/profile-for-artist")}
        />
        <h1 className='lg:text-2xl text-[32px] font-bold border-b-[0.5px] leading-[100%]'>
          Wallet
        </h1>
      </div>

      {/* Grid Layout */}
      <div className='grid grid-cols-1 md:grid-cols-[auto_1fr] md:gap-0 mt-4'>
        {/* Payment Section */}
        <div className='px-4 md:pl-4 md:pr-2'>
          <Payment />
        </div>

        {/* PaymentAll Section (Takes up more space) */}
        <div className='px-4 md:px-0 md:pr-8'>
          <PaymentAll />
        </div>
      </div>
    </>
  );
};

export default Page;
