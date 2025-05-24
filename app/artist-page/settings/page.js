'use client';
import React, { useState } from 'react';
import SettingsCard from './_components/Settings-Card';
import NotificationSettings from './_components/Notification-Settings';
import SecuritySettings from './_components/Security-Settings';


const Page = () => {
  const [activeItem, setActiveItem] = useState('security');

  const renderActiveComponent = () => {
    switch (activeItem) {
      case 'notifications':
        return <NotificationSettings />;
      case 'security':
        return <SecuritySettings />;
      case 'profile':
        return <ProfileSettings />;
      case 'faq':
        return <FAQ />;
      case 'help':
        return <Help />;
      default:
        return <div>Select a setting.</div>;
    }
  };

  return (
    <div className="mt-16 ml-4 flex gap-4 h-auto">
      <SettingsCard activeItem={activeItem} setActiveItem={setActiveItem} />
      {renderActiveComponent()}
    </div>
  );
};

export default Page;
