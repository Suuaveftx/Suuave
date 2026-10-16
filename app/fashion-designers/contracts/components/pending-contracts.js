"use client";

import React, { useEffect } from "react";
import {
  MagnifyingGlassIcon,
  ExclamationTriangleIcon,
  EllipsisHorizontalIcon,
  AdjustmentsVerticalIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { Input, Card, CardBody, Button, Alert, Pagination } from "@heroui/react";
import { createPortal } from 'react-dom';

const PendingContracts = ({
  contracts = [],
  search = "",
  onSearchChange = () => { },
  onContractClick = () => { },
  onCancelContract = () => { },
  onMessageArtist = () => { },
  showAlert = true,
}) => {
  // Mobile menu state
  // Mobile menu state
  const [openMenuContract, setOpenMenuContract] = React.useState(null);
  const menuRef = React.useRef(null);
  const menuButtonRefs = React.useRef({});
  const [menuPosition, setMenuPosition] = React.useState({ top: 0, right: 0 });

  useEffect(() => {
    const handleClose = (e) => {
      if (menuRef.current && menuRef.current.contains(e.target)) {
        return;
      }
      const isButton = Object.values(menuButtonRefs.current).some(
        (btn) => btn && btn.contains(e.target)
      );
      if (isButton) {
        return;
      }
      setOpenMenuContract(null);
    };
    document.addEventListener('mousedown', handleClose);
    document.addEventListener('touchstart', handleClose);
    return () => {
      document.removeEventListener('mousedown', handleClose);
      document.removeEventListener('touchstart', handleClose);
    };
  }, []);

  const [dateFilter, setDateFilter] = React.useState('');

  const dateOptions = [
    'Today',
    'This week',
    'This month',
    'Last 3 month',
    'Last 6 month',
    'This year'
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

  // Filter contracts based on search and date
  let filteredContracts = contracts.filter((contract) =>
    contract.title.toLowerCase().includes(search.toLowerCase())
  );

  if (dateFilter) {
    const now = new Date();
    filteredContracts = filteredContracts.filter((contract) => {
      const cDate = parseContractDate(contract.pendingSince);

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
      return true;
    });
  }

  // Pagination state & calculations
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredContracts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredContracts.slice(startIndex, endIndex);

  return (
    <div className="px-4 lg:px-0">
      {/* Search */}
      <div className="mb-6 w-full">
        <div className="flex items-start space-x-3 p-3 rounded-lg bg-[#FFF8EB] border border-[#FFF8EB] mb-6 w-fit max-w-[95%]">
          <ExclamationTriangleIcon className="text-[#FF8024] w-5 h-5 mt-0.5" />
          <p className="text-xs text-[#E68A1D] font-bold leading-[1.4]">
            Artists have 2 days to accept these offers. <br />
            Failure to do so will result in automatic cancellation.
          </p>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <Input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search Project"
              startContent={
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              }
              className="flex-1 md:max-w-md md:flex-none"
              classNames={{
                input: "text-sm",
                inputWrapper:
                  "border border-gray-300 rounded-full bg-white hover:border-gray-400 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500",
              }}
            />
          </div>
        </div>
      </div>

      {/* Contract Cards */}
      <div className="space-y-3 lg:mt-8">
        {currentItems.map((contract, index) => (
          <Card
            key={contract.id || index}
            className="group bg-white border border-gray-200 hover:border-[#3A98BB]/40 hover:shadow-md transition-all w-full !overflow-visible rounded-[12px]"
            classNames={{ base: 'overflow-visible' }}
            shadow="none"
          >
            <div
              className="cursor-pointer"
              onClick={() => onContractClick(contract.id)}
            >
              <CardBody className="md:px-2 px-1 py-1 overflow-visible">
                {/* Card content container — switches to flex-row on md */}
                <div className='flex flex-col md:flex-row md:justify-between items-start md:items-center w-full gap-3 p-3 pt-1'>

                  {/* Left block */}
                  <div className='flex-1 flex flex-col md:grid md:grid-cols-[1.5fr_1fr_1fr_auto] md:gap-x-4 md:items-center min-w-0 w-full'>

                    {/* Title & Mobile 3-dot row */}
                    <div className='flex items-start justify-between w-full min-w-0 mb-2 md:mb-0'>
                      <div className='flex flex-col items-start gap-1 flex-1 min-w-0'>
                        <h3 className='font-semibold text-[15px] md:text-[16px] text-[#3A98BB] truncate w-full group-hover:text-[#3A98BB] transition-colors leading-snug'>
                          {contract.title} {contract.id ? `(${contract.id})` : ''}
                        </h3>
                        {/* Status Chip removed */}
                      </div>

                      {/* Mobile 3-dots */}
                      <div className='md:hidden shrink-0 -mt-0.5 ml-2'>
                        <button
                          type='button'
                          ref={(el) => { menuButtonRefs.current[contract.id || index] = el; }}
                          className='flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors'
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            const btnId = contract.id || index;
                            const btnEl = menuButtonRefs.current[btnId];
                            if (btnEl) {
                              const rect = btnEl.getBoundingClientRect();
                              setMenuPosition({
                                top: rect.bottom + 4,
                                right: window.innerWidth - rect.right,
                              });
                            }
                            setOpenMenuContract(openMenuContract?.id === (contract.id || index) ? null : contract);
                          }}
                        >
                          <EllipsisHorizontalIcon className='w-5 h-5 text-gray-500' />
                        </button>
                      </div>
                    </div>

                    {/* Date Columns */}
                    <div className='flex flex-col items-start text-[13px] md:text-[14px] font-satoshi text-gray-500 space-y-1 md:space-y-0'>
                      <div className='flex items-center gap-2'>
                        <span className='font-light md:font-normal flex-shrink-0'>Start Date -</span>
                        <span className='whitespace-nowrap font-semibold text-[#222222]'>{contract.pendingSince}</span>
                      </div>
                      <div className='flex items-center gap-2 md:hidden'>
                        <span className='font-light flex-shrink-0 text-gray-500'>End Date -</span>
                        {/* Display generic End Date mock since original only has expiresIn */}
                        <span className='whitespace-nowrap font-semibold text-[#222222]'>25th June, 2024</span>
                      </div>
                    </div>

                    <div className='hidden md:flex flex-col items-start text-[14px] font-satoshi text-gray-500'>
                      <div className='flex items-center gap-2'>
                        <span className="font-light whitespace-nowrap text-gray-500">Expires in -</span>
                        <span className="font-semibold whitespace-nowrap text-[#222222]">{contract.expiresIn}</span>
                      </div>
                    </div>
                  </div>

                  {/* Desktop: action buttons + more options inline (hidden on mobile) */}
                  <div className='hidden md:flex flex-row justify-end items-center gap-3 shrink-0 pl-4 overflow-visible'>
                    <div className='flex items-center gap-3 shrink-0' onClick={(e) => e.stopPropagation()}>
                      <Button
                        className='bg-white text-[#222222] font-bold rounded-full px-6 h-[42px] border border-[#D1D1D1] w-[160px]'
                        radius='full'
                        variant='bordered'
                        onPress={() => { onMessageArtist(contract); }}
                      >
                        Message Artist
                      </Button>
                      <Button
                        className='bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] text-[#035A7A] font-bold rounded-full px-6 h-[42px] border-0 shadow-md'
                        radius='full'
                        onPress={() => { onCancelContract(contract.id); }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>

                </div>
              </CardBody>
            </div>

            {/* Portal Dropdown is rendered in the global file block */}
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {
        totalPages > 0 && (
          <div className="flex justify-center items-center mt-8 w-full">
            <Pagination
              showControls
              total={totalPages}
              page={currentPage}
              onChange={setCurrentPage}
              classNames={{
                cursor: "bg-[#3A98BB] text-white",
              }}
            />
          </div>
        )
      }

      {/* Empty State */}
      {
        filteredContracts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {search ? "No contracts match your search" : "No pending contracts"}
            </p>
          </div>
        )
      }

      {/* Portal dropdown — renders at document.body, immune to overflow:hidden */}
      {openMenuContract !== null && typeof document !== 'undefined' && createPortal(
        <div
          ref={menuRef}
          style={{
            position: 'fixed',
            top: menuPosition.top,
            right: menuPosition.right,
            zIndex: 9999,
          }}
          className='w-48 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden flex flex-col'
          onPointerDown={(e) => e.stopPropagation()}
        >
          <button
            className='w-full text-left px-4 py-3 text-sm text-[#222222] hover:bg-[#F7FBFD] hover:text-[#3A98BB] transition-colors font-medium border-b border-gray-100'
            onClick={(e) => {
              e.stopPropagation();
              const contract = openMenuContract;
              setOpenMenuContract(null);
              if (contract) onMessageArtist(contract);
            }}
          >
            Message Artist
          </button>
          <button
            className='w-full text-left px-4 py-3 text-sm text-[#222222] hover:bg-[#F7FBFD] hover:text-[#3A98BB] transition-colors font-medium'
            onClick={(e) => {
              e.stopPropagation();
              const contract = openMenuContract;
              setOpenMenuContract(null);
              if (contract && contract.id) onCancelContract(contract.id);
            }}
          >
            Cancel
          </button>
        </div>,
        document.body
      )}
    </div >
  );
};

export default PendingContracts;
