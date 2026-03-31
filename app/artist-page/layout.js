import React from 'react';
import { requireAuth } from '../../lib/protected-routes';
import { Roles } from '../../utils/enum';
import { getServerSession } from '../../lib/get-session';
import { redirect } from 'next/navigation';

async function ProjectPageLayout({ children }) {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) {
    redirect('/auth/login');
  }
  await requireAuth(Roles.artist);
  return <>{children}</>;
}

export default ProjectPageLayout;
