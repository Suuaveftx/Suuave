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
import ContractHeader from '../../fashion-designers/contracts/components/contract-header';

import { useRouter, useSearchParams } from 'next/navigation';

import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import FashionDesignerHeader from '../../fashion-designers/_components/studio-page-components/FashionDesignerHeader';
import PageContainer from '@/components/layout/PageContainer';
import Footer from '../../about-page/components/Footer';

import { useAppStore } from '@/store';

export const CheckoutPage = () => {
  const [selectedCountry, setSelectedCountry] = useState('Nigeria');
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const { addLicense } = useAppStore();

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
    // Save license info using Zustand store
    addLicense(id);

    // Redirect based on exclusivity
    if (hasCrown) {
      router.push(`/fashion-designers`);
    } else {
      router.push(`/fashion-designers/${id}`);
    }
  };

  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const hasCrown = searchParams.get('crown') === 'true' || searchParams.has('crown');

  return (
    <div className='mx-auto bg-[#F5F8FA] lg:bg-[#FAFAFA] min-h-screen'>
      <FashionDesignerHeader />
      <PageContainer className='pt-[100px] lg:pt-[120px] pb-[100px] !px-4 lg:!px-8'>
        {/* Header */}
        {/* Mobile Header */}
        <div className='lg:hidden flex items-center gap-1 mb-4 mt-2'>
          <Button
            isIconOnly
            variant='light'
            radius='full'
            className='min-w-fit flex items-center justify-center p-1 rounded-full w-10 h-10 bg-transparent text-gray-500'
            onPress={() => router.back()}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </Button>
          <h1 className='text-[20px] font-semibold text-[#222222]'>Check-out</h1>
        </div>

        {/* Desktop Header */}
        <div className='hidden lg:flex items-center gap-3 mb-4'>
          <Button
            isIconOnly
            variant='light'
            radius='full'
            className='text-black -ml-2'
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} />
          </Button>
          <h1
            className='font-black text-black'
            style={{
              fontWeight: 900,
              fontSize: '32px',
              color: '#000000',
              lineHeight: '1.2'
            }}
          >
            Checkout
          </h1>
        </div>

        {/* License Notice */}

        <Alert
          color='default'
          variant='flat'
          hideIcon
          description={
            <div className='flex items-start md:items-center gap-2 py-1'>
              <div className='w-5 h-5 bg-black rounded-full text-white flex items-center justify-center p-0.5 mt-0.5 md:mt-0 flex-shrink-0'>
                <Info size={14} strokeWidth={3} />
              </div>
              <span className='m-0 p-0 leading-tight text-[13px] md:text-base font-medium'>
                {hasCrown
                  ? "Secure full, sole ownership of this design, which will be permanently removed from the marketplace."
                  : "Get Licensing right to the design and use as you desire. All files and specification will be tranferred to you."}
              </span>
            </div>
          }
          classNames={{
            base: 'border-none bg-gradient-to-r from-[#A5D5E9] to-[#28A5D8] text-[#222222] font-satoshi px-4 py-3 min-h-[56px] flex items-center rounded-xl mb-4 mt-2',
            mainWrapper: 'p-0 m-0 flex-1',
            description: 'p-0 m-0 flex items-center text-white',
          }}
        />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 mt-4'>
          {/* Left Section - Forms */}
          <div className='lg:col-span-1 space-y-4 lg:space-y-6 font-satoshi'>
            {/* Billing Information */}
            <Card className='shadow-none lg:shadow-md border border-[#EAEAEA] lg:border-2 lg:border-gray-200 rounded-xl lg:rounded-2xl'>
              <CardBody className='p-4 md:p-6'>
                <h2 className='text-base md:text-lg font-bold mb-4 text-[#222222]'>Billing Information</h2>

                <div className='space-y-4'>
                  <div>
                    <label className='block text-sm font-bold text-[#222222] mb-1.5'>Full Name</label>
                    <Input
                      placeholder='Name on card'
                      variant='bordered'
                      className='w-full'
                      classNames={{ inputWrapper: 'rounded-lg border-[#EAEAEA] h-[48px]' }}
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-bold text-[#222222] mb-1.5'>
                      Country
                    </label>
                    <Select
                      selectedKeys={[selectedCountry]}
                      onSelectionChange={(keys) =>
                        setSelectedCountry(Array.from(keys)[0])
                      }
                      variant='bordered'
                      className='w-full'
                      classNames={{ trigger: 'rounded-lg border-[#EAEAEA] h-[48px]' }}
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
            <Card className='shadow-none lg:shadow-md border border-[#EAEAEA] lg:border-2 lg:border-gray-200 rounded-xl lg:rounded-2xl'>
              <CardBody className='p-4 md:p-6'>
                <h2 className='text-base md:text-lg font-bold text-[#222222] mb-4'>
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
                      <label className='block text-sm font-bold text-[#222222] mb-1.5'>
                        Card Number
                      </label>
                      <Input
                        placeholder='0000 0000 0000 0000'
                        variant='bordered'
                        endContent={<CreditCard size={20} className='text-gray-400' />}
                        classNames={{ inputWrapper: 'rounded-lg border-[#EAEAEA] h-[48px]' }}
                      />
                    </div>

                    <div>
                      <label className='block text-sm font-bold text-[#222222] mb-1.5'>
                        Name On Card
                      </label>
                      <Input placeholder='Name on card' variant='bordered' classNames={{ inputWrapper: 'rounded-lg border-[#EAEAEA] h-[48px]' }} />
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                      <div>
                        <label className='block text-sm font-bold text-[#222222] mb-1.5'>
                          Expiry Date
                        </label>
                        <Input placeholder='DD/YY' variant='bordered' classNames={{ inputWrapper: 'rounded-lg border-[#EAEAEA] h-[48px]' }} />
                      </div>
                      <div>
                        <label className='block text-sm font-bold text-[#222222] mb-1.5'>CVV</label>
                        <Input placeholder='XXX' variant='bordered' classNames={{ inputWrapper: 'rounded-lg border-[#EAEAEA] h-[48px]' }} />
                      </div>
                    </div>
                  </div>
                )}
              </CardBody>
            </Card>
          </div>

          {/* Right Section  */}
          <div className='w-full md:w-auto font-satoshi'>
            <Card className='shadow-none lg:shadow-md sticky top-8 border border-[#EAEAEA] lg:border-2 lg:border-gray-200 rounded-xl lg:rounded-2xl'>
              <CardBody className='p-4 md:p-6'>
                <div className='md:text-center text-left w-full'>
                  <h2 className='md:text-xl text-base font-bold mb-4 text-[#222222]'>
                    Order Summary
                  </h2>
                  <Divider className='mb-6 hidden lg:block' />
                </div>

                <div className='flex items-start justify-between gap-2 mb-6 font-satoshi'>
                  <div className='flex items-center gap-3 md:max-w-sm w-full'>
                    <div className='min-w-[48px] h-[48px] rounded-lg overflow-hidden bg-gray-100'>
                      <Image
                        src='/checkout/attire.png'
                        alt='Fashion Attire'
                        width={48}
                        height={48}
                        className='w-full h-full object-cover'
                      />
                    </div>
                    <div className='flex-1 pr-2'>
                      <h3 className='font-bold text-[13px] md:text-sm text-[#222222] leading-tight mb-1 truncate max-w-[170px] lg:max-w-full'>
                        Modern Fashion Attire...
                      </h3>
                      <p className='text-[11px] text-[#888888] line-clamp-2 leading-tight'>
                        Modern Fashion Attire made with authority african...
                      </p>
                    </div>
                  </div>

                  <span className='font-satoshi text-[13px] font-medium'>$350</span>
                </div>

                <Divider className='my-4' />

                <div className='space-y-2 mb-4'>
                  <div className='flex justify-between text-sm'>
                    <span className='font-satoshi'>Subtotal</span>
                    <span className='font-satoshi text-sm'>$350</span>
                  </div>
                </div>

                <div className='flex justify-between items-center mb-6 mt-1 lg:mt-0'>
                  <span className='font-bold md:text-2xl text-[14px] text-[#222222]'>
                    Total Amount To Pay :
                  </span>
                  <span className='text-[15px] font-black text-[#222222]'>$350</span>
                </div>

                <Divider className='mb-5 hidden lg:block' />

                <Button
                  className='w-full bg-gradient-to-r from-[#DFF2FA] to-[#C9EBF9] text-[#055C7A] font-bold rounded-full border-0 lg:shadow-md'
                  size='lg'
                  radius='full'
                  onPress={handlePayment}
                >
                  Make Payment
                </Button>

                <div className='mt-6 lg:my-6'>
                  <Alert
                    hideIcon
                    color='primary'
                    variant='flat'
                    startContent={
                      <ExclamationTriangleIcon className='h-4 w-4 text-[#777777] flex-shrink-0 mt-0.5' />
                    }
                    className='bg-[#F5FAFC] lg:bg-transparent border lg:border-none border-[#EAEAEA] rounded-lg text-black px-3 py-3 items-start'
                  >
                    <div className='text-sm'>
                      <p className='font-satoshi'>
                        Your payment is secure in our{' '}
                        <span className='font-satoshi text-[#3A98BB] '>Escrow</span> until
                        your design assets are successfully delivered. Read our{' '}
                        <Link href='#' className='font-semibold text-[#3A98BB]'>
                          Licensing Policy
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
                  {hasCrown
                    ? 'Complete file containing all specifications and related documents will be sent to your email.'
                    : 'You can now download the complete file, containing all specifications and related documents.'}
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
      </PageContainer>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
