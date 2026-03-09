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
      shouldHideOnScroll
      className={`w-full ${bgColor} items-center justify-between lg:px-4 px-0 font-satoshi ${textStyle} z-[999]`}
      classNames={{ wrapper: "max-w-[1700px] mx-auto pl-0 pr-4 lg:px-14" }}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarBrand className="lg:justify-start justify-start max-w-fit">
        <Link href='/'>
          {/* Mobile Logo */}
          <Image
            disableAnimation
            src={mobileLogo}
            alt='Logo'
            className='w-[140px] h-[140px] object-contain object-left lg:hidden -ml-6'
          />
          {/* Desktop Logo */}
          <Image
            disableAnimation
            src={desktopLogo}
            alt='Logo'
            className='lg:w-40 py-4 hidden lg:block'
          />
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden lg:flex gap-14 " justify="center">
        <NavbarItem>
          <Link href='/join-waitlist' className={` text-white transition duration-300`}>
            Join the Waitlist
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href='/about-page' className={` text-white transition duration-300`}>
            About Us
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href='/#howitworks' className={` text-white transition duration-300`}>
            How It Works
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href='#' className={` text-white transition duration-300`}>
            FAQs
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href='#' className={` text-white transition duration-300`}>
            Blog
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify='end' className='space'>
        <NavbarItem className='hidden lg:flex'>
          <Link href='/auth' className={` text-white transition duration-300`}>
            Login
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="/onboarding"
            className=" cursor-pointer hidden lg:block bg-[radial-gradient(circle,#EAF9FF,#CCE7F2)] font-bold text-base text-[#035A7A] rounded-3xl py-2 px-6"
          >
            Get started
          </Link>
        </NavbarItem>
        <Link href='/auth' className='lg:hidden text-white'>
          Login
        </Link>
        {/* Hamburger Toggle (mobile only, after Login) */}
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="lg:hidden text-white font-bold text-lg size-6"
        />
      </NavbarContent>

      <NavbarMenu className="bg-customNavBg pt-8">
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