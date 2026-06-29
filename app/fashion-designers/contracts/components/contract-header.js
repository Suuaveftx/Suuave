'use client';

import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { Button } from '@heroui/react';
import { useRouter } from 'next/navigation';

import React from 'react';

export default function ContractHeader({ title, maxWidth = 'max-w-7xl', tab = 'pending', showBack = false }) {
  const router = useRouter();
  // Function to handle back navigation
  const handleBack = () => {
    router.push(`/fashion-designers/contracts?tab=${tab}`);
  };

  return (
    <div className={`w-full mx-auto md:my-8 my-4 lg:pt-0`}>
      <h1 className='text-[28px] font-semibold flex items-center gap-2'>
        {showBack && (
          <Button
            isIconOnly
            variant='light'
            onPress={handleBack}
            className='min-w-fit flex items-center justify-center p-1 rounded-full w-auto h-auto px-1 -ml-2 bg-transparent hover:bg-gray-100'
          >
            <ChevronLeftIcon className='w-6 h-6 text-[#222222]' />
          </Button>
        )}
        {title}
      </h1>
    </div>
  );
}
