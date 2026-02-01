'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar_MenuCard from './Sidebar-MenuCard';
import NotificationSettings from './Notification-Settings';
import SecuritySettings from './Security-Settings';

import {
  Bell as LucideBell,
  Lock as LucideLock,
  HelpCircle as LucideHelpCircle,
  Phone as LucidePhone,
  CircleUserRound as LucideCircleUserRound,
  ChevronLeft,
} from 'lucide-react';

const settingsMenu = [
  { id: 'profile', label: 'Profile', icon: LucideCircleUserRound },
  { id: 'notifications', label: 'Notifications', icon: LucideBell },
  { id: 'security', label: 'Security', icon: LucideLock },
];

const SettingsPage = () => {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState('profile');
  const [showSidebar, setShowSidebar] = useState(true); // for mobile

  const renderActiveComponent = () => {
    switch (activeItem) {
      case 'profile':
        return <div>Profile Settings Content</div>;
      case 'notifications':
        return <NotificationSettings />;
      case 'security':
        return <SecuritySettings />;
      default:
        return <div>Select a setting.</div>;
    }
  };

  return (
    <div className='w-full h-screen'>
      {/* ----- Desktop View ----- */}
      <div className='hidden sm:flex h-full'>
        {/* Sidebar on Desktop */}
        <div className='w-64 flex-shrink-0'>
          <Sidebar_MenuCard
            menuItems={settingsMenu}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
        </div>

        {/* Content on Desktop (fills remaining space) */}
        <div className='flex p-6  bg-white lg:w-full lg:max-w-[950px] w-full max-w-[3640px] overflow-hidden'>
          {renderActiveComponent()}
        </div>
      </div>

      {/* ----- Mobile View ----- */}
      <div className='block sm:hidden w-full h-full'>
        {showSidebar ? (
          <Sidebar_MenuCard
            menuItems={settingsMenu}
            activeItem={activeItem}
            setActiveItem={(id) => {
              setActiveItem(id);
              // hide sidebar for any selected setting
              setShowSidebar(false);
            }}
          />
        ) : (
          <div className='w-full p-4'>
            {/* Back Button */}
            <button
              className='flex items-center text-[#222222] font-semibold mb-4'
              onClick={() => setShowSidebar(true)}
            >
              <ChevronLeft className='w-5 h-5 mr-1' />
              {activeItem !== 'notifications' && (
                <span className='text-[20px]'>
                  {activeItem === 'profile' ? 'Profile' : 'Security'}
                </span>
              )}
            </button>

            {/* Render active component */}
            {renderActiveComponent()}
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
