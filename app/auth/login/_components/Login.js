'use client';
import React, { useState } from 'react';
import { FaLock } from 'react-icons/fa'; 
import { HiOutlineMail } from 'react-icons/hi'; 
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5'; 
import Image from 'next/image';
import Link from 'next/link';
import CustomButton from '../../../../components/CustomButton';

const Login = () => {
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
      

      {/* Background image hidden on mobile */}
      <div className="mt-8 sm:block hidden">
        <Image src="/dev-images/bg.png" alt="Background Image" width={500} height={500} className="rounded-lg w-[500px] h-[500px]" />
      </div>
    </div>

    {/* Right section for Email Sign In */}
{/* Back Arrow - Positioned Outside Only on Mobile */}
{/* Mobile View: Logo & Back Arrow Outside */}
<div className="sm:hidden flex justify-center mt-4">
  <Image src="/dev-images/logo.png" alt="Logo" width={60} height={60} />
</div>

<div className="sm:hidden absolute left-4 top-4">
  <Image src="/dev-images/ArrowLeft.png" alt="Back Arrow" width={24} height={24} className="cursor-pointer" />
</div>

{/* Desktop View: Everything Inside the Container */}
<div
  className="relative flex flex-col justify-center items-center bg-white shadow-[0px_4px_16px_0px_rgba(0,0,0,0.15)] pl-[32px] pr-[32px] pt-[45px] pb-[45px] sm:mt-0 mt-[30px] w-80 lg:w-96"
  style={{ borderRadius: '16px' }}
>
  {/* Desktop: Back Arrow at the Far Left */}
  <div className="hidden sm:flex w-full">
    <Image src="/dev-images/ArrowLeft.png" alt="Back Arrow" width={24} height={24} className="cursor-pointer" />
  </div>

  {/* Desktop: Logo Centered */}
  <div className="hidden sm:flex items-center w-full justify-center mb-4">
    <Image src="/dev-images/logo.png" alt="Logo" width={60} height={60} />
  </div>

  {/* Desktop: Welcome Text Centered */}
  <h1 className="hidden sm:block text-xl font-semibold text-[#444444] text-center">
    Welcome back
  </h1>

  {/* Mobile: Welcome Text */}
  <h1 className="text-xl font-semibold text-[#444444] text-center block sm:hidden">
    Welcome to Suuave
  </h1>

  <div className="w-full">
    {/* Input Fields */}
    <div className="relative mt-4">
      <label className="absolute left-3 -mt-3 text-gray-500 text-sm transition-all duration-200 transform origin-left">
        Email
      </label>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full h-12 border border-gray-300 rounded-md pl-[8px] pr-[8px] pt-[10px] pb-[10px] focus:outline-none focus:border-[#9FD2E5] placeholder-transparent"
        placeholder=" "
      />
      <HiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
    </div>

    {/* Password Input */}
    <div className="relative mt-8">
      <label className="absolute left-3 -mt-3 text-gray-500 text-sm transition-all duration-200 transform origin-left">
        Password
      </label>
      <input
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full h-12 border border-gray-300 rounded-md pl-[8px] pr-[8px] pt-[12px] pb-[12px] focus:outline-none focus:border-[#9FD2E5] placeholder-transparent"
        placeholder=" "
      />
      <Image src={"/dev-images/Lock.png"} alt="lock" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" width={20} height={20} />
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
    <div className="flex justify-center">
      <CustomButton text="Login" className="w-96" href="/artist-page/welcome-page" />
    </div>

    {/* Don't have an account prompt */}
    <p className="text-center text-[12px] text-gray-600 mt-4">
      Don&apos;t have an account?{" "}
      <Link href={"/signin"} className="text-[#9FD2E5] hover:underline">
        Create account
      </Link>
    </p>
  </div>
</div>



  </div>
</div>

  
  
  );
};

export default Login;
