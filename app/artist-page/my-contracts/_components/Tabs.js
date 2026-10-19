'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import OngoingContracts from './OngoingContracts';
import CompletedContracts from './CompletedContracts';
import PendingProjects from './PendingProject';

const cn = (...classes) => classes.filter(Boolean).join(' ');

const tabs = [
  { id: 'pending', label: 'Pending Contracts' },
  { id: 'ongoing', label: 'Ongoing Contracts' },
  { id: 'completed', label: 'Completed Contracts' },
];

const dateOptions = [
  'Today',
  'This week',
  'This month',
  'Last 3 month',
  'Last 6 month',
  'This year',
  'Calendar'
];

export default function UnderlinedTabs() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabParam || 'pending');
  const [dateFilter, setDateFilter] = useState('');

  return (
    <>
      <div className='bg-[#FFFFFF] lg:border lg:border-[#EAEAEA] w-full lg:px-[35px] py-[20px] lg:py-[45px] lg:mt-8 mb-8 rounded-[16px]'>
        <div className='font-satoshi'>
          {/* Tab Navigation */}
          <div className='flex w-full flex-col mb-6 lg:mb-8 px-0 lg:px-0 min-w-0'>
            <div className='flex items-center gap-5 lg:gap-12 w-full relative p-0 border-b border-gray-100 px-4 lg:px-[20px] overflow-x-auto no-scrollbar'>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'px-0 py-3 h-auto max-w-fit text-[14px] lg:text-[15px] transition-colors duration-200 whitespace-nowrap relative flex-shrink-0',
                    activeTab === tab.id
                      /* Mobile: blue underline + bold; Desktop: black underline + bold */
                      ? 'text-[#222222] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#3A98BB] lg:after:bg-[#222222]'
                      : 'text-[#878787] font-medium'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className='mt-4 px-0'>
            {activeTab === 'ongoing' && (
              <OngoingContracts
                dateFilter={dateFilter}
                setDateFilter={setDateFilter}
                dateOptions={dateOptions}
              />
            )}
            {activeTab === 'completed' && (
              <CompletedContracts
                dateFilter={dateFilter}
                setDateFilter={setDateFilter}
                dateOptions={dateOptions}
              />
            )}
            {activeTab === 'pending' && <PendingProjects />}
          </div>
        </div>
      </div>
    </>
  );
}
