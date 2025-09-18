"use client";

import React from "react";
import BtnProposals from "../../../components/BtnProposals";
import Abouttheclient from "../../../components/Abouttheclient";

import {

  useDisclosure,
} from "@heroui/react";
import ProposalClosed from "./_components/ProposalClosed";
const Page = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleSubmitProposal = () => {
    onOpen();
  };
  return (
    <div className="grid grid-cols-10 gap-2">
      {" "}
      {/* reduced from gap-4 to gap-2 */}
      {/* Main Content */}
      <div className="lg:col-span-7 col-span-10">
        <ProposalClosed />
      </div>
      {/* Sidebar */}
      <div className="col-span-10 lg:col-span-3 lg:mt-28 flex flex-col">
        <div className="hidden lg:flex mb-2 lg:mb-4">
          {" "}
          {/* tighter spacing */}
          <BtnProposals
  sendText="Edit Proposal"
  saveText="Withdraw Proposal"
  showSaveIcon={false}
  handleSubmitProposal={handleSubmitProposal}
  isOpen={isOpen}
  onOpenChange={onOpenChange}
/>

        </div>

        
      </div>
    </div>
  );
};

export default Page;
