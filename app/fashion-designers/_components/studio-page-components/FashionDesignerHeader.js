'use client';
import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Avatar,
  Badge,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@heroui/react';
import React from 'react';
import { NavLinks } from '../NavLinks';
import Image from 'next/image';
import PageContainer from '@/components/layout/PageContainer';

import { NAVBAR_HEIGHT_CLASS } from '@/components/layout/layoutConstants';
import { IoMail } from 'react-icons/io5';
import { Bell, ChevronDown } from 'lucide-react';
import Notification from '../Notification';
import Link2 from 'next/link';
import { signOut } from '../../../actions/services';
import { useRouter } from 'next/navigation';
import { LuCircleUser } from 'react-icons/lu';
import { TbSettings, TbLogout2 } from 'react-icons/tb';
import { HiOutlinePhone } from 'react-icons/hi';
import { ClipboardList, PenTool, Briefcase, FileSignature, Layers } from 'lucide-react';

const FashionDesignerHeader = () => {
  const menuItems = [
    { label: 'Designs', href: '/fashion-designers', icon: PenTool },
    { label: 'My Projects', href: '/fashion-designers/my-projects', icon: Briefcase },
    { label: 'My Contracts', href: '/fashion-designers/contracts', icon: FileSignature },
    { label: 'My Collections', href: '/fashion-designers/my-collection', icon: Layers },
  ];
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push('/auth/login');
  };

  React.useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }, [isMenuOpen]);

  return (
    <>
      <Navbar
        shouldHideOnScroll={false}
        maxWidth='full'
        className={`sticky top-0 z-[200] w-full border-b bg-[#D8EEF8] ${NAVBAR_HEIGHT_CLASS}`}
        classNames={{
          wrapper: 'w-full max-w-full px-0 h-full',
        }}
      >
        <PageContainer className="flex items-center justify-between w-full h-full">
          <NavbarBrand>
            <Link2 href='/fashion-designers' className='flex items-center gap-2'>
              {/* Mobile: dolphin icon only */}
              <div className='flex sm:hidden items-center -ml-2'>
                <div className='w-12 h-12 overflow-hidden flex-shrink-0'>
                  <Image
                    src='/dev-images/logocombo.png'
                    alt='Logo'
                    className='w-auto h-12 object-cover object-left'
                    width={82}
                    height={48}
                    style={{ width: "auto" }}
                  />
                </div>
              </div>
              {/* Desktop/Tablet Logo */}
              <Image
                src='/dev-images/SuuaveTxt.png'
                alt='Suaave'
                className='w-32 h-auto object-contain hidden sm:block'
                width={128}
                height={40}
              />
            </Link2>
          </NavbarBrand>

          <NavbarContent className='hidden sm:flex gap-4' justify='center'>
            <NavLinks />
          </NavbarContent>

          <NavbarContent justify='end' className='gap-2 sm:gap-4'>
            {/* Post Project button - Desktop only */}
            <Link2 href='/fashion-designers/post-project' className='ml-4'>
              <Button
                className='rounded-full px-9 shadow-md font-proximanova font-semibold items-center justify-center gap-2 lg:flex hidden h-10'
                style={{
                  color: '#035A7A',
                  background: 'radial-gradient(circle, #EAF9FF 19%, #CCE7F2 100%)',
                }}
              >
                Post Project
              </Button>
            </Link2>

            {/* Mail button — mobile always visible */}
            <Link2 href='/fashion-designers/messages'>
              <Badge
                content={<p className='text-[10px] text-white'>2</p>}
                shape='circle'
                showOutline={false}
                className='h-4 w-4 bg-[#3A98BB] flex'
              >
                <Button
                  isIconOnly
                  variant='bordered'
                  radius='full'
                  className='text-[#1A1A1A] w-8 h-8 min-w-8 sm:w-10 sm:h-10 sm:min-w-10'
                  size='sm'
                >
                  <IoMail className='w-4 h-4' />
                </Button>
              </Badge>
            </Link2>

            {/* Notification bell */}
            <Notification />

            {/* Avatar with dropdown */}
            <Dropdown shouldBlockScroll={false}>
              <DropdownTrigger>
                <button className='flex items-center gap-1 outline-none bg-transparent border-none cursor-pointer p-0'>
                  <Avatar
                    src='https://i.pravatar.cc/150?img=8'
                    isBordered
                    color='success'
                    size='sm'
                    className='w-8 h-8 sm:w-10 sm:h-10'
                  />
                  <ChevronDown className="w-4 h-4 text-[#888888]" />
                </button>
              </DropdownTrigger>
              <DropdownMenu aria-label='User actions'>
                <DropdownItem startContent={<LuCircleUser className='size-4' />} key='profile' as={Link2} href='/fashion-designers/profile'>Profile</DropdownItem>
                <DropdownItem startContent={<ClipboardList className='size-4' />} key='transactions' as={Link2} href='/fashion-designers/transactions'>Transaction History</DropdownItem>
                <DropdownItem startContent={<TbSettings className='size-4' />} key='settings' as={Link2} href='/fashion-designers/settings'>Settings</DropdownItem>
                <DropdownItem startContent={<HiOutlinePhone className='size-4' />} key='help' as={Link2} href='#'>Help & Support</DropdownItem>
                <DropdownItem startContent={<TbLogout2 className='size-4' />} key='logout' className='text-danger' color='danger' onPress={handleLogout}>Logout</DropdownItem>
              </DropdownMenu>
            </Dropdown>


            <button
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              className='sm:hidden flex items-center justify-center border border-gray-200 rounded-full p-2 h-10 w-10 text-gray-600 bg-white z-[9999]'
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </NavbarContent>
        </PageContainer>

      </Navbar>

      {isMenuOpen && (
        <div className="NavbarMenu fixed inset-x-0 top-[80px] bottom-0 z-[9999] bg-[#D8EEF8] pt-8 px-6 sm:hidden flex flex-col gap-6 overflow-y-auto shadow-xl">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link2
                key={`${item.label}-${index}`}
                className='w-full flex items-center gap-3 transition duration-300 text-[#222222] py-2 text-lg font-satoshi'
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {Icon && <Icon className="w-6 h-6 text-[#888888]" />}
                {item.label}
              </Link2>
            );
          })}
        </div>
      )}
    </>
  );
};

export default FashionDesignerHeader;

