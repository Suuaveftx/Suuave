'use client';
import React from 'react';
import { Card } from '@heroui/react';

const Sidebar_MenuCard = ({ menuItems, activeItem, setActiveItem }) => {
  return (
    <Card className="w-64 h-80 p-0 bg-white shadow-md rounded-lg">
      <div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={`relative flex items-center cursor-pointer p-3 rounded-md ${
                activeItem === item.id ? 'bg-[#F1F1F1EE]' : 'hover:bg-gray-100'
              }`}
            >
              <div
                className={`absolute left-0 top-0 h-full w-0.5 rounded-r-md ${
                  activeItem === item.id ? 'bg-[#3A98BB]' : 'bg-transparent'
                }`}
              />
              {Icon && (
                <Icon
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
          );
        })}
      </div>
    </Card>
  );
};

export default Sidebar_MenuCard;
