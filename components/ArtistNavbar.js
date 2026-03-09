'use client';
import {
  Image,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Avatar,
  Button,
  Badge,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@heroui/react';
import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronDown } from '../utils/SvgIcons';
import { LuCircleUser } from 'react-icons/lu';
import { TbSettings, TbLogout2 } from 'react-icons/tb';
import { HelpCircle, CreditCard } from 'lucide-react';
import { IoMail } from 'react-icons/io5';
import Notification from './Notification';

const ArtistNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }, [isMenuOpen]);

  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('activeCategory');
    window.location.href = '/';
  };

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

  const navLinks = [
    { label: 'Jobs', href: '/artist-page/project-page' },
    { label: 'My Proposals', href: '/artist-page/my-proposals' },
    { label: 'My Contracts', href: '/artist-page/my-contracts' },
  ];

  const mobileMenuItems = [
    { label: 'Jobs', href: '/artist-page/project-page' },
    { label: 'My Proposals', href: '/artist-page/my-proposals' },
    { label: 'My Contracts', href: '/artist-page/my-contracts' },
  ];

  return (
    <Navbar
      shouldHideOnScroll={false}
      maxWidth="full"
      className="fixed top-0 h-[80px] border-b bg-[#CCE7F2] z-[999]"
      classNames={{ wrapper: "pl-0 pr-4 lg:px-14" }}
      onMenuOpenChange={setIsMenuOpen}
    >
      {/* LOGO */}
      <NavbarBrand className="sm:justify-start justify-start max-w-fit">
        <Link href="/artist-page">
          {/* Mobile Logo */}
          <Image
            disableAnimation
            src="/dev-images/logomobile.png"
            alt="Suaave"
            className="w-[140px] h-[140px] object-contain object-left lg:hidden -ml-6"
          />
          {/* Desktop Logo */}
          <Image
            disableAnimation
            src="/dev-images/SuuaveTxt.png"
            alt="Suaave"
            className="w-32 max-h-10 object-contain hidden lg:block"
          />
        </Link>
      </NavbarBrand>

      {/* DESKTOP NAV LINKS */}
      <NavbarContent className="hidden sm:flex gap-9 font-medium h-full" justify="center">
        {navLinks.map((item, index) => (
          <div key={index} className="flex items-center h-full">
            <Link
              href={item.href}
              className="text-[#1A1A1A] hover:text-[#B0B0B0] text-[15px] transition-colors relative flex items-center h-full"
            >
              <motion.div
                animate={isActive(item.href) ? 'hovered' : 'initial'}
                whileHover="hovered"
                className="relative flex items-center h-full"
              >
                {item.label}
                <motion.div
                  variants={{
                    initial: { scaleX: 0 },
                    hovered: { scaleX: 1 },
                  }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  className="absolute bottom-[20px] left-0 w-full h-[2px] bg-[#3A98BB] origin-left"
                />
              </motion.div>
            </Link>
          </div>
        ))}
      </NavbarContent>

      {/* RIGHT SIDE ACTIONS */}
      <NavbarContent justify="end" className="gap-3 lg:gap-6">
        {/* License Your Designs - desktop only */}
        <div className="hidden lg:flex">
          <Link href="/artist-page/license-your-design">
            <Button
              className="rounded-full px-9 py-2 shadow-md font-proximanova font-semibold items-center justify-center gap-2 border border-neutral-400"
              style={{
                color: '#035A7A',
                background: 'radial-gradient(circle, #EAF9FF 19%, #CCE7F2 100%)',
              }}
            >
              License Your Designs
            </Button>
          </Link>
        </div>

        {/* Notification */}
        <Notification />

        {/* Messages */}
        <Link href="/artist-page/messages">
          <Badge
            content={<p className="text-[10px] text-white">2</p>}
            shape="circle"
            showOutline={false}
            className="h-4 w-4 bg-[#3A98BB] flex"
          >
            <Button
              isIconOnly
              variant="bordered"
              radius="full"
              className="text-[#1A1A1A] w-8 h-8 min-w-8 sm:w-10 sm:h-10 sm:min-w-10"
              size="sm"
            >
              <IoMail className="w-4 h-4" />
            </Button>
          </Badge>
        </Link>

        {/* Avatar Dropdown */}
        <Dropdown shouldBlockScroll={false}>
          <DropdownTrigger>
            <button className="flex items-center gap-2 outline-none bg-transparent border-none cursor-pointer p-0">
              <Avatar
                src="/dev-images/Avatar.png"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-200"
                size="sm"
              />
              <ChevronDown fill="currentColor" size={14} />
            </button>
          </DropdownTrigger>
          <DropdownMenu aria-label="User actions">
            <DropdownItem
              startContent={<LuCircleUser className="size-4" />}
              key="profile"
              onPress={() => router.push('/artist-page/profile-for-artist')}
            >
              Profile
            </DropdownItem>
            <DropdownItem
              startContent={<CreditCard className="size-4" />}
              key="wallet"
              onPress={() => router.push('/artist-page/wallet')}
            >
              Wallet
            </DropdownItem>
            <DropdownItem
              startContent={<TbSettings className="size-4" />}
              key="settings"
              onPress={() => router.push('/artist-page/settings')}
            >
              Settings
            </DropdownItem>
            <DropdownItem
              startContent={<HelpCircle className="size-4" />}
              key="help"
              onPress={() => router.push('/artist-page/help')}
            >
              Help & Support
            </DropdownItem>
            <DropdownItem
              startContent={<TbLogout2 className="size-4" />}
              key="logout"
              className="text-danger"
              color="danger"
              onPress={handleLogout}
            >
              Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        {/* Hamburger Toggle (mobile only, after avatar) */}
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="lg:hidden text-black font-bold text-lg size-6"
        />
      </NavbarContent>

      {/* MOBILE MENU */}
      <NavbarMenu className="bg-[#CCE7F2] pt-8">
        {mobileMenuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.label}-${index}`} className="py-3">
            <Link
              className="w-full"
              color="foreground"
              href={item.href}
              size="lg"
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
