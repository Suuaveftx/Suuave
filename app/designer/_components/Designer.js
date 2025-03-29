'use client'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaUser, FaUpload, FaShoppingBag } from 'react-icons/fa';
import CustomButton from '../../../components/CustomButton';

const Designer = () => {
  return (
    <div className="flex items-center justify-between h-screen">
      {/* Left section with text and icons */}
      <div className="flex flex-col justify-center p-6 w-full max-w-md h-screen">
        <h1 className="text-[32px] font-bold">Hi Kate,</h1>
        <p className="mt-2 text-gray-600 font-bold text-[16px]">
          To begin, let&apos;s take a moment to  <br/> complete  your profile setup.
        </p>

        {/* Complete Profile Setup */}
        <div className="flex items-center mt-6 space-x-2 gap-4 pt-[20px] pb-[20px]">
          <Image src={"/dev-images/icon1.png"} alt='user' width={24} height={24} />
          <span className="text-gray-700 text-[16px]">Complete Profile Setup</span>
        </div>
        <hr className="my-2 border-gray-300" />

        {/* Upload Sample Works */}
        <div className="flex items-center mt-6 space-x-2 gap-4 pt-[20px] pb-[20px] ">
        <Image src={"/dev-images/icon2.png"} alt='upload' width={24} height={24} />
          <span className="text-gray-700 text-[16px]">Upload necessary document</span>
        </div>
        <hr className="my-2 border-gray-300" />

        {/* Apply for Jobs */}
        <div className="flex items-center mt-6 space-x-2 gap-4 pt-[20px] pb-[20px]">
        <Image src={"/dev-images/icon3.png"} alt='bag' width={24} height={24} />
          <span className="text-gray-700 text-[16px]">Post jobs, and get license to use readily-available designs</span>
        </div>
        <hr className="my-2 border-gray-300" />

        {/* Continue Button */}
        <Link href={"/personalprofile2"}>
       <CustomButton text='continue' className="w-32 mt-4" />
        </Link>
      </div>

       {/* Right section with background image */}
  <div
    className="hidden md:block bg-cover bg-center rounded-2xl"
    style={{
      width: "520px",
      height: "520px",
      backgroundImage: "url('/dev-images/Fashion.png')", // Replace with your background image path
    }}
  />
</div>
  );
};

export default Designer;
