'use client';
import React, { useState } from 'react';
import { Input, Textarea, Select, Checkbox, SelectItem } from '@heroui/react';
import { CiImageOn } from 'react-icons/ci';
import CustomButton from '../../../../components/CustomButton';
import Link from 'next/link';
import { color } from 'framer-motion';
import { useDisclosure } from '@heroui/react';
import PublishDesignPopUp from './PublishDesignPopUp';
const License = () => {
  const [errors, setErrors] = React.useState({});
  const [images, setImages] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleSubmitPublish = () => {
    onOpen();
  };
  const handleUpload = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages((prev) => [...prev, ...filesArray]);
    }
  };

  return (
    <>
      <div>
        <div className='lg:w-4/5 w-full max-w-[90%] px-6 py-2 lg:mx-16 mx-4 mt-8 rounded-lg bg-gradient-to-b from-[#CCE7F2] via-[#A1DCF3] to-[#49C0F0] text-[#393939]'>
          <h1 className='text-[34px] text-[#393939] font-bold'>License Your Design</h1>
          <p className='text-base'>
            Ensure you are the original creator or rightful owner of the design you wish
            to upload. Uploading someone else’s work without permission may infringe their
            copyright. By uploading, you confirm you have the necessary rights and
            permissions.{' '}
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
                Design Title
              </label>
              <input
                id='designTitle'
                name='name'
                type='text'
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
                Design Description
              </label>
              <textarea
                id='design-description'
                placeholder='Describe your design in detail'
                className='w-full h-40 p-3 border rounded-md  focus:outline-none'
              />
            </div>
          </div>

          {/* Fashion Style */}
          <div className='flex flex-col gap-2'>
            <h3 className='text-lg font-semibold'>Design Style</h3>
            <Input
              placeholder='Enter category'
              className='border-1 border-[#d1d1d1] rounded-lg'
            />
          </div>

          {/* Upload Your Designs */}
          <div className='flex flex-col gap-2'>
            <h3 className='text-lg font-semibold'>Upload Your Designs</h3>
            <p className='text-sm'>
              Uploading different views (e.g., front, back, and side views) helps attract
              potential clients faster.
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
              {/* Show 2 items on mobile */}
              <div className='flex gap-4 md:hidden'>
                {images.slice(0, 2).map((file, i) => (
                  <div
                    key={i}
                    className='w-[110px] h-[110px] bg-gray-200 rounded flex items-center justify-center overflow-hidden'
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`upload-${i}`}
                      className='object-cover w-full h-full'
                    />
                  </div>
                ))}

                {/* Empty slots (clickable icons) */}
                {[...Array(2 - images.length)].map((_, i) => (
                  <label
                    key={i}
                    htmlFor='design-upload'
                    className='w-[110px] h-[110px] bg-gray-200 rounded flex items-center justify-center text-3xl cursor-pointer'
                  >
                    <CiImageOn />
                  </label>
                ))}
              </div>

              {/* Show 5 items on md+ (desktop) */}
              <div className='hidden md:flex gap-4'>
                {images.slice(0, 5).map((file, i) => (
                  <div
                    key={i}
                    className='w-[110px] h-[110px] bg-gray-200 rounded flex items-center justify-center overflow-hidden'
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`upload-${i}`}
                      className='object-cover w-full h-full'
                    />
                  </div>
                ))}

                {/* Empty slots (clickable icons) */}
                {[...Array(5 - images.length)].map((_, i) => (
                  <label
                    key={i}
                    htmlFor='design-upload'
                    className='w-[110px] h-[110px] bg-gray-200 rounded flex items-center justify-center text-3xl cursor-pointer'
                  >
                    <CiImageOn />
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Asking Price */}
          <div className='flex flex-col gap-2'>
            <h3 className='text-lg font-semibold'>Asking Price</h3>
            <input
              placeholder='0.0 $'
              className='border-1 border-[#d1d1d1] px-4 py-3 rounded-lg w-96'
            />
          </div>

          {/* Choose Sales Type */}

          {/* Confirmation Checkbox */}
          <div className='flex items-start gap-2'>
            <Checkbox />
            <p className='text-sm'>
              By publishing, you confirm you have the necessary rights and permission to
              the ownership of this design.{' '}
              <a href='#' className='text-blue-600 underline'>
                Learn More
              </a>
            </p>
          </div>
          <div className='flex gap-4 w-full lg:justify-start justify-center'>
            <CustomButton
              text='Save as Draft'
              className='bg-[#F0F0F0] text-[#222222] lg:hidden'
              style={{
                background: '#EDEDED',
              }}
            />
            <CustomButton
              text='Publish Project'
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
