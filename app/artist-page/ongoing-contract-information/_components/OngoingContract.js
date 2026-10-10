"use client";
import React, { useState } from "react";
import { Card, CardBody, Button, Modal, ModalContent, ModalBody, ModalFooter, useDisclosure } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import CustomButton from "../../../../components/CustomButton";
import { ChevronLeft } from "lucide-react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { IoFlagSharp } from "react-icons/io5";
import { useSearchParams, useRouter } from "next/navigation";
import ChatClientModal from "../../../../components/ChatClientModal";
import SubmitWorkModal from "../../../fashion-designers/contracts/components/SubmitWorkModal";
import { useAppStore } from "@/store";

const contractDetails = {
    jobTitle: "Modern Fashion Attire Illustration",
    contractNumber: "24t64754",
    contractType: "Hire",
    role: "Fashion Artist",
    budget: "N200,000",
    duration: "3 Days",
};

const attachments = [
    { name: "Doc1534re", path: "/dev-images/Attach2.png" },
    { name: "Doc1534re", path: "/dev-images/Attach2.png" },
];

const clientProfile = {
    name: "Tolu",
    handle: "@tolu",
    role: "Fashion Brand",
    location: "Lagos, Nigeria",
    avatar: "/dev-images/Clients.png",
    rating: 5,
    reviewCount: 0,
    stats: {
        jobsPosted: 1,
        hire: 0,
        paymentMade: 0,
    },
};

