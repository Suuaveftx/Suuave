'use client';

import React from 'react';
import { PaperClipIcon, StarIcon, ExclamationTriangleIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';
import { Card, CardBody, Button, Avatar, Chip, Alert, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Textarea } from '@heroui/react';
import { HiX } from 'react-icons/hi';

import ContractHeader from './contract-header';
import MessageModal from './MessageModal';
import { TiLocation } from 'react-icons/ti';
import { FaStar } from 'react-icons/fa6';
import Link from 'next/link';
import CancelContractModal from './CancelContractModal';
import PageContainer from '../../../../components/layout/PageContainer';

export default function PendingDetailsPage({ params }) {
  const contractId = params?.id || '24t64754';
  const { isOpen: isMessageOpen, onOpen: onMessageOpen, onOpenChange: onMessageOpenChange } = useDisclosure();
  const { isOpen: isCancelOpen, onOpen: onCancelOpen, onOpenChange: onCancelOpenChange } = useDisclosure();
  const [messageText, setMessageText] = React.useState('');
  // Mock data - replace with actual data fetching based on contractId
  const contractData = {
    jobTitle: 'Modern Fashion Attire Illustration',
    contractNumber: '24t64754',
    role: 'Fashion Artist',
    budget: '₦200,000',
    timeframe: '5 Days',
    status: 'Pending',
    attachedDocuments: [
      { name: 'DocTGFile', type: 'document' },
      { name: 'DocE75', type: 'legal' },
    ],
    artist: {
      name: 'Tolu',
      username: 'tolu',
      role: 'Fashion Artist',
      location: 'Lagos, Nigeria',
      rating: 0.0,
      reviews: 0,
      avatar: '/contract/designer.jpg',
      jobsPosted: 1,

      paymentMade: 0,
    },
  };

  // Function to get color based on status
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'text-[#035A7A]';
      case 'ongoing':
        return 'text-[#279711]';
      case 'completed':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <>
      <PageContainer>
        <ContractHeader title='Contracts Information' maxWidth='max-w-6xl' tab='pending' showBack={true} withNavbarOffset={false} />
        <div className='w-full mx-auto pb-24 lg:pb-6'>
          <div className='grid grid-cols-1 lg:grid-cols-3 lg:gap-6 gap-0 -mx-4 lg:mx-0'>
            {/* Left Column - Contract Details & Documents */}
            <div className='lg:col-span-2 space-y-[6px] lg:space-y-2'>
              {/* Contract Details Card */}
              <Card className='bg-white border border-gray-200' shadow='none'>
                <CardBody className='p-4 lg:p-6 pb-8 lg:pb-12'>
                  {/* Combined header logic: title + badge */}
                  <div className="flex items-center justify-between mb-4 lg:mb-6 lg:border-b lg:pb-2">
                    <h2 className="text-[20px] lg:text-2xl font-bold lg:font-semibold text-gray-900">Contract Details</h2>
                    <span className="bg-[#F2F9FB] text-[#035A7A] border border-[#CCE7F2] px-3 py-1 rounded-full text-xs font-semibold capitalize">
                      {contractData.status}
                    </span>
                  </div>

                  <div className='flex justify-between items-start'>
                    <div className='space-y-4'>
                      {[
                        { label: 'Job Title', value: contractData.jobTitle },
                        {
                          label: 'Status',
                          value: contractData.status,
                        },
                        {
                          label: 'Contract Number',
                          value: contractData.contractNumber,
                        },

                        { label: 'Role', value: contractData.role },
                        { label: 'Budget', value: contractData.budget },
                        {
                          label: 'Timeframe',
                          value: contractData.timeframe,
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className={`grid grid-cols-[38%_62%] sm:grid-cols-[8rem_1fr] md:gap-4 gap-2 items-start w-full ${item.label === 'Status' ? 'hidden lg:grid' : ''}`}
                        >
                          <span
                            className={`${item.label === 'Status' ? 'lg:hidden' : ''} ${item.label === 'Contract Number' ? 'lg:-mt-4' : ''
                              } md:text-md text-sm mb-1 sm:mb-0 font-light`}
                          >
                            {item.label}
                          </span>
                          {item.label === 'Status' ? (
                            <div className="flex items-center gap-2 lg:hidden">
                              <span className="bg-[#F2F9FB] text-[#035A7A] px-3 py-1 rounded-full text-xs font-semibold capitalize">
                                {item.value}
                              </span>
                            </div>
                          ) : (
                            <span
                              className={`${item.label === 'Contract Number' ? 'lg:-mt-4' : ''
                                } md:text-md text-sm font-proximanova break-words whitespace-normal`}
                            >
                              {item.value}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>

                  </div>
                </CardBody>
              </Card>

              {/* Attached Documents Card */}
              <Card className='bg-white' shadow='none'>
                <CardBody className='p-6'>
                  <h2 className='lg:text-2xl text-[20px] font-semibold md:mb-2 -mt-2'>
                    Attached Documents
                  </h2>

                  {contractData.attachedDocuments.map((doc, index) => (
                    <div
                      key={index}
                      onClick={() => window.open('#', '_blank')}
                      className='flex flex-col items-start px-3 md:py-3 py-2 rounded-lg transition-colors cursor-pointer hover:bg-gray-50'
                    >
                      <div className='flex items-center justify-center gap-2'>
                        <PaperClipIcon className='md:h-5 md:w-5 h-4 w-4' />
                        <p className='md:text-md text-sm font-proximanova text-[#3A98BB]'>
                          {doc.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardBody>
              </Card>
            </div>

            {/* Right Column - Artist Info & Actions */}
            <div className='flex gap-2 flex-col lg:flex-col'>
              {/* Action Buttons - desktop only (inline in grid) */}
              <Card className='bg-white border border-gray-200 drop-shadow-md hidden lg:block'>
                <CardBody className='py-6 px-6 flex flex-col items-center justify-center gap-6'>
                  <Button
                    className='flex-1 w-full bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] py-3 text-[#035A7A] font-medium rounded-full border-0 shadow-sm text-md'
                    radius='full'
                    onPress={onMessageOpen}
                  >
                    Message Artist
                  </Button>
                  <Button
                    variant='bordered'
                    className='flex-1 w-full bg-transparent py-3 border-2 border-[#CCE7F2] text-[#035A7A] font-medium rounded-full shadow-sm text-md'
                    radius='full'
                    onPress={onCancelOpen}
                  >
                    Cancel
                  </Button>
                </CardBody>
              </Card>

              {/* Artist Information Card */}
              <Card className='bg-white border font-satoshi border-gray-200 mt-[6px] lg:mt-0' shadow='none'>
                <CardBody className='p-4 lg:p-4'>
                  {/* Mobile: compact horizontal row */}
                  <div className='lg:hidden'>
                    <h3 className='text-[15px] font-semibold text-[#111111] mb-3 border-b border-gray-100 pb-3'>About the Artist</h3>
                    <Link href='/artist-page/profile-vistor-view' className='flex items-center justify-between py-1'>
                      <div className='flex items-center gap-3'>
                        <Avatar
                          src={contractData.artist.avatar}
                          className='w-11 h-11 rounded-full flex-shrink-0'
                          name={contractData.artist.name}
                        />
                        <div>
                          <p className='text-[15px] font-semibold text-[#3A98BB] leading-tight'>{contractData.artist.name}</p>
                          <p className='text-[13px] text-gray-500 mt-0.5'>{contractData.artist.role}</p>
                        </div>
                      </div>
                      <ChevronLeftIcon className='w-5 h-5 text-gray-400 rotate-180 flex-shrink-0' />
                    </Link>
                  </div>

                  {/* Desktop: centered layout */}
                  <div className='hidden lg:block text-center font-satoshi'>
                    <h3 className='text-2xl font-bold mb-6'>About the Artist</h3>
                    <Link href='/artist-page/profile-vistor-view' className='block w-fit mx-auto'>
                      <Avatar
                        src={contractData.artist.avatar}
                        className='w-28 h-28 mx-auto mb-4 rounded-full cursor-pointer hover:opacity-80 transition-opacity'
                        name={contractData.artist.name}
                      />
                    </Link>
                    <h3 className='text-md font-proximanova mb-1'>
                      <Link href='/artist-page/profile-vistor-view' className='text-[#3A98BB] hover:underline'>
                        @{contractData.artist.username}
                      </Link>
                    </h3>
                    <p className='text-sm text-[#222222] mb-4'>{contractData.artist.role}</p>
                    <div className='flex items-center justify-center gap-1 text-sm text-[#222222] mb-2'>
                      <TiLocation className='size-5 fill-[#878787]' />
                      <span>{contractData.artist.location}</span>
                    </div>
                    <div className='flex items-center justify-center gap-2 mb-6 text-[#222222]'>
                      <span>Ratings</span>
                      <div className='flex items-center gap-1'>
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={i < contractData.artist.rating ? 'text-yellow-500' : 'text-gray-300'} />
                        ))}
                      </div>
                      <span className='text-sm text-[#3A98BB]'>
                        ({contractData.artist.reviews} <Link href='/artist-page/profile-vistor-view?tab=reviews'>Reviews</Link>)
                      </span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>

        <MessageModal
          isOpen={isMessageOpen}
          onOpenChange={onMessageOpenChange}
          artistName={contractData.artist.name}
        />

        <CancelContractModal
          isOpen={isCancelOpen}
          onOpenChange={onCancelOpenChange}
          onConfirm={(id) => console.log('Canceled:', id)}
          contractId={contractId}
        />
      </PageContainer>

      {/* Mobile Action Buttons - outside PageContainer to avoid overflow-x-hidden clipping */}
      <div className='fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white border-t border-gray-200 px-6 py-4 flex flex-row gap-4 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]'>
        <Button
          variant='bordered'
          className='flex-1 bg-transparent py-3 border border-gray-300 text-[#222222] font-medium rounded-full shadow-sm text-[15px]'
          radius='full'
          onPress={onCancelOpen}
        >
          Cancel Project
        </Button>
        <Button
          className='flex-1 bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] py-3 text-[#035A7A] font-medium rounded-full border-0 shadow-sm text-[15px]'
          radius='full'
          onPress={onMessageOpen}
        >
          Message Artist
        </Button>
      </div>
    </>
  );
}
