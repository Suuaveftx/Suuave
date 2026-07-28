'use client';

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon,
  EllipsisHorizontalIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import {
  Input,
  Card,
  CardBody,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  useDisclosure,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Pagination,
} from '@heroui/react';
import { Calendar } from 'lucide-react';

import SubmitModal from '../../../../components/SubmitModal';
import FilterDropdown from '../../../../components/FilterDropdown';

const OngoingContracts = ({
  contracts = [],
  search = '',
  onSearchChange = () => { },
  onContractClick = () => { },
  onApproveWork = () => { },
  onMessageArtist = () => { },
  onMoreOptions = () => { },
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isRateOpen,
    onOpen: onRateOpen,
    onOpenChange: onRateOpenChange
  } = useDisclosure();

  const [showCongratulationsModal, setShowCongratulationsModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [currentContract, setCurrentContract] = useState(null);
  const [openMenuContract, setOpenMenuContract] = useState(null);
  const [showExtensionModal, setShowExtensionModal] = useState(false);
  const menuRef = useRef(null);
  const menuButtonRefs = useRef({});
  const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });

  const handleOpenRejectModal = (contract) => {
    setCurrentContract(contract);
    setShowRejectModal(true);
  };

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

  /*  const filteredContracts = contracts.filter((contract) =>
    contract.title.toLowerCase().includes(search.toLowerCase())
  ); */

  const handleOpenApprovalModal = (contract) => {
    setCurrentContract(contract);
    onOpen();
  };

  const handleApproval = () => {
    console.log('Contract approved:', currentContract?.title);
    onOpenChange();
    setShowCongratulationsModal(true);
  };

  const handleRateOcean = () => {
    setShowCongratulationsModal(false);
    onRateOpen();
  };

  const dateOptions = [
    'Today',
    'This week',
    'This month',
    'Last 3 month',
    'Last 6 month',
    'This year',
    'Calendar'
  ];


  const [dateFilter, setDateFilter] = useState('');

  // Filter by search
  let filteredContracts = contracts.filter((contract) =>
    contract.title.toLowerCase().includes(search.toLowerCase())
  );

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

  // Filter by Date
  if (dateFilter) {
    const now = new Date();
    filteredContracts = filteredContracts.filter((contract) => {
      const cDate = parseContractDate(contract.startDate);

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

      {/* Search and Filter Bar */}
      <div className='my-4 lg:my-6 w-full'>
        <div className='flex items-center gap-3 w-full'>
          <div className='flex items-center flex-1 w-full'>
            <Input
              type='text'
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
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
                {dateOptions.map((option) => (
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
                {dateOptions.map((option) => (
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
      <div className='lg:mt-8 w-full space-y-3'>
        {currentItems.map((contract, index) => (
          <div
            key={contract.id || index}
            className='bg-white border border-gray-200 rounded-[12px] p-4 lg:p-6 transition-all hover:border-[#3A98BB]/40 hover:shadow-md cursor-pointer'
            onClick={() => onContractClick(contract.id)}
          >
            <div className='md:px-2 px-1 py-1 overflow-visible'>
              {/* Card content container — switches to flex-row on md */}
              <div className='flex flex-col md:flex-row md:justify-between items-start md:items-center w-full gap-3 pt-1'>

                {/* Left block (Title & Info & Status) */}
                <div className='flex-1 flex flex-col md:grid md:grid-cols-[1.5fr_1fr_auto] md:gap-x-4 md:items-center min-w-0 w-full'>

                  {/* Title & Mobile 3-dot row */}
                  <div className='flex items-start justify-between w-full min-w-0 mb-2 md:mb-0'>
                    <div className='flex flex-col items-start gap-1 flex-1 min-w-0'>
                      <h3 className='font-semibold text-[15px] md:text-[16px] text-[#3A98BB] truncate w-full group-hover:text-[#3A98BB] transition-colors leading-snug'>
                        {contract.title} {contract.id ? `(${contract.id})` : ''}
                      </h3>
                      {/* Optional Status Chip below title */}
                      {contract.status && contract.status === 'Waiting Approval' && (
                        <div className='mt-1 mb-1'>
                          <span className='bg-[#EAF5FB] text-[#3A98BB] text-[11px] font-semibold px-2 py-1 rounded-full'>
                            Waiting Approval
                          </span>
                        </div>
                      )}
                      {contract.status && contract.status !== 'Ongoing' && contract.status !== 'Waiting Approval' && (
                        <div className='mt-1 mb-1'>
                          <span className='bg-[#E0F2FE] text-[#2563EB] text-[11px] font-semibold px-2 py-1 rounded-full'>
                            {contract.status}
                          </span>
                        </div>
                      )}
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
                      <span className='whitespace-nowrap font-semibold text-[#222222]'>{contract.startDate}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='font-light md:font-normal flex-shrink-0'>End Date -</span>
                      <span className='whitespace-nowrap font-semibold text-[#222222]'>{contract.endDate}</span>
                      {contract.isExpiringSoon && (
                        <span className='text-[#056D16] text-[12px] font-medium ml-1 whitespace-nowrap'>
                          ({contract.remainingDays}d left)
                        </span>
                      )}
                      {contract.isLate && (
                        <span className='text-[#E33629] text-[12px] font-medium ml-1 whitespace-nowrap'>
                          ({contract.daysLate}d late)
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Desktop: action buttons + more options inline (hidden on mobile) */}
                <div className='hidden md:flex flex-row justify-end items-center gap-3 shrink-0 pl-4 overflow-visible'>
                  <div className='flex items-center gap-3 shrink-0' onClick={(e) => e.stopPropagation()}>
                    <Button
                      className='bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] text-[#035A7A] font-bold rounded-full px-6 h-[42px] border-0 shadow-md'
                      radius='full'
                      onPress={() => { handleOpenApprovalModal(contract); }}
                    >
                      Approve Work
                    </Button>
                    <Button
                      className='bg-white text-[#222222] font-bold rounded-full px-6 h-[42px] border border-[#D1D1D1] w-[160px]'
                      radius='full'
                      variant='bordered'
                      onPress={() => {
                        if (contract.isSubmitted) {
                          handleOpenRejectModal(contract);
                        } else {
                          onMessageArtist(contract);
                        }
                      }}
                    >
                      {contract.isSubmitted ? 'Reject' : 'Message Artist'}
                    </Button>
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
                        <DropdownItem key="request_extension" className="text-sm font-medium text-[#222222]" onPress={() => { setCurrentContract(contract); setShowExtensionModal(true); }}>
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
          className='w-48 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden flex flex-col'
          onPointerDown={(e) => e.stopPropagation()}
        >
          {/* Approve Work — always present */}
          <button
            className='w-full text-left px-4 py-3 text-sm text-[#222222] hover:bg-[#F7FBFD] hover:text-[#3A98BB] transition-colors font-medium border-b border-gray-100'
            onClick={(e) => {
              e.stopPropagation();
              const contract = openMenuContract;
              setOpenMenuContract(null);
              if (contract) handleOpenApprovalModal(contract);
            }}
          >
            Approve Work
          </button>

          {openMenuContract?.isSubmitted ? (
            <>
              {/* Reject — only when work is submitted */}
              <button
                className='w-full text-left px-4 py-3 text-sm text-[#222222] hover:bg-[#F7FBFD] hover:text-[#3A98BB] transition-colors font-medium border-b border-gray-100'
                onClick={(e) => {
                  e.stopPropagation();
                  const contract = openMenuContract;
                  setOpenMenuContract(null);
                  if (contract) handleOpenRejectModal(contract);
                }}
              >
                Reject
              </button>
              {/* Request Extension */}
              <button
                className='w-full text-left px-4 py-3 text-sm text-[#222222] hover:bg-[#F7FBFD] hover:text-[#3A98BB] transition-colors font-medium border-b border-gray-100'
                onClick={(e) => {
                  e.stopPropagation();
                  const contract = openMenuContract;
                  setOpenMenuContract(null);
                  if (contract) {
                    setCurrentContract(contract);
                    setShowExtensionModal(true);
                  }
                }}
              >
                Request Extension
              </button>
              {/* Report Dispute */}
              <button
                className='w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors font-medium'
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenMenuContract(null);
                }}
              >
                Report Dispute
              </button>
            </>
          ) : (
            <>
              {/* Request Extension */}
              <button
                className='w-full text-left px-4 py-3 text-sm text-[#222222] hover:bg-[#F7FBFD] hover:text-[#3A98BB] transition-colors font-medium border-b border-gray-100'
                onClick={(e) => {
                  e.stopPropagation();
                  const contract = openMenuContract;
                  setOpenMenuContract(null);
                  if (contract) {
                    setCurrentContract(contract);
                    setShowExtensionModal(true);
                  }
                }}
              >
                Request Extension
              </button>
              {/* Report Dispute */}
              <button
                className='w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors font-medium'
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenMenuContract(null);
                }}
              >
                Report Dispute
              </button>
            </>
          )}
        </div>,
        document.body
      )}

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

      {/* Reject Modal */}
      <Modal
        isOpen={showRejectModal}
        onOpenChange={setShowRejectModal}
        classNames={{
          base: 'bg-white w-[90vw] max-w-md',
          backdrop: 'bg-black/50',
          body: 'py-4',
          footer: 'pt-4 border-t-0',
        }}
        size='md'
        backdrop='blur'
        hideCloseButton
        placement='center'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <p className='text-sm font-satoshi leading-relaxed px-1 pt-2 text-left'>
                  Are you sure you want to reject the work submitted by{' '}
                  <strong>{currentContract?.artist?.name || 'the Artist'}</strong>?
                </p>
              </ModalBody>
              <ModalFooter className='w-full flex justify-center items-center font-satoshi gap-5 -mt-4'>
                <Button
                  variant='bordered'
                  onPress={onClose}
                  className='w-full bg-radial from-[#EAF9FF] to-[#E8E8E8] text-[#222222] font-medium rounded-full border-0 shadow-sm'
                  radius='full'
                  size='md'
                >
                  Cancel
                </Button>
                <Button
                  className='w-full bg-red-500 text-white font-medium rounded-full border-0 shadow-sm hover:!bg-red-600'
                  radius='full'
                  size='md'
                  onPress={() => {
                    console.log('Contract rejected:', currentContract?.title);
                    onClose();
                  }}
                >
                  Yes, Reject
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Approval Modal */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          base: 'bg-white w-[90vw] max-w-md',
          backdrop: 'bg-black/50',
          body: 'py-4',
          footer: 'pt-4 border-t-0',
        }}
        size='md'
        backdrop='blur'
        hideCloseButton
        placement='center'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <p className='text-sm font-satoshi leading-relaxed px-1 pt-2 text-left'>
                  <span className='font-semibold'>Note: </span>Once you confirm this
                  project as completed, the contract will be considered concluded and
                  payment will be released for{' '}
                  <strong>{currentContract?.artist.name}</strong>.
                </p>
              </ModalBody>
              <ModalFooter className='w-full flex justify-center items-center font-satoshi gap-5 -mt-4'>
                <Button
                  variant='bordered'
                  onPress={onClose}
                  className='w-full bg-radial from-[#EAF9FF] to-[#E8E8E8] text-[#222222] font-medium rounded-full border-0 shadow-sm'
                  radius='full'
                  size='md'
                >
                  Cancel
                </Button>
                <Button
                  className='w-full bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] text-[#035A7A] font-medium rounded-full border-0 shadow-sm'
                  radius='full'
                  size='md'
                  variant='bordered'
                  onPress={handleApproval}
                >
                  Yes, I approve
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Congratulations Modal */}
      <Modal
        isOpen={showCongratulationsModal}
        onOpenChange={setShowCongratulationsModal}
        classNames={{
          base: 'bg-white w-[90vw] max-w-sm mx-auto',
          backdrop: 'bg-black/50',
          body: 'px-8 py-8',
        }}
        size='sm'
        backdrop='blur'
        hideCloseButton
        placement='center'
        isDismissable={false}
      >
        <ModalContent>
          <ModalBody className='text-center'>
            <div className='flex justify-center mb-6'>
              <div className='relative'>
                <div className='text-6xl mb-2'>🎉</div>
                <div className='absolute -top-1 -right-1 text-lg rotate-12 animate-pulse'>
                  🟡
                </div>
                <div className='absolute -top-2 -left-2 text-sm rotate-45 animate-pulse'>
                  🔴
                </div>
                <div className='absolute -bottom-1 -right-3 text-sm -rotate-12 animate-pulse'>
                  🟢
                </div>
                <div className='absolute -bottom-2 -left-1 text-lg rotate-45 animate-pulse'>
                  🔵
                </div>
                <div className='absolute top-1 -right-4 text-xs rotate-12 animate-pulse'>
                  🟠
                </div>
                <div className='absolute top-2 -left-4 text-xs -rotate-45 animate-pulse'>
                  🟣
                </div>
              </div>
            </div>
            <h2 className='text-4xl font-bold text-gray-900 mb-1 font-satoshi'>
              Congratulations
            </h2>
            <p className='text-gray-600 text-sm mb-8 font-satoshi leading-relaxed'>
              Your project has been successfully completed.
            </p>
            <Button
              className='w-full bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] text-[#035A7A] font-proximanova text-md border-0 shadow-sm'
              size='lg'
              radius='full'
              variant='bordered'
              onPress={handleRateOcean}
            >
              Rate {currentContract?.artist.name}
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Request Extension Modal */}
      <Modal
        isOpen={showExtensionModal}
        onOpenChange={setShowExtensionModal}
        classNames={{
          base: 'bg-white w-[90vw] max-w-md p-0',
          backdrop: 'bg-black/50',
          closeButton: 'top-3 right-3 text-gray-400 hover:text-gray-600',
        }}
        size='md'
        backdrop='blur'
        placement='center'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="py-5 px-6">
                <div className="text-center mb-4">
                  <h2 className="text-xl font-bold text-[#E68A1D] mb-1 font-satoshi">Request Extension</h2>
                  <p className="text-xs text-gray-600 font-satoshi">Extend the contract deadline by days.</p>
                </div>

                <div className="space-y-3">
                  {/* Current Deadline */}
                  <div>
                    <label className="text-xs font-bold text-[#222222] mb-1 block">Current Deadline</label>
                    <div className="bg-[#F5F5F5] border-0 rounded-lg px-4 py-2 text-xs text-gray-500 w-3/5 font-satoshi">
                      {currentContract?.endDate || "20th April, 2026."}
                    </div>
                  </div>

                  {/* New Deadline */}
                  <div>
                    <label className="text-xs font-bold text-[#222222] mb-1 block">New Deadline</label>
                    <div className="relative w-3/5">
                      <Input
                        type="date"
                        placeholder="DD/MM/YY"
                        classNames={{
                          input: "text-xs font-satoshi text-gray-600",
                          inputWrapper: "bg-white border border-[#E5E5E5] hover:border-gray-400 focus-within:border-[#3A98BB] shadow-sm rounded-lg h-9 min-h-9",
                        }}
                      />
                    </div>
                  </div>

                  {/* Reason */}
                  <div>
                    <label className="text-xs font-bold text-[#222222] mb-1 block">Reason</label>
                    <textarea
                      placeholder=""
                      className="w-full min-h-[70px] bg-white border border-[#E5E5E5] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#3A98BB] p-3 text-sm font-satoshi resize-none shadow-sm"
                    />
                  </div>

                  {/* Additional Payment */}
                  <div>
                    <label className="text-xs font-bold text-[#222222] mb-1 block">Additional Payment</label>
                    <div className="w-2/5">
                      <Input
                        type="number"
                        placeholder="0.00"
                        classNames={{
                          input: "text-xs font-satoshi text-gray-600",
                          inputWrapper: "bg-white border border-[#E5E5E5] hover:border-gray-400 shadow-sm rounded-lg h-9 min-h-9",
                        }}
                      />
                      <p className="text-[10px] text-gray-400 mt-1 font-satoshi">(Commission: 10%)</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-5">
                  <Button
                    className="flex-1 bg-[#EBEBEB] text-[#555555] font-semibold rounded-full border-0 h-10"
                    onPress={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] text-[#035A7A] font-semibold rounded-full border-0 h-10 shadow-sm"
                    onPress={() => {
                      console.log('Extension requested!');
                      onClose();
                    }}
                  >
                    Send Request
                  </Button>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

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

      <SubmitModal
        isOpen={isRateOpen}
        onOpenChange={onRateOpenChange}
        name={currentContract?.artist?.name}
        redirectPath='/fashion-designers/contracts'
      />
    </div>
  );
};

export default OngoingContracts;
