import { headers } from 'next/headers';
import { auth } from '../lib/auth';

export async function useAuth() {
  'use server';

  const isAuthenticated = auth.api.getSession({
    headers: await headers(),
  });

  return { isAuthenticated };
}
