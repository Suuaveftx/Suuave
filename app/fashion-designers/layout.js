'use client';

import { usePathname } from 'next/navigation';
import Footer from '../../components/landing-page-components/Footer';
import FashionDesignerHeader from './_components/studio-page-components/FashionDesignerHeader';
import FloatingButton from './_components/FloatingButton';
import SectionMain from '../../components/layout/SectionMain';
import {
  FASHION_ONBOARDING_ROUTES,
  SECTION_SHELL_CLASS,
} from '../../components/layout/layoutConstants';

export default function Layout({ children }) {
  const pathname = usePathname();
  const isOnboarding = FASHION_ONBOARDING_ROUTES.some((route) =>
    pathname.startsWith(route)
  );
  const showFloatingButton = pathname === '/fashion-designers';

  return (
    <>
      <div className={SECTION_SHELL_CLASS}>
        {!isOnboarding && <FashionDesignerHeader />}
        <SectionMain withNavbarOffset={!isOnboarding} fontClass='font-satoshi'>
          {children}
        </SectionMain>
        {!isOnboarding && <Footer />}
      </div>
      {showFloatingButton && !isOnboarding && <FloatingButton />}
    </>
  );
}
