"use client";

import React from "react";
import BtnProposals from "../../../components/BtnProposals";
import Abouttheclient from "../../../components/Abouttheclient";

import {

  useDisclosure,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import ProposalActive from "./_components/ProposalActive";
const Page = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
  return (
    <div className="grid grid-cols-10 gap-2">
      {" "}
      {/* reduced from gap-4 to gap-2 */}
      {/* Main Content */}
      <div className="lg:col-span-7 col-span-10">
        <ProposalActive />
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
    </div>
  );
};

export default Page;
