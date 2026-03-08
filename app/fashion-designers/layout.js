'use client';

import Footer from '../../components/landing-page-components/Footer';
import FashionDesignerHeader from './_components/studio-page-components/FashionDesignerHeader';
import { usePathname } from 'next/navigation';
import { BookmarkProvider } from './_components/BookmarkContext';

export default function Layout({ children }) {
  const pathname = usePathname();
  const isPersonalDetails = pathname === '/fashion-designers/personal-details';

  return (
    <BookmarkProvider>
      <div className='mx-auto bg-[#DBDBDB]/30 pt-[80px] min-h-screen'>
        {!isPersonalDetails && <FashionDesignerHeader />}
        <main className='font-satoshi h-full'>{children}</main>
        {!isPersonalDetails && <Footer />}
      </div>
    </BookmarkProvider>
  );
}
