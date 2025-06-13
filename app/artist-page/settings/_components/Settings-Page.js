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
} from 'lucide-react';

const settingsMenu = [
  { id: 'profile', label: 'Profile Settings', icon: LucideCircleUserRound },
  { id: 'notifications', label: 'Notifications', icon: LucideBell },
  { id: 'security', label: 'Security Settings', icon: LucideLock },
  { id: 'faq', label: 'FAQ', icon: LucideHelpCircle },
  { id: 'help', label: 'Help', icon: LucidePhone },
];

const SettingsPage = () => {
  const [activeItem, setActiveItem] = useState('profile');

  const renderActiveComponent = () => {
    switch (activeItem) {
      case 'notifications':
        return <NotificationSettings />;
      case 'security':
        return <SecuritySettings />;
      case 'profile':
      default:
        return <div>Select a setting.</div>;
    }
  };

  return (
    <>
      <Sidebar_MenuCard
        menuItems={settingsMenu}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />
      <div className="flex-1">{renderActiveComponent()}</div>
    </>
  );
};

export default SettingsPage;
