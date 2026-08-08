"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Image,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  Link,
} from "@heroui/react";
import NextLink from "next/link";
import React, { useEffect } from 'react';
import PageContainer from './layout/PageContainer';

const CustomNavbar = ({ bgColor, mobileLogo = "/dev-images/logomobile.png", desktopLogo = "/dev-images/SuuaveTxt.png" }) => {
  const [textStyle, setTextStyle] = React.useState("text-white");
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }, [isMenuOpen]);

  const menuItems = [
    { title: "About Us", url: "/about-page" },
    { title: "How It Works", url: "/#howitworks" },
    { title: "FAQs", url: "#" },
    { title: "Blog", url: "#" },
  ];

  return (
    <Navbar
      className={`w-full ${bgColor} font-satoshi ${textStyle} z-40 !static lg:!sticky h-[80px]`}
      classNames={{ wrapper: "w-full max-w-full px-0 h-full" }}
      onMenuOpenChange={setIsMenuOpen}
    >
      <PageContainer className="flex items-center justify-between w-full h-full">
        <NavbarBrand className="lg:justify-start justify-start max-w-fit -ml-4 lg:ml-0">
          <Link href='/' className="flex items-center">
            {/* Mobile Logo */}
            <span className="lg:hidden flex items-center overflow-hidden w-[110px] h-14">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={mobileLogo}
                alt='Logo'
                style={{ width: '140px', height: '140px', objectFit: 'contain', objectPosition: 'left center', flexShrink: 0 }}
              />
            </span>
            {/* Desktop Logo */}
            <Image
              disableAnimation
              src={desktopLogo}
              alt='Logo'
              className='lg:w-40 py-4 hidden lg:block'
            />
          </Link>
        </NavbarBrand>

        <NavbarContent className="hidden lg:flex gap-4 xl:gap-14 lg:ml-12" justify="center">
          <NavbarItem>
            <Link href='/join-waitlist' className={`text-white transition duration-300`}>
              Join the Waitlist
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href='/about-page' className={`text-white transition duration-300`}>
              About Us
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href='/#howitworks' className={`text-white transition duration-300`}>
              How It Works
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href='#' className={`text-white transition duration-300`}>
              FAQs
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href='#' className={`text-white transition duration-300`}>
              Blog
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify='end' className='gap-4'>
          <NavbarItem className='hidden lg:flex'>
            <Link href='/auth' className={`text-white transition duration-300`}>
              Login
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              href="/onboarding"
              className="cursor-pointer hidden lg:block bg-[radial-gradient(circle,#EAF9FF,#CCE7F2)] font-bold text-base text-[#035A7A] rounded-3xl py-2 px-6"
            >
              Get started
            </Link>
          </NavbarItem>
          <Link href='/auth' className='lg:hidden text-white pr-2'>
            Login
          </Link>
          {/* Hamburger Toggle (mobile only, after Login) */}
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="lg:hidden text-white font-bold text-lg size-6"
          />
        </NavbarContent>
      </PageContainer>

      <NavbarMenu className="bg-customNavBg pt-8 px-4 overflow-hidden h-fit">
        {menuItems.map((item, index) => (
          <NavbarMenuItem className="py-3" key={`${item.title}-${index}`}>
            <Link className="w-full text-white" href={item.url} size="lg">
              {item.title}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem className="py-6 flex justify-center w-full mt-4">
          <Link
            href="/join-waitlist"
            className="cursor-pointer bg-[radial-gradient(circle,#EAF9FF,#CCE7F2)] font-bold text-base text-[#035A7A] rounded-3xl py-2 px-8 text-center"
          >
            Join the Waitlist
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};

export default CustomNavbar;