export default function OngoingContract() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id") || contractDetails.contractNumber;
    const timeStatus = searchParams.get("timeStatus") || "(14d left)";
    const color = searchParams.get("color") || "#22C55E";
    const isWaitingApproval = id === "24t64754-A";
    const router = useRouter();
    const isExtended = searchParams.get('isExtended') === 'true';
    const isExtensionRequested = searchParams.get('status') === 'Extension Requested' || id === '12m78390-C';

    const { reportedDisputes, withdrawDispute } = useAppStore();
    const isDisputed = reportedDisputes[id];
    const { isOpen: isWithdrawOpen, onOpen: onWithdrawOpen, onOpenChange: onWithdrawOpenChange } = useDisclosure();
    const [showViewExtensionModal, setShowViewExtensionModal] = useState(false);

    return (
        <>
            <div className="w-full max-w-[1400px] mx-auto pt-0 p-4 md:pt-0 md:p-6 lg:p-8 pb-32 md:pb-8 font-proximanova text-[#222222]">
                {/* Header with Back Button */}
                <div className="flex items-center gap-2 mb-4 md:mb-6 mt-1">
                    <button
                        onClick={() => router.push("/artist-page/my-contracts?tab=ongoing")}
                        className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                        aria-label="Back to ongoing contracts"
                    >
                        <ChevronLeft className="w-6 h-6 text-[#222222]" />
                    </button>
                    <h1 className="text-2xl md:text-3xl font-bold">Contract Information</h1>
                </div>

                <div className="hidden md:flex flex-col lg:flex-row gap-2 lg:gap-6">
                    {/* Left Column */}
                    <div className="flex-1 space-y-2 lg:space-y-6">
                        {/* Banner Notification */}
                        {isWaitingApproval && (
                            <div className="flex items-center justify-between bg-[#FAFAFA] border border-[#3A98BB] rounded-[10px] px-4 py-3 mb-4">
                                <div className="flex items-center gap-2 md:gap-3">
                                    <ExclamationTriangleIcon className="w-5 h-5 text-[#3A98BB] flex-shrink-0" />
                                    <p className="text-[13px] md:text-sm text-[#3A98BB]">
                                        You have submitted this project as completed. Waiting for client's approval.
                                    </p>
                                </div>
                                <SubmitWorkModal trigger={
                                    <span className="cursor-pointer text-[13px] md:text-sm font-semibold text-[#3A98BB] whitespace-nowrap pl-2">
                                        Click to Review
                                    </span>
                                } />
                            </div>
                        )}

                        {/* Banner Notification - Extension Requested */}
                        {isExtensionRequested && (
                            <div className="flex items-center justify-between border border-[#F5A623] bg-[#FFFBF0] text-[#F5A623] px-4 py-3 rounded-[10px] mb-6">
                                <div className="flex items-center gap-2">
                                    <ExclamationTriangleIcon className="w-5 h-5 flex-shrink-0" />
                                    <span className="font-medium text-[13px] md:text-sm">Client has requested for deadline extension</span>
                                </div>
                                <span 
                                    className="font-semibold text-[13px] md:text-sm cursor-pointer hover:underline text-[#F5A623]"
                                    onClick={() => setShowViewExtensionModal(true)}
                                >
                                    Click to View
                                </span>
                            </div>
                        )}

                        {/* Contract Details Card */}
                        <Card className="w-full p-4 md:p-6 shadow-sm border border-gray-100 rounded-2xl bg-white">
                            <div className="hidden md:flex justify-between items-start mb-6 border-b border-gray-100 pb-4">
                                <h2 className="text-xl font-bold">Contract Details </h2>
                                <div className="flex gap-2 items-center">
                                    <span className="border border-green-200 text-green-600 px-4 py-1 bg-transparent rounded-full text-[12px] font-semibold whitespace-nowrap">
                                        Ongoing
                                    </span>
                                    <div className="flex items-center border border-gray-200 rounded-full overflow-hidden text-[12px] font-semibold h-[28px]">
                                        <span className="px-3 py-1 text-gray-500 border-r border-gray-200 h-full flex items-center">Ends</span>
                                        <span className="px-3 py-1 text-gray-700 bg-white h-full flex items-center">2 days</span>
                                    </div>
                                </div>
                            </div>

                            {/* Deadline Extended Banner */}
                            {isExtended && (
                                <div className="flex items-start gap-3 bg-[#EAF9FF] border border-[#CCE7F2] rounded-xl px-4 py-3 mb-5 mt-2">
                                    <div className="w-5 h-5 rounded-full bg-[#035A7A] flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <svg width="10" height="8" viewBox="0 0 12 10" fill="none">
                                            <path d="M1 5L4.5 8.5L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-[#035A7A]">Deadline Extended</p>
                                        <p className="text-xs text-[#035A7A] mt-0.5">
                                            Contract deadline updated to <span className="font-bold">24th April, 2026</span>
                                        </p>
                                    </div>
                                </div>
                            )}

                            <div className="space-y-4">
                                {/* Job Title */}
                                <div className="grid grid-cols-[200px_1fr] gap-4 items-start">
                                    <span className="text-gray-500 text-sm">Job Title :</span>
                                    <span className="font-medium text-sm">{contractDetails.jobTitle}</span>
                                </div>
                                {/* Contract Number */}
                                <div className="grid grid-cols-[200px_1fr] gap-4 items-center">
                                    <span className="text-gray-500 text-sm">Contract Number :</span>
                                    <span className="font-medium text-sm">{id}</span>
                                </div>
                                {/* Role */}
                                <div className="grid grid-cols-[200px_1fr] gap-4 items-center">
                                    <span className="text-gray-500 text-sm">Role :</span>
                                    <span className="font-medium text-sm">{contractDetails.role}</span>
                                </div>
                                {/* Budget */}
                                <div className="grid grid-cols-[200px_1fr] gap-4 items-center">
                                    <span className="text-gray-500 text-sm">Budget :</span>
                                    <span className="font-medium text-sm">{contractDetails.budget}</span>
                                </div>
                                {/* Contract Starts */}
                                <div className="grid grid-cols-[200px_1fr] gap-4 items-center">
                                    <span className="text-gray-500 text-sm">Contract Starts :</span>
                                    <span className="font-medium text-sm">7th May, 2026</span>
                                </div>
                                {/* Contract Ends */}
                                <div className="grid grid-cols-[200px_1fr] gap-4 items-center">
                                    <span className="text-gray-500 text-sm">Contract Ends :</span>
                                    {isExtended ? (
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="font-medium text-sm">24th April, 2026</span>
                                            <span className="text-[10px] bg-[#FFA500] text-white px-2 py-0.5 rounded-full font-semibold whitespace-nowrap">Extended</span>
                                        </div>
                                    ) : (
                                        <span className="font-medium text-sm">12th May, 2026</span>
                                    )}
                                </div>
                            </div>
                        </Card>

                        {/* Attached Documents Card */}
                        <Card className="w-full p-4 md:p-6 shadow-sm border border-gray-100 rounded-2xl bg-white">
                            <h2 className="text-base md:text-xl font-bold mb-4 md:mb-6">Attached Documents</h2>
                            <div className="space-y-3">
                                {attachments.map((doc, index) => (
                                    <div key={index} className="flex items-center gap-2 text-[#3A98BB]">
                                        <Image src={doc.path} width={20} height={20} alt="attachment" className="w-5 h-5 object-contain" />
                                        <span className="text-sm cursor-pointer hover:underline">{doc.name}</span>
                                    </div>
                                ))}
                            </div>
                        </Card>


                    </div>

                    {/* Right Column (Sidebar) */}
                    <div className="w-full lg:w-[350px] space-y-2 lg:space-y-6">
                        {/* Action Buttons Card - Desktop Only */}
                        <Card className="w-full p-6 shadow-sm border border-gray-100 rounded-2xl hidden md:block bg-[#FDFDFD]">
                            <div className="flex flex-col gap-4 items-center">
                                <div className="w-full">
                                    <SubmitWorkModal trigger={
                                      <Button className="w-full h-[46px] text-[15px] font-semibold bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] text-[#035A7A] rounded-full hover:opacity-90 transition-opacity border-0 shadow-sm">
                                          Submit Project
                                      </Button>
                                    } />
                                </div>
                                <div className="w-full">
                                    <ChatClientModal clientName={clientProfile.name} trigger={
                                      <Button className="w-full h-[46px] rounded-full border border-gray-300 bg-transparent text-[#222222] font-semibold text-[15px]">
                                          Chat Client
                                      </Button>
                                    } />
                                </div>
                                <Button className="w-full h-[46px] rounded-full border border-gray-100 bg-[#FAFAFA] text-[#222222] font-semibold text-[15px] shadow-sm">
                                    <div className="flex items-center justify-center gap-2 w-full">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                                        <span>Request Extension</span>
                                    </div>
                                </Button>
                                {isDisputed ? (
                                    <Button
                                        className="w-full h-[46px] rounded-full border border-gray-100 bg-[#FAFAFA] text-gray-500 font-semibold text-[15px] shadow-sm hover:bg-gray-50"
                                        onPress={() => withdrawDispute(id)}
                                    >
                                        <div className="flex items-center justify-center gap-2 w-full">
                                            <span>Withdraw Dispute</span>
                                        </div>
                                    </Button>
                                ) : (
                                    <Button
                                        className="w-full h-[46px] rounded-full border border-gray-100 bg-[#FAFAFA] text-[#222222] font-semibold text-[15px] shadow-sm"
                                        onPress={() => router.push(`/artist-page/report-dispute?contractId=${id}`)}
                                    >
                                        <div className="flex items-center justify-center gap-2 w-full">
                                            <IoFlagSharp size={16} className="text-[#222222]" />
                                            <span>Report</span>
                                        </div>
                                    </Button>
                                )}
                            </div>
                        </Card>

                        {/* Client Profile Card */}
                        <Card className="w-full p-6 shadow-sm border border-gray-100 rounded-2xl text-center bg-white">
                            <h2 className="text-xl font-bold mb-6">Client&#39;s Profile</h2>

                            <div className="flex flex-col items-center">
                                <div className="w-20 h-20 rounded-full overflow-hidden mb-3 relative border-2 border-white shadow-sm hover:opacity-80 transition-opacity cursor-pointer">
                                    <Link href="/artist-page/client-profile">
                                        <Image
                                            src={clientProfile.avatar}
                                            width={80}
                                            height={80}
                                            alt={clientProfile.name}
                                            className="object-cover w-full h-full"
                                        />
                                    </Link>
                                </div>

                                <Link href="/artist-page/client-profile">
                                    <span className="font-bold text-[#3A98BB] hover:opacity-80 transition-opacity duration-200 cursor-pointer">
                                        {clientProfile.handle}
                                    </span>
                                </Link>

                                <p className="text-gray-600 text-xs mb-3">{clientProfile.role}</p>

                                <div className="flex items-center gap-1 text-gray-500 text-xs mb-2">
                                    <Image
                                        src="/dev-images/location.png"
                                        width={12}
                                        height={12}
                                        alt="location"
                                    />
                                    {clientProfile.location}
                                </div>

                                <Link href="/artist-page/client-profile">
                                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-8 cursor-pointer hover:opacity-80 transition-opacity">
                                        <span>Ratings</span>
                                        <div className="flex text-gray-300">
                                            {"★".repeat(5)}
                                        </div>
                                        <span className="text-[#3A98BB]">({clientProfile.reviewCount} Reviews)</span>
                                    </div>
                                </Link>

                                <div className="w-full space-y-6">
                                    <div>
                                        <div className="text-xl font-medium">{clientProfile.stats.jobsPosted}</div>
                                        <div className="text-gray-500 text-xs mt-1">Jobs Posted</div>
                                    </div>
                                    <div>
                                        <div className="text-xl font-medium">{clientProfile.stats.hire}</div>
                                        <div className="text-gray-500 text-xs mt-1">Hire</div>
                                    </div>
                                    <div>
                                        <div className="text-xl font-medium">{clientProfile.stats.paymentMade}</div>
                                        <div className="text-gray-500 text-xs mt-1">Payment Made</div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* ── MOBILE UI IMPLEMENTATION ── */}
                <div className="flex flex-col md:hidden -mx-4 mt-2 pb-44 w-screen">
                    {/* Banner Notification */}
                    {isWaitingApproval && (
                        <div className="w-full bg-[#FAFAFA] border-y border-[#3A98BB] px-4 py-3 mb-2 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <ExclamationTriangleIcon className="w-5 h-5 text-[#3A98BB] flex-shrink-0" />
                                <p className="text-[13px] text-[#3A98BB]">
                                    You have submitted this project as completed. Waiting for client's approval.
                                </p>
                            </div>
                            <SubmitWorkModal trigger={
                                <span className="cursor-pointer text-[13px] font-semibold text-[#3A98BB] whitespace-nowrap pl-2">
                                    Click to Review
                                </span>
                            } />
                        </div>
                    )}

                    {/* Panel 1: Contract Details Card */}
                    <div className="w-full bg-white border-b border-gray-200 px-4 py-5">
                        {/* Header: title + status badges */}
                        <div className="flex items-start justify-between mb-4">
                            <h2 className="text-[18px] font-bold text-gray-900">Contract Details</h2>
                            <div className="flex flex-wrap items-center gap-1.5 justify-end">
                                {isWaitingApproval ? (
                                    <span className="inline-flex items-center bg-[#EAF5FB] text-[#3A98BB] text-[11px] font-semibold px-2 rounded-full h-[22px]">
                                        Waiting Approval
                                    </span>
                                ) : (
                                    <>
                                        <span className="border border-[#CCE7F2] text-[#035A7A] px-3 py-1 bg-transparent rounded-full text-[11px] font-semibold whitespace-nowrap">
                                            Ongoing
                                        </span>
                                        {timeStatus && (
                                            <span className="text-[11px] font-semibold" style={{ color: color }}>{timeStatus}</span>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Fields */}
                        <div className="flex flex-col gap-4">
                            {[
                                { label: "Job Title", value: contractDetails.jobTitle },
                                { label: "Contract Number", value: id },
                                { label: "Role", value: contractDetails.role },
                                { label: "Budget", value: contractDetails.budget },
                                { label: "Contract Starts", value: "7th May, 2026" },
                                { label: "Contract Ends", value: "12th May, 2026" },
                            ].map((item, index) => (
                                <div key={index} className="grid grid-cols-[38%_62%] gap-2 items-start text-[14px]">
                                    <span className="text-gray-500 font-light">{item.label}</span>
                                    <span className="font-medium text-[#222222] break-words">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Panel 2: Attached Documents */}
                    <div className="w-full bg-white border-b border-gray-200 px-4 py-5 mt-[6px]">
                        <h2 className="text-[18px] font-bold text-[#222222] mb-4">Attached Documents</h2>
                        <div className="space-y-3">
                            {attachments.map((doc, index) => (
                                <div key={`mob-doc-${index}`} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 py-1 rounded-lg transition-colors">
                                    <img src={doc.path} width={16} height={16} alt="attachment" className="w-4 h-4 object-contain opacity-60" />
                                    <span className="text-[14px] text-[#3A98BB] font-medium">{doc.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Panel 3: Client Profile */}
                    <div className="w-full bg-white border-b border-gray-200 px-4 py-5 mt-[6px]">
                        <h3 className="text-[15px] font-semibold text-[#111111] mb-3 border-b border-gray-100 pb-3">Client&apos;s Profile</h3>
                        <div className="flex items-center justify-between py-1">
                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0">
                                    <img src={clientProfile.avatar} alt={clientProfile.name} className="object-cover w-full h-full" />
                                </div>
                                <div>
                                    <p className="text-[15px] font-semibold text-[#3A98BB] leading-tight">{clientProfile.name}</p>
                                    <p className="text-[13px] text-gray-500 mt-0.5">{clientProfile.role}</p>
                                </div>
                            </div>
                            <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
                        </div>
                    </div>
                </div>

                {/* ── Mobile Fixed Bottom Action Bar ── */}
                <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 px-4 py-4 z-50 md:hidden drop-shadow-xl">
                    <div className="flex flex-col gap-3 w-full">
                        <div className="flex flex-row items-center justify-center gap-3 w-full">
                            <ChatClientModal clientName={clientProfile.name} trigger={
                                <Button
                                    variant="bordered"
                                    className="flex-1 bg-transparent h-[44px] border border-[#035A7A] text-[#222222] font-semibold rounded-full shadow-sm text-[15px]"
                                    radius="full"
                                >
                                    Chat Client
                                </Button>
                            } />
                            <SubmitWorkModal trigger={
                                <Button
                                    className="flex-1 bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] h-[44px] text-[#035A7A] font-semibold rounded-full border-0 shadow-sm text-[15px]"
                                    radius="full"
                                >
                                    Submit Project
                                </Button>
                            } />
                        </div>
                        {isDisputed ? (
                            <Button
                                className="w-full h-[44px] rounded-full bg-[#FAFAFA] border border-gray-100 text-gray-500 font-semibold text-[15px] shadow-sm flex items-center justify-center gap-2 hover:bg-gray-50"
                                radius="full"
                                onPress={onWithdrawOpen}
                            >
                                Withdraw Dispute
                            </Button>
                        ) : (
                            <Button
                                className="w-full h-[44px] rounded-full bg-[#FAFAFA] border border-gray-100 text-[#ef4444] font-semibold text-[15px] shadow-sm flex items-center justify-center gap-2"
                                radius="full"
                                onPress={() => router.push(`/artist-page/report-dispute?contractId=${id}`)}
                            >
                                <IoFlagSharp size={16} className="text-[#ef4444]" /> Report Dispute
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Withdraw Dispute Modal */}
            <Modal
                isOpen={isWithdrawOpen}
                onOpenChange={onWithdrawOpenChange}
                classNames={{
                    base: 'bg-white w-[90vw] max-w-sm',
                    backdrop: 'bg-black/50',
                    body: 'py-6 px-6',
                    footer: 'pt-2 pb-6 px-6 border-t-0',
                }}
                size='sm'
                backdrop='blur'
                placement='center'
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
                            <ModalFooter className='w-full flex justify-center items-center font-satoshi gap-3 -mt-2'>
                                <Button
                                    variant='bordered'
                                    onPress={onClose}
                                    className='flex-1 border border-gray-300 text-[#222222] font-medium rounded-full shadow-sm'
                                    radius='full'
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className='flex-1 bg-red-500 text-white font-medium rounded-full border-0 shadow-sm hover:!bg-red-600'
                                    radius='full'
                                    onPress={() => {
                                        withdrawDispute(id);
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

            {/* Extension Request View Modal */}
            <Modal
                isOpen={showViewExtensionModal}
                onOpenChange={setShowViewExtensionModal}
                classNames={{
                    wrapper: 'items-center justify-center',
                    base: 'bg-white w-[90vw] max-w-2xl p-0 border-0 rounded-2xl m-0 sm:m-0',
                    backdrop: 'bg-black/50',
                    closeButton: 'top-4 right-4 text-gray-500 hover:text-gray-700 z-10',
                }}
                size="xl"
                backdrop="blur"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            {/* Header Strip */}
                            <div className="bg-[#FFF9E6] px-6 py-5 flex items-center gap-3 relative rounded-t-2xl">
                                <div className="flex items-center justify-center w-11 h-11 bg-[#E5A443] rounded-full shrink-0 shadow-sm">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M14 2V8H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M16 13H8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M16 17H8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M10 9H8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <h2 className="text-xl font-bold text-[#D97706] font-satoshi tracking-wide">Extension Request</h2>
                            </div>

                            <ModalBody className="px-6 py-6 font-satoshi mt-1">
                                <p className="text-[#222222] text-[16px] mb-6">
                                    Client has requested extension of project deadline.
                                </p>

                                <div className="flex flex-col gap-6 text-[15px]">
                                    <div className="grid grid-cols-[210px_1fr] items-center gap-2 md:gap-4">
                                        <span className="font-bold text-[#222222]">New Deadline :</span>
                                        <span className="text-[#333333]">24th April, 2026</span>
                                    </div>

                                    <div className="grid grid-cols-[210px_1fr] items-start gap-2 md:gap-4">
                                        <span className="font-bold text-[#222222]">Reason :</span>
                                        <span className="text-[#333333]">Additional 5 sketches</span>
                                    </div>

                                    <div className="grid grid-cols-[210px_1fr] items-center gap-2 md:gap-4">
                                        <span className="font-bold text-[#222222]">Additional Payment Offer :</span>
                                        <div className="flex items-center flex-wrap gap-2">
                                            <span className="text-[#333333]">+N20,000</span>
                                            <span className="text-[#035A7A] text-[13px] font-medium">( 10% commission applies)</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4 mt-12 mb-2">
                                    <Button
                                        className="flex-1 bg-white border border-[#3A98BB] text-[#111111] font-bold tracking-wide rounded-full shadow-sm h-[48px] text-[15px]"
                                        onPress={() => onClose()}
                                    >
                                        Decline
                                    </Button>
                                    <Button
                                        className="flex-1 bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] text-[#035A7A] tracking-wide font-bold rounded-full border-0 shadow-sm h-[48px] text-[15px]"
                                        onPress={() => onClose()}
                                    >
                                        Accept Request
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
