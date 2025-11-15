'use client';

import React from 'react';
import BtnProposals from '../../../components/BtnProposals';
import Abouttheclient from '../../../components/Abouttheclient';
import SendProposal from './_components/SendProposal';
import SendProposalsBtnMobile from './_components/SendProposalsBtnMobile';
import { useDisclosure } from '@heroui/react';
const Page = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleSubmitProposal = () => {
    onOpen();
  };
  return (
    <div className='grid grid-cols-10 gap-2'>
      {' '}
      {/* reduced from gap-4 to gap-2 */}
      {/* Main Content */}
      <div className='lg:col-span-7 col-span-10'>
        <SendProposal />
      </div>
      {/* Sidebar */}
      <div className='col-span-10 lg:col-span-3 lg:mt-24 flex flex-col'>
        <div className='hidden lg:flex mb-2 lg:mb-4'>
          {' '}
          {/* tighter spacing */}
          <BtnProposals
            handleSubmitProposal={handleSubmitProposal}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            saveText='Cancel'
          />
        </div>

        <div className='lg:flex mt-2 lg:mt-4 lg:mx-0 mx-auto'>
          {' '}
          {/* tighter spacing */}
          <Abouttheclient />
        </div>
      </div>
    </div>
  );
};

export default Page;
