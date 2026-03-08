"use client";

import React, { use, useState } from "react";
import { Avatar, Button, Card, CardBody, useDisclosure } from "@heroui/react";
import { TiLocation } from "react-icons/ti";
import { FaStar } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ContractHeader from "../../../../contracts/components/contract-header";
import HireModal from "../../../../_components/HireModal";
import MessageModal from "../../../../contracts/components/MessageModal";

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
        duration: "Within A Month",
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
        <div className="font-satoshi pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_0.7fr] gap-8 p-4 lg:p-10 max-w-[86.5rem] mx-auto">
                <div className="flex flex-col gap-6">
                    {/* Main Proposal Card */}
                    <Card shadow="none" className="border rounded-2xl bg-white">
                        <CardBody className="gap-6 p-8">
                            <p className="text-sm text-gray-400">Sent: {proposalData.sent_time}</p>
                            <h2 className="text-2xl font-bold text-[#222222]">Proposal</h2>
                            <p className="text-[#333333] leading-relaxed text-md">
                                {proposalData.content}
                            </p>

                            <div className="flex flex-col gap-3 mt-4">
                                {proposalData.attachments.map((doc, idx) => (
                                    <p key={idx} className="text-[#3A98BB] text-sm font-medium cursor-pointer hover:underline transition-colors">
                                        {doc.name}
                                    </p>
                                ))}
                            </div>
                        </CardBody>
                    </Card>

                    {/* Details Card (Payment, Duration, Skill Set) */}
                    <Card shadow="none" className="border rounded-2xl bg-white">
                        <CardBody className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="flex flex-col gap-2">
                                    <p className="text-[#767676] text-sm italic">Payment</p>
                                    <p className="font-bold text-lg">{proposalData.quotation}</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="text-[#767676] text-sm italic">Timeframe :</p>
                                    <p className="font-bold text-lg">5 days</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="text-[#767676] text-sm italic">Skill Set :</p>
                                    <p className="font-bold text-lg">{proposalData.skillSet}</p>
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    {/* Attached File Card */}
                    <Card shadow="none" className="border rounded-2xl bg-white">
                        <CardBody className="p-8">
                            <h3 className="font-bold text-xl mb-4">Attached File</h3>
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
        </div>
    );
};

export default ProposalDetailsPage;
