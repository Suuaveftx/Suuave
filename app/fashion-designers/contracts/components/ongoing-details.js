"use client";

import React from "react";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
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
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";

import ContractHeader from "./contract-header";
import { TiLocation } from "react-icons/ti";
import { FaStar } from "react-icons/fa6";
import { IoFlagSharp } from "react-icons/io5";
import Link from "next/link";
import SubmitModal from "../../../../components/SubmitModal";
import PageContainer from "../../../../components/layout/PageContainer";
import { useAppStore } from '@/store';


import { ongoingContracts } from "../data";

export default function OngoingDetailsPage({ params }) {
  const unwrappedParams = React.use(params);
  const contractId = unwrappedParams?.id || "24t64755"; // fallback for demo
  const router = useRouter();

  // Read extension data from URL if coming from checkout "View Contract"
  const searchParams = useSearchParams();
  const extendedNewDeadline = searchParams.get('newDeadline');
  const extendedInitialDeadline = searchParams.get('initialDeadline');
  const extendedAt = searchParams.get('extendedAt');
  const contractStatus = searchParams.get('status');
  const isExtended = !!extendedNewDeadline || searchParams.get('isExtended') === 'true' || contractStatus === 'Deadline Extended';
  const isWaitingApproval = contractStatus === 'Waiting Approval';
  const isExtensionRequested = contractStatus === 'Extension Requested';

  const contractData = {
    jobTitle: "Modern Fashion Attire Illustration",
    contractNumber: contractId || "24t64754",
    contractType: "Hire",
    role: "Fashion Artist",
    budget: "₦200,000",
    timeframe: "Within A Month",
    startDate: "18th June, 2024",
    endDate: isExtended ? (extendedNewDeadline || "24th April, 2026") : "25th June, 2024",
    status: contractStatus || "Ongoing",
    isSubmitted: isWaitingApproval,
    isLate: false,
    daysLate: 0,
    isExpiringSoon: false,
    remainingDays: 0,
    attachedDocuments: [
      { name: "Doc1534re", type: "document" },
      { name: "Doc573", type: "legal" },
    ],
    artist: {
      name: "Tolu",
      username: "tolu",
      role: "Fashion Designer",
      location: "Lagos, Nigeria",
      rating: 0.0,
      reviews: 0,
      avatar: "/contract/designer.jpg",
    },
  };


  // approval modal implementation
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isOpen: isReviewOpen, onOpen: onReviewOpen, onOpenChange: onReviewOpenChange } = useDisclosure();

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

  const { reportedDisputes, withdrawDispute } = useAppStore();
  const isDisputed = reportedDisputes[contractId] || reportedDisputes[contractData.contractNumber];
  const { isOpen: isWithdrawOpen, onOpen: onWithdrawOpen, onOpenChange: onWithdrawOpenChange } = useDisclosure();
  const [showExtensionModal, setShowExtensionModal] = useState(false);
  const [showRequestChangesModal, setShowRequestChangesModal] = useState(false);
  const [changesMessage, setChangesMessage] = useState("");

  // ===== Extension Request Modal =====
  const [showViewExtensionModal, setShowViewExtensionModal] = useState(false);
  const [showDeclinedExtensionModal, setShowDeclinedExtensionModal] = useState(false);

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
      <PageContainer>
        <ContractHeader title="Contract Information" maxWidth="max-w-6xl" tab="ongoing" showBack={true} withNavbarOffset={false} />
        <div className="w-full mx-auto pb-36 lg:pb-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-6 gap-0 -mx-4 lg:mx-0">
            {/* Left Column - Contract Details & Documents */}
            <div className="lg:col-span-2 space-y-[6px] lg:space-y-4">
              {/* Banner Notification - Waiting Approval */}
              {isWaitingApproval && (
                <div className="flex items-center justify-between bg-[#FAFAFA] border border-[#3A98BB] rounded-[10px] px-4 py-3 md:mb-6 mb-4">
                  <div className="flex items-center gap-2 md:gap-3">
                    <ExclamationTriangleIcon className="w-5 h-5 text-[#3A98BB] flex-shrink-0" />
                    <p className="text-[13px] md:text-sm text-[#3A98BB]">
                      This project has been submitted as completed. Waiting for your approval.
                    </p>
                  </div>
                  <span onClick={onReviewOpen} className="cursor-pointer text-[13px] md:text-sm font-semibold text-[#3A98BB] whitespace-nowrap pl-2">
                    Click to Review
                  </span>
                </div>
              )}

              {/* Banner Notification - Extension Requested */}
              {isExtensionRequested && (
                <div className="flex items-center justify-between border border-[#F5A623] bg-[#FFFBF0] text-[#F5A623] px-4 py-3 rounded-[10px] mb-4">
                  <div className="flex items-center gap-2">
                    <ExclamationTriangleIcon className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium text-[13px] md:text-sm">Artist has requested for a deadline extension</span>
                  </div>
                  <span
                    className="font-semibold text-[13px] md:text-sm cursor-pointer hover:underline whitespace-nowrap pl-2"
                    onClick={() => setShowViewExtensionModal(true)}
                  >
                    Click to View
                  </span>
                </div>
              )}

              {/* Contract Details Card */}
              <Card className="bg-white border border-gray-200" shadow="none">
                <CardBody className="p-4 lg:p-6 pb-8 lg:pb-12">
                  {/* Combined header logic: title + status badges */}
                  <div className="flex  items-start lg:items-center justify-between mb-4 lg:mb-6 lg:border-b lg:pb-2">
                    <h2 className="text-[20px] lg:text-2xl font-bold lg:font-semibold text-gray-900">Contract Details</h2>
                    <div className="flex flex-wrap items-center gap-1.5 justify-end">
                      {isWaitingApproval ? (
                        <span className="bg-[#FEF3C7] text-[#B45309] px-3 py-1 rounded-full text-[11px] lg:text-xs font-semibold whitespace-nowrap">Waiting Approval</span>
                      ) : isExtensionRequested ? (
                        <span className="bg-[#F3E8FF] text-[#7C3AED] px-3 py-1 rounded-full text-[11px] lg:text-xs font-semibold whitespace-nowrap">Extension Requested</span>
                      ) : contractStatus === 'Deadline Approved' ? (
                        <span className="bg-[#DCFCE7] text-[#16A34A] px-3 py-1 rounded-full text-[11px] lg:text-xs font-semibold whitespace-nowrap">Deadline Approved</span>
                      ) : isExtended ? (
                        <span className="bg-[#E0F2FE] text-[#0284C7] px-3 py-1 rounded-full text-[11px] lg:text-xs font-semibold whitespace-nowrap">Deadline Extended</span>
                      ) : contractStatus === 'Extension Rejected' ? (
                        <span className="bg-[#FEE2E2] text-[#DC2626] px-3 py-1 rounded-full text-[11px] lg:text-xs font-semibold whitespace-nowrap">Extension Rejected</span>
                      ) : (
                        <span className="border border-[#279711] text-[#279711] px-3 py-1 bg-transparent rounded-full text-[11px] lg:text-xs font-semibold whitespace-nowrap">Ongoing</span>
                      )}
                    </div>
                  </div>

                  {/* Deadline Extended Banner */}
                  {isExtended && !isExtensionRequested && (
                    <div className="flex items-start gap-3 bg-[#EAF9FF] border border-[#CCE7F2] rounded-xl px-4 py-3 mb-5">
                      <div className="w-5 h-5 rounded-full bg-[#035A7A] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg width="10" height="8" viewBox="0 0 12 10" fill="none">
                          <path d="M1 5L4.5 8.5L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#035A7A]">Deadline Extended</p>
                        <p className="text-xs text-[#035A7A] mt-0.5">
                          Contract deadline updated from <span className="line-through">{extendedInitialDeadline}</span> to <span className="font-bold">{extendedNewDeadline}</span>
                          {extendedAt && <span className="text-[#3A98BB]"> · Extended on {extendedAt}</span>}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-start">
                    <div className="space-y-4">
                      {[
                        { label: "Job Title", value: contractData.jobTitle },
                        { label: "Contract Number", value: contractData.contractNumber },
                        { label: "Contract Type", value: contractData.contractType },
                        { label: "Role", value: contractData.role },
                        { label: "Budget", value: contractData.budget },
                        { label: "Contract Starts", value: contractData.startDate },
                        { label: "Contract Ends", value: contractData.endDate },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className={`grid grid-cols-[38%_62%] sm:grid-cols-[8rem_1fr] md:gap-4 gap-2 items-start w-full`}
                        >
                          <span
                            className={`${item.label === "Contract Number" ? "lg:-mt-4" : ""}  md:text-md text-sm mb-1 sm:mb-0 font-light`}
                          >
                            {item.label}
                          </span>
                          <span
                            className={`${item.label === "Contract Number" ? "lg:-mt-4" : ""}  md:text-md text-sm font-proximanova break-words whitespace-normal`}
                          >
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>


                  </div>
                </CardBody>
              </Card>

              {/* Attached Documents Card */}
              <Card className="bg-white" shadow="none">
                <CardBody className="p-6">
                  <h2 className="lg:text-2xl text-[20px] font-semibold md:mb-2 -mt-2">
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
            <div className="flex gap-4 flex-col lg:flex-col">
              {/* Desktop Action Buttons */}
              <Card className="hidden lg:block bg-white border border-gray-200 drop-shadow-md rounded-2xl">
                <CardBody className="py-6 px-12 flex flex-col items-center justify-center gap-4">
                  <Button
                    className="w-full bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] h-[44px] text-[#035A7A] font-semibold rounded-full border-0 shadow-sm text-sm"
                    radius="full"
                    onPress={onOpen}
                  >
                    Approve Work
                  </Button>

                  <Button
                    className="w-full bg-[#EAEAEA] h-[44px] text-[#222222] font-semibold rounded-full border-0 shadow-sm text-sm"
                    radius="full"
                    onPress={() => setShowRejectModal(true)}
                  >
                    Reject
                  </Button>

                  <Dropdown placement="bottom" classNames={{ content: "min-w-[200px]" }}>
                    <DropdownTrigger>
                      <Button
                        className="w-full bg-transparent h-[44px] border-0 text-[#111111] font-semibold rounded-full text-sm"
                        radius="full"
                      >
                        More...
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="More Actions">
                      <DropdownItem key="extension" className="text-sm cursor-pointer" onPress={() => setShowExtensionModal(true)}>Request Extension</DropdownItem>
                      <DropdownItem
                        key="dispute"
                        className="text-sm text-danger cursor-pointer"
                        color="danger"
                        onPress={() => router.push(`/fashion-designers/report-dispute?contractId=${encodeURIComponent(contractId || '')}`)}
                      >
                        Report Dispute
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </CardBody>
              </Card>

              {/* Artist Information Card */}
              <Card className="bg-white border font-satoshi border-gray-200 mt-[6px] lg:mt-0" shadow="none">
                <CardBody className="p-4 lg:p-4">
                  {/* Mobile: compact horizontal row */}
                  <div className="lg:hidden">
                    <h3 className="text-[15px] font-semibold text-[#111111] mb-3 border-b border-gray-100 pb-3">About the Artist</h3>
                    <Link href="/artist-page/profile-vistor-view" className="flex items-center justify-between py-1">
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={contractData.artist.avatar}
                          className="w-11 h-11 rounded-full flex-shrink-0"
                          name={contractData.artist.name}
                        />
                        <div>
                          <p className="text-[15px] font-semibold text-[#3A98BB] leading-tight">{contractData.artist.name}</p>
                          <p className="text-[13px] text-gray-500 mt-0.5">{contractData.artist.role}</p>
                        </div>
                      </div>
                      <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
                    </Link>
                  </div>

                  {/* Desktop: centered layout */}
                  <div className="hidden lg:block text-center font-satoshi">
                    <h3 className="text-2xl font-bold mb-6">About the Artist</h3>
                    <Link href="/artist-page/profile-vistor-view" className="block w-fit mx-auto">
                      <Avatar
                        src={contractData.artist.avatar}
                        className="w-28 h-28 mx-auto mb-4 rounded-full cursor-pointer hover:opacity-80 transition-opacity"
                        name={contractData.artist.name}
                      />
                    </Link>
                    <h3 className="text-md font-proximanova mb-1">
                      <Link href="/artist-page/profile-vistor-view" className="text-[#3A98BB] hover:underline">@{contractData.artist.username}</Link>
                    </h3>
                    <p className="text-sm text-[#222222] mb-4">{contractData.artist.role}</p>
                    <div className="flex items-center justify-center gap-1 text-sm text-[#222222] mb-2">
                      <TiLocation className="size-5 fill-[#878787]" />
                      <span>{contractData.artist.location}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 mb-6 text-[#222222]">
                      <span>Ratings</span>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={i < contractData.artist.rating ? "text-yellow-500" : "text-gray-300"} />
                        ))}
                      </div>
                      <span className="text-sm text-[#3A98BB]">({contractData.artist.reviews} <Link href="/artist-page/profile-vistor-view?tab=reviews">Reviews</Link>)</span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </PageContainer>

      {/* Mobile Action Buttons - outside PageContainer to avoid overflow-x-hidden clipping */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 px-4 py-4 z-50 lg:hidden drop-shadow-xl">
        <div className="flex flex-col gap-3 w-full">
          <div className="flex flex-row gap-3 w-full">
            <Button
              className="flex-1 bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] h-[44px] text-[#035A7A] font-semibold rounded-full border-0 shadow-sm text-sm"
              radius="full"
              onPress={onOpen}
            >
              Approve Work
            </Button>

            <Button
              className="flex-1 bg-[#EAEAEA] h-[44px] text-[#222222] font-semibold rounded-full border-0 shadow-sm text-sm"
              radius="full"
              onPress={() => setShowRejectModal(true)}
            >
              Reject
            </Button>
          </div>

          <Dropdown placement="top" classNames={{ content: "w-[calc(100vw-32px)] sm:min-w-[200px]" }}>
            <DropdownTrigger>
              <Button
                className="w-full bg-transparent h-[44px] border-0 text-[#111111] font-semibold rounded-full text-sm"
                radius="full"
              >
                More...
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="More Actions">
              <DropdownItem key="extension" className="text-sm text-center justify-center cursor-pointer" onPress={() => setShowExtensionModal(true)}>Request Extension</DropdownItem>
              <DropdownItem
                key="dispute"
                className="text-sm text-danger text-center justify-center cursor-pointer"
                color="danger"
                onPress={() => router.push(`/fashion-designers/report-dispute?contractId=${encodeURIComponent(contractId || '')}`)}
              >
                Report Dispute
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
                    wrapper: 'z-[9999]',
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

      <Modal
        isOpen={isReviewOpen}
        onOpenChange={onReviewOpenChange}
        classNames={{
          base: "bg-white w-[95vw] max-w-3xl",
          backdrop: "bg-black/50 z-[299]",
          wrapper: "z-[300]",
        }}
        size="3xl"
        backdrop="blur"
        placement="center"
        scrollBehavior="inside"
        hideCloseButton
      >
        <ModalContent className="rounded-3xl overflow-hidden flex flex-col" style={{ maxHeight: '85vh' }}>
          {(onClose) => (
            <>
              {/* Sticky Header */}
              <div className="px-6 pt-6 pb-5 border-b border-gray-100 flex-shrink-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-1">SUBMITTED WORK</h2>
                    <p className="text-sm text-gray-500 font-satoshi">
                      Artist has submitted the work as completed. Kindly review all files before approval.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="ml-4 flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-800"
                    aria-label="Close modal"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Scrollable Body */}
              <ModalBody className="px-6 py-5 overflow-y-auto flex-1">
                <div className="border border-gray-100 rounded-xl p-5 mb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar src={contractData.artist.avatar} className="w-8 h-8 rounded-full" />
                    <span className="font-semibold text-sm text-gray-900">{contractData.artist.name}</span>
                  </div>
                  <p className="text-[13.5px] text-gray-800 font-satoshi leading-relaxed">
                    Hello Josh.<br />
                    Here is the final submission of the work. Kindly review and if any iteration please let me know. Thanks.
                  </p>
                </div>

                <h3 className="text-sm font-semibold text-gray-900 mb-3">Files</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { name: 'Look 1.png', size: '1.3mb', img: '/dev-images/fashionImg1.png' },
                    { name: 'Look 2.png', size: '1.3mb', img: '/dev-images/fashionImg2.png' },
                    { name: 'Look 3.png', size: '1.3mb', img: '/dev-images/fashionImg3.png' }
                  ].map((file, i) => (
                    <div key={i} className="border border-gray-200 rounded-xl p-3 flex items-center gap-3 bg-white">
                      <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={file.img} alt={file.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-bold text-gray-900 truncate">{file.name}</p>
                        <p className="text-[11px] text-gray-500">{file.size}</p>
                      </div>
                      <button className="flex-shrink-0 p-1">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="7 10 12 15 17 10"></polyline>
                          <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </ModalBody>

              {/* Sticky Footer */}
              <ModalFooter className="px-6 py-4 border-t border-gray-100 flex-shrink-0 flex flex-wrap gap-3 justify-start">
                <Button
                  className="bg-[#F0F0F0] text-[#222222] font-semibold rounded-full px-8 h-[44px]"
                  onPress={() => { onClose(); setShowRejectModal(true); }}
                >
                  Reject
                </Button>
                <Button
                  variant="bordered"
                  className="bg-transparent border border-[#3A98BB] text-[#222222] font-semibold rounded-full px-8 h-[44px]"
                  onPress={() => {
                    onClose();
                    setShowRequestChangesModal(true);
                  }}
                >
                  Request Changes
                </Button>
                <Button
                  className="bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] text-[#035A7A] font-semibold rounded-full px-8 h-[44px] border-0"
                  onPress={() => { onClose(); onOpen(); }}
                >
                  Approve Work
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
                    wrapper: 'z-[9999]',
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

      {/* Reject Modal */}
      <Modal
        isOpen={showRejectModal}
        onOpenChange={setShowRejectModal}
        classNames={{
                    wrapper: 'z-[9999]',
          base: 'bg-white w-[90vw] max-w-md',
          backdrop: 'bg-black/50',
          body: 'py-4',
          footer: 'pt-4 border-t-0',
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
                  Are you sure you want to reject the work submitted by{' '}
                  <strong>{contractData.artist?.name || 'the Artist'}</strong>?
                </p>
              </ModalBody>
              <ModalFooter className="w-full flex justify-center items-center font-satoshi gap-5 -mt-4">
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
                  className="w-full bg-red-500 text-white font-medium rounded-full border-0 shadow-sm hover:!bg-red-600"
                  radius="full"
                  size="md"
                  onPress={() => {
                    console.log('Contract rejected:', contractData.jobTitle);
                    onClose();
                  }}
                >
                  Yes, Reject
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* ===== Complaint Submitted Modal ===== */}
      <Modal
        isOpen={showComplaintModal}
        onOpenChange={setShowComplaintModal}
        classNames={{
                    wrapper: 'z-[9999]',
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
                  Artist has requested extension of project deadline.
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
                    onPress={() => setShowViewExtensionModal(false)}
                  >
                    Accept Request
                  </Button>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Extension Declined Confirmation Modal */}
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
                  The extension request has been declined.
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
    
      
      {/* ===== Request Changes Modal ===== */}
      <Modal
        isOpen={showRequestChangesModal}
        onOpenChange={(open) => {
          setShowRequestChangesModal(open);
          if (!open) setChangesMessage("");
        }}
        classNames={{
                    wrapper: 'z-[9999]',
          base: "bg-white w-[90vw] max-w-lg p-0 rounded-2xl",
          backdrop: "bg-black/50",
          closeButton: "top-4 right-4 text-gray-400 hover:text-gray-600 z-10",
        }}
        size="lg"
        backdrop="blur"
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="p-6 md:p-8">
                <h2 className="text-[17px] md:text-[18px] font-bold text-[#222222] font-satoshi mb-4 text-left">
                  Request Changes
                </h2>

                <textarea
                  value={changesMessage}
                  onChange={(e) => setChangesMessage(e.target.value)}
                  placeholder="Leave a message"
                  className="w-full h-[140px] border border-gray-200 rounded-xl p-4 text-[14px] text-[#222222] placeholder:text-[#A0A0A0] focus:outline-none focus:border-[#3A98BB] resize-none"
                />

                <div className="flex gap-4 mt-6 justify-end items-center">
                  <Button
                    className="w-[140px] h-[44px] bg-[#F4F4F5] hover:bg-gray-200 text-[#333333] font-semibold rounded-full border-0 text-[14px]"
                    radius="full"
                    onPress={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="w-[140px] h-[44px] bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] text-[#035A7A] font-semibold rounded-full border-0 shadow-sm text-[14px] hover:opacity-90 transition-opacity"
                    radius="full"
                    onPress={() => {
                      console.log("Changes requested:", changesMessage);
                      onClose();
                    }}
                  >
                    Send
                  </Button>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* ===== Request Extension Modal ===== */}
      <Modal
        isOpen={showExtensionModal}
        onOpenChange={setShowExtensionModal}
        classNames={{
                    wrapper: 'z-[9999]',
          base: 'bg-white w-[90vw] max-w-md p-0',
          backdrop: 'bg-black/50',
          closeButton: 'top-3 right-3 text-gray-400 hover:text-gray-600',
        }}
        size="md"
        backdrop="blur"
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="py-5 px-6">
                <div className="text-center mb-4">
                  <h2 className="text-xl font-bold text-[#E68A1D] mb-1 font-satoshi">Request Extension</h2>
                  <p className="text-xs text-gray-600 font-satoshi">Extend the contract deadline by days.</p>
                </div>

                <div className="space-y-3">
                  {/* Current Deadline */}
                  <div>
                    <label className="text-xs font-bold text-[#222222] mb-1 block">Current Deadline</label>
                    <div className="bg-[#F5F5F5] border-0 rounded-lg px-4 py-2 text-xs text-gray-500 w-3/5 font-satoshi">
                      {contractData.endDate || "23, June, 2024"}
                    </div>
                  </div>

                  {/* New Deadline */}
                  <div>
                    <label className="text-xs font-bold text-[#222222] mb-1 block">New Deadline</label>
                    <div className="relative w-3/5">
                      <Input
                        type="date"
                        placeholder="DD/MM/YY"
                        classNames={{
                    wrapper: 'z-[9999]',
                    backdrop: 'z-[9998]',
                          input: "text-xs font-satoshi text-gray-600",
                          inputWrapper: "bg-white border border-[#E5E5E5] hover:border-gray-400 focus-within:border-[#3A98BB] shadow-sm rounded-lg h-9 min-h-9",
                        }}
                      />
                    </div>
                  </div>

                  {/* Reason */}
                  <div>
                    <label className="text-xs font-bold text-[#222222] mb-1 block">Reason</label>
                    <textarea
                      placeholder=""
                      className="w-full min-h-[70px] bg-white border border-[#E5E5E5] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#3A98BB] p-3 text-sm font-satoshi resize-none shadow-sm"
                    />
                  </div>

                  {/* Additional Payment */}
                  <div>
                    <label className="text-xs font-bold text-[#222222] mb-1 block">Additional Payment</label>
                    <div className="w-2/5">
                      <Input
                        type="number"
                        placeholder="0.00"
                        classNames={{
                          input: "text-xs font-satoshi text-gray-600",
                          inputWrapper: "bg-white border border-[#E5E5E5] hover:border-gray-400 shadow-sm rounded-lg h-9 min-h-9",
                        }}
                      />
                      <p className="text-[10px] text-gray-400 mt-1 font-satoshi">(Commission: 10%)</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-5">
                  <Button
                    className="flex-1 bg-[#EBEBEB] text-[#555555] font-semibold rounded-full border-0 h-10"
                    onPress={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] text-[#035A7A] font-semibold rounded-full border-0 h-10 shadow-sm"
                    onPress={() => {
                      onClose();
                    }}
                  >
                    Send Request
                  </Button>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* ===== Withdraw Dispute Modal ===== */}
      <Modal
        isOpen={isWithdrawOpen}
        onOpenChange={onWithdrawOpenChange}
        classNames={{
                    wrapper: 'z-[9999]',
          base: 'bg-white w-[90vw] max-w-sm',
          backdrop: 'bg-black/50',
          body: 'py-6 px-6',
          footer: 'pt-2 pb-6 px-6 border-t-0',
        }}
        size="sm"
        backdrop="blur"
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <div className="text-center">
                  <h3 className="text-[18px] font-bold text-[#222222] mb-2 font-satoshi">Withdraw Dispute</h3>
                  <p className="text-sm font-satoshi leading-relaxed text-gray-600">
                    Are you sure you want to withdraw your reported dispute for this contract?
                  </p>
                </div>
              </ModalBody>
              <ModalFooter className="w-full flex justify-center items-center font-satoshi gap-3 -mt-2">
                <Button
                  variant="bordered"
                  onPress={onClose}
                  className="flex-1 border border-gray-300 text-[#222222] font-medium rounded-full shadow-sm"
                  radius="full"
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-red-500 text-white font-medium rounded-full border-0 shadow-sm hover:!bg-red-600"
                  radius="full"
                  onPress={() => {
                    withdrawDispute(contractId);
                    withdrawDispute(contractData.contractNumber);
                    onClose();
                  }}
                >
                  Yes, withdraw
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

    </>
  );
}
