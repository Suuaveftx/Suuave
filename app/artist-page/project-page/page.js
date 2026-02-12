'use client';
import React from 'react';

import Footer3 from '../../../components/Footer3';
import SearchBar from '../../../components/Searchbar';
import ProjectPage from './_components/Project-Page';
import { BsExclamationTriangle } from 'react-icons/bs';
import { signOut } from '../../actions/services';

const Page = () => {
  const handleLogout = async () => {
    await signOut();
  };
  return (
    <>
      <div className='hidden lg:flex bg-[#EFF8FB] text-[#3A98BB] p-4 rounded-md mt-4  ml-4 mr-4 mb-8'>
        <BsExclamationTriangle className='text-2xl' />
        <h3 className='ml-2 font-bold text-base pt-1'>Complete your profile setup</h3>
      </div>
      <button onClick={handleLogout}>Logout</button>
      <div className='flex justify-center w-full lg:mx-0  mt-6'>
        <div className='lg:w-full lg:max-w-[75%] w-[90%]'>
          <SearchBar placeholder='search jobs' />
        </div>
      </div>
      <div>
        <ProjectPage />
      </div>
      <div className='m-4 w-full bg-[#12333E]'>
        <Footer3 />
      </div>
    </>
  );
};

export default Page;
