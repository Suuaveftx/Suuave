import React from 'react';
import HeroSection from './_components/Hero/Horo';
import CustomNavbar from '../../components/Navbar';
import Footer from '../about-page/components/Footer';

function page() {
  return (
    <div className='max-w-[1700px] mx-auto bg-customNavBg'>
      <CustomNavbar bgColor='bg-transparent' />
      <main className='font-proximanova'>
        <HeroSection />
      </main>
      <Footer />
    </div>
  );
}

export default page;
