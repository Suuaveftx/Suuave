"use client";

import Image from "next/image";
import React from "react";
import { Switch } from "@heroui/react";
import { X } from "lucide-react";

const PersonalInformation = ({
  setSelected,
  formData,
  setFormData,
  uploadedPortfolio,
  previewPortfolio,
  removePortfolioItem,
}) => {
  return (
    <div className="bg-[#FAFAFA] border border-[#DEDEDE] rounded-2xl p-3 md:p-6 w-full h-full">
      <h1 className="text-[#3A98BB] font-bold text-[32px]">Professional Information</h1>
      <p className="text-[#767676] font-normal text-base mt-2">
        Add any relevant information
      </p>
      <section className="space-y-10 mt-5">
        {/*Illustrator */}
        <div className="w-full flex flex-col gap-2">
          <Lable htmlFor="skills" text="Skills" required />
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
          <Lable htmlFor="portfolioLink" text="Link To Your Portfolio/Personal Website" required />
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
          <Lable htmlFor="uploadedPortfolio" text="Portfolio" required />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {previewPortfolio.map((src, index) => (
              <div key={index} className="relative w-full h-32 rounded-lg overflow-hidden border border-[#D1D1D1]">
                <Image src={src} alt={`portfolio-${index}`} fill className="object-cover" />
                <button
                  type="button"
                  onClick={() => removePortfolioItem(index)}
                  className="absolute top-1 right-1 bg-white/80 hover:bg-white rounded-full p-1 shadow-sm transition-colors"
                >
                  <X size={14} className="text-red-500" />
                </button>
              </div>
            ))}
            <label
              htmlFor="uploadedPortfolio"
              className="flex flex-col items-center cursor-pointer justify-center gap-1 w-full h-32 rounded-lg border border-dashed border-[#3A98BB] bg-[#F4FBFE]"
            >
              <Image
                src="/svg/paper-clip.svg"
                alt="icon"
                width={20}
                height={20}
              />
              <p className="text-[#3A98BB] font-medium text-xs text-center px-2">
                {previewPortfolio.length > 0 ? "Add more" : "Upload Design"}
              </p>
              <input
                id="uploadedPortfolio"
                type="file"
                accept="image/*"
                multiple
                onChange={uploadedPortfolio}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </section>
      <div className="w-full flex justify-center md:justify-end items-center">
        <button
          onClick={() => setSelected("Awards/Certifications")}
          className="text-[#035A7A] rounded-3xl cursor-pointer  px-6 py-2 mt-4 text-center bg-[radial-gradient(circle_at_center,#EAF9FF,#CCE7F2)]"
        >
          Continue
        </button>
      </div>
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

const Lable = ({ text, htmlFor, required }) => {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium text-[#222222]">
      {text}{required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  );
};
