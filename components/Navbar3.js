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
import React from "react";
import CustomButton from "./CustomButton";

const Navbar3 = () => {
  const [textStyle, setTextStyle] = React.useState("text-black");
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    { label: "Designs", href: "/jobpost" },
    { label: "My Job Posts", href: "/tableproposals" },
    { label: "My Contracts", href: "/completedcontracts" },
    { label: "My Collections", href: "/completedcontracts" },
  ];

  const mobileMenuItems = [
    { label: "Home", href: "/" },
    { label: "Jobs", href: "/jobpost" },
    { label: "Proposals", href: "/proposals" },
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
        <Link href="/jobpost">
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
          <CustomButton className="hidden lg:flex" text="License Your Designs" href={"/license"} />
        </NavbarItem>
        <div className="flex gap-2">
          <NavbarItem className="hidden lg:flex">
            <Image src="/dev-images/Bell.png" alt="Bell" width={24} height={24} />
          </NavbarItem>
          <NavbarItem className="hidden lg:flex">
            <Link href="/messages">
            <Image src="/dev-images/Messages.png" alt="Messages" width={24} height={24} />
            </Link>
          </NavbarItem>
        </div>
        <NavbarItem className="hidden lg:flex">
          <Image src="/dev-images/Avatar.png" alt="Avatar" width={48} height={48} />
        </NavbarItem>
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

export default Navbar3;
