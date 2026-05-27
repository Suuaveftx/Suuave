'use client';
import React, { useState } from 'react';
import { Card, CardBody, RadioGroup, Radio, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@heroui/react';

const AccountSettings = () => {
    const [accountType, setAccountType] = useState('fashion-artist');
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <div className='w-full flex flex-col gap-6'>
            <h2 className='font-bold text-2xl text-[#222222]'>Account</h2>

            {/* Contact Details */}
            <Card className='w-full shadow-none border border-[#E9E9E9] rounded-2xl'>
                <CardBody className='p-6 flex flex-col gap-4'>
                    <h3 className='font-bold text-base text-[#222222]'>Contact Details</h3>

                    <div className='flex flex-col gap-3'>
                        <div className='flex items-center gap-2'>
                            <span className='text-sm text-[#767676] w-16'>Name -</span>
                            <span className='text-sm font-semibold text-[#222222]'>Chinedu Ozulu</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <span className='text-sm text-[#767676] w-16'>Email -</span>
                            <span className='text-sm font-semibold text-[#222222]'>czu****cj@gmail.com</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <span className='text-sm text-[#767676] w-16'>Phone -</span>
                            <span className='text-sm font-semibold text-[#222222]'>+234-9020***305</span>
                        </div>
                    </div>

                    {/* Account Type */}
                    <div className='mt-4'>
                        <h3 className='font-bold text-base text-[#222222] mb-3'>Account Type</h3>
                        <RadioGroup
                            value={accountType}
                            onValueChange={setAccountType}
                            classNames={{
                                wrapper: 'flex flex-col gap-2',
                            }}
                        >
                            <Radio
                                value='fashion-artist'
                                classNames={{
                                    label: 'text-sm text-[#3A98BB] font-medium',
                                    wrapper: 'border-[#3A98BB]',
                                    control: 'bg-[#3A98BB]',
                                }}
                            >
                                Artist
                            </Radio>
                            <Radio
                                value='brand'
                                classNames={{
                                    label: 'text-sm text-[#767676] font-medium',
                                }}
                            >
                                Brand
                            </Radio>
                        </RadioGroup>
                    </div>
                </CardBody>
            </Card>

            {/* Delete Account */}
            <Card
                isPressable
                onPress={onOpen}
                className='w-full shadow-none border border-[#E9E9E9] rounded-2xl cursor-pointer hover:bg-red-50 transition-colors'
            >
                <CardBody className='p-5'>
                    <span className='text-[#EF4444] font-medium text-sm'>Delete Account</span>
                </CardBody>
            </Card>

            {/* Delete Confirmation Modal */}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='center'>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className='text-[#222222] font-bold'>Delete Account</ModalHeader>
                            <ModalBody>
                                <p className='text-sm text-[#767676]'>
                                    Are you sure you want to delete your account? This action is
                                    <span className='text-[#EF4444] font-semibold'> permanent </span>
                                    and cannot be undone.
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button variant='flat' onPress={onClose} className='text-[#767676]'>
                                    Cancel
                                </Button>
                                <Button color='danger' onPress={onClose}>
                                    Delete
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default AccountSettings;
