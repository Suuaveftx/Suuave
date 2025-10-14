import React from 'react'
import ProfileArtist from './_components/Profile'
import FashionCards from './_components/FashionCard'

const Page = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4">
      <ProfileArtist />
      <FashionCards />
    </div>
  )
}

export default Page
