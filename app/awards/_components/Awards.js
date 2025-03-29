'use client';
import { Form, Input } from '@heroui/react';
import Link from 'next/link';
import React, { useState } from 'react';
import CustomButton from '../../../components/CustomButton';

const Awards = () => {
  const [awardName, setAwardName] = useState('');
  const [awardedBy, setAwardedBy] = useState('');
  const [certificate, setCertificate] = useState(null);

  const handleAwardSubmit = () => {
    // Handle form submission logic here
    console.log('Award/Certificate:', awardName);
    console.log('Awarded/Issued by:', awardedBy);
    console.log('Uploaded Certificate:', certificate);
  };

  const handleFileUpload = (e) => {
    setCertificate(e.target.files[0]);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    setSubmitted(data);
  };
  return (
    <div className="flex justify-center items-center min-h-screen   border-1 border-[#DEDEDE] rounded-lg">
      <div className="bg-transparent  pl-8 pr-8  pt-8 pb-[42px] w-[1083px]   border-1 border-[#DEDEDE] rounded-lg">
        <h2 className="text-[16px] font-semibold mb-2 text-[#3A98BB]">Awards/Certification (Optional)</h2>
        <p className="text-red-400 mb-8 text-[12px]">Add to increase your chances.</p>

      
        <Form className="w-full" validationBehavior="native" onSubmit={onSubmit}>
        <div className='w-full'>
      <Input
        errorMessage="Please enter a valid skills"
        label="Name of Awards/Certificate"
        labelPlacement="outside"
        name="name"
        placeholder="Eg Best Illustrator Award"
        type="name"
        className='w-full  rounded-[8px]'
      />
      </div>
      <div className='w-full mt-4'>
      <Input
        errorMessage="Please enter a valid skills"
        label="Awarded/Issued by"
        labelPlacement="outside"
        name="name"
        placeholder="Organization that issued/awarded"
        type="name"
        className='w-full  rounded-[8px]'
      />
      </div>
      <div className="mt-4 w-full">
          <label className="block text-[12px] font-medium mb-2 text-[#444444]">Upload Certificate/Award (Optional)</label>
          <div className="border border-dashed border-gray-300 rounded-md p-6 h-40 flex items-center justify-center cursor-pointer">
            <input
              type="file"
              className="hidden"
              id="certificateUpload"
              onChange={handleFileUpload}
            />
            <label htmlFor="certificateUpload" className="flex items-center cursor-pointer">
              <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.672 7.21159L9.08602 13.7976C8.895 13.9821 8.74264 14.2028 8.63782 14.4468C8.533 14.6908 8.47783 14.9532 8.47552 15.2188C8.47321 15.4843 8.52381 15.7477 8.62438 15.9935C8.72494 16.2393 8.87344 16.4626 9.06123 16.6504C9.24902 16.8382 9.47232 16.9867 9.71811 17.0872C9.9639 17.1878 10.2273 17.2384 10.4928 17.2361C10.7584 17.2338 11.0208 17.1786 11.2648 17.0738C11.5088 16.969 11.7295 16.8166 11.914 16.6256L18.328 10.0396C19.0567 9.28518 19.4598 8.27477 19.4507 7.22598C19.4416 6.1772 19.0209 5.17395 18.2793 4.43232C17.5377 3.69068 16.5344 3.27001 15.4856 3.26089C14.4368 3.25178 13.4264 3.65496 12.672 4.38359L6.25702 10.9686C5.13171 12.0939 4.49951 13.6202 4.49951 15.2116C4.49951 16.803 5.13171 18.3293 6.25702 19.4546C7.38233 20.5799 8.90859 21.2121 10.5 21.2121C12.0915 21.2121 13.6177 20.5799 14.743 19.4546L21 13.2116" stroke="#3A98BB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className='text-[#878787] text-[12px] ml-2'>Click to upload file</span>
            </label>
          </div>
        </div>
        <div className="flex justify-end gap-8  mt-6 font-bold w-full">
          <button
            className=" text-[#3A98BB] py-2 px-4 rounded-full"
            onClick={() => console.log('Skipped')}
          >
            Skip
          </button>
          <CustomButton text='Submit' className="w-32" href="/jobpost" />
        </div>
        </Form>


        {/* Action Buttons */}
      </div>
    </div>
  );
};

export default Awards;
;
