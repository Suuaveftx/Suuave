"use client";

import React from "react";
import BtnProposals from "../../../components/BtnProposals";
import Abouttheclient from "../../../components/Abouttheclient";
import DeleteConfirmationModal from "../../fashion-designers/my-projects/components/DeleteConfirmationModal";

import {
  useDisclosure,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import ProposalActive from "./_components/ProposalActive";
const Page = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isWithdrawModalOpen,
    onOpen: onWithdrawModalOpen,
    onOpenChange: onWithdrawModalOpenChange
  } = useDisclosure();

  const router = useRouter();

  const handleSubmitProposal = () => {
    // Mock data from ProposalActive.js
    const coverLetter = "I am excited to apply for the Fashion Illustrator position at [Company/Brand Name]. With a strong background in fashion design and a keen eye for detail, I specialize in creating illustrations that bring concepts to life—from high fashion editorial looks to commercial-ready garment designs.\nMy illustration style blends creativity with clarity, ensuring each sketch communicates not just the outfit, but the story behind it. I am skilled in both traditional hand-drawn techniques and digital illustration tools like Adobe Illustrator, Photoshop, and Procreate.";
    const price = "N200,00";
    const duration = "5 Days";

    const params = new URLSearchParams({
      coverLetter,
      price,
      duration,
      edit: 'true'
    });

    router.push(`/artist-page/send-proposal?${params.toString()}`);
  };

  const confirmWithdrawProposal = () => {
    // Logic to withdraw proposal (e.g., clear from localStorage)
    // For this page, we might just assume it's for the generic 'active' one or 'job-0' context if known.
    // Assuming generic 'proposalActive' or specific ID if passed, but here we'll just clear the generic one for demo.
    localStorage.removeItem('postedProject'); // Or whichever key stores this specific proposal
    // Redirect or show toast
    router.push('/artist-page/my-proposals');
  };

  const handleWithdrawProposal = () => {
    onWithdrawModalOpen();
  };

  return (
    <div className="grid grid-cols-10 gap-2">
      {" "}
      {/* reduced from gap-4 to gap-2 */}
      {/* Main Content */}
      <div className="lg:col-span-7 col-span-10">
        <ProposalActive
          handleSubmitProposal={handleSubmitProposal}
          handleWithdrawProposal={handleWithdrawProposal}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      </div>
      {/* Sidebar */}
      <div className="col-span-10 lg:col-span-3 lg:mt-20 flex flex-col">
        <div className="hidden lg:flex mb-2 lg:mb-4">
          {" "}
          {/* tighter spacing */}
          <BtnProposals
            sendText="Edit Proposal"
            saveText="Withdraw Proposal"
            showSaveIcon={false}
            handleSubmitProposal={handleSubmitProposal}
            handleViewProposal={handleSubmitProposal}
            handleWithdrawProposal={handleWithdrawProposal}
            proposalSubmitted={true}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
          />

        </div>
        <div>
          {" "}
          {/* tighter spacing */}
          <Abouttheclient />
        </div>

      </div>

      <DeleteConfirmationModal
        isOpen={isWithdrawModalOpen}
        onOpenChange={onWithdrawModalOpenChange}
        onConfirm={confirmWithdrawProposal}
        title="Withdraw Proposal?"
        message="Are you sure you want to withdraw your proposal? This action cannot be undone."
        confirmButtonText="Yes"
      />
    </div>
  );
};

export default Page;
