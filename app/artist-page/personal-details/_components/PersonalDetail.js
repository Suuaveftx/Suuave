"use client";
import React, { forwardRef } from "react";
import { DatePicker, Button } from "@heroui/react";
import { parseDate } from "@internationalized/date";
import CustomSelect from "./CustomSelect";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { africanDialCodes as numCode, africanCountries as nationality } from "../../../../utils/countryData";
import { useFormContext, Controller } from "react-hook-form";




const numberCode = [
  { key: "cat", label: "Cat" },
  { key: "dog", label: "Dog" },
  { key: "elephant", label: "Elephant" },
];

const language = [
  { key: "English", label: "English" },
  { key: "Spanish", label: "Spanish" },
];



const PersonalDetail = ({ setSelected, setHoveredField }) => {
  const {
    control,
    register,
    trigger,
    formState: { errors },
    watch,
  } = useFormContext();

  const formData = watch();

  const handleContinue = async () => {
    const isValid = await trigger(["fullName", "email", "phoneCode", "phoneNumber", "language", "about", "nationality", "currentCity", "day", "month", "year"]);
    if (isValid) {
      setSelected("ProfessionalInformation");
    }
  };

  return (
    <div className="w-full bg-white md:bg-[#FAFAFA] border border-[#EAEAEA] md:border-[#DEDEDE] p-6 md:p-6 rounded-2xl shadow-sm md:shadow-none pb-8">
      <h1 className="text-[#3A98BB] font-bold text-[32px] mb-1">Personal Details</h1>
      <p className="text-[#767676] font-normal text-sm mb-8">
        Fill in the following information carefully
      </p>
      <section className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-10">
        {/* Enter Full Name */}
        <div
          className="w-full flex flex-col gap-2"
          onMouseEnter={() => setHoveredField("Full Name")}
          onMouseLeave={() => setHoveredField(null)}
        >
          <Lable htmlFor="fullName" text="Full Name" required />
          <Input
            id="fullName"
            placeholder="Chinedu Ozulu"
            {...register("fullName")}
          />
          {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName.message}</p>}
        </div>
        {/* Email Address */}
        <div
          className="w-full flex flex-col gap-2"
          onMouseEnter={() => setHoveredField(" Email Address")}
          onMouseLeave={() => setHoveredField(null)}
        >
          <Lable htmlFor="emailAddress" text="Email Address" required />
          <div className="relative">
            <Input
              id="email"
              placeholder="czysdgv@gmail.com"
              readOnly
              className="bg-[#F1F1F1] border-none text-[#767676]"
              {...register("email")}
            />
          </div>
          {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
        </div>
        {/*Phone Number */}
        <div
          className="w-full flex flex-col gap-2"
          onMouseEnter={() => setHoveredField("Phone Number")}
          onMouseLeave={() => setHoveredField(null)}
        >
          <Lable htmlFor="phoneCode" text="Phone Number" required />
          <div className="flex items-center gap-3">
            <div className="w-[130px] shrink-0">
              <Controller
                name="phoneCode"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    value={field.value}
                    onChange={field.onChange}
                    data={numCode}
                    className="w-full"
                    htmlFor="phoneCode"
                  />
                )}
              />
            </div>
            <Input
              id="phoneNumber"
              className="flex-1"
              placeholder="0000000000"
              {...register("phoneNumber")}
            />
          </div>
          {(errors.phoneCode || errors.phoneNumber) && (
            <p className="text-red-500 text-xs">
              {errors.phoneCode?.message || errors.phoneNumber?.message}
            </p>
          )}
        </div>
        {/*Language */}
        <div
          className="w-full flex flex-col gap-2"
          onMouseEnter={() => setHoveredField("Language")}
          onMouseLeave={() => setHoveredField(null)}
        >
          <Lable htmlFor="language" text="Language" required />
          <Controller
            name="language"
            control={control}
            render={({ field }) => (
              <CustomSelect
                value={field.value}
                onChange={field.onChange}
                data={language}
                className="w-full"
                htmlFor="language"
              />
            )}
          />
          {errors.language && <p className="text-red-500 text-xs">{errors.language.message}</p>}
        </div>
        {/* textarea */}
        <div
          className="w-full flex flex-col gap-2"
          onMouseEnter={() => setHoveredField("About Yourself")}
          onMouseLeave={() => setHoveredField(null)}
        >
          <Lable htmlFor="about" text="Describe Yourself" required />
          <textarea
            id="about"
            placeholder="Write About Your Design Style"
            className="w-full border border-[#D1D1D1] text-[#222222] placeholder:text-[#ADADAD] font-normal text-sm py-2 px-3 rounded-lg outline-none focus:border-[#3A98BB] bg-transparent h-32 resize-none"
            {...register("about")}
          />
          {errors.about && <p className="text-red-500 text-xs">{errors.about.message}</p>}
        </div>
        {/* Company Name */}
        <div className="w-full flex flex-col gap-2">
          <Lable htmlFor="companyName" text="Company/Brand Name (Optional)" />
          <Input
            id="companyName"
            placeholder="Enter Company Name"
            {...register("companyName")}
          />
          {errors.companyName && <p className="text-red-500 text-xs">{errors.companyName.message}</p>}
        </div>
        {/*Nationality */}
        <div
          className="w-full flex flex-col gap-2"
          onMouseEnter={() => setHoveredField("Nationality")}
          onMouseLeave={() => setHoveredField(null)}
        >
          <Lable htmlFor="nationality" text="Nationality" required />
          <Controller
            name="nationality"
            control={control}
            render={({ field }) => (
              <CustomSelect
                value={field.value}
                onChange={field.onChange}
                data={nationality}
                className="max-w-[280px]"
                htmlFor="nationality"
              />
          )}
          />
          {errors.nationality && <p className="text-red-500 text-xs">{errors.nationality.message}</p>}
        </div>
        {/*Current City*/}
        <div
          className="w-full flex flex-col gap-2"
          onMouseEnter={() => setHoveredField("Current City")}
          onMouseLeave={() => setHoveredField(null)}
        >
          <Lable htmlFor="currentCity" text="Current City" required />
          <div className="relative max-w-[280px]">
            <Input
              id="currentCity"
              placeholder="Lagos"
              className="w-full"
              {...register("currentCity")}
            />
            <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#767676] md:hidden pointer-events-none" />
          </div>
          {errors.currentCity && <p className="text-red-500 text-xs">{errors.currentCity.message}</p>}
        </div>
        {/*Date of Birth*/}
        <div
          className="w-full flex flex-col gap-2"
          onMouseEnter={() => setHoveredField(" Date of Birth")}
          onMouseLeave={() => setHoveredField(null)}
        >
          <Lable htmlFor="dateofBirth" text="Date Of Birth" required />
          <Controller
            name="dob"
            control={control}
            render={({ field }) => (
              <DatePicker
                id="dateofBirth"
                aria-label="Date of Birth"
                value={
                  field.value
                    ? (() => { try { return parseDate(field.value); } catch { return null; } })()
                    : null
                }
                onChange={(date) =>
                  field.onChange(date ? date.toString() : '')
                }
                showMonthAndYearPickers
                popoverProps={{ placement: 'top-start', shouldFlip: false }}
                classNames={{
                  base: 'max-w-[280px]',
                  inputWrapper: [
                    'w-full border border-[#D1D1D1] rounded-lg bg-transparent px-2 py-1',
                    'hover:border-[#3A98BB] focus-within:border-[#3A98BB]',
                    'shadow-none',
                  ],
                  input: 'text-[#222222] placeholder:text-[#ADADAD] font-normal text-sm',
                }}
                calendarProps={{
                  classNames: {
                    base: 'shadow-lg rounded-xl border border-[#D1D1D1]',
                    title: 'text-[#035A7A] font-semibold',
                    cellButton: [
                      'data-[selected=true]:bg-[#CCE7F2] data-[selected=true]:text-[#035A7A]',
                      'data-[today=true]:border data-[today=true]:border-[#3A98BB]',
                      'hover:bg-[#EAF9FF] rounded-lg',
                    ],
                  },
                }}
              />
            )}
          />
          {errors.dob && <p className="text-red-500 text-xs">{errors.dob.message}</p>}
        </div>
      </section>

      <div className="w-full flex flex-col md:flex-row items-center justify-center md:justify-end gap-3 mt-12">
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

export default PersonalDetail;

const Input = forwardRef(({ placeholder, id, name, onChange, onBlur, className, readOnly }, ref) => {
  return (
    <input
      id={id}
      name={name}
      ref={ref}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      readOnly={readOnly}
      className={`w-full border border-[#D1D1D1] text-[#222222] placeholder:text-[#ADADAD] font-normal text-sm py-2 px-3 rounded-lg outline-none focus:border-[#3A98BB] bg-transparent ${className}`}
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
