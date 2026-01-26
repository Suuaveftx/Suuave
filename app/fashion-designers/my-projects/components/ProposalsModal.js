'use client';

import React from 'react';
import {
    Modal,
    ModalContent,
    ModalBody,
    Card,
    CardBody,
    Avatar,
    Button,
} from "@heroui/react";
import { HiArrowLeft } from "react-icons/hi";
import { FaLocationDot } from "react-icons/fa6";
import Link from "next/link";

const ProposalsModal = ({ isOpen, onOpenChange, project }) => {


    // Mock data for proposals
    const proposals = [
        {
            id: "prop-1",
            name: "Tega Isama",
            role: "Artist",
            location: "Lagos, Nigeria",
            avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
            proposal: "Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ..",
            sent_time: "5 Hours ago",
        },
        {
            id: "prop-2",
            name: "Toga Isama",
            role: "Artist",
            location: "Lagos, Nigeria",
            avatar: "https://i.pravatar.cc/150?u=a04258114e29026702e",
            proposal: "Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ..",
            sent_time: "5 Hours ago",
        },
        {
            id: "prop-3",
            name: "Tega Isama",
            role: "Illustrator",
            location: "Lagos, Nigeria",
            avatar: "https://i.pravatar.cc/150?u=a04258114e29026702f",
            proposal: "Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ..",
            sent_time: "5 Hours ago",
        },
    ];

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            size="3xl"
            scrollBehavior="inside"
            hideCloseButton
            className="rounded-none sm:rounded-2xl max-h-[90vh]"
            motionProps={{
                variants: {
                    enter: {
                        y: 0,
                        opacity: 1,
                        transition: {
                            duration: 0.3,
                            ease: "easeOut",
                        },
                    },
                    exit: {
                        y: 20,
                        opacity: 0,
                        transition: {
                            duration: 0.2,
                            ease: "easeIn",
                        },
                    },
                }
            }}
        >
            <ModalContent className="bg-[#FDFDFD]">
                {(onClose) => (
                    <ModalBody className="p-0">
                        <div className="flex flex-col h-full font-satoshi">
                            {/* Header Area */}
                            <div className="p-8 pb-4">
                                <Button
                                    isIconOnly
                                    variant="light"
                                    onPress={onClose}
                                    className="min-w-unit-8 w-8 h-8 -ml-2 text-[#222222]"
                                >
                                    <HiArrowLeft size={24} />
                                </Button>
                                <h2 className="text-3xl font-bold mt-4 text-[#222222]">Proposals</h2>
                            </div>

                            {/* Divider Line */}
                            <div className="h-px bg-gray-100 w-full" />

                            <div className="p-8 flex flex-col gap-6 overflow-y-auto">
                                {/* Related Project Card */}
                                <Card shadow="none" className="border rounded-xl bg-white">
                                    <CardBody className="px-6 py-5 flex flex-row justify-between items-center text-sm md:text-base">
                                        <p className="font-semibold text-[#222222]">
                                            Related Project - <span className="text-[#767676] font-normal">{project?.title || "Modern Fashion Attire Illustration"}</span>
                                        </p>
                                        <div className="flex gap-4">
                                            <Link href="/artist-page/messages" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
                                                <span className="font-bold text-[#222222]">3</span>
                                                <span className="text-[#3A98BB]">Messages</span>
                                            </Link>
                                            <div className="flex items-center gap-1.5">
                                                <span className="font-bold text-[#222222]">0</span>
                                                <span className="text-[#767676]">Hired</span>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>

                                {/* Proposals List */}
                                <div className="flex flex-col gap-4">
                                    {proposals.map((item, idx) => (
                                        <Card
                                            key={idx}
                                            shadow="none"
                                            className="border rounded-2xl bg-white hover:border-[#CCE7F2] transition-colors"
                                            as={Link}
                                            href={`/fashion-designers/my-projects/proposals/${project?.id || 1}/${item.id}`}
                                        >
                                            <CardBody className="p-6">
                                                <div className="flex gap-4 text-left">
                                                    <Avatar
                                                        src={item.avatar}
                                                        className="w-14 h-14 shrink-0 rounded-xl"
                                                    />
                                                    <div className="flex flex-col gap-1 justify-center">
                                                        <h4 className="text-[#3A98BB] font-bold text-lg leading-tight">{item.name}</h4>
                                                        <p className="text-[#767676] text-sm font-medium">{item.role}</p>
                                                        <div className="flex items-center gap-1.5 text-[#767676]">
                                                            <FaLocationDot size={12} />
                                                            <span className="text-sm">{item.location}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mt-6 text-left">
                                                    <p className="font-bold text-[#767676] mb-2 uppercase text-xs tracking-wider">Proposal</p>
                                                    <p className="text-[#333333] text-md leading-relaxed">
                                                        {item.proposal}
                                                        <span className="text-[#3A98BB] ml-1 font-medium italic">see more</span>
                                                    </p>
                                                </div>

                                                <div className="mt-6 flex items-center justify-between">
                                                    <p className="text-[#767676] text-xs font-medium">Sent: {item.sent_time}</p>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                )}
            </ModalContent>
        </Modal>
    );
};

export default ProposalsModal;
