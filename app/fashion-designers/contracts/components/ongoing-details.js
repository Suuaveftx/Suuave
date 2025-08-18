"use client";

import React from "react";

import { useState } from "react";
import {
  MapPinIcon,
  PaperClipIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardBody,
  Button,
  Avatar,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";


import ContractHeader from "./contract-header";

export default function OngoingDetailsPage({ params }) {
  const contractId = params?.id || "24t64754"; // fallback for demo
  console.log(contractId);
  // Mock data - replace with actual data fetching based on contractId
  const contractData = {
    jobTitle: "Modern Fashion Attire Illustration",
    contractNumber: "24t64754",
    contractType: "Hire",
    role: "Fashion Artist",
    budget: "₦200,000",
    timeframe: "1 Month",
    status: "Ongoing",
    attachedDocuments: [
      { name: "DocTGFile", type: "document" },
      { name: "DocE75", type: "legal" },
    ],
    artist: {
      name: "Tolu",
      username: "tolu",
      role: "Fashion Designer",
      location: "Lagos, Nigeria",
      rating: 0.0,
      reviews: 0,
      avatar: "/contract/designer.jpg",
      jobsPosted: 1,
      hire: 0,
      paymentMade: 0,
    },
  };

  // Function to get color based on status
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "text-[#035A7A]";
      case "ongoing":
        return "text-[#279711]";
      case "completed":
        return "success";
      default:
        return "default";
    }
  };

  // approval modal implementation
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleApproval = () => {
    // You can trigger an API call or update state here
    console.log("Contract approved");
    onOpenChange(); // Close approval modal
    setShowCongratulationsModal(true); // Show congratulations modal
  };

  //congrat modal
  const [showCongratulationsModal, setShowCongratulationsModal] =
    useState(false);

  //function to handle the Rate Ocean button
  const handleRateOcean = () => {
    setShowCongratulationsModal(false);
    // Handle rating functionality here
    console.log("Rate Ocean clicked");
  };

  return (
    <>

      <ContractHeader title="Contract Information" />
      <div className="max-w-6xl mx-auto px-2 md:px-0 pb-6 ">
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-6 gap-1">
          {/* Left Column - Contract Details & Documents */}
          <div className="lg:col-span-2 space-y-2">
            {/* Contract Details Card */}
            <Card className="bg-white border border-gray-200" shadow="none">
              <CardBody className="p-6 pb-12">
                <div className="flex items-center justify-between mb-6 border-b pb-2">
                  <h2 className="md:text-2xl text-lg font-semibold text-gray-900">
                    Contract Details
                  </h2>
                </div>

                <div className="flex justify-between items-start">
                  <div className="space-y-4">
                    {[
                      { label: "Job Title", value: contractData.jobTitle },
                      {
                        label: "Status",
                        value: contractData.status,
                      },
                      {
                        label: "Contract Number",
                        value: contractData.contractNumber,
                      },
                      {
                        label: "Contract Type",
                        value: contractData.contractType,
                      },
                      { label: "Role", value: contractData.role },
                      { label: "Budget", value: contractData.budget },
                      {
                        label: "Contract Timeframe",
                        value: contractData.timeframe,
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-[8rem_1fr] gap-4 items-start"
                      >
                        <span className={`${item.label === "Status" ? "lg:hidden":""} md:text-md text-sm w-32 mb-1 sm:mb-0 font-light`}>
                          {item.label} -
                        </span>
                        <span
                          className={`${
                            item.label === "Status"
                              ? `${getStatusColor(
                                  contractData.status
                                )} lg:hidden`
                              : ""
                          } md:text-md text-sm font-proximanova`}
                        >
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Chip
                    variant="flat"
                    size="lg"
                    className={`${getStatusColor(
                      contractData.status
                    )} font-medium  border-1  rounded-3xl bg-transparent hidden lg:block`}
                  >
                    {contractData.status}
                  </Chip>
                </div>
              </CardBody>
            </Card>

            {/* Attached Documents Card */}
            <Card className="bg-white border border-gray-200" shadow="none">
              <CardBody className="p-6">
                <h2 className="md:text-2xl text-lg font-semibold md:mb-2 -mt-2">
                  Attached Documents
                </h2>

                {contractData.attachedDocuments.map((doc, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-start px-3 md:py-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer "
                  >
                    <div className="flex items-center justify-center gap-2">
                      <PaperClipIcon className="md:h-5 md:w-5 h-4 w-4" />
                      <p className="md:text-md text-sm font-proximanova text-[#3A98BB]">
                        {doc.name}
                      </p>
                    </div>
                  </div>
                ))}
              </CardBody>
            </Card>
          </div>

          {/* Right Column - Artist Info & Actions */}
          <div className="flex space-y-2 gap-2 flex-col-reverse lg:flex-col">
            {/* Action Buttons */}
            <Card className="bg-white border border-gray-200 drop-shadow-md">
              <CardBody className=" lg:py-6 px-12 lg:space-y-6 space-y-0 space-x-2 lg:space-x-0 flex flex-row items-center lg:flex-col">
                <Button
                  className="w-full bg-radial py-6 from-[#EAF9FF] to-[#CCE7F2] text-[#035A7A] font-medium rounded-full border-0 shadow-sm"
                  size="md"
                  radius="full"
                  onPress={onOpen}
                >
                  Submit Project
                </Button>
                <Button
                  variant="bordered"
                  className="w-full bg-transparent py-5 border-2 border-[#CCE7F2] text-[#035A7A] font-medium rounded-3xl  shadow-sm"
                  size="md"
                  radius="full"
                >
                  Chat Client
                </Button>
                <Button
                  variant="bordered"
                  className="hidden lg:block w-full bg-transparent py-5 border-none text-[#222222] font-medium rounded-3xl "
                  size="md"
                  radius="full"
                >
                  Report
                </Button>
              </CardBody>
            </Card>

            {/* Artist Information Card */}
            <Card
              className="bg-white border font-satoshi border-gray-200 "
              shadow="none"
            >
              <CardBody className="">
                <div className="text-center font-satoshi">
                  <h3 className="text-2xl font-bold mb-6">About Artist</h3>
                  <Avatar
                    src={contractData.artist.avatar}
                    className="w-28 h-28 mx-auto mb-4 rounded-full"
                    name={contractData.artist.name}
                  />

                  <h3 className="text-md font-proximanova mb-1 text-[#3A98BB]">
                    {contractData.artist.name}
                    <span className="font-satoshi text-[#222222]">
                      {" "}
                      @{contractData.artist.username}
                    </span>
                  </h3>

                  <p className="text-sm  text-[#222222] mb-4">
                    {contractData.artist.role}
                  </p>

                  <div className="flex items-center justify-center gap-1 text-sm  text-[#222222] mb-2">
                    <MapPinIcon className="h-5 w-5 text-[#878787]" />
                    <span>{contractData.artist.location}</span>
                  </div>

                  <div className="flex items-center justify-center gap-2 mb-6  text-[#222222]">
                    <span>Ratings</span>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(contractData.artist.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-[#ACACAC] border-none"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-[#3A98BB]">
                      ({contractData.artist.reviews} Reviews)
                    </span>
                  </div>
                  {/* job posted , hired and payment made */}
                  <div className="w-full flex flex-col items-center gap-8">
                    <div>
                      <p className="text-[#222222] font-bold text-xl">
                        {contractData.artist.jobsPosted}
                      </p>
                      <p className="text-[#767676] font-normal text-base">
                        Jobs Posted
                      </p>
                    </div>
                    <div>
                      <p className="text-[#222222] font-bold text-xl">
                        {contractData.artist.hire}
                      </p>
                      <p className="text-[#767676] font-normal text-base">
                        Hire
                      </p>
                    </div>
                    <div>
                      <p className="text-[#222222] font-bold text-xl">
                        {contractData.artist.paymentMade}
                      </p>
                      <p className="text-[#767676] font-normal text-base">
                        Payment Made
                      </p>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
      {/* Approval Modal Implemetation */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          base: "bg-white w-[90vw] max-w-md",
          backdrop: "bg-black/50",
          header: "border-b-0 pb-2",
          body: "py-4",
          footer: "pt-4 border-t-0",
        }}
        size="md"
        backdrop="blur"
        hideCloseButton
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <p className="text-sm font-satoshi leading-relaxed px-1 pt-2 text-left">
                  <span className="font-semibold">Note: </span>Once you confirm
                  this project as completed, the contract will be considered
                  concluded and payment will be released to{" "}
                  {contractData.artist.name}.
                </p>
              </ModalBody>
              <ModalFooter className="w-full flex justify-center items-center  font-satoshi gap-5 -mt-4">
                <Button
                  variant="bordered"
                  onPress={onClose}
                  className="w-full bg-radial from-[#EAF9FF] to-[#E8E8E8] text-[#222222] font-medium rounded-full border-0 shadow-sm"
                  radius="full"
                  size="md"
                >
                  Cancel
                </Button>
                <Button
                  className="w-full bg-radial from-[#EAF9FF] to-[#CCE7F2] text-[#035A7A] font-medium rounded-full border-0 shadow-sm"
                  radius="full"
                  size="md"
                  variant="bordered"
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
          base: "bg-white w-[90vw] max-w-sm mx-auto",
          backdrop: "bg-black/50",
          body: "px-8 py-8",
        }}
        size="sm"
        backdrop="blur"
        hideCloseButton
        placement="center"
        isDismissable={false}
      >
        <ModalContent>
          <ModalBody className="text-center">
            {/* Celebration Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                {/* Main party popper emoji */}
                <div className="text-6xl mb-2">🎉</div>

                {/* Decorative confetti elements */}
                <div
                  className="absolute -top-1 -right-1 text-lg rotate-12 animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                >
                  🟡
                </div>
                <div
                  className="absolute -top-2 -left-2 text-sm rotate-45 animate-pulse"
                  style={{ animationDelay: "0.4s" }}
                >
                  🔴
                </div>
                <div
                  className="absolute -bottom-1 -right-3 text-sm -rotate-12 animate-pulse"
                  style={{ animationDelay: "0.6s" }}
                >
                  🟢
                </div>
                <div
                  className="absolute -bottom-2 -left-1 text-lg rotate-45 animate-pulse"
                  style={{ animationDelay: "0.8s" }}
                >
                  🔵
                </div>
                <div
                  className="absolute top-1 -right-4 text-xs rotate-12 animate-pulse"
                  style={{ animationDelay: "1s" }}
                >
                  🟠
                </div>
                <div
                  className="absolute top-2 -left-4 text-xs -rotate-45 animate-pulse"
                  style={{ animationDelay: "1.2s" }}
                >
                  🟣
                </div>
              </div>
            </div>

            {/* Congratulations Text */}
            <h2 className="text-4xl font-bold text-gray-900 mb-1 font-satoshi">
              Congratulations
            </h2>

            <p className="text-gray-600 text-sm mb-8 font-satoshi leading-relaxed">
              Your project has been successfully completed.
            </p>

            {/* Rate Ocean Button */}
            <Button
              className="w-full bg-radial from-[#EAF9FF] to-[#CCE7F2] text-[#035A7A] font-proximanova text-md border-0 shadow-sm"
              size="lg"
              radius="full"
              variant="bordered"
              onPress={handleRateOcean}
            >
              Rate Ocean
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
