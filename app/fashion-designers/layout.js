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

  // The Header is hidden on mobile for dynamic artist profile routes (/fashion-designers/[id]),
  // but MUST display on standardized application pages.
  const coreAppRoutes = [
    '/fashion-designers/contracts',
    '/fashion-designers/my-projects',
    '/fashion-designers/my-collection',
    '/fashion-designers/messages',
    '/fashion-designers/profile',
    '/fashion-designers/transactions',
    '/fashion-designers/settings'
  ];

  const isDynamicProfileRoute = pathname.match(/^\/fashion-designers\/[^/]+$/);
  const hideMobileHeader = isDynamicProfileRoute && !coreAppRoutes.includes(pathname);
  const isContractInfoRoute = pathname.includes('/contracts/ongoing/') || pathname.includes('/contracts/pending/') || pathname.includes('/contracts/completed/');

  return (
    <>
      <div className={SECTION_SHELL_CLASS}>
        {!isOnboarding && (
          <div className={`${hideMobileHeader || isContractInfoRoute ? 'hidden lg:block' : ''}`}>
            <FashionDesignerHeader />
          </div>
        )}
        <SectionMain withNavbarOffset={!isOnboarding && !hideMobileHeader} fontClass='font-satoshi'>
          {children}
        </SectionMain>
        {!isOnboarding && <Footer />}
      </div>
      {showFloatingButton && !isOnboarding && <FloatingButton />}
    </>
  );
}
