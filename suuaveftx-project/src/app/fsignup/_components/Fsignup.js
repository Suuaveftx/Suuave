'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const Fsignup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    setFormData((prevData) => ({ ...prevData, agreeToTerms: e.target.checked }));
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form data
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-6xl w-full flex overflow-hidden">
        {/* Left section with logo and background image */}
        <div className="flex flex-col items-start justify-center p-6" style={{ width: '574px', height: '700px', borderRadius: '16px' }}>
          <img src="/dev-images/logo.png" alt="Logo" width={40} height={40} />
          <div className="mt-8">
            <img src="/dev-images/bg.png" alt="Background Image" width={574} height={682} className="rounded-lg" />
          </div>
        </div>

        {/* Right section with signup form */}
        <div className="flex-1 p-[42px] bg-white shadow-lg">
          <h1 className="text-2xl font-semibold text-[#444444] mt-[42px] mb-8 text-center">Create New Account</h1>

          {/* Google sign-up button */}
          <button className="flex items-center justify-center gap-4 w-full pl-[24px] pr-[24px] pt-[16px] pb-[16px] text-[12px] font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 mb-8">
            <img src="/dev-images/Google.png" alt="Google Logo" width={20} height={20} className="mr-2" />
            Continue with Google
          </button>

          {/* Divider with 'Or' */}
          <div className="flex items-center justify-center mb-8">
            <div className="border-t w-full border-gray-300"></div>
            <span className="mx-4 text-gray-500 text-[12px]">Or</span>
            <div className="border-t w-full border-gray-300"></div>
          </div>

          {/* Sign-up form */}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full pl-[16px] pr-[16px] pt-[12px] pb-[12px] px-[8px] border border-gray-300 rounded-md text-[12px]"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder=" Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full pl-[16px] pr-[16px] pt-[12px] pb-[12px] px-[8px] border border-gray-300 rounded-md text-[12px]"
                />
              </div>
            </div>

            <div className="mb-8">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 MB-1">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="ocean"
                value={formData.username}
                onChange={handleInputChange}
                className="mt-1 block w-full pL-[16px] pr-[16px] pt-[12px] pb-[12px] px-[8px] border border-gray-300 rounded-md text-[12px]"
              />
            </div>

            <div className="mb-8">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="cdcdcdz@gmail.com"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full pl-[16px] pr-[16px] pt-[12px] pb-[12px] px-2 border border-gray-300 rounded-md text-[12px]"
              />
            </div>

            <div className="mb-8 relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Create Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="xxxxxxxxxxxxx"
                value={formData.password}
                onChange={handleInputChange}
                className="mt-1 block w-full px-2 pl-[16px] pr-[16px] pt-[12px] pb-[12px]  border border-gray-300 rounded-md text-sm"
              />
              {/* Eye icon for toggling password visibility */}
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer mt-3"
                onClick={handlePasswordToggle}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={24} style={{ color: '#878787' }} />
                ) : (
                  <AiOutlineEye size={24} style={{ color: '#878787' }} />
                )}
              </div>
            </div>

            {/* Terms and conditions */}
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="ml-2 text-[12px] text-gray-600">
                  By creating an account, I agree to Suuave's <a href="#" className="text-[#0D2FA8] hover:underline">Terms and Conditions</a>.
                </span>
              </label>
            </div>

            {/* Create Account button */}
            <div className='mb-8'>
              <Link href={"/fotp"}>
              <button
                type="submit"
                className="w-full pl-[24px] pr-[24px] pt-[16px] pb-[16px] bg-[#CCE7F2] text-[#444444] rounded-full"
              >
                Create Account
              </button>
              </Link>
            </div>

            {/* Login prompt */}
            <p className="text-center text-[12px] text-gray-600 mb-8">
              Already have an account? 
              <Link href={"/flogin"} className="text-[#9FD2E5] hover:underline"> Login </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Fsignup;
