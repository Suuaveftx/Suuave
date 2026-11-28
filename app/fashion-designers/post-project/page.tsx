'use client';

import { Suspense } from 'react';
import PostProjectForm from './_components/PostProjectForm';

const Page = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <PostProjectForm />
  </Suspense>
);

export default Page;
