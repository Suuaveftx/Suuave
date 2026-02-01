"use client";
import React from "react";
import { Card, CardBody, Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import CustomButton from "../../../../components/CustomButton";
import { ChevronLeft } from "lucide-react";
import { IoFlagSharp } from "react-icons/io5";
import { useSearchParams } from "next/navigation";
import ChatClientModal from "../../../../components/ChatClientModal";
import SubmitProjectModal from "../../../../components/SubmitProjectModal";

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
    const timeStatus = searchParams.get("timeStatus") || "End in : 2 days";
    const color = searchParams.get("color") || "#3A98BB";

    return (
        <div className="w-full max-w-[1400px] mx-auto p-4 md:p-6 lg:p-8 font-proximanova text-[#222222]">
            {/* Mobile Header */}
            <div className="flex items-center gap-2 mb-6 md:hidden">
                <Link href="/artist-page/my-contracts-old" className="p-1">
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
                            <div className="flex gap-2 items-center">
                                <span className="border border-[#D1D1D1] text-[#279711] px-3 py-1 rounded-full text-xs font-medium">
                                    Ongoing
                                </span>
                                <span className="px-3 py-1 rounded text-xs font-bold" style={{ backgroundColor: color === '#3A98BB' ? `${color}26` : 'transparent', color: color }}>
                                    {timeStatus}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {/* Mobile-only fields order and styling */}
                            <div className="flex justify-between items-start md:hidden mb-1">
                                <span className="text-gray-500 text-sm">Job Title</span>
                                <span className="font-medium text-sm text-right max-w-[60%]">{contractDetails.jobTitle}</span>
                            </div>
                            <div className="flex justify-between items-center md:hidden mb-1">
                                <span className="text-gray-500 text-sm">Status</span>
                                <div className="flex gap-2 items-center">
                                    <span className="text-[#2563EB] bg-[#E0F2FE] px-2 py-1 rounded text-xs font-medium">Ongoing</span>
                                    <span
                                        className="px-2 py-0.5 rounded text-[10px] font-bold"
                                        style={{ backgroundColor: color === '#3A98BB' ? `${color}26` : 'transparent', color: color }}
                                    >
                                        {timeStatus}
                                    </span>
                                </div>
                            </div>

                            {/* Shared fields with responsive layout */}
                            <div className="flex md:grid grid-cols-1 md:grid-cols-[200px_1fr] justify-between gap-2 md:gap-4 items-center md:items-start mb-1 md:mb-0">
                                <span className="text-gray-500 text-sm">Contract Number <span className="hidden md:inline">-</span></span>
                                <span className="font-medium text-sm">{id}</span>
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
                                <span className="text-gray-500 text-sm"><span className="md:hidden">Payment</span><span className="hidden md:inline">Budget -</span></span>
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
                                    <Image src={doc.path} width={20} height={20} alt="attachment" className="w-5 h-5 object-contain" />
                                    <span className="text-sm cursor-pointer hover:underline">{doc.name}</span>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Mobile Action Buttons - Below Attached Documents */}
                    <div className="w-full flex flex-col items-center space-y-3 md:hidden bg-[#FAFAFA] p-6 rounded-2xl shadow-md gap-6">
                        <div className="w-full max-w-xs [&>button]:w-full [&>button]:h-12 [&>button]:text-base [&>button]:font-medium [&>button]:bg-[radial-gradient(circle,#FFFFFF,#CCE7F2)] [&>button]:text-[#035A7A] [&>button]:rounded-full">
                            <SubmitProjectModal />
                        </div>
                        <div className="w-full max-w-xs [&>button]:w-full [&>button]:h-12 [&>button]:rounded-full [&>button]:border [&>button]:border-[#3A98BB] [&>button]:bg-transparent [&>button]:text-[#222222] [&>button]:font-medium">
                            <ChatClientModal clientName={clientProfile.name} />
                        </div>
                        <div className="w-full max-w-xs flex items-center justify-center gap-2 mt-2 border border-[rgba(229,229,229,0.61)] rounded-full px-6 py-2">
                            <IoFlagSharp size={14} color="#222222" />
                            <Link href="#" className="text-[#222222] text-sm font-medium">
                                Report
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Right Column (Sidebar) */}
                <div className="w-full lg:w-[350px] space-y-6">
                    {/* Action Buttons Card - Desktop Only */}
                    <Card className="w-full p-6 shadow-sm border border-gray-100 rounded-2xl hidden md:block">
                        <div className="flex flex-col gap-4 items-center">
                            <div className="[&>button]:w-48 [&>button]:h-12 [&>button]:text-base [&>button]:font-medium [&>button]:bg-[radial-gradient(circle,#FFFFFF,#CCE7F2)] [&>button]:text-[#035A7A] [&>button]:rounded-full">
                                <SubmitProjectModal />
                            </div>
                            <div className="[&>button]:w-48 [&>button]:h-12 [&>button]:rounded-full [&>button]:border [&>button]:border-[#3A98BB] [&>button]:bg-transparent [&>button]:text-[#222222] [&>button]:font-medium">
                                <ChatClientModal clientName={clientProfile.name} />
                            </div>
                            <div className="mt-2">
                                <Link href="#" className="text-[#222222] text-sm">
                                    Report
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
        </div>
    );
}
