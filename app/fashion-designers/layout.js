'use client';

import Footer from '../../components/landing-page-components/Footer';
import FashionDesignerHeader from './_components/studio-page-components/FashionDesignerHeader';
import { usePathname } from 'next/navigation';

export default function Layout({ children }) {
  const pathname = usePathname();
  const isPersonalDetails = pathname === '/fashion-designers/personal-details';

  return (
    <div className='mx-auto bg-[#DBDBDB]/30 min-h-screen'>
      {!isPersonalDetails && <FashionDesignerHeader />}
      <main className={`font-satoshi ${!isPersonalDetails ? 'pt-[80px]' : ''}`}>
        {children}
      </main>
      {!isPersonalDetails && <Footer />}
    </div>
  );
}
