import React from 'react';
import { useState } from 'react';
import CustomButton from '../../../../components/CustomButton';
import SearchBar from '../../../../components/Searchbar';
import Link from 'next/link';
import { MoreHorizontal, MoreVertical } from 'lucide-react';
import SubmitProjectModal from '../../../../components/SubmitProjectModal';
import ChatClientModal from '../../../../components/ChatClientModal';
import FilterDropdown from '../../../../components/FilterDropdown';
import { HiOutlineCalendar } from 'react-icons/hi';

const OngoingContracts = ({ dateFilter, setDateFilter, dateOptions }) => {
  const [dropdownOpen, setDropdownOpen] = useState(null);

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
      {/* Search and Sort Section */}
      <div className='flex lg:flex-row lg:justify-between lg:items-center items-center w-[92%] mx-auto mb-4 lg:w-full lg:max-w-full lg:mt-6'>
        <div className='w-full lg:max-w-[500px]'>
          <SearchBar
            placeholder="Search Project"
            className='w-full'
            endContent={
              <FilterDropdown
                label='Select Date'
                options={dateOptions}
                selectedOption={dateFilter}
                setSelectedOption={setDateFilter}
                defaultLabel='Select Date'
                trigger={
                  <div className="flex items-center gap-1 cursor-pointer hover:bg-gray-100 p-1.5 rounded-full transition-colors">
                    <HiOutlineCalendar className='w-5 h-5 text-gray-400' />
                    <span className='text-[10px] text-gray-400'>▼</span>
                  </div>
                }
              />
            }
          />
        </div>
      </div>

      {/* Contracts List */}
      <div className='lg:mt-8'>
        {filteredProjects.map((project) => (
          <div key={project.id} className='relative bg-white border border-[#EAEAEA] lg:bg-white lg:border lg:border-[#EAEAEA] px-4 py-4 rounded-lg shadow-sm lg:shadow-md lg:px-6 lg:py-6 mt-4 lg:mt-[26px] mb-4 group hover:bg-gray-50 active:bg-gray-50 active:opacity-[0.98] transition-all duration-200'>
            <div className='md:grid md:grid-cols-[1.5fr_1fr_auto] md:gap-x-8 md:items-center'>
              {/* Project Info */}
              <Link
                href={`/artist-page/ongoing-contract-information?id=${project.id}&timeStatus=${encodeURIComponent(project.timeStatus)}&color=${encodeURIComponent(project.badgeColor)}`}
                className='w-full lg:w-auto active:opacity-80 transition-opacity'
              >
                <div className='flex flex-col items-start md:pl-8'>
                  {/* Desktop Title */}
                  <h3 className='font-proximanova text-base tracking-[0.33px] text-[#222222] group-hover:text-[#3A98BB] group-active:text-[#3A98BB] transition-colors font-bold mb-1 truncate w-full hidden lg:block'>
                    {project.title} ({project.id})
                  </h3>
                  {/* Mobile Title */}
                  <h3 className='font-proximanova text-base tracking-[0.33px] text-[#222222] group-hover:text-[#3A98BB] group-active:text-[#3A98BB] transition-colors font-bold mb-1 w-full lg:hidden block'>
                    Modern Fashion Illustration...
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

              {/* Grouped Dates Column */}
              <div className='mt-2 md:mt-0 flex flex-col items-start text-sm font-proximanova text-gray-600'>
                <div className='mb-1 flex items-center gap-2 w-fit text-left outline-none'>
                  <span className='text-xs font-satoshi flex-shrink-0 w-20 text-gray-500 group-hover:text-[#3A98BB] group-active:text-[#3A98BB] transition-colors'>Start Date :</span>
                  <span className='whitespace-nowrap font-semibold text-[#222222] group-hover:text-[#3A98BB] group-active:text-[#3A98BB] transition-colors'>{project.StartDate}</span>
                </div>
                <div className='flex items-center gap-2 w-fit text-left outline-none'>
                  <span className='text-xs font-satoshi flex-shrink-0 w-20 text-gray-500 group-hover:text-[#3A98BB] group-active:text-[#3A98BB] transition-colors'>End Date :</span>
                  <span className='whitespace-nowrap font-semibold text-[#222222] group-hover:text-[#3A98BB] group-active:text-[#3A98BB] transition-colors'>{project.EndDate}</span>
                </div>
              </div>

              {/* Actions Section Column */}
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
              </div>
            </div>

            {/* Mobile-only three dots - Moved to root level for better z-index / overlap handling */}
            <div className='absolute right-4 top-4 flex lg:hidden z-30'>
              <div className='relative'>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDropdownOpen(dropdownOpen === project.id ? null : project.id)
                  }}
                  className='p-1 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center'
                >
                  <MoreVertical className='w-5 h-5 text-gray-500 cursor-pointer' strokeWidth={3} />
                </button>
                <div className={`${dropdownOpen === project.id ? 'block' : 'hidden'} absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden`}>
                  <div onClick={(e) => e.stopPropagation()}>
                    <SubmitProjectModal
                      trigger={
                        <button
                          className='block px-4 py-3 text-sm text-[#222222] hover:bg-gray-50 active:bg-gray-100 w-full text-left border-b border-gray-100 font-semibold transition-colors'
                          onClick={() => setDropdownOpen(null)}
                        >
                          Submit
                        </button>
                      }
                    />
                  </div>
                  <div onClick={(e) => e.stopPropagation()}>
                    <ChatClientModal
                      trigger={
                        <button
                          className='block px-4 py-3 text-sm text-[#222222] hover:bg-gray-50 active:bg-gray-100 w-full text-left border-b border-gray-100 font-semibold transition-colors'
                          onClick={() => setDropdownOpen(null)}
                        >
                          Chat Client
                        </button>
                      }
                    />
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setDropdownOpen(null);
                    }}
                    className='block px-4 py-3 text-sm text-[#222222] hover:bg-gray-50 active:bg-gray-100 w-full text-left font-semibold transition-colors'
                  >
                    Report
                  </button>
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
