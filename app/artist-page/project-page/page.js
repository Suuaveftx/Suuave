'use client';
import React, { use } from 'react';

import SearchBar from '../../../components/Searchbar';
import ProjectPage from './_components/Project-Page';
import { BsExclamationTriangle } from 'react-icons/bs';
import { signOut } from '../../actions/services';
import { authClient } from '../../../lib/auth-client';
import { useRouter } from 'next/navigation';
import PageContainer from '../../../components/layout/PageContainer';

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
      <PageContainer withTopSpacing>
        <div className='flex items-center gap-2 bg-[#EFF8FB] text-[#3A98BB] px-4 py-3 mt-2 rounded-lg'>
          <BsExclamationTriangle className='text-xl flex-shrink-0' />
          <h3 className='font-bold text-sm lg:text-base'>Complete your profile setup</h3>
        </div>

        <div className='flex justify-center w-full mt-6'>
          <div className='w-full'>
            <SearchBar placeholder='Search Jobs' />
          </div>
        </div>

        <div className='mt-6 mb-20'>
          <ProjectPage />
        </div>
      </PageContainer>
    </>
  );
};

export default Page;
