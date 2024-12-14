import React from 'react'
import AppLayout from '../components/Applayout'
import FashionArtist from './_components/FashionArtist'
import Image from 'next/image'

const Page = () => {
  return (
    <div>
      {/* Logo for mobile only */}
      <div className="block sm:hidden">
        <Image
          src="/dev-images/logo.png"
          alt="Logo"
          width={70}
          height={60}
          className="mb-4 mt-4 ml-6" // Adds spacing below the logo
        />
      </div>

      {/* AppLayout for larger screens */}
      <div className="hidden sm:block">
        <AppLayout>
          <FashionArtist />
        </AppLayout>
      </div>

      {/* Show FashionArtist independently for mobile */}
      <div className="block sm:hidden">
        <FashionArtist />
      </div>
    </div>
  )
}

export default Page
