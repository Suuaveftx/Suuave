'use client'
import React from "react";
import Image from "next/image";
import { Button } from "@heroui/react";
import CustomButton from "../../../components/CustomButton";

const ProfileArtist = () => {
  return (
    <div className="max-w-xs mx-auto p-4 bg-white rounded-lg  space-y-2 text-left max-h-[630px] overflow-hidden">
      <div className="space-y-3 border-b pb-3">
        {/* Profile Initials */}
        <div className="w-20 h-20 bg-[#EAEAEA] text-[#035A7A] text-xl font-bold flex items-center justify-center rounded-full">
          OC
        </div>

        {/* Name */}
        <h4 className="text-md font-semibold">Ocean Clara</h4>

        {/* Availability Status */}
        <div className="flex items-center">
          <Button disabled className="bg-gray-200 text-green-600 flex items-center rounded-full px-2 py-1 text-sm">
            Available now
            <span className="w-2 h-2 bg-green-600 rounded-full ml-2"></span>
          </Button>
        </div>

        {/* Occupation */}
        <p className="text-gray-600 text-sm">Fashion Artist | 3D Illustrator</p>

        {/* Location */}
        <div className="flex items-center space-x-2 text-gray-600 text-sm">
          <Image src="/dev-images/location.png" alt="Location" width={14} height={14} />
          <span>Lagos, Nigeria</span>
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-2 text-gray-600 text-sm">
          <Image src="/dev-images/Star.png" alt="Rating" width={20} height={20} />
          <span>4.0 <span className="text-[#3A98BB]">(5 reviews)</span></span>
        </div>

        {/* Edit Profile Button */}
        <div className=" border-gray-300 pb-2">
          <CustomButton text="Edit Profile" className="w-52 text-sm" />
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-between text-sm">
        <h4>Design Collections</h4>
        <span>14</span>
      </div>
      <div className="flex justify-between border-b border-gray-300 pb-2 text-sm">
        <h4>Completed Projects</h4>
        <span>14</span>
      </div>

      {/* About Us Section */}
      <h4 className="text-md font-semibold mt-4">About Us</h4>
      <p className="text-gray-600 text-sm leading-tight">
        Ocean Clara is a talented Fashion Artist and 3D Illustrator known for blending modern digital aesthetics with classic fashion design principles.
      </p>
    </div>
  );
};

export default ProfileArtist;
