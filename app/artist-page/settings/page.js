import React from 'react';
import SettingsPage from './_components/Settings-Page';
import PageContainer from '../../../components/layout/PageContainer';

const Page = () => {
  return (
    <div className='w-full bg-[#F1F1F1] min-h-screen'>
      <PageContainer>
        <div className='flex gap-8 mt-0 md:mt-4'>
          <SettingsPage />
        </div>
      </PageContainer>
    </div>
  );
};

export default Page;
