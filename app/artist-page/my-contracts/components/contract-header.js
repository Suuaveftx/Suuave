'use client';

import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { Button } from '@heroui/react';
import { useRouter } from 'next/navigation';

import React from 'react';

export default function ContractHeader({ title }) {
  const router = useRouter();
  // Function to handle back navigation
  const handleBack = () => {
    router.back();
  };

  return (
    <div className='max-w-[86.5rem] mx-auto md:my-8 my-4 px-4 lg:px-10'>
      <h1 className='text-2xl md:text-4xl font-semibold flex items-center gap-2'>
        {/* Show the arrow only on mobile view (sm and below) */}
        <Button
          isIconOnly
          variant='flat'
          className='block lg:hidden ml-2 bg-transparent -mr-2'
          isPressable
          onPress={handleBack}
        >
          <ChevronLeftIcon width={20} height={20} />
        </Button>
        {title}
      </h1>
    </div>
  );
}
