import React from 'react';
import { requireAuth } from '../../lib/protected-routes';
import { Roles } from '../../utils/enum';

async function ProjectPageLayout({ children }) {
  await requireAuth(Roles.artist);
  return <>{children}</>;
}

export default ProjectPageLayout;
