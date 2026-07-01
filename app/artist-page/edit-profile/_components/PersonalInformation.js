"use client";

import Image from "next/image";
import React from "react";
import { Switch, Input as HeroInput } from "@heroui/react";

const PersonalInformation = ({
  setSelected,
  formData,
  setFormData,
  uploadedPortfolio,
  previewPortfolio,
}) => {
  return (
    <div className="bg-[#FAFAFA] border border-[#DEDEDE] rounded-2xl p-3 md:p-6 w-full h-full">
      <h1 className="text-[#3A98BB] font-bold text-xl">Professional Information</h1>
      <p className="text-[#767676] font-normal text-base mt-2">
        Add any relevant information
      </p>
      <section className="space-y-10 mt-5">
        {/*Illustrator */}
        <div className="w-full flex flex-col gap-2">
          <Lable htmlFor="skills" text="Skills" />
          <Input
            id="skills"
            placeholder="Eg Illustrator"
            value={formData.skill}
            onChange={(e) =>
              setFormData({ ...formData, skill: e.target.value })
            }
          />
        </div>
        {/*Enter Company Name */}
        {/* <div className="w-full flex flex-col gap-2">
          <Lable htmlFor="companyName" text="Company/brand Name(Optional)" />
          <Input
            id="companyName"
            placeholder="Enter Company Name"
            value={formData.companyName}
            onChange={(e) =>
              setFormData({ ...formData, companyName: e.target.value })
            }
          />
        </div> */}
        {/*Portfolio link*/}
        <div className="w-full flex flex-col gap-2">
          <Lable htmlFor="portfolioLink" text="Link to Your Portfolio/Personal Website" />
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


        {/* skip and continue button */}
        <div className="w-full flex justify-center md:justify-end items-center">
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
    <HeroInput
      onChange={onChange}
      value={value}
      id={id}
      placeholder={placeholder}
      variant="bordered"
      classNames={{
        inputWrapper: 'bg-transparent border-[#D1D1D1] hover:border-[#3A98BB] focus-within:border-[#3A98BB] rounded-lg h-[40px]',
        input: 'text-[#222222] text-sm placeholder:text-[#ADADAD] font-normal'
      }}
      className="w-full"
    />
  );
};

const Lable = ({ text, htmlFor }) => {
  return <label htmlFor={htmlFor}>{text}</label>;
};
