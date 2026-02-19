'use client';
import {
  Link,
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarBrand,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from '@heroui/react';
import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import CustomButton from './CustomButton';
<<<<<<< HEAD
import {
  ChevronDown,
  User,
  CreditCard,
  HelpCircle,
  Settings,
  LogOut,
} from 'lucide-react';
import Image from 'next/image';
import { signOut } from '../app/actions/services';
=======
import { ChevronDown, Bell, CreditCard, Mail, Lock, User as UserIcon, Settings, HelpCircle } from 'lucide-react';
import { LuCircleUser } from "react-icons/lu";
import { TbLogout2 } from "react-icons/tb";
import Image from 'next/image';
import Notification from './Notification';
>>>>>>> development

const ArtistNavbar = () => {
  const [textStyle, setTextStyle] = useState('text-black');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("activeCategory");
    window.location.href = '/';
  };

  const isActive = (path) => {
    if (path === '/artist-page/project-page') {
      return pathname === path || pathname.startsWith('/artist-page/job-details-page');
    }
    if (path === '/artist-page/my-contracts-old') {
<<<<<<< HEAD
      return (
        pathname === path ||
        pathname.startsWith('/artist-page/ongoing-contract-information')
      );
=======
      return pathname === path ||
        pathname.startsWith('/artist-page/ongoing-contract-information') ||
        pathname.startsWith('/artist-page/pending-contract-information') ||
        pathname.startsWith('/artist-page/completed-contract-information');
    }
    if (path === '/artist-page/my-proposals') {
      return pathname === path ||
        pathname.startsWith('/artist-page/proposal-active') ||
        pathname.startsWith('/artist-page/closed-project');
>>>>>>> development
    }
    return pathname === path;
  };

  const menuItems = [
    { label: 'Jobs', href: '/artist-page/project-page' },
    { label: 'My Proposals', href: '/artist-page/my-proposals' },
    { label: 'My Contracts', href: '/artist-page/my-contracts-old' },
  ];

  const mobileMenuItems = [
    { label: 'Jobs', href: '/artist-page/project-page' },
    { label: 'My Proposals', href: '/artist-page/my-proposals' },
    { label: 'My Contracts', href: '/artist-page/my-contracts-old' },
  ];

  const handleArtistLogout = async () => {
    // await authClient.signOut();
    await signOut();
  };

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      shouldHideOnScroll={false}
      position='static'
      disableScrollHandler
      className='w-full bg-[#EAF9FF] items-center font-satoshi border-b border-gray-200 flex-nowrap h-[80px]'
      classNames={{ wrapper: 'max-w-[1700px] h-full px-6 sm:px-10 mx-auto' }}
      onMenuOpenChange={setIsMenuOpen}
    >
      {/* LOGO */}
      <NavbarBrand>
        <div className="flex items-center gap-3">
          <Link href='/artist-page' className="sm:border-l sm:border-[#8E8E8E]/30 sm:pl-3">
            <Image
              src='/dev-images/logocombo.png'
              alt='Logo'
              className='w-32 sm:w-40 h-auto object-contain'
              width={140}
              height={40}
            />
          </Link>
        </div>
      </NavbarBrand>

      {/* MENU */}
<<<<<<< HEAD
      <NavbarContent
        className='hidden sm:flex gap-8 ml-8 font-bold h-full'
        justify='center'
      >
=======
      <NavbarContent className='hidden sm:flex gap-9 font-bold h-full' justify='center'>
>>>>>>> development
        {menuItems.map((item, index) => (
          <NavbarItem key={index} className='h-full flex items-center'>
            <Link
              href={item.href}
              className={`${textStyle} transition duration-300 relative flex items-center h-full`}
            >
              <motion.div
                animate={isActive(item.href) ? 'hovered' : 'initial'}
                whileHover='hovered'
                className='relative flex items-center h-full'
              >
                {item.label}
                <motion.div
                  variants={{
                    initial: { scaleX: 0 },
                    hovered: { scaleX: 1 },
                  }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  className='absolute bottom-[20px] left-0 w-full h-[2px] bg-[#222222] origin-left'
                />
              </motion.div>
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify='end' className='gap-3 sm:gap-6'>
        <NavbarItem className='hidden lg:flex'>
          <CustomButton
            text='License Your Designs'
            href={'/artist-page/license-your-design'}
          />
        </NavbarItem>

<<<<<<< HEAD
        <div className='flex gap-2'>
          <NavbarItem className='hidden lg:flex'>
            <Image src='/dev-images/Bell.png' alt='Bell' width={24} height={24} />
          </NavbarItem>
          <NavbarItem className='hidden lg:flex'>
            <Link href='/artist-page/messages'>
              <Image
                src='/dev-images/Messages.png'
                alt='Messages'
                width={24}
                height={24}
              />
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
              className={`w-5 h-5 text-gray-600 transition-transform ${
                isOpen ? 'rotate-180' : ''
              }`}
=======
        <NavbarItem className='flex'>
          <Notification />
        </NavbarItem>

        <NavbarItem className='flex'>
          <Link href='/artist-page/messages'>
            <Image
              src='/dev-images/Messages.png'
              alt='Messages'
              width={28}
              height={28}
              className="w-6 h-6 sm:w-7 sm:h-7"
>>>>>>> development
            />
          </Link>
        </NavbarItem>

        {/* PROFILE DROPDOWN / AVATAR */}
        <NavbarItem className='flex'>
          <Dropdown shouldBlockScroll={false}>
            <DropdownTrigger>
              <button className="flex items-center gap-2 outline-none bg-transparent border-none cursor-pointer p-0">
                <Avatar
                  src="/dev-images/Avatar.png"
                  className="w-10 h-10 rounded-full border border-gray-200"
                />
                <ChevronDown className="hidden sm:block w-4 h-4 text-gray-600" />
              </button>
            </DropdownTrigger>
            <DropdownMenu aria-label="User actions" className="w-[200px]">
              <DropdownItem
                startContent={<LuCircleUser className="size-4" />}
                key="profile"
                as={Link}
                href="/artist-page/profile-for-artist"
              >
                Profile
              </DropdownItem>
              <DropdownItem
                startContent={<CreditCard className="size-4" />}
                key="wallet"
                as={Link}
                href="/artist-page/wallet"
              >
                Wallet
              </DropdownItem>
              <DropdownItem
                startContent={<Settings className="size-4" />}
                key="settings"
                as={Link}
                href="/artist-page/settings"
              >
                Settings
<<<<<<< HEAD
              </Link>

              <div
                onClick={() => handleArtistLogout}
                className='flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer'
=======
              </DropdownItem>
              <DropdownItem
                startContent={<HelpCircle className="size-4" />}
                key="help"
                as={Link}
                href="/artist-page/help"
              >
                Help and support
              </DropdownItem>
              <DropdownItem
                startContent={<TbLogout2 className="size-4" />}
                key="logout"
                className="text-danger"
                color="danger"
                onPress={handleLogout}
>>>>>>> development
              >
                Logout
<<<<<<< HEAD
              </div>
            </div>
          )}
        </div>

        <Link className='lg:hidden text-black'>Login</Link>

        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className='sm:hidden text-black font-bold text-lg size-6'
        />
=======
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>

        <NavbarItem className='sm:hidden'>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className='flex items-center justify-center border border-gray-200 rounded-full p-2 h-10 w-10 text-gray-600 bg-white z-50'
          />
        </NavbarItem>
>>>>>>> development
      </NavbarContent>

      {/* MOBILE MENU */}
      <NavbarMenu>
        {mobileMenuItems.map((item, index) => (
          <NavbarMenuItem key={index}>
            <Link
              className='w-full text-black transition duration-300'
              href={item.href}
              size='lg'
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default ArtistNavbar;
