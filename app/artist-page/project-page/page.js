'use client';
import React, { use } from 'react';

import Footer3 from '../../../components/Footer3';
import SearchBar from '../../../components/Searchbar';
import ProjectPage from './_components/Project-Page';
import { BsExclamationTriangle } from 'react-icons/bs';
import { signOut } from '../../actions/services';
import { authClient } from '../../../lib/auth-client';
import { useRouter } from 'next/navigation';

const Page = () => {
  // const router = useRouter();
  // const { data: session } = authClient.useSession(); // Note: Better Auth uses useSession() for hooks
  // const user = session?.user;
  // if (!user) {
  //   console.log('User signed out!!');
  //   router.push('/auth/login');
  // }

  return (
    <>
      <div className='hidden lg:flex bg-[#EFF8FB] text-[#3A98BB] p-4 rounded-md mt-4  ml-4 mr-4 mb-8'>
        <BsExclamationTriangle className='text-2xl' />
        <h3 className='ml-2 font-bold text-base pt-1'>Complete your profile setup</h3>
      </div>

      <div className='flex justify-center w-full lg:mx-0  mt-6'>
        <div className='lg:w-full lg:max-w-[75%] w-[90%]'>
          <SearchBar placeholder='Search Jobs' />
        </div>
      </div>
      <div>
        <ProjectPage />
      </div>
      <div className='bg-[#12333E] mt-8'>
        <Footer3 />
      </div>
    </>
  );
};

export default Page;
