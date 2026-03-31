'use client';

import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { Button } from '@heroui/react';
import { useRouter } from 'next/navigation';

import React from 'react';

export default function ContractHeader({ title, maxWidth = 'max-w-7xl', tab = 'pending' }) {
  const router = useRouter();
  // Function to handle back navigation
  const handleBack = () => {
    router.push(`/fashion-designers/contracts?tab=${tab}`);
  };

  return (
    <div className={`${maxWidth} mx-auto md:my-8 my-4 px-2 md:pl-8 lg:pt-0`}>
      <h1 className='text-[32px] md:text-4xl font-semibold flex items-center gap-2'>
        {/* Show the arrow only on mobile view (sm and below) */}
        <Button
          isIconOnly
          variant='light'
          className='lg:hidden -ml-3 bg-transparent'
          isPressable
          onPress={handleBack}
        >
          <ChevronLeftIcon width={24} height={24} strokeWidth={2.5} className="text-black" />
        </Button>
        {title}
      </h1>
    </div>
  );
}
