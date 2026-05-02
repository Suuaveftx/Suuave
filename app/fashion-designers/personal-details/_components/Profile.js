"use client";
import React from "react";
import Image from "next/image";
import { Camera } from "lucide-react";
import { Avatar } from "@heroui/react";
import { useFormContext } from "react-hook-form";

const Profile = ({
  setSelected,
  selected,
  step,
  setStep,
  className,
  handleImageChange,
  preview,
  hoveredField,
}) => {
  const { watch } = useFormContext();
  const formData = watch();
  return (
    <div
      className={`${className} flex-col items-center p-10 md:p-0 md:pt-14 md:items-start gap-6 mb-4 w-full bg-[#FAFAFA] md:bg-transparent rounded-lg md:w-[40%] lg:w-[25%] transition-all duration-300`}
    >
      <div className="md:mb-12 flex flex-col items-center md:items-start gap-6">
        <div className="flex flex-col items-center">
          <label htmlFor="profile-upload" className="cursor-pointer relative group">
            <Avatar
              src={preview}
              className="w-32 h-32 md:w-36 md:h-36 text-large border-2 border-[#EAEAEA] shadow-sm hover:shadow-md transition-shadow"
              isBordered
              color="default"
            />
            {/* Camera Overlay */}
            <div className="absolute bottom-2 right-2 bg-[#3A98BB] p-2.5 rounded-full border-2 border-white shadow-lg group-hover:scale-110 transition-transform">
              <Camera size={18} className="text-white" />
            </div>
          </label>
          <input
            id="profile-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
        <div className="flex flex-col items-center md:items-start gap-1">
          <h2 className="font-bold text-2xl text-[#222222] tracking-tight">
            Chinedu Ozulu
          </h2>
          <p className="font-medium text-[#767676] text-sm md:ml-1">@ocean</p>
        </div>
      </div>
      {/* Brand Fundamentals Section (Step 1) */}
      <section className=" hidden md:flex flex-col ">
        <button
          className={` text-start  text-[#222222] font-semibold text-lg mb-2 ${step === 1 ? 'text-[#3A98BB]' : ''}`}
          onClick={() => setStep(1)}
        >
          Brand Fundamentals
        </button>
        {step === 1 && (
          <ul className="font-normal text-sm space-y-3 p-3">
            <List activeState={formData.fullName} text="Full Name" isHovered={hoveredField === 'Full Name'} />
            <List activeState={formData.username} text="Username" isHovered={hoveredField === 'Username'} />
            <List activeState={formData.email} text="Email Address" isHovered={hoveredField === 'Email Address'} />
            <List activeState={formData.businessName} text="Business Name" isHovered={hoveredField === 'Business Name'} />
            <List activeState={formData.brandCategory?.size > 0} text="Brand Category" isHovered={hoveredField === 'Brand Category'} />
            <List activeState={formData.role} text="Position" isHovered={hoveredField === 'Position'} />
          </ul>
        )}
      </section>

      {/* Personal Details Section (Step 2) */}
      <section className=" hidden md:flex flex-col mt-4">
        <button
          className={` text-start  text-[#222222] font-semibold text-lg mb-2 ${step === 2 ? 'text-[#3A98BB]' : ''}`}
          onClick={() => setStep(2)}
        >
          Personal Details
        </button>
        {step === 2 && (
          <ul className="font-normal text-sm space-y-3 p-3">
            <List
              activeState={formData.nationality?.size > 0}
              text="Nationality"
              isHovered={hoveredField === 'Nationality'}
            />
            <List activeState={formData.phoneNumber} text="Phone Number" isHovered={hoveredField === 'Phone Number'} />
            <List activeState={formData.currentCity} text="Current City" isHovered={hoveredField === 'Current City'} />
            <List activeState={formData.language} text="Language" isHovered={hoveredField === 'Language'} />
            <List
              activeState={!!formData.dob}
              text=" Date of Birth"
              isHovered={hoveredField === 'Date of Birth'}
            />
            <List activeState={formData.about} text="About Yourself" isHovered={hoveredField === 'About Yourself'} />
          </ul>
        )}
      </section>
    </div>
  );
};

export default Profile;

const List = ({ text, activeState, isHovered }) => {
  return (
    <li
      className={`${activeState || isHovered
          ? "border-[#3A98BB] transition-colors duration-300"
          : "border-[#D1D1D1]"
        } border-l-2 p-1 ${isHovered ? "text-[#3A98BB] font-bold" : "text-[#767676]"} font-normal text-base`}
    >
      {text}
    </li>
  );
};
