import React from 'react';
import MyProjects from './components/my-projects';
import PageContainer from '../../../components/layout/PageContainer';

export default function Page() {
  return (
    <>
      <PageContainer withTopSpacing>
        <MyProjects />
      </PageContainer>
    </>
  );
}
