import React, { useState } from 'react';
import {
  LucideBell,
  LucideLock,
  LucideHelpCircle,
  LucidePhone,
  LucideCircleUserRound,
} from 'lucide-react';
import Sidebar_MenuCard from './Sidebar-MenuCard';

const settingsMenu = [
  { id: 'profile', label: 'Profile Settings', icon: LucideCircleUserRound },
  { id: 'notifications', label: 'Notifications', icon: LucideBell },
  { id: 'security', label: 'Security Settings', icon: LucideLock },
  { id: 'faq', label: 'FAQ', icon: LucideHelpCircle },
  { id: 'help', label: 'Help', icon: LucidePhone },
];

const Settings_Page = () => {
  const [activeItem, setActiveItem] = useState('profile');

  return (
    <div className="p-4">
      <Sidebar_MenuCard
        menuItems={settingsMenu}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />
    </div>
  );
};

export default Settings_Page;
