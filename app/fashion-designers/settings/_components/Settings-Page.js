'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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
  const searchParams = useSearchParams();
  const [activeItem, setActiveItem] = useState('notifications');
  const [showSidebar, setShowSidebar] = useState(true);

  // Pre-select tab from URL query param e.g. ?tab=security
  useEffect(() => {
    const tab = searchParams.get('tab');
    const validTabs = ['notifications', 'security', 'account'];
    if (tab && validTabs.includes(tab)) {
      setActiveItem(tab);
      setShowSidebar(false);
    }
  }, [searchParams]);

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
    <div className='w-full min-h-[calc(100vh-104px)] pb-12 pt-6'>

      {/* ----- Desktop View ----- */}
      <div className='hidden sm:flex min-h-[600px] w-full bg-white shadow-sm rounded-xl overflow-hidden border border-gray-100'>

        {/* Left Sidebar Track */}
        <div className='w-64 flex-shrink-0 bg-[#fafafa] border-r border-gray-200'>
          <Sidebar_MenuCard
            menuItems={settingsMenu}
            activeItem={activeItem}
            setActiveItem={handleSetItem}
          />
        </div>

        {/* Right Content Pane */}
        <div className='flex-1 p-8 bg-white'>
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
              className='text-[#222222] mb-2 flex items-center'
              onClick={() => setShowSidebar(true)}
            >
              <ChevronLeft className='w-6 h-6' />
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

            {renderActiveComponent()}
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
