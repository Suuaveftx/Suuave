"use client";
import React, { useState, useEffect } from "react";
import { DatePicker, Input as HeroInput, Textarea, Button } from "@heroui/react";
import { parseDate } from "@internationalized/date";
import FormLabel from "@/components/ui/FormLabel";
import CustomSelect from "@/components/ui/CustomSelect";
import PhoneInputCustom from "@/components/ui/PhoneInputCustom";
import { useFormContext, Controller } from "react-hook-form";
import LanguageSelectCustom from '@/components/ui/LanguageSelectCustom';
import { CountrySelect, StateSelect } from "react-country-state-city";

const languageOptions = [
  { key: "English", label: "English" },
  { key: "Spanish", label: "Spanish" },
  { key: "French", label: "French" },
];

const NIGERIA_DEFAULT = { id: 161, name: "Nigeria", iso2: "NG" };

const PersonalDetail = ({ setSelected, setHoveredField }) => {
  const {
    control,
    register,
    trigger,
    setValue,
    formState: { errors },
  } = useFormContext();

  const [countryid, setCountryid] = useState(161);
  const [stateid, setStateid] = useState(0);

  
  const handleContinue = async () => {
    const isValid = await trigger(["fullName", "email", "phoneNumber", "language", "about", "nationality", "currentCity", "dob"]);
    if (isValid) {
      setSelected("ProfessionalInformation");
    }
  };

  return (
    <div className="w-full bg-[#FAFAFA] border border-[#DEDEDE] p-6 md:p-6 rounded-2xl pb-8">
      <h1 className="text-[#222222] font-bold text-[32px] mb-1">Personal Details</h1>
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
          <FormLabel htmlFor="fullName" text="Full Name" required />
          <HeroInput
            id="fullName"
            placeholder="Chinedu Ozulu"
            variant="bordered"
            classNames={{
              inputWrapper: 'bg-transparent border-[#D1D1D1] hover:border-[#3A98BB] focus-within:border-[#3A98BB]',
              input: 'text-black text-sm'
            }}
            {...register("fullName", { required: "Full name is required" })}
            isInvalid={!!errors.fullName}
            errorMessage={errors.fullName?.message}
          />
        </div>
        {/* Email Address */}
        <div
          className="w-full flex flex-col gap-2"
          onMouseEnter={() => setHoveredField(" Email Address")}
          onMouseLeave={() => setHoveredField(null)}
        >
          <FormLabel htmlFor="emailAddress" text="Email Address" required />
          <HeroInput
            id="email"
            placeholder="czysdgv@gmail.com"
            variant="bordered"
            classNames={{
              inputWrapper: 'bg-transparent border-[#D1D1D1] hover:border-[#3A98BB] focus-within:border-[#3A98BB]',
              input: 'text-black text-sm'
            }}
            {...register("email", { 
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
          />
        </div>
        {/*Phone Number */}
        <div
          className="w-full flex flex-col gap-2"
              style={{ position: "relative", zIndex: 45 }}
              onMouseEnter={() => setHoveredField('Phone Number')}
              onMouseLeave={() => setHoveredField(null)}
        >
          <FormLabel htmlFor="phoneNumber" text="Phone Number" required />
          <Controller
            name="phoneNumber"
            control={control}
            rules={{ required: "Phone number is required" }}
            render={({ field }) => (
              <PhoneInputCustom
                id="phoneNumber"
                value={field.value}
                onChange={(val, data) => {
                  field.onChange(val);
                  // Maintain backward compatibility with phoneCode Set
                  if (data?.dialCode) {
                    setValue("phoneCode", new Set([`+${data.dialCode}`]));
                  }
                }}
                onBlur={field.onBlur}
                error={errors.phoneNumber?.message || errors.phoneCode?.message}
              />
            )}
          />
        </div>
        {/*Language */}
        <div
          className="w-full flex flex-col gap-2"
          onMouseEnter={() => setHoveredField("Language")}
          onMouseLeave={() => setHoveredField(null)}
        >
          <FormLabel htmlFor="language" text="Language" required />
          <Controller
            name="language"
            control={control}
            rules={{ required: "Language is required" }}
            render={({ field }) => (
              <LanguageSelectCustom
                value={field.value}
                onChange={field.onChange}
                error={errors.language?.message}
              />
            )}
          />
        </div>
        {/* textarea */}
        <div
          className="w-full flex flex-col gap-2"
          onMouseEnter={() => setHoveredField("About Yourself")}
          onMouseLeave={() => setHoveredField(null)}
        >
          <FormLabel htmlFor="about" text="Describe Yourself" required />
          <Textarea
            id="about"
            placeholder="Write About Your Design Style"
            variant="bordered"
            minRows={4}
            classNames={{
              inputWrapper: 'bg-transparent border-[#D1D1D1] hover:border-[#3A98BB] focus-within:border-[#3A98BB]',
              input: 'text-black text-sm'
            }}
            {...register("about", { required: "Description is required" })}
            isInvalid={!!errors.about}
            errorMessage={errors.about?.message}
          />
        </div>
        {/* Company Name */}
        <div className="w-full flex flex-col gap-2">
          <FormLabel htmlFor="companyName" text="Company/Brand Name (Optional)" />
          <HeroInput
            id="companyName"
            placeholder="Enter Company Name"
            variant="bordered"
            classNames={{
              inputWrapper: 'bg-transparent border-[#D1D1D1] hover:border-[#3A98BB] focus-within:border-[#3A98BB]',
              input: 'text-black text-sm'
            }}
            {...register("companyName")}
            isInvalid={!!errors.companyName}
            errorMessage={errors.companyName?.message}
          />
        </div>
        {/*Nationality */}
        <div
          className="w-full flex flex-col gap-2"
              style={{ position: "relative", zIndex: 50 }}
              onMouseEnter={() => setHoveredField('Nationality')}
              onMouseLeave={() => setHoveredField(null)}
        >
          <FormLabel htmlFor="nationality" text="Nationality" required />
          <Controller
            name="nationality"
            control={control}
            rules={{ 
              required: "Nationality is required",
              validate: (val) => (val instanceof Set ? val.size > 0 : !!val) || "Nationality is required"
            }}
            render={({ field }) => (
              <div className="max-w-[280px] suuave-location-select">
                <CountrySelect
                        defaultValue={NIGERIA_DEFAULT}
                  onChange={(e) => {
                    setCountryid(e.id);
                    setStateid(0);
                    field.onChange(new Set([e.name]));
                    setValue("currentCity", "");
                  }}
                  placeHolder="Select Nationality"
                />
              </div>
            )}
          />
          {errors.nationality && <p className="text-danger text-xs">{errors.nationality.message}</p>}
        </div>
        {/*Current City*/}
        <div
          className="w-full flex flex-col gap-2"
              style={{ position: "relative", zIndex: 40 }}
              onMouseEnter={() => setHoveredField('Current City')}
              onMouseLeave={() => setHoveredField(null)}
        >
          <FormLabel htmlFor="currentCity" text="Current City" required />
          <Controller
            name="currentCity"
            control={control}
            rules={{ required: "Current city is required" }}
            render={({ field }) => (
              <div className="max-w-[280px] suuave-location-select">
                <StateSelect
                  countryid={countryid}
                  value={stateid}
                  onChange={(e) => {
                    setStateid(e.id);
                    field.onChange(e.name);
                  }}
                  placeHolder="Select City"
                />
              </div>
            )}
          />
          {errors.currentCity && <p className="text-danger text-xs">{errors.currentCity.message}</p>}
        </div>
        {/*Date of Birth*/}
        <div
          className="w-full flex flex-col gap-2"
          onMouseEnter={() => setHoveredField(" Date of Birth")}
          onMouseLeave={() => setHoveredField(null)}
        >
          <FormLabel htmlFor="dob" text="Date Of Birth" required />
          <Controller
            name="dob"
            control={control}
            rules={{ required: "Date of birth is required" }}
            render={({ field }) => (
              <DatePicker
                id="dateofBirth"
                aria-label="Date of Birth"
                variant="bordered"
                isInvalid={!!errors.dob}
                errorMessage={errors.dob?.message}
                value={
                  field.value
                    ? (() => { try { return parseDate(field.value); } catch { return null; } })()
                    : null
                }
                onChange={(date) =>
                  field.onChange(date ? date.toString() : '')
                }
                showMonthAndYearPickers
                popoverProps={{ placement: 'bottom-start', shouldFlip: false }}
                classNames={{
                  base: 'max-w-[280px]',
                  inputWrapper: [
                    'w-full border rounded-lg bg-transparent px-2 py-1',
                    errors.dob ? 'border-danger' : 'border-[#D1D1D1]',
                    'hover:border-[#3A98BB] focus-within:border-[#3A98BB]',
                    'shadow-none',
                  ],
                  input: 'text-black font-normal text-sm',
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
