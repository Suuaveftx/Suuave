'use client';

import React, { useState } from 'react';
import { Tabs, Tab } from '@heroui/react';

import ContractHeader from './contract-header';

import { useRouter, useSearchParams } from 'next/navigation';
import PendingContracts from './pending-contracts';
import OngoingContracts from './ongoing-contracts';

import CompletedContracts from './completed-contracts';
import { ongoingContracts } from '../data';
import CancelContractModal from './CancelContractModal';
import MessageModal from './MessageModal';
import { useDisclosure } from '@heroui/react';

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
      status: 'Pending',
    },
    {
      title: 'Modern Fashion Attire Illustration',
      id: '24t64755',
      pendingSince: '18th June, 2024',
      expiresIn: '2 Days',
      artistName: 'Tolu',
      artistRole: 'Fashion Artist',
      status: 'Pending',
    },
    {
      title: 'Modern Fashion Attire Illustration',
      id: '24t64756',
      pendingSince: '20th June, 2024',
      expiresIn: '1 Day',
      artistName: 'Tolu',
      artistRole: 'Fashion Artist',
      status: 'Pending',
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
    router.push(`/fashion-designers/contracts/ongoing/${contractId}`);
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
      <div className='max-w-7xl mx-auto bg-white px-2 md:px-4 my-6'>
        <div className='py-8 font-satoshi'>
          {/* Tab Navigation */}
          <div className='flex w-full flex-col mb-8'>
            <Tabs
              selectedKey={activeTab}
              onSelectionChange={setActiveTab}
              variant='underlined'
              classNames={{
                tabList:
                  'gap-12 w-full relative rounded-none p-0 border-b border-gray-200',
                cursor: 'w-full bg-[#3A98BB] h-0.5',
                tab: 'px-0 py-2 h-auto max-w-fit',
                tabContent:
                  'text-sm font-light group-data-[selected=true]:font-bold text-primary',
              }}
            >
              {tabs.map((tab) => (
                <Tab fullwidth key={tab.id} title={`${tab.label} (${tab.count})`} />
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
    </>
  );
}
