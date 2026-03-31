"use client";

import React from "react";

import { useState } from "react";
import {
  ExclamationTriangleIcon,
  HandThumbUpIcon,
  PaperClipIcon,
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
  useDisclosure,
  Alert,
  Checkbox,
  Input,
} from "@heroui/react";

import ContractHeader from "./contract-header";
import { TiLocation } from "react-icons/ti";
import { FaStar } from "react-icons/fa6";
import Link from "next/link";
import SubmitModal from "../../../../components/SubmitModal";

import { ongoingContracts } from "../data";

export default function OngoingDetailsPage({ params }) {
  const unwrappedParams = React.use(params);
  const contractId = unwrappedParams?.id || "24t64754"; // fallback for demo

  // Find the contract in our centralized data
  const contractDetails = ongoingContracts.find(c => c.id === contractId) || ongoingContracts[0];

  // Map our centralized data to the local contractData structure
  const contractData = {
    jobTitle: contractDetails.title,
    contractNumber: contractDetails.id,
    contractType: "Hire",
    role: "Fashion Artist",
    budget: contractDetails.budget || "₦200,000",
    timeframe: contractDetails.timeframe || "1 Day",
    status: contractDetails.status || "Ongoing",
    isSubmitted: contractDetails.isSubmitted,
    isLate: contractDetails.isLate,
    daysLate: contractDetails.daysLate,
    isExpiringSoon: contractDetails.isExpiringSoon,
    remainingDays: contractDetails.remainingDays,
    attachedDocuments: [
      { name: "DocTGFile", type: "document" },
      { name: "DocE75", type: "legal" },
    ],
    artist: contractDetails.artist,
  };

  // Function to get color based on status
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "text-[#035A7A] bg-[#F2F9FB]";
      case "ongoing":
        return "text-[#2563EB] bg-[#E0F2FE]";
      case "completed":
        return "text-[#279711] bg-[#ECFDF5]";
      case "waiting approval":
        return "text-[#2563EB] bg-[#E0F2FE]";
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
  const {
    isOpen: isRateOpen,
    onOpen: onRateOpen,
    onOpenChange: onRateOpenChange
  } = useDisclosure();

  const handleRateOcean = () => {
    setShowCongratulationsModal(false);
    onRateOpen();
  };

  const [selectedReason, setSelectedReason] = useState("");

  // ===== Reject Flow =====
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showComplaintModal, setShowComplaintModal] = useState(false);
  const [reasons, setReasons] = useState([]);
  const [explanation, setExplanation] = useState("");

  const handleRejectSubmit = () => {
    console.log("Reasons:", reasons, "Explanation:", explanation);
    setShowRejectModal(false);
    setShowComplaintModal(true);
  };

  return (
    <>
      <ContractHeader title="" maxWidth="max-w-6xl" tab="ongoing" />
      <div className="max-w-6xl mx-auto px-2 md:px-0 pb-6 ">
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-6 gap-1">
          {/* Left Column - Contract Details & Documents */}
          <div className="lg:col-span-2 space-y-2">
            {/* Contract Details Card */}
            <Card className="bg-white border border-gray-200" shadow="none">
              <CardBody className="p-6 pb-12">
                <div className="hidden md:flex items-center justify-between mb-6 border-b pb-2">
                  <h2 className="md:text-2xl text-lg font-semibold text-gray-900">
                    Contract Details
                  </h2>
                </div>

                <div className="flex justify-between items-start">
                  <div className="space-y-4">
                    {[
                      {
                        label: "Job Title",
                        value: contractData.jobTitle,
                      },
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
                        label: "Timeframe",
                        value: contractData.timeframe,
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-[8rem_1fr] gap-4 items-start"
                      >
                        <span
                          className={`${item.label === "Status" ? "lg:hidden" : ""
                            } ${item.label === "Contract Number" ? "lg:-mt-4" : ""
                            }  md:text-md text-sm w-36 mb-1 sm:mb-0 font-light`}
                        >
                          {item.label} :
                        </span>
                        {item.label === "Status" ? (
                          <div className="flex  items-center gap-2 lg:hidden">
                            <span className="border border-[#D1D1D1] text-[#279711] px-3 py-1 rounded-full text-xs font-medium capitalize">
                              Ongoing
                            </span>
                            {contractData.isSubmitted && (
                              <span className="bg-[#E0F2FE] text-[#2563EB] px-3 py-1 rounded-full text-xs font-medium w-32">
                                Waiting Approval
                              </span>
                            )}
                            {contractData.isLate && (
                              <span className="text-red-500 text-xs font-semibold">
                                ({contractData.daysLate}d late)
                              </span>
                            )}
                            {contractData.isExpiringSoon && (
                              <span className="text-green-600 text-xs font-semibold">
                                ({contractData.remainingDays}d left)
                              </span>
                            )}
                          </div>
                        ) : (
                          <span
                            className={`${item.label === "Contract Number" ? "lg:-mt-4" : ""
                              }  md:text-md text-sm font-proximanova`}
                          >
                            {item.value}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Status and Badges */}
                  <div className="flex flex-row items-center gap-2">
                    <div className="hidden lg:flex items-center gap-2">
                      <span className="border border-[#D1D1D1] text-[#279711] px-3 py-1 rounded-full text-xs font-medium">
                        Ongoing
                      </span>
                      {contractData.isSubmitted && (
                        <span className="bg-[#E0F2FE] text-[#2563EB] px-3 py-1 rounded-full text-xs font-medium">
                          Waiting Approval
                        </span>
                      )}
                    </div>

                    {contractData.isLate && (
                      <span className="text-red-500 text-xs font-semibold hidden lg:block">
                        ({contractData.daysLate}d late)
                      </span>
                    )}
                    {contractData.isExpiringSoon && (
                      <span className="text-green-600 text-xs font-semibold hidden lg:block">
                        ({contractData.remainingDays}d left)
                      </span>
                    )}
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Attached Documents Card */}
            <Card className="bg-white" shadow="none">
              <CardBody className="p-6">
                <h2 className="md:text-2xl text-lg font-semibold md:mb-2 -mt-2">
                  Attached Documents
                </h2>

                {contractData.attachedDocuments.map((doc, index) => (
                  <div
                    key={index}
                    onClick={() => window.open("#", "_blank")}
                    className="flex flex-col items-start px-3 md:py-3 py-2 rounded-lg transition-colors cursor-pointer hover:bg-gray-50"
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
          <div className="flex gap-2 flex-col lg:flex-col">
            {/* Action Buttons */}
            <Card className="bg-white border border-gray-200 drop-shadow-md">
              <CardBody className="py-4 lg:py-6 px-6 md:px-12 flex flex-row items-center justify-center gap-4 lg:flex-col lg:gap-6">
                <Button
                  className="flex-1 w-full bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] py-6 text-[#035A7A] font-medium rounded-full border-0 shadow-sm"
                  size="lg"
                  radius="full"
                  onPress={onOpen}
                >
                  Approve Work
                </Button>

                {contractData.isSubmitted ? (
                  <Button
                    variant="bordered"
                    className="flex-1 w-full bg-transparent py-6 border-2 border-[#CCE7F2] text-[#035A7A] font-medium rounded-3xl shadow-sm"
                    size="lg"
                    radius="full"
                    onPress={() => setShowRejectModal(true)}
                  >
                    Reject
                  </Button>
                ) : (
                  <Button
                    variant="bordered"
                    className="flex-1 w-full bg-transparent py-6 border-2 border-[#CCE7F2] text-[#035A7A] font-medium rounded-3xl shadow-sm"
                    size="lg"
                    radius="full"
                  >
                    Message Artist
                  </Button>
                )}
              </CardBody>
            </Card>

            {/* Artist Information Card */}
            <Card
              className="bg-white border font-satoshi border-gray-200 mt-[-4px]"
              shadow="none"
            >
              <CardBody className="">
                <div className="text-center font-satoshi">
                  <h3 className="text-2xl font-bold mb-6">About the Artist</h3>
                  <Link href="/artist-page/profile-vistor-view" className="block w-fit mx-auto">
                    <Avatar
                      src={contractData.artist.avatar}
                      className="w-28 h-28 mx-auto mb-4 rounded-full cursor-pointer hover:opacity-80 transition-opacity"
                      name={contractData.artist.name}
                    />
                  </Link>

                  <h3 className="text-md font-proximanova mb-1">
                    <Link href="/artist-page/profile-vistor-view" className="text-[#3A98BB] hover:underline">
                      @{contractData.artist.username}
                    </Link>
                  </h3>

                  <p className="text-sm  text-[#222222] mb-4">
                    {contractData.artist.role}
                  </p>



                  <div className="flex items-center justify-center gap-1 text-sm  text-[#222222] mb-2">
                    <TiLocation className="size-5 fill-[#878787]" />
                    <span>{contractData.artist.location}</span>
                  </div>

                  <div className="flex items-center justify-center gap-2 mb-6  text-[#222222]">
                    <span>Ratings</span>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={
                            i < contractData.artist.rating
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-sm text-[#3A98BB]">
                      ({contractData.artist.reviews}{" "}
                      <Link href="/artist-page/profile-vistor-view?tab=reviews">
                        Reviews
                      </Link>
                      )
                    </span>
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
                  className="w-full bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] text-[#035A7A] font-medium rounded-full border-0 shadow-sm"
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
              className="w-full bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] text-[#035A7A] font-proximanova text-md border-0 shadow-sm"
              size="lg"
              radius="full"
              variant="bordered"
              onPress={handleRateOcean}
            >
              Rate {contractData.artist.name}
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* ===== Reject Modal ===== */}
      <Modal
        isOpen={showRejectModal}
        onOpenChange={setShowRejectModal}
        classNames={{
          base: "bg-white w-[90vw] max-w-2xl p-4",
          backdrop: "bg-black/50",
          closeButton: "top-6 right-8"
        }}
        size="2xl"
        backdrop="blur"
        placement="center"
      >
        <ModalContent className="rounded-[2.5rem] p-4">
          <ModalBody className="flex flex-col gap-6 p-8">
            <h3 className="text-2xl font-bold text-[#222222]">
              Please state the reason for rejection
            </h3>

            <div className="flex flex-col gap-4">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setSelectedReason("Work Not Completed")}
              >
                <span className="text-xs font-satoshi">Work Not Completed</span>
                <Checkbox
                  isSelected={selectedReason === "Work Not Completed"}
                  onChange={() => setSelectedReason("Work Not Completed")}
                  size="md"
                />
              </div>

              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setSelectedReason("Not Satisfied")}
              >
                <span className="text-xs font-satoshi">Not Satisfied</span>
                <Checkbox
                  isSelected={selectedReason === "Not Satisfied"}
                  onChange={() => setSelectedReason("Not Satisfied")}
                  size="md"
                />
              </div>

              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setSelectedReason("Others")}
              >
                <span className="text-xs font-satoshi">Others</span>
                <Checkbox
                  isSelected={selectedReason === "Others"}
                  onChange={() => setSelectedReason("Others")}
                  size="md"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-lg font-bold text-[#222222]">
                Kindly state a reason
              </label>
              <textarea
                className="w-full border border-[#E1E1E1] rounded-2xl p-5 text-md resize-none focus:outline-none focus:ring-2 focus:ring-[#CCE7F2] bg-[#F9F9F9]"
                rows={4}
                placeholder="Type your explanation here..."
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
              />
            </div>
          </ModalBody>

          <ModalFooter className="px-8 pb-10 pt-0">
            <Button
              className="w-full bg-[#CCE7F2] text-[#222222] font-bold py-7 rounded-full text-lg shadow-sm"
              onPress={handleRejectSubmit}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* ===== Complaint Submitted Modal ===== */}
      <Modal
        isOpen={showComplaintModal}
        onOpenChange={setShowComplaintModal}
        classNames={{
          base: "bg-white w-[90vw] max-w-sm mx-auto",
          backdrop: "bg-black/50",
        }}
        size="sm"
        backdrop="blur"
        hideCloseButton
        placement="center"
        isDismissable={false}
      >
        <ModalContent>
          <ModalBody className="text-center py-8">
            <div className="flex justify-center mb-2">
              <HandThumbUpIcon className="h-14 w-14 text-[#035A7A]" />
            </div>

            <h2 className="text-2xl font-medium -mb-2">Complaint Submitted</h2>
            <p className="font-satoshi text-xs mb-6">
              Our team will review and resolve the issue within 48hrs
            </p>
            <div className="flex justify-center items-center">
              <Button
                className="max-w-[100px] px-12 bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] text-[#035A7A]"
                radius="full"
                variant="flat"
                onPress={() => setShowComplaintModal(false)}
              >
                Okay
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
      <SubmitModal
        isOpen={isRateOpen}
        onOpenChange={onRateOpenChange}
        name={contractData.artist.name}
        redirectPath='/fashion-designers/contracts'
      />
    </>
  );
}
