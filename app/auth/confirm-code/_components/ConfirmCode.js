'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const ConfirmCode = () => {
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([]);

    const handleChange = (index, value) => {
        if (value.length <= 1 && /^\d*$/.test(value)) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);

            // Auto-focus next input
            if (value && index < 5) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Verification code:', code.join(''));
        // Add verification logic here
    };

    const handleResend = () => {
        console.log('Resending code...');
        // Add resend logic here
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9F9F9] p-4 font-satoshi">
            <div className="w-full max-w-[512px]">
                {/* Back Button - Mobile Only */}
                <div className="mb-4 md:hidden">
                    <Link href="/auth/forgot-password" className="inline-flex items-center text-gray-600 hover:text-black transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                </div>

                <div className="w-full bg-white rounded-2xl md:rounded-[32px] shadow-sm p-6 md:px-4 md:py-6">
                    {/* Logo */}
                    <div className="flex justify-center mb-6">
                        <Image
                            src="/dev-images/logo.png"
                            alt="Suuave Logo"
                            width={64}
                            height={64}
                            className="object-contain"
                        />
                    </div>

                    {/* Title & Description */}
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-3">Confirm Your Account</h1>
                        <p className="text-sm text-gray-500 leading-relaxed px-4">
                            Kindly enter the code sent to the email address<br />
                            <span className="text-gray-700">cz***07@gmail.com</span>
                        </p>
                    </div>

                    {/* Code Input */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex justify-center gap-2 md:gap-3">
                            {code.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className="w-12 h-12 md:w-14 md:h-14 text-center text-xl font-semibold border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BCE3F2] focus:border-[#BCE3F2] bg-white transition-all"
                                />
                            ))}
                        </div>

                        {/* Resend Code */}
                        <div className="text-center">
                            <p className="text-sm text-gray-600">
                                Didn&apos;t receive code?{' '}
                                <button
                                    type="button"
                                    onClick={handleResend}
                                    className="text-[#3A98BB] font-semibold hover:underline"
                                >
                                    Resend
                                </button>
                            </p>
                        </div>

                        {/* Confirm Button */}
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-bold text-[#035A7A] bg-radial from-[#EAF9FF] to-[#CCE7F2] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#BCE3F2] transition-all"
                        >
                            Confirm
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ConfirmCode;
