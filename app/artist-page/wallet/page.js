'use client';
import React from 'react';
import Payment from './_components/Payment';
import PaymentAll from './_components/PaymentAll';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

import PageContainer from '../../../components/layout/PageContainer';

const Page = () => {
  const router = useRouter();

  return (
    <PageContainer>
      <div className='w-full mt-4 flex items-center gap-2 sm:gap-4'>
        {/* Show chevron only on mobile */}

        <h1 className='lg:text-2xl text-[28px] font-bold border-b-[0.5px] leading-[100%]'>
          Wallet
        </h1>
      </div>

      {/* Grid Layout */}
      <div className='grid grid-cols-1 md:grid-cols-[auto_1fr] md:gap-0 mt-8 mb-12'>
        {/* Payment Section */}
        <div className='px-0 md:pl-0 md:pr-4'>
          <Payment />
        </div>

        {/* PaymentAll Section (Takes up more space) */}
        <div className='px-0 md:px-0'>
          <PaymentAll />
        </div>
      </div>
    </PageContainer>
  );
};

export default Page;
