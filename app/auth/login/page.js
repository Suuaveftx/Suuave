import React from 'react';
import Login from './_components/Login';
import { redirectIfAuthenticated } from '../../../lib/auth-guards';

const page = async () => {
  await redirectIfAuthenticated();

  return (
    <div>
      <Login />
      <Login />
    </div>
  );
};

export default page;
