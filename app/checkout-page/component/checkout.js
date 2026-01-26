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
import { CreditCard, Info, Shield } from 'lucide-react';
import ContractHeader from '../../artist-page/my-contracts/components/contract-header';

import { useRouter, useSearchParams } from 'next/navigation';

import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import FashionDesignerHeader from '../../fashion-designers/_components/studio-page-components/FashionDesignerHeader';
import Footer from '../../about-page/components/Footer';

export const CheckoutPage = () => {
  const [selectedCountry, setSelectedCountry] = useState('Nigeria');
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const countries = [
    { value: 'Nigeria', label: 'Nigeria' },
    { value: 'USA', label: 'United States' },
    { value: 'UK', label: 'United Kingdom' },
    { value: 'Canada', label: 'Canada' },
  ];

  const handlePayment = () => {
    setIsSuccessModalOpen(true);
  };

  const handleBackToHome = () => {
    setIsSuccessModalOpen(false);
    // Save license info
    const storedLicenses = localStorage.getItem('licenses');
    const licenses = storedLicenses ? JSON.parse(storedLicenses) : {};
    licenses[id] = true;
    localStorage.setItem('licenses', JSON.stringify(licenses));

    // Redirect back to product details page
    router.push(`/fashion-designers/${id}`);
  };

  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  return (
    <div className='mx-auto bg-[#FAFAFA]'>
      <FashionDesignerHeader />
      <div className='max-w-6xl mx-auto px-3 lg:px-6' style={{ paddingTop: '120px' }}>
        {/* Header */}
        <h1
          className='font-black mb-10 text-black block'
          style={{
            fontWeight: 900,
            fontSize: '32px',
            color: '#000000',
            display: 'block',
            lineHeight: '1.2'
          }}
        >
          Checkout
        </h1>

        {/* License Notice */}

        <Alert
          color='default'
          variant='flat'
          hideIcon
          description={
            <div className='flex items-center gap-2 py-1'>
              <Info size={18} className='text-black flex-shrink-0 self-center' />
              <span className='m-0 p-0 leading-tight text-sm md:text-base'>
                Get Licensing right to the design and use as you desire. All files and specification will be transferred to you.
              </span>
            </div>
          }
          classNames={{
            base: 'border-none bg-gradient-to-r from-[#A5D5E9] to-[#28A5D8] text-[#222222] font-proximanova px-4 min-h-[56px] flex items-center',
            mainWrapper: 'p-0 m-0 flex-1',
            description: 'p-0 m-0 flex items-center',
          }}
        />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-6'>
          {/* Left Section - Forms */}
          <div className='lg:col-span-1 space-y-6 font-satoshi'>
            {/* Billing Information */}
            <Card className='shadow-md border-2 border-gray-200'>
              <CardBody className='md:p-6 p-2'>
                <h2 className='text-lg font-semibold mb-4'>Billing Information</h2>

                <div className='space-y-4'>
                  <div>
                    <label className='block text-sm font-semibold  mb-1'>Full Name</label>
                    <Input
                      placeholder='Name on card'
                      variant='bordered'
                      className='w-full'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-1'>
                      Country
                    </label>
                    <Select
                      selectedKeys={[selectedCountry]}
                      onSelectionChange={(keys) =>
                        setSelectedCountry(Array.from(keys)[0])
                      }
                      variant='bordered'
                      className='w-full'
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
            <Card className='shadow-md border-2 border-gray-200 '>
              <CardBody className='md:p-6 p-2'>
                <h2 className='text-lg font-semibold text-gray-900 mb-4'>
                  Payment Method
                </h2>

                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className='mb-6'
                >
                  <div className='flex flex-col gap-2'>
                    <div className='border-2 border-gray-200 rounded-lg px-2 py-1'>
                      <Radio value='credit' className='w-full ' color='default'>
                        <div className='flex items-center justify-between w-full'>
                          <span className='text-sm font-proximanova'>
                            Credit/Debit Card
                          </span>
                          <div className='flex gap-2 ml-6'>
                            <div className='border-1 border-gray-200 rounded-lg  px-2 py-0'>
                              <Image
                                src='/checkout/visa.png'
                                alt='Visa'
                                width={40}
                                height={30}
                                className='object-contain'
                              />
                            </div>
                            <div className='border-1 border-gray-200 rounded-lg px-2 py-0'>
                              <Image
                                src='/checkout/mastercard.png'
                                alt='MasterCard'
                                width={40}
                                height={30}
                                className='object-contain'
                              />
                            </div>
                          </div>
                        </div>
                      </Radio>
                    </div>

                    <div className='border-2 border-gray-200 rounded-lg px-2 py-1'>
                      <Radio value='bank' className='w-full' color='default'>
                        <span className='text-sm font-proximanova'>Bank Transfer</span>
                      </Radio>
                    </div>
                  </div>
                </RadioGroup>

                {paymentMethod === 'credit' && (
                  <div className='space-y-4'>
                    <div className='relative'>
                      <label className='block text-sm font-proximanova mb-1'>
                        Card Number
                      </label>
                      <Input
                        placeholder='0000 0000 0000 0000'
                        variant='bordered'
                        endContent={<CreditCard size={20} className='text-gray-400' />}
                      />
                    </div>

                    <div>
                      <label className='block text-sm font-proximanova mb-1'>
                        Name On Card
                      </label>
                      <Input placeholder='Name on card' variant='bordered' />
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                      <div>
                        <label className='block text-sm font-proximanova mb-1'>
                          Expiry Date
                        </label>
                        <Input placeholder='DD/YY' variant='bordered' />
                      </div>
                      <div>
                        <label className='block text-sm font-proximanova mb-1'>CVV</label>
                        <Input placeholder='XXX' variant='bordered' />
                      </div>
                    </div>
                  </div>
                )}
              </CardBody>
            </Card>
          </div>

          {/* Right Section  */}
          <div className='w-full md:w-auto'>
            <Card className='shadow-sm sticky top-8 border-2 border-gray-200'>
              <CardBody className='p-6'>
                <div className='md:text-center text-left w-full'>
                  <h2 className='md:text-xl text-lg font-semibold  mb-2'>
                    Payment Summary
                  </h2>
                  <Divider className='mb-8' />
                </div>

                <div className='flex items-start justify-between  gap-1 mb-6 font-satoshi'>
                  <div className='flex items-center gap-4 md:max-w-sm '>
                    <Image
                      src='/checkout/attire.png'
                      alt='Visa'
                      width={60}
                      height={60}
                      className='rounded-[11px] object-center'
                    />
                    <div className='flex-1 w-full mr-2'>
                      <h3 className='font-proximanova  text-md'>
                        Modern Fashion Attire (863758558)
                      </h3>
                      <p className='text-xs text-gray-500 line-clamp-2'>
                        Modern Fashion Attire made with authority artisan Modern Fashion
                        Attire made with authority artisan Modern Fashion Attire made with
                        authority artisan
                      </p>
                    </div>
                  </div>

                  <span className='font-satoshi text-sm'>$350</span>
                </div>

                <Divider className='my-4' />

                <div className='space-y-2 mb-4'>
                  <div className='flex justify-between text-sm'>
                    <span className='font-satoshi'>Subtotal</span>
                    <span className='font-satoshi text-sm'>$350</span>
                  </div>
                </div>

                <div className='flex justify-between items-center mb-6'>
                  <span className='font-semibold md:text-2xl text-xl text-gray-900'>
                    Total Amount To Pay :
                  </span>
                  <span className='text-xl font-bold text-gray-900'>$350</span>
                </div>

                <Divider className='mb-5 -mt-2' />

                <Button
                  className='w-full bg-radial from-[#EAF9FF] to-[#CCE7F2] text-[#035A7A] font-semibold rounded-full border-0 shadow-md mt-6'
                  size='lg'
                  radius='full'
                  onPress={handlePayment}
                >
                  Make Payment
                </Button>

                <div className='my-6'>
                  <Alert
                    hideIcon
                    color='primary'
                    variant='flat'
                    startContent={
                      <ExclamationTriangleIcon className='h-5 w-5 text-[#3A98BB] flex-shrink-0 mt-0.5' />
                    }
                    className='bg-transparent border-none text-black my-2 px-0 items-start'
                  >
                    <div className='text-sm'>
                      <p className='font-satoshi'>
                        Your payment is secure in our{' '}
                        <span className='font-satoshi text-[#3A98BB] '>Escrow</span> until
                        your project is completed. Read our{' '}
                        <Link href='#' className='font-semibold text-[#3A98BB]'>
                          Collaboration Policy
                        </Link>{' '}
                        for full details
                      </p>
                    </div>
                  </Alert>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>

        {/* Success Modal */}
        <Modal
          isOpen={isSuccessModalOpen}
          onClose={() => setIsSuccessModalOpen(false)}
          placement='center'
          backdrop='blur'
          hideCloseButton
          className='mx-4'
        >
          <ModalContent className='max-w-md'>
            <ModalBody className='p-8 text-center'>
              <div className='mb-6'>
                <div className='w-16 h-16 bg-green-700 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <CheckCircleIcon size={32} className='text-white' />
                </div>
                <h2 className='text-2xl font-semibold mb-3'>Payment Successful</h2>
                <p className='text-gray-600 text-sm leading-relaxed font-satoshi'>
                  Complete file containing all specifications and related documents will
                  be sent to your email.
                </p>
              </div>

              <Button
                className='w-full bg-radial from-[#EAF9FF] to-[#CCE7F2] text-[#035A7A] font-semibold rounded-full border-0 shadow-md mt-4'
                size='lg'
                radius='full'
                onPress={handleBackToHome}
              >
                OK
              </Button>
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
