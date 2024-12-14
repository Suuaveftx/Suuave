import Tabs from '@/app/components/Tabs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const NationalityMobile = () => {
  return (
    <>
     {/* Centered Logo */}
     <div className="sm:hidden flex justify-center">
        <Image
          src="/dev-images/logo.png"
          alt="Logo"
          width={50}
          height={50}
        />
      </div>

      {/* Tab component */}
      <div className=' sm:hidden mb-[22px]'>
      <Tabs />
      </div>
    <div className="sm:hidden flex flex-col bg-[#FAFAFA] border-2 border-[#E0E0E0] rounded-[8px] px-4 py-6  w-full h-screen">
     

      {/* Section 1: Nationality */}
      <div className="space-y-4 mb-[16px]">
        {/* Header and Paragraph */}
        <div className="mb-[24px]">
          <h1 className="text-[22px] font-bold text-[#444444]">Tell us about where you reside</h1>
          <p className="text-sm text-[#BABABA]">Fill in your location.</p>
        </div>

        {/* Nationality Input */}
        <div className="space-y-2 mb-[16px]">
          <label className="text-[16px] font-medium text-[#444444]" htmlFor="nationality">
            Nationality
          </label>
          <select
            id="nationality"
            className="w-full border border-[#D1D1D1] rounded-[8px] pl-[8px] pr-[16px] pt-[12px] pb-[12px] text-[16px] text-[#BABABA] bg-white"
          >
            <option value="">Select</option>
            <option value="nigeria">Nigeria</option>
            <option value="ghana">Ghana</option>
            <option value="usa">United States</option>
            {/* Add more countries as needed */}
          </select>
        </div>

        {/* Current City Input */}
        <div className="space-y-2 mb-[32px]">
          <label className="text-[16px] font-medium text-[#444444]" htmlFor="currentCity">
            Current City
          </label>
          <select
            id="currentCity"
            className="w-full border border-[#D1D1D1] rounded-[8px] pl-[10px] pr-[10px] pt-[12px] pb-[12px] text-[16px] text-[#BABABA] bg-white"
          >
            <option value="">Select</option>
            <option value="lagos">Lagos</option>
            <option value="accra">Accra</option>
            <option value="new-york">New York</option>
            {/* Add more cities as needed */}
          </select>
        </div>
      </div>

      {/* Section 2: Phone Number */}
      <div className="space-y-4">
        {/* Header and Paragraph */}
        <div>
          <h1 className="text-[22px] font-bold text-[#444444]">Kindly fill in your Phone number</h1>
          <p className="text-sm text-gray-500">This will not be accessible by visitors.</p>
        </div>

        {/* Phone Number Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#444444]" htmlFor="phone">
            Phone Number
          </label>
          <div className="flex space-x-2">
            {/* Country Code */}
            <select
              id="countryCode"
              className="w-1/3 border border-[#D1D1D1] rounded-[8px] pl-[12px] pr-[16px] pt-[12px] pb-[12px] text-sm bg-white"
            >
              <option value="+234">+234</option>
              <option value="+233">+233</option>
              <option value="+1">+1</option>
              {/* Add more country codes as needed */}
            </select>

            {/* Phone Number */}
            <input
              type="text"
              id="phone"
              className="w-2/3 border border-[#D1D1D1] rounded-[8px] pl-[12px] pr-[16px] pt-[12px] pb-[12px] text-sm"
              placeholder="Enter phone number"
            />
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex space-x-[39px] mt-6 w-[306px] h-[52px]">
        <button className="text-[16px] text-[#3A98BB]">Skip</button>
        <Link href={"/portfoliomobile"}>
        <button className="bg-[#E8E8E8] text-[#444444] pl-[24px] pr-[24px] pt-[16px] pb-[16px] rounded-full w-[128px] h-[52px] text-[16px]">
          Next
        </button>
        </Link>
      </div>
    </div>
    </>
  );
};

export default NationalityMobile;
