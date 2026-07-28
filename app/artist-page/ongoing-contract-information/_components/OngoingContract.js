"use client";
import React from "react";
import { Card, CardBody, Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import CustomButton from "../../../../components/CustomButton";
import { ChevronLeft } from "lucide-react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { IoFlagSharp } from "react-icons/io5";
import { useSearchParams, useRouter } from "next/navigation";
import ChatClientModal from "../../../../components/ChatClientModal";
import SubmitProjectModal from "../../../../components/SubmitProjectModal";

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

    return (
        <>
            <div className="w-full max-w-[1400px] mx-auto pt-0 p-4 md:pt-0 md:p-6 lg:p-8 pb-32 md:pb-8 font-proximanova text-[#222222]">
                {/* Header with Back Button */}
                <div className="flex items-center gap-2 mb-2 md:mb-6 mt-1">
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
                        {/* Contract Details Card */}
                        <Card className="w-full p-4 md:p-6 shadow-sm border border-gray-100 rounded-2xl bg-white">
                            <div className="hidden md:flex justify-between items-start mb-6">
                                <h2 className="text-xl font-bold">Contract Details </h2>
                                <div className="flex gap-2 items-center">
                                    <span className="border border-[#D1D1D1] text-[#279711] px-3 py-1 rounded-full text-xs font-medium">
                                        Ongoing
                                    </span>
                                    {isWaitingApproval ? (
                                        <span className="inline-flex items-center bg-[#EAF5FB] text-[#3A98BB] text-[11px] font-semibold px-2 rounded-full h-[22px]">
                                            Waiting Approval
                                        </span>
                                    ) : timeStatus && (
                                        <span className="text-xs font-bold" style={{ color: color }}>{timeStatus}</span>
                                    )}
                                </div>
                            </div>

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
                                    <span className="font-medium text-sm">12th May, 2026</span>
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
                        <Card className="w-full p-6 shadow-sm border border-gray-100 rounded-2xl hidden md:block">
                            <div className="flex flex-col gap-4 items-center">
                                <div className="[&>button]:w-48 [&>button]:h-12 [&>button]:text-base [&>button]:font-medium [&>button]:bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] [&>button]:text-[#035A7A] [&>button]:rounded-full">
                                    <SubmitProjectModal />
                                </div>
                                <div className="[&>button]:w-48 [&>button]:h-12 [&>button]:rounded-full [&>button]:border [&>button]:border-[#3A98BB] [&>button]:bg-transparent [&>button]:text-[#222222] [&>button]:font-medium">
                                    <ChatClientModal clientName={clientProfile.name} />
                                </div>
                                <div className="mt-2 text-[#ef4444] flex gap-2 items-center justify-center border border-[rgba(229,229,229,0.61)] rounded-full px-6 py-2 cursor-pointer w-48 font-medium text-sm">
                                    <IoFlagSharp size={14} color="#ef4444" />
                                    <Link href="#">
                                        Report Dispute
                                    </Link>
                                </div>
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
                <div className="flex flex-col md:hidden -mx-4 -mt-2 pb-32 w-screen">
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
                            <SubmitProjectModal trigger={
                                <Button
                                    className="flex-1 bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] h-[44px] text-[#035A7A] font-semibold rounded-full border-0 shadow-sm text-[15px]"
                                    radius="full"
                                >
                                    Submit Project
                                </Button>
                            } />
                        </div>
                        <Button
                            className="w-full h-[44px] rounded-full bg-[#FAFAFA] border border-gray-100 text-[#ef4444] font-semibold text-[15px] shadow-sm flex items-center justify-center gap-2"
                            radius="full"
                        >
                            <IoFlagSharp size={16} className="text-[#ef4444]" /> Report Dispute
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
