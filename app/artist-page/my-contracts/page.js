'use client';

import React, { Suspense } from 'react'
import { useRouter } from 'next/navigation'
import UnderlinedTabs from './_components/Tabs'
import SearchBar from '../../../components/Searchbar'
import PageContainer from '../../../components/layout/PageContainer'

const Page = () => {
  const router = useRouter();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContainer withTopSpacing>
        {/* Header */}
        <div className='w-full mx-auto md:my-8 my-4'>
          <h1 className='text-[28px] font-semibold text-[#222222]'>My Contracts</h1>
        </div>
        <UnderlinedTabs />
      </PageContainer>
    </Suspense>
  )
}

export default Page
