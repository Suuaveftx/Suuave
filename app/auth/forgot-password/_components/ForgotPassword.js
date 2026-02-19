'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Mail } from 'lucide-react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Reset link sent to:', email);
        // Add logic to send reset link here
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9F9F9] p-4 font-satoshi">
            <div className="w-full max-w-[400px]">
                {/* Back Button */}
                <div className="mb-4 md:hidden">
                    <Link href="/auth/login" className="inline-flex items-center text-gray-600 hover:text-black transition-colors">
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
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Forgot Password</h1>
                        <p className="text-sm text-gray-500 leading-relaxed px-4">
                            Enter the email address you registered with and we will send you a reset link.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 ml-1">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BCE3F2] focus:border-[#BCE3F2] sm:text-sm bg-[#FAFAFA]"
                                    placeholder=""
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-bold text-[#035A7A] bg-radial from-[#EAF9FF] to-[#CCE7F2] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#BCE3F2] transition-all"
                        >
                            Send Reset Link
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
