import React from 'react';
import MyProjects from './components/my-projects';
import PageContainer from '../../../components/layout/PageContainer';

export default function Page() {
  return (
    <>
      <PageContainer className="!px-0 sm:!px-4 md:!px-6 lg:!px-8">
        <MyProjects />
      </PageContainer>
    </>
  );
}
