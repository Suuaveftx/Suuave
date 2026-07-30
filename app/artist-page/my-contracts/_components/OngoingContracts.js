'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import {
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon,
  EllipsisHorizontalIcon,
  ChevronDownIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import {
  Input,
  Button,
  Card,
  CardBody,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Pagination,
} from '@heroui/react';
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
      timeStatus: '(15d left)',
      badgeColor: '#22C55E',
      waitingApproval: true,
    },
    {
      title: 'Avant Garde Concept Sketch',
      id: '98k21456-B',
      StartDate: '5th July, 2024',
      EndDate: '15th August, 2024',
      timeStatus: '(10d late)',
      badgeColor: '#D32F2F',
    },
    {
      title: 'Summer Collection 3D Mockup',
      id: '12m78390-C',
      StartDate: '20th August, 2024',
      EndDate: '30th September, 2024',
      timeStatus: '(1d left)',
      badgeColor: '#22C55E',
    },
    {
      title: 'Elegant Evening Gown Illustration',
      id: '44f89312-D',
      StartDate: '1st September, 2024',
      EndDate: '15th October, 2024',
      timeStatus: '(14d left)',
      badgeColor: '#22C55E',
    },
    {
      title: 'Streetwear Graphic Prints',
      id: '55j92841-E',
      StartDate: '10th September, 2024',
      EndDate: '12th November, 2024',
      timeStatus: '(35d left)',
      badgeColor: '#22C55E',
    },
    {
      title: 'Modern Abstract Accessories Art',
      id: '66g34522-F',
      StartDate: '14th September, 2024',
      EndDate: '20th November, 2024',
      timeStatus: '(40d left)',
      badgeColor: '#22C55E',
    },
    {
      title: 'Luxury Bag Catalog Rendering',
      id: '77b89182-G',
      StartDate: '18th September, 2024',
      EndDate: '5th December, 2024',
      timeStatus: '(45d left)',
      badgeColor: '#22C55E',
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
      {/* ── Warning Banner ── */}
      <div className="flex items-start gap-2.5 bg-[#FFF4E5] border border-[#FDDCAA] rounded-lg px-4 py-3 mb-5 w-fit max-w-[520px]">
        <ExclamationTriangleIcon className="w-[18px] h-[18px] text-[#F59E0B] shrink-0 mt-0.5" />
        <div className="flex flex-col gap-0.5">
          <p className="text-[13px] text-[#D97706] leading-relaxed">
            All disputes must be reported while the project status is <span className="font-semibold">&#39;Active&#39;</span>. Once the project deadline passes or is marked <span className="font-semibold">&#39;Completed&#39;</span>, the project is automatically finalised, and payments are released. Please, review all deliverables before the project window closes.
          </p>
        </div>
      </div>

      {/* ── Search and Filter Bar ── */}
      <div className='mb-4 lg:mb-6 w-full'>
        <div className='flex items-center gap-3 w-full'>

          {/* Search input — full width, shared between mobile & desktop */}
          <div className='flex items-center flex-1 w-full'>
            <Input
              type='text'
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder='Search project'
              startContent={<MagnifyingGlassIcon className='h-5 w-5 text-gray-400' />}
              className='w-full'
              classNames={{
                input: 'text-sm',
                inputWrapper:
                  'border border-gray-300 rounded-full bg-white hover:border-gray-400 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500 px-4 h-[48px] lg:h-[42px]',
              }}
            />
          </div>

          {/* Mobile: icon-only filter button */}
          <div className='lg:hidden shrink-0'>
            <Dropdown placement="bottom-end" shouldBlockScroll={false} classNames={{ content: 'min-w-[150px]' }}>
              <DropdownTrigger>
                <button
                  type='button'
                  className='flex items-center justify-center w-11 h-11 rounded-full bg-white border border-gray-200 hover:border-gray-300 active:bg-gray-50 transition-colors shadow-sm'
                  aria-label='Filter contracts'
                >
                  <AdjustmentsVerticalIcon className='h-5 w-5 text-gray-500' />
                </button>
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

          {/* Desktop: full "Sort by Date" button */}
          <div className='hidden lg:flex items-center shrink-0'>
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

      {/* ── Contract Cards ── */}
      <div className='w-full space-y-3'>
        {currentItems.map((contract, index) => (
          <React.Fragment key={contract.id || index}>

            {/* ── MOBILE Card ── */}
            <div className='lg:hidden'>
              <Card
                shadow="none"
                className="bg-white border border-gray-200 rounded-[12px] w-full overflow-visible"
                classNames={{ base: 'overflow-visible' }}
              >
                <CardBody className="px-4 py-4 overflow-visible">
                  {/* Hidden trigger for mobile modal popup */}
                  <SubmitProjectModal
                    trigger={
                      <button id={`submit-modal-btn-${contract.id || index}`} style={{ display: 'none' }}>
                        Submit Project
                      </button>
                    }
                  />

                  {/* Title row */}
                  <div className="flex items-start justify-between gap-2 w-full min-w-0 mb-2">
                    <button
                      className="flex-1 min-w-0 text-left"
                      onClick={() => router.push(`/artist-page/ongoing-contract-information?id=${encodeURIComponent(contract.id || '')}&timeStatus=${encodeURIComponent(contract.timeStatus || '')}&color=${encodeURIComponent(contract.badgeColor || '#3A98BB')}`)}
                    >
                      <h3 className="text-[15px] font-bold text-[#3A98BB] truncate leading-snug">
                        {contract.title}
                      </h3>
                    </button>

                    {/* Three-dot menu */}
                    <button
                      type='button'
                      ref={(el) => { menuButtonRefs.current[contract.id || index] = el; }}
                      className='flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors shrink-0 -mt-0.5'
                      onClick={(e) => {
                        e.stopPropagation();
                        const btnId = contract.id || index;
                        const btnEl = menuButtonRefs.current[btnId];
                        if (btnEl) {
                          const rect = btnEl.getBoundingClientRect();
                          setMenuPosition({
                            top: rect.bottom + 4,
                            right: window.innerWidth - rect.right,
                          });
                        }
                        setOpenMenuContract(
                          openMenuContract?.id === (contract.id || index) ? null : { ...contract, indexFallback: index }
                        );
                      }}
                    >
                      <EllipsisHorizontalIcon className='w-5 h-5 text-gray-500' />
                    </button>
                  </div>

                  {/* Waiting Approval chip - mobile */}
                  {contract.waitingApproval && (
                    <div className="mb-2">
                      <span className="inline-flex items-center bg-[#EAF5FB] text-[#3A98BB] text-[11px] font-semibold px-2 rounded-full h-[22px]">
                        Waiting Approval
                      </span>
                    </div>
                  )}

                  {/* Date info */}
                  <div
                    className="space-y-1 cursor-pointer"
                    onClick={() => router.push(`/artist-page/ongoing-contract-information?id=${encodeURIComponent(contract.id || '')}&timeStatus=${encodeURIComponent(contract.timeStatus || '')}&color=${encodeURIComponent(contract.badgeColor || '#3A98BB')}`)}
                  >
                    <div className='flex items-center gap-2 text-[13px]'>
                      <span className='text-gray-500 font-normal'>Start Date -</span>
                      <span className='font-semibold text-[#222222]'>{contract.StartDate}</span>
                    </div>
                    <div className='flex items-center gap-2 text-[13px]'>
                      <span className='text-gray-500 font-normal'>End Date -</span>
                      <span className='font-semibold text-[#222222]'>{contract.EndDate}</span>
                      {contract.timeStatus && !contract.waitingApproval && (
                        <span
                          className='text-xs font-bold whitespace-nowrap'
                          style={{ color: contract.badgeColor }}
                        >
                          {contract.timeStatus}
                        </span>
                      )}
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>

            {/* ── DESKTOP Card (original layout, unchanged) ── */}
            <div
              className='hidden lg:block bg-white border border-[#EAEAEA] rounded-[10px] p-4 lg:p-6 transition-all hover:bg-gray-50 cursor-pointer'
              onClick={() => router.push(`/artist-page/ongoing-contract-information?id=${encodeURIComponent(contract.id || '')}&timeStatus=${encodeURIComponent(contract.timeStatus || '')}&color=${encodeURIComponent(contract.badgeColor || '#3A98BB')}`)}
            >
              <div className='md:px-2 px-1 py-1 overflow-visible'>
                <div className='flex md:justify-between items-center w-full gap-2 pt-1'>
                  <div className='flex-1 grid md:grid-cols-[1.5fr_1fr_auto] md:gap-x-4 md:items-center min-w-0'>
                    <div className='flex flex-col items-start gap-1 mb-1 md:mb-0 w-full min-w-0'>
                      <div className='flex items-center w-full gap-2 min-w-0'>
                        <h3 className='font-semibold text-[13px] md:text-[16px] text-[#3A98BB] truncate transition-colors flex-1 min-w-0'>
                          {contract.title} {contract.id ? `(${contract.id})` : ''}
                        </h3>
                      </div>
                      {contract.waitingApproval && (
                        <span className="inline-flex items-center bg-[#EAF5FB] text-[#3A98BB] text-[11px] font-semibold px-2 rounded-full h-[22px] mt-0.5">
                          Waiting Approval
                        </span>
                      )}
                    </div>

                    <div className='flex flex-col items-start text-[14px] font-satoshi text-gray-500'>
                      <div className='mb-1 flex items-center gap-2'>
                        <span className='text-[14px] flex-shrink-0 w-20 text-gray-500'>Start Date :</span>
                        <span className='whitespace-nowrap font-semibold text-[#222222]'>{contract.StartDate}</span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <span className='text-[14px] flex-shrink-0 w-20 text-gray-500'>End Date :</span>
                        <span className='whitespace-nowrap font-semibold text-[#222222]'>{contract.EndDate}</span>
                        {!contract.waitingApproval && (
                          <span
                            className='text-xs font-bold inline-flex items-center whitespace-nowrap ml-1'
                            style={{ color: contract.badgeColor }}
                          >
                            {contract.timeStatus}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Desktop action buttons */}
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

          </React.Fragment>
        ))}
      </div>

      {/* Portal dropdown for mobile three-dot menu */}
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
              const modalBtnId = openMenuContract?.id || openMenuContract?.indexFallback;
              const modalBtn = document.getElementById(`submit-modal-btn-${modalBtnId}`);
              if (modalBtn) modalBtn.click();
              setOpenMenuContract(null);
            }}
          >
            Submit Project
          </button>
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
      {totalPages > 0 && (
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
      )}

      {/* Empty State */}
      {filteredContracts.length === 0 && (
        <div className='text-center py-12'>
          <p className='text-gray-500'>
            {search ? 'No contracts match your search' : 'No ongoing contracts'}
          </p>
        </div>
      )}
    </div>
  );
};

export default OngoingContracts;
