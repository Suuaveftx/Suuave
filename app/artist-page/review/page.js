import React from 'react'
import ProfileArtist from './_components/Profile'
import FashionCards from './_components/FashionCard'
import PageContainer from '../../../components/layout/PageContainer'

const Page = () => {
  return (
    <PageContainer className="flex flex-col lg:flex-row gap-4 pt-4 pb-4">
      <ProfileArtist />
      <FashionCards />
    </PageContainer>
  )
}

export default Page
