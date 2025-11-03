'use client';

import React, { useState } from 'react';
import OngoingContracts from './OngoingContracts';
import CompletedContracts from './CompletedContracts';
import PendingProjects from './PendingProject';
import SearchBar from '../../../../components/Searchbar';
import { HiOutlineAdjustments } from 'react-icons/hi';

const cn = (...classes) => classes.filter(Boolean).join(' ');

const tabs = [
  { id: 'pending', label: 'Pending Contracts (2)' },
  { id: 'ongoing', label: 'Ongoing Contracts (3)' },
  { id: 'completed', label: 'Completed Contracts (4)' },
];

export default function UnderlinedTabs() {
  const [activeTab, setActiveTab] = useState('pending'); // Default tab

  return (
    <div className='lg:bg-[#FAFAFA] bg-transparent lg:border-1 lg:border-[#EAEAEA] w-full lg:mx-[38px] lg:max-w-[90%] lg:px-[35px] py-[45px] lg:mt-8 mb-[178px]'>
      {/* Mobile Search Bar (fixed, not scrollable) */}
      <div className='lg:hidden flex ml-[20px] mt-4 mb-[25.5px] items-center w-[80%] mr-8 gap-1'>
        <SearchBar placeholder='Search projects' />
        <HiOutlineAdjustments style={{ width: '25px', height: '25px' }} />
      </div>

      {/* Mobile Scrollable Tabs */}
      <div className='w-full overflow-x-auto lg:overflow-x-visible'>
        <div className='flex w-full gap-[45px] border-b ml-[20px]'>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'lg:px-0 lg:py-0 px-4 py-2 text-base lg:text-lg transition-colors duration-200 whitespace-nowrap',
                activeTab === tab.id
                  ? 'border-b border-[#3A98BB] text-[#222222] font-bold'
                  : 'text-[#222222] font-normal'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className='mt-4'>
        {activeTab === 'ongoing' && <OngoingContracts />}
        {activeTab === 'completed' && <CompletedContracts />}
        {activeTab === 'pending' && <PendingProjects />}
      </div>
    </div>
  );
}
