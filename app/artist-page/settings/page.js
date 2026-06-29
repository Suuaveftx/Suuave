import React from 'react';
import SettingsPage from './_components/Settings-Page';
import PageContainer from '../../../components/layout/PageContainer';

const Page = () => {
  return (
    <div className='w-full h-full bg-[#F1F1F1] overflow-hidden'>
      <PageContainer withTopSpacing>
        <div className='flex gap-8 mt-2'>
          <SettingsPage />
        </div>
      </PageContainer>
    </div>
  );
};

export default Page;
