"use client";
import React from "react";
import Image from "next/image";
import { Camera } from "lucide-react";
import { useFormContext } from "react-hook-form";

const Profile = ({
  setSelected,
  selected,
  className,
  handleImageChange,
  preview,
  hoveredField,
}) => {
  const { watch } = useFormContext();
  const formData = watch();

  return (
    <div
      className={`${className} flex-col items-center p-10 md:p-0 md:items-start gap-2 mb-4 w-full bg-white md:bg-transparent shadow-sm md:shadow-none border border-[#EAEAEA] md:border-none rounded-2xl md:w-[40%] lg:w-[25%]`}
    >
      <div className="flex flex-col items-center w-full md:items-start md:mb-10">
        <div className="relative mb-4">
          <label htmlFor="profile-upload" className="cursor-pointer">
            <Image
              src={preview}
              alt="Profile Picture"
              width={120}
              height={120}
              className="rounded-full object-cover border border-[#EAEAEA]"
            />
            {/* Camera Overlay */}
            <div className="absolute bottom-1 right-1 bg-[#3A98BB] p-2 rounded-full border-2 border-white">
              <Camera size={16} className="text-white" />
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
        <div className="flex flex-col items-center md:items-start w-full">
          <b className="font-bold text-xl text-[#222222]">
            Chinedu Ozulu
          </b>
          <small className="font-normal text-sm text-[#767676]">@ocean</small>
        </div>
      </div>
      {/* Personal Detail toggle */}
      <section className=" hidden md:flex flex-col ">
        <button
          className={` text-start  text-[#222222] font-normal text-lg`}
          onClick={() => setSelected("PersonalDetail")}
        >
          Personal Details
        </button>
        {selected === "PersonalDetail" && (
          <ul className="font-normal text-sm space-y-3 p-3">
            <List activeState={formData.fullName} text="Full Name" isHovered={hoveredField === "Full Name"} />
            <List activeState={formData.username} text="Username" isHovered={hoveredField === "Username"} />

            <List activeState={formData.email} text=" Email Address" isHovered={hoveredField === "Email Address"} />

            <List
              activeState={formData.nationality?.size > 0}
              text="Nationality"
              isHovered={hoveredField === "Nationality"}
            />

            <List
              activeState={formData.phoneNumber}
              text="Phone Number"
              isHovered={hoveredField === "Phone Number"}
            />

            <List activeState={formData.currentCity} text="Current City" isHovered={hoveredField === "Current City"} />

            <List activeState={formData.language?.size > 0} text="Language" isHovered={hoveredField === "Language"} />

            <List
              activeState={!!formData.dob}
              text=" Date of Birth"
              isHovered={hoveredField === "Date of Birth"}
            />

            <List activeState={formData.about} text="About Yourself" isHovered={hoveredField === "About Yourself"} />
          </ul>
        )}
      </section>
      {/*    Professional Information toggle */}
      <div className=" hidden md:flex flex-col">
        <button
          className={` text-start  text-[#222222] font-normal text-lg`}
          onClick={() => setSelected("ProfessionalInformation")}
        >
          Professional Information
        </button>
        {selected === "ProfessionalInformation" && (
          <ul className="font-normal text-sm space-y-3 p-3">
            <List activeState={formData.skill} text="Skills" isHovered={hoveredField === "Skills"} />
            {/* <List
              activeState={formData.companyName}
              text="Website (Optional)"
            /> */}
            <List activeState={formData.portfolioLink} text="Portfolio" isHovered={hoveredField === "Portfolio"} />
            <List activeState={formData.availability} text="Availability" isHovered={hoveredField === "Availability"} />
          </ul>
        )}
      </div>
      {/* Awards/Certifications toggle */}
      <div className=" hidden md:flex flex-col">
        <button
          className={` text-start  text-[#222222] font-normal text-lg`}
          onClick={() => setSelected("Awards/Certifications")}
        >
          Awards/Certifications
        </button>
        {selected === "Awards/Certifications" && (
          <ul className="font-normal text-sm space-y-3 p-3">
            <List activeState={formData.nameofAwardCertificate} text="Name" />
            <List
              activeState={formData.awardedIssuedBy}
              text="Issued/Awarded by"
            />
            <List
              activeState={formData.uploadCertificateAward}
              text=" Upload Certificate/Award"
            />
          </ul>
        )}
      </div>

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
        } border-l-2  p-1 ${isHovered ? "text-[#3A98BB] font-bold" : "text-[#767676]"} font-normal text-base`}
    >
      {text}
    </li>
  );
};
