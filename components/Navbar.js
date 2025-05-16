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
} from "@heroui/react";
import React from "react";
import CustomButton from "./CustomButton";

const CustomNavbar = () => {
  const [textStyle, setTextStyle] = React.useState("text-white");
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = ["Blogs", "How it works", "FAQs", "About Us"];

  return (
    <Navbar
      shouldHideOnScroll
      className={`w-full items-center justify-between lg:px-4 px-0 font-satoshi ${textStyle}`}
      classNames={{ wrapper: "max-w-[1700px] mx-auto px-3" }}
      onScrollPositionChange={(position) => {
        if (position > 600) {
          setTextStyle(" text-white bg-black/50   ");
        } else {
          setTextStyle("text-white bg-transparent");
        }
      }}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarBrand>
        <Image
          src="/dev-images/navLogo.png"
          alt="Logo"
          className="lg:w-40 py-4 w-32" // Reduced space between the logo and form
        />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-14 " justify="center">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarItem>
          <Link href="#" className={` text-white transition duration-300`}>
            Blogs
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#" className={` text-white transition duration-300`}>
            How it works
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#" className={` text-white transition duration-300`}>
            FAQs
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#" className={` text-white transition duration-300`}>
            About us
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end" className="space">
        <NavbarItem className="hidden lg:flex">
          <Link href="/auth" className={` text-white transition duration-300`}>
            Login
          </Link>
        </NavbarItem>
        <NavbarItem>
          <CustomButton
            href="onboarding/choose-category"
            className="hidden lg:flex"
          />
        </NavbarItem>
        <Link href="/auth" className="lg:hidden text-white">
          Login
        </Link>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className={`sm:hidden text-white font-bold text-lg size-6`}
        />
      </NavbarContent>
      <NavbarMenu className="">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default CustomNavbar;
