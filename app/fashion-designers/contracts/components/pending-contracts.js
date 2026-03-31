"use client";

import React, { useEffect } from "react";
import {
  MagnifyingGlassIcon,
  ExclamationTriangleIcon,
  EllipsisHorizontalIcon,
  AdjustmentsVerticalIcon,
} from "@heroicons/react/24/outline";
import { Input, Card, CardBody, Button, Alert } from "@heroui/react";
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
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenuContract(null);
      }
    };
    document.addEventListener('pointerdown', handleClose);
    return () => document.removeEventListener('pointerdown', handleClose);
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
  const itemsPerPage = 3;
  const totalPages = Math.ceil(filteredContracts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredContracts.slice(startIndex, endIndex);

  return (
    <div>
      {/* Search */}
      <div className="mb-6 w-full">
        <div className="flex items-start space-x-3 p-3 rounded-lg bg-[#FFF8EB] border border-[#FFF8EB] mb-6 w-fit max-w-[95%]">
          <ExclamationTriangleIcon className="text-[#FF8024] w-5 h-5 mt-0.5" />
          <p className="text-xs text-[#E68A1D] font-bold leading-[1.4]">
            Artists have 5 days to accept these offers. <br />
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
      <div className="space-y-2">
        {currentItems.map((contract, index) => (
          <Card
            key={contract.id || index}
            className="group bg-white border border-gray-200 hover:border-[#3A98BB]/40 hover:shadow-md transition-all w-full !overflow-visible"
            classNames={{ base: 'overflow-visible' }}
            shadow="none"
          >
            <div
              className="cursor-pointer"
              onClick={() => onContractClick(contract.id)}
            >
              <CardBody className="md:px-6 px-3 py-4 overflow-visible">
                <div className="flex md:justify-between items-start w-full">
                  <div className="flex-1 md:grid md:grid-cols-[1.5fr_1fr_0.8fr_auto] md:gap-x-8 md:items-center">
                    <div className="flex flex-col mb-1 md:mb-0">
                      <h3 className="md:text-md text-sm font-proximanova line-clamp-1 group-hover:text-[#3A98BB] transition-colors">
                        {contract.title} ({contract.id})
                      </h3>
                    </div>

                    <p className="text-sm font-satoshi flex items-center gap-2">
                      <span className="font-light whitespace-nowrap text-gray-500 group-hover:text-[#3A98BB]/70 transition-colors">Pending Since -</span>
                      <span className="font-semibold whitespace-nowrap group-hover:text-[#3A98BB] transition-colors">
                        {contract.pendingSince}
                      </span>
                    </p>

                    <p className="text-sm font-satoshi flex items-center gap-2">
                      <span className="max-[840px]:hidden text-gray-300">|</span>
                      <span className="font-light whitespace-nowrap text-gray-500 group-hover:text-[#3A98BB]/70 transition-colors">Expires in -</span>
                      <span className="font-semibold whitespace-nowrap group-hover:text-[#3A98BB] transition-colors">
                        {contract.expiresIn}
                      </span>
                    </p>

                    {/* Desktop Buttons */}
                    <div className="hidden md:flex gap-3 shrink-0" onClick={(e) => e.stopPropagation()}>
                      <Button
                        className="border px-8 py-4 shadow-md bg-white border-[#CCE7F2] text-[#222222] font-semibold rounded-full"
                        size="sm"
                        radius="full"
                        onPress={() => {
                          onMessageArtist(contract);
                        }}
                      >
                        Message Artist
                      </Button>
                      <Button
                        className="border px-8 py-4 shadow-md bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] text-[#035A7A] font-medium rounded-full"
                        size="sm"
                        radius="full"
                        onPress={() => {
                          onCancelContract(contract.id);
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>

                  {/* Mobile 3 Dots Menu */}
                  <div
                    className="md:hidden relative shrink-0"
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button
                      isIconOnly
                      variant="ghost"
                      className="p-2 border-0"
                      aria-label="More options"
                      ref={(el) => { menuButtonRefs.current[contract.id || index] = el; }}
                      onPress={(e) => {
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
                      <EllipsisHorizontalIcon className="h-5 w-5 text-gray-600" />
                    </Button>

                  </div>

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
                      className='w-44 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden'
                      onPointerDown={(e) => e.stopPropagation()}
                    >
                      <button
                        className='w-full text-left px-4 py-3 text-sm text-[#222222] hover:bg-[#F7FBFD] hover:text-[#3A98BB] transition-colors font-medium'
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={(e) => {
                          e.stopPropagation();
                          const contract = openMenuContract;
                          setOpenMenuContract(null);
                          onMessageArtist(contract);
                        }}
                      >
                        Message Artist
                      </button>
                      <div className="border-t border-gray-100" />
                      <button
                        className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors font-medium"
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={(e) => {
                          e.stopPropagation();
                          const contract = openMenuContract;
                          setOpenMenuContract(null);
                          onCancelContract(contract.id);
                        }}
                      >
                        Cancel
                      </button>
                    </div>,
                    document.body
                  )}
                </div>
              </CardBody>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {
        totalPages > 0 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="flex items-center gap-2">
              {/* Results info */}
              <span className="text-sm text-gray-600 mr-4">
                {startIndex + 1} - {Math.min(endIndex, filteredContracts.length)}{" "}
                of {filteredContracts.length}
              </span>

              {/* Previous button */}
              <Button
                isIconOnly
                variant="flat"
                size="sm"
                radius="none"
                isDisabled={currentPage === 1}
                onPress={() => setCurrentPage(currentPage - 1)}
                className="min-w-8 h-8 text-gray-500 hover:text-gray-700 disabled:text-gray-300 cursor-pointer"
              >
                &lt;
              </Button>

              {/* Next button */}
              <Button
                isIconOnly
                variant="flat"
                size="sm"
                radius="none"
                isDisabled={currentPage === totalPages}
                onPress={() => setCurrentPage(currentPage + 1)}
                className="min-w-8 h-8 text-gray-500 hover:text-gray-700 disabled:text-gray-300 cursor-pointer -ml-2"
              >
                &gt;
              </Button>
            </div>
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
    </div >
  );
};

export default PendingContracts;
