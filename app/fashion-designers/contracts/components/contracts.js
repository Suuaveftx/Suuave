'use client';

import React, { useState } from 'react';
import { Tabs, Tab, Modal, ModalContent, ModalBody, Button } from '@heroui/react';

import ContractHeader from './contract-header';

import { useRouter, useSearchParams } from 'next/navigation';
import PendingContracts from './pending-contracts';
import OngoingContracts from './ongoing-contracts';

import CompletedContracts from './completed-contracts';
import { ongoingContracts } from '../data';
import CancelContractModal from './CancelContractModal';
import MessageModal from './MessageModal';
import { useDisclosure } from '@heroui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import ExtensionPaymentModal from '@/components/ExtensionPaymentModal';

export default function ContractPage() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = React.useState(tabParam || 'pending');
  const [search, setSearch] = useState('');
  const router = useRouter();
  const [sortBy, setSortBy] = useState('date');
  const { isOpen: isCancelOpen, onOpen: onCancelOpen, onOpenChange: onCancelOpenChange } = useDisclosure();
  const { isOpen: isMessageOpen, onOpen: onMessageOpen, onOpenChange: onMessageOpenChange } = useDisclosure();
  const [contractToCancel, setContractToCancel] = useState(null);
  const [selectedArtist, setSelectedArtist] = useState('');


  const [showViewExtensionModal, setShowViewExtensionModal] = useState(false);
  const [extendedContractId, setExtendedContractId] = useState("");
  const [showExtensionPaymentModal, setShowExtensionPaymentModal] = useState(false);
  const [showDeclinedExtensionModal, setShowDeclinedExtensionModal] = useState(false);

  React.useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const pendingContracts = [
    {
      title: 'Modern Fashion Attire Illustration',
      id: '24t64754',
      pendingSince: '18th June, 2024',
      expiresIn: '2 Days',
      artistName: 'Tolu',
      artistRole: 'Fashion Artist',
      status: 'Waiting Approval',
    },
    {
      title: 'Modern Fashion Attire Illustration',
      id: '24t64755',
      pendingSince: '18th June, 2024',
      expiresIn: '2 Days',
      artistName: 'Tolu',
      artistRole: 'Fashion Artist',
      status: 'Waiting Approval',
    },
    {
      title: 'Modern Fashion Attire Illustration',
      id: '24t64756',
      pendingSince: '20th June, 2024',
      expiresIn: '1 Day',
      artistName: 'Tolu',
      artistRole: 'Fashion Artist',
      status: 'Waiting Approval',
    },
    {
      title: 'Modern Fashion Attire Illustration',
      id: '24t64757',
      pendingSince: '20th June, 2024',
      expiresIn: '1 Day',
      artistName: 'Tolu',
      artistRole: 'Fashion Artist',
      status: 'Pending',
    },
    {
      title: 'Modern Fashion Attire Illustration',
      id: '24t64758',
      pendingSince: '20th June, 2024',
      expiresIn: '1 Day',
      artistName: 'Tolu',
      artistRole: 'Fashion Artist',
      status: 'Pending',
    },
  ];

  const tabs = [
    { id: 'pending', label: 'Pending Contracts', count: pendingContracts.length },
    { id: 'ongoing', label: 'Ongoing Contracts', count: ongoingContracts.length },
    { id: 'completed', label: 'Completed Contracts', count: 5 },
  ];

  //handle pending contract click
  const handlePendingClick = (contractId) => {
    router.push(`/fashion-designers/contracts/pending/${contractId}`);
  };

  //handle ongoing contract click
  const handleOngoingClick = (contractId) => {
    if (contractId === '24t64755') {
      router.push(`/fashion-designers/contracts/ongoing/24t64755?newDeadline=24th%20April%2C%202026&initialDeadline=20th%20April%2C%202026&extendedAt=15%20September%202026`);
    } else {
      router.push(`/fashion-designers/contracts/ongoing/${contractId}`);
    }
  };

  /*  const handleContractClick = (contractId) => {
    router.push(`/contract-page/${contractId}`);
  }; */

  const handleCancelContract = (contractId) => {
    setContractToCancel(contractId);
    onCancelOpen();
  };

  const confirmCancelContract = (contractId) => {
    console.log('Contract canceled:', contractId);
    // Add deletion/update logic here if needed
  };

  const handleBack = () => {
    router.push('/fashion-designers');
  };

  // Handler functions:
  const handleApproveWork = (contract) => {
    console.log('Approve work for:', contract.title);
    // Add your approval logic here
  };

  const handleMessageArtist = (contract) => {
    setSelectedArtist(contract.artistName || contract.artist?.name || 'Artist');
    onMessageOpen();
  };

  const handleMoreOptions = (contract) => {
    console.log('More options for:', contract.title);
    // Add your more options logic here
  };
  return (
    <>



      <ContractHeader title='My Contracts' />
      <div className='bg-[#FFFFFF] lg:border lg:border-[#EAEAEA] w-full lg:px-[35px] py-[45px] lg:mt-8 mb-8 rounded-[16px]'>
        <div className='font-satoshi'>
          {/* Tab Navigation */}
          <div className='flex w-full flex-col mb-4 lg:mb-8 px-0 lg:px-0'>
            <Tabs
              selectedKey={activeTab}
              onSelectionChange={(key) => {
                setActiveTab(key);
                router.push(`?tab=${key}`, { scroll: false });
              }}
              variant='underlined'
              classNames={{
                tabList:
                  'gap-6 lg:gap-12 w-full relative rounded-none p-0 border-b border-gray-100 px-4 lg:px-[20px] overflow-x-auto no-scrollbar',
                cursor: 'w-full bg-[#3A98BB] lg:bg-[#222222] h-[2px]',
                tab: 'px-0 py-3 h-auto max-w-fit shrink-0',
                tabContent:
                  'text-[14px] lg:text-[15px] font-medium text-[#878787] group-data-[selected=true]:font-bold group-data-[selected=true]:text-[#222222]',
              }}
            >
              {tabs.map((tab) => (
                <Tab key={tab.id} title={tab.label} />
              ))}
            </Tabs>
          </div>

          {/* Tab Content for pending contracts */}
          {activeTab === 'pending' && (
            <PendingContracts
              contracts={pendingContracts}
              search={search}
              onSearchChange={setSearch}
              onContractClick={handlePendingClick}
              onCancelContract={handleCancelContract}
              onMessageArtist={handleMessageArtist}
            />
          )}

          {/* Tab Content for ongoing contracts */}
          {activeTab === 'ongoing' && (
            <OngoingContracts
              contracts={ongoingContracts}
              search={search}
              onSearchChange={setSearch}
              onContractClick={handleOngoingClick}
              onApproveWork={handleApproveWork}
              onMessageArtist={handleMessageArtist}
              onMoreOptions={handleMoreOptions}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onRequestExtension={(contractId) => {
                setExtendedContractId(contractId);
              }}
            />
          )}

          {/* Tab Content for completed contracts */}
          {activeTab === 'completed' && <CompletedContracts />}
        </div>
      </div>

      <CancelContractModal
        isOpen={isCancelOpen}
        onOpenChange={onCancelOpenChange}
        onConfirm={confirmCancelContract}
        contractId={contractToCancel}
      />

      <MessageModal
        isOpen={isMessageOpen}
        onOpenChange={onMessageOpenChange}
        artistName={selectedArtist}
      />

      {/* Extension Request View Modal */}
      <Modal
        isOpen={showViewExtensionModal}
        onOpenChange={setShowViewExtensionModal}
        classNames={{
          wrapper: 'items-center justify-center',
          base: 'bg-white w-[90vw] max-w-lg p-0 border-0 rounded-2xl m-0 sm:m-0',
          backdrop: 'bg-black/50',
          closeButton: 'top-4 right-4 text-gray-500 hover:text-gray-700 z-10',
        }}
        size="lg"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              {/* Header Strip */}
              <div className="bg-[#FFF9E6] px-6 py-5 flex items-center gap-3 relative rounded-t-2xl">
                <div className="flex items-center justify-center w-10 h-10 bg-[#E5A443] rounded-full shrink-0">
                  <ExclamationTriangleIcon className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-[#D97706] font-satoshi tracking-wide">Extension Request</h2>
              </div>

              <ModalBody className="px-6 py-6 font-satoshi mt-1">
                <p className="text-[#222222] text-[15px] mb-6">
                  Client has requested extension of project deadline.
                </p>

                <div className="flex flex-col gap-5 text-sm">
                  <div className="grid grid-cols-[190px_1fr] items-center gap-2 md:gap-4">
                    <span className="font-bold text-[#222222]">New Deadline :</span>
                    <span className="text-gray-600">24th April, 2026</span>
                  </div>

                  <div className="grid grid-cols-[190px_1fr] items-start gap-2 md:gap-4">
                    <span className="font-bold text-[#222222]">Reason :</span>
                    <span className="text-gray-600">Additional 5 sketches</span>
                  </div>

                  <div className="grid grid-cols-[190px_1fr] items-center gap-2 md:gap-4">
                    <span className="font-bold text-[#222222]">Additional Payment Offer :</span>
                    <div className="flex items-center flex-wrap">
                      <span className="text-[15px]">N20,000</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-10 mb-1">
                  <Button
                    className="flex-1 bg-white border border-[#3A98BB] text-[#222222] font-semibold tracking-wide rounded-full shadow-sm h-11"
                    onPress={() => {
                      setShowViewExtensionModal(false);
                      setShowDeclinedExtensionModal(true);
                    }}
                  >
                    Decline
                  </Button>
                  <Button
                    className="flex-1 bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] text-[#035A7A] tracking-wide font-semibold rounded-full border-0 shadow-sm h-11"
                    onPress={() => {
                      setShowViewExtensionModal(false);
                    }}
                  >
                    Accept Request
                  </Button>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      <ExtensionPaymentModal
        isOpen={showExtensionPaymentModal}
        onOpenChange={setShowExtensionPaymentModal}
        amount="N20,000"
        contractId={extendedContractId || '24t64755'}
      />
      <Modal
        isOpen={showDeclinedExtensionModal}
        onOpenChange={setShowDeclinedExtensionModal}
        classNames={{
          wrapper: 'items-center justify-center',
          base: 'bg-white w-[90vw] max-w-lg p-0 border-0 rounded-2xl m-0 sm:m-0',
          backdrop: 'bg-black/50',
          closeButton: 'top-4 right-4 text-gray-500 hover:text-gray-700 z-10',
        }}
        size="lg"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              {/* Header Strip */}
              <div className="bg-[#FFF0E6] px-6 py-5 flex items-center gap-3 relative rounded-t-2xl">
                <div className="flex items-center justify-center w-8 h-8 bg-[#E67E41] rounded-full shrink-0">
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 5L5 9L13 1" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-[#E67E41] font-satoshi tracking-wide">Extension Request Declined</h2>
              </div>

              <ModalBody className="px-6 py-8 font-satoshi">
                <p className="text-[#222222] text-[16px] mb-2 font-medium">
                  Your extension request has been declined by the artist.
                </p>
                <p className="text-[#222222] text-[16px] mb-10 font-medium">
                  You can renegotiate with the artist.
                </p>

                <div className="flex justify-center">
                  <Button
                    className="bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] text-[#035A7A] tracking-wide font-bold rounded-full border-0 shadow-sm h-11 px-12 min-w-[140px]"
                    onPress={onClose}
                  >
                    Okay
                  </Button>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
