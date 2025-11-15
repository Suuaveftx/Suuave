import { headers } from 'next/headers';
import { cache } from 'react';
import { auth } from './auth';

// use only in server components. cached it so it doesnt run twice
export const getServerSession = cache(async () => {
  return await auth.api.getSession({ headers: await headers() });
});
