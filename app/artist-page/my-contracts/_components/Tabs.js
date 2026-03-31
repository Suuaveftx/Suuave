'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import OngoingContracts from './OngoingContracts';
import CompletedContracts from './CompletedContracts';
import PendingProjects from './PendingProject';
import SearchBar from '../../../../components/Searchbar';
import PaginationTab from '../../../../components/Pagination';
import FilterDropdown from '../../../../components/FilterDropdown';

const cn = (...classes) => classes.filter(Boolean).join(' ');

const tabs = [
  { id: 'pending', label: 'Pending Contracts (2)' },
  { id: 'ongoing', label: 'Ongoing Contracts (3)' },
  { id: 'completed', label: 'Completed Contracts (5)' },
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
      <div className='lg:bg-[#FAFAFA] bg-transparent lg:border-1 lg:border-[#EAEAEA] w-full lg:mx-[38px] lg:max-w-[90%] lg:px-[35px] py-[45px] lg:mt-8 mb-8'>
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

      {/* Pagination (Outside Main Container) */}
      <div className='flex justify-center items-center mt-8 mb-[100px]'>
        <PaginationTab />
      </div>
    </>
  );
}
