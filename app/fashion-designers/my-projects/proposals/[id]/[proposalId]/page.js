"use client";

import React, { use, useState } from "react";
import { Avatar, Button, Card, CardBody, useDisclosure, Input } from "@heroui/react";
import { TiLocation } from "react-icons/ti";
import { FaStar } from "react-icons/fa";
import { PaperClipIcon, InformationCircleIcon, CalendarIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ContractHeader from "../../../../contracts/components/contract-header";
import HireModal from "../../../../_components/HireModal";
import MessageModal from "../../../../contracts/components/MessageModal";
import PageContainer from '@/components/layout/PageContainer';

const ProposalDetailsPage = ({ params }) => {
    const { id, proposalId } = use(params);
    const router = useRouter();
    const { isOpen: isHireOpen, onOpen: onHireOpen, onOpenChange: onHireOpenChange } = useDisclosure();
    const { isOpen: isMessageOpen, onOpen: onMessageOpen, onOpenChange: onMessageOpenChange } = useDisclosure();

    // Mock data adapted from my-contracts-old/proposals/[id]/page.js
    const proposalData = {
        id: proposalId,
        sent_time: "5 Hours ago",
        quotation: "₦200,000",
        duration: "7 Days",
        skillSet: "Adobe Illustrator",
        content: "Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque...",
        attachments: [
            { name: "Docloremlir", count: 4 },
            { name: "loremlir", count: 1 }
        ],
        artist: {
            name: "Tega Isama",
            username: "ocean",
            role: "Fashion Illustrator",
            location: "Lagos, Nigeria",
            rating: 4,
            reviews: 5,
            avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d"
        }
    };

    return (
        <>
            <PageContainer className="font-satoshi pt-4 md:pt-7 pb-32 lg:pb-20 bg-[#F5F8FA] lg:bg-transparent !px-0 sm:!px-4 md:!px-6 lg:!px-8">
                {/* Mobile Header */}
                <div className="lg:hidden flex items-center gap-2 mb-4 mt-4 px-2">
                    <Button
                        isIconOnly
                        variant="light"
                        onPress={() => router.back()}
                        className="min-w-fit flex items-center justify-center p-1 rounded-full w-10 h-10 bg-transparent text-gray-500"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </Button>
                    <h1 className="text-[20px] font-bold text-[#333333]">Proposal Details</h1>
                </div>


                {/* --- RESPONSIVE LAYOUT --- */}
                <div className="flex flex-col lg:grid lg:grid-cols-[1.8fr_0.7fr] gap-4 lg:gap-8 mt-4 lg:mt-12 w-full px-4 lg:px-0">
                    <div className="flex flex-col gap-4 lg:gap-6">
                        {/* Main Proposal Card */}
                        <Card shadow="none" className="border rounded-2xl bg-white">
                            <CardBody className="gap-6 p-8">
                                <p className="text-[13px] text-[#767676]">Sent: <span className="text-[#a0a0a0]">{proposalData.sent_time}</span></p>
                                <h2 className="text-[16px] lg:text-2xl font-bold text-[#111111]">Proposal</h2>
                                <p className="text-[#555555] leading-relaxed text-[14px] lg:text-md">
                                    {proposalData.content}
                                </p>

                                <div className="hidden">
                                </div>
                            </CardBody>
                        </Card>

                        {/* Details Card (Payment, Duration, Skill Set) */}
                        <Card shadow="none" className="border rounded-2xl bg-white">
                            <CardBody className="p-5 lg:p-8">
                                <div className="flex flex-col gap-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[#767676] text-[14px]">Budget -</span>
                                        <span className="font-medium text-[#111111] text-[14px]">{proposalData.quotation}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[#767676] text-[14px]">Timeframe -</span>
                                        <span className="font-medium text-[#111111] text-[14px]">{proposalData.duration}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[#767676] text-[14px]">Skill Set -</span>
                                        <span className="font-bold text-[#111111] text-[14px]">{proposalData.skillSet}</span>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>

                        {/* Attached File Card */}
                        <Card shadow="none" className="border rounded-2xl bg-white">
                            <CardBody className="p-8">
                                <h3 className="font-semibold text-[15px] lg:text-xl mb-3 text-[#111111]">Attached Files</h3>
                                <div className="flex flex-col gap-3">
                                    {proposalData.attachments.map((doc, idx) => (
                                        <p key={idx} className="text-[#3A98BB] font-medium cursor-pointer hover:underline transition-colors text-sm">
                                            {doc.name}
                                        </p>
                                    ))}
                                </div>
                            </CardBody>
                        </Card>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="hidden lg:block">
                            {/* Hire/Message Actions */}
                            <Card shadow="none" className="border rounded-2xl drop-shadow-sm bg-white">
                                <CardBody className="flex gap-5 flex-col p-8">
                                    <Button
                                        onPress={onHireOpen}
                                        className="w-full bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] text-[#035A7A] h-14 rounded-full font-bold text-lg shadow-sm"
                                    >
                                        Hire
                                    </Button>
                                    <Button
                                        radius="full"
                                        variant="bordered"
                                        className="w-full text-[#222222] h-14 bg-white border-2 border-[#CCE7F2] font-bold text-lg"
                                        onPress={onMessageOpen}
                                    >
                                        Message
                                    </Button>
                                </CardBody>
                            </Card>
                        </div>

                        {/* Artist Card */}
                        <Card
                            shadow="none"
                            className="border rounded-2xl hover:shadow-md transition-all duration-300 bg-white"
                            isPressable
                            onPress={() => router.push("/artist-page/profile-vistor-view")}
                        >
                            <CardBody className="flex flex-col items-center justify-center gap-3 p-8 py-12">
                                <Avatar
                                    src={proposalData.artist.avatar}
                                    className="w-24 h-24 text-large ring-2 ring-[#CCE7F2] border-4 border-white"
                                />
                                <div className="flex text-center flex-col items-center justify-center gap-1">
                                    <p className="text-xl font-bold">
                                        <Link href="/artist-page/profile-vistor-view" className="text-[#3A98BB] hover:underline">
                                            @{proposalData.artist.username}
                                        </Link>
                                    </p>
                                    <p className="text-[#767676] text-md">{proposalData.artist.role}</p>
                                </div>

                                <div className="flex text-center flex-col items-center justify-center gap-4 mt-0">
                                    <div className="flex gap-2 items-center text-gray-500">
                                        <TiLocation className="size-5" />
                                        <p className="text-sm">{proposalData.artist.location}</p>
                                    </div>

                                    <div className="flex flex-col items-center gap-2">
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm text-gray-400 flex items-center gap-1">Ratings
                                                <div className="flex items-center gap-0.5 ml-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <FaStar
                                                            key={i}
                                                            className={i < proposalData.artist.rating ? "text-yellow-400 size-3" : "text-gray-200 size-3"}
                                                        />
                                                    ))}
                                                </div>
                                            </span>
                                            <Link
                                                href="/artist-page/profile-vistor-view?tab=reviews"
                                                className="text-sm text-[#3A98BB] font-medium hover:underline flex items-center gap-1"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <u>({proposalData.artist.reviews} Reviews)</u>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>



                <HireModal
                    isOpen={isHireOpen}
                    onOpenChange={onHireOpenChange}
                    artistName={proposalData.artist.name}
                />
                <MessageModal
                    isOpen={isMessageOpen}
                    onOpenChange={onMessageOpenChange}
                    artistName={proposalData.artist.name}
                />
            </PageContainer>

            {/* Mobile Fixed Bottom Actions */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 px-6 py-5 bg-white border-t border-gray-200 z-50 flex items-center gap-4 drop-shadow-xl pb-6">
                <Button
                    radius="full"
                    variant="bordered"
                    onPress={onMessageOpen}
                    className="flex-1 text-[#222222] h-[48px] bg-white border-2 border-[#CCE7F2] font-bold text-[15px]"
                >
                    Message
                </Button>
                <Button
                    radius="full"
                    onPress={onHireOpen}
                    className="flex-1 bg-[radial-gradient(circle,#EAF9FF_19%,#CCE7F2_100%)] text-[#035A7A] h-[48px] font-bold text-[15px] shadow-sm border-0"
                >
                    Hire
                </Button>
            </div>
        </>
    );
};

export default ProposalDetailsPage;
