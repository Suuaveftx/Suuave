'use client'
import React from 'react';
import { Input, Textarea, Select, Checkbox, SelectItem } from '@heroui/react';
import { CiImageOn } from "react-icons/ci";
import CustomButton from '../../../../components/CustomButton';
import Link from 'next/link';
import { color } from 'framer-motion';


const License = () => {
    const [errors, setErrors] = React.useState({});
  
    return (
        <div>
            <div className='lg:w-full w-full max-w-[90%] px-6 py-2 lg:mx-16 mx-4 mt-8 rounded-lg bg-gradient-to-b from-[#CCE7F2] via-[#A1DCF3] to-[#49C0F0] text-[#393939]'>
                <h1 className='text-[34px] font-bold'>License Your Design</h1>
                <p className='text-base text-[#393939]'>Ensure you are the original creator or rightful owner of the design you wish to upload. Uploading someone else’s work without permission may infringe their copyright.
                    By uploading, you confirm you have the necessary rights and permissions. <Link className='text-[#3A98BB]' href={"/"}>Learn more </Link> 
                </p>
            </div>
            
            <div className='bg-[#FAFAFA] border-1 border-[#DDDDDD]  w-full max-w-[90%] text-[#222222] lg:mx-16 mx-4 px-6 pt-[24px] pb-[32px] mt-7 mb-[99px] flex flex-col gap-6 rounded-[8px]'>
                {/* Design Title & Description */}
                <div className='flex flex-col gap-4 w-full'>
                    <Input
                        errorMessage={({ validationDetails }) => validationDetails.valueMissing ? "Please enter your name" : errors.name}
                        label="Design Title"
                        labelPlacement="outside"
                        name="name"
                        placeholder="What is the title of your design?"
                        className='font-bold border-2 border-[#d1d1d1] rounded-lg text-base'
                    />
                   <div className="w-full">
  <label htmlFor="design-description" className="block text-base font-semibold mb-2">
    Design Descriptions
  </label>
  <textarea
    id="design-description"
    placeholder="Describe your design in detail"
    className="w-full h-40 p-3 border rounded-md  focus:outline-none"
  />
</div>

                </div>
                
                {/* Fashion Style */}
                <div className='flex flex-col gap-2'>
                    <h3 className='text-lg font-semibold'>Design Style</h3>
                    <Input placeholder='Enter category' className='border-2 border-[#d1d1d1] rounded-lg' />
                </div>
                
                {/* Upload Your Designs */}
                <div className='flex flex-col gap-2'>
                    <h3 className='text-lg font-semibold'>Upload Your Designs</h3>
                    <p className='text-sm'>Uploading different views (e.g., front, back, and side views) helps attract potential clients faster.</p>
<div>
      {/* Show 2 items on mobile */}
      <div className="flex gap-4 md:hidden">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="w-[110px] h-[110px] bg-gray-200 rounded flex items-center justify-center text-3xl"
          >
            <CiImageOn />
          </div>
        ))}
      </div>

      {/* Show 5 items on md+ (desktop) */}
      <div className="hidden md:flex gap-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-[110px] h-[110px] bg-gray-200 rounded flex items-center justify-center text-3xl"
          >
            <CiImageOn />
          </div>
        ))}
      </div>
    </div>

                </div>
                
                {/* Asking Price */}
                <div className='flex flex-col gap-2'>
                    <h3 className='text-lg font-semibold'>Asking Price</h3>
                    <Input placeholder='0.0 $' className='border-2 border-[#d1d1d1] rounded-lg lg:w-full lg:max-w-[50%]' />
                </div>
                
                {/* Choose Sales Type */}
                <div className='flex flex-col gap-2'>
                    <h3 className='text-lg font-semibold hidden'>Choose Sales Type</h3>
                    
                </div>
                
                {/* Confirmation Checkbox */}
                <div className='flex items-start gap-2'>
                    <Checkbox />
                    <p className='text-sm'>By publishing, you confirm you have the necessary rights and permission to the ownership of this design. <a href="#" className='text-[#3A98BB]'>Learn More</a></p>
                </div>
                <div className='flex gap-4 w-full lg:justify-start justify-center'>
                  <CustomButton text='Save as Draft' className="bg-[#F0F0F0] text-[#222222] lg:hidden" style={{
                    background: "#EDEDED"
                  }} />
                  <CustomButton text='Publish' style={{
                    color: "#035A7A",
                  }} />
                </div>
            </div>
        </div>
    );
};

export default License;
