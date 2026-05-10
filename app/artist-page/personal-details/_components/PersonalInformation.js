"use client";

import Image from "next/image";
import React from "react";
import { Switch, Button, Input as HeroInput } from "@heroui/react";
import { X, ChevronLeft } from "lucide-react";
import FormLabel from "@/components/ui/FormLabel";
import { useFormContext } from "react-hook-form";

const PersonalInformation = ({
  setSelected,
  uploadedPortfolio,
  previewPortfolio,
  removePortfolioItem,
  setHoveredField,
  setStep,
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
      <h1 className="text-[#222222] font-bold text-2xl md:text-[32px]">Professional Information</h1>
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
          <FormLabel htmlFor="skills" text="Skills" required />
          <HeroInput
            id="skills"
            placeholder="Eg Illustrator"
            variant="bordered"
            classNames={{ 
              inputWrapper: 'bg-transparent border-[#D1D1D1] hover:border-[#3A98BB] focus-within:border-[#3A98BB]', 
              input: 'text-black text-base' 
            }}
            {...register("skill")}
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
          <FormLabel htmlFor="portfolioLink" text="Link to Your Portfolio, Website, or Social Media Page" required />
          <HeroInput
            id="portfolioLink"
            placeholder="Enter portfolio link"
            variant="bordered"
            classNames={{ 
              inputWrapper: 'bg-transparent border-[#D1D1D1] hover:border-[#3A98BB] focus-within:border-[#3A98BB]', 
              input: 'text-black text-base' 
            }}
            {...register("portfolioLink")}
            isInvalid={!!errors.portfolioLink}
            errorMessage={errors.portfolioLink?.message}
          />
        </div>
        {/*Work Samples (formerly Portfolio)*/}
        <div
          className="w-full flex flex-col gap-2"
          onMouseEnter={() => setHoveredField("Portfolio")}
          onMouseLeave={() => setHoveredField(null)}
        >
          <FormLabel htmlFor="uploadedPortfolio" text="Work Samples" required />
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
      <div className="w-full flex flex-col md:flex-row items-center justify-between mt-12 gap-4">
        <button
          onClick={() => {
            setSelected("PersonalDetail");
            setStep(2);
          }}
          className='flex items-center justify-center cursor-pointer px-6 py-2 border border-[#3A98BB] text-[#3A98BB] rounded-3xl w-full md:w-auto font-semibold hover:bg-[#EAF9FF] transition-colors'
        >
          Previous
        </button>
        <div className='flex flex-col md:flex-row items-center gap-3 w-full md:w-auto'>
          <Button
            onPress={() => setSelected("Awards/Certifications")}
            className="w-full md:w-auto bg-transparent border border-[#3A98BB] text-[#3A98BB] font-semibold rounded-[40px] px-12 py-3.5 hover:bg-[#EAF9FF] transition-colors shadow-none"
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
    </div>
  );
};

export default PersonalInformation;
