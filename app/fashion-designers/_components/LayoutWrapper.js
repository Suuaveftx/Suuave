'use client';

import { usePathname } from 'next/navigation';
import FashionDesignerHeader from './studio-page-components/FashionDesignerHeader';
import Footer from '../../../components/landing-page-components/Footer';
import SectionMain from '../../../components/layout/SectionMain';
import { FASHION_ONBOARDING_ROUTES } from '../../../components/layout/layoutConstants';

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isOnboarding = FASHION_ONBOARDING_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if (isOnboarding) {
    return <main className='font-satoshi h-full'>{children}</main>;
  }

  return (
    <>
      <FashionDesignerHeader />
      <SectionMain fontClass='font-satoshi'>{children}</SectionMain>
      <Footer />
    </>
  );
}
