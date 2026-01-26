'use client';

import React, { use } from 'react';
import {
    Card,
    CardBody,
    User,
    Chip,
} from '@heroui/react';
import { FaLocationDot } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import ContractHeader from '../../../../artist-page/my-contracts/components/contract-header';

const ProposalsList = ({ params }) => {
    const { id } = use(params);
    const router = useRouter();

    // Mock data adapted from ProporsalModal.js
    const proposals = [
        {
            id: "prop-1",
            name: "Tega Isama",
            role: "Illustrator",
            location: "Lagos, Nigeria",
            avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
            proposal: "Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ..",
            sent_time: "5 Hours ago",
        },
        {
            id: "prop-2",
            name: "Tega Isama",
            role: "Illustrator",
            location: "Lagos, Nigeria",
            avatar: "https://i.pravatar.cc/150?u=a04258114e29026702e",
            proposal: "Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ..",
            sent_time: "5 Hours ago",
        },
    ];

    const goToProposalDetails = (proposalId) => {
        router.push(`/fashion-designers/my-projects/proposals/${id}/${proposalId}`);
    };

    return (
        <div className='min-h-screen max-w-[86.5rem] mx-auto px-4 lg:px-10 pb-20'>
            <ContractHeader title='Proposals' />

            <div className='mt-8'>
                <Card className='border h-auto max-w-[61.25rem]' shadow='none'>
                    <CardBody className='flex flex-row justify-between items-center py-4 px-6'>
                        <p className='font-semibold text-lg'>
                            Related Job Post - <span className='font-normal italic'>Modern Fashion Attire Illustration</span>
                        </p>
                        <div className='flex gap-4'>
                            <div className='flex items-center gap-1'>
                                <span className='font-semibold'>3</span>
                                <span className='text-gray-500'>Messages</span>
                            </div>

                            <div className='flex items-center gap-1'>
                                <span className='font-semibold'>0</span>
                                <span className='text-gray-500'>Hired</span>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>

            <div className='flex flex-col gap-6 mt-10 max-w-[61.25rem]'>
                {proposals.map((item) => (
                    <Card
                        shadow='none'
                        key={item.id}
                        className='border hover:bg-gray-50 transition-colors'
                        isPressable
                        onPress={() => goToProposalDetails(item.id)}
                    >
                        <CardBody className='items-start p-6'>
                            <User
                                avatarProps={{
                                    src: item.avatar,
                                    className: "w-16 h-16 text-large",
                                }}
                                description={
                                    <div className='text-gray-500 flex gap-1 items-center mt-1'>
                                        <FaLocationDot className='size-3.5' />
                                        <p>{item.location}</p>
                                    </div>
                                }
                                name={
                                    <div className='flex flex-col'>
                                        <span className='text-[#035A7A] font-bold text-lg'>
                                            {item.name}
                                        </span>
                                        <span className='text-gray-500 text-sm'>{item.role}</span>
                                    </div>
                                }
                            />
                            <p className='font-bold text-gray-500 mt-6 text-lg'>
                                Proposal
                            </p>
                            <p className='text-gray-700 mt-2 leading-relaxed'>
                                {item.proposal}
                            </p>
                            <p className='mt-6 text-gray-400 text-sm font-light'>
                                Sent: {item.sent_time}
                            </p>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ProposalsList;
