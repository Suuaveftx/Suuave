import React, { Suspense } from 'react'
import UnderlinedTabs from './_components/Tabs'
import PageContainer from '../../../components/layout/PageContainer'

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div id="artist-mobile-contracts-tour" data-tour="artist-contracts">
        <PageContainer className="pb-32 md:pb-0">
          {/* System Notifications Portal (Renders before Header) */}
          <div id="system-notifications-portal"></div>

          {/* Header with 8px margin from navbar using pt-2 */}
          <div className='w-full mx-auto pt-2'>
            <h1 className='text-[28px] font-semibold text-[#222222] mb-6'>My Contracts</h1>
          </div>
          <UnderlinedTabs />
        </PageContainer>
      </div>
    </Suspense>
  )
}

export default Page
