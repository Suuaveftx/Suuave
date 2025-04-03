"use client";
import { useState } from "react";
import { LucideBell, LucideLock, LucideHelpCircle, LucidePhone } from "lucide-react";
import { Card, CardBody } from "@heroui/react";
import Image from "next/image";

const menuItems = [
  { id: "profile", label: "Profile", icon: null },
  { id: "notifications", label: "Notifications", icon: LucideBell },
  { id: "security", label: "Security", icon: LucideLock },
  { id: "faq", label: "FAQ", icon: LucideHelpCircle },
  { id: "help", label: "Help", icon: LucidePhone },
];

const SettingsCard = () => {
  const [activeItem, setActiveItem] = useState("notifications");

  return (
    <Card className="w-64 h-80 p-0  bg-white shadow-md rounded-lg">
      <CardBody>
        {menuItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveItem(item.id)}
            className={`relative flex items-center w-full cursor-pointer p-3 rounded-md 
              ${activeItem === item.id ? "bg-[#F1F1F1EE]" : "hover:bg-gray-100"}`}
          >
            {/* Active Indicator Line */}
            <div
              className={`absolute left-0 top-0 h-full w-0.5 rounded-r-md ${
                activeItem === item.id ? "bg-[#3A98BB]" : "bg-transparent"
              }`}
            />

            {/* Icon and Label */}
            {item.icon && (
              <item.icon
                className={`w-6 h-6 mr-3 ${
                  activeItem === item.id ? "text-[#3A98BB]" : "text-gray-500"
                }`}
              />
            )}
            <span
              className={`text-lg font-medium ${
                activeItem === item.id ? "text-[#3A98BB]" : "text-gray-800"
              }`}
            >
              {item.label}
            </span>
          </div>
        ))}
      </CardBody>
    </Card>
  );
};

export default SettingsCard;
