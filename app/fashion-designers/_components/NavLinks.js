import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  NavbarItem,
  Button,
} from "@heroui/react";
// import { Icon } from "@iconify/react";
import { FaChevronDown } from "react-icons/fa6";
import {
  Activity,
  ChevronDown,
  Flash,
  Lock,
  Scale,
  Server,
  TagUser,
} from "../../../utils/SvgIcons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export function NavLinks() {
  const icons = {
    chevron: <ChevronDown fill="currentColor" size={16} />,
    scale: <Scale className="text-warning" fill="currentColor" size={30} />,
    lock: <Lock className="text-success" fill="currentColor" size={30} />,
    activity: (
      <Activity className="text-secondary" fill="currentColor" size={30} />
    ),
    flash: <Flash className="text-primary" fill="currentColor" size={30} />,
    server: <Server className="text-success" fill="currentColor" size={30} />,
    user: <TagUser className="text-danger" fill="currentColor" size={30} />,
  };

  const pathname = usePathname();

  const isActive = (path) => {
    if (path === "/fashion-designers") {
      const isMainSubpath =
        pathname.startsWith("/fashion-designers/my-projects") ||
        pathname.startsWith("/fashion-designers/contracts") ||
        pathname.startsWith("/fashion-designers/my-collection") ||
        pathname.startsWith("/fashion-designers/post-project") ||
        pathname.startsWith("/fashion-designers/settings") ||
        pathname.startsWith("/fashion-designers/profile") ||
        pathname.startsWith("/fashion-designers/transactions");

      return pathname.startsWith("/fashion-designers") && !isMainSubpath;
    }
    if (path === "/fashion-designers/contracts") {
      return (
        pathname.startsWith("/fashion-designers/contracts") &&
        !pathname.startsWith("/fashion-designers/contracts/retain")
      );
    }
    return pathname.startsWith(path);
  };

  return (
    <nav className="hidden md:flex items-center gap-9 font-medium h-full">
      <Link
        href="/fashion-designers"
        className="group text-[#1A1A1A] hover:text-[#B0B0B0] text-[15px] transition-colors relative flex items-center h-full"
      >
        <motion.div
          animate={isActive("/fashion-designers") ? "hovered" : "initial"}
          whileHover="hovered"
          className="relative flex items-center h-full"
        >
          Designs
          <motion.div
            variants={{
              initial: { scaleX: 0 },
              hovered: { scaleX: 1 }
            }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="absolute bottom-[20px] left-0 w-full h-[2px] bg-[#222222] origin-left"
          />
        </motion.div>
      </Link>
      <Link
        href="/fashion-designers/my-projects"
        className="group text-[#1A1A1A] hover:text-[#B0B0B0] text-[15px] transition-colors relative flex items-center h-full"
      >
        <motion.div
          animate={isActive("/fashion-designers/my-projects") ? "hovered" : "initial"}
          whileHover="hovered"
          className="relative flex items-center h-full"
        >
          My Projects
          <motion.div
            variants={{
              initial: { scaleX: 0 },
              hovered: { scaleX: 1 }
            }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="absolute bottom-[20px] left-0 w-full h-[2px] bg-[#222222] origin-left"
          />
        </motion.div>
      </Link>
      <Link
        href="/fashion-designers/contracts"
        className="group text-[#1A1A1A] hover:text-[#B0B0B0] text-[15px] transition-colors relative flex items-center h-full"
      >
        <motion.div
          animate={isActive("/fashion-designers/contracts") ? "hovered" : "initial"}
          whileHover="hovered"
          className="relative flex items-center h-full"
        >
          My Contracts
          <motion.div
            variants={{
              initial: { scaleX: 0 },
              hovered: { scaleX: 1 }
            }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="absolute bottom-[20px] left-0 w-full h-[2px] bg-[#222222] origin-left"
          />
        </motion.div>
      </Link>
      {/* <Dropdown>
        <DropdownTrigger>
          <button className="flex items-center gap-1 text-[#1A1A1A] hover:text-[#B0B0B0] transition-colors">
            My Collections
            <FaChevronDown className="w-4 h-4" />
          </button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Collections actions">
          <DropdownItem key="saved">Saved Designs</DropdownItem>
          <DropdownItem key="favorites">Favorites</DropdownItem>
          <DropdownItem key="archived">Archived</DropdownItem>
        </DropdownMenu>
      </Dropdown> */}
      <Link
        href="/fashion-designers/my-collection"
        className="group text-[#1A1A1A] hover:text-[#B0B0B0] text-[15px] transition-colors relative flex items-center h-full"
      >
        <motion.div
          animate={isActive("/fashion-designers/my-collection") ? "hovered" : "initial"}
          whileHover="hovered"
          className="relative flex items-center h-full"
        >
          My Collections
          <motion.div
            variants={{
              initial: { scaleX: 0 },
              hovered: { scaleX: 1 }
            }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="absolute bottom-[20px] left-0 w-full h-[2px] bg-[#222222] origin-left"
          />
        </motion.div>
      </Link>
    </nav>
  );
}
