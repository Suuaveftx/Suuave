'use client';
import React, { useState, useEffect } from 'react';
import { Input, Textarea, Select, Checkbox, SelectItem, Button, Switch } from '@heroui/react';
import { CiImageOn } from 'react-icons/ci';
import { ChevronLeft, Info, Paperclip } from 'lucide-react';
import CustomButton from '../../../../components/CustomButton';
import Link from 'next/link';
import Image from 'next/image';
import { color } from 'framer-motion';
import { useDisclosure } from '@heroui/react';
import PublishDesignPopUp from './PublishDesignPopUp';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAppStore } from '@/store';
import { CiFileOn } from 'react-icons/ci';
import PageContainer from '../../../../components/layout/PageContainer';

const License = () => {
  const router = useRouter();
  const [errors, setErrors] = React.useState({});
  const [images, setImages] = useState([]);
  const [showSourceFileInfo, setShowSourceFileInfo] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    vaultFile, setVaultFile,
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
  const [designStyles, setDesignStyles] = useState(initialStyle ? [initialStyle] : []);
  const [styleInputValue, setStyleInputValue] = useState('');
  const [isStyleDropdownOpen, setIsStyleDropdownOpen] = useState(false);

  const allChecked = confirmMasterFiles && confirmOwnership;

  const handleSubmitPublish = () => {
    if (!allChecked) return;
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
      <PageContainer className="flex flex-col items-start lg:items-start w-full">


        <div className='w-full px-6 py-2 pb-6 lg:mt-8 mt-4 rounded-lg bg-gradient-to-b from-[#CCE7F2] via-[#A1DCF3] to-[#49C0F0] text-[#393939]'>
          <h1 className='text-[28px] text-[#393939] font-bold'>List a Design</h1>
          <p className='text-base'>
            Publish your design to the marketplace and set your licensing preferences. Only upload original work you have the right to commercialise.
          </p>
        </div>

        <div className='bg-[#FAFAFA] w-full text-[#222222] px-6 pt-[24px] pb-[32px] mt-7 mb-[99px] flex flex-col gap-6 rounded-lg'>
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
          <div className='flex flex-col gap-2'>
            <h3 className='text-lg font-semibold'>Design Style<span className='text-red-500 ml-0.5'>*</span></h3>

            <div className='relative w-full'>
              <input
                id='design-style-input'
                type='text'
                value={styleInputValue}
                placeholder='Enter category of your design, E.g Casual, etc. (Press Enter to add)'
                className='border-1 border-[#d1d1d1] rounded-lg px-3 py-2 text-base focus:outline-none focus:border-[#3A98BB] w-full'
                onChange={(e) => {
                  setStyleInputValue(e.target.value);
                  setIsStyleDropdownOpen(true);
                }}
                onFocus={() => setIsStyleDropdownOpen(true)}
                onBlur={() => {
                  setTimeout(() => setIsStyleDropdownOpen(false), 200);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (styleInputValue.trim()) {
                      const newStyle = styleInputValue.trim();
                      if (!designStyles.includes(newStyle)) {
                        setDesignStyles([...designStyles, newStyle]);
                      }
                      setStyleInputValue('');
                      setIsStyleDropdownOpen(false);
                    }
                  }
                }}
              />

              {/* Autocomplete Suggestions Dropdown */}
              {isStyleDropdownOpen && styleInputValue.trim() !== '' && (
                <div className='absolute top-full left-0 right-0 mt-1 bg-white border border-[#d1d1d1] rounded-lg shadow-lg max-h-60 overflow-y-auto z-10'>
                  {['Casual', 'Formal', 'Streetwear', 'Vintage', 'Bohemian', 'Minimalist', 'Avant-Garde', 'Sporty', 'Elegant', 'Preppy', 'Grunge', 'Chic', 'Romantic', 'Edgy', 'Classic']
                    .filter(s => s.toLowerCase().includes(styleInputValue.toLowerCase()))
                    .map((style) => (
                      <button
                        key={style}
                        type='button'
                        onClick={() => {
                          if (!designStyles.includes(style)) {
                            setDesignStyles([...designStyles, style]);
                          }
                          setStyleInputValue('');
                        }}
                        className='w-full text-left px-4 py-2 hover:bg-[#F0F0F0] transition-colors text-sm'
                      >
                        {style}
                      </button>
                    ))}
                </div>
              )}
            </div>

            {/* Tags display */}
            {designStyles.length > 0 && (
              <div className='flex flex-wrap gap-2 mt-1'>
                {designStyles.map((style, idx) => (
                  <div key={idx} className='flex items-center gap-1 bg-[#EAEAEA] text-[#222222] px-3 py-1.5 rounded-full text-sm font-medium'>
                    <span>{style}</span>
                    <button
                      type="button"
                      onClick={() => setDesignStyles(designStyles.filter((s) => s !== style))}
                      className='hover:text-red-500 ml-1 flex items-center justify-center rounded-full'
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 1. Public Preview Gallery */}
          <div className='flex flex-col gap-2'>
            <h3 className='text-lg font-bold text-[#222222]'>Upload Public Previews<span className='text-red-500 ml-0.5'>*</span></h3>
            <p className='text-sm'>
              Upload up to 5 preview images ( Front, Back, Details).
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
              <span className='font-bold text-[#E73131]'>Term Note:</span> To prevent unapproved use, prioritize watermaking. We provide a separate, private field for secure master file delivery.
            </p>
          </div>

          {/* 2. UPLOAD SOURCE FILE */}
          <div className='flex flex-col gap-2'>
            <div className='flex flex-col'>
              <div className='flex items-center gap-2'>
                <h3 className='text-lg font-bold text-[#222222]'>
                  Upload Source File<span className='text-red-500 ml-0.5'>*</span>
                </h3>
              </div>
              <p className='text-[15px] text-[#767676] mt-1'>
                Upload the complete specifications, documents and all necessary files regarding the design or collection.
              </p>
            </div>

            <div className='flex flex-col gap-4 mt-2'>
              {vaultFile && (
                <div className='bg-[#F4F4F4] rounded-lg px-4 py-2.5 flex items-center w-max gap-4'>
                  <div className='flex items-center gap-2 text-[#3A98BB]'>
                    <Paperclip className="w-4 h-4" />
                    <span className='font-bold text-[15px]'>{vaultFile.name}</span>
                  </div>
                  <button
                    type='button'
                    onClick={() => setVaultFile(null)}
                    className='text-[#222222] font-bold text-[15px] hover:opacity-70 transition-opacity'
                  >
                    Delete
                  </button>
                </div>
              )}

              <input
                type='file'
                accept='.zip,.ai,.eps,.psd,.pdf'
                className='hidden'
                id='vault-upload'
                onChange={handleVaultUpload}
              />

              <label
                htmlFor='vault-upload'
                className='w-full border-1 border-[#D1D1D1] rounded-lg min-h-[68px] py-2 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors'
              >
                <div className='flex items-center gap-2'>
                  <Paperclip className="w-5 h-5 text-[#3A98BB]" />
                  <span className='text-[#767676] text-[15px]'>Upload source file</span>
                </div>
                <p className='text-red-500 text-sm mt-1'>
                  Supported formats: .zip, .ai, .eps, .psd, .pdf (Max 100MB)
                </p>
              </label>
            </div>
          </div>



          {/* Asking Price */}
          <div className='flex flex-col gap-2'>
            <h3 className='text-lg font-semibold'>Asking Price<span className='text-red-500 ml-0.5'>*</span></h3>
            <div className='relative w-full lg:w-96'>
              <span className='absolute left-4 top-1/2 -translate-y-1/2 text-[#222222] font-medium pointer-events-none'>$</span>
              <input
                defaultValue={initialPrice}
                placeholder='0.00'
                className='border-1 border-[#d1d1d1] pl-8 pr-4 py-3 rounded-lg w-full'
              />
            </div>
          </div>

          {/* Licensing Option */}
          <div className='flex flex-col gap-2'>
            <h3 className='text-lg font-semibold'>Licensing Option<span className='text-red-500 ml-0.5'>*</span></h3>
            <Select
              placeholder='Select Licensing Option'
              className='w-full lg:w-[28rem]'
              popoverProps={{ placement: "bottom", shouldFlip: false }}
              classNames={{
                trigger: 'border-1 border-[#d1d1d1] bg-white hover:bg-default-100 px-4 py-6 rounded-lg shadow-none',
                value: 'text-base text-[#222222]',
              }}
            >
              <SelectItem key='exclusive' value='exclusive' textValue="Exclusive">
                <div className="flex flex-col gap-1 py-1 whitespace-normal">
                  <span className="font-bold text-base">Exclusive</span>
                  <span className="text-sm text-gray-500">Transfer all rights of ownership and use directly to a single buyer. The design will be permanently removed from the store after purchase.</span>
                </div>
              </SelectItem>
              <SelectItem key='non-exclusive' value='non-exclusive' textValue="Non Exclusive">
                <div className="flex flex-col gap-1 py-1 whitespace-normal">
                  <span className="font-bold text-base">Non Exclusive</span>
                  <span className="text-sm text-gray-500">Sell this design to multiple brands. You keep the rights and earn passive income.</span>
                </div>
              </SelectItem>
            </Select>
          </div>



          {/* Confirmation Checkboxes */}
          <div className='flex flex-col gap-4'>
            <div className='flex items-start gap-2'>
              <Checkbox
                isSelected={confirmMasterFiles}
                onValueChange={setConfirmMasterFiles}
              />
              <p className='text-sm font-medium text-[#222222]'>
                I confirm that my uploaded source files are original master files matching the public previews.
              </p>
            </div>

            <div className='flex items-start gap-2'>
              <Checkbox
                isSelected={confirmOwnership}
                onValueChange={setConfirmOwnership}
              />
              <p className='text-sm font-medium text-[#222222]'>
                I confirm I own all rights to this design, understand public previews are for display only, and accept responsibility for watermarking public images.{' '}
                <Link href='/terms-of-service?source=artist#p2-main' className='text-blue-600 underline font-normal'>
                  Learn More
                </Link>
              </p>
            </div>
          </div>
          <div className='flex flex-row gap-4 w-full justify-between lg:justify-start'>
            <CustomButton
              text='Save as Draft'
              className={`bg-[#F0F0F0] text-[#222222] flex-1 sm:flex-none sm:w-auto ${!allChecked ? 'opacity-40 cursor-not-allowed' : ''}`}
              style={{ background: '#EDEDED' }}
              isDisabled={!allChecked}
            />
            <CustomButton
              text='Publish'
              className={`flex-1 sm:flex-none sm:w-auto ${!allChecked ? 'opacity-40 cursor-not-allowed' : ''}`}
              style={{ color: '#035A7A' }}
              onPress={handleSubmitPublish}
              isDisabled={!allChecked}
            />
          </div>
        </div>
      </PageContainer>
      <PublishDesignPopUp isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};

export default License;
