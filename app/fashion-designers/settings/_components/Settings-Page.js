'use client';
import React, { useState } from 'react';
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
  { id: 'notifications', label: 'Notifications', icon: LucideBell },
  { id: 'security', label: 'Security Settings', icon: LucideLock },
];

const SettingsPage = () => {
  const [activeItem, setActiveItem] = useState('notifications');
  const [showSidebar, setShowSidebar] = useState(true); // for mobile

  const renderActiveComponent = () => {
    switch (activeItem) {
      case 'notifications':
        return <NotificationSettings />;
      case 'security':
        return <SecuritySettings />;
      case 'profile':
        return <div>Profile Settings Content</div>;
      case 'account':
        return <div>Account Settings Content</div>;
      default:
        return <div>Select a setting.</div>;
    }
  };

  return (
    <div className='w-full min-h-screen'>
      {/* ----- Desktop View ----- */}
      <div className='hidden sm:flex h-full gap-8 items-start'>
        {/* Sidebar on Desktop */}
        <div className='w-64 flex-shrink-0 sticky top-28'>
          <Sidebar_MenuCard
            menuItems={settingsMenu}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
        </div>

        {/* Content on Desktop (fills remaining space) */}
        <div className='flex-1 p-6 bg-white overflow-hidden sticky top-28 rounded-lg shadow-sm'>
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
              // hide sidebar only for security settings
              if (id === 'security') {
                setShowSidebar(false);
              }
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
              <span className='text-[20px]'>Security Settings</span>
            </button>

            {/* Security Settings full width */}
            <SecuritySettings />
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
