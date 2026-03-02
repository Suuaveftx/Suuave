'use client';

import { HeroUIProvider } from '@heroui/react';
import CustomNavbar from '../../components/Navbar';
import Footer from '../../components/landing-page-components/Footer';
import { useRoleRedirect } from '../../hooks/useRoleRedirect';
import { authClient } from '../../lib/auth-client';

export default function Layout({ children }) {
  const { data: session } = authClient.useSession();
  const { redirectUser } = useRoleRedirect();

  if (session) {
    return redirectUser(session.user.role);
  }
  return (
    <HeroUIProvider>
      <div className='max-w-[1700px] mx-auto bg-customNavBg'>
        <CustomNavbar bgColor='bg-transparent' />
        <main className='font-proximanova'>{children}</main>
        <Footer />
      </div>
    </HeroUIProvider>
  );
}
