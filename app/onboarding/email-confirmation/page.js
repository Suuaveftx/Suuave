'use client';
import Otp from './_components/Otp';
import { useSearchParams } from 'next/navigation';
import { authClient } from '../../../lib/auth-client';
import { useRoleRedirect } from '../../../hooks/useRoleRedirect';
import { useEffect } from 'react';
import Loading from './loading';

const Page = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const { redirectUser } = useRoleRedirect();
  useEffect(() => {
    // 2. Only redirect if a user actually exists AND is already verified
    // If they aren't verified, stay here to show the OTP input
    if (user && user.emailVerified) {
      redirectUser(user.role);
    }
  }, [user, redirectUser]);

  if (isPending) {
    return <Loading />;
  }
  return (
    <div>
      <Otp email={email} />
    </div>
  );
};

export default Page;
