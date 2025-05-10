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
import { FaBell } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import CustomButton from "../../../../components/CustomButton";
import { ChevronDown } from "../../../utils/SvgIcons";
import { LuCircleUser } from "react-icons/lu";
import { HiOutlinePhone } from "react-icons/hi";
import { TbSettings } from "react-icons/tb";
import { TbLogout2 } from "react-icons/tb";
import { Bell, ClipboardList, Mail } from "lucide-react";

export function UserActions() {
  return (
    <div className="flex items-center gap-6 font-satoshi">
      {/* <Button className="bg-[#A0D3E8] text-[#007B7F] font-bold hover:bg-[#007B7F] hover:text-white transition-colors shadow-[0px_2px_4px_rgba(0,0,0,0.1)] rounded-lg">
        Post a Job
      </Button> */}
      <CustomButton
        text="Post a Job"
        className="font-semibold px-9 py-1 lg:flex hidden"
      />

      <div className="flex items-center gap-6">
        <Badge
          //   content="3"
          content={<p className="text-[10px]">3</p>}
          color="primary"
          showOutline={false}
          className="h-4 w-4 hidden lg:flex"
          shape="circle"
        >
          <Button
            isIconOnly
            variant="bordered"
            radius="full"
            className="text-[#1A1A1A] hidden lg:flex"
            size="sm"
          >
            {/* <Icon icon="lucide:bell" className="w-5 h-5" /> */}
            <FaBell className="w-4 h-4" />
          </Button>
        </Badge>

        <Button
          isIconOnly
          variant="bordered"
          radius="full"
          className="text-[#1A1A1A] hidden lg:flex"
          size="sm"
        >
          {/* <Icon icon="lucide:mail" className="w-5 h-5" /> */}
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
              startContent={<TbSettings className="size-4" />}
              key="settings"
            >
              Settings
            </DropdownItem>
            <DropdownItem
              startContent={<ClipboardList className="size-4" />}
              key="transaction-history"
            >
              Transaction History
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
