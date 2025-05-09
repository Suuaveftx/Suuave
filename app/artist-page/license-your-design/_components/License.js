'use client'
import React from 'react';
import { Input, Textarea, Select, Checkbox, SelectItem } from '@heroui/react';
import { Image } from 'lucide-react';
import CustomButton from '../../../../components/CustomButton';


const License = () => {
    const [errors, setErrors] = React.useState({});
  
    return (
        <div>
            <div className='w-4/5 p-4 ml-8 mt-8 rounded-lg bg-gradient-to-b from-[#CCE7F2] via-[#A1DCF3] to-[#49C0F0]'>
                <h1 className='text-3xl font-bold'>License Your Design</h1>
                <p className='text-base'>Ensure you are the original creator or rightful owner of the design you wish to upload. Uploading someone else’s work without permission may infringe their copyright.
                    By uploading, you confirm you have the necessary rights and permissions. Learn more
                </p>
            </div>
            
            <div className='bg-[#FAFAFA] border-1 border-[#DDDDDD] p-4 w-4/5 ml-8 mt-4 flex flex-col gap-6'>
                {/* Design Title & Description */}
                <div className='flex flex-col gap-4 w-full'>
                    <Input
                        errorMessage={({ validationDetails }) => validationDetails.valueMissing ? "Please enter your name" : errors.name}
                        label="Design Title"
                        labelPlacement="outside"
                        name="name"
                        placeholder="What is the title of your design?"
                        className='font-bold border-2 border-[#d1d1d1] rounded-lg'
                    />
                    <Textarea
                        className="w-full font-bold"
                        label="Design Description"
                        labelPlacement="outside"
                        placeholder="Describe your design in detail"
                    />
                </div>
                
                {/* Fashion Style */}
                <div className='flex flex-col gap-2'>
                    <h3 className='text-lg font-semibold'>Fashion Style</h3>
                    <p className='text-sm'>Enter category of your designs e.g. Casual, Formal, etc.</p>
                    <Input placeholder='Enter category' className='border-2 border-[#d1d1d1] rounded-lg' />
                </div>
                
                {/* Upload Your Designs */}
                <div className='flex flex-col gap-2'>
                    <h3 className='text-lg font-semibold'>Upload Your Designs</h3>
                    <p className='text-sm'>Uploading different views (e.g., front, back, and side views) helps attract potential clients faster.</p>
                    <div className="flex gap-16  whitespace-nowrap">
    {[...Array(5)].map((_, index) => (
        <div key={index} className="border-2 border-[#d1d1d1] rounded-lg p-4 flex flex-col items-center justify-center gap-1 cursor-pointer w-[110px] h-[110px]">
            <Image size={24} className="text-gray-500" alt="image-upload" />
        </div>
    ))}
</div>

                </div>
                
                {/* Asking Price */}
                <div className='flex flex-col gap-2'>
                    <h3 className='text-lg font-semibold'>Asking Price</h3>
                    <Input placeholder='0.0 $' className='border-2 border-[#d1d1d1] rounded-lg' />
                </div>
                
                {/* Choose Sales Type */}
                <div className='flex flex-col gap-2'>
                    <h3 className='text-lg font-semibold'>Choose Sales Type</h3>
                    <Select placeholder="Negotiable" className="border-2 border-[#d1d1d1] rounded-lg">
    <SelectItem key="exclusive">Exclusive Rights</SelectItem>
    <SelectItem key="non-exclusive">Non-Exclusive Rights</SelectItem>
    <SelectItem key="subscription">Subscription</SelectItem>
</Select>


                </div>
                
                {/* Confirmation Checkbox */}
                <div className='flex items-start gap-2'>
                    <Checkbox />
                    <p className='text-sm'>By publishing, you confirm you have the necessary rights and permission to the ownership of this design. <a href="#" className='text-blue-600 underline'>Learn More</a></p>
                </div>
                <div className='flex gap-4'>
                  <CustomButton text='Save as Draft' className="bg-[#F0F0F0] text-[#222222]" />
                  <CustomButton text='Publish Project' />
                </div>
            </div>
        </div>
    );
};

export default License;
