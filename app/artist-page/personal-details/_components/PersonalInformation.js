"use client";

import React, { useState, useEffect } from "react";
import { Button, Input as HeroInput } from "@heroui/react";
import FormLabel from "@/components/ui/FormLabel";
import { useFormContext } from "react-hook-form";

const PersonalInformation = ({
  setSelected,
  setHoveredField,
  setStep,
  isEdit = false,
  submitHref = '/artist-page/profile-for-artist'
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
      {/* Header */}
      <h1 className="text-[#222222] font-bold text-2xl md:text-[28px]">Professional Information</h1>
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
          <FormLabel htmlFor="skills" text="Skills" />
          <HeroInput
            id="skills"
            placeholder="Eg Illustrator"
            variant="bordered"
            classNames={{
              inputWrapper: 'bg-transparent border-[#D1D1D1] data-[hover=true]:!border-[#3A98BB] data-[focus=true]:!border-[#3A98BB] hover:!border-[#3A98BB] focus-within:!border-[#3A98BB] hover:!border-[1px] focus-within:!border-[1px] data-[hover=true]:!border-[1px] data-[focus=true]:!border-[1px]',
              input: 'text-black text-base'
            }}
            {...register("skill", { required: "Skills are required" })}
            isInvalid={!!errors.skill}
            errorMessage={errors.skill?.message}
          />
        </div>
        {/*Portfolio link*/}
        <div
          className="w-full flex flex-col gap-2"
          onMouseEnter={() => setHoveredField("Portfolio")}
          onMouseLeave={() => setHoveredField(null)}
        >
          <FormLabel htmlFor="portfolioLink" text="Link to Your Portfolio, Website, or Social Media Page" />
          <HeroInput
            id="portfolioLink"
            placeholder="Enter portfolio link"
            variant="bordered"
            classNames={{
              inputWrapper: 'bg-transparent border-[#D1D1D1] data-[hover=true]:!border-[#3A98BB] data-[focus=true]:!border-[#3A98BB] hover:!border-[#3A98BB] focus-within:!border-[#3A98BB] hover:!border-[1px] focus-within:!border-[1px] data-[hover=true]:!border-[1px] data-[focus=true]:!border-[1px]',
              input: 'text-black text-base'
            }}
            {...register("portfolioLink", {
              required: "Portfolio link is required",
              pattern: {
                value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/,
                message: "Invalid URL"
              }
            })}
            isInvalid={!!errors.portfolioLink}
            errorMessage={errors.portfolioLink?.message}
          />
        </div>

      </section>
      <div className="w-full flex flex-col md:flex-row items-center justify-between mt-12 gap-4">
        {isEdit ? (
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
            <button
              onClick={() => {
                setSelected("PersonalDetail");
                if (setStep) setStep(2);
              }}
              className='flex items-center justify-center cursor-pointer px-6 py-2 border border-[#3A98BB] text-[#3A98BB] rounded-3xl w-full md:w-auto font-semibold hover:bg-[#EAF9FF] transition-colors'
            >
              Previous
            </button>
            <button
              onClick={async () => {
                const isValid = await trigger(["skill", "portfolioLink"]);
                if (isValid) setSelected("Awards/Certifications");
              }}
              className="w-full md:w-auto flex items-center justify-center transition-all border border-[#3A98BB] text-[#3A98BB] hover:bg-[#EAF9FF] font-semibold rounded-[40px] px-12 py-3.5"
            >
              Update
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={() => {
                setSelected("PersonalDetail");
                setStep(2);
              }}
              className='flex items-center justify-center cursor-pointer px-6 py-2 border border-[#3A98BB] text-[#3A98BB] rounded-3xl w-full md:w-auto font-semibold hover:bg-[#EAF9FF] transition-colors'
            >
              Previous
            </button>
            <div className='flex flex-col md:flex-row items-center justify-center md:justify-end gap-3 w-full md:w-auto'>
              <button
                onClick={() => setSelected("Awards/Certifications")}
                className="flex items-center justify-center w-full md:w-auto bg-transparent border border-[#3A98BB] text-[#3A98BB] font-semibold rounded-[40px] px-12 py-3.5 hover:bg-[#EAF9FF] transition-colors shadow-none"
              >
                Skip
              </button>
              <button
                onClick={handleContinue}
                className="flex items-center justify-center w-full md:w-auto text-[#035A7A] font-semibold rounded-[40px] px-12 py-3.5 bg-[radial-gradient(circle_at_center,#EAF9FF,#CCE7F2)] shadow-[0px_4px_12px_rgba(3,90,122,0.1)]"
              >
                Continue
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PersonalInformation;
