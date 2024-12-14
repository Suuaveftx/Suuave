'use client';
import React, { useState } from 'react';
import { FaLock } from 'react-icons/fa'; 
import { HiOutlineMail } from 'react-icons/hi'; 
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5'; 
import Image from 'next/image';
import Link from 'next/link';

const EmailSignin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    console.log("Login clicked with Email:", email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
  <div className="flex flex-col sm:flex-row justify-center  items-center w-full max-w-6xl">
    {/* Left section with logo and background image */}
    <div className="flex flex-col items-center sm:items-start justify-center p-6 sm:p-0 sm:mr-10" style={{  borderRadius: '16px' }}>
      {/* Logo centered on mobile with larger size */}
      <img 
        src="/dev-images/logo.png" 
        alt="Logo" 
        width={60} // Increased size on mobile
        height={60} // Increased size on mobile
        className="mb-2 sm:mb-0" // Reduced margin-bottom on mobile to decrease the gap
      />

      {/* Background image hidden on mobile */}
      <div className="mt-8 sm:block hidden">
        <img src="/dev-images/bg.png" alt="Background Image" width={574} height={700} className="rounded-lg" />
      </div>
    </div>

    {/* Right section for Email Sign In */}
    <div
      className="flex flex-col justify-center items-center bg-white shadow-lg pl-[32px] pr-[32px] pt-[45px] pb-[45px] sm:mt-0 mt-[30px]" // Adjusted margin-top for mobile
      style={{ width: '446px', height: '460px', borderRadius: '16px' }} // Adjusted height for Email Sign In
    >
      <div className="w-full p-6">
        {/* Back Arrow and Welcome Message */}
        <div className="flex items-center mb-[35px] cursor-pointer mt-[45px]">
          <Image src="/dev-images/ArrowLeft.png" alt="Back Arrow" width={24} height={24} className="mr-2" />
          <span className="text-xl font-semibold ml-8 text-[#444444]">Welcome to Suuave</span>
        </div>

        {/* Input Fields */}
        <div className="relative mb-8">
          <label className="absolute left-3 -mt-3 text-gray-500 text-sm transition-all duration-200 transform origin-left">
            Email
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 border border-gray-300 rounded-md pl-[8px] pr-[8px] pt-[10px] pb-[10px] focus:outline-none focus:border-[#9FD2E5] placeholder-transparent"
            placeholder=" " // Placeholder for label effect
          />
          <HiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
        </div>

        {/* Password Input */}
        <div className="relative mb-2">
          <label className="absolute left-3 -mt-3 text-gray-500 text-sm transition-all duration-200 transform origin-left">
            Password
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-12 border border-gray-300 rounded-md pl-[8px] pr-[8px] pt-[12px] pb-[12px] focus:outline-none focus:border-[#9FD2E5] placeholder-transparent"
            placeholder=" " // Placeholder for label effect
          />
          <Image src={"/dev-images/Lock.png"} alt='lock' className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" width={20} height={20} />
          {showPassword ? (
            <IoEyeOffOutline
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              size={20}
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <IoEyeOutline
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              size={20}
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>

        {/* Forgot Password */}
        <div className="flex justify-end mb-8">
          <Link href="#" className="text-[12px] text-[#9FD2E5] hover:underline">
            Forgot password?
          </Link>
        </div>

        {/* Login Button */}
        <Link href={"/fashionartist"}>
          <button
            onClick={handleLogin}
            className="w-full pl-[24px] pr-[24px] pt-[16px] pb-[16px] bg-[#9FD2E5] text-[#444444] rounded-full  transition duration-300 text-[12px] mb-[24px]"
          >
            Login
          </button>
        </Link>

        {/* Don't have an account prompt */}
        <p className="text-center text-[12px] text-gray-600 mb-[45px]">
          Don't have an account?{" "}
          <Link href={"/signin"} className="text-[#9FD2E5] hover:underline"> Create account</Link>
        </p>
      </div>
    </div>
  </div>
</div>

  
  
  );
};

export default EmailSignin;
