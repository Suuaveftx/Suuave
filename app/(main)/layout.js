'use client';

import { HeroUIProvider } from '@heroui/react';
import CustomNavbar from '../../components/Navbar';
import Footer from '../../components/landing-page-components/Footer';
import { useRoleRedirect } from '../../hooks/useRoleRedirect';
import { authClient } from '../../lib/auth-client';
import { useEffect } from 'react';

export default function Layout({ children }) {
  const { data: session } = authClient.useSession();
  const { redirectUser } = useRoleRedirect();

  useEffect(() => {
    if (session) {
      redirectUser(session.user.role);
    }
  }, [session, redirectUser]);

  if (session) {
    return null;
  }
  return (
    <HeroUIProvider>
      <div className='max-w-[1700px] mx-auto bg-customNavBg'>
        <CustomNavbar bgColor='bg-transparent' mobileLogo="/dev-images/LogoMark.png" desktopLogo="/dev-images/SuaaveTxtWhite.png" />
        <main className='font-proximanova'>{children}</main>
        <Footer />
      </div>
    </HeroUIProvider>
  );
}
