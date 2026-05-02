'use client';
import { usePathname } from 'next/navigation';
import FashionDesignerHeader from './studio-page-components/FashionDesignerHeader';
import Footer from '../../../components/landing-page-components/Footer';

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  
  // Define routes where the navbar and footer should be hidden (Onboarding pages)
  const isOnboarding = pathname === '/fashion-designers/personal-details';

  if (isOnboarding) {
    return <main className='font-satoshi h-full'>{children}</main>;
  }

  return (
    <>
      <FashionDesignerHeader />
      <main className='font-satoshi pt-20 h-full'>{children}</main>
      <Footer />
    </>
  );
}
