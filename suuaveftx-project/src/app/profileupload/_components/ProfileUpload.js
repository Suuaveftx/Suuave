import React from "react";
import Image from "next/image";
import Tabs from "@/app/components/Tabs"; // Assuming Tabs component is already created
import Link from "next/link";

const ProfileUpload = () => {
  return (
    <div className="sm:hidden flex flex-col justify-center items-center"> {/* Ensures this component only shows on mobile */}
  <Image
    src="/dev-images/logo.png"
    alt="Logo"
    width={50}
    height={50}
    className="mt-4"
  />
  {/* Tab component */}
  <Tabs />
  
  {/* Back arrow at the top-left */}
  <div className="w-[358px] flex justify-start pl-4 mt-4"> {/* Full-width container for left alignment */}
    <Link href={"/personalprofile"}>
    <button className="flex items-center">
      <Image
        src="/dev-images/ArrowLeft.png" // Add your image icon path here
        alt="Back Arrow"
        width={24} // Adjust the size as needed
        height={24} // Adjust the size as needed
      />
    </button>
    </Link>
  </div>

  {/* Header and description */}
  <div className="mt-8 w-[358px]"> {/* Make sure this div is full width */}
    <div className="bg-[#FAFAFA] w-full flex flex-col justify-start p-4 mt-4 mb-4">
      <h2 className="text-[22px] text-[#444444] font-semibold mb-1">Give your profile a face</h2>
      <p className="text-sm text-gray-500 mt-2">Upload a profile picture</p>
    </div>
  </div>

  {/* Circle with profile image icon */}
  <div className="bg-[#FAFAFA] pl-[16px] pr-[16px] pt-[20px] pb-[20px] w-[358px]">
  {/* Center the circle */}
  <div className="flex justify-center mt-6"> {/* Added flex and justify-center to center the circle */}
    <div className="relative w-32 h-32 bg-[#E9E9E9] rounded-full flex justify-center items-center">
      {/* Main Image (centered) */}
      <div className="absolute flex justify-center items-center">
        <Image
          src="/dev-images/UserOutline.png" // Add your image icon path here
          alt="Upload Icon"
          width={24}
          height={24}
        />
      </div>
      {/* Icon at the bottom edge of the circle */}
      <div className="absolute bottom-2 ml-20 flex justify-center items-center">
        <Image
          src="/dev-images/Vector.png" // Add your bottom icon path here
          alt="Bottom Icon"
          width={20}
          height={20}
        />
      </div>
    </div>
  </div>

  {/* Name and handle */}
  <div className="text-center mt-4">
    <h3 className="text-lg text-[#444444] font-bold">Chinedu Ozulu</h3>
    <p className="text-sm text-gray-500">@ocean</p>
  </div>
</div>


  {/* Date of birth section */}
  <div className="flex flex-col mt-6 w-[358px] h-[140px] justify-center items-center bg-[#FAFAFA] pl-[16px] pr-[16px] pt-[24px] pb-[24px] mb-[67px]">
    <label className="text-left w-full">Date of Birth</label>
    <div className="flex space-x-4">
      {/* Day Selection */}
      <select className="w-20 border border-gray-300 rounded-md pl-[10px] pr-[8px] pt-[10px] pb-[10px]">
        <option value="day">Day</option>
        {[...Array(31)].map((_, i) => (
          <option key={i} value={i + 1}>{i + 1}</option>
        ))}
      </select>

      {/* Month Selection */}
      <select className="w-20 border border-gray-300 rounded-md pl-[10px] pr-[8px] pt-[10px] pb-[10px] text-sm">
        <option value="month">Month</option>
        {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month, i) => (
          <option key={i} value={month}>{month}</option>
        ))}
      </select>

      {/* Year Selection */}
      <select className="w-20 border border-gray-300 rounded-md pl-[10px] pr-[8px] pt-[10px] pb-[10px] text-sm">
        <option value="year">Year</option>
        {[...Array(100)].map((_, i) => (
          <option key={i} value={2020 - i}>{2020 - i}</option>
        ))}
      </select>
    </div>
  </div>

  {/* Skip and Next button */}
  <div className="flex justify-center items-center w-full mt-6 space-x-[39px]"> {/* space-x-[39px] for 39px gap */}
  <button className="text-sm text-gray-500">Skip</button>
  <Link href={"/nationalitymobile"}>
  <button className="bg-[#CCE7F2] text-[#444444] pl-[24px] pr-[24px] pt-[16px] pb-[16px] rounded-full w-[128px] h-[52px] text-sm">Next</button>
  </Link>
</div>

</div>

  
  );
};

export default ProfileUpload;
