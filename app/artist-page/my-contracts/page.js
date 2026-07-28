import React, { Suspense } from 'react'
import UnderlinedTabs from './_components/Tabs'
import PageContainer from '../../../components/layout/PageContainer'

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContainer>
        {/* Header with 8px margin from navbar using pt-2 */}
        <div className='w-full mx-auto pt-2'>
          <h1 className='text-[28px] font-semibold text-[#222222] mb-6'>My Contracts</h1>
        </div>
        <UnderlinedTabs />
      </PageContainer>
    </Suspense>
  )
}

export default Page
