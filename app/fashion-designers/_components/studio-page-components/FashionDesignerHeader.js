'use client';
import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@heroui/react';
import React from 'react';
import { UserActions } from '../UserActions';
import { NavLinks } from '../NavLinks';
import Image from 'next/image';
import PageContainer from '@/components/layout/PageContainer';
import { NAVBAR_HEIGHT_CLASS } from '@/components/layout/layoutConstants';

const FashionDesignerHeader = () => {
  const menuItems = [
    { label: 'Designs', href: '/fashion-designers' },
    { label: 'My Projects', href: '/fashion-designers/my-projects' },
    { label: 'My Contracts', href: '/fashion-designers/contracts' },
    { label: 'My Collections', href: '/fashion-designers/my-collection' },
  ];
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }, [isMenuOpen]);

  return (
    <Navbar
      shouldHideOnScroll={false}
      maxWidth='full'
      className={`fixed top-0 z-50 w-full border-b bg-[#CCE7F2] ${NAVBAR_HEIGHT_CLASS}`}
      classNames={{ wrapper: 'w-full max-w-full px-0 h-full' }}
      onMenuOpenChange={setIsMenuOpen}
    >
      <PageContainer className="flex items-center justify-between w-full h-full">
        <NavbarBrand>
          <Link href='/fashion-designers'>
            {/* Mobile: dolphin icon only - cropped from logocombo */}
            <div className='block sm:hidden w-14 h-14 overflow-hidden -ml-2.5'>
              <Image
                src='/dev-images/logocombo.png'
                alt='Logo'
                className='w-[68px] h-14 object-cover object-left'
                width={68}
                height={56}
              />
            </div>
            {/* Desktop/Tablet Logo */}
            <Image
              src='/dev-images/SuuaveTxt.png'
              alt='Suaave'
              className='w-32 h-auto object-contain hidden sm:block'
              width={128}
              height={40}
            />
          </Link>
        </NavbarBrand>

        <NavbarContent className='hidden sm:flex gap-4' justify='center'>
          <NavLinks />
        </NavbarContent>

        <NavbarContent justify='end'>
          <UserActions />
          {/* Hamburger Toggle (mobile only) */}
          <NavbarMenuToggle
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className='sm:hidden text-black font-bold text-lg size-6'
          />
        </NavbarContent>
      </PageContainer>

      <NavbarMenu className='bg-[#CCE7F2] pt-8'>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.label}-${index}`} className='py-3'>
            <Link className='w-full' color='foreground' href={item.href} size='lg'>
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default FashionDesignerHeader;
