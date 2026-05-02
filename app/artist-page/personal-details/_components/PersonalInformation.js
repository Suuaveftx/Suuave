"use client";

import Image from "next/image";
import React, { forwardRef } from "react";
import { Switch, Button } from "@heroui/react";
import { X, ChevronLeft } from "lucide-react";

import { useFormContext } from "react-hook-form";

const PersonalInformation = ({
  setSelected,
  uploadedPortfolio,
  previewPortfolio,
  removePortfolioItem,
  setHoveredField,
}) => {
  const {
    register,
    trigger,
    formState: { errors },
  } = useFormContext();

  const handleContinue = async () => {
    const isValid = await trigger(["skill", "portfolioLink"]);
    if (isValid) {
      setSelected("Awards/Certifications");
    }
  };
  return (
    <div className="bg-[#FAFAFA] border border-[#DEDEDE] rounded-2xl p-3 md:p-6 w-full h-full">
      {/* Mobile back arrow */}
      <button
        className="flex items-center text-[#3A98BB] mb-3"
        onClick={() => setSelected("PersonalDetail")}
      >
        <ChevronLeft size={20} />
      </button>

      <h1 className="text-[#3A98BB] font-bold text-2xl md:text-[32px]">Professional Information</h1>
      <p className="text-[#767676] font-normal text-base mt-2">
        Add any relevant information
      </p>
      <section className="space-y-10 mt-5">
        {/*Skills */}
        <div
          className="w-full flex flex-col gap-2"
          onMouseEnter={() => setHoveredField("Skills")}
          onMouseLeave={() => setHoveredField(null)}
        >
          <Lable htmlFor="skills" text="Skills" required />
          <Input
            id="skills"
            placeholder="Eg Illustrator"
            {...register("skill")}
          />
          {errors.skill && <p className="text-red-500 text-xs">{errors.skill.message}</p>}
        </div>
        {/*Portfolio link*/}
        <div
          className="w-full flex flex-col gap-2"
          onMouseEnter={() => setHoveredField("Portfolio")}
          onMouseLeave={() => setHoveredField(null)}
        >
          <Lable htmlFor="portfolioLink" text="Link to Your Portfolio, Website, or Social Media Page" required />
          <Input
            id="portfolioLink"
            placeholder="Enter portfolio link"
            {...register("portfolioLink")}
          />
          {errors.portfolioLink && <p className="text-red-500 text-xs">{errors.portfolioLink.message}</p>}
        </div>
        {/*Work Samples (formerly Portfolio)*/}
        <div
          className="w-full flex flex-col gap-2"
          onMouseEnter={() => setHoveredField("Portfolio")}
          onMouseLeave={() => setHoveredField(null)}
        >
          <Lable htmlFor="uploadedPortfolio" text="Work Samples" required />
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
      <div className="w-full flex flex-col md:flex-row items-center justify-center md:justify-end gap-3 mt-12">
        <Button
          onPress={() => setSelected("Awards/Certifications")}
          className="w-full md:w-auto bg-transparent border border-[#3A98BB] text-[#3A98BB] font-semibold rounded-[40px] px-12 py-3.5 hover:bg-[#EAF9FF] transition-colors"
        >
          Skip
        </Button>
        <Button
          onPress={handleContinue}
          className="w-full md:w-auto text-[#035A7A] font-semibold rounded-[40px] px-12 py-3.5 bg-[radial-gradient(circle_at_center,#EAF9FF,#CCE7F2)] shadow-[0px_4px_12px_rgba(3,90,122,0.1)]"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default PersonalInformation;

const Input = forwardRef(({ placeholder, id, name, onChange, onBlur }, ref) => {
  return (
    <input
      id={id}
      name={name}
      ref={ref}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      className="w-full border border-[#D1D1D1] text-[#878787] font-normal text-base py-2 px-2 rounded-lg outline-[#3A98BB] bg-transparent "
    />
  );
});

Input.displayName = "Input";

const Lable = ({ text, htmlFor, required }) => {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium text-[#222222]">
      {text}{required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  );
};
