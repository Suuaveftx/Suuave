'use client';
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Sidebar_MenuCard = ({ menuItems, activeItem, setActiveItem }) => {
  return (
    <div
      className='
        h-screen  p-0 bg-[#fafafa] shadow-md
        w-full       /* full width on mobile */
        sm:w-64      /* fixed width on desktop */
        m-0 sm:m-0
        sm:rounded-lg
      '
    >
      {/* Mobile Header */}
      <div className='flex items-center gap-3 p-4 border-b sm:hidden'>
        <ChevronLeft className='w-6 h-6 text-gray-700' />
        <h2 className='text-[20px] font-bold text-[#222222]'>Settings</h2>
      </div>

      {/* Menu Items */}
      <div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={`relative flex items-center justify-between cursor-pointer p-3 ${
                activeItem === item.id ? 'bg-[#F1F1F1EE]' : 'hover:bg-gray-100'
              }`}
            >
              <div className='flex items-center'>
                {/* Active indicator */}
                <div
                  className={`absolute left-0 top-0 h-full w-0.5 rounded-r-md ${
                    activeItem === item.id ? 'bg-[#3A98BB]' : 'bg-transparent'
                  }`}
                />
                {Icon && (
                  <Icon
                    className={`w-6 h-6 mr-3 ${
                      activeItem === item.id ? 'text-[#3A98BB]' : 'text-[#767676]'
                    }`}
                  />
                )}
                <span
                  className={`text-lg font-normal ${
                    activeItem === item.id ? 'text-[#3A98BB]' : 'text-[#767676]'
                  }`}
                >
                  {item.label}
                </span>
              </div>

              {/* Chevron Right (mobile only) */}
              <ChevronRight className='w-5 h-5 text-gray-400 sm:hidden' />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar_MenuCard;
