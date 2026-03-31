'use client';

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon,
  EllipsisHorizontalIcon,
  ChevronDownIcon,
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
  const [currentContract, setCurrentContract] = useState(null);
  const [openMenuContract, setOpenMenuContract] = useState(null);
  const menuRef = useRef(null);
  const menuButtonRefs = useRef({});
  const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenuContract(null);
      }
    };
    document.addEventListener('pointerdown', handleClickOutside);
    return () => document.removeEventListener('pointerdown', handleClickOutside);
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
  const itemsPerPage = 3;
  const totalPages = Math.ceil(filteredContracts.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredContracts.slice(startIndex, endIndex);

  return (
    <div>
      {/* Search and Filter Bar */}
      <div className='my-6 w-full'>
        <div className='flex items-center justify-between gap-4'>
          <div className='flex items-center gap-3 flex-1'>
            <Input
              type='text'
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder='Search Project'
              startContent={<MagnifyingGlassIcon className='h-5 w-5 text-gray-400' />}
              className='flex-1 md:max-w-md md:flex-none'
              classNames={{
                input: 'text-sm',
                inputWrapper:
                  'border border-gray-300 rounded-full bg-white hover:border-gray-400 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500 pr-2',
              }}
              endContent={
                <Dropdown placement="bottom-end" classNames={{ content: 'min-w-[150px]' }}>
                  <DropdownTrigger>
                    <Button
                      isIconOnly
                      variant="light"
                      size="sm"
                      className="text-gray-400 hover:text-gray-600 min-w-8 w-8 h-8 rounded-full"
                    >
                      <Calendar size={18} />
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
              }
            />
          </div>
        </div>
      </div>

      {/* Contract Cards */}
      <div className='space-y-2'>
        {currentItems.map((contract, index) => (
          <Card
            key={contract.id || index}
            className='group bg-white border border-gray-200 hover:border-[#3A98BB]/40 hover:shadow-md transition-all w-full !overflow-visible'
            classNames={{ base: 'overflow-visible' }}
            shadow='none'
          >
            <div
              className="cursor-pointer"
              onClick={() => onContractClick(contract.id)}
            >
              <CardBody className='md:px-4 px-2 py-4 relative'>
                <div className='md:grid md:grid-cols-[1.5fr_1fr_auto] md:gap-x-8 md:items-center'>
                  <div className='flex flex-col items-start'>
                    <h3
                      className='font-proximanova text-md w-full truncate mb-1 group-hover:text-[#3A98BB] transition-colors'
                    >
                      {contract.title}
                    </h3>
                    <div className='flex items-center gap-1'>
                      {contract.status && (contract.status !== 'Ongoing' || (!contract.isLate && !contract.isExpiringSoon)) && (
                        <span className='bg-[#E0F2FE] text-[#2563EB] px-2 py-1 rounded text-xs'>
                          {contract.status}
                        </span>
                      )}
                      {contract.isLate && (
                        <span className='text-red-500 text-xs font-semibold'>
                          ({contract.daysLate}d late)
                        </span>
                      )}
                      {contract.isExpiringSoon && (
                        <span className='text-green-600 text-xs font-semibold'>
                          ({contract.remainingDays}d left)
                        </span>
                      )}
                    </div>
                  </div>

                  <div className='mt-2 md:mt-0 flex flex-col items-start text-sm font-proximanova text-gray-600'>
                    <div className='mb-1 flex items-center gap-2'>
                      <span className='text-xs font-satoshi flex-shrink-0 w-16 text-gray-500 group-hover:text-[#3A98BB]/70 transition-colors'>Start Date:</span>
                      <span className='whitespace-nowrap font-semibold group-hover:text-[#3A98BB] transition-colors'>{contract.startDate}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='text-xs font-satoshi flex-shrink-0 w-16 text-gray-500 group-hover:text-[#3A98BB]/70 transition-colors'>End Date:</span>
                      <span className='whitespace-nowrap font-semibold group-hover:text-[#3A98BB] transition-colors'>{contract.endDate}</span>
                    </div>
                  </div>

                  <div className='flex flex-col-reverse md:flex-row justify-end items-center gap-4 mt-4 md:mt-0'>
                    <div className='hidden md:flex items-center gap-3' onClick={(e) => e.stopPropagation()}>
                      <Button
                        className='border px-6 py-4 shadow-md bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] text-[#035A7A] font-medium rounded-full shrink-0'
                        size='sm'
                        radius='full'
                        onPress={() => {
                          handleOpenApprovalModal(contract);
                        }}
                      >
                        Approve Work
                      </Button>
                      <Button
                        className='border px-6 py-4 shadow-md bg-white text-[#222222] font-medium rounded-full shrink-0'
                        size='sm'
                        radius='full'
                        variant='bordered'
                        onPress={() => {
                          onMessageArtist(contract);
                        }}
                      >
                        Message Artist
                      </Button>
                    </div>

                    <div className='absolute top-5 right-2 md:static flex items-center gap-1'>
                      <span className='text-sm font-proximanova hidden md:flex text-gray-500'>More</span>
                      {/* Desktop more options button */}
                      <span onClick={(e) => e.stopPropagation()}>
                        <Button
                          isIconOnly
                          variant='light'
                          size='sm'
                          className='hidden md:flex bg-transparent border-0 rounded-lg'
                          onPress={() => {
                            onMoreOptions(contract);
                          }}
                        >
                          <EllipsisHorizontalIcon className='w-6 h-6 text-gray-400' />
                        </Button>
                      </span>

                      {/* Mobile 3-dots dropdown */}
                      <div
                        className='md:hidden relative'
                        ref={openMenuContract?.id === (contract.id || index) ? menuRef : null}
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button
                          isIconOnly
                          variant='light'
                          size='sm'
                          className='bg-transparent border-0 rounded-lg'
                          ref={(el) => { menuButtonRefs.current[contract.id || index] = el; }}
                          onPress={() => {
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
                          <EllipsisHorizontalIcon className='w-6 h-6 text-gray-400' />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </div>
          </Card>
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
          onPointerDown={(e) => e.stopPropagation()}
        >
          <button
            className='w-full text-left px-4 py-3 text-sm text-[#222222] hover:bg-[#F7FBFD] hover:text-[#3A98BB] transition-colors font-medium border-b border-gray-100'
            onClick={(e) => {
              e.stopPropagation();
              const contract = openMenuContract;
              setOpenMenuContract(null);
              if (contract) {
                handleOpenApprovalModal(contract);
              }
            }}
          >
            Approve Work
          </button>
          <button
            className='w-full text-left px-4 py-3 text-sm text-[#222222] hover:bg-[#F7FBFD] hover:text-[#3A98BB] transition-colors font-medium'
            onClick={(e) => {
              e.stopPropagation();
              const contract = openMenuContract;
              setOpenMenuContract(null);
              if (contract) {
                onMessageArtist(contract);
              }
            }}
          >
            Message Artist
          </button>
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

      {/* Pagination */}
      {
        totalPages > 0 && (
          <div className='flex items-center justify-center gap-2 mt-6'>
            <div className='flex items-center gap-2'>
              {/* Results info */}
              <span className='text-sm text-gray-600 mr-4'>
                {startIndex + 1} - {Math.min(endIndex, filteredContracts.length)} of{' '}
                {filteredContracts.length}
              </span>

              {/* Previous button */}
              <Button
                isIconOnly
                variant='flat'
                size='sm'
                radius='none'
                isDisabled={currentPage === 1}
                onPress={() => setCurrentPage(currentPage - 1)}
                className='min-w-8 h-8 text-gray-500 hover:text-gray-700 disabled:text-gray-300 cursor-pointer'
              >
                &lt;
              </Button>

              {/* Next button */}
              <Button
                isIconOnly
                variant='flat'
                size='sm'
                radius='none'
                isDisabled={currentPage === totalPages}
                onPress={() => setCurrentPage(currentPage + 1)}
                className='min-w-8 h-8 text-gray-500 hover:text-gray-700 disabled:text-gray-300 cursor-pointer -ml-2'
              >
                &gt;
              </Button>
            </div>
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
