'use client';

import React, { use } from 'react';
import {
    Card,
    CardBody,
    Avatar,
    Button,
} from '@heroui/react';
import { FaLocationDot } from 'react-icons/fa6';
import { HiArrowLeft } from 'react-icons/hi';
import { useRouter } from 'next/navigation';
import PageContainer from '@/components/layout/PageContainer';
import Link from 'next/link';

const ProposalsList = ({ params }) => {
    const { id } = use(params);
    const router = useRouter();

    // Mock data for proposals
    const proposals = [
        {
            id: 'prop-1',
            name: 'Tega Isama',
            role: 'Artist',
            location: 'Lagos, Nigeria',
            avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
            proposal:
                'Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ..',
            sent_time: '5 Hours ago',
        },
        {
            id: 'prop-2',
            name: 'Toga Isama',
            role: 'Artist',
            location: 'Lagos, Nigeria',
            avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702e',
            proposal:
                'Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ..',
            sent_time: '5 Hours ago',
        },
        {
            id: 'prop-3',
            name: 'Tega Isama',
            role: 'Illustrator',
            location: 'Lagos, Nigeria',
            avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702f',
            proposal:
                'Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ..',
            sent_time: '5 Hours ago',
        },
    ];

    return (
        <PageContainer className="!px-0 sm:!px-4 md:!px-6 lg:!px-8">
            <div className="min-h-screen w-full pb-24 lg:pb-0 px-4 lg:mx-auto lg:px-0 pt-4 lg:pt-8 flex flex-col gap-6">

                {/* Header */}
                <div className="flex flex-col">
                    <Button
                        isIconOnly
                        variant="light"
                        onPress={() => router.back()}
                        className="min-w-8 w-8 h-8 -ml-2 text-[#222222]"
                    >
                        <HiArrowLeft size={24} />
                    </Button>
                    <h1 className="text-3xl font-bold mt-4 text-[#222222]">Proposals</h1>
                </div>

                {/* Divider */}
                <div className="h-px bg-gray-100 w-full" />

                {/* Related Project Card */}
                <Card shadow="none" className="border rounded-xl bg-white shrink-0">
                    <CardBody className="px-6 py-5 flex flex-row justify-between items-center text-sm md:text-base">
                        <p className="font-semibold text-[#222222]">
                            Related Project -{' '}
                            <span className="text-[#767676] font-normal">
                                Modern Fashion Attire Illustration Classic .....
                            </span>
                        </p>
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
                            href={`/fashion-designers/my-projects/proposals/${id}/${item.id}`}
                        >
                            <CardBody className="p-6">
                                <div className="flex gap-4 text-left">
                                    <Avatar
                                        src={item.avatar}
                                        className="w-14 h-14 shrink-0 rounded-xl"
                                    />
                                    <div className="flex flex-col gap-1 justify-center">
                                        <h4 className="text-[#3A98BB] font-bold text-lg leading-tight">
                                            {item.name}
                                        </h4>
                                        <p className="text-[#767676] text-sm font-medium">{item.role}</p>
                                        <div className="flex items-center gap-1.5 text-[#767676]">
                                            <FaLocationDot size={12} />
                                            <span className="text-sm">{item.location}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 text-left">
                                    <p className="font-bold text-[#767676] mb-2 uppercase text-xs tracking-wider">
                                        Proposal
                                    </p>
                                    <p className="text-[#333333] text-md leading-relaxed">
                                        {item.proposal}
                                        <span className="text-[#3A98BB] ml-1 font-medium italic">
                                            see more
                                        </span>
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
        </PageContainer>
    );
};

export default ProposalsList;
