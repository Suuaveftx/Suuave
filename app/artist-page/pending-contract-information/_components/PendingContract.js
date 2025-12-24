"use client";
import React from "react";
import { Card, CardBody } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import AcceptModal from "../../../../components/AcceptModal";
import DeclineModal from "../../../../components/DeclineModal";

const contractDetails = {
    jobTitle: "Modern Fashion Attire Illustration",
    contractNumber: "24t64754",
    contractType: "Hire",
    role: "Fashion Artist",
    budget: "N200,000",
    duration: "Within A Month",
};

const attachments = [
    { name: "Doc1534re", path: "/dev-images/Attach2.png" },
    { name: "Doc1534re", path: "/dev-images/Attach2.png" },
];

const clientProfile = {
    name: "Tolu",
    handle: "@tolu",
    role: "Fashion Designer",
    location: "Lagos, Nigeria",
    avatar: "/dev-images/Clients.png", // Placeholder, need to verify if this exists or use a generic one
    rating: 5,
    reviewCount: 0,
    stats: {
        jobsPosted: 1,
        hire: 0,
        paymentMade: 0,
    },
};

export default function PendingContract() {
    return (
        <div className="w-full max-w-[1400px] mx-auto p-4 md:p-6 lg:p-8 font-proximanova text-[#222222]">
            {/* Mobile Header */}
            <div className="flex items-center gap-2 mb-6 md:hidden">
                <Link href="#" className="p-1">
                    <ChevronLeft size={24} color="#222222" />
                </Link>
                <h1 className="text-lg font-bold">Contracts Information</h1>
            </div>

            {/* Desktop Page Title */}
            <h1 className="hidden md:block text-2xl md:text-3xl font-bold mb-6">Contract Information</h1>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Column */}
                <div className="flex-1 space-y-6">
                    {/* Contract Details Card */}
                    <Card className="w-full p-4 md:p-6 shadow-none md:shadow-sm border-none md:border border-gray-100 rounded-2xl bg-transparent md:bg-white">
                        <div className="hidden md:flex justify-between items-start mb-6">
                            <h2 className="text-xl font-bold">Contract Details</h2>
                            <span className="px-3 py-1 bg-transparent border border-gray-200 rounded-full text-xs text-gray-500 font-medium">
                                Pending
                            </span>
                        </div>

                        <div className="space-y-4">
                            {/* Mobile-only fields order and styling */}
                            <div className="flex justify-between items-start md:hidden mb-1">
                                <span className="text-gray-500 text-sm">Job Title</span>
                                <span className="font-medium text-sm text-right max-w-[60%]">{contractDetails.jobTitle}</span>
                            </div>
                            <div className="flex justify-between items-center md:hidden mb-1">
                                <span className="text-gray-500 text-sm">Status</span>
                                <span className="font-medium text-sm text-gray-500">Pending</span>
                            </div>

                            {/* Shared fields with responsive layout */}
                            <div className="flex md:grid grid-cols-1 md:grid-cols-[200px_1fr] justify-between gap-2 md:gap-4 items-center md:items-start mb-1 md:mb-0">
                                <span className="text-gray-500 text-sm">Contract Number <span className="hidden md:inline">-</span></span>
                                <span className="font-medium text-sm">{contractDetails.contractNumber}</span>
                            </div>
                            <div className="flex md:grid grid-cols-1 md:grid-cols-[200px_1fr] justify-between gap-2 md:gap-4 items-center md:items-start mb-1 md:mb-0">
                                <span className="text-gray-500 text-sm">Contract Type <span className="hidden md:inline">-</span></span>
                                <span className="font-medium text-sm">{contractDetails.contractType}</span>
                            </div>
                            <div className="flex md:grid grid-cols-1 md:grid-cols-[200px_1fr] justify-between gap-2 md:gap-4 items-center md:items-start mb-1 md:mb-0">
                                <span className="text-gray-500 text-sm">Role <span className="hidden md:inline">-</span></span>
                                <span className="font-medium text-sm">{contractDetails.role}</span>
                            </div>
                            <div className="flex md:grid grid-cols-1 md:grid-cols-[200px_1fr] justify-between gap-2 md:gap-4 items-center md:items-start mb-1 md:mb-0">
                                <span className="text-gray-500 text-sm">Budget <span className="hidden md:inline">-</span></span>
                                <span className="font-medium text-sm">{contractDetails.budget}</span>
                            </div>
                            <div className="flex md:grid grid-cols-1 md:grid-cols-[200px_1fr] justify-between gap-2 md:gap-4 items-center md:items-start">
                                <span className="text-gray-500 text-sm">Contract Duration <span className="hidden md:inline">-</span></span>
                                <span className="font-medium text-sm">{contractDetails.duration}</span>
                            </div>

                            {/* Desktop only Job Title */}
                            <div className="hidden md:grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2 md:gap-4">
                                <span className="text-gray-500 text-sm">Job Title -</span>
                                <span className="font-medium text-sm">{contractDetails.jobTitle}</span>
                            </div>
                        </div>
                    </Card>

                    {/* Attached Documents Card */}
                    <Card className="w-full p-4 md:p-6 shadow-none md:shadow-sm border-none md:border border-gray-100 rounded-2xl bg-transparent md:bg-white">
                        <h2 className="text-base md:text-xl font-bold mb-4 md:mb-6">Attached Documents</h2>
                        <div className="space-y-3">
                            {attachments.map((doc, index) => (
                                <div key={index} className="flex items-center gap-2 text-[#3A98BB]">
                                    {/* Assuming image icon for attachment */}
                                    <Image src={doc.path} width={20} height={20} alt="attachment" className="w-5 h-5 object-contain" />
                                    <span className="text-sm cursor-pointer hover:underline">{doc.name}</span>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Right Column (Sidebar) */}
                <div className="w-full lg:w-[350px] space-y-6">
                    {/* Action Buttons Card - Desktop Only */}
                    <Card className="w-full p-6 shadow-sm border border-gray-100 rounded-2xl hidden md:block">
                        <div className="flex flex-col gap-4 items-center">
                            <div className="[&>button]:w-48 [&>button]:h-12 [&>button]:text-base [&>button]:font-medium">
                                <AcceptModal />
                            </div>
                            <div className="[&>button]:w-48 [&>button]:h-12 [&>button]:rounded-full [&>button]:border [&>button]:border-[#3A98BB] [&>button]:bg-transparent [&>button]:text-[#222222] [&>button]:font-medium">
                                <DeclineModal />
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

                            {/* Mobile Action Buttons */}
                            <div className="flex gap-2 w-full justify-center md:hidden mb-4">
                                <div className="flex-1 [&>button]:w-full [&>button]:h-10 [&>button]:text-sm [&>button]:min-w-0 [&>button]:px-2">
                                    <DeclineModal />
                                </div>
                                <div className="flex-1 [&>button]:w-full [&>button]:h-10 [&>button]:text-sm [&>button]:min-w-0 [&>button]:px-2">
                                    <AcceptModal />
                                </div>
                            </div>

                            <div className="mb-1">
                                <span className="font-bold text-[#3A98BB]">{clientProfile.name}</span>
                                <span className="text-gray-500 ml-1">{clientProfile.handle}</span>
                            </div>

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
        </div>
    );
}
