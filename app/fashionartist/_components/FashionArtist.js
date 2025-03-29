'use client'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaUser, FaUpload, FaShoppingBag } from 'react-icons/fa';
import CustomButton from '../../../components/CustomButton';

const FashionArtist = () => {
  return (
<div className="flex items-start justify-between h-screen">
  {/* Left section with text and icons */}
  <div className="p-4 sm:p-0 self-start">
    <div className="flex flex-col max-w-md border border-gray-400 shadow-md rounded-[8px] sm:shadow-none sm:border-none pl-4 pr-4 pt-[24px] pb-[40px]">
      <h1 className="text-2xl font-bold">Hi Kate,</h1>
      <p className=" text-gray-600 font-bold text-2xl">
        To begin, let&apos;s take a moment to complete your <br/> profile set-up.
      </p>

      {/* Complete Profile Setup */}
      <div className="flex items-center mt-6 gap-2 pt-[20px] pb-[20px]">
        <Image src={"/dev-images/icon1.png"} alt="user" width={24} height={24} />
        <span className="text-gray-700 text-[16px]">Complete Profile Setup</span>
      </div>
      <hr className="border-gray-300" />

      {/* Upload Sample Works */}
      <div className="flex items-center mt-6 gap-4 pt-[20px] pb-[20px]">
        <Image src={"/dev-images/icon2.png"} alt="upload" width={24} height={24} />
        <span className="text-gray-700 text-[16px]">
          Upload Sample Works / Necessary Documents
        </span>
      </div>
      <hr className="border-gray-300" />

      {/* Apply for Jobs */}
      <div className="flex items-center mt-6 gap-4 pt-[20px] pb-[20px]">
        <Image src={"/dev-images/icon3.png"} alt="bag" width={24} height={24} />
        <span className="text-gray-700 text-[16px]">
          Apply for Jobs and License Your Design
        </span>
      </div>
      <hr className="border-gray-300" />

      {/* Continue Button */}
      <div className="mt-8">
        <CustomButton text="continue" href="/personalprofile" className="lg:w-32 w-full" />
      </div>
    </div>
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

export default FashionArtist;
