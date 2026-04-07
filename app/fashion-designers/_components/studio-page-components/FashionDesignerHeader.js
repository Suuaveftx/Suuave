'use client';
import {
  Button,
  Image,
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
      className='fixed top-0 h-[80px] border-b bg-[#CCE7F2] z-[999]'
      classNames={{ wrapper: 'pl-0 pr-4 lg:px-14' }}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarBrand className='sm:justify-start justify-start max-w-fit'>
        <Link href='/fashion-designers'>
          {/* Mobile Logo */}
          <Image
            disableAnimation
            src='/dev-images/logomobile.png'
            alt='Suaave'
            className='w-[140px] h-[140px] object-contain object-left lg:hidden -ml-6'
          />
          {/* Desktop Logo */}
          <Image
            disableAnimation
            src='/dev-images/SuuaveTxt.png'
            alt='Suaave'
            className='w-32 max-h-10 object-contain hidden lg:block'
          />
        </Link>
      </NavbarBrand>

      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        <NavLinks />
      </NavbarContent>

      <NavbarContent justify='end'>
        <UserActions />
        {/* Hamburger Toggle (mobile only, after avatar) */}
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className='sm:hidden text-black font-bold text-lg size-6'
        />
      </NavbarContent>

      <NavbarMenu className='bg-[#CCE7F2] pt-8'>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.label}-${index}`} className='py-3'>
            <Link className='w-full ' color='foreground' href={item.href} size='lg'>
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default FashionDesignerHeader;
