import React from 'react';
import ChooseCategory from './_components/Choose-Category';
import { getServerSession } from '../../../lib/get-session';
import { Roles } from '@suuaveftx/prisma-shared';
import { redirect } from 'next/navigation';

const page = async () => {
  const session = await getServerSession();
  const user = session.user;
  console.log(user);
  if (!user.role === Roles.user_pending) {
    redirect('/auth');
  }
  return (
    <div>
      <ChooseCategory user={user} />
    </div>
  );
};

export default page;
