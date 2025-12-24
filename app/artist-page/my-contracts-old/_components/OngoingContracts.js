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
  const [dateFilter, setDateFilter] = useState('Select Date');
  const [currencyFilter, setCurrencyFilter] = useState('Select Currency');

  const dateOptions = ['Today', 'This Week', 'This Month', 'Last 3 Months', 'Last 6 Months', 'This Year', 'Calendar'];
  const currencyOptions = ['USD ($)', 'EUR (€)', 'GBP (£)', 'NGN (₦)', 'CAD ($)'];

  const pendingProjects = [
    {
      title: 'Modern Fashion Attire Illustration',
      id: '24t64754-A',
      StartDate: '18 June 2024',
      EndDate: '28 July, 2024',
    },
    {
      title: 'Avant Garde Concept Sketch',
      id: '24t64754-B',
      StartDate: '05 July 2024',
      EndDate: '15 August, 2024',
    },
    {
      title: 'Summer Collection 3D Mockup',
      id: '24t64754-C',
      StartDate: '20 August 2024',
      EndDate: '30 September, 2024',
    },
  ];

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
        <div className='flex items-center gap-3'>
          <FilterDropdown
            label='Date'
            options={dateOptions}
            selectedOption={dateFilter}
            setSelectedOption={setDateFilter}
            defaultLabel='Select Date'
          />
          <FilterDropdown
            label='Currency'
            options={currencyOptions}
            selectedOption={currencyFilter}
            setSelectedOption={setCurrencyFilter}
            defaultLabel='Select Currency'
          />
        </div>
      </div>

      {/* Contracts List */}
      <div className='lg:mt-8'>
        {pendingProjects.map((project) => (
          <div
            key={project.id}
            className='bg-white border border-[#EAEAEA] lg:bg-white lg:border lg:border-[#EAEAEA] px-4 py-4 rounded-lg shadow-sm lg:shadow-md lg:px-6 lg:py-6 mt-4 lg:mt-[26px] mb-4 flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4'
          >
            {/* Project Info */}
            <Link href={'/artist-page/ongoing-contract-information'} className='w-full lg:w-auto contents'>
              <div className='lg:flex lg:flex-col lg:items-start lg:justify-center w-full lg:gap-2 relative cursor-pointer'>
                {/* Title Section */}
                <div className='flex flex-col w-[90%] lg:w-full'>
                  <h3 className='text-base tracking-[0.33px] text-[#222222] hover:text-[#3A98BB] transition-colors font-bold flex items-center lg:mb-0 mb-1 lg:gap-0 gap-8'>
                    <span className='truncate block w-[90%] lg:w-auto lg:inline lg:overflow-visible lg:whitespace-normal'>{project.title}</span>
                    <span className='text-base text-inherit font-bold ml-1 lg:flex hidden'>
                      ({project.id})
                    </span>
                  </h3>
                </div>

                {/* Mobile-only three dots */}
                <div className='absolute right-[-10px] top-0 flex lg:hidden'>
                  <button
                    onClick={(e) => {
                      e.preventDefault(); // Prevent link navigation
                      setDropdownOpen(dropdownOpen === project.id ? null : project.id)
                    }}
                  >
                    <MoreHorizontal className='w-5 h-5 text-gray-400 cursor-pointer' />
                  </button>
                  {dropdownOpen === project.id && (
                    <div className='absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10'>
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

                {/* Date Info */}
                <div className='lg:flex lg:flex-col flex-col w-full lg:w-auto justify-start gap-1 lg:gap-1 lg:items-start'>
                  <p className='text-xs lg:text-[14px] text-[#878787] font-normal hover:text-[#3A98BB] transition-colors'>Start Date <span className='mx-1 lg:hidden'>-</span><span className='hidden lg:inline'>:</span> <span className='text-[#222222] font-normal'>{project.StartDate}</span></p>
                  <p className='text-xs lg:text-[14px] text-[#878787] font-normal hover:text-[#3A98BB] transition-colors'>End Date <span className='mx-1 lg:hidden'>-</span><span className='hidden lg:inline'>:</span> <span className='text-[#222222] font-normal'>{project.EndDate}</span></p>
                </div>
              </div>
            </Link>

            {/* Actions Section (Desktop Only) */}
            <div className='hidden lg:flex items-center gap-4 lg:min-w-fit'>
              <SubmitProjectModal
                trigger={
                  <CustomButton
                    variant='outline'
                    size='sm'
                    className='items-center font-bold px-6'
                    text='Submit Project'
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
                  <div className='absolute  top-full mt-1 w-fit whitespace-nowrap bg-white border border-gray-200 rounded-lg shadow-lg z-10 ml-[950px]'>
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
        ))}
      </div>
    </>
  );
};

export default OngoingContracts;
