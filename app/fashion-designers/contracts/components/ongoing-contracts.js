'use client';

import React, { useState } from 'react';
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
} from '@heroui/react';

const OngoingContracts = ({
  contracts = [],
  search = '',
  onSearchChange = () => {},
  onContractClick = () => {},
  onApproveWork = () => {},
  onMessageArtist = () => {},
  onMoreOptions = () => {},
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [showCongratulationsModal, setShowCongratulationsModal] = useState(false);
  const [currentContract, setCurrentContract] = useState(null);

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
    console.log('Rate Ocean clicked');
  };

  const months = [
    { value: 'all', label: 'All Months' },
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ];

  const [sortBy, setSortBy] = useState('all');
  // Filter by search
  let filteredContracts = contracts.filter((contract) =>
    contract.title.toLowerCase().includes(search.toLowerCase())
  );

  // Filter by month if not "all"
  if (sortBy !== 'all') {
    filteredContracts = filteredContracts.filter((contract) => {
      const contractMonth = new Date(contract.startDate).getMonth() + 1; // 1-12
      return String(contractMonth).padStart(2, '0') === sortBy;
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
      <div className='my-6'>
        <div className='flex items-center justify-between gap-4'>
          <div className='flex items-center gap-3 flex-1'>
            <Input
              type='text'
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder='Search by job title'
              startContent={<MagnifyingGlassIcon className='h-5 w-5 text-gray-400' />}
              className='flex-1 md:max-w-md md:flex-none'
              classNames={{
                input: 'text-sm',
                inputWrapper:
                  'border border-gray-300 rounded-full bg-white hover:border-gray-400 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500',
              }}
            />
          </div>

          <div className='relative flex items-center gap-2'>
            <Button
              isIconOnly
              variant='ghost'
              className='md:hidden p-2 border-0'
              aria-label='Filter'
            >
              <AdjustmentsVerticalIcon className='h-5 w-5 text-gray-600' />
            </Button>

            <div className='relative hidden md:flex items-center'>
              <div className='absolute left-0 pl-3 flex items-center pointer-events-none'>
                <AdjustmentsVerticalIcon className='h-4 w-4 text-gray-400' />
              </div>
              <div className='absolute right-0 pr-3 flex items-center pointer-events-none'>
                <ChevronDownIcon className='h-4 w-4 text-gray-400' />
              </div>

              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className='text-sm text-gray-700 border border-gray-300 rounded-full pl-10 pr-10 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none w-full'
              >
                {months.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Contract Cards */}
      <div className='space-y-2'>
        {currentItems.map((contract, index) => (
          <Card
            key={contract.id || index}
            className='bg-white border border-gray-200 hover:shadow-md transition-shadow'
            shadow='none'
          >
            <CardBody className='md:px-4 px-2 py-4 relative'>
              <div className='md:grid md:grid-cols-3 md:gap-6 md:items-start'>
                <div className='flex flex-col items-start'>
                  <h3
                    className='font-proximanova text-md w-full truncate cursor-pointer mb-1'
                    onClick={() => onContractClick(contract.id)}
                  >
                    {contract.title}
                  </h3>
                  <div className='flex items-center gap-1'>
                    {contract.status && (
                      <span className='bg-[#E0F2FE] text-[#2563EB] px-2 py-1 rounded text-xs'>
                        {contract.status}
                      </span>
                    )}
                    {contract.isLate && (
                      <span className='text-red-500 text-xs'>
                        ({contract.daysLate}d late)
                      </span>
                    )}
                  </div>
                </div>

                <div className='block mt-2 md:mt-0 md:flex flex-col items-start text-sm font-proximanova text-gray-600'>
                  <div className='mb-1'>
                    <span className='text-xs font-satoshi'>Start Date:</span>{' '}
                    {contract.startDate}
                  </div>
                  <div>
                    <span className='text-xs font-satoshi'>End Date:</span>{' '}
                    {contract.endDate}
                  </div>
                </div>

                <div className='flex flex-col-reverse md:flex-row justify-end items-start gap-2 -ml-4'>
                  <div className=' hidden md:flex items-center gap-2'>
                    <Button
                      className='mt-4 md:-mt-1 border px-4 py-4 shadow-lg bg-radial from-[#EAF9FF] to-[#CCE7F2] text-[#035A7A] font-proximanova rounded-full shrink-0'
                      size='sm'
                      radius='full'
                      onPress={() => handleOpenApprovalModal(contract)}
                    >
                      Approve Work
                    </Button>
                    <Button
                      className='mt-4 md:-mt-1 border px-4 py-4 shadow-lg bg-radial from-white to-white text-[#222222] font-proximanova rounded-full shrink-0'
                      size='sm'
                      radius='full'
                      variant='bordered'
                      onPress={() => onMessageArtist(contract)}
                    >
                      Message Artist
                    </Button>
                  </div>

                  <div className='absolute top-5 right-2 md:static flex items-center lg:pl-6 -mt-2'>
                    <span className='text-sm font-proximanova hidden md:flex'>More</span>
                    <Button
                      isIconOnly
                      variant='faded'
                      size='md'
                      className='bg-transparent border-0 rounded-lg transition-colors hover:bg-transparent'
                      onPress={() => onMoreOptions(contract)}
                    >
                      <EllipsisHorizontalIcon className='w-5 h-5 text-gray-500' />
                    </Button>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredContracts.length === 0 && (
        <div className='text-center py-12'>
          <p className='text-gray-500'>
            {search ? 'No contracts match your search' : 'No ongoing contracts'}
          </p>
        </div>
      )}

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
                  className='w-full bg-radial from-[#EAF9FF] to-[#CCE7F2] text-[#035A7A] font-medium rounded-full border-0 shadow-sm'
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
              className='w-full bg-radial from-[#EAF9FF] to-[#CCE7F2] text-[#035A7A] font-proximanova text-md border-0 shadow-sm'
              size='lg'
              radius='full'
              variant='bordered'
              onPress={handleRateOcean}
            >
              Rate Ocean
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Pagination */}
      {totalPages > 0 && (
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
      )}
    </div>
  );
};

export default OngoingContracts;
