'use client';
import {
  Link,
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
} from '@heroui/react';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import CustomButton from './CustomButton';
import { ChevronDown, User, CreditCard, HelpCircle, Settings, LogOut } from 'lucide-react';
import Image from 'next/image';

const Navbars = () => {
  const [textStyle, setTextStyle] = useState('text-black');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path) => {
    if (path === '/artist-page/project-page') {
      return pathname === path || pathname.startsWith('/artist-page/job-details-page');
    }
    if (path === '/artist-page/my-contracts-old') {
      return pathname === path || pathname.startsWith('/artist-page/ongoing-contract-information');
    }
    return pathname === path;
  };

  const menuItems = [
    { label: 'Jobs', href: '/artist-page/project-page' },
    { label: 'My Proposals', href: '/artist-page/my-proposals' },
    { label: 'My Contracts', href: '/artist-page/my-contracts-old' },
    { label: 'Profile', href: '/artist-page/profile-for-artist' },
  ];

  const mobileMenuItems = [
    { label: 'Home', href: '/artist-page' },
    { label: 'Jobs', href: '/artist-page/project-page' },
    { label: 'My Proposals', href: '/artist-page/my-proposals' },
    { label: 'My Contracts', href: '/artist-page/my-contracts-old' },
    { label: 'Profile', href: '/artist-page/profile-for-artist' },
    { label: 'Settings', href: '/artist-page/settings' },
  ];

  return (
    <Navbar
      shouldHideOnScroll
      className='w-full bg-[#CCE7F2] items-center font-satoshi shadow-md px-2 flex-nowrap h-[80px]'
      classNames={{ wrapper: 'max-w-[1700px] h-full' }}
      onScrollPositionChange={(position) => {
        setTextStyle(position > 600 ? 'text-yellow-500' : 'text-black');
      }}
      onMenuOpenChange={setIsMenuOpen}
    >
      {/* LOGO */}
      <div>
        <Link href='/artist-page'>
          <Image
            src='/dev-images/logocombo.png'
            alt='Logo'
            className='lg:w-32 w-24 h-auto object-contain'
            width={140}
            height={40}
          />
        </Link>
      </div>

      {/* MENU */}
      <NavbarContent className='hidden sm:flex gap-8 ml-8 font-bold h-full' justify='center'>
        {menuItems.map((item, index) => (
          <NavbarItem key={index} className="h-full flex items-center">
            <Link
              href={item.href}
              className={`${textStyle} transition duration-300 relative flex items-center h-full`}
            >
              <motion.div
                animate={isActive(item.href) ? "hovered" : "initial"}
                whileHover="hovered"
                className="relative flex items-center h-full"
              >
                {item.label}
                <motion.div
                  variants={{
                    initial: { scaleX: 0 },
                    hovered: { scaleX: 1 }
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  className="absolute bottom-[28px] left-0 w-full h-[2px] bg-[#222222] origin-left"
                />
              </motion.div>
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* LOGIN & BUTTON */}
      <NavbarContent justify='end' className='gap-8'>
        <NavbarItem>
          <CustomButton
            className='hidden lg:flex'
            text='License Your Designs'
            href={'/artist-page/license-your-design'}
          />
        </NavbarItem>

        <div className='flex gap-2'>
          <NavbarItem className='hidden lg:flex'>
            <Image src='/dev-images/Bell.png' alt='Bell' width={24} height={24} />
          </NavbarItem>
          <NavbarItem className='hidden lg:flex'>
            <Link href='/artist-page/messages'>
              <Image src='/dev-images/Messages.png' alt='Messages' width={24} height={24} />
            </Link>
          </NavbarItem>
        </div>

        {/* PROFILE DROPDOWN */}
        <div className='relative'>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='flex items-center space-x-2 focus:outline-none'
          >
            <div className='w-[42px] h-[42px] rounded-full overflow-hidden relative'>
              <Image
                src='/dev-images/Avatar.png'
                alt='Avatar'
                className='object-cover'
                width={42}
                height={42}
              />
            </div>

            <ChevronDown
              className={`w-5 h-5 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''
                }`}
            />
          </button>

          {/* Dropdown Menu */}
          {/* Dropdown Menu */}
          {isOpen && (
            <div className='absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2'>
              <Link
                href='/artist-page/profile-for-artist'
                className='flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100'
              >
                <div className='w-6 h-6 flex items-center justify-center rounded-full border-1 border-[#000000]'>
                  <User className='w-3 h-3 text-[#222222]' />
                </div>
                My Profile
              </Link>

              <Link
                href='/artist-page/wallet'
                className='flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100'
              >
                <div className='w-6 h-6 flex items-center justify-center rounded-full border-1 border-[#000000]'>
                  <CreditCard className='w-3 h-3 text-[#222222]' />
                </div>
                Wallet
              </Link>

              <Link
                href='/artist-page/help'
                className='flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100'
              >
                <div className='w-6 h-6 flex items-center justify-center rounded-full border-1 border-[#000000]'>
                  <HelpCircle className='w-3 h-3 text-[#222222]' />
                </div>
                Help And Support
              </Link>

              <Link
                href='/artist-page/settings'
                className='flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100'
              >
                <div className='w-6 h-6 flex items-center justify-center rounded-full border-1 border-[#000000]'>
                  <Settings className='w-3 h-3 text-[#222222]' />
                </div>
                Settings
              </Link>

              <div
                onClick={() => {
                  localStorage.removeItem('activeCategory');
                  window.location.href = '/';
                }}
                className='flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer'
              >
                <div className='w-6 h-6 flex items-center justify-center rounded-full border-1 border-[#000000]'>
                  <LogOut className='w-3 h-3 text-[#222222]' />
                </div>
                Logout
              </div>
            </div>
          )}

        </div>

        <Link className='lg:hidden text-black'>Login</Link>

        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className='sm:hidden text-black font-bold text-lg size-6'
        />
      </NavbarContent>

      {/* MOBILE MENU */}
      <NavbarMenu>
        {mobileMenuItems.map((item, index) => (
          <NavbarMenuItem key={index}>
            <Link className='w-full text-black transition duration-300' href={item.href} size='lg'>
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default Navbars;
