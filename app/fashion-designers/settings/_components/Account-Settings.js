'use client';
import React, { useState } from 'react';
import { Card, CardBody, RadioGroup, Radio, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, InputOtp } from '@heroui/react';

const AccountSettings = () => {
    const [accountType, setAccountType] = useState('brand');
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [deleteStep, setDeleteStep] = useState(1);
    const [otpValue, setOtpValue] = useState('');

    const handleOpenChange = (open) => {
        if (!open) {
            setDeleteStep(1);
            setOtpValue('');
        }
        onOpenChange(open);
    };

    return (
        <div className='w-full flex flex-col gap-6'>
            <h2 className='font-bold text-2xl text-[#222222] hidden lg:block'>Account</h2>

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
                                isDisabled
                                classNames={{
                                    label: 'text-sm text-[#767676] font-medium',
                                }}
                            >
                                Artist
                            </Radio>
                            <Radio
                                value='brand'
                                classNames={{
                                    label: 'text-sm text-[#3A98BB] font-medium',
                                    wrapper: 'border-[#3A98BB]',
                                    control: 'bg-[#3A98BB]',
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
                onPress={() => {
                    setDeleteStep(1);
                    setOtpValue('');
                    onOpen();
                }}
                className='w-full shadow-none border border-[#E9E9E9] rounded-2xl cursor-pointer hover:bg-red-50 transition-colors'
            >
                <CardBody className='p-5'>
                    <span className='text-[#EF4444] font-medium text-sm'>Delete Account</span>
                </CardBody>
            </Card>

            {/* Delete Modal — 2 Steps */}
            <Modal isOpen={isOpen} onOpenChange={handleOpenChange} placement='center'>
                <ModalContent>
                    {(onClose) => (
                        <>
                            {deleteStep === 1 ? (
                                /* Step 1 — Confirmation */
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
                                        <Button color='danger' onPress={() => setDeleteStep(2)}>
                                            Continue
                                        </Button>
                                    </ModalFooter>
                                </>
                            ) : (
                                /* Step 2 — OTP Verification */
                                <>
                                    <div className='w-full flex justify-center pt-[45px]'>
                                        <h2 className='text-2xl font-bold text-center'>
                                            Confirm It&apos;s You
                                        </h2>
                                    </div>

                                    <ModalBody className='pb-2'>
                                        <p className='text-sm text-[#767676] text-center'>
                                            Kindly enter the six (6) digit code sent to the email address{' '}
                                            <span className='font-semibold'>czu****cj@gmail.com</span> to delete your account.
                                        </p>

                                        {/* OTP Inputs */}
                                        <div className='flex justify-center gap-2 mt-[26px]'>
                                            <InputOtp
                                                variant='bordered'
                                                length={6}
                                                value={otpValue}
                                                onValueChange={setOtpValue}
                                            />
                                        </div>

                                        {/* Resend */}
                                        <p className='text-sm text-center text-gray-500 mt-6'>
                                            Didn&apos;t receive code?{' '}
                                            <button className='text-[#3A98BB] font-semibold hover:underline'>
                                                Resend
                                            </button>
                                        </p>
                                    </ModalBody>

                                    {/* Confirm Delete */}
                                    <div className='flex justify-center mb-[45px] mx-8 mt-4'>
                                        <Button
                                            onPress={onClose}
                                            className='bg-[#EF4444] text-white font-semibold rounded-full px-6 py-2 w-full'
                                        >
                                            Confirm Delete
                                        </Button>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default AccountSettings;
