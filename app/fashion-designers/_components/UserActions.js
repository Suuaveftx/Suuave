import React from "react";
import {
  Button,
  Avatar,
  Badge,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
// import { Icon } from "@iconify/react";
import { IoMail } from "react-icons/io5";

import { ChevronDown } from "../../../utils/SvgIcons";
import { LuCircleUser } from "react-icons/lu";
import { HiOutlinePhone } from "react-icons/hi";
import { TbSettings } from "react-icons/tb";
import { TbLogout2 } from "react-icons/tb";
import { Bell, ClipboardList, Mail } from "lucide-react";
import CustomButton from "../../../components/CustomButton";
import Link from "next/link";
import Notification from "./Notification";

export function UserActions() {
  return (
    <div className="flex items-center gap-6 font-satoshi">
      {/* <Button className="bg-[#A0D3E8] text-[#007B7F] font-bold hover:bg-[#007B7F] hover:text-white transition-colors shadow-[0px_2px_4px_rgba(0,0,0,0.1)] rounded-lg">
        Post a Job
      </Button> */}
      <Link href="/fashion-designers/post-project">
        {/* <Button
          className={` items-center justify-center gap-2 font-proximanova  rounded-full shadow-md font-semibold px-9 py-1 lg:flex hidden`}
          style={{ background: "radial-gradient(circle, #CCE7F2, white)" }}
        >
          Post Project
        </Button> */}
        <Button
          className="rounded-full px-9 py-2 shadow-md font-proximanova font-semibold  items-center justify-center gap-2 lg:flex hidden border border-neutral-400"
          style={{
            background:
              "radial-gradient(ellipse at center, white 0%, #CCE7F2 100%)",
          }}
        >
          Post Project
        </Button>

        {/* <CustomButton text="" className=" bg-[#CCE7F2]" /> */}
      </Link>

      <div className="flex items-center gap-6">
        <Notification />
        <Button
          isIconOnly
          variant="bordered"
          radius="full"
          className="text-[#1A1A1A] hidden lg:flex"
          size="md"
        >
          <IoMail className="w-4 h-4" />
        </Button>

        <Dropdown>
          <DropdownTrigger>
            <div className="flex items-center gap-2">
              <Avatar
                src="https://i.pravatar.cc/150?img=8"
                className="cursor-pointer"
                isBordered
                color="success"
              />
              <ChevronDown fill="currentColor" size={16} />
            </div>
          </DropdownTrigger>
          <DropdownMenu aria-label="User actions">
            <DropdownItem
              startContent={<LuCircleUser className="size-4" />}
              key="profile"
            >
              Profile
            </DropdownItem>
            <DropdownItem
              startContent={<Bell className="size-4" />}
              key="notifications"
              className="lg:hidden flex"
            >
              Notifications
            </DropdownItem>
            <DropdownItem
              startContent={<Mail className="size-4" />}
              key="messages"
              className="lg:hidden flex"
            >
              Messages
            </DropdownItem>
            <DropdownItem
              startContent={<HiOutlinePhone className="size-4" />}
              key="support"
            >
              Help & Support
            </DropdownItem>
            <DropdownItem
              startContent={<ClipboardList className="size-4" />}
              key="transaction-history"
            >
              Transaction History
            </DropdownItem>
            <DropdownItem
              startContent={<TbSettings className="size-4" />}
              key="settings"
            >
              Settings
            </DropdownItem>
            <DropdownItem
              startContent={<TbLogout2 className="size-4" />}
              key="logout"
              className="text-danger"
              color="danger"
            >
              Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
}
