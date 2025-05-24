'use client';
import React from 'react';
import { LucideBell, LucideLock, LucideHelpCircle, LucidePhone, LucideCircleUserRound } from 'lucide-react';
import { Card, CardBody } from '@heroui/react';

const menuItems = [
  { id: 'profile', label: 'Profile Settings', icon: LucideCircleUserRound },
  { id: 'notifications', label: 'Notifications', icon: LucideBell },
  { id: 'security', label: 'Security Settings', icon: LucideLock },
  { id: 'faq', label: 'FAQ', icon: LucideHelpCircle },
  { id: 'help', label: 'Help', icon: LucidePhone },
];

const SettingsCard = ({ activeItem, setActiveItem }) => {
  return (
    <Card className="w-64 h-80 p-0 bg-white shadow-md rounded-lg">
      <div>
        {menuItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveItem(item.id)}
            className={`relative flex items-center w-full cursor-pointer p-3 rounded-md 
              ${activeItem === item.id ? 'bg-[#F1F1F1EE] w-full' : 'hover:bg-gray-100'}`}
          >
            <div
              className={`absolute left-0 top-0 h-full w-0.5 rounded-r-md ${
                activeItem === item.id ? 'bg-[#3A98BB]' : 'bg-transparent'
              }`}
            />
            {item.icon && (
              <item.icon
                className={`w-6 h-6 mr-3 ${
                  activeItem === item.id ? 'text-[#3A98BB]' : 'text-gray-500'
                }`}
              />
            )}
            <span
              className={`text-lg font-medium ${
                activeItem === item.id ? 'text-[#3A98BB]' : 'text-gray-800'
              }`}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SettingsCard;
