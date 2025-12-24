'use client';
import { useState, useRef, useEffect } from 'react';
import { Tabs, Tab } from '@heroui/react';
import PaymentTable from './PaymentTable';
import PayoutHistory from './PayoutHistory';
import { Search, ChevronDown, Calendar, Info } from 'lucide-react';

export default function PaymentTabs() {
  const [selectedTab, setSelectedTab] = useState('earnings');
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('All Types');

  const typeDropdownRef = useRef(null);
  const dateDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (typeDropdownRef.current && !typeDropdownRef.current.contains(event.target)) {
        setIsTypeDropdownOpen(false);
      }
      if (dateDropdownRef.current && !dateDropdownRef.current.contains(event.target)) {
        setIsDateDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter state: { type: 'date' | 'range', value: string | number, label: string }
  // Default to showing "Date" placeholder or implies all/custom
  const [filterState, setFilterState] = useState({ type: 'date', value: '', label: 'Date' });

  const handleDateChange = (e) => {
    const date = e.target.value;
    setFilterState({ type: 'date', value: date, label: date });
    setIsDateDropdownOpen(false);
  };

  const handleRangeSelect = (days) => {
    setFilterState({ type: 'range', value: days, label: `Last ${days} days` });
    setIsDateDropdownOpen(false);
  };

  const handleReset = () => {
    setFilterState({ type: 'date', value: '', label: 'Date' });
    setIsDateDropdownOpen(false);
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setIsTypeDropdownOpen(false);
  };

  const handleTypeReset = () => {
    setSelectedType('All Types');
    setIsTypeDropdownOpen(false);
  };

  return (
    <div className='w-full'>
      {/* Top Header Section: Tabs + Summary Cards */}
      <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center relative'>
        {/* Tabs */}
        <div className='w-full lg:w-auto'>
          <Tabs
            aria-label='Payment Options'
            selectedKey={selectedTab}
            onSelectionChange={setSelectedTab}
            className='!shadow-none p-0 bg-transparent'
            variant='underlined'
            classNames={{
              tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
              cursor: "w-full bg-[#3A98BB]",
              tab: "max-w-fit px-0 h-12",
              tabContent: "group-data-[selected=true]:text-[#3A98BB] text-[#767676] font-bold text-lg"
            }}
          >
            <Tab key='earnings' title='Earning History' />
            <Tab key='payouts' title='Payout History' />
          </Tabs>
        </div>


      </div>

      {/* Filter Row (Only for Earning History for now) */}
      {selectedTab === 'earnings' && (
        <div className='mt-8 flex flex-col xl:flex-row gap-4 justify-between items-center'>

          {/* Left Side: Search Bar */}
          <div className='relative flex-grow max-w-2xl w-full'>
            <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
              <Search className='h-5 w-5 text-gray-400' />
            </div>
            <input
              type='text'
              placeholder='Search'
              className='block w-full pl-11 pr-4 py-3 bg-white border border-[#E5E5E5] rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-[#3A98BB] placeholder-gray-400'
            />
          </div>

          {/* Right Side: Filters + Report Button */}
          <div className='flex gap-4 items-center w-full xl:w-auto mt-4 xl:mt-0 overflow-x-auto xl:overflow-visible pb-2 xl:pb-0 scrollbar-hide'>

            {/* All Types Dropdown */}
            <div className='relative flex-shrink-0' ref={typeDropdownRef}>
              <button
                onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
                className='flex items-center justify-between gap-2 px-6 py-3 bg-white border border-[#E5E5E5] rounded-full text-sm text-[#555555] whitespace-nowrap hover:bg-gray-50'
              >
                {selectedType}
                <ChevronDown className={`h-4 w-4 transition-transform ${isTypeDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isTypeDropdownOpen && (
                <div className='absolute top-full left-0 mt-2 w-48 bg-white border border-[#E5E5E5] rounded-xl shadow-lg py-2 z-50 overflow-hidden'>
                  {selectedType !== 'All Types' && (
                    <div
                      onClick={handleTypeReset}
                      className='px-4 py-2 hover:bg-gray-50 cursor-pointer text-[#555555] text-sm hover:text-[#3A98BB] font-medium border-b border-gray-100'
                    >
                      Reset Filter
                    </div>
                  )}
                  <div
                    onClick={() => handleTypeSelect('Licensing')}
                    className='px-4 py-2 hover:bg-gray-50 cursor-pointer text-[#555555] text-sm hover:text-[#3A98BB]'
                  >
                    Licensing
                  </div>
                  <div
                    onClick={() => handleTypeSelect('Projects')}
                    className='px-4 py-2 hover:bg-gray-50 cursor-pointer text-[#555555] text-sm hover:text-[#3A98BB]'
                  >
                    Projects
                  </div>
                  <div
                    onClick={() => handleTypeSelect('Buy more time')}
                    className='px-4 py-2 hover:bg-gray-50 cursor-pointer text-[#555555] text-sm hover:text-[#3A98BB]'
                  >
                    Buy more time
                  </div>
                </div>
              )}
            </div>

            {/* Date Dropdown */}
            <div className='relative flex-shrink-0' ref={dateDropdownRef}>
              <button
                onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
                className='flex items-center justify-between gap-2 px-6 py-3 bg-white border border-[#E5E5E5] rounded-full text-sm text-[#555555] whitespace-nowrap hover:bg-gray-50'
              >
                <Calendar className='h-4 w-4 text-gray-400' />
                {filterState.label}
                <ChevronDown className={`h-4 w-4 transition-transform ${isDateDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDateDropdownOpen && (
                <div className='absolute top-full left-0 mt-2 w-64 bg-white border border-[#E5E5E5] rounded-xl shadow-lg z-50 overflow-hidden'>
                  {/* Range Options */}
                  <div className='py-2 border-b border-gray-100'>
                    <div onClick={handleReset} className='px-4 py-2 hover:bg-gray-50 cursor-pointer text-[#555555] text-sm hover:text-[#3A98BB] font-medium'>Reset Filter</div>
                    <div className='border-t border-gray-100 my-1'></div>
                    <div onClick={() => handleRangeSelect(7)} className='px-4 py-2 hover:bg-gray-50 cursor-pointer text-[#555555] text-sm hover:text-[#3A98BB]'>Last 7 days</div>
                    <div onClick={() => handleRangeSelect(14)} className='px-4 py-2 hover:bg-gray-50 cursor-pointer text-[#555555] text-sm hover:text-[#3A98BB]'>Last 14 days</div>
                    <div onClick={() => handleRangeSelect(30)} className='px-4 py-2 hover:bg-gray-50 cursor-pointer text-[#555555] text-sm hover:text-[#3A98BB]'>Last 30 days</div>
                  </div>

                  {/* Custom Date Picker */}
                  <div className='p-4 bg-gray-50'>
                    <input
                      type="date"
                      // If type is range, we don't show a specific date value in the picker, or clear it
                      value={filterState.type === 'date' ? filterState.value : ''}
                      onChange={handleDateChange}
                      className="w-full border border-gray-300 rounded-md p-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#3A98BB] bg-white"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Report Button */}
            <button className='flex-shrink-0 flex items-center gap-2 px-6 py-3 bg-[#FFF5F5] border border-[#FFE0E0] rounded-full text-[#FF4D4D] text-sm font-medium hover:bg-[#ffe6e6] whitespace-nowrap'>
              <Info className='h-4 w-4' />
              Report an Issue
            </button>
          </div>

        </div>
      )}

      {/* Content Area */}
      <div className='mt-6'>
        {selectedTab === 'earnings' && <PaymentTable filterType={filterState.type} filterValue={filterState.value} />}
        {selectedTab === 'payouts' && <PayoutHistory />}
      </div>
    </div>
  );
}
