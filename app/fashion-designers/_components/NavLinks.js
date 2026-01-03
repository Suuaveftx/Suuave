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

  const isActive = (path) => pathname === path;

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
            className="absolute bottom-[28px] left-0 w-full h-[2px] bg-[#222222] origin-left"
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
            className="absolute bottom-[28px] left-0 w-full h-[2px] bg-[#222222] origin-left"
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
            className="absolute bottom-[28px] left-0 w-full h-[2px] bg-[#222222] origin-left"
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
      <Dropdown>
        <NavbarItem>
          <DropdownTrigger>
            <Button
              disableRipple
              className="p-0 bg-transparent font-medium text-[15px] data-[hover=true]:bg-transparent text-[#1A1A1A] hover:text-[#B0B0B0]"
              endContent={icons.chevron}
              radius="sm"
              variant="light"
            >
              My Collections
            </Button>
          </DropdownTrigger>
        </NavbarItem>
        <DropdownMenu
          aria-label="ACME features"
          itemClasses={{
            base: "gap-4",
          }}
        >
          <DropdownItem
            key="autoscaling"
            description="ACME scales apps based on demand and load"
            startContent={icons.scale}
          >
            Autoscaling
          </DropdownItem>
          <DropdownItem
            key="usage_metrics"
            description="Real-time metrics to debug issues"
            startContent={icons.activity}
          >
            Usage Metrics
          </DropdownItem>
          <DropdownItem
            key="production_ready"
            description="ACME runs on ACME, join us at web scale"
            startContent={icons.flash}
          >
            Production Ready
          </DropdownItem>
          <DropdownItem
            key="99_uptime"
            description="High availability and uptime guarantees"
            startContent={icons.server}
          >
            +99% Uptime
          </DropdownItem>
          <DropdownItem
            key="supreme_support"
            description="Support team ready to respond"
            startContent={icons.user}
          >
            +Supreme Support
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </nav>
  );
}
