"use client";
import React from "react";
import { Camera } from "lucide-react";
import { Avatar } from "@heroui/react";
import { useFormContext } from "react-hook-form";

const Profile = ({
  setSelected,
  selected,
  className,
  handleImageChange,
  preview,
  hoveredField,
  step,
  setStep,
}) => {
  const { watch } = useFormContext();
  const formData = watch();

  return (
    <div
      className={`${className} flex-col items-center p-5 md:p-0 md:items-start gap-6 mb-4 w-full bg-[#FAFAFA] md:bg-transparent rounded-lg md:w-[40%] lg:w-[25%] transition-all duration-300`}
    >
      <h1 className="text-[#222222] font-bold text-2xl md:text-[32px] mb-2 md:mb-4 md:pt-12">
        Profile Settings
      </h1>
      <div className="md:mb-4 flex flex-col items-center md:items-start gap-2">
        <div className="flex flex-col items-center">
          <label htmlFor="profile-upload" className="cursor-pointer relative group">
            <Avatar
              src={preview}
              className="w-32 h-32 md:w-36 md:h-36 text-large shadow-lg hover:shadow-2xl transition-all bg-[#3A98BB]"
              color="primary"
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
          <h2 className="font-bold text-2xl text-black tracking-tight">
            {formData.fullName || "Your Name"}
          </h2>
          <p className="font-medium text-[#767676] text-sm md:ml-1">
            {formData.username ? `@${formData.username.replace(/^@/, '')}` : "@username"}
          </p>
        </div>
      </div>

      {/* Personal Detail Section */}
      <section className=" hidden md:flex flex-col w-full">
        <button
          className={`text-start font-semibold text-lg mb-2 transition-all ${selected === "PersonalDetail" ? 'text-[#3A98BB] border-l-4 border-[#3A98BB] pl-3' : 'text-black border-l-4 border-transparent pl-3 hover:text-[#3A98BB]'}`}
          onClick={() => setSelected("PersonalDetail")}
        >
          Personal Details
        </button>
        {selected === "PersonalDetail" && (
          <ul className="font-normal text-sm space-y-3 p-3">
            <List activeState={formData.fullName} text="Full Name" isHovered={hoveredField === "Full Name"} />
            <List activeState={formData.username} text="Username" isHovered={hoveredField === "Username"} />
            <List activeState={formData.email} text=" Email Address" isHovered={hoveredField === "Email Address"} />
            <List activeState={formData.nationality?.size > 0} text="Nationality" isHovered={hoveredField === "Nationality"} />
            <List activeState={formData.phoneNumber} text="Phone Number" isHovered={hoveredField === "Phone Number"} />
            <List activeState={formData.currentCity} text="Current City" isHovered={hoveredField === "Current City"} />
            <List activeState={formData.language?.size > 0} text="Language" isHovered={hoveredField === "Language"} />
            <List activeState={!!formData.dob} text=" Date of Birth" isHovered={hoveredField === "Date of Birth"} />
            <List activeState={formData.about} text="About Yourself" isHovered={hoveredField === "About Yourself"} />
          </ul>
        )}
      </section>

      {/* Professional Information Section */}
      <section className=" hidden md:flex flex-col w-full mt-4">
        <button
          className={`text-start font-semibold text-lg mb-2 transition-all ${selected === "ProfessionalInformation" ? 'text-[#3A98BB] border-l-4 border-[#3A98BB] pl-3' : 'text-black border-l-4 border-transparent pl-3 hover:text-[#3A98BB]'}`}
          onClick={() => setSelected("ProfessionalInformation")}
        >
          Professional Information
        </button>
        {selected === "ProfessionalInformation" && (
          <ul className="font-normal text-sm space-y-3 p-3">
            <List activeState={formData.skill} text="Skills" isHovered={hoveredField === "Skills"} />
            <List activeState={formData.portfolioLink} text="Portfolio" isHovered={hoveredField === "Portfolio"} />
            <List activeState={formData.availability} text="Availability" isHovered={hoveredField === "Availability"} />
          </ul>
        )}
      </section>

      {/* Awards/Certifications Section */}
      <section className=" hidden md:flex flex-col w-full mt-4">
        <button
          className={`text-start font-semibold text-lg mb-2 transition-all ${selected === "Awards/Certifications" ? 'text-[#3A98BB] border-l-4 border-[#3A98BB] pl-3' : 'text-black border-l-4 border-transparent pl-3 hover:text-[#3A98BB]'}`}
          onClick={() => setSelected("Awards/Certifications")}
        >
          Awards/Certifications
        </button>
        {selected === "Awards/Certifications" && (
          <ul className="font-normal text-sm space-y-3 p-3">
            <List activeState={formData.awards?.[0]?.name} text="Name" />
            <List activeState={formData.awards?.[0]?.issuedBy} text="Issued/Awarded by" />
            <List activeState={formData.awards?.[0]?.previews?.length > 0} text=" Upload Certificate/Award" />
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
        } border-l-2 p-1 ${isHovered ? "text-[#3A98BB] font-bold" : "text-black"} font-normal text-base`}
    >
      {text}
    </li>
  );
};
