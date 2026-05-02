'use client';
import React, { useState, useEffect } from 'react';
import { Input, Textarea, Select, Checkbox, SelectItem, Button, Switch } from '@heroui/react';
import { CiImageOn } from 'react-icons/ci';
import { ChevronLeft } from 'lucide-react';
import CustomButton from '../../../../components/CustomButton';
import Link from 'next/link';
import Image from 'next/image';
import { color } from 'framer-motion';
import { useDisclosure } from '@heroui/react';
import PublishDesignPopUp from './PublishDesignPopUp';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAppStore } from '../../../../store/index';
import { CiFileOn } from 'react-icons/ci';

const License = () => {
  const router = useRouter();
  const [errors, setErrors] = React.useState({});
  const [images, setImages] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { 
    vaultFile, setVaultFile, 
    commercialRights, setCommercialRights,
    limitedUsageLicense, setLimitedUsageLicense,
    confirmMasterFiles, setConfirmMasterFiles,
    confirmWatermarking, setConfirmWatermarking,
    confirmOwnership, setConfirmOwnership
  } = useAppStore();
  const searchParams = useSearchParams();

  // Get initial values from URL params
  const initialTitle = searchParams.get('title') || '';
  const initialDescription = searchParams.get('description') || '';
  const initialStyle = searchParams.get('style') || '';
  const initialPrice = searchParams.get('price') || '';

  const handleSubmitPublish = () => {
    onOpen();
  };

  const handleVaultUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setVaultFile(file);
    }
  };

  const handleUpload = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages((prev) => [...prev, ...filesArray]);
    }
  };

  const removeImage = (indexToRemove) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <>
      <div>
        {/* Back Button for Mobile - Aligned with card */}
        <div className='lg:hidden w-full max-w-[90%] mx-4 mt-6'>
          <button
            onClick={() => router.push("/artist-page")}
            className='flex items-center text-[#222222] font-semibold'
          >
            <ChevronLeft className='w-5 h-5' />
          </button>
        </div>

        <div className='lg:w-4/5 w-full max-w-[90%] px-6 py-2 lg:mx-16 mx-4 lg:mt-8 mt-4 rounded-lg bg-gradient-to-b from-[#CCE7F2] via-[#A1DCF3] to-[#49C0F0] text-[#393939]'>
          <h1 className='lg:text-[32px] text-2xl text-[#393939] font-bold'>License Your Design</h1>
          <p className='text-base'>
            By uploading this design, you attest that you are the creator or legitimate owner and possess all necessary rights and permissions. Uploading work without authorization may constitute copyright infringement.{' '}
            <Link className='text-[#3A98BB]' href={'/'}>
              Learn more{' '}
            </Link>
          </p>
        </div>

        <div className='bg-[#FAFAFA] lg:w-4/5 w-full max-w-[90%] text-[#222222] lg:mx-16 mx-4 px-6 pt-[24px] pb-[32px] mt-7 mb-[99px] flex flex-col gap-6'>
          {/* Design Title & Description */}
          <div className='flex flex-col gap-4 w-full'>
            <div className='flex flex-col gap-1'>
              <label htmlFor='designTitle' className='text-base font-bold text-[#222222]'>
                Design Title<span className='text-red-500 ml-0.5'>*</span>
              </label>
              <input
                id='designTitle'
                name='name'
                type='text'
                defaultValue={initialTitle}
                placeholder='What is the title of your design?'
                required
                className='text-base text-[#BABABA]  font-normal border-1 border-[#d1d1d1] rounded-lg px-3 py-2'
              />
              {/* Example error message */}
              {errors?.name && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.name === 'valueMissing'
                    ? 'Please enter your name'
                    : errors.name}
                </p>
              )}
            </div>

            <div className='w-full'>
              <label
                htmlFor='design-description'
                className='block text-base font-semibold mb-2'
              >
                Design Description<span className='text-red-500 ml-0.5'>*</span>
              </label>
              <textarea
                id='design-description'
                defaultValue={initialDescription}
                placeholder='Describe your design in detail'
                className='w-full h-40 p-3 border rounded-md  focus:outline-none'
              />
            </div>
          </div>

          {/* Fashion Style */}
          <div className='flex flex-col gap-2 relative'>
            <h3 className='text-lg font-semibold'>Design Style<span className='text-red-500 ml-0.5'>*</span></h3>
            <input
              id='design-style-input'
              type='text'
              defaultValue={initialStyle}
              placeholder='Enter category of your design, E.g Casual, etc.'
              className='border-1 border-[#d1d1d1] rounded-lg px-3 py-2 text-base focus:outline-none focus:border-[#3A98BB]'
              onInput={(e) => {
                const value = e.target.value.toLowerCase();
                const dropdown = document.getElementById('style-suggestions');
                const suggestions = dropdown?.querySelectorAll('button');

                if (!value) {
                  dropdown.classList.add('hidden');
                  return;
                }

                let hasVisibleSuggestion = false;
                suggestions?.forEach((btn) => {
                  const text = btn.textContent.toLowerCase();
                  if (text.includes(value)) {
                    btn.classList.remove('hidden');
                    hasVisibleSuggestion = true;
                  } else {
                    btn.classList.add('hidden');
                  }
                });

                if (hasVisibleSuggestion) {
                  dropdown.classList.remove('hidden');
                } else {
                  dropdown.classList.add('hidden');
                }
              }}
              onFocus={(e) => {
                const value = e.target.value.toLowerCase();
                const dropdown = document.getElementById('style-suggestions');
                if (value) {
                  dropdown.classList.remove('hidden');
                }
              }}
              onBlur={() => {
                setTimeout(() => {
                  const dropdown = document.getElementById('style-suggestions');
                  dropdown?.classList.add('hidden');
                }, 200);
              }}
            />

            {/* Autocomplete Suggestions Dropdown */}
            <div
              id='style-suggestions'
              className='hidden absolute top-full left-0 right-0 mt-1 bg-white border border-[#d1d1d1] rounded-lg shadow-lg max-h-60 overflow-y-auto z-10'
            >
              <button
                type='button'
                onClick={(e) => {
                  const input = document.getElementById('design-style-input');
                  if (input) {
                    input.value = 'Casual';
                    input.focus();
                  }
                }}
                className='w-full text-left px-4 py-2 hover:bg-[#F0F0F0] transition-colors text-sm'
              >
                Casual
              </button>
              <button
                type='button'
                onClick={(e) => {
                  const input = document.getElementById('design-style-input');
                  if (input) {
                    input.value = 'Formal';
                    input.focus();
                  }
                }}
                className='w-full text-left px-4 py-2 hover:bg-[#F0F0F0] transition-colors text-sm'
              >
                Formal
              </button>
              <button
                type='button'
                onClick={(e) => {
                  const input = document.getElementById('design-style-input');
                  if (input) {
                    input.value = 'Streetwear';
                    input.focus();
                  }
                }}
                className='w-full text-left px-4 py-2 hover:bg-[#F0F0F0] transition-colors text-sm'
              >
                Streetwear
              </button>
              <button
                type='button'
                onClick={(e) => {
                  const input = document.getElementById('design-style-input');
                  if (input) {
                    input.value = 'Vintage';
                    input.focus();
                  }
                }}
                className='w-full text-left px-4 py-2 hover:bg-[#F0F0F0] transition-colors text-sm'
              >
                Vintage
              </button>
              <button
                type='button'
                onClick={(e) => {
                  const input = document.getElementById('design-style-input');
                  if (input) {
                    input.value = 'Bohemian';
                    input.focus();
                  }
                }}
                className='w-full text-left px-4 py-2 hover:bg-[#F0F0F0] transition-colors text-sm'
              >
                Bohemian
              </button>
              <button
                type='button'
                onClick={(e) => {
                  const input = document.getElementById('design-style-input');
                  if (input) {
                    input.value = 'Minimalist';
                    input.focus();
                  }
                }}
                className='w-full text-left px-4 py-2 hover:bg-[#F0F0F0] transition-colors text-sm'
              >
                Minimalist
              </button>
              <button
                type='button'
                onClick={(e) => {
                  const input = document.getElementById('design-style-input');
                  if (input) {
                    input.value = 'Avant-Garde';
                    input.focus();
                  }
                }}
                className='w-full text-left px-4 py-2 hover:bg-[#F0F0F0] transition-colors text-sm'
              >
                Avant-Garde
              </button>
              <button
                type='button'
                onClick={(e) => {
                  const input = document.getElementById('design-style-input');
                  if (input) {
                    input.value = 'Sporty';
                    input.focus();
                  }
                }}
                className='w-full text-left px-4 py-2 hover:bg-[#F0F0F0] transition-colors text-sm'
              >
                Sporty
              </button>
              <button
                type='button'
                onClick={(e) => {
                  const input = document.getElementById('design-style-input');
                  if (input) {
                    input.value = 'Elegant';
                    input.focus();
                  }
                }}
                className='w-full text-left px-4 py-2 hover:bg-[#F0F0F0] transition-colors text-sm'
              >
                Elegant
              </button>
              <button
                type='button'
                onClick={(e) => {
                  const input = document.getElementById('design-style-input');
                  if (input) {
                    input.value = 'Preppy';
                    input.focus();
                  }
                }}
                className='w-full text-left px-4 py-2 hover:bg-[#F0F0F0] transition-colors text-sm'
              >
                Preppy
              </button>
              <button
                type='button'
                onClick={(e) => {
                  const input = document.getElementById('design-style-input');
                  if (input) {
                    input.value = 'Grunge';
                    input.focus();
                  }
                }}
                className='w-full text-left px-4 py-2 hover:bg-[#F0F0F0] transition-colors text-sm'
              >
                Grunge
              </button>
              <button
                type='button'
                onClick={(e) => {
                  const input = document.getElementById('design-style-input');
                  if (input) {
                    input.value = 'Chic';
                    input.focus();
                  }
                }}
                className='w-full text-left px-4 py-2 hover:bg-[#F0F0F0] transition-colors text-sm'
              >
                Chic
              </button>
              <button
                type='button'
                onClick={(e) => {
                  const input = document.getElementById('design-style-input');
                  if (input) {
                    input.value = 'Romantic';
                    input.focus();
                  }
                }}
                className='w-full text-left px-4 py-2 hover:bg-[#F0F0F0] transition-colors text-sm'
              >
                Romantic
              </button>
              <button
                type='button'
                onClick={(e) => {
                  const input = document.getElementById('design-style-input');
                  if (input) {
                    input.value = 'Edgy';
                    input.focus();
                  }
                }}
                className='w-full text-left px-4 py-2 hover:bg-[#F0F0F0] transition-colors text-sm'
              >
                Edgy
              </button>
              <button
                type='button'
                onClick={(e) => {
                  const input = document.getElementById('design-style-input');
                  if (input) {
                    input.value = 'Classic';
                    input.focus();
                  }
                }}
                className='w-full text-left px-4 py-2 hover:bg-[#F0F0F0] transition-colors text-sm'
              >
                Classic
              </button>
            </div>
          </div>

          {/* 1. Public Preview Gallery */}
          <div className='flex flex-col gap-2'>
            <h3 className='text-lg font-bold text-[#222222]'>Public-Preview Gallery<span className='text-red-500 ml-0.5'>*</span></h3>
            <p className='text-sm'>
              Upload public facing images.
            </p>

            {/* Hidden File Input */}
            <input
              type='file'
              accept='image/*'
              multiple
              className='hidden'
              id='design-upload'
              onChange={handleUpload}
            />

            <div>
              {/* Show items on mobile */}
              <div className='flex gap-4 md:hidden overflow-x-auto pb-4'>
                {images.map((file, i) => (
                  <div
                    key={`mobile-img-${i}`}
                    className='relative w-[110px] h-[110px] min-w-[110px] bg-gray-200 rounded flex items-center justify-center overflow-hidden'
                  >
                    <Image
                      src={URL.createObjectURL(file)}
                      alt={`upload-${i}`}
                      className='object-cover'
                      fill
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute top-1 right-1 bg-white/70 hover:bg-white text-black rounded-full p-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                  </div>
                ))}

                {/* Show one empty slot to add more */}
                {images.length < 5 && (
                  <label
                    htmlFor='design-upload'
                    className='w-[110px] h-[110px] min-w-[110px] bg-gray-200 rounded flex items-center justify-center text-3xl cursor-pointer'
                  >
                    <CiImageOn />
                  </label>
                )}
              </div>

              {/* Show items on md+ (desktop) */}
              <div className='hidden md:flex gap-4 flex-wrap'>
                {images.map((file, i) => (
                  <div
                    key={`desktop-img-${i}`}
                    className='relative w-[110px] h-[110px] bg-gray-200 rounded flex items-center justify-center overflow-hidden'
                  >
                    <Image
                      src={URL.createObjectURL(file)}
                      alt={`upload-${i}`}
                      className='object-cover'
                      fill
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute top-1 right-1 bg-white/70 hover:bg-white text-black rounded-full p-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                  </div>
                ))}

                {/* Show one empty slot to add more */}
                {images.length < 5 && (
                  <label
                    htmlFor='design-upload'
                    className='w-[110px] h-[110px] bg-gray-200 rounded flex items-center justify-center text-3xl cursor-pointer'
                  >
                    <CiImageOn />
                  </label>
                )}
              </div>
            </div>
            {/* Term Note */}
            <p className='text-xs text-[#767676] mt-2'>
              <span className='font-bold text-[#E73131]'>Term Note:</span> Only upload public facing images (sketches,photos). To prevent unapproved use, prioritize watermaking. We provide a separate, private field for secure master file delivery.
            </p>
          </div>

          {/* 2. SECURE SOURCE FILES (THE VAULT) */}
          <div className='flex flex-col gap-2'>
            <div className='bg-[#FFF9EA] border border-[#EBC351] rounded-xl p-6'>
              <div className='flex items-center gap-2 mb-4'>
                <h3 className='text-lg font-bold text-[#222222] uppercase tracking-wide'>
                  SECURE SOURCE FILES (THE VAULT)
                </h3>
                <span className='text-2xl'>🔒</span>
              </div>

              <input
                type='file'
                accept='.zip,.ai,.eps,.psd,.pdf'
                className='hidden'
                id='vault-upload'
                onChange={handleVaultUpload}
              />

              <Button
                as='label'
                htmlFor='vault-upload'
                className='!bg-[#CCE7F2] text-[#035A7A] w-full h-16 rounded-full flex items-center justify-center gap-3 cursor-pointer hover:opacity-90 transition-all'
              >
                <CiFileOn className='text-2xl' />
                <span className='text-lg font-bold'>
                  {vaultFile ? vaultFile.name : 'Upload ZIP/Vector File'}
                </span>
              </Button>

              <div className='mt-4 text-[#222222] font-semibold text-xs leading-relaxed'>
                <p>
                  <span className='font-bold uppercase tracking-tight text-[10px]'>NOT PUBLICLY DISPLAYED.</span> Released only after escrow payment.
                </p>
                <p className='mt-1 opacity-70'>
                  (Accepted formats: .zip, .ai, .eps, .psd, .pdf, Max 500MB)
                </p>
              </div>
            </div>
          </div>

          {/* 3. COMMERCIAL RIGHTS */}
          <div className='flex flex-col gap-2'>
            <div className='bg-[#EAF9FF] border border-[#CCE7F2] rounded-xl p-6'>
              <h3 className='text-lg font-bold text-[#222222] uppercase tracking-wide mb-4'>
                COMMERCIAL RIGHTS
              </h3>

              <div className='flex items-center gap-4'>
                <Switch
                  isSelected={commercialRights}
                  onValueChange={setCommercialRights}
                  classNames={{
                    wrapper: 'h-10 w-24 bg-[#D1D1D1] group-data-[selected=true]:bg-[#CCE7F2]',
                    thumb: 'h-8 w-8 bg-[#035A7A]',
                  }}
                  startContent={<div className='font-bold text-xs'>ON</div>}
                  endContent={<div className='font-bold text-xs'>OFF</div>}
                />
                <div className='flex flex-col'>
                  <span className='font-bold text-base text-[#222222]'>Include Commercial Rights?</span>
                  <span className='text-xs text-[#767676] font-medium'>(Allows brand to use for mass production and global ads)</span>
                </div>
              </div>

              {/* Limited Usage License Field */}
              <div className='mt-6 flex flex-col gap-2'>
                <label className={`text-sm font-bold ${commercialRights ? 'opacity-30' : 'text-[#222222]'}`}>
                  Limited Usage License
                </label>
                <Textarea
                  placeholder='Define your Limited Usage License terms (e.g. 12-month non-exclusive rights for internal mood boards, digital presentations, and unpaid social media features only. No physical production or paid advertising permitted.)'
                  value={limitedUsageLicense}
                  onValueChange={setLimitedUsageLicense}
                  isDisabled={commercialRights}
                  classNames={{
                    input: 'text-sm placeholder:text-[#BABABA]',
                    inputWrapper: 'bg-white border-[#D1D1D1] rounded-lg'
                  }}
                  minRows={3}
                />
              </div>
            </div>
          </div>

          {/* Asking Price */}
          <div className='flex flex-col gap-2'>
            <h3 className='text-lg font-semibold'>Asking Price<span className='text-red-500 ml-0.5'>*</span></h3>
            <input
              defaultValue={initialPrice}
              placeholder='$0.00'
              className='border-1 border-[#d1d1d1] px-4 py-3 rounded-lg w-full lg:w-96'
            />
          </div>



          {/* Confirmation Checkboxes */}
          <div className='flex flex-col gap-4'>
            <div className='flex items-start gap-2'>
              <Checkbox 
                isSelected={confirmMasterFiles}
                onValueChange={setConfirmMasterFiles}
              />
              <p className='text-sm font-medium text-[#222222]'>
                I confirm that the files in 'The Vault' are original master files matching the public previews.
              </p>
            </div>
            
            <div className='flex items-start gap-2'>
              <Checkbox 
                isSelected={confirmWatermarking}
                onValueChange={setConfirmWatermarking}
              />
              <p className='text-sm font-medium text-[#222222]'>
                I acknowledge that the 'Public Preview Gallery' is for display only and uploaded at my own risk (I am responsible for watermarking).
              </p>
            </div>

            <div className='flex items-start gap-2'>
              <Checkbox 
                isSelected={confirmOwnership}
                onValueChange={setConfirmOwnership}
              />
              <p className='text-sm font-medium text-[#222222]'>
                By publishing, you confirm you have the necessary rights and permission to
                the ownership of this design.{' '}
                <Link href='#' className='text-blue-600 underline font-normal'>
                  Learn More
                </Link>
              </p>
            </div>
          </div>
          <div className='flex flex-row gap-4 w-full justify-between lg:justify-start'>
            <CustomButton
              text='Save as Draft'
              className='bg-[#F0F0F0] text-[#222222] flex-1 sm:flex-none sm:w-auto'
              style={{
                background: '#EDEDED',
              }}
            />
            <CustomButton
              text='Publish'
              className='flex-1 sm:flex-none sm:w-auto'
              style={{
                color: '#035A7A',
              }}
              onPress={handleSubmitPublish}
            />
          </div>
        </div>
      </div>
      <PublishDesignPopUp isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};

export default License;
