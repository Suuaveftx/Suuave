'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Login = () => {

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
      <div className="flex flex-col md:flex-row gap-12 items-center w-full max-w-6xl">
        {/* Left section with logo and background image */}
        <div className="flex flex-col items-center justify-center p-6 md:w-[574px] md:h-[700px] w-full h-auto md:mb-0 mb-4"> {/* Reduced bottom margin on mobile */}
         
          {/* Background image hidden on mobile */}
          <div className="md:block hidden mt-8">
            <Image src="/dev-images/bg.png" alt="Background Image" className="rounded-lg w-full h-auto" width={594} height={707} />
          </div>
        </div>

        {/* Right section for Login with border */}
        <div
          className="flex flex-col justify-center items-center bg-white pl-[32px] pr-[32px] pt-[45px] pb-[45px] border-2 border-gray-300 shadow-md rounded-lg"
        >
          <div className='mt-[45px]'>
            <Image
            src={"/dev-images/logo.png"} alt='logo' width={80} height={80 } />
          </div>
          <div className="w-full">
            <h1 className="text-2xl font-semibold text-[#444444] mb-[24px] text-center mt-2">Suuave</h1>

            {/* Login with Email */}
            <div>
              <Link href={"/emailsignin"}>
                <button
                  onClick={handleEmailLogin}
                  className="flex items-center justify-center gap-4 w-96 pl-[24px] pr-[24px] pt-[12px] pb-[12px] border border-gray-300 font-normal text-[#444444] rounded-md mt-6 text-base"
                >
                  <Image src="/dev-images/Mail.png" alt="Email Icon" width={20} height={20} className="mr-2" />
                  Sign in with Email
                </button>
              </Link>
            </div>
            {/* Login with Google */}
            <button
              onClick={handleGoogleLogin}
              className="flex items-center justify-center gap-4 w-full pl-[24px] pr-[24px] pt-[12px] pb-[12px] text-sm font-medium text-gray-600 border border-gray-300 rounded-lg mt-4 hover:bg-gray-50 text-[12px]"
            >
              <Image src="/dev-images/Google.png" alt="Google Logo" width={20} height={20} className="mr-2" />
              Continue with Google
            </button>

            {/* Create Account link */}
            <p className="text-[12px] text-gray-600 mt-9 mb-[45px]">
              Don&apos;t have an account?{" "}
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

export default Login;
