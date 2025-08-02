'use client'
import React from "react";
import Image from "next/image";
import { Button } from "@heroui/react";
import CustomButton from "../../../../components/CustomButton";
import { IoLocationSharp } from "react-icons/io5";

const ProfileArtist = () => {
  return (
    <div className="max-w-xs mx-auto p-4 bg-white rounded-lg  space-y-2  max-h-[630px] overflow-hidden">
      <div className="space-y-3 border-b pb-3">
        {/* Profile Initials */}
        <div className="w-20 h-20 bg-[#EAEAEA] text-[#035A7A] text-xl text-left font-bold flex items-center justify-center rounded-full">
          OC
        </div>

        {/* Name */}
        <h4 className="text-md font-semibold">Ocean Clara</h4>

        {/* Availability Status */}
        <div className="bg-[#EEEEEE] flex  items-center  text-sm text-center text-[#056D16] rounded-[32px] gap-2 px-2 py-1 w-full max-w-[35%]">
      <span>Available</span>
      <span className="w-2 h-2 bg-green-600 rounded-full ml-2"></span>
</div>


        {/* Occupation */}
        <p className="text-[#222222] text-sm ">Fashion Artist | 3D Illustrator</p>

        {/* Location */}
        <div className="flex items-center space-x-2 text-gray-600 text-sm">
          <IoLocationSharp color="#878787" />
          <span>Lagos, Nigeria</span>
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-2 text-gray-600 text-sm">
          <Image src="/dev-images/Star.png" alt="Rating" width={20} height={20} />
          <span>4.0 <span className="text-[#3A98BB]">(5 reviews)</span></span>
        </div>

        {/* Edit Profile Button */}
        <div className=" border-gray-300 pb-2">
          <CustomButton text="Edit Profile" className="w-52 text-sm" style={{
            color: "#035A7A"
          }} />
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-between text-sm text-[#222222]">
        <h4>Design Collections</h4>
        <span>14</span>
      </div>
      <div className="flex justify-between border-b border-gray-300 pb-2 text-sm text-[#222222]">
        <h4>Completed Projects</h4>
        <span>14</span>
      </div>

      {/* About Us Section */}
      <h4 className="text-[#767676] text-base font-normal mt-[22px]">About Me</h4>
      <p className="text-[#222222] text-sm font-normal">
        Ocean Clara is a talented Fashion Artist and 3D Illustrator known for blending modern digital aesthetics with classic fashion design principles.
      </p>
    </div>
  );
};

export default ProfileArtist;
