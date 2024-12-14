import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaUser, FaUpload, FaShoppingBag } from 'react-icons/fa';

const FashionArtist = () => {
  return (
    <div className="flex items-center justify-between h-screen">
      {/* Left section with text and icons */}
      <div className="p-4 sm:p-0">
  <div className="flex flex-col justify-center p-6 w-full max-w-md h-screen border border-gray-400 shadow-md rounded-[8px] sm:shadow-none sm:border-none">
    <h1 className="text-[32px] font-bold">Hi Kate,</h1>
    <p className="mt-2 text-gray-600 font-bold">
      To begin, let's take a moment to <br /> complete your profile setup.
    </p>

    {/* Complete Profile Setup */}
    <div className="flex items-center mt-6 space-x-2 gap-4 pt-[20px] pb-[20px]">
      <Image src={"/dev-images/icon1.png"} alt="user" width={24} height={24} />
      <span className="text-gray-700 text-[16px]">Complete Profile Setup</span>
    </div>
    <hr className="my-2 border-gray-300" />

    {/* Upload Sample Works */}
    <div className="flex items-center mt-6 space-x-2 gap-4 pt-[20px] pb-[20px]">
      <Image src={"/dev-images/icon2.png"} alt="upload" width={24} height={24} />
      <span className="text-gray-700 text-[16px]">
        Upload Sample Works / Necessary Documents
      </span>
    </div>
    <hr className="my-2 border-gray-300" />

    {/* Apply for Jobs */}
    <div className="flex items-center mt-6 space-x-2 gap-4 pt-[20px] pb-[20px]">
      <Image src={"/dev-images/icon3.png"} alt="bag" width={24} height={24} />
      <span className="text-gray-700 text-[16px]">
        Apply for Jobs and License Your Design
      </span>
    </div>
    <hr className="my-2 border-gray-300" />

    {/* Continue Button */}
    <Link href={"/personalprofile"}>
      <button className="mt-6 bg-[#CCE7F2] text-[#444444] font-semibold pl-[24px] pr-[24px] pt-[16px] pb-[16px] rounded-full w-48">
        Continue
      </button>
    </Link>
  </div>
</div>


      {/* Right section with background image */}
      <div
        className="hidden md:block bg-cover bg-center rounded-2xl mt-[76px]"
        style={{
          width: '649px',
          height: '649px',
          backgroundImage: "url('/dev-images/Fashion.png')", // Replace with your background image path
        }}
      />
    </div>
  );
};

export default FashionArtist;
