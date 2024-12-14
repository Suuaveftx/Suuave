'use client'
import Tabs from '@/app/components/Tabs';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
const AvailabilityMobile = () => {
  const [availability, setAvailability] = useState({
    monday: true,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });

  const handleToggle = (day) => {
    setAvailability((prevState) => ({
      ...prevState,
      [day]: !prevState[day],
    }));
  };

  return (
    <>
    {/* Centered Logo */}
    <div className="sm:hidden flex justify-center mt-4">
        <Image
          src="/dev-images/logo.png"
          alt="Logo"
          width={50}
          height={50}
        />
      </div>

      {/* Tab component */}
      <div className=' sm:hidden mb-[22px]'>
      <Tabs/>
      </div>
    <div className="sm:hidden flex flex-col items-center bg-[#FAFAFA] px-4 py-6 space-y-8 w-full min-h-screen overflow-y-auto">
      {/* Availability Header and Description */}
      <div className="w-full space-y-2 mb-[24px] text-left">
        <h1 className="text-[22px] font-bold text-[#444444]">Availability</h1>
        <p className="text-sm text-gray-500">Select days you will be available for work</p>
      </div>

      {/* Days of the week with toggle switches */}
      <div className="w-full space-y-4 text-[16px]">
        {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((day, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b border-gray-300 py-4"
          >
            <span className="text-sm text-[#444444]">{day.charAt(0).toUpperCase() + day.slice(1)}</span>
            <div
              onClick={() => handleToggle(day)}
              className={`w-14 h-8 flex items-center p-1 rounded-full cursor-pointer ${
                availability[day] ? 'bg-green-500' : 'bg-red-500'
              }`}
            >
              <div
                className={`w-6 h-6 bg-white rounded-full transition-all ${
                  availability[day] ? 'transform translate-x-6' : ''
                }`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-between space-x-[39px] w-full mt-6">
        <button className="text-[16px] text-[#3A98BB] font-bold flex-1">Skip</button>
        <Link href={"/awardsmobile"}>
        <button className="bg-[#E8E8E8] text-[#444444] pl-[24px] pr-[24px] pt-[16px] pb-[16px] rounded-full flex-1 w-[128px] h-[52px] text-sm">
          Next
        </button>
        </Link>
      </div>
    </div>
    </>
  );
};

export default AvailabilityMobile;
