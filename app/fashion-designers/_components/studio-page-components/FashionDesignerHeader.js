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
import { UserActions } from "../UserActions";
import { NavLinks } from "../NavLinks";

const FashionDesignerHeader = () => {
  const menuItems = [
    { label: "Designs", href: "/fashion-designers" },
    { label: "My Projects", href: "/fashion-designers/my-projects" },
    { label: "My Contracts", href: "/fashion-designers/contracts" },
    { label: "My Collections", href: "/fashion-designers/my-collection" },
    { label: "Settings", href: "/fashion-designers/settings" },
  ];
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar
      shouldHideOnScroll={false}
      maxWidth="full"
      className="fixed top-0 h-[80px] border-b bg-[#CCE7F2] z-50"
    >
      <NavbarBrand>
        <Link href="/fashion-designers">
          <Image src="/black-logo.png" alt="Suaave" className=" w-40" />
        </Link>
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
          <NavbarMenuItem key={`${item.label}-${index}`}>
            <Link
              className="w-full "
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

export default FashionDesignerHeader;
