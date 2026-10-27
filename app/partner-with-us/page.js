import React from 'react';
import CustomNavbar from '../../components/Navbar';
import Footer from '../about-page/components/Footer';
import PartnerWithUsForm from './components/PartnerWithUsForm';

const Page = () => {
  return (
    <>
      <CustomNavbar
        bgColor='bg-[#012D3E]'
        mobileLogo="/dev-images/LogoMark.png"
        desktopLogo="/dev-images/SuaaveTxtWhite.png"
      />
      <div className=' bg-[#FAFAFA] flex flex-col items-center font-proximanova p-3 md:p-14 '>
        <h1 className=' text-[#222222] font-bold text-2xl text-center tracking-wide mt-5'>
          PARTNER WITH US
        </h1>
        <div className='flex justify-center flex-col font-normal text-base mt-5'>
          <p className='text-center '>We are open to partnership.</p>
          <span className=' text-center'>
            {' '}
            You can also send an email to
            <br className='md:hidden' />{' '}
            <a className='font-bold' href='mailto:info@suuave.com'>
              info@suuave.com
            </a>
          </span>
        </div>

        <PartnerWithUsForm />
      </div>
      <Footer />
    </>
  );
};

export default Page;
