'use client';

import React, { Suspense } from 'react'
import { useRouter } from 'next/navigation'
import UnderlinedTabs from './_components/Tabs'
import SearchBar from '../../../components/Searchbar'

const Page = () => {
  const router = useRouter();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        {/* Desktop Header */}
        <div className='lg:block hidden text-2xl font-bold ml-10 mt-8 text-[#767676] border-b pb-2'>
          <h1>My Contracts</h1>
        </div>

        {/* Mobile Header */}
        <div className='lg:hidden flex items-center px-5 py-4 bg-white'>
          <button className='mr-4' onClick={() => router.push('/artist-page/project-page')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="#222222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h1 className='text-[32px] font-bold text-[#222222]'>My Contracts</h1>
        </div>
        <UnderlinedTabs />
      </div>
    </Suspense>
  )
}

export default Page