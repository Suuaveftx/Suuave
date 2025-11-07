<<<<<<< HEAD
"use client";

import React from "react";
import BtnProposals from "../../../components/BtnProposals";
import Abouttheclient from "../../../components/Abouttheclient";
import SendProposal from "./_components/SendProposal";
import SendProposalsBtnMobile from "./_components/SendProposalsBtnMobile";
import {

  useDisclosure,
} from "@heroui/react";
=======
'use client';

import React from 'react';
import BtnProposals from '../../../components/BtnProposals';
import Abouttheclient from '../../../components/Abouttheclient';
import SendProposal from './_components/SendProposal';
import SendProposalsBtnMobile from './_components/SendProposalsBtnMobile';
import { useDisclosure } from '@heroui/react';
>>>>>>> 73fc17016e5c581b034684263e3355a04a7b7d80
const Page = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleSubmitProposal = () => {
    onOpen();
  };
  return (
<<<<<<< HEAD
    <div className="grid grid-cols-10 gap-2">
      {" "}
=======
    <div className='grid grid-cols-10 gap-2'>
      {' '}
>>>>>>> 73fc17016e5c581b034684263e3355a04a7b7d80
      {/* reduced from gap-4 to gap-2 */}
      {/* Main Content */}
      <div className='lg:col-span-7 col-span-10'>
        <SendProposal />
      </div>
      {/* Sidebar */}
<<<<<<< HEAD
      <div className="col-span-10 lg:col-span-3 lg:mt-28 flex flex-col">
        <div className="hidden lg:flex mb-2 lg:mb-4">
          {" "}
=======
      <div className='col-span-10 lg:col-span-3 lg:mt-28 flex flex-col'>
        <div className='hidden lg:flex mb-2 lg:mb-4'>
          {' '}
>>>>>>> 73fc17016e5c581b034684263e3355a04a7b7d80
          {/* tighter spacing */}
          <BtnProposals
            handleSubmitProposal={handleSubmitProposal}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
<<<<<<< HEAD
          />
        </div>

        <div className="hidden lg:flex mt-2 lg:mt-4">
          {" "}
          {/* tighter spacing */}
          <Abouttheclient />
        </div>
        <div className="mb-[77px]">
          <SendProposalsBtnMobile
            handleSubmitProposal={handleSubmitProposal}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
          />
        </div>
=======
            saveText='Cancel'
          />
        </div>

        <div className='lg:flex mt-2 lg:mt-4 lg:mx-0 mx-auto'>
          {' '}
          {/* tighter spacing */}
          <Abouttheclient />
        </div>
>>>>>>> 73fc17016e5c581b034684263e3355a04a7b7d80
      </div>
    </div>
  );
};

export default Page;
