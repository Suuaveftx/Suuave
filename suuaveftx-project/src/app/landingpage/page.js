import React from 'react'
import HeroSection from './_components/Hero'
import WhySuaave from './_components/WhySuaave'
import HowItWorks from './_components/HowitWorks'
import ImageFashion from './_components/ImageFashion'
import ImageDesigners from './_components/ImageDesigners'
import ExploreComponent from './_components/Explore'
import Banner from './_components/Banner'
import Footer from './_components/Footer'
import AppLayout2 from '../components/Applayout2'

const page = () => {
  return (

    <>
    <AppLayout2>
    <div className='mb-8'>
        <HeroSection />
    </div>
    </AppLayout2>
    <div className='mb-8'>
        <WhySuaave />
    </div>
    <div className='mb-8'>
      <HowItWorks />
    </div>
    <div className='mb-8'>
      <ImageFashion />
    </div>
    <div className='mb-8'>
      <ImageDesigners />
    </div>
    <div className='mb-8'>
      <ExploreComponent />
    </div>
    <div className='mb-8'>
      <Banner />
    </div>
    <div className='mt-10'>
      <Footer />
    </div>
    </>
  )
}

export default page