"use client";
import Image from "next/image";
import React from "react";
import { useState } from "react";

const Profile = ({ setSelected, formData, selected, className , handleImageChange , preview }) => {
  

  return (
    <div
      className={`${className}  flex-col items-center p-10 md:p-0 md:items-start gap-2 mb-4 w-full bg-[#FAFAFA] md:bg-transparent rounded-lg md:w-[40%] lg:w-[25%]`}
    >
      <div className=" md:mb-10">
        <div className="flex flex-col items-center">
          <label htmlFor="profile-upload" className="cursor-pointer">
            <Image
              src={preview}
              alt="Profile Picture"
              width={150}
              height={150}
              className="mb-4 rounded-full object-cover border border-gray-300"
            />
          </label>
          <input
            id="profile-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
        <span className="w-full  flex flex-col md:items-center md:gap-2 md:flex-row">
          <b className="font-bold text-xl text-center md:text-start">
            Chinedu Ozulu
          </b>{" "}
          <small className="font-normal text-sm text-center">@ocean</small>
        </span>
      </div>
      {/* Personal Detail toggle */}
      <section className=" hidden md:flex flex-col ">
        <button
          className={` text-start  text-[#222222] font-normal text-lg`}
          onClick={() => setSelected("PersonalDetail")}
        >
          Personal Detail
        </button>
        {selected === "PersonalDetail" && (
          <ul className="font-normal text-sm space-y-3 p-3">
            <List activeState={formData.fullName} text="Full Name" />

            <List activeState={formData.email} text=" Email Address" />

            <List activeState={formData.nationality.size} text="Nationality" />

            <List activeState={formData.currentCity.size} text="Current City" />

            <List activeState={formData.language.size} text="Language" />

            <List activeState={formData.day.size} text=" Date of Birth" />

            <List activeState={formData.about} text="About Yourself" />
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
            <List activeState={formData.skill} text="Skill" />
            <List
              activeState={formData.companyName}
              text="Website (Optional)"
            />
            <List activeState={formData.portfolioLink} text="Portfolio" />
            <List activeState={formData.availability} text="Availability" />
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

const List = ({ text, activeState }) => {
  return (
    <li
      className={`${
        activeState
          ? "border-[#3A98BB] transition-colors duration-300"
          : "border-[#D1D1D1]"
      } border-l-2  p-1 text-[#767676] font-normal text-base`}
    >
      {text}
    </li>
  );
};
