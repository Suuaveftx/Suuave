'use client';
import Link from 'next/link';
import React from 'react';

const Flogin = () => {

  const handleEmailLogin = () => {
    // Logic for handling email login
    console.log("Login with Email clicked");
  };

  const handleGoogleLogin = () => {
    // Logic for handling Google login
    console.log("Login with Google clicked");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="flex justify-between items-center w-full max-w-6xl">
        {/* Left section with logo and background image */}
        <div className="flex flex-col items-start justify-center p-6" style={{ width: '574px', height: '700px', borderRadius: '16px' }}>
          <img src="/dev-images/logo.png" alt="Logo" width={40} height={40} />
          <div className="mt-8">
            <img src="/dev-images/bg.png" alt="Background Image" width={574} height={700} className="rounded-lg" />
          </div>
        </div>

        {/* Right section for Login with border */}
        <div
          className="flex flex-col justify-center items-center bg-white"
          style={{ width: '446px', height: '360px', border: '1px solid #D1D1D1', borderRadius: '16px' }}
        >
          <div className="w-full p-6">
            <h1 className="text-2xl font-semibold text-[#444444] mb-[24px] text-center mt-[45px]">Login</h1>

            {/* Login with Email */}
            <div className='mb-auto'>
              <Link href={"/signin2"}>
            <button
              onClick={handleEmailLogin}
              className="flex items-center justify-center gap-4 w-full pl-[24px] pr-[24px] pt-[12px] pb-[12px] border border-gray-300 font-normal text-[#444444] rounded-md mb-4 text-[12px]"
            >
              <img src="/dev-images/Mail.png" alt="Email Icon" width={20} height={20} className="mr-2" />
              Sign in with Email
            </button>
            </Link>
            {/* Login with Google */}
            <button
              onClick={handleGoogleLogin}
              className="flex items-center justify-center gap-4 w-full pl-[24px] pr-[24px] pt-[12px] pb-[12px] text-sm font-medium text-gray-600 border border-gray-300 rounded-lg mb-16 hover:bg-gray-50 text-[12px]"
            >
              <img src="/dev-images/Google.png" alt="Google Logo" width={20} height={20} className="mr-2" />
              Login with Google
            </button>
            </div>
            {/* Create Account link */}
            <p className="text-center text-[12px] text-gray-600">
              Don't have an account?{" "}
              <Link href={"/signup"} className="text-[#9FD2E5] hover:underline">
            Create account
            </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flogin;
