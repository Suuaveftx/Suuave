'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import {
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon,
  EllipsisHorizontalIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import {
  Input,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Pagination,
} from '@heroui/react';
import { Calendar } from 'lucide-react';
import ChatClientModal from '../../../../components/ChatClientModal';
import SubmitProjectModal from '../../../../components/SubmitProjectModal';

const OngoingContracts = ({ dateFilter, setDateFilter, dateOptions }) => {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [openMenuContract, setOpenMenuContract] = useState(null);
  const menuRef = useRef(null);
  const menuButtonRefs = useRef({});
  const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });

  useEffect(() => {
    const handleClickOutside = (e) => {
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
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

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
    {
      title: 'Elegant Evening Gown Illustration',
      id: '44f89312-D',
      StartDate: '1st September, 2024',
      EndDate: '15th October, 2024',
      timeStatus: '(14d left)',
      badgeColor: '#22C55E'
    },
    {
      title: 'Streetwear Graphic Prints',
      id: '55j92841-E',
      StartDate: '10th September, 2024',
      EndDate: '12th November, 2024',
      timeStatus: '(35d left)',
      badgeColor: '#22C55E' // Green
    },
    {
      title: 'Modern Abstract Accessories Art',
      id: '66g34522-F',
      StartDate: '14th September, 2024',
      EndDate: '20th November, 2024',
      timeStatus: '(40d left)',
      badgeColor: '#22C55E' // Green
    },
    {
      title: 'Luxury Bag Catalog Rendering',
      id: '77b89182-G',
      StartDate: '18th September, 2024',
      EndDate: '5th December, 2024',
      timeStatus: '(45d left)',
      badgeColor: '#22C55E' // Green
    },
  ];

  // Filter by search
  let filteredContracts = pendingProjects.filter((contract) =>
    contract.title.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination state & calculations
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredContracts.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredContracts.slice(startIndex, endIndex);

  return (
    <div className="px-4 lg:px-0">
      {/* Search and Filter Bar */}
      <div className='my-6 w-full'>
        <div className='flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap'>
          <div className='flex items-center flex-1 md:max-w-md w-full'>
            <Input
              type='text'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search project'
              startContent={<MagnifyingGlassIcon className='h-5 w-5 text-gray-400' />}
              className='w-full'
              classNames={{
                input: 'text-sm',
                inputWrapper:
                  'border border-gray-300 rounded-full bg-white hover:border-gray-400 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500 px-4',
              }}
            />
          </div>

          <div className='flex items-center shrink-0'>
            <Dropdown placement="bottom-end" shouldBlockScroll={false} classNames={{ content: 'min-w-[150px]' }}>
              <DropdownTrigger>
                <Button
                  variant="bordered"
                  className="bg-white border border-gray-200 rounded-full text-[14px] font-medium text-[#222222] px-4 h-[40px] flex items-center gap-2"
                >
                  <AdjustmentsVerticalIcon className='h-4 w-4 text-gray-500' />
                  Sort by Date
                  <ChevronDownIcon className='h-4 w-4 text-gray-400' />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Date Filter"
                onAction={(key) => {
                  setDateFilter(key);
                  setCurrentPage(1);
                }}
                selectedKeys={[dateFilter]}
                selectionMode="single"
              >
                {dateOptions?.map((option) => (
                  <DropdownItem key={option}>{option}</DropdownItem>
                ))}
                <DropdownItem key="" className="text-danger" color="danger">
                  Reset Filter
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>

      {/* Contract Cards */}
      <div className='lg:mt-8 w-full'>
        {currentItems.map((contract, index) => (
          <div
            key={contract.id || index}
            onClick={() => router.push('/artist-page/ongoing-contract-information')}
            className='bg-white border border-[#EAEAEA] rounded-[10px] mb-3 p-4 lg:p-6 transition-all hover:bg-gray-50 cursor-pointer'
          >
            <div className='md:px-2 px-1 py-1 overflow-visible'>
              <div className='flex md:justify-between items-center w-full gap-2 pt-1'>
                <div className='flex-1 grid md:grid-cols-[1.5fr_1fr_auto] md:gap-x-4 md:items-center min-w-0'>
                  <div className='flex flex-col items-start gap-1 mb-1 md:mb-0 w-full min-w-0'>
                    {/* Title row: title + mobile 3-dots side by side */}
                    <div className='flex items-center w-full gap-2 min-w-0'>
                      <h3 className='font-semibold text-[13px] md:text-[16px] text-[#3A98BB] truncate transition-colors flex-1 min-w-0'>
                        {contract.title} {contract.id ? `(${contract.id})` : ''}
                      </h3>
                      {/* Mobile 3-dots — inline, shrink-0, never overlaps */}
                      <div className='md:hidden shrink-0'>
                        <button
                          type='button'
                          ref={(el) => { menuButtonRefs.current[contract.id || index] = el; }}
                          className='flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors'
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
                  </div>

                  <div className='flex flex-col items-start text-[14px] font-satoshi text-gray-500'>
                    <div className='mb-1 flex items-center gap-2'>
                      <span className='text-[14px] flex-shrink-0 w-20 text-gray-500'>Start Date :</span>
                      <span className='whitespace-nowrap font-semibold text-[#222222]'>{contract.StartDate}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='text-[14px] flex-shrink-0 w-20 text-gray-500'>End Date :</span>
                      <span className='whitespace-nowrap font-semibold text-[#222222]'>{contract.EndDate}</span>
                      <span
                        className='text-xs font-bold inline-flex items-center whitespace-nowrap ml-1'
                        style={{ color: contract.badgeColor }}
                      >
                        {contract.timeStatus}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Desktop: action buttons + more options inline */}
                <div className='hidden md:flex flex-row justify-end items-center gap-3 shrink-0 pl-4 overflow-visible'>
                  <div className='flex items-center gap-3 shrink-0' onClick={(e) => e.stopPropagation()}>
                    <SubmitProjectModal
                      trigger={
                        <Button
                          className='bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] text-[#035A7A] font-bold rounded-full px-6 h-[42px] border-0 shadow-md'
                          radius='full'
                        >
                          Submit Project
                        </Button>
                      }
                    />
                    <ChatClientModal
                      trigger={
                        <Button
                          className='bg-white text-[#222222] font-bold rounded-full px-6 h-[42px] border border-[#D1D1D1]'
                          radius='full'
                          variant='bordered'
                        >
                          Chat Client
                        </Button>
                      }
                    />
                  </div>
                  <div className='flex items-center gap-1' onClick={(e) => e.stopPropagation()}>
                    <span className='text-sm font-proximanova text-gray-500'>More</span>
                    <Dropdown placement="bottom-end" shouldBlockScroll={false}>
                      <DropdownTrigger>
                        <Button isIconOnly variant='light' size='sm' className='bg-transparent border-0 rounded-lg'>
                          <EllipsisHorizontalIcon className='w-6 h-6 text-gray-400' />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="More Options">
                        <DropdownItem key="request_extension" className="text-sm font-medium text-[#222222]">
                          Request Extension
                        </DropdownItem>
                        <DropdownItem key="report" className="text-sm font-medium text-red-500 hover:text-red-600">
                          Report Dispute
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
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
          className='w-44 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden flex flex-col'
        >
          <button
            className='w-full text-left px-4 py-3 text-sm text-[#222222] hover:bg-[#F7FBFD] hover:text-[#3A98BB] transition-colors font-medium border-b border-gray-100 cursor-pointer'
            onClick={(e) => {
              e.stopPropagation();
              setOpenMenuContract(null);
            }}
          >
            Request Extension
          </button>
          <button
            className='w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors font-medium cursor-pointer'
            onClick={(e) => {
              e.stopPropagation();
              setOpenMenuContract(null);
            }}
          >
            Report Dispute
          </button>
        </div>,
        document.body
      )}

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
          <div className='text-center py-12'>
            <p className='text-gray-500'>
              {search ? 'No contracts match your search' : 'No ongoing contracts'}
            </p>
          </div>
        )
      }
    </div>
  );
};

export default OngoingContracts;
