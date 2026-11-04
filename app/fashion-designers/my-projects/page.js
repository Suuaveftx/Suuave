import React, { Suspense } from 'react';
import MyProjects from './components/my-projects';
import PageContainer from '../../../components/layout/PageContainer';

export default function Page() {
  return (
    <>
      <PageContainer className="!px-0 sm:!px-4 md:!px-6 lg:!px-8">
        <Suspense
          fallback={
            <p role='status' className='py-12 text-center text-gray-500'>
              Loading projects...
            </p>
          }
        >
          <MyProjects />
        </Suspense>
      </PageContainer>
    </>
  );
}
