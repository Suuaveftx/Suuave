import React from 'react';
import { useState } from 'react';
import CustomButton from '../../../../components/CustomButton';
import SearchBar from '../../../../components/Searchbar';
import Link from 'next/link';
import { MoreHorizontal } from 'lucide-react';
import SubmitProjectModal from '../../../../components/SubmitProjectModal';
import ChatClientModal from '../../../../components/ChatClientModal';
import FilterDropdown from '../../../../components/FilterDropdown';

const OngoingContracts = () => {
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [dateFilter, setDateFilter] = useState('');

  const dateOptions = [
    'Today',
    'This week',
    'This month',
    'Last 3 month',
    'Last 6 month',
    'This year',
    'Calendar'
  ];

  const pendingProjects = [
    {
      title: 'Modern Fashion Attire Illustration',
      id: '24t64754-A',
      StartDate: '18th June, 2024',
      EndDate: '20th July, 2024',
      timeStatus: '(2d left)',
      badgeColor: '#22C55E'
    },
    {
      title: 'Avant Garde Concept Sketch',
      id: '98k21456-B',
      StartDate: '5th July, 2024',
      EndDate: '15th August, 2024',
      timeStatus: '(10d late)',
      badgeColor: '#D32F2F' // Red
    },
    {
      title: 'Summer Collection 3D Mockup',
      id: '12m78390-C',
      StartDate: '20th August, 2024',
      EndDate: '30th September, 2024',
      timeStatus: '(1d left)',
      badgeColor: '#22C55E' // Green
    },
  ];

  // Date Filter Logic
  const parseContractDate = (dateStr) => {
    if (!dateStr) return new Date(0);
    // Handle YYYY-MM-DD from calendar
    if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) return new Date(dateStr);
    // Handle ordinal dates like "18th June, 2024"
    const normalized = dateStr.replace(/(\d+)(st|nd|rd|th)/, '$1');
    return new Date(normalized);
  };

  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  const isWithinLastDays = (date, days) => {
    const today = new Date();
    const diffTime = Math.abs(today - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= days;
  };

  let filteredProjects = pendingProjects;

  // Filter by Date
  if (dateFilter) {
    const now = new Date();
    filteredProjects = filteredProjects.filter((project) => {
      const cDate = parseContractDate(project.StartDate);

      if (dateFilter === 'Today') return isToday(cDate);
      if (dateFilter === 'This week') return isWithinLastDays(cDate, 7);
      if (dateFilter === 'This month') {
        return cDate.getMonth() === now.getMonth() && cDate.getFullYear() === now.getFullYear();
      }
      if (dateFilter === 'Last 3 month') return isWithinLastDays(cDate, 90);
      if (dateFilter === 'Last 6 month') {
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(now.getMonth() - 6);
        return cDate >= sixMonthsAgo;
      }
      if (dateFilter === 'This year') return cDate.getFullYear() === now.getFullYear();
      if (dateFilter.includes('-')) {
        // Date from calendar (YYYY-MM-DD)
        const filterDate = new Date(dateFilter);
        return cDate.toDateString() === filterDate.toDateString();
      }
      return true;
    });
  }

  return (
    <>
      {/* Search and Sort Section - Desktop */}
      <div className='lg:flex hidden lg:flex-row lg:justify-between lg:items-center items-center mt-6'>
        <div className='w-full max-w-[500px]'>
          <SearchBar
            placeholder='Search by job title'
            className='w-full'
          />
        </div>
        <div className='flex items-center gap-3 ml-auto'>
          <FilterDropdown
            label='Select Date'
            options={dateOptions}
            selectedOption={dateFilter}
            setSelectedOption={setDateFilter}
            defaultLabel='Select Date'
          />
        </div>
      </div>

      {/* Contracts List */}
      <div className='lg:mt-8'>
        {filteredProjects.map((project) => (
          <div key={project.id} className='bg-white border border-[#EAEAEA] lg:bg-white lg:border lg:border-[#EAEAEA] px-4 py-4 rounded-lg shadow-sm lg:shadow-md lg:px-6 lg:py-6 mt-4 lg:mt-[26px] mb-4'>
            <div className='md:grid md:grid-cols-[1.5fr_1fr_auto] md:gap-x-8 md:items-center'>
              {/* Project Info */}
              <Link
                href={`/artist-page/ongoing-contract-information?id=${project.id}&timeStatus=${encodeURIComponent(project.timeStatus)}&color=${encodeURIComponent(project.badgeColor)}`}
                className='w-full lg:w-auto'
              >
                <div className='flex flex-col items-start md:pl-8'>
                  <h3 className='font-proximanova text-base tracking-[0.33px] text-[#222222] hover:text-[#3A98BB] transition-colors font-bold mb-1 truncate w-full'>
                    {project.title} ({project.id})
                  </h3>
                  <div className='flex items-center gap-1'>
                    <span
                      className='py-1 text-xs font-bold inline-flex items-center rounded whitespace-nowrap'
                      style={{
                        backgroundColor: project.badgeColor === '#3A98BB' ? `${project.badgeColor}26` : 'transparent',
                        color: project.badgeColor
                      }}
                    >
                      {project.timeStatus}
                    </span>
                  </div>
                </div>
              </Link>

              <div className='mt-2 md:mt-0 flex flex-col items-start text-sm font-proximanova text-gray-600'>
                <div className='mb-1 flex items-center gap-2'>
                  <span className='text-xs font-satoshi flex-shrink-0 w-20 text-gray-500'>Start Date :</span>
                  <span className='whitespace-nowrap font-semibold text-[#222222]'>{project.StartDate}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='text-xs font-satoshi flex-shrink-0 w-20 text-gray-500'>End Date :</span>
                  <span className='whitespace-nowrap font-semibold text-[#222222]'>{project.EndDate}</span>
                </div>
              </div>

              {/* Actions Section */}
              <div className='flex flex-col-reverse md:flex-row justify-end items-center gap-4 mt-4 md:mt-0'>
                <div className='hidden lg:flex items-center gap-4 lg:min-w-fit'>
                  <SubmitProjectModal
                    trigger={
                      <CustomButton
                        variant='outline'
                        size='sm'
                        className='items-center font-bold px-6'
                        text='Submit'
                        style={{
                          color: '#035A7A',
                          background: 'linear-gradient(180deg, #E0F2F7 0%, #D1ECF4 100%)',
                          border: 'none',
                          borderRadius: '20px'
                        }}
                      />
                    }
                  />
                  <ChatClientModal
                    trigger={
                      <CustomButton
                        variant='outline'
                        size='sm'
                        className='items-center font-bold px-6'
                        text='Chat Client'
                        style={{
                          color: '#222222',
                          background: 'transparent',
                          border: '1px solid #D1D1D1',
                          borderRadius: '20px'
                        }}
                      />
                    }
                  />

                  <div className='flex items-center relative space-x-1'>
                    <span className='text-sm font-bold text-[#222222]'>More</span>
                    <button
                      onClick={() =>
                        setDropdownOpen(dropdownOpen === project.id ? null : project.id)
                      }
                    >
                      <MoreHorizontal className='w-5 h-5 text-[#878787] cursor-pointer' />
                    </button>
                    {dropdownOpen === project.id && (
                      <div className='absolute  bottom-full mb-1 w-fit whitespace-nowrap bg-white border border-gray-200 rounded-lg shadow-lg z-10 lg:right-0'>
                        <button
                          onClick={() => setDropdownOpen(null)}
                          className='block px-4 py-2 text-base font-normal text-[#222222] hover:bg-gray-100 w-full text-right'
                        >
                          Report
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Mobile-only three dots */}
                <div className='absolute right-[-10px] top-0 flex lg:hidden mt-2 mr-2'>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setDropdownOpen(dropdownOpen === project.id ? null : project.id)
                    }}
                  >
                    <MoreHorizontal className='w-5 h-5 text-gray-400 cursor-pointer' />
                  </button>
                  {dropdownOpen === project.id && (
                    <div className='absolute right-0 mt-8 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10'>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setDropdownOpen(null)
                        }}
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left'
                      >
                        Report
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default OngoingContracts;
