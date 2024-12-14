'use client';
import Link from 'next/link';
import React, { useState } from 'react';

const Otp = () => {
  const [otp, setOtp] = useState(new Array(6).fill(''));

  const handleOtpChange = (e, index) => {
    if (isNaN(e.target.value)) return;
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);

    // Move to the next input if current is filled
    if (e.target.value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleResend = () => {
    console.log("Resend OTP");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
    console.log("OTP submitted:", otpCode);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-6xl">
        {/* Left section with logo and background image, hidden on mobile */}
        <div className="flex flex-col items-start justify-center p-6 md:w-[574px] md:h-[700px] w-full h-auto md:mb-0 mb-8">
  <img 
    src="/dev-images/logo.png" 
    alt="Logo" 
    width={40} 
    height={40} 
    className="hidden md:block" // Hide on mobile, show on md and larger screens
  />
  <div className="mt-8 md:block hidden">
    <img 
      src="/dev-images/bg.png" 
      alt="Background Image" 
      className="rounded-lg w-full h-auto md:w-[574px] md:h-[700px]" 
    />
  </div>
</div>


        {/* Right section for OTP confirmation */}
        <div
          className="flex flex-col justify-center items-start bg-white shadow-lg md:pl-[32px] md:pr-[32px] md:pt-[45px] md:pb-[45px] md:w-[446px] md:h-[360px] w-[336px] pl-[16px] pr-[16px] pt-[45px] pb-[45px]   h-[352px] rounded-lg"
        >
          <div className="w-full p-6 flex flex-col justify-center items-center">
            <h1 className="text-[22px] font-semibold text-[#444444] mt-[45px] mb-[24px] text-center w-[304px] h-[30]">Confirm your email address</h1>
            <p className="text-[#727272] mb-[24px]  w-[304px] h-[44px]">
              Kindly enter the six (6) digit code sent to your email address.
            </p>

            {/* OTP input fields */}
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
              <div className="flex space-x-2 mb-[24px] gap-2">
                {otp.map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    id={`otp-input-${index}`}
                    value={otp[index]}
                    onChange={(e) => handleOtpChange(e, index)}
                    className="w-10 h-10 border border-gray-300 text-center rounded-lg text-lg"
                  />
                ))}
              </div>

              {/* Resend code link */}
              <div className="text-left w-full">
  <p className="text-gray-600 mb-[24px] text-[12px]">
    Didn't receive the code?{" "}
    <span
      className="text-[#9FD2E5] cursor-pointer hover:underline"
      onClick={handleResend}
    >
      Resend
    </span>
  </p>
</div>

              {/* Submit button */}
              <Link href={"/login"}>
                <button
                  type="submit"
                  className="w-[282px] h-[52px]  pl-[24px] pr-[24px] pt-[16px] pb-[16px] bg-[#CCE7F2] font-semibold text-[#444444] rounded-full md:mb-[45px] mb-[45px]"
                >
                  Submit
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;
