import React from 'react';
import CustomNavbar from '../../components/Navbar';
import Footer from '../about-page/components/Footer';

const page = () => {
  return (
    <>
      <CustomNavbar bgColor='bg-[#012D3E]' />
      <div className=' bg-[#FAFAFA] flex flex-col items-center font-proximanova p-3 md:p-14 '>
        <h1 className=' text-[#222222] font-bold text-2xl text-center tracking-wide mt-5'>
          PARTNER WITH US
        </h1>
        <div className='flex justify-center flex-col font-normal text-base mt-5'>
          <p className='text-center '>We are open to partnership.</p>
          <span className=' text-center'>
            {' '}
            You can send us an email <br className='md:hidden' />{' '}
            <span className='font-bold'>info@suuave.com</span>
          </span>
        </div>

        <form className='flex flex-col  items-center w-full lg:w-[60%] rounded-lg mt-10 md:mt-14 bg-[#035A7A] p-5 md:p-10'>
          <h1 className='text-[#F5F5F5] font-bold text-xl'>DROP A MESSAGE</h1>
          <div className='flex flex-col md:flex-row items-center mt-5 gap-5 md:gap-10 w-full'>
            <label className='flex flex-col w-full font-normal text-base text-[#F5F5F5] '>
              Name
              <input className='p-2 outline-none rounded-lg bg-[#F0F0F0] text-[#222222]' />
            </label>
            <label className='flex flex-col w-full font-normal text-base text-[#F5F5F5] '>
              Email Address
              <input className='p-2 outline-none rounded-lg bg-[#F0F0F0] text-[#222222]' />
            </label>
          </div>

          <label className='flex flex-col w-full mt-5 font-normal text-base text-[#F5F5F5] '>
            Leave a Message
            <textarea className='px-2 py-10 outline-none rounded-lg bg-[#F0F0F0] text-[#222222]' />
          </label>
          <button className=' shadow-md mt-10 w-[70%] py-3 cursor-pointer bg-[radial-gradient(circle,#EAF9FF,#CCE7F2)] font-bold text-base text-[#035A7A] rounded-3xl  px-6'>
            Send
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default page;
