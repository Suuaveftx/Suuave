'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import {InputOtp} from "@heroui/react";
import CustomButton from '../../../components/CustomButton';

const Otp = () => {
  const [value, setValue] = React.useState("");

  return (
    <div className="lg:min-h-screen flex items-center lg:justify-center p-6">
      <div className="flex flex-col md:flex-row items-center w-full max-w-6xl gap-12">
        {/* Left section with logo and background image, hidden on mobile */}
        <div className="flex flex-col items-start justify-center p-6 md:w-[574px] md:h-[700px] w-full h-auto md:mb-0 mb-8">

  <div className="mt-8 md:block hidden">
    <Image
      src="/dev-images/bg.png" 
      alt="Background Image" 
      className="rounded-lg w-full h-auto md:w-[574px] md:h-[700px]" 
      width={574}
      height={700}
    />
  </div>
</div>


        {/* Right section for OTP confirmation */}
        <div
  className="flex flex-col mt-[-80px] items-start pl-4 pr-4 pt-[45px] pb-[45px] bg-white shadow-[0px_4px_16px_0px_rgba(0,0,0,0.15)] md:pl-8 md:pr-8 md:pt-11 md:pb-11 rounded-lg"
>
  {/* Inner content wrapper */}
  <div className="w-full flex flex-col items-start">
    <h1 className="text-[22px] font-semibold text-[#444444]">
      Confirm your email address
    </h1>
    <p className="text-[#727272] w-[304px]">
      Kindly enter the six (6) digit code sent to your email address.
    </p>

    {/* OTP input fields */}
    <div className="flex flex-col items-start gap-2">
      <InputOtp length={6} value={value} onValueChange={setValue} />
      <div className="text-small text-default-500">
        Didn’t receive code? <span className="text-md font-medium">Resend</span>
      </div>
    </div>
  </div>
  <div className="mt-4">
    <CustomButton text="Submit" className="w-72" href="/login" />
  </div>
</div>


      </div>
    </div>
  );
};

export default Otp;
