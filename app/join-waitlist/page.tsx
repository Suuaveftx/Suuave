import React from 'react';
import HeroSection from './_components/Hero/Horo';
import CustomNavbar from 'components/Navbar';
import Footer from 'app/about-page/components/Footer';

function Page() {
  return (
    <div className='max-w-[1700px] mx-auto bg-customNavBg'>
      <CustomNavbar bgColor='bg-transparent' mobileLogo="/dev-images/LogoMark.png" desktopLogo="/dev-images/SuaaveTxtWhite.png" />
      <main className='font-proximanova'>
        <HeroSection />
      </main>
      <Footer />
    </div>
  );
}

export default Page;
