'use client';

import { HeroUIProvider } from '@heroui/react';
import Navbars from '../../../components/ArtistNavbar';

export default function Layout({ children }) {
  return (
    <HeroUIProvider>
      <div className='max-w-[1700px]'>
        {/* Navbar */}
        <Navbars />
        {/* Main Content */}
        <main className='font-proximanova pt-20 lg:pt-20'>{children}</main>
      </div>
    </HeroUIProvider>
  );
}
