"use client";

import Image from "next/image";
import React from "react";
import { Switch } from "@heroui/react";

const PersonalInformation = ({
  setSelected,
  formData,
  setFormData,
  uploadedPortfolio,
  previewPortfolio,
}) => {
  return (
    <div className="bg-[#FAFAFA] border border-[#DEDEDE] rounded-2xl p-3 md:p-6 w-full h-full">
<<<<<<< HEAD
      <h1 className="text-[#3A98BB] font-bold text-xl">Professional Information</h1>
      <p className="text-[#767676] font-normal text-base mt-2">
        Add any relevant information
=======
      <h1 className="text-[#3A98BB] font-bold text-xl">Personal Details</h1>
      <p className="text-[#767676] font-normal text-base mt-2">
        Add any related information.
>>>>>>> 73fc17016e5c581b034684263e3355a04a7b7d80
      </p>
      <section className="space-y-10 mt-5">
        {/*Illustrator */}
        <div className="w-full flex flex-col gap-2">
<<<<<<< HEAD
          <Lable htmlFor="skill" text="Skills" />
=======
          <Lable htmlFor="skill" text="Skill" />
>>>>>>> 73fc17016e5c581b034684263e3355a04a7b7d80
          <Input
            id="skill"
            placeholder="Eg Illustrator"
            value={formData.skill}
            onChange={(e) =>
              setFormData({ ...formData, skill: e.target.value })
            }
          />
        </div>
        {/*Enter Company Name */}
<<<<<<< HEAD
        {/* <div className="w-full flex flex-col gap-2">
=======
        <div className="w-full flex flex-col gap-2">
>>>>>>> 73fc17016e5c581b034684263e3355a04a7b7d80
          <Lable htmlFor="companyName" text="Company/brand Name(Optional)" />
          <Input
            id="companyName"
            placeholder="Enter Company Name"
            value={formData.companyName}
            onChange={(e) =>
              setFormData({ ...formData, companyName: e.target.value })
            }
          />
<<<<<<< HEAD
        </div> */}
        {/*Portfolio link*/}
        <div className="w-full flex flex-col gap-2">
          <Lable htmlFor="portfolioLink" text="Link to Your Portfolio/Personal Website" />
=======
        </div>
        {/*Portfolio link*/}
        <div className="w-full flex flex-col gap-2">
          <Lable htmlFor="portfolioLink" text="Link to Your Portfolio" />
>>>>>>> 73fc17016e5c581b034684263e3355a04a7b7d80
          <Input
            id="portfolioLink"
            placeholder="Enter portfolio link"
            value={formData.portfolioLink}
            onChange={(e) =>
              setFormData({ ...formData, portfolioLink: e.target.value })
            }
          />
        </div>
        {/*upload Portfolio*/}
        <div className="w-full flex flex-col gap-2">
          <Lable htmlFor="uploadedPortfolio" text="Portfolio" />
          {previewPortfolio ? (
            <Image src={previewPortfolio} alt="icon" width={128} height={128} className="object-cover" />
          ) : (
            <label
              htmlFor="uploadedPortfolio"
              className="flex flex-col md:flex-row items-center cursor-pointer justify-center gap-3 w-full h-32 rounded-lg border border-[#D1D1D1]"
            >
              <Image
                src="/svg/paper-clip.svg"
                alt="icon"
                width={24}
                height={24}
              />
              <p className="text-[#767676] font-normal text-base">
                Upload sample of your designs
              </p>
              <input
                id="uploadedPortfolio"
                type="file"
                accept="image/*"
                onChange={uploadedPortfolio}
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* Availability */}
        <div>
          <p className="text-[#222222] font-normal text-base">Availability</p>
          <div className="flex items-center gap-20 mt-5">
            <p className="text-[#222222] font-bold text-base">Monday</p>
            <Switch
              color="success"
              isSelected={formData.availability}
              onChange={(e) =>
                setFormData({ ...formData, availability: e.target.checked })
              }
            />
          </div>
        </div>
        {/* skip and continue button */}
        <div className="w-full flex justify-end items-center">
          <button
            onClick={() => setSelected("Awards/Certifications")}
            className="text-[#035A7A] rounded-3xl cursor-pointer  px-6 py-2 mt-4 text-center bg-[radial-gradient(circle_at_center,#EAF9FF,#CCE7F2)]"
          >
            Continue
          </button>
        </div>
      </section>
    </div>
  );
};

export default PersonalInformation;

const Input = ({ placeholder, id, value, onChange }) => {
  return (
    <input
      onChange={onChange}
      value={value}
      id={id}
      placeholder={placeholder}
      className="w-full border border-[#D1D1D1] text-[#878787] font-normal text-base py-2 px-2 rounded-lg outline-[#3A98BB] bg-transparent "
    />
  );
};

const Lable = ({ text, htmlFor }) => {
  return <label htmlFor={htmlFor}>{text}</label>;
};
