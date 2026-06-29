'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar_MenuCard from './Sidebar-MenuCard';
import NotificationSettings from './Notification-Settings';
import SecuritySettings from './Security-Settings';
import AccountSettings from './Account-Settings';

import {
  Bell as LucideBell,
  Lock as LucideLock,
  CircleUserRound as LucideCircleUserRound,
  UserCog as LucideUserCog,
  ChevronLeft,
} from 'lucide-react';

const settingsMenu = [
  { id: 'profile', label: 'Profile Settings', icon: LucideCircleUserRound },
  { id: 'notifications', label: 'Notifications', icon: LucideBell },
  { id: 'security', label: 'Security', icon: LucideLock },
  { id: 'account', label: 'Account', icon: LucideUserCog },
];

const SettingsPage = () => {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState('notifications');
  const [showSidebar, setShowSidebar] = useState(true); // for mobile

  const handleSetItem = (id) => {
    if (id === 'profile') {
      router.push('/fashion-designers/personal-details/edit');
    } else {
      setActiveItem(id);
      setShowSidebar(false);
    }
  };

  const renderActiveComponent = () => {
    switch (activeItem) {
      case 'notifications':
        return <NotificationSettings />;
      case 'security':
        return <SecuritySettings />;
      case 'account':
        return <AccountSettings />;
      default:
        return <div>Select a setting.</div>;
    }
  };

  return (
    <div className='w-full h-[calc(100vh-104px)] overflow-hidden'>
      {/* ----- Desktop View ----- */}
      <div className='hidden sm:flex h-full'>
        {/* Sidebar on Desktop */}
        <div className='w-64 flex-shrink-0'>
          <Sidebar_MenuCard
            menuItems={settingsMenu}
            activeItem={activeItem}
            setActiveItem={handleSetItem}
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
            setActiveItem={handleSetItem}
          />
        ) : (
          <div className='w-full p-4'>
            {/* Back Button */}
            <button
              className='text-sm text-[#767676] mb-2 flex items-center gap-1'
              onClick={() => setShowSidebar(true)}
            >
              Back
            </button>
            <h2 className='text-[28px] font-semibold text-[#222222] mb-4'>
              {activeItem === 'profile'
                ? 'Profile Settings'
                : activeItem === 'notifications'
                  ? 'Notifications'
                  : activeItem === 'security'
                    ? 'Security'
                    : 'Account'}
            </h2>

            {/* Render active component */}
            {renderActiveComponent()}
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
