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

const Navbar3 = ({ activeLink }) => {
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
    { label: "My Proposals", href: "/proposals" },
    { label: "My Contracts", href: "/contracts" },
    { label: "Settings", href: "/settings" },
  ];

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      shouldHideOnScroll
      className="w-full bg-[#EAF9FF] items-center font-satoshi shadow-sm px-2 flex-nowrap"
      classNames={{ wrapper: "max-w-[1700px]" }}
      onScrollPositionChange={(position) => {
        setTextStyle(position > 600 ? "text-yellow-500" : "text-black");
      }}
      onMenuOpenChange={setIsMenuOpen}
    >
      {/* LOGO */}
      <div className="flex items-center gap-3">
        <Link href="/jobpost" className="border-l border-[#8E8E8E]/30 pl-3">
          <Image
            src="/dev-images/logocombo.png"
            alt="Logo"
            className="lg:w-32 w-24 h-auto object-contain"
          />
        </Link>
      </div>

      {/* MENU */}
      <NavbarContent
        className="hidden sm:flex gap-8 ml-8 font-bold"
        justify="center"
      >
        {menuItems.map((item, index) => (
          <NavbarItem key={index}>
            <Link
              href={item.href}
              className={`${textStyle} transition duration-300 ${activeLink === item.label ? "text-[#035A7A]" : ""
                }`}
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* LOGIN & BUTTON & ICONS */}
      <NavbarContent justify="end" className="gap-4 sm:gap-8">
        <NavbarItem className="hidden lg:flex">
          <CustomButton
            style={{ color: "#035A7A" }}
            text="Post Project"
            href={"/fashion-designers/post-project"}
          />
        </NavbarItem>

        <div className="flex items-center gap-3 sm:gap-6">
          <NavbarItem className="flex">
            <Image
              src="/dev-images/Bell.png"
              alt="Bell"
              width={28}
              height={28}
              className="w-6 h-6 sm:w-7 sm:h-7"
            />
          </NavbarItem>
          <NavbarItem className="flex">
            <Link href="/messages">
              <Image
                src="/dev-images/Messages.png"
                alt="Messages"
                width={28}
                height={28}
                className="w-6 h-6 sm:w-7 sm:h-7"
              />
            </Link>
          </NavbarItem>
        </div>

        <NavbarItem className="flex">
          <Image
            src="/dev-images/Avatar.png"
            alt="Avatar"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full border border-gray-200"
          />
        </NavbarItem>

        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden flex items-center justify-center border border-gray-200 rounded-full p-2 h-10 w-10 text-gray-600"
        />
      </NavbarContent>

      {/* MOBILE MENU */}
      <NavbarMenu>
        {mobileMenuItems.map((item, index) => (
          <NavbarMenuItem key={index}>
            <Link
              className="w-full text-black transition duration-300"
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

export default Navbar3;
