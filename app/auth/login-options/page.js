import React from 'react';
import LoginOptions from './_components/Login-Options';
import { redirectIfAuthenticated } from '../../../lib/auth-guards';

const page = async () => {
  await redirectIfAuthenticated();
  return (
    <div>
      <LoginOptions />
      <LoginOptions />
    </div>
  );
};

export default page;
