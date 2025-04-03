"use client";
import {
  Link,
  Navbar,
  NavbarContent,
  NavbarItem,
  Image,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
} from "@heroui/react";
import React, { useState } from "react";
import CustomButton from "./CustomButton";
import { ChevronDown } from "lucide-react";

const Navbars = () => {
  const [textStyle, setTextStyle] = React.useState("text-black");
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "Jobs", href: "/fashionartistpage/jobpost" },
    { label: "Proposals", href: "/fashionartistpage/tableproposals" },
    { label: "My Contracts", href: "/fashionartistpage/completedcontracts" },
  ];

  const mobileMenuItems = [
    { label: "Home", href: "/" },
    { label: "Jobs", href: "/fashionartistpage/jobpost" },
    { label: "Proposals", href: "/fashionartistpage/proposals" },
    { label: "My Contracts", href: "/contracts" },
    { label: "Profile", href: "/profile" },
    { label: "Settings", href: "/settings" },
  ];

  return (
    <Navbar
      shouldHideOnScroll
      className="w-full bg-white items-center font-satoshi shadow-md px-2 flex-nowrap"
      classNames={{ wrapper: "max-w-[1700px]" }}
      onScrollPositionChange={(position) => {
        setTextStyle(position > 600 ? "text-yellow-500" : "text-black");
      }}
      onMenuOpenChange={setIsMenuOpen}
    >
      {/* LOGO */}
      <div>
        <Link href="/fashionartistpage/jobpost">
        <Image
          src="/dev-images/logocombo.png"
          alt="Logo"
          className="lg:w-32 w-24 h-auto object-contain"
        />
        </Link>
      </div>

      {/* MENU */}
      <NavbarContent className="hidden sm:flex gap-8 ml-8 font-bold" justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem key={index}>
            <Link href={item.href} className={`${textStyle} transition duration-300`}>
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* LOGIN & BUTTON */}
      <NavbarContent justify="end" className="gap-8">
        <NavbarItem>
          <CustomButton className="hidden lg:flex" text="License Your Designs" href={"/fashionartistpage/license"} />
        </NavbarItem>
        <div className="flex gap-2">
          <NavbarItem className="hidden lg:flex">
            <Image src="/dev-images/Bell.png" alt="Bell" width={24} height={24} />
          </NavbarItem>
          <NavbarItem className="hidden lg:flex">
            <Link href="/fashionartistpage/messages">
            <Image src="/dev-images/Messages.png" alt="Messages" width={24} height={24} />
            </Link>
          </NavbarItem>
        </div>
        <div className="relative">
      {/* Profile Image with Downward Arrow */}
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-2 focus:outline-none">
        <Image src="/dev-images/Avatar.png" alt="Avatar" width={48} height={48} className="cursor-pointer rounded-full" />
        <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2">
          <Link href="/fashionartistpage/fashionprofile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
            My Profile
          </Link>
          <Link href="/fashionartistpage/payment" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
            Wallet
          </Link>
          <Link href="/fashionartistpage/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
            Support
          </Link>
          <Link href="/fashionartistpage/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
            Settings
          </Link>
          <Link href="/#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
            Logout
          </Link>
          
        </div>
      )}
    </div>
        <Link className="lg:hidden text-black">Login</Link>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden text-black font-bold text-lg size-6"
        />
      </NavbarContent>

      {/* MOBILE MENU */}
      <NavbarMenu>
        {mobileMenuItems.map((item, index) => (
          <NavbarMenuItem key={index}>
            <Link className="w-full text-black transition duration-300" href={item.href} size="lg">
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default Navbars;
