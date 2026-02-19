'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showError, setShowError] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setShowError(true);
            return;
        }
        setShowError(false);
        console.log('Password reset successful');
        // Add password reset logic here
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);
        // Check if passwords match
        if (newPassword && value && newPassword !== value) {
            setShowError(true);
        } else {
            setShowError(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9F9F9] p-4 font-satoshi">
            <div className="w-full max-w-[400px]">
                {/* Back Button - Mobile Only */}
                <div className="mb-4 md:hidden">
                    <Link href="/auth/confirm-code" className="inline-flex items-center text-gray-600 hover:text-black transition-colors">
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
                        <h1 className="text-2xl font-bold text-gray-900 mb-3">Reset Password</h1>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            Enter your new password.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Enter New Password */}
                        <div className="space-y-2">
                            <label htmlFor="new-password" className="block text-sm font-semibold text-gray-700">
                                Enter New Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    id="new-password"
                                    className={`block w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none sm:text-sm bg-[#FAFAFA] ${showError
                                        ? 'border-[#EE2D2D] focus:border-[#EE2D2D]'
                                        : 'border-gray-200 focus:ring-2 focus:ring-[#BCE3F2] focus:border-[#BCE3F2]'
                                        }`}
                                    placeholder=""
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                >
                                    {showNewPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Confirm New Password */}
                        <div className="space-y-2">
                            <label htmlFor="confirm-password" className="block text-sm font-semibold text-gray-700">
                                Confirm New Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirm-password"
                                    className={`block w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none sm:text-sm bg-[#FAFAFA] ${showError
                                        ? 'border-[#EE2D2D] focus:border-[#EE2D2D]'
                                        : 'border-gray-200 focus:ring-2 focus:ring-[#BCE3F2] focus:border-[#BCE3F2]'
                                        }`}
                                    placeholder=""
                                    value={confirmPassword}
                                    onChange={handlePasswordChange}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    )}
                                </button>
                            </div>
                            {showError && (
                                <p className="text-sm text-[#EE2D2D] mt-1">Passwords do not match</p>
                            )}
                        </div>

                        {/* Reset Password Button */}
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-bold text-[#035A7A] bg-radial from-[#EAF9FF] to-[#CCE7F2] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#BCE3F2] transition-all"
                        >
                            Reset Password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
