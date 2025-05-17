import {
  Image,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/react";
import React from "react";
import { UserActions } from "./UserActions";
import { NavLinks } from "./NavLinks";

const FashionDesignerHeader = () => {
  const menuItems = ["Designs", "My Job Posts", "My Contracts"];
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar
      shouldHideOnScroll
      maxWidth="full"
      className="h-[80px] border-b lg:bg-white/40 bg-[#CCE7F2]"
    >
      <NavbarBrand>
        <Image src="/black-logo.png" alt="Suaave" className=" w-40" />
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavLinks />
      </NavbarContent>

      <NavbarContent justify="end">
        <UserActions />
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className={`sm:hidden text-black font-bold text-lg size-6`}
        />
      </NavbarContent>

      <NavbarMenu className="bg-[#CCE7F2]/40 pt-8">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full "
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

export default FashionDesignerHeader;
