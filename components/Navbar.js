
"use client";
import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Image,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
} from '@heroui/react';
import React from 'react';

const CustomNavbar = ({ bgColor }) => {
  const [textStyle, setTextStyle] = React.useState("text-white");
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    { title: "Blogs", url: "#" },
    { title: "How it works", url: "#" },
    { title: "FAQs", url: "" },
    { title: "About Us", url: "#" },
  ];

  return (
    <Navbar
      shouldHideOnScroll
      className={`w-full ${bgColor} items-center justify-between lg:px-4 px-0 font-satoshi ${textStyle}`}
      classNames={{ wrapper: "max-w-[1700px] mx-auto px-3 " }}
     
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarBrand>
        <Link href='/'>
          <Image
            src='/dev-images/navLogo.png'
            alt='Logo'
            className='lg:w-40 py-4 w-32' // Reduced space between the logo and form
          />
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden lg:flex gap-14 " justify="center">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className='sm:hidden'
        />
        <NavbarItem>
          <Link href='/join-waitlist' className={` text-white transition duration-300`}>
            Join Waitlist
          </Link>
          {/* <Link href='#' className={` text-white transition duration-300`}>
            Blogs
          </Link> */}
        </NavbarItem>
        <NavbarItem>
          <Link href='/#howitworks' className={` text-white transition duration-300`}>
            How it works
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href='#' className={` text-white transition duration-300`}>
            FAQs
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href='/about-page' className={` text-white transition duration-300`}>
            About us
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
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className={` lg:hidden  text-white font-bold text-lg size-6`}
        />
      </NavbarContent>
      <NavbarMenu className="lg:mt-20">
        {menuItems.map((item, index) => (
          <NavbarMenuItem className="space-y-6" key={`${item}-${index}`}>
            <Link className="w-full text-[#CECECE]" href={item.url} size="lg">
              {item.title}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default CustomNavbar;