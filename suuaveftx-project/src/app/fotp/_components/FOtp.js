'use client';
import Link from 'next/link';
import React, { useState } from 'react';

const FOtp = () => {
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
      <div className="flex justify-between items-center w-full max-w-6xl">
        {/* Left section with logo and background image */}
        <div className="flex flex-col items-start justify-center p-6" style={{ width: '574px', height: '700px', borderRadius: '16px' }}>
          <img src="/dev-images/logo.png" alt="Logo" width={40} height={40} />
          <div className="mt-8">
            <img src="/dev-images/bg.png" alt="Background Image" width={574} height={700} className="rounded-lg" />
          </div>
        </div>

        {/* Right section for OTP confirmation */}
        <div
          className="flex flex-col justify-center items-center bg-white shadow-lg pl-[32px] pr-[32px] pt-[45px] pb-[45px]"
          style={{ width: '446px', height: '360px', borderRadius: '16px' }}
        >
          <div className="w-full p-6">
            <h1 className="text-2xl font-semibold text-[#444444] mt-[45px] mb-[24px]">Confirm your email address</h1>
            <p className="text-[#727272] mb-[24px]">
              Kindly enter the six (6) digit code sent to your email address.
            </p>

            {/* OTP input fields */}
            <form onSubmit={handleSubmit} className="flex flex-col">
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
              <p className="text-gray-600 mb-[24px] text-[12px]">
                Didn't receive the code?{" "}
                <span className="text-[#9FD2E5] cursor-pointer hover:underline" onClick={handleResend}>
                  Resend
                </span>
              </p>

              {/* Submit button */}
              <Link href={"/flogin"}>
              <button
                type="submit"
                className="w-full pl-[24px] pr-[24px] pt-[16px] pb-[16px] bg-[#CCE7F2] font-semibold text-[#444444] rounded-full mb-[45px]"
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

export default FOtp;
