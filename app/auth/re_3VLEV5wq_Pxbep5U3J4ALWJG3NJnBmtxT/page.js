import React from 'react';

import { redirect } from 'next/navigation';
import getRoleRoute from '../../../lib/get-role-route';
import { getServerSession } from '../../../lib/get-session';

async function Page() {
  const session = await getServerSession();
  const user = session.user;

  if (!session?.user) {
    redirect('/auth/login');
  }
  const targetPath = getRoleRoute(user.role);

  redirect(targetPath);

  return null;
}

export default Page;
