'use client';
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
      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-6xl">
        {/* Left section with logo and background image */}
        <div className="flex flex-col items-center justify-center p-6 md:w-[574px] md:h-[700px] w-full h-auto md:mb-0 mb-4"> {/* Reduced bottom margin on mobile */}
          {/* Logo aligned left on desktop, centered on mobile */}
          <div className="md:flex md:justify-start md:mb-0 mb-4 w-full flex justify-center"> {/* Reduced top margin on mobile */}
            <img src="/dev-images/logo.png" alt="Logo" width={70} height={60} className="md:w-[60px] md:h-[50px]" /> {/* Reduced logo size on desktop */}
          </div>
          {/* Background image hidden on mobile */}
          <div className="md:block hidden mt-8">
            <img src="/dev-images/bg.png" alt="Background Image" className="rounded-lg w-full h-auto" />
          </div>
        </div>

        {/* Right section for Login with border */}
        <div
          className="flex flex-col justify-center items-center bg-white p-6 w-full max-w-[90%] md:w-[446px] md:h-[360px] border border-gray-300 rounded-lg"
        >
          <div className="w-full">
            <h1 className="text-2xl font-semibold text-[#444444] mb-[24px] text-center mt-[45px]">Login</h1>

            {/* Login with Email */}
            <div>
              <Link href={"/emailsignin"}>
                <button
                  onClick={handleEmailLogin}
                  className="flex items-center justify-center gap-4 w-full pl-[24px] pr-[24px] pt-[12px] pb-[12px] border border-gray-300 font-normal text-[#444444] rounded-md mb-4 text-[12px]"
                >
                  <img src="/dev-images/Mail.png" alt="Email Icon" width={20} height={20} className="mr-2" />
                  Sign in with Email
                </button>
              </Link>
            </div>
            {/* Login with Google */}
            <button
              onClick={handleGoogleLogin}
              className="flex items-center justify-center gap-4 w-full pl-[24px] pr-[24px] pt-[12px] pb-[12px] text-sm font-medium text-gray-600 border border-gray-300 rounded-lg mb-16 hover:bg-gray-50 text-[12px]"
            >
              <img src="/dev-images/Google.png" alt="Google Logo" width={20} height={20} className="mr-2" />
              Login with Google
            </button>

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

export default Login;
