'use client';

import React, { useState } from 'react';
import OngoingContracts from './OngoingContracts';
import CompletedContracts from './CompletedContracts';
import PendingProjects from './PendingProject';
import SearchBar from '../../../../components/Searchbar';
import { HiOutlineAdjustments } from 'react-icons/hi';
import PaginationTab from '../../../../components/Pagination';

const cn = (...classes) => classes.filter(Boolean).join(' ');

const tabs = [
  { id: 'pending', label: 'Pending Contracts (2)' },
  { id: 'ongoing', label: 'Ongoing Contracts (3)' },
  { id: 'completed', label: 'Completed Contracts (5)' },
];

export default function UnderlinedTabs() {
  const [activeTab, setActiveTab] = useState('pending'); // Default tab

  return (
    <>
      <div className='lg:bg-[#FAFAFA] bg-transparent lg:border-1 lg:border-[#EAEAEA] w-full lg:mx-[38px] lg:max-w-[90%] lg:px-[35px] py-[45px] lg:mt-8 mb-8'>
        {/* Mobile Search Bar (fixed, not scrollable) */}
        <div className='lg:hidden flex ml-[20px] mt-4 mb-[25.5px] items-center w-full pr-[20px] gap-3'>
          <div className="flex-1">
            <SearchBar placeholder='Search project' />
          </div>
          <HiOutlineAdjustments className="w-6 h-6 text-[#878787]" />
        </div>

        {/* Mobile Scrollable Tabs */}
        <div className='w-full overflow-x-auto lg:overflow-x-visible'>
          <div className='flex w-full gap-[30px] border-b border-[#EAEAEA] px-[20px]'>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'lg:px-0 lg:py-0 pb-3 text-sm lg:text-lg transition-colors duration-200 whitespace-nowrap relative',
                  activeTab === tab.id
                    ? 'text-[#222222] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#3A98BB]'
                    : 'text-[#878787] font-normal'
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

      {/* Pagination (Outside Main Container) */}
      <div className='flex justify-center items-center mt-8 mb-[100px]'>
        <PaginationTab />
      </div>
    </>
  );
}
