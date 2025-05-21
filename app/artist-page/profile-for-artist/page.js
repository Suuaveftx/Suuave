import React from 'react'
import ProfileArtist from './_components/Profile'
import FashionCards from './_components/FashionCard'


const Page = () => {
  return (
    <div className='flex'>
        <ProfileArtist />
        <FashionCards />
    </div>
  )
}

export default Page