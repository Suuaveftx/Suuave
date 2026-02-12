'use client';
import React from 'react';
import Otp from './_components/Otp';
import { useRouter, useSearchParams } from 'next/navigation';
import { authClient } from '../../../lib/auth-client';

const page = () => {
  const searchParams = useSearchParams();
  const route = useRouter();
  const email = searchParams.get('email');
  const { data: session } = authClient.getSession();
  const user = session?.user;
  // if (!user) {
  //   route.push('/auth/login');
  // }

  return (
    <div>
      <Otp email={email} />
    </div>
  );
};

export default page;
