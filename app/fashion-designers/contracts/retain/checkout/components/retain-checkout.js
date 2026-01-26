'use client';

import React, { useState } from 'react';
import {
    Card,
    CardBody,
    Button,
    Input,
    Select,
    SelectItem,
    RadioGroup,
    Radio,
    Divider,
    Alert,
    Image,
    Modal,
    ModalContent,
    ModalBody,
} from '@heroui/react';
import { CreditCard, Info, Shield, CheckCircle } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import FashionDesignerHeader from '../../../../_components/studio-page-components/FashionDesignerHeader';
import Footer from '../../../../../about-page/components/Footer';

export default function RetainCheckout() {
    const [selectedCountry, setSelectedCountry] = useState('Nigeria');
    const [paymentMethod, setPaymentMethod] = useState('credit');
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [duration, setDuration] = useState(1);
    const router = useRouter();
    const searchParams = useSearchParams();
    const returnUrl = searchParams.get('returnUrl');

    const baseFee = 5;
    const subtotal = baseFee * (parseInt(duration) || 0);

    const countries = [
        { value: 'Nigeria', label: 'Nigeria' },
        { value: 'USA', label: 'United States' },
        { value: 'UK', label: 'United Kingdom' },
        { value: 'Canada', label: 'Canada' },
    ];

    const handlePayment = () => {
        setIsSuccessModalOpen(true);
    };

    const handleCloseSuccess = () => {
        setIsSuccessModalOpen(false);
        router.push(returnUrl || '/fashion-designers/contracts');
    };

    return (
        <div className='mx-auto bg-[#FAFAFA] min-h-screen'>
            <FashionDesignerHeader />
            <div className='max-w-6xl mx-auto px-4 lg:px-6' style={{ paddingTop: '40px', paddingBottom: '80px' }}>
                <h1 className='text-[32px] font-black mb-10 text-black font-satoshi'>Checkout</h1>

                <div className='grid grid-cols-1 lg:grid-cols-[1fr_0.45fr] gap-8 mt-6'>
                    {/* Left Section - Forms */}
                    <div className='space-y-6 font-satoshi'>
                        {/* Billing Information */}
                        <Card className='shadow-none border border-gray-100 rounded-2xl'>
                            <CardBody className='p-8'>
                                <h2 className='text-lg font-bold mb-6'>Billing Information</h2>
                                <div className='space-y-6'>
                                    <div>
                                        <label className='block text-sm font-bold mb-2'>Full Name</label>
                                        <Input
                                            placeholder='Name on card'
                                            variant='bordered'
                                            className='w-full'
                                            classNames={{ inputWrapper: 'rounded-xl h-12' }}
                                        />
                                    </div>

                                    <div>
                                        <label className='block text-sm font-bold mb-2'>Country</label>
                                        <Select
                                            selectedKeys={[selectedCountry]}
                                            onSelectionChange={(keys) => setSelectedCountry(Array.from(keys)[0])}
                                            variant='bordered'
                                            className='w-full'
                                            classNames={{ trigger: 'rounded-xl h-12' }}
                                        >
                                            {countries.map((country) => (
                                                <SelectItem key={country.value} value={country.value}>
                                                    {country.label}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>

                        {/* Payment Method */}
                        <Card className='shadow-none border border-gray-100 rounded-2xl'>
                            <CardBody className='p-8'>
                                <h2 className='text-lg font-bold mb-6'>Payment Method</h2>
                                <RadioGroup
                                    value={paymentMethod}
                                    onValueChange={setPaymentMethod}
                                    className='mb-6'
                                >
                                    <div className='flex flex-col gap-3'>
                                        <div className='border border-gray-200 rounded-xl px-4 py-3'>
                                            <Radio value='credit' className='w-full' color='default'>
                                                <div className='flex items-center justify-between w-full'>
                                                    <span className='text-sm font-medium'>Credit/Debit Card</span>
                                                    <div className='flex gap-2 ml-4'>
                                                        <div className='border border-gray-100 rounded-md px-1.5 py-0.5 bg-white'>
                                                            <Image src='/checkout/visa.png' alt='Visa' width={32} height={20} className='aspect-[1.6/1] object-contain' />
                                                        </div>
                                                        <div className='border border-gray-100 rounded-md px-1.5 py-0.5 bg-white'>
                                                            <Image src='/checkout/mastercard.png' alt='Mastercard' width={32} height={20} className='aspect-[1.6/1] object-contain' />
                                                        </div>
                                                    </div>
                                                </div>
                                            </Radio>
                                        </div>

                                        <div className='border border-gray-200 rounded-xl px-4 py-3'>
                                            <Radio value='bank' className='w-full' color='default'>
                                                <span className='text-sm font-medium'>Bank Transfer</span>
                                            </Radio>
                                        </div>
                                    </div>
                                </RadioGroup>

                                {paymentMethod === 'credit' && (
                                    <div className='space-y-6'>
                                        <div>
                                            <label className='block text-sm font-bold mb-2'>Card Number</label>
                                            <Input
                                                placeholder='0000 0000 0000 0000'
                                                variant='bordered'
                                                endContent={<CreditCard size={20} className='text-gray-400' />}
                                                classNames={{ inputWrapper: 'rounded-xl h-12' }}
                                            />
                                        </div>

                                        <div>
                                            <label className='block text-sm font-bold mb-2'>Name On Card</label>
                                            <Input
                                                placeholder='Name on card'
                                                variant='bordered'
                                                classNames={{ inputWrapper: 'rounded-xl h-12' }}
                                            />
                                        </div>

                                        <div className='grid grid-cols-2 gap-4'>
                                            <div>
                                                <label className='block text-sm font-bold mb-2'>Expiry Date</label>
                                                <Input
                                                    placeholder='DD/YY'
                                                    variant='bordered'
                                                    classNames={{ inputWrapper: 'rounded-xl h-12' }}
                                                />
                                            </div>
                                            <div>
                                                <label className='block text-sm font-bold mb-2'>CVV</label>
                                                <Input
                                                    placeholder='XXX'
                                                    variant='bordered'
                                                    type="password"
                                                    classNames={{ inputWrapper: 'rounded-xl h-12' }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </CardBody>
                        </Card>
                    </div>

                    {/* Right Section - Summary */}
                    <div>
                        <Card className='shadow-none border border-gray-100 rounded-2xl sticky top-32'>
                            <CardBody className='p-8'>
                                <h2 className='text-2xl font-bold mb-6 text-center text-[#222222]'>Payment Summary</h2>
                                <Divider className='mb-8' />

                                <div className='mb-6 -mt-2'>
                                    <div className='space-y-1 mb-4'>
                                        <h3 className='font-bold text-lg text-[#222222]'>Retain Artist</h3>
                                        <p className='text-xs text-gray-500 font-light'>Maintain your active creative partnership</p>
                                    </div>
                                    <Divider className='my-4' />
                                    <div className='flex justify-between items-center pt-2'>
                                        <span className='text-md font-medium text-[#222222]'>Monthly Subscription</span>
                                        <span className='font-bold text-[#222222]'>$5</span>
                                    </div>
                                    <div className='flex items-center gap-3 mt-4'>
                                        <span className='text-sm font-medium text-[#222222]'>Duration :</span>
                                        <div className='flex items-center gap-2'>
                                            <input
                                                type='number'
                                                value={duration}
                                                onChange={(e) => setDuration(e.target.value)}
                                                className='w-12 h-8 bg-[#F1F1F1] border-none rounded-md text-center text-sm font-bold text-[#222222] focus:ring-0'
                                                min="1"
                                            />
                                            <span className='text-sm font-medium text-[#222222]'>Month(s)</span>
                                        </div>
                                    </div>
                                </div>



                                <div className='flex justify-between items-center py-5 border-y border-gray-100 mb-8 gap-4'>
                                    <span className='text-xl md:text-2xl text-[#222222] font-bold'>Subtotal</span>
                                    <span className='text-xl md:text-2xl font-bold text-[#222222]'>${subtotal}</span>
                                </div>

                                <Button
                                    className='w-full bg-radial from-[#EAF9FF] to-[#CCE7F2] text-[#035A7A] font-bold rounded-full py-7 text-md shadow-sm border-none'
                                    onPress={handlePayment}
                                >
                                    Make Payment
                                </Button>

                                <div className='mt-8 flex gap-3 p-4 bg-[#F8FAFB] rounded-xl border border-blue-50/50'>
                                    <Shield size={20} className='text-gray-400 mt-0.5 flex-shrink-0' />
                                    <p className='text-xs text-gray-500 leading-relaxed font-light'>
                                        Your payment information is protected and will not be stored in our data base.
                                    </p>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>

                {/* Success Modal */}
                <Modal
                    isOpen={isSuccessModalOpen}
                    onClose={handleCloseSuccess}
                    placement='center'
                    backdrop='blur'
                    hideCloseButton
                    className='mx-4'
                >
                    <ModalContent className='max-w-sm rounded-[32px]'>
                        <ModalBody className='p-10 text-center'>
                            <div className='mb-6'>
                                <div className='w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6'>
                                    <CheckCircle size={32} className='text-white' />
                                </div>
                                <h2 className='text-2xl font-bold mb-3'>Payment Successful</h2>
                                <p className='text-gray-500 text-sm leading-relaxed font-light'>
                                    You have successfully retained SHOALA ADIH. You can now message them directly from your dashboard.
                                </p>
                            </div>

                            <Button
                                className='w-full bg-radial from-[#EAF9FF] to-[#CCE7F2] text-[#035A7A] font-bold rounded-full py-6 text-sm shadow-sm border-none'
                                onPress={handleCloseSuccess}
                            >
                                Done
                            </Button>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </div>
            <Footer />
        </div>
    );
}
