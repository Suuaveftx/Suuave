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
  Button,
} from '@heroui/react';
import { FaEnvelope } from 'react-icons/fa';
import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import CustomButton from './CustomButton';
import {
  ChevronDown,
  Bell,
  CreditCard,
  Mail,
  Lock,
  User as UserIcon,
  Settings,
  HelpCircle,
} from 'lucide-react';
import { LuCircleUser } from 'react-icons/lu';
import { TbLogout2 } from 'react-icons/tb';
import Image from 'next/image';
import Notification from './Notification';
import { signOut } from '../app/actions/services';
import PageContainer from './layout/PageContainer';

const ArtistNavbar = () => {
  const [textStyle, setTextStyle] = useState('text-black');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path) => {
    if (path === '/artist-page/project-page') {
      return pathname === path || pathname.startsWith('/artist-page/job-details-page');
    }
    if (path === '/artist-page/my-contracts') {
      return (
        pathname === path ||
        pathname.startsWith('/artist-page/ongoing-contract-information') ||
        pathname.startsWith('/artist-page/pending-contract-information') ||
        pathname.startsWith('/artist-page/completed-contract-information')
      );
    }
    if (path === '/artist-page/my-proposals') {
      return (
        pathname === path ||
        pathname.startsWith('/artist-page/proposal-active') ||
        pathname.startsWith('/artist-page/closed-project')
      );
    }
    return pathname === path;
  };

  const menuItems = [
    { label: 'Jobs', href: '/artist-page/project-page' },
    { label: 'My Proposals', href: '/artist-page/my-proposals' },
    { label: 'My Contracts', href: '/artist-page/my-contracts' },
  ];

  const mobileMenuItems = [
    { label: 'Jobs', href: '/artist-page/project-page' },
    { label: 'My Proposals', href: '/artist-page/my-proposals' },
    { label: 'My Contracts', href: '/artist-page/my-contracts' },
  ];
  const handleLogout = async () => {
    await signOut();
  };

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      shouldHideOnScroll={false}
      position='static'
      disableScrollHandler
      className='w-full bg-[#EAF9FF] font-satoshi border-b border-gray-200 h-[80px]'
      classNames={{ wrapper: 'w-full max-w-full px-0 h-full' }}
      onMenuOpenChange={setIsMenuOpen}
    >
      <PageContainer className="flex items-center justify-between w-full h-full">
        {/* LOGO */}
        <NavbarBrand>
          <div className='flex items-center gap-3'>
            <Link
              href='/artist-page'
            >
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
              {/* Desktop: Text logo only */}
              <Image
                src='/dev-images/SuuaveTxt.png'
                alt='Suuave'
                className='hidden sm:block w-32 h-auto object-contain'
                width={128}
                height={40}
              />
            </Link>
          </div>
        </NavbarBrand>

        {/* MENU */}
        <NavbarContent className='hidden sm:flex gap-9 font-bold h-full' justify='center'>
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
              text='License Your Design'
              href={'/artist-page/license-your-design'}
            />
          </NavbarItem>

          <NavbarItem className='flex'>
            <Notification />
          </NavbarItem>

          <NavbarItem className='flex'>
            <Link href='/artist-page/messages'>
              <Button
                isIconOnly
                variant='bordered'
                radius='full'
                className='text-[#1A1A1A] w-8 h-8 min-w-8 sm:w-10 sm:h-10 sm:min-w-10'
                size='sm'
              >
                <FaEnvelope className='w-4 h-4' />
              </Button>
            </Link>
          </NavbarItem>

          {/* PROFILE DROPDOWN / AVATAR */}
          <NavbarItem className='flex'>
            <Dropdown shouldBlockScroll={false}>
              <DropdownTrigger>
                <button className='flex items-center gap-2 outline-none bg-transparent border-none cursor-pointer p-0'>
                  <Avatar
                    src='/dev-images/Avatar.png'
                    className='w-10 h-10 rounded-full border border-gray-200'
                  />
                  <ChevronDown className='hidden sm:block w-4 h-4 text-gray-600' />
                </button>
              </DropdownTrigger>
              <DropdownMenu aria-label='User actions' className='w-[200px]'>
                <DropdownItem
                  startContent={<LuCircleUser className='size-4' />}
                  key='profile'
                  as={Link}
                  href='/artist-page/profile-for-artist'
                >
                  Profile
                </DropdownItem>
                <DropdownItem
                  startContent={<CreditCard className='size-4' />}
                  key='wallet'
                  as={Link}
                  href='/artist-page/wallet'
                >
                  Wallet
                </DropdownItem>
                <DropdownItem
                  startContent={<Settings className='size-4' />}
                  key='settings'
                  as={Link}
                  href='/artist-page/settings'
                >
                  Settings
                </DropdownItem>
                <DropdownItem
                  startContent={<HelpCircle className='size-4' />}
                  key='help'
                  as={Link}
                  href='/artist-page/help'
                >
                  Help and support
                </DropdownItem>
                <DropdownItem
                  startContent={<TbLogout2 className='size-4' />}
                  key='logout'
                  className='text-danger'
                  color='danger'
                  onPress={handleLogout}
                >
                  Logout
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
        </NavbarContent>
      </PageContainer>

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
